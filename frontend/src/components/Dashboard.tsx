import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { CVCard } from './CVCard';
import { Plus } from 'lucide-react';

interface CV {
  id: string;
  title: string;
  thumbnail?: string;
}

interface DashboardProps {
  cvs: CV[];
  onCreateNew: () => void;
  onEditCV: (id: string) => void;
  onDownloadCV: (id: string) => void;
  onDeleteCV: (id: string) => void;
  onUserClick: () => void;
}

export function Dashboard({ cvs, onCreateNew, onEditCV, onDownloadCV, onDeleteCV, onUserClick }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onUserClick={onUserClick} />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h2>Mis Currículums</h2>
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-5 w-5" />
            Crear nuevo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map((cv) => (
            <CVCard
              key={cv.id}
              id={cv.id}
              title={cv.title}
              thumbnail={cv.thumbnail}
              onEdit={onEditCV}
              onDownload={onDownloadCV}
              onDelete={onDeleteCV}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
