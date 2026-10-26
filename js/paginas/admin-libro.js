// Alta de libros (solo rol admin): POST /api/admin/libros.
import { montar, exigir } from '../servicios/layout.js';
import { $ } from '../servicios/dom.js';
import { activar } from '../servicios/formularios.js';
import * as admin from '../api/admin.js';

montar();

if (exigir({ admin: true })) {
    activar($('#form-libro'), async (f) => {
        const { libro } = await admin.crearLibro({
            titulo: f.elements.titulo.value.trim(),
            autor: f.elements.autor.value.trim(),
            genero: f.elements.genero.value,
            precio: Number(f.elements.precio.value),
            resumen: f.elements.resumen.value.trim(),
            descripcion: f.elements.descripcion.value.trim(),
            autor_bio: f.elements.autor_bio.value.trim(),
            imagen_url: f.elements.imagen_url.value.trim(),
        });
        window.location.href = `libro.html?id=${encodeURIComponent(libro.id)}`;
    });
}
