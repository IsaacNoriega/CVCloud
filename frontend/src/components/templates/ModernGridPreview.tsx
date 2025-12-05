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

interface ModernGridPreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function ModernGridPreview({ data, showPhoto = false }: ModernGridPreviewProps) {
  return (
    <div className="w-full h-full bg-gray-50 p-10 space-y-6">
      {/* Header en bloque oscuro */}
      <div className="bg-gray-900 text-white p-8 rounded-lg space-y-2">
          <h1 className="text-white mb-3 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{data.name || 'Tu Nombre'}</h1>
          <p className="text-sm text-gray-300 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.email}>{data.email} {data.phone && `• ${data.phone}`}</p>
          <p className="text-sm text-gray-300 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.location}>{data.location}</p>
      </div>

      {/* Resumen */}
      {data.summary && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="mb-3 uppercase tracking-wide">Resumen</h3>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Grid de secciones */}
      <div className="grid grid-cols-2 gap-6">
        {/* Experiencia */}
        {data.experiences.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2">
            <h3 className="mb-4 uppercase tracking-wide">Experiencia</h3>
            <div className="space-y-5">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <h4 className="mb-1">{exp.position || 'Puesto'}</h4>
                  <p className="text-sm text-gray-600 mb-2">{exp.company} {exp.period && `• ${exp.period}`}</p>
                      {exp.description && <p className="text-sm text-gray-600 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={exp.description}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educación */}
        {data.education.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="mb-4 uppercase tracking-wide">Educación</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="mb-1">{edu.degree || 'Título'}</h4>
                      <p className="text-sm text-gray-600 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={edu.institution}>{edu.institution}</p>
                      <p className="text-sm text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={edu.period}>{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {data.skills.length > 0 && data.skills[0] !== '' && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="mb-4 uppercase tracking-wide">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-900 text-white text-xs rounded max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap" title={skill}>
                    {skill}
                  </span>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.languages.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2">
            <h3 className="mb-4 uppercase tracking-wide">Idiomas</h3>
            <div className="grid grid-cols-3 gap-4">
              {data.languages.map((lang) => (
                <div key={lang.id} className="space-y-1">
                      <p className="text-sm break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.language}>{lang.language || 'Idioma'}</p>
                      <p className="text-sm text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.level}>{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
