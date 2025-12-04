
interface NavbarProps {
  onUserClick?: () => void; // Esto ahora será "Ajustes"
  onLogoClick?: () => void;
  onLogoutClick?: () => void; // Prop añadida para cerrar sesión
  userName?: string; // Prop opcional
  userEmail?: string; // Prop opcional
}

// eslint-disable-next-line no-empty-pattern
export function Navbar({ 
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <span className="text-xl font-bold text-primary">CVMaker</span>
        
      </div>
    </nav>
  );
}