    <h2>Formulario de reserva</h2>
    <p>Completá tus datos y elegí el libro que querés reservar. Nos vamos a comunicar para confirmar la reserva.</p>

    <?php /* TODO (Parte 3): mostrar errores de validación y mantener los valores cargados */ ?>
    <form action="<?= e($view->url('/reserva')) ?>" method="post">
      <fieldset>
        <legend>Datos del solicitante</legend>

        <p>
          <label for="nombre">Nombre y apellido</label><br>
          <input type="text" id="nombre" name="nombre" autocomplete="name" required>
        </p>

        <p>
          <label for="email">Correo electrónico</label><br>
          <input type="email" id="email" name="email" autocomplete="email" required>
        </p>

        <p>
          <label for="telefono">Teléfono</label><br>
          <input type="tel" id="telefono" name="telefono" autocomplete="tel"
                 pattern="[0-9+ ()-]{6,20}" placeholder="Ej: 011 4444-5555">
        </p>
      </fieldset>

      <fieldset>
        <legend>Libro a reservar</legend>

        <p>
          <label for="libro-1">Título</label><br>
          <select id="libro-1" name="libro[]" required>
            <option value="">Seleccioná un libro del catálogo...</option>
            <?php foreach ($libros as $libro): ?>
              <option value="<?= e($libro->id) ?>"<?= $libro->id === $seleccionado ? ' selected' : '' ?>><?= e($libro->titulo) ?> - <?= e($libro->autor) ?></option>
            <?php endforeach; ?>
          </select>
        </p>

        <p>
          <label for="cantidad-1">Cantidad</label><br>
          <input type="number" id="cantidad-1" name="cantidad[]" min="1" value="1" required>
        </p>
      </fieldset>

      <p>
        <button type="submit">Confirmar reserva</button>
      </p>
    </form>
