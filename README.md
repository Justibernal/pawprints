# PAWPrints

Sitio web de la librería PAWPrints. Trabajos prácticos de Programación en Ambiente Web (11086), Comisión 50, UNLu.

Integrantes: Federico Kasparian, Justino Bernal , Lautaro Marino y Ponti Mateo. Los legajos están en `autores.txt` y la versión en `VERSION`.

## Enunciado

Es un mismo proyecto que se va armando TP a TP.

En el TP1 había que maquetar el sitio de una librería con tienda online y tienda física usando solo HTML5, sin CSS ni JavaScript. También se pedía el sitemap, los wireframes y un formulario de reserva de libros.

En el TP2 había que agregar el CSS para que el maquetado se vea como los wireframes, siguiendo el manual de identidad de la empresa, y que funcione en celular, escritorio e impresión.

## Manual de identidad

De las dos opciones que daba la consigna elegimos el manual Violeta.

Los colores del manual son el violeta `#5c068c` y el blanco `#ffffff`. El violeta lo usamos en el nombre del sitio, los títulos, los enlaces, los botones y el pie; el blanco es el fondo y el texto que va sobre violeta.

Como el manual solo trae esos dos colores, para el hover, los fondos suaves y los bordes usamos el mismo violeta más oscuro (`#400462`) o más claro (`#f2ebf6` y `#decde8`), así no agregamos colores que no sean de la marca. Para el texto usamos un gris oscuro porque el manual no fija uno.

La tipografía del manual es Argentum Sans y la equivalente que indica es Montserrat. Cargamos Montserrat desde Google Fonts y dejamos Argentum Sans primera en la lista por si está instalada.

Todo esto está definido una sola vez como variables en `:root`, al principio de `styles/style.css`.

## Responsive

Lo hicimos mobile first: el CSS base es el de celular, con todo en una columna, y las media queries agregan columnas cuando hay más ancho. A partir de 700px las fichas del catálogo, las promociones y los servicios pasan a dos columnas, y a partir de 1024px a tres. Elegimos esos anchos porque cada ficha necesita unos 300px para que la portada y el texto no queden apretados.

Usamos grid para las grillas de fichas y flex para lo que va en fila y tiene que poder bajar de renglón (el menú, los filtros del catálogo y el pie). Por eso el menú no necesita botón hamburguesa. El `body` tiene un ancho máximo de 1200px para que en monitores grandes no quede todo estirado.

## Impresión

`styles/print.css` se enlaza con `media="print"` en todas las páginas.

Al imprimir se oculta lo que en papel no sirve: el menú, las redes del pie, los botones y los filtros del catálogo. El nombre del sitio y todo el contenido se mantienen, incluido el formulario de reserva, que se puede imprimir para completar a mano. Se imprime en negro sobre blanco y sin fondos de color para no gastar tinta.

Con `@page` definimos hoja A4 y márgenes de 2cm. Con `break-inside: avoid` evitamos que una ficha del catálogo, un grupo de campos o una tabla queden cortados entre dos hojas.

## Cómo ejecutar

No hay que instalar nada. Se clona el repositorio y se abre `index.html` en el navegador:

```
git clone https://github.com/Justibernal/pawprints.git
```

También se puede levantar un servidor local desde la carpeta del proyecto y entrar a `http://localhost:8000`:

```
python3 -m http.server 8000
```

Para ver la versión de celular alcanza con achicar la ventana o usar la vista adaptable del navegador (F12). Para ver la de impresión, la vista previa de impresión (Ctrl+P).

Se necesita internet para que cargue Montserrat. Sin conexión se ve con la fuente sans-serif del sistema.

## Versiones

Usamos versionado semántico en el archivo `VERSION` y un tag de git por entrega: `tp1` es la 0.1.0 y `tp2` la 0.2.0.
