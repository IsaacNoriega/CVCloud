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

interface TemplateSelectionNewProps {
  onBack: () => void;
  onSelectTemplate: (id: string) => void;
}

// Plantilla Ejecutivo - Diseño elegante con líneas horizontales
function ExecutiveTemplate() {
  return (
    <div className="w-full h-full bg-white p-8 flex flex-col gap-3">
      <div className="space-y-1 pb-3 border-b-2 border-gray-900">
        <div className="h-5 w-36 bg-gray-900 rounded"></div>
        <div className="h-2 w-28 bg-gray-400 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-gray-200 rounded"></div>
        <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-2 w-24 bg-gray-700 rounded"></div>
        <div className="pl-3 border-l-2 border-gray-900 space-y-1">
          <div className="h-2 w-full bg-gray-100 rounded"></div>
          <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Plantilla Minimalista Premium - Muy limpia con mucho espacio
function MinimalistPremiumTemplate() {
  return (
    <div className="w-full h-full bg-white p-10 flex flex-col gap-6">
      <div className="text-center space-y-2">
        <div className="h-4 w-32 bg-gray-900 rounded mx-auto"></div>
        <div className="h-1 w-20 bg-gray-300 rounded mx-auto"></div>
      </div>
      <div className="h-px bg-gray-200"></div>
      <div className="space-y-3">
        <div className="h-2 w-20 bg-gray-900 rounded"></div>
        <div className="space-y-1">
          <div className="h-1 w-full bg-gray-100 rounded"></div>
          <div className="h-1 w-5/6 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Plantilla Lateral - Barra lateral oscura
function SidebarTemplate() {
  return (
    <div className="w-full h-full flex">
      <div className="w-2/5 bg-gray-900 p-6 space-y-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto"></div>
        <div className="h-2 w-20 bg-gray-500 rounded mx-auto"></div>
        <div className="pt-4 space-y-2">
          <div className="h-2 w-full bg-gray-700 rounded"></div>
          <div className="h-2 w-4/5 bg-gray-700 rounded"></div>
        </div>
        <div className="pt-3 space-y-1">
          <div className="h-2 w-16 bg-gray-600 rounded"></div>
          <div className="flex gap-1">
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white p-6 space-y-3">
        <div className="h-3 w-28 bg-gray-900 rounded"></div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-100 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Plantilla Moderna - Grid con bloques
function ModernGridTemplate() {
  return (
    <div className="w-full h-full bg-gray-50 p-8">
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded space-y-2">
          <div className="h-3 w-32 bg-white rounded"></div>
          <div className="h-2 w-24 bg-gray-400 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="h-2 w-16 bg-gray-900 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            <div className="h-2 w-16 bg-gray-900 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Plantilla Compacta - Información densa y organizada
function CompactTemplate() {
  return (
    <div className="w-full h-full bg-white p-6">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-1">
            <div className="h-3 w-28 bg-gray-900 rounded"></div>
            <div className="h-2 w-20 bg-gray-400 rounded"></div>
          </div>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <div className="h-2 w-12 bg-gray-700 rounded"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-12 bg-gray-700 rounded"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-12 bg-gray-700 rounded"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Plantilla Elegante - Con líneas decorativas
function ElegantTemplate() {
  return (
    <div className="w-full h-full bg-white p-8 relative">
      <div className="absolute top-0 left-8 right-8 h-1 bg-gray-900"></div>
      <div className="pt-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="h-5 w-36 bg-gray-900 rounded mx-auto"></div>
          <div className="h-2 w-28 bg-gray-400 rounded mx-auto"></div>
          <div className="h-px w-20 bg-gray-300 mx-auto mt-3"></div>
        </div>
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            <div className="h-2 flex-1 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            <div className="h-2 flex-1 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const templates = [
  {
    id: 'executive',
    name: 'Ejecutivo',
    category: 'business',
    preview: <ExecutiveTemplate />
  },
  {
    id: 'minimal-premium',
    name: 'Minimalista Premium',
    category: 'business',
    preview: <MinimalistPremiumTemplate />
  },
  {
    id: 'sidebar-dark',
    name: 'Barra Lateral',
    category: 'creative',
    preview: <SidebarTemplate />
  },
  {
    id: 'modern-grid',
    name: 'Grid Moderno',
    category: 'creative',
    preview: <ModernGridTemplate />
  },
  {
    id: 'compact',
    name: 'Compacto',
    category: 'business',
    preview: <CompactTemplate />
  },
  {
    id: 'elegant',
    name: 'Elegante',
    category: 'business',
    preview: <ElegantTemplate />
  }
];

export function TemplateSelectionNew({ onBack, onSelectTemplate }: TemplateSelectionNewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'business', label: 'Empresariales' },
    { id: 'creative', label: 'Creativas' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        
        <h1 className="mb-4">Elige tu plantilla</h1>
        <p className="text-muted-foreground mb-8">
          Selecciona un diseño profesional para tu currículum
        </p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
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
