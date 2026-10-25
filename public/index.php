<?php

// Front controller: todas las peticiones entran por acá (ver .htaccess).

use Paw\Core\App;
use Paw\Core\Request;

$root = dirname(__DIR__);

// Con el servidor embebido de PHP, los archivos estáticos (CSS, imágenes) se sirven directo
if (PHP_SAPI === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
    return false;
}

require $root . '/vendor/autoload.php';

$app = new App($root, Request::fromGlobals());
$app->handle()->send();
