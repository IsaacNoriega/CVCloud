import { useState } from 'react';
import { 
  
  Home, 
  FileText, 
  User, 
  LogOut, 
  NotebookText, // Nuevo icono para el logo
  ChevronLeft    // Nuevo icono para colapsar
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Necesario
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './ui/tooltip'; // Necesario
import { Button } from './ui/button'; // Necesario

// Reemplaza la importación '@/lib/utils' que no se encuentra con un helper local `cn`.
function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

// --- Tipos (ligeramente modificados) ---
type NavView = 'home' | 'my-cvs' | 'profile';
type AppView = NavView | 'auth';

interface UserProfile {
  name: string;
  email: string;
  image?: string;
  fallback: string; // Ej. "MG"
}

interface AppSidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  user: UserProfile; // Prop de usuario añadida
  className?: string; // Para flexibilidad
}

const menuItems: { id: NavView; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'my-cvs', label: 'Mis Currículums', icon: FileText },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function AppSidebar({ 
  currentView, 
  onNavigate, 
  user, 
  className 
}: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // Envolvemos todo en el TooltipProvider
    <TooltipProvider delayDuration={0}>
      <aside 
        className={cn(
          "bg-muted flex flex-col border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64", // Ancho dinámico
          className // Permite clases externas
        )}
      >
        {/* --- 1. Encabezado del Sidebar (Logo y Botón de Colapso) --- */}
        <header className="flex items-center justify-between p-4 border-b h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className={cn(
              "flex items-center gap-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
              isCollapsed && "justify-center"
            )}
          >
            <NotebookText className="h-6 w-6 text-primary flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-primary whitespace-nowrap">
                CVMaker
              </span>
            )}
          </button>
          
          {/* Botón de Colapso (Solo visible en desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden md:flex" // Oculto en móvil (donde se usaría Sheet)
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-5 w-5 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </header>

        {/* --- 2. Navegación Principal --- */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentView;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "accent" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted-foreground",
                      isCollapsed && "justify-center" // Centrar icono
                    )}
                    onClick={() => onNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {/* El Tooltip solo se muestra si está colapsado */}
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* --- 3. Pie de Sidebar (Usuario y Cerrar Sesión) --- */}
        <footer className="p-2 border-t space-y-2">
          {/* Bloque de Perfil de Usuario */}
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            isCollapsed && "justify-center"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
          
          {/* Botón de Cerrar Sesión */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
                  isCollapsed && "justify-center"
                )}
                onClick={() => onNavigate('auth')}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Cerrar sesión</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Cerrar sesión</p>
              </TooltipContent>
            )}
          </Tooltip>
        </footer>
      </aside>
    </TooltipProvider>
  );
}