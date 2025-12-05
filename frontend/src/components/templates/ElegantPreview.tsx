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

interface ElegantPreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function ElegantPreview({ data, showPhoto = false }: ElegantPreviewProps) {
  return (
    <div className="w-full h-full bg-white p-12 relative">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-12 right-12 h-2 bg-gray-900"></div>

      <div className="pt-10 space-y-8">
        {/* Header centrado elegante */}
        <div className="text-center space-y-3 pb-6">
          <h1 className="mb-3 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{data.name || 'Tu Nombre'}</h1>
          <div className="h-px w-24 bg-gray-300 mx-auto"></div>
          <p className="text-sm text-gray-600 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.email}>{data.email}</p>
          <p className="text-sm text-gray-600 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.phone}>{data.phone} {data.location && `• ${data.location}`}</p>
        </div>

        {/* Resumen */}
        {data.summary && (
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm leading-loose text-gray-700 italic">{data.summary}</p>
          </div>
        )}

        {/* Experiencia con bullet points elegantes */}
        {data.experiences.length > 0 && (
          <div className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gray-300"></div>
              <h3 className="uppercase tracking-widest text-sm">Experiencia</h3>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="flex gap-4">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="mb-1">{exp.position || 'Puesto'}</h4>
                    <p className="text-sm text-gray-600 mb-2">{exp.company} {exp.period && `• ${exp.period}`}</p>
                    {exp.description && <p className="text-sm text-gray-600 leading-relaxed break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={exp.description}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educación */}
        {data.education.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gray-300"></div>
              <h3 className="uppercase tracking-widest text-sm">Educación</h3>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
            <div className="space-y-5 max-w-3xl mx-auto">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="mb-1">{edu.degree || 'Título'}</h4>
                    <p className="text-sm text-gray-600 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={edu.institution}>{edu.institution} {edu.period && `• ${edu.period}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades e Idiomas en grid */}
        <div className="grid grid-cols-2 gap-8 pt-4 max-w-3xl mx-auto">
          {/* Habilidades */}
          {data.skills.length > 0 && data.skills[0] !== '' && (
            <div>
              <h3 className="text-center mb-4 uppercase tracking-widest text-sm">Habilidades</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap" title={skill}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-center mb-4 uppercase tracking-widest text-sm">Idiomas</h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-gray-700 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.language}>{lang.language || 'Idioma'}</span>
                      <span className="text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.level}>{lang.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
