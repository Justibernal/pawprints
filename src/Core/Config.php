<?php

namespace Paw\Core;

// Lee la configuración de config/config.php, que a su vez toma los valores del archivo .env.
// Las claves se piden con puntos: Config::get('mail.to').
class Config
{
    private array $values;

    public function __construct(array $values)
    {
        $this->values = $values;
    }

    public static function load(string $rootDir): self
    {
        self::loadEnv($rootDir . '/.env');
        return new self(require $rootDir . '/config/config.php');
    }

    public function get(string $key, mixed $default = null): mixed
    {
        $value = $this->values;
        foreach (explode('.', $key) as $part) {
            if (!is_array($value) || !array_key_exists($part, $value)) {
                return $default;
            }
            $value = $value[$part];
        }
        return $value;
    }

    // Parser mínimo de .env: líneas CLAVE=valor, ignora comentarios y comillas.
    // Si la variable ya está definida en el entorno del servidor, gana esa.
    private static function loadEnv(string $path): void
    {
        if (!is_file($path)) {
            return;
        }
        foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                continue;
            }
            [$key, $value] = array_map('trim', explode('=', $line, 2));
            $value = trim($value, "\"'");
            if (getenv($key) === false) {
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
    }
}
