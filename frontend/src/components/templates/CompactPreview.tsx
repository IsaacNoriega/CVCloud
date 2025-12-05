export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
}

export interface CVData {
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



import React, { useState } from "react";

interface CompactPreviewProps {
  data: CVData;
  showPhoto?: boolean;
}

export function CompactPreview({ data, showPhoto = false }: CompactPreviewProps) {
  const [photoError, setPhotoError] = useState(false);
  return (
    <div className="w-full h-full bg-white p-10 space-y-5">
      {/* Header compacto con inicial o foto */}
      <div className="flex items-start gap-5 pb-5 border-b-2 border-gray-900">
        {showPhoto && (
          <>
            {data.photo && !photoError ? (
              <img
                src={data.photo}
                alt="Foto de perfil"
                className="w-20 h-20 object-cover rounded-full border-4 border-primary/30 shadow-md flex-shrink-0"
                onError={() => setPhotoError(true)}
              />
            ) : data.photo && photoError ? (
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 bg-red-100 border border-red-400 rounded-full">
                <span className="text-xs text-red-600 text-center px-2">La foto no se pudo cargar. Intenta con otra imagen.</span>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl text-white">{data.name ? data.name[0].toUpperCase() : 'T'}</span>
              </div>
            )}
          </>
        )}
        <div className="flex-1 pt-1">
          <h1 className="mb-2">{data.name || 'Tu Nombre'}</h1>
          <p className="text-sm text-gray-600">{data.email}</p>
          <p className="text-sm text-gray-600">{data.phone} {data.location && `• ${data.location}`}</p>
        </div>
      </div>

      {/* Resumen compacto */}
      {data.summary && (
        <div>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Grid de 3 columnas */}
      <div className="grid grid-cols-3 gap-6 pt-3">
        {/* Experiencia */}
        {data.experiences.length > 0 && (
          <div className="col-span-2">
            <h3 className="mb-4 uppercase tracking-wide text-sm">Experiencia</h3>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <h4 className="mb-1 text-sm">{exp.position || 'Puesto'}</h4>
                  <p className="text-xs text-gray-600 mb-2">{exp.company} • {exp.period}</p>
                  {exp.description && <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Educación */}
          {data.education.length > 0 && (
            <div>
              <h3 className="mb-3 uppercase tracking-wide text-sm">Educación</h3>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="mb-1 text-sm">{edu.degree || 'Título'}</h4>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades */}
          {data.skills.length > 0 && data.skills[0] !== '' && (
            <div>
              <h3 className="mb-3 uppercase tracking-wide text-sm">Habilidades</h3>
              <div className="space-y-1">
                {data.skills.map((skill, index) => (
                  <p key={index} className="text-xs text-gray-700">{skill}</p>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {data.languages.length > 0 && (
            <div>
              <h3 className="mb-3 uppercase tracking-wide text-sm">Idiomas</h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="text-xs">{lang.language || 'Idioma'}</p>
                    <p className="text-xs text-gray-500">{lang.level}</p>
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
