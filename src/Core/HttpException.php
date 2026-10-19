<?php

namespace Paw\Core;

use RuntimeException;

// Error que tiene un código HTTP asociado (404, 405...). El ErrorHandler lo convierte
// en la página de error que corresponde. Para un libro inexistente: throw HttpException::notFound().
class HttpException extends RuntimeException
{
    public function __construct(
        private int $status,
        string $message = '',
        private array $headers = [],
    ) {
        parent::__construct($message, $status);
    }

    public static function notFound(string $message = 'Página no encontrada'): self
    {
        return new self(404, $message);
    }

    public static function methodNotAllowed(array $allowed): self
    {
        return new self(405, 'Método no permitido', ['Allow' => implode(', ', $allowed)]);
    }

    public function status(): int
    {
        return $this->status;
    }

    public function headers(): array
    {
        return $this->headers;
    }
}
