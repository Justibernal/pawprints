import { apiRequest, API_CONFIG } from '/js/config/api.js';
export const ReservaService = {
  async crearReserva(data) { return apiRequest(API_CONFIG.ENDPOINTS.RESERVA, { method: 'POST', body: JSON.stringify(data) }); }
};
