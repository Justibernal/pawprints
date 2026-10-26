// Dirección de la API de PawPrints (sin barra al final).
//
// Por defecto es el back publicado: así el sitio en producción (rama main) siempre apunta bien, sin tocar nada.
// Para probar con el back local, copiar config.local.example.js como config.local.js (no se sube al repo).
// Ese archivo solo se carga al abrir el front en localhost o 127.0.0.1; en cualquier otro dominio se ignora.
const PRODUCCION = 'https://pawprintsbackend.onrender.com';

const enLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

let local = {};
if (enLocal) {
    try {
        local = await import('./config.local.js');
    } catch {
        // No hay config.local.js: se usa PRODUCCION.
    }
}

export const API_URL = String(local.API_URL || PRODUCCION).replace(/\/+$/, '');
