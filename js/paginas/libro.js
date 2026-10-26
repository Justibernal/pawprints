// Detalle de un libro: /libro.html?id=rayuela
import { montar } from '../servicios/layout.js';
import { el, $, reemplazar } from '../servicios/dom.js';
import { precio, genero, portada } from '../servicios/formato.js';
import * as libros from '../api/libros.js';

montar();

const zona = $('#detalle');
const id = new URLSearchParams(window.location.search).get('id');

function mostrarError(mensaje) {
    document.title = 'Libro no encontrado - PawPrints';
    reemplazar(zona,
        el('h1', { id: 'titulo-pagina', tabindex: '-1', text: 'No pudimos mostrar el libro' }),
        el('div', { class: 'aviso aviso-error', role: 'alert' },
            el('p', {}, el('span', { class: 'error-icono', 'aria-hidden': 'true', text: '!' }),
                el('span', { class: 'visualmente-oculto', text: 'Error: ' }), mensaje)),
        el('p', {}, el('a', { href: 'catalogo.html' }, 'Volver al catálogo')));
}

async function cargar() {
    if (!id) {
        mostrarError('Falta indicar qué libro querés ver.');
        return;
    }
    try {
        const { libro } = await libros.detalle(id);
        document.title = `${libro.titulo} - PawPrints`;
        $('meta[name="description"]').setAttribute('content', libro.resumen || `Detalle de ${libro.titulo}`);
        reemplazar(zona,
            el('nav', { class: 'ruta', 'aria-label': 'Ruta de navegación' }, el('ol', {},
                el('li', {}, el('a', { href: 'catalogo.html' }, 'Catálogo')),
                el('li', {}, el('span', { 'aria-current': 'page' }, libro.titulo)))),
            el('article', { class: 'libro', 'aria-labelledby': 'titulo-pagina' },
                el('figure', {},
                    el('img', { src: portada(libro), alt: `Portada de ${libro.titulo}`, width: 200, height: 300 })),
                el('div', { class: 'libro-datos' },
                    el('h1', { id: 'titulo-pagina', text: libro.titulo }),
                    el('p', {}, 'Autor: ', el('a', { href: '#autor' }, libro.autor)),
                    el('p', {}, `Género: ${genero(libro.genero)}`),
                    el('p', { class: 'precio' }, 'Precio: ', el('data', { value: libro.precio }, precio(libro.precio))),
                    el('a', { class: 'btn', href: `reserva.html?libro=${encodeURIComponent(libro.id)}` }, 'Reservar este libro')),
                el('section', { 'aria-labelledby': 'descripcion-titulo' },
                    el('h2', { id: 'descripcion-titulo', text: 'Descripción completa' }),
                    el('p', { text: libro.descripcion || libro.resumen || 'Sin descripción por el momento.' })),
                el('section', { id: 'autor', 'aria-labelledby': 'autor-titulo' },
                    el('h2', { id: 'autor-titulo', text: 'Sobre el autor' }),
                    el('p', { text: libro.autor_bio || 'Sin información del autor por el momento.' }))));
    } catch (error) {
        mostrarError(error.status === 404 ? 'El libro que buscás no está en el catálogo.' : error.message);
    }
}

cargar();
