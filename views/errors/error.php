    <section aria-labelledby="error-heading">
      <h2 id="error-heading">Error <?= e($status) ?></h2>
      <p><?= e($message) ?></p>
      <p><a class="btn" href="<?= e($view->url('/')) ?>">Volver al inicio</a></p>

      <?php if ($exception !== null): /* Solo en desarrollo (APP_DEBUG=true) */ ?>
        <details open>
          <summary><?= e($exception::class) ?>: <?= e($exception->getMessage()) ?></summary>
          <p><?= e($exception->getFile()) ?>:<?= e($exception->getLine()) ?></p>
          <pre><?= e($exception->getTraceAsString()) ?></pre>
        </details>
      <?php endif; ?>
    </section>
