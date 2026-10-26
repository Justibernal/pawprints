// Catálogo: filtros, orden y paginación. El estado vive en la URL (?genero=novela&page=2),
// así se puede compartir, recargar y volver atrás.
import { montar, anunciar } from '../servicios/layout.js';
import { el, $, reemplazar } from '../servicios/dom.js';
import { precio, genero, portada } from '../servicios/formato.js';
import { activar } from '../servicios/formularios.js';
import * as libros from '../api/libros.js';

montar();

const form = $('#filtros');
const resultados = $('#resultados');
const estado = $('#estado-resultados');
const consulta = new URLSearchParams(window.location.search);

const ORDENES = ['relevancia', 'precio-asc', 'precio-desc', 'titulo'];
const filtros = {
    genero: consulta.get('genero') || '',
    autor: (consulta.get('autor') || '').trim(),
    precio_max: consulta.get('precio_max') || '',
    orden: ORDENES.includes(consulta.get('orden')) ? consulta.get('orden') : 'relevancia',
    per_page: ['6', '12', '24'].includes(consulta.get('per_page')) ? consulta.get('per_page') : '6',
};
const pagina = Math.max(1, parseInt(consulta.get('page'), 10) || 1);

// Los controles del formulario se rellenan con lo que dice la URL
Object.entries(filtros).forEach(([nombre, valor]) => { form.elements[nombre].value = valor; });

// Si todo es válido, se navega con los filtros en la URL (la página vuelve a pedir los datos a la API)
activar(form, (f) => { f.submit(); });

function enlacePagina(numero) {
    const parametros = new URLSearchParams(window.location.search);
    parametros.set('page', String(numero));
    return `catalogo.html?${parametros}`;
}

function ficha(libro) {
    const detalle = `libro.html?id=${encodeURIComponent(libro.id)}`;
    return el('li', {},
        el('article', { 'aria-labelledby': `libro-${libro.id}-titulo` },
            el('img', { src: portada(libro), alt: `Portada de ${libro.titulo}`, width: 120, height: 180, loading: 'lazy' }),
            el('h3', { id: `libro-${libro.id}-titulo` }, el('a', { href: detalle }, libro.titulo)),
            el('p', {}, `Autor: ${libro.autor}`),
            el('p', {}, `Género: ${genero(libro.genero)}`),
            el('p', {}, 'Precio: ', el('data', { value: libro.precio }, precio(libro.precio))),
            el('p', { text: libro.resumen }),
            el('a', { class: 'btn', href: detalle }, 'Ver detalle',
                el('span', { class: 'visualmente-oculto', text: ` de ${libro.titulo}` }))));
}

function paginacion(actual, total) {
    if (total <= 1) return null;
    const numeros = Array.from({ length: total }, (_, i) => i + 1).map((n) => el('li', {},
        n === actual
            ? el('span', { 'aria-current': 'page', 'aria-label': `Página ${n}, página actual` }, n)
            : el('a', { href: enlacePagina(n), 'aria-label': `Ir a la página ${n}` }, n)));
    return el('nav', { class: 'paginacion', 'aria-label': 'Páginas del catálogo' }, el('ul', {},
        el('li', {}, actual > 1
            ? el('a', { href: enlacePagina(actual - 1), rel: 'prev' }, 'Anterior')
            : el('span', { 'aria-disabled': 'true' }, 'Anterior')),
        numeros,
        el('li', {}, actual < total
            ? el('a', { href: enlacePagina(actual + 1), rel: 'next' }, 'Siguiente')
            : el('span', { 'aria-disabled': 'true' }, 'Siguiente'))));
}

async function cargar() {
    resultados.setAttribute('aria-busy', 'true');
    estado.textContent = 'Cargando libros...';
    reemplazar(resultados);
    try {
        const datos = await libros.listar({ ...filtros, page: pagina });
        const { items, total, paginas } = datos;
        const desde = total === 0 ? 0 : (datos.pagina - 1) * datos.por_pagina + 1;
        const hasta = Math.min(datos.pagina * datos.por_pagina, total);
        estado.textContent = `Mostrando ${desde}-${hasta} de ${total} libros`;
        anunciar(estado.textContent);

        if (total === 0) {
            reemplazar(resultados, el('p', {}, 'No encontramos libros con esos filtros. ',
                el('a', { href: 'catalogo.html' }, 'Quitar los filtros')));
        } else {
            reemplazar(resultados, el('ul', { class: 'catalogo-lista' }, items.map(ficha)), paginacion(datos.pagina, paginas));
        }
    } catch (error) {
        estado.textContent = '';
        reemplazar(resultados, el('div', { class: 'aviso aviso-error', role: 'alert' },
            el('p', {}, el('span', { class: 'error-icono', 'aria-hidden': 'true', text: '!' }),
                el('span', { class: 'visualmente-oculto', text: 'Error: ' }),
                error.status === 404 ? 'Esa página del catálogo no existe.' : error.message),
            el('p', {}, el('a', { href: 'catalogo.html' }, 'Volver al catálogo'), ' o ',
                el('button', { type: 'button', class: 'boton-secundario', onclick: cargar }, 'Reintentar'))));
    } finally {
        resultados.setAttribute('aria-busy', 'false');
    }
}

cargar();
