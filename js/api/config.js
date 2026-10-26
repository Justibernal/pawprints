// Dirección de la API de PawPrints (sin barra al final).
// Abriendo el front en localhost o 127.0.0.1 se usa el back local; en cualquier otro dominio, el desplegado.
const LOCAL = 'http://localhost:8000';
const PRODUCCION = 'https://pawprints-backend.onrender.com'; // cambiar por la URL real del back en Render

const enLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

export const API_URL = enLocal ? LOCAL : PRODUCCION;
