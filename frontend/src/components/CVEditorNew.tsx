import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { X, Save, Upload, Plus, Trash2, Edit2 } from 'lucide-react';
import { ExecutivePreview } from './templates/ExecutivePreview';
import { MinimalistPremiumPreview } from './templates/MinimalistPremiumPreview';
import { SidebarPreview } from './templates/SidebarPreview';
import { ModernGridPreview } from './templates/ModernGridPreview';
import { CompactPreview } from './templates/CompactPreview';
import { ElegantPreview } from './templates/ElegantPreview';

interface CVEditorNewProps {
  cvTitle: string;
  templateId: string;
  initialData?: any;
  onSave: (title: string, formData: any) => void;
  onExit: () => void;
}

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'languages';

export function CVEditorNew({ cvTitle, templateId, initialData, onSave, onExit }: CVEditorNewProps) {
  // Solo SidebarPreview y CompactPreview permiten foto
  const templatesWithPhoto = [
    'sidebar-dark', 
    'compact'      
  ];
  const supportsPhoto = templatesWithPhoto.includes(templateId);

  const [currentSection, setCurrentSection] = useState<Section>('personal');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(cvTitle);
  const [showPhoto, setShowPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    photo: '',
    experiences: [
      {
        id: '1',
        position: '',
        company: '',
        period: '',
        description: ''
      }
    ],
    education: [
      {
        id: '1',
        degree: '',
        institution: '',
        period: ''
      }
    ],
    skills: [''],
    languages: [
      { id: '1', language: '', level: '' }
    ]
  });

  const sections = [
    { id: 'personal', label: 'Datos Personales' },
    { id: 'experience', label: 'Experiencia Laboral' },
    { id: 'education', label: 'Educación' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'languages', label: 'Idiomas' },
  ];

  const updateExperience = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

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

  const updateEducation = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: Date.now().toString(),
          degree: '',
          institution: '',
          period: ''
        }
      ]
    });
  };

  const removeEducation = (id: string) => {
    setFormData({
      ...formData,
      education: formData.education.filter(edu => edu.id !== id)
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        {
          id: Date.now().toString(),
          language: '',
          level: ''
        }
      ]
    });
  };

  const removeLanguage = (id: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang.id !== id)
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen');
      return;
    }

    // Validar tamaño (max 2MB para base64)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no puede pesar más de 2MB');
      return;
    }

    // Convertir a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(title, formData);
  };

  // Renderizar el preview según la plantilla
  const renderPreview = () => {
    const previewProps = { data: formData, showPhoto };
    
    switch (templateId) {
      case 'executive':
        return <ExecutivePreview {...previewProps} />;
      case 'minimal-premium':
        return <MinimalistPremiumPreview {...previewProps} />;
      case 'sidebar-dark':
        return <SidebarPreview {...previewProps} />;
      case 'modern-grid':
        return <ModernGridPreview {...previewProps} />;
      case 'compact':
        return <CompactPreview {...previewProps} />;
      case 'elegant':
        return <ElegantPreview {...previewProps} />;
      default:
        return <ExecutivePreview {...previewProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Header */}
      <div className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {isEditingTitle ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingTitle(false);
                }}
                className="max-w-md"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="flex items-center gap-2 hover:text-gray-600 transition-colors"
              >
                <h3>{title}</h3>
                <Edit2 className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button variant="ghost" onClick={onExit} className="gap-2">
              <X className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="px-6 flex gap-1 border-t">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id as Section)}
              className={`px-6 py-3 border-b-2 transition-colors ${
                currentSection === section.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="grid lg:grid-cols-2 h-[calc(100vh-160px)]">
        {/* Form Panel */}
        <div className="overflow-y-auto p-8 bg-background">
          <div className="max-w-2xl mx-auto">
            {/* Datos Personales */}
            {currentSection === 'personal' && (
              <div className="space-y-6">
                <h3 className="mb-6">Datos Personales</h3>
                
                <div className="p-6 bg-card rounded-lg border space-y-4">
                  {/* Mostrar toggle/campo de foto solo si la plantilla lo soporta */}
                  {supportsPhoto && (
                    <>
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="photo-toggle">Incluir Foto de Perfil</Label>
                          <p className="text-sm text-muted-foreground">
                            Activa para agregar una foto a tu currículum
                          </p>
                        </div>
                        <Switch
                          id="photo-toggle"
                          checked={showPhoto}
                          onCheckedChange={setShowPhoto}
                        />
                      </div>
                      {/* Campo de foto solo si está activado */}
                      {showPhoto && (
                        <div>
                          <Label htmlFor="photo">Foto de Perfil</Label>
                          <input
                            ref={photoInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                          {formData.photo ? (
                            <div className="mt-2 space-y-2">
                              <img 
                                src={formData.photo} 
                                alt="Foto de perfil" 
                                className="w-32 h-32 object-cover rounded-lg border"
                              />
                              <div className="flex gap-2">
                                <Button 
                                  type="button"
                                  variant="outline" 
                                  className="flex-1 gap-2"
                                  onClick={() => photoInputRef.current?.click()}
                                >
                                  <Upload className="h-4 w-4" />
                                  Cambiar foto
                                </Button>
                                <Button 
                                  type="button"
                                  variant="destructive" 
                                  onClick={() => setFormData({...formData, photo: ''})}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button 
                              type="button"
                              variant="outline" 
                              className="mt-2 gap-2"
                              onClick={() => photoInputRef.current?.click()}
                            >
                              <Upload className="h-4 w-4" />
                              Subir foto
                            </Button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1"
                      placeholder="María García López"
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
                      placeholder="maria.garcia@ejemplo.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input 
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="mt-1"
                      placeholder="Ciudad de México, México"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="linkedin">LinkedIn (Opcional)</Label>
                    <Input 
                      id="linkedin"
                      value={formData.linkedin || ''}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      className="mt-1"
                      placeholder="linkedin.com/in/tu-perfil"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Sitio Web (Opcional)</Label>
                    <Input 
                      id="website"
                      value={formData.website || ''}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="mt-1"
                      placeholder="tusitioweb.com"
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
                      placeholder="Describe tu perfil profesional..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Experiencia Laboral */}
            {currentSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Experiencia Laboral</h3>
                  <Button onClick={addExperience} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir
                  </Button>
                </div>
                
                {formData.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-6 bg-card rounded-lg border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4>Experiencia {index + 1}</h4>
                      {formData.experiences.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label>Puesto</Label>
                      <Input 
                        value={exp.position} 
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="mt-1"
                        placeholder="Desarrollador Senior"
                      />
                    </div>
                    
                    <div>
                      <Label>Empresa</Label>
                      <Input 
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="mt-1"
                        placeholder="Tech Solutions"
                      />
                    </div>
                    
                    <div>
                      <Label>Periodo</Label>
                      <Input 
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                        className="mt-1" 
                        placeholder="2020 - Presente"
                      />
                    </div>
                    
                    <div>
                      <Label>Descripción</Label>
                      <Textarea 
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        className="mt-1" 
                        rows={3}
                        placeholder="Describe tus responsabilidades..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Educación */}
            {currentSection === 'education' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Educación</h3>
                  <Button onClick={addEducation} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir
                  </Button>
                </div>
                
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="p-6 bg-card rounded-lg border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4>Educación {index + 1}</h4>
                      {formData.education.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label>Título</Label>
                      <Input 
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="mt-1"
                        placeholder="Licenciatura en Administración"
                      />
                    </div>
                    
                    <div>
                      <Label>Institución</Label>
                      <Input 
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="mt-1"
                        placeholder="Universidad Nacional Autónoma de México"
                      />
                    </div>
                    
                    <div>
                      <Label>Periodo</Label>
                      <Input 
                        value={edu.period}
                        onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                        className="mt-1" 
                        placeholder="2015 - 2019"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Habilidades */}
            {currentSection === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Habilidades</h3>
                  <Button onClick={addSkill} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir
                  </Button>
                </div>
                
                {formData.skills.map((skill, index) => (
                  <div key={index} className="p-6 bg-card rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <h4>Habilidad {index + 1}</h4>
                      {formData.skills.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input 
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="React, TypeScript, Photoshop, etc."
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Idiomas */}
            {currentSection === 'languages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Idiomas</h3>
                  <Button onClick={addLanguage} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Añadir
                  </Button>
                </div>
                
                {formData.languages.map((lang, index) => (
                  <div key={lang.id} className="p-6 bg-card rounded-lg border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4>Idioma {index + 1}</h4>
                      {formData.languages.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLanguage(lang.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label>Idioma</Label>
                      <Input 
                        value={lang.language} 
                        onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                        className="mt-1" 
                        placeholder="Español"
                      />
                    </div>
                    
                    <div>
                      <Label>Nivel</Label>
                      <Input 
                        value={lang.level}
                        onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                        className="mt-1" 
                        placeholder="Nativo, Avanzado, Intermedio"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-100 p-8 overflow-y-auto border-l">
          <div className="max-w-[210mm] mx-auto bg-white shadow-lg aspect-[1/1.414]">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
