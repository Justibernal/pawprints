export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: { CATALOGO: '/catalogo', RESERVA: '/reserva' }
};
export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...options.headers }
  });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}
