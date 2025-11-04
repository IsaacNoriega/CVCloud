import { useState } from 'react';
import { AppSidebar } from './components/AppSidebar'; // Asume el sidebar colapsable mejorado
import { HomeView } from './components/HomeView';
import { DashboardWithSidebar } from './components/DashboardWithSidebar';
import { CVEditorNew } from './components/CVEditorNew';
import { UserSettingsWithSidebar } from './components/UserSettingsWithSidebar';
import { AuthViewUnified } from './components/AuthViewUnified';

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
}

// NUEVO: Datos de usuario de ejemplo (para el sidebar)
const dummyUser: UserProfile = {
  name: "María García",
  email: "maria.garcia@ejemplo.com",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  fallback: "MG",
};

export default function App() {
  // NUEVO: Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // NUEVO: Estado de usuario
  const [user, setUser] = useState<UserProfile | null>(null);

  // MODIFICADO: Vista inicial (si está autenticado)
  const [currentView, setCurrentView] = useState<View>('my-cvs');
  
  const [cvs, setCvs] = useState<CV[]>([
    { id: '1', title: 'CV Desarrollador Senior', templateId: 'executive' },
    { id: '2', title: 'CV Diseñador UX', templateId: 'minimal-premium' },
    { id: '3', title: 'CV Marketing Digital', templateId: 'sidebar-dark' },
  ]);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);

  // --- Handlers de CVs (Sin cambios) ---
  const handleSelectTemplate = (templateId: string) => {
    const newCV: CV = {
      id: Date.now().toString(),
      title: 'Currículum sin título',
      templateId: templateId,
    };
    setCvs([...cvs, newCV]);
    setCurrentCVId(newCV.id);
    setCurrentView('editor');
  };

  const handleEditCV = (id: string) => {
    setCurrentCVId(id);
    setCurrentView('editor');
  };

  const handleDownloadCV = (id: string) => {
    const cv = cvs.find(c => c.id === id);
    alert(`Descargando: ${cv?.title}`);
  };

  const handleDeleteCV = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este currículum?')) {
      setCvs(cvs.filter(c => c.id !== id));
    }
  };

  const handleSaveCV = (newTitle: string) => {
    if (currentCVId) {
      setCvs(cvs.map(cv => 
        cv.id === currentCVId ? { ...cv, title: newTitle } : cv
      ));
    }
    alert('Currículum guardado correctamente');
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
    setIsAuthenticated(true);
    setUser(dummyUser); // Cargar datos del usuario
    setCurrentView('my-cvs'); // Dirigir al dashboard
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null); // Limpiar usuario
    // No es necesario cambiar la vista, el guardián de auth se encargará
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
  if (currentView === 'editor' && currentCVId) {
    const currentCV = cvs.find(cv => cv.id === currentCVId);
    return (
      <CVEditorNew
        cvTitle={currentCV?.title || 'Nuevo Currículum'}
        templateId={currentCV?.templateId || 'executive'}
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
        return <UserSettingsWithSidebar />;
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
        currentView={currentView === 'editor' ? 'my-cvs' : currentView} 
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
                currentView={currentView === 'editor' ? 'my-cvs' : currentView}
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
    </div>
  );
}