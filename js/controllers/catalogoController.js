import { CatalogoService } from '/js/services/catalogoService.js';
document.addEventListener('DOMContentLoaded', async () => {
  const loading = document.getElementById('loading');
  const grid = document.getElementById('catalogo-grid');
  if (!grid) return;
  try {
    const libros = await CatalogoService.obtenerTodos();
    if (loading) loading.style.display = 'none';
    grid.innerHTML = '';
    libros.forEach(libro => {
      const card = document.createElement('article');
      card.className = 'card-libro';
      const disponible = libro.stock > 0;
      card.innerHTML = `
        <div class="cont-portada"><img src="${libro.imagen || '/img/placeholder.svg'}" class="portada"></div>
        <div class="card-body">
          <h3>${libro.titulo}</h3>
          <p class="autor">Por: ${libro.autor}</p>
          <p class="precio">$${libro.precio}</p>
          <a href="/pages/catalogo/reserva.html?id=${libro.id}" class="btn-primary ${!disponible ? 'disabled' : ''}">${disponible ? 'Reservar' : 'Agotado'}</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    if (loading) loading.textContent = `Error al cargar: ${e.message}`;
  }
});
