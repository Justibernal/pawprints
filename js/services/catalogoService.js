import { apiRequest, API_CONFIG } from '../config/api.js';

export const CatalogoService = {
  async obtenerTodos() {
    return apiRequest(API_CONFIG.ENDPOINTS.CATALOGO, { method: 'GET' });
  },

  async obtenerPorId(id) {
    return apiRequest(`${API_CONFIG.ENDPOINTS.CATALOGO}/${id}`, { method: 'GET' });
  }
};
