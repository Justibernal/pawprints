<?php

namespace Paw\Core;

use ErrorException;
use Psr\Log\LoggerInterface;
use Throwable;

// Atrapa cualquier error o excepción no manejada, la registra en el log y muestra una página de error.
// En producción (debug = false) solo se muestra un mensaje genérico, sin rutas, consultas ni trazas.
class ErrorHandler
{
    public function __construct(
        private LoggerInterface $logger,
        private View $view,
        private bool $debug,
    ) {
    }

    public function register(): void
    {
        error_reporting(E_ALL);
        ini_set('display_errors', $this->debug ? '1' : '0');

        // Los warnings y notices también se tratan como excepciones
        set_error_handler(function (int $severity, string $message, string $file, int $line): bool {
            if (!(error_reporting() & $severity)) {
                return false;
            }
            throw new ErrorException($message, 0, $severity, $file, $line);
        });

        set_exception_handler(fn (Throwable $e) => $this->handle($e)->send());

        // Errores fatales que no pasan por el exception handler
        register_shutdown_function(function (): void {
            $error = error_get_last();
            if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
                $this->handle(new ErrorException($error['message'], 0, $error['type'], $error['file'], $error['line']))->send();
            }
        });
    }

    public function handle(Throwable $e): Response
    {
        if ($e instanceof HttpException) {
            $this->logger->notice('HTTP {status}: {message}', [
                'status' => $e->status(),
                'message' => $e->getMessage(),
                'uri' => $_SERVER['REQUEST_URI'] ?? '',
            ]);
            $response = $this->render($e->status(), $e->getMessage(), $e);
            foreach ($e->headers() as $name => $value) {
                $response = $response->withHeader($name, $value);
            }
            return $response;
        }

        $this->logger->error('{class}: {message} en {file}:{line}', [
            'class' => $e::class,
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'uri' => $_SERVER['REQUEST_URI'] ?? '',
            'trace' => $e->getTraceAsString(),
        ]);
        return $this->render(500, 'Ocurrió un error inesperado', $e);
    }

    private function render(int $status, string $message, Throwable $e): Response
    {
        $template = $status === 404 ? 'errors/404' : 'errors/error';
        $data = [
            'title' => "Error $status - PawPrints",
            'status' => $status,
            // Solo se le muestra al usuario el mensaje de los errores HTTP, que escribimos nosotros
            'message' => $e instanceof HttpException ? $message : 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
            'exception' => $this->debug ? $e : null,
        ];
        try {
            $body = $this->view->render($template, $data);
        } catch (Throwable) {
            // Si falla la vista de error, texto plano como último recurso
            $body = "<h1>Error $status</h1>";
        }
        return Response::html($body, $status);
    }
}
