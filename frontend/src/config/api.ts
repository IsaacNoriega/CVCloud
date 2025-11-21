// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Headers comunes para las peticiones
export const getHeaders = (includeAuth = false, skipContentType = false) => {
  const headers: Record<string, string> = {};

  if (!skipContentType) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};
