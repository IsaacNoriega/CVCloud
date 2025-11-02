import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { User, Upload, Mail, Lock, UserCircle, CheckCircle } from 'lucide-react';

export function UserSettingsWithSidebar() {
  const [userData, setUserData] = useState({
    name: 'María García',
    email: 'maria.garcia@ejemplo.com',
  });

  // Estados para los modales
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  // Estados temporales para los modales
  const [tempEmail, setTempEmail] = useState('');
  const [tempName, setTempName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOpenEmailModal = () => {
    setTempEmail(userData.email);
    setShowEmailModal(true);
  };

  const handleOpenNameModal = () => {
    setTempName(userData.name);
    setShowNameModal(true);
  };

  const handleSaveEmail = () => {
    if (tempEmail && tempEmail.includes('@')) {
      setUserData({ ...userData, email: tempEmail });
      setShowEmailModal(false);
      setTempEmail('');
      alert('Correo actualizado correctamente');
    } else {
      alert('Por favor ingresa un correo válido');
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserData({ ...userData, name: tempName });
      setShowNameModal(false);
      setTempName('');
      alert('Nombre actualizado correctamente');
    } else {
      alert('Por favor ingresa un nombre válido');
    }
  };

  const handleSavePassword = () => {
    if (!currentPassword) {
      alert('Por favor ingresa tu contraseña actual');
      return;
    }
    if (newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Contraseña actualizada correctamente');
  };

  return (
    <>
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">Configuración de Perfil</h1>
            <p className="text-muted-foreground">
              Gestiona tu información personal y seguridad de cuenta
            </p>
          </div>

          {/* Profile Photo Card */}
          <Card className="shadow-sm mb-6">
            <CardHeader className="border-b">
              <h2>Foto de Perfil</h2>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-12 w-12 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Cambiar foto
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG o GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card className="shadow-sm mb-6">
            <CardHeader className="border-b">
              <h2>Información Personal</h2>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Name Section */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleOpenNameModal}>
                    Cambiar
                  </Button>
                </div>

                {/* Email Section */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleOpenEmailModal}>
                    Cambiar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="shadow-sm">
            <CardHeader className="border-b">
              <h2>Seguridad</h2>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contraseña</p>
                    <p className="font-medium">••••••••</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
                  Cambiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para Cambiar Nombre */}
      <Dialog open={showNameModal} onOpenChange={setShowNameModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Nombre</DialogTitle>
            <DialogDescription>
              Actualiza tu nombre completo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="newName">Nuevo Nombre</Label>
              <Input
                id="newName"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="María García López"
                className="mt-2"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNameModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveName} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Cambiar Email */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Correo Electrónico</DialogTitle>
            <DialogDescription>
              Actualiza tu dirección de correo electrónico
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentEmail">Correo Actual</Label>
              <Input
                id="currentEmail"
                value={userData.email}
                disabled
                className="mt-2 bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="newEmail">Nuevo Correo</Label>
              <Input
                id="newEmail"
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="nuevo.correo@ejemplo.com"
                className="mt-2"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEmail} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Cambiar Contraseña */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Asegúrate de usar una contraseña segura
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPass">Contraseña Actual</Label>
              <Input
                id="currentPass"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="newPass">Nueva Contraseña</Label>
              <Input
                id="newPass"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mínimo 6 caracteres
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPass">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirmPass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePassword} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Actualizar Contraseña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
