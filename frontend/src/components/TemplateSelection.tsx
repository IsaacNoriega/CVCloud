import { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: React.ReactNode;
}

interface TemplateSelectionProps {
  templates: Template[];
  onBack: () => void;
  onSelectTemplate: (id: string) => void;
}

export function TemplateSelection({ templates, onBack, onSelectTemplate }: TemplateSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'creative', label: 'Creativas' },
    { id: 'business', label: 'Empresariales' },
    { id: 'developer', label: 'Desarrollador' },
    { id: 'chef', label: 'Cocinero' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        
        <h1 className="mb-4">Elige el diseño que cuente tu historia</h1>
        <p className="text-muted-foreground mb-8">
          Selecciona una plantilla que refleje tu personalidad profesional
        </p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              category={categories.find(c => c.id === template.category)?.label || template.category}
              preview={template.preview}
              selected={selectedTemplate === template.id}
              onClick={(id) => setSelectedTemplate(id)}
            />
          ))}
        </div>
        
        {selectedTemplate && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
            <Button 
              size="lg" 
              onClick={() => onSelectTemplate(selectedTemplate)}
              className="shadow-lg"
            >
              Continuar con esta plantilla
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
