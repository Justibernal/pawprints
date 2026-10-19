<?php

namespace Paw\Models;

// Capa de persistencia de los libros. Por ahora lee data/libros.json; en el próximo TP
// se reemplaza por una base de datos sin tocar los controladores, que solo usan estos métodos.
class LibroRepository
{
    private ?array $libros = null;

    public function __construct(private string $dataFile)
    {
    }

    /** @return Libro[] */
    public function all(): array
    {
        if ($this->libros === null) {
            $data = json_decode(file_get_contents($this->dataFile), true, flags: JSON_THROW_ON_ERROR);
            $this->libros = array_map([Libro::class, 'fromArray'], $data);
        }
        return $this->libros;
    }

    public function find(string $id): ?Libro
    {
        foreach ($this->all() as $libro) {
            if ($libro->id === $id) {
                return $libro;
            }
        }
        return null;
    }
}
