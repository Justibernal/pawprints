// Rutas públicas del catálogo.
import { get } from './cliente.js';

// filtros: {genero, autor, precio_max, orden, page, per_page}
// → {items, total, pagina, por_pagina, paginas}
export const listar = (filtros) => get('/api/libros', filtros);

// → {libro}
export const detalle = (id) => get(`/api/libros/${encodeURIComponent(id)}`);
