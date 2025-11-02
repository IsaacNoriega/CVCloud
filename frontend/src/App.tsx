import { useState } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { HomeView } from './components/HomeView';
import { DashboardWithSidebar } from './components/DashboardWithSidebar';
import { CVEditorNew } from './components/CVEditorNew';
import { UserSettingsWithSidebar } from './components/UserSettingsWithSidebar';
import { AuthViewUnified } from './components/AuthViewUnified';

type View = 'home' | 'my-cvs' | 'profile' | 'editor' | 'auth';

interface CV {
  id: string;
  title: string;
  thumbnail?: string;
  templateId: string;
}

export default function App() {
  // start app at the auth/login screen
  const [currentView, setCurrentView] = useState<View>('auth');
  const [cvs, setCvs] = useState<CV[]>([
    { id: '1', title: 'CV Desarrollador Senior', templateId: 'executive' },
    { id: '2', title: 'CV Diseñador UX', templateId: 'minimal-premium' },
    { id: '3', title: 'CV Marketing Digital', templateId: 'sidebar-dark' },
  ]);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);

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

  const handleNavigate = (view: 'home' | 'my-cvs' | 'profile' | 'auth') => {
    setCurrentView(view);
  };

  const handleCreateNewFromMyCVs = () => {
    setCurrentView('home');
  };

  // Vista del editor sin sidebar (pantalla completa)
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

  // Vista de Auth sin sidebar (pantalla completa)
  if (currentView === 'auth') {
    return (
      <AuthViewUnified
        onSuccess={() => setCurrentView('my-cvs')}
      />
    );
  }

  // Vistas con sidebar
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar 
        currentView={currentView === 'editor' ? 'my-cvs' : currentView} 
        onNavigate={handleNavigate}
      />
      
      {currentView === 'home' && (
        <HomeView
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {currentView === 'my-cvs' && (
        <DashboardWithSidebar
          cvs={cvs}
          onCreateNew={handleCreateNewFromMyCVs}
          onEditCV={handleEditCV}
          onDownloadCV={handleDownloadCV}
          onDeleteCV={handleDeleteCV}
        />
      )}

      {currentView === 'profile' && (
        <UserSettingsWithSidebar />
      )}
    </div>
  );
}
