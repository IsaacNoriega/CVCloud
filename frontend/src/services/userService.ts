import {  getHeaders } from '../config/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

class UserService {
  // Obtener usuario por ID
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`api/users/${id}`, {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener el usuario');
    }

    return response.json();
  }

  // Actualizar usuario
  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await fetch(`api/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar el usuario');
    }

    const result = await response.json();
    return result.user;
  }

  // Eliminar usuario
  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`api/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al eliminar el usuario');
    }
  }
}

export default new UserService();
