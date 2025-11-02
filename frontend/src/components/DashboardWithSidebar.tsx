import { Button } from './ui/button';
import { CVCard } from './CVCard';
import { Plus } from 'lucide-react';

interface CV {
  id: string;
  title: string;
  thumbnail?: string;
  templateId?: string;
}

interface DashboardWithSidebarProps {
  cvs: CV[];
  onCreateNew: () => void;
  onEditCV: (id: string) => void;
  onDownloadCV: (id: string) => void;
  onDeleteCV: (id: string) => void;
}

export function DashboardWithSidebar({ cvs, onCreateNew, onEditCV, onDownloadCV, onDeleteCV }: DashboardWithSidebarProps) {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="mb-2">Mis Currículums</h1>
            <p className="text-muted-foreground">
              Gestiona y edita tus currículums profesionales
            </p>
          </div>
          <Button onClick={onCreateNew} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Crear nuevo
          </Button>
        </div>
        
        {cvs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="mb-4">Aún no tienes currículums</h2>
            <p className="text-muted-foreground mb-8">
              Crea tu primer currículum profesional ahora
            </p>
            <Button onClick={onCreateNew} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Crear nuevo currículum
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <CVCard
                key={cv.id}
                id={cv.id}
                title={cv.title}
                thumbnail={cv.thumbnail}
                templateId={cv.templateId}
                onEdit={onEditCV}
                onDownload={onDownloadCV}
                onDelete={onDeleteCV}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
