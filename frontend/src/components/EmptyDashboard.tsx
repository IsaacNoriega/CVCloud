import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface EmptyDashboardProps {
  onCreateNew: () => void;
  onUserClick: () => void;
}

export function EmptyDashboard({ onCreateNew, onUserClick }: EmptyDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onUserClick={onUserClick} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-2xl px-6">
          <h1 className="mb-6">Tu próximo gran paso empieza aquí</h1>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            Crea un currículum profesional que destaque tus habilidades y experiencia de manera única.
          </p>
          <Button size="lg" onClick={onCreateNew} className="gap-2">
            <Plus className="h-5 w-5" />
            Crear nuevo currículum
          </Button>
        </div>
      </div>
    </div>
  );
}
