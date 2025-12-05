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

interface MinimalistPremiumPreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function MinimalistPremiumPreview({ data, showPhoto = false }: MinimalistPremiumPreviewProps) {
  return (
    <div className="w-full h-full bg-white p-16 space-y-10">
      {/* Header centrado */}
      <div className="text-center space-y-3 pb-8 border-b border-gray-200">
        <h1 className="mb-2 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{data.name || 'Tu Nombre'}</h1>
        <p className="text-sm text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.email}>{data.email} {data.phone && `• ${data.phone}`}</p>
        <p className="text-sm text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={data.location}>{data.location}</p>
      </div>

      {/* Resumen */}
      {data.summary && (
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm leading-loose text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experiencia */}
      {data.experiences.length > 0 && (
        <div>
          <h3 className="text-center mb-8 uppercase tracking-widest text-sm">Experiencia</h3>
          <div className="space-y-8 max-w-2xl mx-auto">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="text-center">
                <h4 className="mb-2">{exp.position || 'Puesto'}</h4>
                <p className="text-sm text-gray-500 mb-3">{exp.company} {exp.period && `• ${exp.period}`}</p>
                {exp.description && <p className="text-sm text-gray-600 leading-relaxed break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={exp.description}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educación */}
      {data.education.length > 0 && (
        <div className="pt-6">
          <h3 className="text-center mb-8 uppercase tracking-widest text-sm">Educación</h3>
          <div className="space-y-6 max-w-2xl mx-auto">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h4 className="mb-2">{edu.degree || 'Título'}</h4>
                <p className="text-sm text-gray-500 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={edu.institution}>{edu.institution} {edu.period && `• ${edu.period}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habilidades */}
      {data.skills.length > 0 && data.skills[0] !== '' && (
        <div className="pt-6">
          <h3 className="text-center mb-8 uppercase tracking-widest text-sm">Habilidades</h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-sm text-gray-700 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap" title={skill}>
                {skill}
              </span>
            )).reduce<React.ReactNode[]>((prev, curr, index) => {
              if (index === 0) return [curr];
              return [...prev, <span key={`sep-${index}`} className="text-gray-300">•</span>, curr];
            }, [])}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {data.languages.length > 0 && (
        <div className="pt-6">
          <h3 className="text-center mb-8 uppercase tracking-widest text-sm">Idiomas</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {data.languages.map((lang) => (
              <span key={lang.id} className="text-sm text-gray-700 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.language}>
                {lang.language || 'Idioma'} <span className="text-gray-400 break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={lang.level}>({lang.level})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
