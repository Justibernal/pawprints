    <section aria-labelledby="error-heading">
      <h2 id="error-heading">No encontramos lo que buscás</h2>
      <p><?= e($message) ?>.</p>
      <p>
        <a class="btn" href="<?= e($view->url('/catalogo')) ?>">Ir al catálogo</a>
        <a href="<?= e($view->url('/')) ?>">Volver al inicio</a>
      </p>
    </section>
