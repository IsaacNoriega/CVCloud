import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyDashboardProps {
  onCreateNew: () => void;
  onUserClick: () => void;
}

export function EmptyDashboard({ onCreateNew, onUserClick }: EmptyDashboardProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onUserClick={onUserClick} />

      <main className="flex flex-1 items-center justify-center px-6">
        <motion.div
          className="text-center max-w-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <picture>
            <source
              srcSet="/images/empty-dark.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="/images/empty-light.svg"
              alt="Empty dashboard illustration"
              className="mx-auto mb-8 w-64 h-64 select-none pointer-events-none"
            />
          </picture>

          <h1 className="mb-4 text-3xl font-semibold tracking-tight">
            Tu próximo gran paso empieza aquí
          </h1>

          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            Crea un currículum profesional que destaque tus habilidades y experiencia de manera única.
          </p>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={onCreateNew}
              className="gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="h-5 w-5" />
              Crear nuevo currículum
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
