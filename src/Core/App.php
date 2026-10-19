<?php

namespace Paw\Core;

use Psr\Log\LoggerInterface;
use Throwable;

// Arma los servicios compartidos (config, logger, vistas, router) y atiende la petición.
// Es lo único que usa public/index.php.
class App
{
    public readonly Config $config;
    public readonly LoggerInterface $logger;
    public readonly View $view;
    public readonly Router $router;
    private ErrorHandler $errorHandler;

    public function __construct(
        private string $rootDir,
        private Request $request,
    ) {
        $this->config = Config::load($rootDir);
        $this->logger = new FileLogger($this->config->get('log.path'), $this->config->get('log.level'));
        $this->view = new View($rootDir . '/views', $request->basePath());
        $this->errorHandler = new ErrorHandler($this->logger, $this->view, (bool) $this->config->get('app.debug'));
        $this->errorHandler->register();

        $this->router = new Router();
        $router = $this->router;
        require $rootDir . '/config/routes.php';
    }

    public function handle(): Response
    {
        try {
            [[$class, $method], $params] = $this->router->match($this->request);
            $controller = new $class($this);
            $response = $controller->$method($this->request, ...$params);
            if (is_string($response)) {
                $response = Response::html($response);
            }
            return $response;
        } catch (Throwable $e) {
            return $this->errorHandler->handle($e);
        }
    }
}
