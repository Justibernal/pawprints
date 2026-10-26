import { CatalogoService } from '../services/catalogoService.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const gridEl = document.getElementById('catalogo-grid');

  if (!gridEl) return;

  try {
    const libros = await CatalogoService.obtenerTodos();
    if (loadingEl) loadingEl.style.display = 'none';

    gridEl.innerHTML = '';
    if (!libros || libros.length === 0) {
      gridEl.innerHTML = '<p class="empty-msg">No hay libros disponibles en el catálogo.</p>';
      return;
    }

    libros.forEach(libro => {
      const card = document.createElement('article');
      card.className = 'card-libro';
      const imagenUrl = libro.imagen || '../../img/placeholder.svg';
      const disponible = libro.stock > 0;

      card.innerHTML = `
        <div class="cont-portada">
          <img src="${imagenUrl}" alt="${libro.titulo}" class="portada">
        </div>
        <div class="card-body">
          <h3>${libro.titulo}</h3>
          <p class="autor">Por: ${libro.autor}</p>
          <p class="precio">$${libro.precio}</p>
          <p class="stock ${disponible ? 'en-stock' : 'sin-stock'}">
            ${disponible ? `Stock: ${libro.stock}` : 'Sin Stock'}
          </p>
          <a href="../catalogo/reserva.html?id=${libro.id}" class="btn-primary ${!disponible ? 'disabled' : ''}">
            ${disponible ? 'Reservar' : 'Agotado'}
          </a>
        </div>
      `;
      gridEl.appendChild(card);
    });
  } catch (err) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.textContent = `Error al cargar catálogo: ${err.message}`;
      errorEl.style.display = 'block';
    }
  }
});
