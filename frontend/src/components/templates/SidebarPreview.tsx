interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

interface Language {
  id: string;
  language: string;
  level: string;
}

interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
  photo?: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
}

interface SidebarPreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function SidebarPreview({ data, showPhoto = false }: SidebarPreviewProps) {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar oscura */}
      <div className="w-[40%] bg-gray-900 p-8 space-y-8 text-white">
        <div className="text-center space-y-4">
          {showPhoto && (
            <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
              <span className="text-4xl">{data.name ? data.name[0].toUpperCase() : 'T'}</span>
            </div>
          )}
          <h2 className="text-white">{data.name || 'Tu Nombre'}</h2>
        </div>

        <div className="space-y-3 pt-4">
          <div>
            <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Contacto</h4>
            <p className="text-sm text-gray-300 break-words">{data.email}</p>
            <p className="text-sm text-gray-300">{data.phone}</p>
            <p className="text-sm text-gray-300">{data.location}</p>
          </div>
        </div>

        {/* Habilidades en sidebar */}
        {data.skills.length > 0 && data.skills[0] !== '' && (
          <div>
            <h4 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Habilidades</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-800 text-white text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas en sidebar */}
        {data.languages.length > 0 && (
          <div>
            <h4 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Idiomas</h4>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">{lang.language || 'Idioma'}</span>
                  <span className="text-gray-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-white p-10 space-y-8">
        {/* Resumen */}
        {data.summary && (
          <div>
            <h3 className="mb-3 uppercase tracking-wide">Perfil</h3>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experiencia */}
        {data.experiences.length > 0 && (
          <div>
            <h3 className="mb-4 uppercase tracking-wide">Experiencia</h3>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <h4 className="mb-1">{exp.position || 'Puesto'}</h4>
                  <p className="text-sm text-gray-600 mb-2">{exp.company} {exp.period && `• ${exp.period}`}</p>
                  {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educación */}
        {data.education.length > 0 && (
          <div>
            <h3 className="mb-4 uppercase tracking-wide">Educación</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="mb-1">{edu.degree || 'Título'}</h4>
                  <p className="text-sm text-gray-600">{edu.institution} {edu.period && `• ${edu.period}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
