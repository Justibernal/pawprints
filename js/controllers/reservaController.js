import { ReservaService } from '../services/reservaService.js';

document.addEventListener('DOMContentLoaded', () => {
  const formReserva = document.getElementById('form-reserva');
  const libroIdInput = document.getElementById('libro-id');

  // Obtener parámetro de URL ?id=X
  const urlParams = new URLSearchParams(window.location.search);
  const libroIdParam = urlParams.get('id');
  if (libroIdParam && libroIdInput) {
    libroIdInput.value = libroIdParam;
  }

  if (!formReserva) return;

  formReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    const libroId = document.getElementById('libro-id').value;
    const nombre = document.getElementById('usuario-nombre').value;
    const email = document.getElementById('usuario-email').value;

    try {
      const res = await ReservaService.crearReserva({
        libro_id: libroId,
        nombre_usuario: nombre,
        email: email
      });

      alert(res.message || 'Reserva realizada con éxito');
      window.location.href = './index.html';
    } catch (err) {
      alert(`Error en la reserva: ${err.message}`);
    }
  });
});
