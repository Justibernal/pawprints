<?php

namespace Paw\Controllers;

use Paw\Core\Request;
use Paw\Core\Response;

// Páginas institucionales sin lógica: inicio, nosotros y contacto.
class PageController extends Controller
{
    public function home(Request $request): Response
    {
        return $this->render('home', [
            'title' => 'PawPrints - Librería online y física',
            'description' => 'PawPrints, tu librería de confianza: catálogo online, reserva de libros y tienda física.',
            'current' => 'inicio',
        ]);
    }

    public function nosotros(Request $request): Response
    {
        return $this->render('nosotros', [
            'title' => 'Nuestra Historia - PawPrints',
            'description' => 'Conocé la historia, la misión y los servicios de PawPrints.',
            'current' => 'nosotros',
        ]);
    }

    public function contacto(Request $request): Response
    {
        return $this->render('contacto', [
            'title' => 'Contacto - PawPrints',
            'description' => 'Dirección, teléfono, correo y redes sociales de PawPrints.',
            'current' => 'contacto',
        ]);
    }
}
