<?php

// Mapa de URLs de la aplicación: método HTTP + ruta => [controlador, método].
// $router lo provee Paw\Core\App.

use Paw\Controllers\CatalogoController;
use Paw\Controllers\PageController;
use Paw\Controllers\ReservaController;

$router->get('/', [PageController::class, 'home']);
$router->get('/nosotros', [PageController::class, 'nosotros']);
$router->get('/contacto', [PageController::class, 'contacto']);

$router->get('/catalogo', [CatalogoController::class, 'index']);
$router->get('/catalogo/{id}', [CatalogoController::class, 'show']);

$router->get('/reserva', [ReservaController::class, 'form']);
