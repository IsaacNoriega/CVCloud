import { User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavbarProps {
  onUserClick?: () => void; // Esto ahora será "Ajustes"
  onLogoClick?: () => void;
  onLogoutClick?: () => void; // Prop añadida para cerrar sesión
  userName?: string; // Prop opcional
  userEmail?: string; // Prop opcional
}

export function Navbar({ 
  onUserClick, 
  onLogoClick, 
  onLogoutClick,
  userName = "Usuario",
  userEmail = "usuario@email.com"
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        <button 
          onClick={onLogoClick}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Ir a la página de inicio"
        >
          <span className="text-xl font-bold text-primary">CVMaker</span>
        </button>
        
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild>
            <button
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Abrir menú de usuario"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?w=100&h=100&fit-crop" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger> */}
          
          <DropdownMenuContent align="end" className="w-56">
            {/* <DropdownMenuLabel>
              <p className="font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground font-normal truncate">
                {userEmail}
              </p>
            </DropdownMenuLabel> */}
            
            <DropdownMenuSeparator />
            
            {/* Aquí usamos la prop onUserClick que pasó */}
            {/* <DropdownMenuItem onClick={onUserClick} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Ajustes</span>
            </DropdownMenuItem> */}
            
            <DropdownMenuSeparator />
{/*             
            <DropdownMenuItem 
              onClick={onLogoutClick} 
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}