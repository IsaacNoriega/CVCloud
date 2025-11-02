import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface NavbarProps {
  onUserClick?: () => void;
  onLogoClick?: () => void;
}

export function Navbar({ onUserClick, onLogoClick }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="hover:opacity-80 transition-opacity"
        >
          <h3 className="text-primary">CVMaker</h3>
        </button>
        
        <button 
          onClick={onUserClick}
          className="hover:opacity-80 transition-opacity"
        >
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?w=100&h=100&fit=crop" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </nav>
  );
}
