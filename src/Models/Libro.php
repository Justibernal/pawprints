<?php

namespace Paw\Models;

class Libro
{
    public function __construct(
        public readonly string $id,
        public readonly string $titulo,
        public readonly string $autor,
        public readonly string $genero,
        public readonly int $precio,
        public readonly string $resumen,
        public readonly string $descripcion,
        public readonly string $autorBio,
        public readonly string $portada = 'img/placeholder.svg',
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['id'],
            $data['titulo'],
            $data['autor'],
            $data['genero'],
            (int) $data['precio'],
            $data['resumen'] ?? '',
            $data['descripcion'] ?? '',
            $data['autor_bio'] ?? '',
            $data['portada'] ?? 'img/placeholder.svg',
        );
    }

    // Precio con formato argentino: 15000 -> $15.000
    public function precioFormateado(): string
    {
        return '$' . number_format($this->precio, 0, ',', '.');
    }
}
