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

interface ExecutivePreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function ExecutivePreview({ data, showPhoto = false }: ExecutivePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-12 space-y-6">
      {/* Header con línea horizontal */}
      <div className="border-b-4 border-gray-900 pb-6">
        <h1 className="mb-3">{data.name || 'Tu Nombre'}</h1>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{data.email} {data.phone && `• ${data.phone}`}</p>
          <p className="text-sm text-gray-600">{data.location}</p>
          {(data.linkedin || data.website) && (
            <p className="text-sm text-gray-600">
              {data.linkedin && data.linkedin}
              {data.linkedin && data.website && ' • '}
              {data.website && data.website}
            </p>
          )}
        </div>
      </div>

      {/* Resumen */}
      {data.summary && (
        <div>
          <h3 className="mb-3 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Perfil Profesional</h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experiencia */}
      {data.experiences.length > 0 && (
        <div>
          <h3 className="mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Experiencia Laboral</h3>
          <div className="space-y-5 border-l-4 border-gray-900 pl-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <h4 className="mb-1">{exp.position || 'Puesto'}</h4>
                <p className="text-sm mb-2">{exp.company} {exp.period && `• ${exp.period}`}</p>
                {exp.description && <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educación */}
      {data.education.length > 0 && (
        <div>
          <h3 className="mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Educación</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h4 className="mb-1">{edu.degree || 'Título'}</h4>
                <p className="text-sm">{edu.institution} {edu.period && `• ${edu.period}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habilidades */}
      {data.skills.length > 0 && data.skills[0] !== '' && (
        <div>
          <h3 className="mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-gray-900 text-white text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {data.languages.length > 0 && (
        <div>
          <h3 className="mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Idiomas</h3>
          <div className="grid grid-cols-2 gap-3">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-sm">{lang.language || 'Idioma'}</span>
                <span className="text-sm text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
