<?php

namespace Paw\Controllers;

use Paw\Core\App;
use Paw\Core\Response;

// Base de todos los controladores: da acceso a la configuración, el logger y las vistas.
abstract class Controller
{
    public function __construct(protected App $app)
    {
    }

    protected function render(string $template, array $data = [], int $status = 200): Response
    {
        return Response::html($this->app->view->render($template, $data), $status);
    }

    protected function redirect(string $path, int $status = 302): Response
    {
        return Response::redirect($this->app->view->url($path), $status);
    }
}
