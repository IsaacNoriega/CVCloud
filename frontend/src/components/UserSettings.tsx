import { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Upload } from 'lucide-react';

interface UserSettingsProps {
  onBack: () => void;
}

export function UserSettings({ onBack }: UserSettingsProps) {
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    console.log('Guardar cambios:', userData);
    alert('Cambios guardados correctamente');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogoClick={onBack} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <h2>Ajustes de tu cuenta</h2>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Profile Photo */}
            <div>
              <Label className="mb-4 block">Foto de Perfil</Label>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?w=200&h=200&fit=crop" />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Cambiar foto
                </Button>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="space-y-4">
              <h3>Información Personal</h3>
              
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Password Change */}
            <div className="space-y-4 pt-6 border-t">
              <h3>Cambiar Contraseña</h3>
              
              <div>
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={userData.currentPassword}
                  onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={userData.newPassword}
                  onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Save Button */}
            <div className="pt-6">
              <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
