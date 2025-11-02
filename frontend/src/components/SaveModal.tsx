import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Save, Copy } from 'lucide-react';

interface SaveModalProps {
  open: boolean;
  onClose: () => void;
  onUpdateOriginal: () => void;
  onSaveAsCopy: () => void;
}

export function SaveModal({ open, onClose, onUpdateOriginal, onSaveAsCopy }: SaveModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¿Cómo quieres guardar?</DialogTitle>
          <DialogDescription>
            Elige si quieres actualizar el currículum existente o crear una copia nueva.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => {
              onUpdateOriginal();
              onClose();
            }}
            className="w-full justify-start gap-3 h-auto py-4"
          >
            <Save className="h-5 w-5" />
            <div className="text-left">
              <div>Actualizar el original</div>
              <div className="text-xs opacity-80">Sobrescribe el currículum actual</div>
            </div>
          </Button>
          
          <Button
            onClick={() => {
              onSaveAsCopy();
              onClose();
            }}
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-4"
          >
            <Copy className="h-5 w-5" />
            <div className="text-left">
              <div>Guardar como una copia</div>
              <div className="text-xs opacity-60">Crea un nuevo currículum</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
