import { useState, useEffect } from 'react';
import { AppSidebar } from './components/AppSidebar'; // Asume el sidebar colapsable mejorado
import { HomeView } from './components/HomeView';
import { DashboardWithSidebar } from './components/DashboardWithSidebar';
import { CVEditorNew } from './components/CVEditorNew';
import { UserSettingsWithSidebar } from './components/UserSettingsWithSidebar';
import { AuthViewUnified } from './components/AuthViewUnified';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import authService from './services/authService';
import cvService, { type CVData } from './services/cvService';
import { downloadPDF } from './utils/htmlCapture';

// NUEVO: Imports para el layout responsivo
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Button } from './components/ui/button';
import { Menu } from 'lucide-react';

// MODIFICADO: Definiciones de tipo más claras
type NavView = 'home' | 'my-cvs' | 'profile';
type View = NavView | 'editor';
type AppView = NavView | 'auth'; // Tipo que nos da el sidebar

// NUEVO: Tipo para el perfil de usuario
interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  fallback: string;
}

interface CV {
  id: string;
  title: string;
  thumbnail?: string;
  templateId: string;
  data?: CVData;
}

export default function App() {
  // NUEVO: Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // NUEVO: Estado de usuario
  const [user, setUser] = useState<UserProfile | null>(null);

  // MODIFICADO: Vista inicial (si está autenticado)
  const [currentView, setCurrentView] = useState<View>('my-cvs');

  // Verificar si el usuario ya está autenticado al cargar
  useEffect(() => {
    const token = authService.getToken();
    const savedUser = authService.getUser();
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser({
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        fallback: savedUser.name.charAt(0).toUpperCase(),
      });
      
      // Cargar los CVs del usuario
      loadUserCVs(savedUser.id);
    }
  }, []);

  const loadUserCVs = async (userId: string) => {
    try {
      const userCVs = await cvService.getUserCVs(userId);
      const formattedCVs = userCVs.map(cv => ({
        id: cv.id,
        title: cv.data.title || 'CV sin título',
        templateId: cv.data.templateId || 'executive',
        data: cv.data,
      }));
      setCvs(formattedCVs);
    } catch (error) {
      console.error('Error loading CVs:', error);
      toast.error('Error al cargar los CVs');
    }
  };
  
  const [cvs, setCvs] = useState<CV[]>([]);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>('executive');

  // --- Handlers de CVs ---
  const handleSelectTemplate = (templateId: string) => {
    // Solo guardamos el templateId, NO agregamos el CV aún
    setCurrentTemplateId(templateId);
    setCurrentCVId(null); // Nuevo CV sin ID aún
    setCurrentView('editor');
  };

  const handleEditCV = (id: string) => {
    setCurrentCVId(id);
    setCurrentView('editor');
  };

  const handleDownloadCV = async (id: string) => {
    const cv = cvs.find(c => c.id === id);
    if (!cv) {
      toast.error('CV no encontrado');
      return;
    }

    try {
      toast.loading('Generando PDF...', { id: 'pdf-generation' });
      
      // Crear un HTML básico con los datos del CV
      // TODO: Mejorar esto para renderizar el template real
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>${cv.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { color: #333; margin-bottom: 10px; }
            .contact { color: #666; margin-bottom: 20px; }
            .section { margin-top: 30px; }
            .section h2 { color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 5px; }
          </style>
        </head>
        <body>
          <h1>${cv.data?.formData?.name || 'Sin nombre'}</h1>
          <div class="contact">
            <p>${cv.data?.formData?.email || ''}</p>
            <p>${cv.data?.formData?.phone || ''}</p>
            <p>${cv.data?.formData?.location || ''}</p>
          </div>
          ${cv.data?.formData?.summary ? `<div class="section"><h2>Resumen</h2><p>${cv.data.formData.summary}</p></div>` : ''}
        </body>
        </html>
      `;
      
      // Llamar al servicio para generar el PDF
      const result = await cvService.generatePDF(id, htmlContent);
      
      // Descargar el PDF
      await downloadPDF(result.pdfUrl, result.fileName);
      
      toast.success('PDF descargado correctamente', { id: 'pdf-generation' });
      
    } catch (error) {
      console.error('Error al descargar CV:', error);
      toast.error('Error al generar el PDF', { id: 'pdf-generation' });
    }
  };

  const handleDeleteCV = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este currículum?')) {
      try {
        await cvService.deleteCV(id);
        setCvs(cvs.filter(c => c.id !== id));
        toast.success('CV eliminado correctamente');
      } catch (error) {
        console.error('Error deleting CV:', error);
        toast.error('Error al eliminar el CV');
      }
    }
  };

  const handleSaveCV = async (newTitle: string, cvData?: CVData['formData']) => {
    if (!user) {
      toast.error('Usuario no autenticado');
      return;
    }

    try {
      const dataToSave = {
        title: newTitle,
        templateId: currentCVId ? (cvs.find(c => c.id === currentCVId)?.templateId || currentTemplateId) : currentTemplateId,
        formData: cvData || {
          name: '',
          email: '',
          phone: '',
          location: '',
          summary: '',
          experiences: [],
          education: [],
          skills: [],
          languages: [],
        }
      };
      
      if (currentCVId) {
        // Actualizar CV existente
        await cvService.updateCV(currentCVId, {
          data: dataToSave
        });
        
        // Actualizar en el estado local
        setCvs(cvs.map(c => 
          c.id === currentCVId ? { ...c, title: newTitle, data: dataToSave } : c
        ));
        
        toast.success('CV actualizado correctamente');
      } else {
        // Crear nuevo CV - SOLO después del POST exitoso lo agregamos
        const newCV = await cvService.createCV({
          userId: user.id,
          data: dataToSave
        });
        
        // AHORA SÍ agregamos el CV a la lista con el ID del servidor
        setCvs([...cvs, {
          id: newCV.id,
          title: newTitle,
          templateId: dataToSave.templateId,
          data: newCV.data
        }]);
        
        setCurrentCVId(newCV.id);
        toast.success('CV creado correctamente');
      }
      
      // Volver al dashboard después de guardar
      setCurrentView('my-cvs');
      setCurrentCVId(null);
      
    } catch (error) {
      console.error('Error saving CV:', error);
      toast.error('Error al guardar el CV');
    }
  };

  const handleExitEditor = () => {
    setCurrentCVId(null);
    setCurrentView('my-cvs');
  };

  const handleCreateNewFromMyCVs = () => {
    setCurrentView('home');
  };

  // --- Handlers de Navegación y Auth (MODIFICADOS) ---
  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
  };

  const handleLogin = () => {
    const savedUser = authService.getUser();
    if (savedUser) {
      setIsAuthenticated(true);
      setUser({
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        fallback: savedUser.name.charAt(0).toUpperCase(),
      });
      setCurrentView('my-cvs');
      // Cargar los CVs del usuario
      loadUserCVs(savedUser.id);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleUserUpdate = (updatedUser: { id: string; name: string; email: string }) => {
    // Actualizar el estado del usuario
    setUser({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      fallback: updatedUser.name.charAt(0).toUpperCase(),
    });
    
    // Actualizar también en localStorage
    const currentUser = authService.getUser();
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleAccountDeleted = () => {
    // Redirigir a la pantalla de autenticación después de eliminar la cuenta
    setIsAuthenticated(false);
    setUser(null);
    setCvs([]);
  };

  // NUEVO: Wrapper para el prop onNavigate del sidebar
  const onSidebarNavigate = (view: AppView) => {
    if (view === 'auth') {
      handleLogout();
    } else {
      handleNavigate(view);
    }
  };


  // --- Lógica de Renderizado ---

  // NUEVO: 1. Guardián de Autenticación (Pantalla completa)
  if (!isAuthenticated) {
    return (
      <AuthViewUnified
        onSuccess={handleLogin} // Usar el nuevo handler
      />
    );
  }

  // 2. Vista del editor (Pantalla completa)
  if (currentView === 'editor') {
    const currentCV = currentCVId ? cvs.find(cv => cv.id === currentCVId) : null;
    return (
      <CVEditorNew
        cvTitle={currentCV?.title || 'Nuevo Currículum'}
        templateId={currentCV?.templateId || currentTemplateId}
        initialData={currentCV?.data?.formData}
        onSave={handleSaveCV}
        onExit={handleExitEditor}
      />
    );
  }

  // NUEVO: Función para renderizar la vista de app actual
  const renderAppView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onSelectTemplate={handleSelectTemplate} />;
      case 'my-cvs':
        return (
          <DashboardWithSidebar
            cvs={cvs}
            onCreateNew={handleCreateNewFromMyCVs}
            onEditCV={handleEditCV}
            onDownloadCV={handleDownloadCV}
            onDeleteCV={handleDeleteCV}
          />
        );
      case 'profile':
        return user ? <UserSettingsWithSidebar user={user} onUserUpdate={handleUserUpdate} onAccountDeleted={handleAccountDeleted} /> : null;
      default:
        return null; // El editor se maneja arriba
    }
  };

  // 3. Vistas con sidebar (Layout principal de la App)
  return (
    <div className="flex min-h-screen bg-background">
      {/* NUEVO: Sidebar para Desktop (Colapsable) */}
      <AppSidebar 
        // MODIFICADO: El hack sigue siendo útil si estamos en 'editor'
        currentView={currentView as NavView} 
        onNavigate={onSidebarNavigate}
        user={user!} // Sabemos que el usuario no es null aquí
        className="h-screen sticky top-0 hidden md:flex" // Layout para desktop
      />
      
      {/* NUEVO: Layout principal con header para móvil */}
      <main className="flex-1 flex flex-col w-full">
        
        {/* NUEVO: Header para Móvil con Menú (Sheet) */}
        <header className="sticky top-0 z-10 flex md:hidden items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
          <span className="text-xl font-bold text-primary">CVMaker</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              {/* Sidebar para Móvil (dentro del Sheet) */}
              <AppSidebar
                currentView={currentView as NavView}
                onNavigate={onSidebarNavigate}
                user={user!}
              />
            </SheetContent>
          </Sheet>
        </header>

        {/* Contenido de la Página */}
        <div className="flex-1 p-4 md:p-8">
          {renderAppView()}
        </div>
      </main>
      
      {/* Toaster para notificaciones */}
      <Toaster position="top-right" />
    </div>
  );
}