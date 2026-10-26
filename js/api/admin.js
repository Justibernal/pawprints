// Administración del catálogo (el back exige token de un usuario con rol admin).
import { post } from './cliente.js';

// → {libro} (201)
export const crearLibro = (libro) => post('/api/admin/libros', libro);
