import type { CVData } from '../services/cvService';

export function generateExecutiveHTML(data: CVData): string {
  const { formData } = data;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name} - CV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
    }
    
    .header {
      border-bottom: 4px solid #2c3e50;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .name {
      font-size: 32px;
      font-weight: bold;
      text-transform: uppercase;
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 12px;
      color: #555;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      color: #2c3e50;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
    
    .summary {
      font-size: 13px;
      line-height: 1.8;
      color: #444;
      text-align: justify;
    }
    
    .experience-item, .education-item {
      margin-bottom: 20px;
    }
    
    .exp-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    
    .position {
      font-size: 15px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .company {
      font-size: 13px;
      color: #555;
      font-style: italic;
    }
    
    .period {
      font-size: 12px;
      color: #777;
    }
    
    .description {
      font-size: 12px;
      line-height: 1.6;
      color: #444;
      margin-top: 8px;
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .skill-tag {
      background: #2c3e50;
      color: white;
      padding: 5px 15px;
      border-radius: 15px;
      font-size: 12px;
    }
    
    .languages-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    
    .language-item {
      font-size: 13px;
      color: #444;
    }
    
    .language-name {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="name">${formData.name}</div>
      <div class="contact-info">
        <span>${formData.email}</span>
        <span>${formData.phone}</span>
        <span>${formData.location}</span>
        ${formData.linkedin ? `<span>${formData.linkedin}</span>` : ''}
        ${formData.website ? `<span>${formData.website}</span>` : ''}
      </div>
    </div>

    ${formData.summary ? `
    <div class="section">
      <div class="section-title">Resumen Profesional</div>
      <div class="summary">${formData.summary}</div>
    </div>
    ` : ''}

    ${formData.experiences && formData.experiences.length > 0 ? `
    <div class="section">
      <div class="section-title">Experiencia Laboral</div>
      ${formData.experiences.map(exp => `
        <div class="experience-item">
          <div class="exp-header">
            <div>
              <div class="position">${exp.position}</div>
              <div class="company">${exp.company}</div>
            </div>
            <div class="period">${exp.period}</div>
          </div>
          ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${formData.education && formData.education.length > 0 ? `
    <div class="section">
      <div class="section-title">Educación</div>
      ${formData.education.map(edu => `
        <div class="education-item">
          <div class="exp-header">
            <div>
              <div class="position">${edu.degree}</div>
              <div class="company">${edu.institution}</div>
            </div>
            <div class="period">${edu.period}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${formData.skills && formData.skills.length > 0 ? `
    <div class="section">
      <div class="section-title">Habilidades</div>
      <div class="skills-list">
        ${formData.skills.map(skill => `
          <div class="skill-tag">${skill}</div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${formData.languages && formData.languages.length > 0 ? `
    <div class="section">
      <div class="section-title">Idiomas</div>
      <div class="languages-list">
        ${formData.languages.map(lang => `
          <div class="language-item">
            <span class="language-name">${lang.language}:</span> ${lang.level}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

export function generateMinimalistHTML(data: CVData): string {
  const { formData } = data;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name} - CV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Georgia', serif;
      line-height: 1.8;
      color: #333;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 25mm;
      background: white;
    }
    
    .header {
      text-align: center;
      border-bottom: 1px solid #ddd;
      padding-bottom: 25px;
      margin-bottom: 35px;
    }
    
    .name {
      font-size: 36px;
      font-weight: normal;
      letter-spacing: 2px;
      margin-bottom: 15px;
    }
    
    .contact-info {
      font-size: 12px;
      color: #666;
      letter-spacing: 1px;
    }
    
    .contact-info span {
      margin: 0 10px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .summary {
      font-size: 13px;
      line-height: 2;
      color: #555;
      text-align: center;
      max-width: 80%;
      margin: 0 auto;
    }
    
    .experience-item, .education-item {
      margin-bottom: 25px;
      padding-left: 20px;
    }
    
    .position {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 3px;
    }
    
    .company {
      font-size: 12px;
      color: #666;
      font-style: italic;
      margin-bottom: 3px;
    }
    
    .period {
      font-size: 11px;
      color: #999;
      margin-bottom: 8px;
    }
    
    .description {
      font-size: 12px;
      line-height: 1.8;
      color: #555;
    }
    
    .skills-list {
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    
    .languages-list {
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    
    .language-item {
      display: inline-block;
      margin: 0 15px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="name">${formData.name}</div>
      <div class="contact-info">
        <span>${formData.email}</span>
        <span>•</span>
        <span>${formData.phone}</span>
        <span>•</span>
        <span>${formData.location}</span>
        ${formData.linkedin ? `<span>•</span><span>${formData.linkedin}</span>` : ''}
        ${formData.website ? `<span>•</span><span>${formData.website}</span>` : ''}
      </div>
    </div>

    ${formData.summary ? `
    <div class="section">
      <div class="section-title">Sobre Mí</div>
      <div class="summary">${formData.summary}</div>
    </div>
    ` : ''}

    ${formData.experiences && formData.experiences.length > 0 ? `
    <div class="section">
      <div class="section-title">Experiencia</div>
      ${formData.experiences.map(exp => `
        <div class="experience-item">
          <div class="position">${exp.position}</div>
          <div class="company">${exp.company}</div>
          <div class="period">${exp.period}</div>
          ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${formData.education && formData.education.length > 0 ? `
    <div class="section">
      <div class="section-title">Educación</div>
      ${formData.education.map(edu => `
        <div class="education-item">
          <div class="position">${edu.degree}</div>
          <div class="company">${edu.institution}</div>
          <div class="period">${edu.period}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${formData.skills && formData.skills.length > 0 ? `
    <div class="section">
      <div class="section-title">Habilidades</div>
      <div class="skills-list">
        ${formData.skills.join(' • ')}
      </div>
    </div>
    ` : ''}

    ${formData.languages && formData.languages.length > 0 ? `
    <div class="section">
      <div class="section-title">Idiomas</div>
      <div class="languages-list">
        ${formData.languages.map(lang => `
          <div class="language-item">
            ${lang.language} (${lang.level})
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

function generateElegantHTML(cvData: CVData): string {
  const { formData } = cvData;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'CV'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page { size: A4; margin: 0; }
    .container {
      width: 210mm;
      height: 297mm;
      background: white;
      padding: 50px;
      position: relative;
    }
    .decorative-line {
      position: absolute;
      top: 0;
      left: 50px;
      right: 50px;
      height: 8px;
      background: #1a1a2e;
    }
    .header {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 400;
      color: #1a1a2e;
      margin-bottom: 15px;
    }
    .divider {
      height: 1px;
      width: 100px;
      background: #d1d5db;
      margin: 0 auto;
    }
    .contact {
      font-size: 12px;
      color: #6b7280;
      margin-top: 12px;
    }
    .summary {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 40px;
      font-size: 12px;
      line-height: 1.8;
      color: #4b5563;
      font-style: italic;
    }
    .section {
      margin-bottom: 35px;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 25px;
    }
    .section-line {
      flex: 1;
      height: 1px;
      background: #d1d5db;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #1a1a2e;
      font-weight: 600;
    }
    .content-wrapper {
      max-width: 700px;
      margin: 0 auto;
    }
    .item {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
    }
    .bullet {
      width: 12px;
      height: 12px;
      background: #1a1a2e;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 5px;
    }
    .item-subtitle {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .item-description {
      font-size: 11px;
      color: #6b7280;
      line-height: 1.6;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      max-width: 700px;
      margin: 0 auto;
    }
    .skill-item, .language-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .small-bullet {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .skill-text, .language-text {
      font-size: 11px;
      color: #4b5563;
    }
    .language-level {
      font-size: 11px;
      color: #9ca3af;
      margin-left: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="decorative-line"></div>
    
    <div class="header">
      <h1>${formData.name || 'Tu Nombre'}</h1>
      <div class="divider"></div>
      <div class="contact">
        ${formData.email}${formData.phone ? ` • ${formData.phone}` : ''}${formData.location ? ` • ${formData.location}` : ''}
      </div>
    </div>

    ${formData.summary ? `
    <div class="summary">${formData.summary}</div>
    ` : ''}

    ${formData.experiences && formData.experiences.length > 0 ? `
    <div class="section">
      <div class="section-header">
        <div class="section-line"></div>
        <div class="section-title">Experiencia</div>
        <div class="section-line"></div>
      </div>
      <div class="content-wrapper">
        ${formData.experiences.map(exp => `
          <div class="item">
            <div class="bullet"></div>
            <div class="item-content">
              <div class="item-title">${exp.position || 'Puesto'}</div>
              <div class="item-subtitle">${exp.company}${exp.period ? ` • ${exp.period}` : ''}</div>
              ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${formData.education && formData.education.length > 0 ? `
    <div class="section">
      <div class="section-header">
        <div class="section-line"></div>
        <div class="section-title">Educación</div>
        <div class="section-line"></div>
      </div>
      <div class="content-wrapper">
        ${formData.education.map(edu => `
          <div class="item">
            <div class="bullet"></div>
            <div class="item-content">
              <div class="item-title">${edu.degree || 'Título'}</div>
              <div class="item-subtitle">${edu.institution}${edu.period ? ` • ${edu.period}` : ''}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${(formData.skills && formData.skills.length > 0 && formData.skills[0] !== '') || (formData.languages && formData.languages.length > 0) ? `
    <div class="section">
      <div class="grid-2">
        ${formData.skills && formData.skills.length > 0 && formData.skills[0] !== '' ? `
        <div>
          <div class="section-title" style="text-align: center; margin-bottom: 20px;">Habilidades</div>
          ${formData.skills.map(skill => `
            <div class="skill-item">
              <div class="small-bullet"></div>
              <span class="skill-text">${skill}</span>
            </div>
          `).join('')}
        </div>
        ` : ''}
        ${formData.languages && formData.languages.length > 0 ? `
        <div>
          <div class="section-title" style="text-align: center; margin-bottom: 20px;">Idiomas</div>
          ${formData.languages.map(lang => `
            <div class="language-item">
              <div class="small-bullet"></div>
              <div style="flex: 1; display: flex; justify-content: space-between;">
                <span class="language-text">${lang.language || 'Idioma'}</span>
                <span class="language-level">${lang.level}</span>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

function generateCompactHTML(cvData: CVData): string {
  const { formData } = cvData;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'CV'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page { size: A4; margin: 0; }
    .container {
      width: 210mm;
      height: 297mm;
      background: white;
      padding: 40px;
    }
    .header {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      padding-bottom: 20px;
      border-bottom: 2px solid #1a1a2e;
      margin-bottom: 20px;
    }
    .initial-circle {
      width: 80px;
      height: 80px;
      background: #1a1a2e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 36px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .header-info {
      flex: 1;
      padding-top: 5px;
    }
    .header-info h1 {
      font-size: 28px;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .contact-line {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 3px;
    }
    .summary {
      font-size: 11px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 20px;
    }
    .grid-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 25px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1a1a2e;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .exp-item, .edu-item {
      margin-bottom: 15px;
    }
    .item-title {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 3px;
    }
    .item-subtitle {
      font-size: 10px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .item-description {
      font-size: 10px;
      color: #6b7280;
      line-height: 1.5;
    }
    .skill-list, .language-list {
      font-size: 10px;
      color: #4b5563;
    }
    .skill-list p, .language-list p {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="initial-circle">
        ${formData.name ? formData.name[0].toUpperCase() : 'T'}
      </div>
      <div class="header-info">
        <h1>${formData.name || 'Tu Nombre'}</h1>
        ${formData.email ? `<div class="contact-line">${formData.email}</div>` : ''}
        <div class="contact-line">${formData.phone || ''}${formData.phone && formData.location ? ' • ' : ''}${formData.location || ''}</div>
      </div>
    </div>

    ${formData.summary ? `
    <div class="summary">${formData.summary}</div>
    ` : ''}

    <div class="grid-layout">
      <div>
        ${formData.experiences && formData.experiences.length > 0 ? `
        <div class="section">
          <div class="section-title">Experiencia</div>
          ${formData.experiences.map(exp => `
            <div class="exp-item">
              <div class="item-title">${exp.position || 'Puesto'}</div>
              <div class="item-subtitle">${exp.company} • ${exp.period}</div>
              ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>

      <div>
        ${formData.education && formData.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Educación</div>
          ${formData.education.map(edu => `
            <div class="edu-item">
              <div class="item-title">${edu.degree || 'Título'}</div>
              <div class="item-subtitle">${edu.institution}</div>
              <div class="item-subtitle">${edu.period}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${formData.skills && formData.skills.length > 0 && formData.skills[0] !== '' ? `
        <div class="section">
          <div class="section-title">Habilidades</div>
          <div class="skill-list">
            ${formData.skills.map(skill => `<p>${skill}</p>`).join('')}
          </div>
        </div>
        ` : ''}

        ${formData.languages && formData.languages.length > 0 ? `
        <div class="section">
          <div class="section-title">Idiomas</div>
          <div class="language-list">
            ${formData.languages.map(lang => `
              <p>${lang.language || 'Idioma'}</p>
              <p style="color: #9ca3af; margin-bottom: 8px;">${lang.level}</p>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function generateModernGridHTML(cvData: CVData): string {
  const { formData } = cvData;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'CV'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page { size: A4; margin: 0; }
    .container {
      width: 210mm;
      height: 297mm;
      background: #f9fafb;
      padding: 40px;
    }
    .header {
      background: #1a1a2e;
      color: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 25px;
    }
    .header h1 {
      font-size: 28px;
      color: white;
      margin-bottom: 12px;
    }
    .header-contact {
      font-size: 11px;
      color: #d1d5db;
      margin-bottom: 4px;
    }
    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #1a1a2e;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .summary-text {
      font-size: 11px;
      line-height: 1.7;
      color: #4b5563;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .item {
      margin-bottom: 20px;
    }
    .item-title {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 4px;
    }
    .item-subtitle {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 6px;
    }
    .item-description {
      font-size: 11px;
      color: #6b7280;
    }
    .skill-tag {
      display: inline-block;
      background: #1a1a2e;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 10px;
      margin: 4px 4px 4px 0;
    }
    .language-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .language-item p:first-child {
      font-size: 11px;
      color: #1a1a2e;
      margin-bottom: 2px;
    }
    .language-item p:last-child {
      font-size: 10px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${formData.name || 'Tu Nombre'}</h1>
      ${formData.email ? `<div class="header-contact">${formData.email}${formData.phone ? ` • ${formData.phone}` : ''}</div>` : ''}
      ${formData.location ? `<div class="header-contact">${formData.location}</div>` : ''}
    </div>

    ${formData.summary ? `
    <div class="card">
      <div class="section-title">Resumen</div>
      <div class="summary-text">${formData.summary}</div>
    </div>
    ` : ''}

    ${formData.experiences && formData.experiences.length > 0 ? `
    <div class="card">
      <div class="section-title">Experiencia</div>
      ${formData.experiences.map(exp => `
        <div class="item">
          <div class="item-title">${exp.position || 'Puesto'}</div>
          <div class="item-subtitle">${exp.company}${exp.period ? ` • ${exp.period}` : ''}</div>
          ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="grid-2">
      ${formData.education && formData.education.length > 0 ? `
      <div class="card">
        <div class="section-title">Educación</div>
        ${formData.education.map(edu => `
          <div class="item">
            <div class="item-title">${edu.degree || 'Título'}</div>
            <div class="item-subtitle">${edu.institution}</div>
            <div class="item-subtitle">${edu.period}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${formData.skills && formData.skills.length > 0 && formData.skills[0] !== '' ? `
      <div class="card">
        <div class="section-title">Habilidades</div>
        <div>
          ${formData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
      ` : ''}
    </div>

    ${formData.languages && formData.languages.length > 0 ? `
    <div class="card">
      <div class="section-title">Idiomas</div>
      <div class="language-grid">
        ${formData.languages.map(lang => `
          <div class="language-item">
            <p>${lang.language || 'Idioma'}</p>
            <p>${lang.level}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}

function generateSidebarHTML(cvData: CVData): string {
  const { formData } = cvData;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'CV'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page { size: A4; margin: 0; }
    .container {
      display: flex;
      width: 210mm;
      height: 297mm;
      background: white;
    }
    .sidebar {
      width: 40%;
      background: #1a1a2e;
      color: white;
      padding: 40px 30px;
    }
    .sidebar-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .profile-photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 20px;
      display: block;
      border: 4px solid #2d2d44;
    }
    .sidebar-header h1 {
      color: white;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .sidebar-section {
      margin-bottom: 30px;
    }
    .sidebar-title {
      color: #94a3b8;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 12px;
      font-weight: 500;
    }
    .contact-item {
      color: #d1d5db;
      font-size: 12px;
      margin-bottom: 6px;
      word-break: break-word;
    }
    .skill-tag {
      display: inline-block;
      background: #2d2d44;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 11px;
      margin: 4px 4px 4px 0;
    }
    .language-item {
      display: flex;
      justify-content: space-between;
      color: #d1d5db;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .language-level {
      color: #94a3b8;
    }
    .main-content {
      flex: 1;
      padding: 40px;
      background: white;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 15px;
      color: #1a1a2e;
      font-weight: 600;
    }
    .summary {
      font-size: 12px;
      line-height: 1.7;
      color: #4b5563;
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
    }
    .job-title {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 4px;
    }
    .company-info {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .job-description {
      font-size: 11px;
      color: #6b7280;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-header">
        ${formData.photo ? `<img src="${formData.photo}" alt="Foto de perfil" class="profile-photo" />` : ''}
        <h1>${formData.name || 'Tu Nombre'}</h1>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Contacto</div>
        ${formData.email ? `<div class="contact-item">${formData.email}</div>` : ''}
        ${formData.phone ? `<div class="contact-item">${formData.phone}</div>` : ''}
        ${formData.location ? `<div class="contact-item">${formData.location}</div>` : ''}
        ${formData.linkedin ? `<div class="contact-item">${formData.linkedin}</div>` : ''}
        ${formData.website ? `<div class="contact-item">${formData.website}</div>` : ''}
      </div>

      ${formData.skills && formData.skills.length > 0 && formData.skills[0] !== '' ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Habilidades</div>
        <div>
          ${formData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      ${formData.languages && formData.languages.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Idiomas</div>
        ${formData.languages.map(lang => `
          <div class="language-item">
            <span>${lang.language || 'Idioma'}</span>
            <span class="language-level">${lang.level}</span>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>

    <div class="main-content">
      ${formData.summary ? `
      <div class="section">
        <div class="section-title">Perfil</div>
        <div class="summary">${formData.summary}</div>
      </div>
      ` : ''}

      ${formData.experiences && formData.experiences.length > 0 ? `
      <div class="section">
        <div class="section-title">Experiencia</div>
        ${formData.experiences.map(exp => `
          <div class="experience-item">
            <div class="job-title">${exp.position || 'Puesto'}</div>
            <div class="company-info">${exp.company}${exp.period ? ` • ${exp.period}` : ''}</div>
            ${exp.description ? `<div class="job-description">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${formData.education && formData.education.length > 0 ? `
      <div class="section">
        <div class="section-title">Educación</div>
        ${formData.education.map(edu => `
          <div class="education-item">
            <div class="job-title">${edu.degree || 'Título'}</div>
            <div class="company-info">${edu.institution}${edu.period ? ` • ${edu.period}` : ''}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `;
}

export function generateCVHTML(cvData: CVData): string {
  const templateId = cvData.templateId;
  
  switch (templateId) {
    case 'executive':
      return generateExecutiveHTML(cvData);
    case 'minimal-premium':
    case 'minimalist-premium':
      return generateMinimalistHTML(cvData);
    case 'sidebar-dark':
      return generateSidebarHTML(cvData);
    case 'modern-grid':
      return generateModernGridHTML(cvData);
    case 'compact':
      return generateCompactHTML(cvData);
    case 'elegant':
      return generateElegantHTML(cvData);
    default:
      return generateExecutiveHTML(cvData);
  }
}
