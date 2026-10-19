<?php

namespace Paw\Core;

use Psr\Log\AbstractLogger;
use Psr\Log\LogLevel;
use Stringable;

// Logger que cumple la interfaz PSR-3 y escribe una línea por evento en logs/app.log.
// Uso: $logger->info('Reserva enviada', ['email' => $email]);
class FileLogger extends AbstractLogger
{
    private const LEVELS = [
        LogLevel::DEBUG => 0,
        LogLevel::INFO => 1,
        LogLevel::NOTICE => 2,
        LogLevel::WARNING => 3,
        LogLevel::ERROR => 4,
        LogLevel::CRITICAL => 5,
        LogLevel::ALERT => 6,
        LogLevel::EMERGENCY => 7,
    ];

    public function __construct(
        private string $path,
        private string $minLevel = LogLevel::DEBUG,
    ) {
    }

    public function log($level, string|Stringable $message, array $context = []): void
    {
        if ((self::LEVELS[$level] ?? 0) < (self::LEVELS[$this->minLevel] ?? 0)) {
            return;
        }

        // Reemplaza los {marcadores} del mensaje como indica PSR-3
        $replace = [];
        foreach ($context as $key => $value) {
            if (is_scalar($value) || $value instanceof Stringable) {
                $replace['{' . $key . '}'] = (string) $value;
            }
        }
        $line = sprintf(
            "[%s] %s: %s %s\n",
            date('Y-m-d H:i:s'),
            strtoupper($level),
            strtr((string) $message, $replace),
            $context ? json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '',
        );

        $dir = dirname($this->path);
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        @file_put_contents($this->path, $line, FILE_APPEND | LOCK_EX);
    }
}
