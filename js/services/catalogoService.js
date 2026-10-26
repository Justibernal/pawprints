import { apiRequest, API_CONFIG } from '/js/config/api.js';
export const CatalogoService = {
  async obtenerTodos() { return apiRequest(API_CONFIG.ENDPOINTS.CATALOGO); }
};
