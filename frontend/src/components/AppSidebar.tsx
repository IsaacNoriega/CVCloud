import { Home, FileText, User, LogOut } from 'lucide-react';

interface AppSidebarProps {
  currentView: 'home' | 'my-cvs' | 'profile' | 'auth';
  onNavigate: (view: 'home' | 'my-cvs' | 'profile' | 'auth') => void;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'my-cvs', label: 'Mis Currículums', icon: FileText },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-sidebar-foreground">CVMaker</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === currentView;
            
            return (
              <li key={`${item.id}-${item.label}`}>
                <button
                  onClick={() => onNavigate(item.id as 'home' | 'my-cvs' | 'profile' | 'auth')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onNavigate('auth')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
