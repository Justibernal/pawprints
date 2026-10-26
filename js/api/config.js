// RUTAS: todo el front usa rutas RELATIVAS (styles/..., js/..., catalogo.html). Todas las páginas están en la raíz,
// así que el sitio funciona igual en la raíz de un dominio o dentro de una subcarpeta (GitHub Pages, Render static, etc.).
// Las únicas URLs absolutas son las de la API (abajo) y las de Google Fonts.
//
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
