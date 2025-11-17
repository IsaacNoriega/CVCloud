import { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Upload } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserSettingsProps {
  onBack: () => void;
  user: UserProfile;
}

export function UserSettings({ onBack, user }: UserSettingsProps) {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // MODIFICADO: Lógica de guardado actualizada
  const handleSave = () => {
    const nameChanged = userData.name !== originalData.name;
    const emailChanged = userData.email !== originalData.email;
    const passwordChanged = userData.newPassword !== '';

    const requiresAuth = nameChanged || emailChanged || passwordChanged;

    // Si no se hizo ningún cambio, no hacemos nada.
    if (!requiresAuth) {
      alert('No se han realizado cambios.');
      return;
    }

    // Si se realizó cualquier cambio, la contraseña actual es obligatoria.
    if (userData.currentPassword === '') {
      alert('Por favor, ingresa tu contraseña actual para guardar los cambios.');
      return;
    }

    // --- Simulación de verificación de contraseña ---
    // En una aplicación real, esto se verificaría contra el backend.
    if (userData.currentPassword !== 'password123') { // Simula la contraseña correcta
      alert('La contraseña actual es incorrecta.');
      return;
    }
    // --- Fin de la simulación ---

    // Si el usuario intentó cambiar la contraseña, verificamos que coincidan
    if (passwordChanged) {
      if (userData.newPassword !== userData.confirmPassword) {
        alert('Las nuevas contraseñas no coinciden.');
        return;
      }
    }

    // Si todas las validaciones pasan:
    console.log('Guardar cambios:', {
      name: userData.name,
      email: userData.email,
      newPassword: userData.newPassword, // No enviarías la currentPassword
    });
    alert('Cambios guardados correctamente');

    // Opcional: Limpiar campos de contraseña después de guardar
    setUserData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    }));
    
    // En un caso real, aquí deberías actualizar 'originalData'
    // o volver a cargar los datos del usuario.
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
            {/* Profile Photo (Sin cambios) */}
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
            
            {/* Personal Information (Sin cambios en JSX) */}
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
            
            {/* MODIFICADO: Sección de Cambio de Contraseña */}
            {/* Se elimina el campo "Contraseña Actual" de esta sección */}
            <div className="space-y-4 pt-6 border-t">
              <h3>Cambiar Contraseña</h3>
              
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={userData.newPassword}
                  onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                  className="mt-1"
                  placeholder="Dejar en blanco para no cambiar"
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

            <div className="space-y-4 pt-6 border-t">
              <h3>Confirmar Cambios</h3>
              <p className="text-sm text-muted-foreground">
                Por seguridad, ingresa tu contraseña actual para guardar cualquier cambio.
              </p>
              <div>
                <Label htmlFor="currentPassword">Contraseña Actual (Requerida)</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={userData.currentPassword}
                  onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Save Button (Sin cambios en JSX) */}
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