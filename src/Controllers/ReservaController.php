<?php

namespace Paw\Controllers;

use Paw\Core\Request;
use Paw\Core\Response;
use Paw\Models\LibroRepository;

// Formulario de reserva. Versión base: solo muestra el formulario.
// TODO (Parte 3): procesar el POST, validar y enviar el correo al personal.
class ReservaController extends Controller
{
    public function form(Request $request): Response
    {
        $libros = new LibroRepository($this->app->config->get('catalogo.data'));
        return $this->render('reserva/form', [
            'title' => 'Formulario de Reserva - PawPrints',
            'description' => 'Reservá libros del catálogo de PawPrints.',
            'current' => 'reserva',
            'libros' => $libros->all(),
            // Permite llegar desde el detalle con el libro ya elegido: /reserva?libro=rayuela
            'seleccionado' => (string) $request->query('libro', ''),
        ]);
    }
}
