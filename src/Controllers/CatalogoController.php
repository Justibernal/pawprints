<?php

namespace Paw\Controllers;

use Paw\Core\App;
use Paw\Core\HttpException;
use Paw\Core\Request;
use Paw\Core\Response;
use Paw\Models\LibroRepository;

// Catálogo de libros. Versión base: lista todos los libros y muestra el detalle de uno.
// TODO (Parte 2): búsqueda por GET, paginación y cantidad por página.
class CatalogoController extends Controller
{
    private LibroRepository $libros;

    public function __construct(App $app)
    {
        parent::__construct($app);
        $this->libros = new LibroRepository($app->config->get('catalogo.data'));
    }

    public function index(Request $request): Response
    {
        return $this->render('catalogo/index', [
            'title' => 'Catálogo - PawPrints',
            'description' => 'Catálogo completo de libros de PawPrints.',
            'current' => 'catalogo',
            'libros' => $this->libros->all(),
        ]);
    }

    public function show(Request $request, string $id): Response
    {
        $libro = $this->libros->find($id);
        if ($libro === null) {
            throw HttpException::notFound('El libro que buscás no está en el catálogo');
        }
        return $this->render('catalogo/show', [
            'title' => $libro->titulo . ' - PawPrints',
            'description' => $libro->resumen,
            'current' => 'catalogo',
            'libro' => $libro,
        ]);
    }
}
