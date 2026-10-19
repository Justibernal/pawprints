    <h2>Catálogo</h2>

    <?php /* TODO (Parte 2): que los filtros funcionen, mantener los valores elegidos y agregar per_page */ ?>
    <form class="filtros" action="<?= e($view->url('/catalogo')) ?>" method="get" aria-labelledby="filtro-heading">
      <fieldset>
        <legend id="filtro-heading">Filtrar</legend>

        <label for="genero">Género</label>
        <select id="genero" name="genero">
          <option value="">Todos</option>
          <option value="novela">Novela</option>
          <option value="cuento">Cuento</option>
          <option value="poesia">Poesía</option>
          <option value="infantil">Infantil</option>
        </select>

        <label for="autor">Autor</label>
        <input type="text" id="autor" name="autor" placeholder="Nombre del autor">

        <label for="precio-max">Precio máximo</label>
        <input type="number" id="precio-max" name="precio_max" min="0" step="1">
      </fieldset>

      <fieldset>
        <legend>Ordenar</legend>
        <label for="orden">Ordenar por</label>
        <select id="orden" name="orden">
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="titulo">Título (A-Z)</option>
        </select>
      </fieldset>

      <button type="submit">Aplicar</button>
    </form>

    <section aria-labelledby="listado-heading">
      <h2 id="listado-heading">Libros disponibles</h2>

      <ul class="catalogo-lista">
        <?php foreach ($libros as $libro): ?>
          <?php $detalle = $view->url('/catalogo/' . rawurlencode($libro->id)); ?>
          <li>
            <article aria-labelledby="libro-<?= e($libro->id) ?>-titulo">
              <a href="<?= e($detalle) ?>">
                <figure>
                  <img src="<?= e($view->url($libro->portada)) ?>" alt="Portada de <?= e($libro->titulo) ?>" width="120" height="180">
                  <figcaption><?= e($libro->titulo) ?></figcaption>
                </figure>
              </a>
              <h3 id="libro-<?= e($libro->id) ?>-titulo"><a href="<?= e($detalle) ?>"><?= e($libro->titulo) ?></a></h3>
              <p>Autor: <?= e($libro->autor) ?></p>
              <p>Precio: <data value="<?= e($libro->precio) ?>"><?= e($libro->precioFormateado()) ?></data></p>
              <p><?= e($libro->resumen) ?></p>
              <a class="btn" href="<?= e($detalle) ?>">Ver detalle</a>
            </article>
          </li>
        <?php endforeach; ?>
      </ul>
    </section>
