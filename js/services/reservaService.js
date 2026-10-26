import { apiRequest, API_CONFIG } from '../config/api.js';

export const ReservaService = {
  async crearReserva(reservaData) {
    return apiRequest(API_CONFIG.ENDPOINTS.RESERVA, {
      method: 'POST',
      body: JSON.stringify(reservaData)
    });
  }
};
