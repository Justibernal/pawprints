    <article aria-labelledby="titulo-libro">
      <h2 id="titulo-libro"><?= e($libro->titulo) ?></h2>

      <figure>
        <img src="<?= e($view->url($libro->portada)) ?>" alt="Portada de <?= e($libro->titulo) ?>" width="200" height="300">
        <figcaption><?= e($libro->titulo) ?></figcaption>
      </figure>

      <p>Autor: <a href="#autor"><?= e($libro->autor) ?></a></p>
      <p>Precio: <data value="<?= e($libro->precio) ?>"><?= e($libro->precioFormateado()) ?></data></p>

      <section aria-labelledby="descripcion-heading">
        <h3 id="descripcion-heading">Descripción completa</h3>
        <p><?= e($libro->descripcion) ?></p>
      </section>

      <section id="autor" aria-labelledby="autor-heading">
        <h3 id="autor-heading">Sobre el autor</h3>
        <p><?= e($libro->autorBio) ?></p>
      </section>

      <a class="btn" href="<?= e($view->url('/reserva', ['libro' => $libro->id])) ?>">Reservar este libro</a>
    </article>
