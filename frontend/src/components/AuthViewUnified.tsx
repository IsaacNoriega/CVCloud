import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AuthViewUnifiedProps {
  onSuccess?: () => void;
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
    confirmPassword: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof onSuccess === 'function') {
      onSuccess();
      return;
    }

  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
   

    if (typeof onSuccess === 'function') {
      onSuccess();
      return;
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      
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

      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-transparent to-gray-950/50"></div>

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

      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>

      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>


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
                          Accede a tu cuenta
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
                              placeholder="•••••"
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

                     
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center text-white relative overflow-hidden order-2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
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
                        <h1 className="text-white mb-4">¡Bienvenido!</h1>
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

                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center text-white relative overflow-hidden order-1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
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
                          { title: 'Diseños premium', desc: 'Plantillas elegantes en tonos grises y negros' },
                          { title: 'Fácil y rápido', desc: 'Crea tu CV profesional en minutos' }
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

                       

                        <Button type="submit" className="w-full">
                          Crear Cuenta
                        </Button>
                      </motion.form>

                    

                      <div className="grid grid-cols-2 gap-3">
                        
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
