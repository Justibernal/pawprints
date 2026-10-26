// Reservas de libros.
import { post } from './cliente.js';

// datos: {nombre, email, telefono, items: [{libro, cantidad}]} → {reserva} (201)
export const crear = (datos) => post('/api/reservas', datos);
