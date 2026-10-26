// Sesión del navegador: guarda el token JWT y los datos del usuario en sessionStorage.
// Si el navegador bloquea el almacenamiento, se usa la memoria de la pestaña.
const CLAVE_TOKEN = 'pawprints.token';
const CLAVE_USUARIO = 'pawprints.usuario';
const memoria = {};

function leer(clave) {
    try {
        return window.sessionStorage.getItem(clave);
    } catch {
        return memoria[clave] ?? null;
    }
}

function escribir(clave, valor) {
    try {
        if (valor === null) window.sessionStorage.removeItem(clave);
        else window.sessionStorage.setItem(clave, valor);
    } catch {
        if (valor === null) delete memoria[clave];
        else memoria[clave] = valor;
    }
}

export const token = () => leer(CLAVE_TOKEN);

export function usuario() {
    try {
        return JSON.parse(leer(CLAVE_USUARIO) || 'null');
    } catch {
        return null;
    }
}

export const hayUsuario = () => token() !== null && usuario() !== null;
export const esAdmin = () => usuario()?.rol === 'admin';

export function iniciar(tokenNuevo, datosUsuario) {
    escribir(CLAVE_TOKEN, tokenNuevo);
    escribir(CLAVE_USUARIO, JSON.stringify(datosUsuario));
}

export function cerrar() {
    escribir(CLAVE_TOKEN, null);
    escribir(CLAVE_USUARIO, null);
}
