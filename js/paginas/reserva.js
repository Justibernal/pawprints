// Reserva de libros: datos de contacto y una o más filas (libro + cantidad).
import { montar, anunciar } from '../servicios/layout.js';
import { el, $, $$, reemplazar } from '../servicios/dom.js';
import { activar } from '../servicios/formularios.js';
import { precio } from '../servicios/formato.js';
import * as libros from '../api/libros.js';
import * as reservas from '../api/reservas.js';

montar();

const CANTIDAD_MIN = 1;
const CANTIDAD_MAX = 10;
const FILAS_MAX = 10;

const form = $('#form-reserva');
const filas = $('#filas');
const botonAgregar = $('#agregar-libro');
let catalogo = [];

function opciones(seleccionado) {
    return [
        el('option', { value: '' }, 'Seleccioná un libro del catálogo...'),
        ...catalogo.map((l) => el('option', { value: l.id, selected: l.id === seleccionado }, `${l.titulo} - ${l.autor}`)),
    ];
}

function fila(n, libro = '', cantidad = '1') {
    return el('fieldset', { class: 'fila-libro' },
        el('legend', { text: `Libro ${n}` }),
        el('div', { class: 'campo' },
            el('label', { for: `libro-${n}` }, 'Título ', el('span', { class: 'nota', text: '(obligatorio)' })),
            el('select', { id: `libro-${n}`, name: `items.${n - 1}.libro`, required: true }, opciones(libro))),
        el('div', { class: 'campo' },
            el('label', { for: `cantidad-${n}` }, 'Cantidad ', el('span', { class: 'nota', text: `(de ${CANTIDAD_MIN} a ${CANTIDAD_MAX})` })),
            el('input', {
                type: 'number', id: `cantidad-${n}`, name: `items.${n - 1}.cantidad`, required: true, inputmode: 'numeric',
                min: CANTIDAD_MIN, max: CANTIDAD_MAX, step: 1, value: cantidad,
                title: `Ingresá un número entero entre ${CANTIDAD_MIN} y ${CANTIDAD_MAX}.`,
            })),
        n > 1 ? el('button', {
            type: 'button', class: 'boton-secundario quitar', 'aria-label': `Quitar el libro ${n}`,
            onclick: () => quitar(n),
        }, 'Quitar') : null);
}

function valoresActuales() {
    return $$('.fila-libro', filas).map((f) => ({
        libro: $('select', f).value,
        cantidad: $('input', f).value,
    }));
}

function dibujar(valores, foco) {
    reemplazar(filas, valores.map((v, i) => fila(i + 1, v.libro, v.cantidad)));
    botonAgregar.disabled = valores.length >= FILAS_MAX;
    if (foco) $(`#libro-${foco}`)?.focus();
}

function agregar() {
    const valores = valoresActuales();
    valores.push({ libro: '', cantidad: '1' });
    dibujar(valores, valores.length);
    anunciar(`Se agregó el libro ${valores.length}.`);
}

function quitar(n) {
    const valores = valoresActuales();
    valores.splice(n - 1, 1);
    dibujar(valores, Math.min(n, valores.length));
    anunciar(`Se quitó el libro ${n}.`);
}

function confirmar(reserva, enviados) {
    const titulos = new Map(catalogo.map((l) => [l.id, l]));
    const seccion = $('#confirmacion');
    reemplazar(seccion,
        el('h2', { id: 'confirmacion-titulo', tabindex: '-1', text: 'Recibimos tu reserva' }),
        el('p', {}, `Gracias, ${reserva?.nombre || enviados.nombre}. Nos vamos a comunicar a ${reserva?.email || enviados.email} para confirmarla.`),
        el('h3', { text: 'Libros reservados' }),
        el('ul', {}, enviados.items.map((item) => {
            const libro = titulos.get(item.libro);
            return el('li', {}, `${item.cantidad} × ${libro ? libro.titulo : item.libro}`,
                libro ? ` (${precio(libro.precio)} c/u)` : '');
        })),
        el('p', {}, el('a', { class: 'btn', href: 'catalogo.html' }, 'Seguir mirando el catálogo')));
    seccion.hidden = false;
    form.hidden = true;
    $('#intro-reserva').hidden = true;
    $('#confirmacion-titulo').focus();
    anunciar('Recibimos tu reserva.');
}

async function iniciar() {
    const preseleccion = new URLSearchParams(window.location.search).get('libro') || '';
    try {
        catalogo = (await libros.listar({ per_page: 100 })).items;
    } catch (error) {
        form.hidden = true;
        reemplazar($('#estado-carga'), el('div', { class: 'aviso aviso-error', role: 'alert' },
            el('p', {}, el('span', { class: 'error-icono', 'aria-hidden': 'true', text: '!' }),
                el('span', { class: 'visualmente-oculto', text: 'Error: ' }),
                `No pudimos cargar el catálogo para armar la reserva. ${error.message}`),
            el('p', {}, el('button', { type: 'button', class: 'boton-secundario', onclick: () => window.location.reload() }, 'Reintentar'))));
        return;
    }
    $('#estado-carga').hidden = true;
    form.hidden = false;
    dibujar([{ libro: catalogo.some((l) => l.id === preseleccion) ? preseleccion : '', cantidad: '1' }]);
}

botonAgregar.addEventListener('click', agregar);

activar(form, async (f) => {
    const datos = {
        nombre: f.elements.nombre.value.trim(),
        email: f.elements.email.value.trim(),
        telefono: f.elements.telefono.value.trim(),
        items: valoresActuales().map((v) => ({ libro: v.libro, cantidad: Number(v.cantidad) })),
    };
    const { reserva } = await reservas.crear(datos);
    confirmar(reserva, datos);
});

iniciar();
