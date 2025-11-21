import { API_URL, getHeaders } from '../config/api';
import { generateCVHTML } from '../utils/pdfTemplates';

export interface CVData {
  title: string;
  templateId: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    summary: string;
    photo?: string;
    experiences: Array<{
      id: string;
      position: string;
      company: string;
      period: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      period: string;
    }>;
    skills: string[];
    languages: Array<{
      id: string;
      language: string;
      level: string;
    }>;
  };
}

export interface CV {
  id: string;
  userId: string;
  data: CVData;
}

export interface CreateCVRequest {
  userId: string;
  data: CVData;
}

export interface UpdateCVRequest {
  data: CVData;
}

export interface GeneratePDFResponse {
  message: string;
  pdfUrl: string;
  fileName: string;
}

class CVService {
  // Obtener todos los CVs de un usuario
  async getUserCVs(userId: string): Promise<CV[]> {
    const response = await fetch(`${API_URL}/cvs/user/${userId}`, {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener los CVs');
    }

    return response.json();
  }

  // Obtener un CV específico
  async getCVById(id: string): Promise<CV> {
    const response = await fetch(`${API_URL}/cvs/${id}`, {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener el CV');
    }

    return response.json();
  }

  // Crear un nuevo CV
  async createCV(cvData: CreateCVRequest): Promise<CV> {
    const response = await fetch(`${API_URL}/cvs`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(cvData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear el CV');
    }

    const result = await response.json();
    return result.cv;
  }

  // Actualizar un CV existente
  async updateCV(id: string, cvData: UpdateCVRequest): Promise<CV> {
    const response = await fetch(`${API_URL}/cvs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(cvData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar el CV');
    }

    const result = await response.json();
    return result.cv;
  }

  // Eliminar un CV
  async deleteCV(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/cvs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al eliminar el CV');
    }
  }

  // Generar PDF
  async generatePDF(id: string, htmlContent: string, templateId?: string): Promise<GeneratePDFResponse> {
    const response = await fetch(`${API_URL}/pdf/${id}/generate`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ htmlContent, templateId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al generar el PDF');
    }

    return response.json();
  }

  // Descargar PDF - genera el HTML, envía a Lambda vía backend, y fuerza descarga automática
  async downloadPDF(cv: CV): Promise<void> {
    try {
      // 1. Generar el HTML de la plantilla
      const htmlContent = generateCVHTML(cv.data);
      console.log('HTML generado para plantilla:', cv.data.templateId);

      // 2. Enviar al backend que enviará a Lambda
      const result = await this.generatePDF(cv.id, htmlContent, cv.data.templateId);
      console.log('PDF generado en S3:', result.pdfUrl);

      // 3. Forzar descarga automática creando un link temporal
      const link = document.createElement('a');
      link.href = result.pdfUrl;
      link.target = '_blank'; // Abre en nueva pestaña por si falla la descarga
      link.download = result.fileName || `CV-${cv.data.title}.pdf`; // Fuerza descarga
      
      // Agregar al DOM, hacer click, y remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('✅ PDF descargado automáticamente:', result.fileName);
    } catch (error) {
      console.error('❌ Error completo al descargar el PDF:', error);
      
      // Mensaje más específico según el error
      if (error instanceof Error) {
        if (error.message.includes('descargar el PDF desde S3')) {
          throw new Error('El PDF se generó pero no se pudo descargar desde S3. Verifica la URL.');
        } else if (error.message.includes('Error al generar el PDF')) {
          throw new Error('Error en el servidor al generar el PDF');
        }
      }
      
      throw error;
    }
  }
}

export default new CVService();
