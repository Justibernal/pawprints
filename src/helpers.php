<?php

/**
 * Escapa un valor para imprimirlo en HTML. Usarlo siempre en las vistas al mostrar datos.
 */
function e(mixed $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
