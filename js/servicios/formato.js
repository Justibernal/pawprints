// Formatos de presentación.
const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

// 15000 → "$ 15.000"
export const precio = (valor) => moneda.format(Number(valor) || 0);

export const GENEROS = {
    novela: 'Novela',
    cuento: 'Cuento',
    poesia: 'Poesía',
    infantil: 'Infantil',
};

export const genero = (clave) => GENEROS[clave] || clave;

// Portada del libro: la que manda la API o la imagen por defecto.
export const portada = (libro) => libro.portada || libro.imagen_url || 'img/placeholder.svg';
