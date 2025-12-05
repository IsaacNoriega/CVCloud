// Plantillas que soportan foto
  // Solo SidebarPreview y CompactPreview permiten foto
  const templatesWithPhoto = [
    'SidebarPreview',
    'CompactPreview'
  ];
  // Suponiendo que tienes una variable templateId en el editor clásico, si no, agrega la lógica para obtenerla
  const templateId = 'SidebarPreview'; // Reemplaza esto por la lógica real de selección de plantilla
  const supportsPhoto = templatesWithPhoto.includes(templateId);
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { SaveModal } from './SaveModal';
import { X, Save, Upload, Plus, Trash2 } from 'lucide-react';

interface CVEditorProps {
  cvTitle: string;
  onSave: () => void;
  onExit: () => void;
}

export function CVEditor({ cvTitle, onSave, onExit }: CVEditorProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 600 000 000',
    location: 'Madrid, España',
    summary: 'Profesional con experiencia en desarrollo de software...',
    experiences: [
      {
        id: '1',
        position: 'Desarrollador Senior',
        company: 'Tech Solutions',
        period: '2020 - Presente',
        description: 'Desarrollo de aplicaciones web con React y Node.js'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Ingeniería Informática',
        institution: 'Universidad Complutense',
        period: '2015 - 2019'
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Git']
  });

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          id: Date.now().toString(),
          position: '',
          company: '',
          period: '',
          description: ''
        }
      ]
    });
  };

  const removeExperience = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter(exp => exp.id !== id)
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Navbar */}
      <div className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <h3>{cvTitle}</h3>
          <div className="flex items-center gap-3">
            <Button onClick={() => setShowSaveModal(true)} className="gap-2">
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button variant="ghost" onClick={onExit} className="gap-2">
              <X className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </div>

      {/* Split View */}
      <div className="grid lg:grid-cols-2 h-[calc(100vh-80px)]">
        {/* Form Panel */}
        <div className="overflow-y-auto p-8 bg-background">
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" defaultValue={['personal', 'experience', 'education', 'skills']} className="space-y-4">
              <AccordionItem value="personal" className="border rounded-lg px-6 bg-white">
                <AccordionTrigger>
                  <h3>Datos Personales</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  {/* Mostrar campo de foto solo si la plantilla lo soporta */}
                  {supportsPhoto && (
                    <div>
                      <Label htmlFor="photo">Foto de Perfil (Opcional)</Label>
                      <Button variant="outline" className="w-full mt-2 gap-2">
                        <Upload className="h-4 w-4" />
                        Subir foto
                      </Button>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input 
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="summary">Resumen Profesional</Label>
                    <Textarea 
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="experience" className="border rounded-lg px-6 bg-white">
                <AccordionTrigger>
                  <h3>Experiencia Laboral</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  {formData.experiences.map((exp, index) => (
                    <div key={exp.id} className="space-y-4 pb-6 border-b last:border-b-0">
                      <div className="flex items-center justify-between">
                        <h4>Experiencia {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label>Puesto</Label>
                        <Input 
                          value={exp.position} 
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label>Empresa</Label>
                        <Input 
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label>Periodo</Label>
                        <Input 
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label>Descripción</Label>
                        <Textarea 
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          className="mt-1" 
                          rows={3} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={addExperience} className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir Experiencia
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="education" className="border rounded-lg px-6 bg-white">
                <AccordionTrigger>
                  <h3>Educación</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  {formData.education.map((edu) => (
                    <div key={edu.id} className="space-y-4">
                      <div>
                        <Label>Título</Label>
                        <Input 
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label>Institución</Label>
                        <Input 
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label>Periodo</Label>
                        <Input 
                          value={edu.period}
                          onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills" className="border rounded-lg px-6 bg-white">
                <AccordionTrigger>
                  <h3>Habilidades</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div>
                    <Label>Habilidades (separadas por comas)</Label>
                    <Input 
                      value={formData.skills.join(', ')}
                      className="mt-1"
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-100 p-8 overflow-y-auto border-l">
          <div className="max-w-[210mm] mx-auto bg-white shadow-lg p-12 aspect-[1/1.414]">
            {/* CV Preview: solo datos, sin encabezados ni textos extra */}
            <div>
              <h1 className="mb-2">{formData.name}</h1>
              <p className="text-sm">{formData.email} • {formData.phone}</p>
              <p className="text-sm">{formData.location}</p>
              {formData.summary && (
                <p className="mt-4 text-sm">{formData.summary}</p>
              )}
              {formData.experiences.length > 0 && (
                <div className="mt-6">
                  {formData.experiences.map((exp) => (
                    <div key={exp.id} className="mb-2">
                      <strong>{exp.position}</strong> <span className="text-sm">{exp.company} • {exp.period}</span>
                      {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}
              {formData.education.length > 0 && (
                <div className="mt-6">
                  {formData.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <strong>{edu.degree}</strong> <span className="text-sm">{edu.institution} • {edu.period}</span>
                    </div>
                  ))}
                </div>
              )}
              {formData.skills.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SaveModal open={showSaveModal} onOpenChange={setShowSaveModal} onSave={onSave} />
    </div>
  );
}
