import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AuthViewUnifiedProps {
  onSuccess?: () => void; // called after a successful login/register
}

export function AuthViewUnified({ onSuccess }: AuthViewUnifiedProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth logic. For now call onSuccess to navigate.
    if (typeof onSuccess === 'function') {
      onSuccess();
      return;
    }

    alert('Funcionalidad de login - En desarrollo');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!registerData.agreeToTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // TODO: replace with real register logic. For now call onSuccess to navigate.
    if (typeof onSuccess === 'function') {
      onSuccess();
      return;
    }

    alert('Funcionalidad de registro - En desarrollo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo base oscuro */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Textura de cuadros oscuros */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(38, 38, 38, 0.8) 2px, transparent 2px),
            linear-gradient(90deg, rgba(38, 38, 38, 0.8) 2px, transparent 2px),
            linear-gradient(rgba(38, 38, 38, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38, 38, 38, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
        }}
      ></div>

      {/* Gradiente oscuro superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-transparent to-gray-950/50"></div>

      {/* Patrón de cuadros diagonales */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(55, 55, 55, 0.5) 35px,
              rgba(55, 55, 55, 0.5) 70px
            )
          `
        }}
      ></div>

      {/* Elementos decorativos con gradientes en grises */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>

      {/* Textura de ruido */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* No back button on auth screen when launched as the entry point */}

      <motion.div 
        className="w-full max-w-6xl relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login-layout"
                  className="contents"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Lado izquierdo - Formulario de Login */}
                  <motion.div 
                    className="p-12 flex flex-col justify-center order-1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="space-y-6">
                      <motion.div 
                        className="space-y-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2>Iniciar Sesión</h2>
                        <p className="text-muted-foreground">
                          Accede a tu cuenta y continúa creando currículums profesionales
                        </p>
                      </motion.div>

                      <motion.form 
                        onSubmit={handleLoginSubmit} 
                        className="space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Correo Electrónico</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="login-password">Contraseña</Label>
                            <button
                              type="button"
                              className="text-sm text-primary hover:underline"
                            >
                              ¿Olvidaste tu contraseña?
                            </button>
                          </div>
                          <div className="relative">
                            <Input
                              id="login-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full">
                          Iniciar Sesión
                        </Button>
                      </motion.form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-muted-foreground">o continúa con</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button variant="outline" type="button">
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Lado derecho - Contenido promocional */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center text-white relative overflow-hidden order-2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Patrón decorativo */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                      }}
                    ></div>
                    
                    <motion.div 
                      className="space-y-6 relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <h1 className="text-white mb-4">¡Bienvenido de vuelta!</h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Inicia sesión y continúa creando currículums que destacan
                        </p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { title: 'Plantillas profesionales', desc: 'Accede a 6 diseños elegantes y modernos' },
                          { title: 'Editor intuitivo', desc: 'Vista previa en tiempo real mientras editas' },
                          { title: 'Gestión simple', desc: 'Guarda y administra todos tus currículums' }
                        ].map((item, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <CheckCircle2 className="h-6 w-6 text-gray-300 shrink-0 mt-1" />
                            <div>
                              <h4 className="text-white mb-1">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div 
                        className="pt-8 border-t border-gray-700"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-gray-400 mb-3">¿Aún no tienes cuenta?</p>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                          onClick={() => setIsLogin(false)}
                        >
                          Crear Cuenta Gratis
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="register-layout"
                  className="contents"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* REGISTER VIEW */}
                  {/* Lado izquierdo - Contenido promocional */}
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center text-white relative overflow-hidden order-1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Patrón decorativo */}
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                      }}
                    ></div>
                    
                    <motion.div 
                      className="space-y-6 relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <h1 className="text-white mb-4">Crea tu cuenta ahora</h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Únete y diseña currículums profesionales que impresionan
                        </p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { title: '100% Gratis', desc: 'Sin costos ocultos ni suscripciones' },
                          { title: 'Diseños premium', desc: '6 plantillas elegantes en tonos grises y negros' },
                          { title: 'Fácil y rápido', desc: 'Crea tu primer CV profesional en minutos' }
                        ].map((item, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <CheckCircle2 className="h-6 w-6 text-gray-300 shrink-0 mt-1" />
                            <div>
                              <h4 className="text-white mb-1">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div 
                        className="pt-8 border-t border-gray-700"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-gray-400 mb-3">¿Ya tienes cuenta?</p>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                          onClick={() => setIsLogin(true)}
                        >
                          Iniciar Sesión
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Lado derecho - Formulario de Registro */}
                  <motion.div 
                    className="p-12 flex flex-col justify-center order-2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="space-y-6">
                      <motion.div 
                        className="space-y-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2>Crear Cuenta</h2>
                        <p className="text-muted-foreground">
                          Completa tus datos y comienza a crear currículums profesionales
                        </p>
                      </motion.div>

                      <motion.form 
                        onSubmit={handleRegisterSubmit} 
                        className="space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Nombre Completo</Label>
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="María García López"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">Correo Electrónico</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Contraseña</Label>
                          <div className="relative">
                            <Input
                              id="register-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={registerData.password}
                              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-confirm">Confirmar Contraseña</Label>
                          <div className="relative">
                            <Input
                              id="register-confirm"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox
                            id="terms"
                            checked={registerData.agreeToTerms}
                            onCheckedChange={(checked?: boolean) => 
                              setRegisterData({ ...registerData, agreeToTerms: !!checked })
                            }
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Acepto los{' '}
                            <button type="button" className="text-primary hover:underline">
                              términos y condiciones
                            </button>
                          </label>
                        </div>

                        <Button type="submit" className="w-full">
                          Crear Cuenta
                        </Button>
                      </motion.form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-muted-foreground">o regístrate con</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button variant="outline" type="button">
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-400">
            © 2025 CVMaker. Todos los derechos reservados.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
