import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Mail, Lock, UserCircle, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';
import userService from '../services/userService';
import authService from '../services/authService';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserSettingsWithSidebarProps {
  user: UserProfile;
  onUserUpdate: (updatedUser: UserProfile) => void;
  onAccountDeleted?: () => void;
}

export function UserSettingsWithSidebar({ user, onUserUpdate, onAccountDeleted }: UserSettingsWithSidebarProps) {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });

  // Estados para los modales
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estados temporales para los modales
  const [tempEmail, setTempEmail] = useState('');
  const [tempName, setTempName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleOpenEmailModal = () => {
    setTempEmail(userData.email);
    setShowEmailModal(true);
  };

  const handleOpenNameModal = () => {
    setTempName(userData.name);
    setShowNameModal(true);
  };

  const handleSaveEmail = async () => {
    if (tempEmail && tempEmail.includes('@')) {
      try {
        const updatedUser = await userService.updateUser(user.id, { email: tempEmail });
        setUserData({ ...userData, email: tempEmail });
        onUserUpdate(updatedUser);
        setShowEmailModal(false);
        setTempEmail('');
        toast.success('Correo actualizado correctamente');
      } catch (error: any) {
        console.error('Error updating email:', error);
        toast.error(error.message || 'Error al actualizar el correo');
      }
    } else {
      toast.error('Por favor ingresa un correo válido');
    }
  };

  const handleSaveName = async () => {
    if (tempName.trim()) {
      try {
        const updatedUser = await userService.updateUser(user.id, { name: tempName });
        setUserData({ ...userData, name: tempName });
        onUserUpdate(updatedUser);
        setShowNameModal(false);
        setTempName('');
        toast.success('Nombre actualizado correctamente');
      } catch (error: any) {
        console.error('Error updating name:', error);
        toast.error(error.message || 'Error al actualizar el nombre');
      }
    } else {
      toast.error('Por favor ingresa un nombre válido');
    }
  };

  const handleSavePassword = async () => {
    if (!currentPassword) {
      toast.error('Por favor ingresa tu contraseña actual');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await userService.updateUser(user.id, {
        currentPassword,
        newPassword
      });
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Contraseña actualizada correctamente');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Error al actualizar la contraseña');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'ELIMINAR') {
      toast.error('Debes escribir "ELIMINAR" para confirmar');
      return;
    }

    try {
      await userService.deleteUser(user.id);
      toast.success('Cuenta eliminada exitosamente');
      authService.logout();
      setShowDeleteModal(false);
      if (onAccountDeleted) {
        onAccountDeleted();
      }
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error(error.message || 'Error al eliminar la cuenta');
    }
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

          {/* Danger Zone - Delete Account */}
          <Card className="shadow-sm mt-8">
            <CardHeader className="border-b">
              <h2>Zona Peligrosa</h2>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/30 hover:bg-destructive/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-destructive">Eliminar Cuenta</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Esta acción eliminará permanentemente tu cuenta y todos tus CVs
                    </p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => setShowDeleteModal(true)}
                >
                  Eliminar
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

      {/* Modal para Eliminar Cuenta */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Eliminar Cuenta Permanentemente
            </DialogTitle>
            <DialogDescription className="text-left pt-2">
              Esta acción es <strong>irreversible</strong>. Se eliminarán:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Tu cuenta de usuario</li>
                <li>Todos tus CVs guardados</li>
                <li>Toda tu información personal</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Para confirmar, escribe <strong>ELIMINAR</strong> en el campo:</p>
              <Input
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Escribe ELIMINAR"
                className="mt-2 border-destructive/50 focus:border-destructive"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmation('');
              }}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== 'ELIMINAR'}
              className="flex-1 sm:flex-none gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
