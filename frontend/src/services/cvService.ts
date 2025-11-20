import { API_URL, getHeaders } from '../config/api';

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
  async generatePDF(id: string, htmlContent: string): Promise<GeneratePDFResponse> {
    const response = await fetch(`${API_URL}/pdf/${id}/generate`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ htmlContent }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al generar el PDF');
    }

    return response.json();
  }
}

export default new CVService();
