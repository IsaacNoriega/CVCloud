import { Card, CardContent } from './ui/card';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  category: string;
  preview: React.ReactNode;
  selected?: boolean;
  onClick: (id: string) => void;
}

export function TemplateCard({ id, name, category, preview, selected, onClick }: TemplateCardProps) {
  return (
    <Card 
      className={`group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => onClick(id)}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-white relative overflow-hidden">
          {preview}
          
          {selected && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-2">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <h4 className="mb-1">{name}</h4>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </CardContent>
    </Card>
  );
}
