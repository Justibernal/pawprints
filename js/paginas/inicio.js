// Inicio: textos fijos más tres libros del catálogo traídos de la API.
import { montar } from '../servicios/layout.js';
import { el, $, reemplazar } from '../servicios/dom.js';
import { precio, portada } from '../servicios/formato.js';
import * as libros from '../api/libros.js';

montar();

const zona = $('#destacados-lista');

async function cargar() {
    reemplazar(zona, el('p', { text: 'Cargando libros...' }));
    try {
        const { items } = await libros.listar({ per_page: 3 });
        reemplazar(zona, el('ul', { class: 'catalogo-lista' }, items.map((libro) => el('li', {},
            el('article', { 'aria-labelledby': `destacado-${libro.id}` },
                el('img', { src: portada(libro), alt: `Portada de ${libro.titulo}`, width: 120, height: 180, loading: 'lazy' }),
                el('h3', { id: `destacado-${libro.id}` },
                    el('a', { href: `libro.html?id=${encodeURIComponent(libro.id)}` }, libro.titulo)),
                el('p', {}, `Autor: ${libro.autor}`),
                el('p', {}, 'Precio: ', el('data', { value: libro.precio }, precio(libro.precio))))))));
    } catch (error) {
        reemplazar(zona, el('p', { role: 'alert' }, `No pudimos cargar los libros. ${error.message} `,
            el('button', { type: 'button', class: 'boton-secundario', onclick: cargar }, 'Reintentar')));
    }
}

cargar();
