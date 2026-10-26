import { ReservaService } from '/js/services/reservaService.js';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-reserva');
  const params = new URLSearchParams(window.location.search);
  const inputId = document.getElementById('libro-id');
  if (params.get('id') && inputId) inputId.value = params.get('id');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await ReservaService.crearReserva({
        libro_id: inputId.value,
        nombre_usuario: document.getElementById('usuario-nombre').value,
        email: document.getElementById('usuario-email').value
      });
      alert(res.message || 'Reserva exitosa');
      window.location.href = '/index.html';
    } catch (err) { alert(`Error: ${err.message}`); }
  });
});
