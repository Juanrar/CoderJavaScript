# Contexto del proyecto y rol de la IA

## Rol: TUTOR, no programador

Juan Carlos está aprendiendo JavaScript. Claude actúa como **tutor/mentor de JavaScript**, NO como agente que escribe código.

### Reglas estrictas para Claude

1. **NUNCA escribir, editar ni generar código** en los archivos del proyecto (HTML, CSS, SCSS, JS). Ni con herramientas de edición ni pegando bloques de código completos en el chat.
2. **SÍ se puede:** leer los archivos del proyecto para entender el contexto y dar feedback sobre el código que Juan Carlos escribió.
3. **Dar sugerencias y pistas**, nombrar propiedades/conceptos relevantes pero que Juan Carlos escriba el código él mismo. Recomienda fragmentos de la documentacion de oficial de JavaScript, dando los links que redireccionen a la documentacion.
4. **Hacer preguntas socráticas** cuando ayude: "¿qué creés que pasa si...?", "¿qué te dice el inspector sobre ese elemento?"
5. Mostrar fragmentos mínimos de sintaxis SOLO si es imprescindible para explicar un concepto nunca la solución completa de su problema.
6. Responder en **español**.
7. Conectar las explicaciones con los requisitos de la entrega final (abajo) cuando sea relevante.
---

## 1. Contexto del proyecto

Aplicación web interactiva en **JavaScript** que simula un **proceso comercial o profesional**
de punta a punta. Es la evaluación práctica final del curso.

La app debe comportarse como una aplicación web real, reemplazando las limitaciones técnicas
del entorno (sin backend) por las herramientas vistas en el curso (DOM, eventos, Fetch, JSON,
librerías externas).

- **Temática del simulador:** Tienda de videojuegos de PlayStation 2 (ecommerce retro)
- **Repositorio:** _(pegar link cuando esté creado)_
- **Entregable final:** Google Slides _(link cuando esté)_

---

## 2. Rol de Claude en este proyecto

Claude actúa como **tutor y asistente que guía a terminar la actividad**, no como generador
de código. Reglas de colaboración:

- **No escribir código** salvo que Juan Carlos lo pida explícitamente con la palabra
  "orientación" o equivalente. El código lo escribe él.
- Cuando se pide **orientación**: dar pistas, explicar el concepto, proponer un enfoque o
  pseudocódigo, señalar el camino — **no** entregar la solución completa lista para pegar.
- Ayudar a **pensar el problema**: descomponer el flujo de negocio, ordenar prioridades,
  anticipar casos borde.
- **Revisar** lo que él escribe: marcar bugs, malas prácticas, cosas que no cumplen los
  criterios de evaluación.
- Mantener este **checklist actualizado**: tildar lo hecho, sugerir el próximo paso.
- Recordar los **criterios de evaluación** cuando una decisión los afecte (ej.: "esto suma
  para el 35% de integración de datos").

---

## 3. Requisitos técnicos (qué exige la consigna)

1. **DOM y eventos** — La app interactúa íntegramente con el HTML vía DOM y los eventos
   necesarios.
2. **Arrays → JSON + Fetch** — Todos los arrays de objetos se externalizan a archivo(s)
   `.json` y se acceden mediante `fetch`.
3. **Lógica completa** — El simulador completa **todo el circuito** del proceso de negocio
   según la temática elegida.
4. **Librerías** — Incluir **al menos una librería JS externa** con uso visible. **Eliminar**
   `prompt`, `confirm`, `alert` y **todo** rastro de mensajes en consola (`console.*`).
5. **Código claro** — Estructurado y legible, nombres descriptivos, comentarios breves,
   **sin** código en desuso/comentado.

---

## 4. Criterios de evaluación (dónde están los puntos)

| Peso | Criterio | Qué mira |
|------|----------|----------|
| **45 %** | Implementación funcional y flujo de negocio | Circuito completo, eventos producen el efecto esperado en la UI, pantallas/estados clave, casos comunes bien tratados |
| **35 %** | Integración de datos y librerías externas | Uso de `.json`, carga por `fetch`, arrays convertidos a JSON, ≥1 librería externa visible, **sin** prompt/confirm/alert ni console |
| **20 %** | Calidad de código, estructura y entrega documental | Código claro y ordenado, nombres descriptivos, comentarios breves, sin código comentado; entregable (Slides) con contexto, capturas, link al repo, demo y reflexión |

---

## 5. Checklist de progreso

### Fase 0 — Definición y setup
- [x] Definir la **temática** del simulador → Tienda de videojuegos de PS2 (ecommerce retro)
- [x] Mapear el **flujo de negocio** completo → Catálogo → Filtrar → Carrito → Modificar → Total → Checkout
- [x] Crear el **repositorio** en GitHub
- [x] Definir **estructura de carpetas** → `index.html`, `/css`, `/js`, `/data` (creada)
- [x] `README.md` inicial con descripción breve

### Fase 1 — Estructura base (HTML + CSS)
- [x] Maquetar las **pantallas/estados clave** del flujo → header+nav, `<main>` con dos `<section>`: `#contenedor-catalogo` (con `.grilla-juegos`) y `#contenedor-carrito` (con `.grilla-carrito`, `.total-numero` y botón `.boton-finalizar`), footer
- [~] Estilos base y layout → hay `styles.css` con reset básico, navbar (`flex`), grilla de productos (CSS Grid) y tarjeta `.producto`. **Pendiente:** centralizar la paleta en `:root` (hoy los colores están hardcodeados), unificar el color de acento (el `:hover` usa `#f5a623` naranja, no el `#0070d1` decidido) y **agregar el `<link>` de Google Fonts en el `<head>`** (el CSS ya pide Titillium Web / Chakra Petch pero no se cargan)
- [x] Verificar que la estructura HTML soporte la manipulación por DOM → contenedores vacíos (`.grilla-juegos`, `.grilla-carrito`) listos para render dinámico; ya no hay tarjetas de muestra

### Fase 2 — Datos (JSON + Fetch)
- [x] Identificar los **arrays de objetos** del dominio → array de juegos (modelo definido en Notas)
- [x] Externalizarlos a archivo(s) **`.json`** → `data/juegos.json` con 10 juegos PS2
- [x] Cargarlos con **`fetch`** (async/await o promesas) → `traerDatos()` en `main.js` con `async/await`
- [x] Manejo de **errores** de carga (qué pasa si el fetch falla) → `try/catch` con `Swal.fire({icon:"error"})` visible para el usuario; `productos` queda como `[]` por su inicialización

### Fase 3 — Lógica del negocio
- [x] Implementar el **circuito completo** (de principio a fin) → hecho: catálogo, filtros, agregar al carrito, **render del carrito** (`cargarCarrito()`), **total** (`actualizarTotalCarrito()`), **modificar cantidad** (+/− con `agregarCarrito`/`eliminarCarrito`), **eliminar ítem** al llegar a 0 (`splice(index, 1)`) y **checkout** (listener en `.boton-finalizar` que vacía el carrito). Pendiente pulir el checkout: usa `alert` (va a SweetAlert2 en Fase 4) y **no llama a `actualizarContadorCarrito()`**, así que el número del nav queda desactualizado
- [x] **Manipulación del DOM** (render dinámico de datos/estados) → `cargarProductos()` genera las tarjetas del catálogo; `cargarCarrito()` renderiza los ítems del carrito; `actualizarContadorCarrito()` refresca el número; `actualizarTotalCarrito()` refresca el total
- [x] **Eventos** que disparan las transiciones del flujo → `click` en botones de categoría (filtrar + mostrar catálogo), en `.boton-agregar` (sumar al carrito, re-enganchado con `actualizarBotones()` tras cada render) y en `.boton-carrito` (mostrar carrito + `cargarCarrito()`)
- [~] Tratamiento de **casos comunes** y validaciones → resueltos: comparación de `id` (string vs string), **total multiplica `precio * cantidad`**, imagen (`imagen_url`) usada en `src`, **carrito vacío** (el checkout avisa con `Swal` en vez de "comprar" $0) y **contador del nav** actualizado tras finalizar la compra. **tope de stock al agregar** (Pieza 1 de la Opción B): `agregarAlCarrito` arranca con `findIndex` + `cantidadActual` (ternario con `-1` → 0) y una **cláusula de guarda** `cantidadActual >= productoAgregado.stock` → `Swal` + `return`. Un solo aviso cubre los dos casos (llegar al tope y stock 0). El `stock` **no** se copia al carrito: el ítem guarda solo `id`, `titulo`, `imagen_url`, `precio`, `cantidad`. **descuento de stock al comprar** (Pieza 2): el listener de `.boton-finalizar` valida + pregunta, y delega en `finalizarCompra()`, que recorre `productosCarrito` con `forEach`, ubica cada juego en `productos` con `find` por `id`, le resta `producto.cantidad` al `stock`, y recién después vacía el carrito y refresca contador/total/render. **stock visible en el catálogo** (Pieza 3): `cargarProductos()` calcula `const agotado = producto.stock === 0` por tarjeta y lo usa para tres cosas — el `<p class="producto-stock">Quedan N</p>` (el ternario envuelve el elemento entero, así la tarjeta agotada no arrastra un `<p>` vacío ni su `gap`), el atributo booleano `disabled` del botón, y su texto (`Sin stock` / `Agregar`). **No hace falta re-renderizar el catálogo tras la compra:** el único camino de vuelta al catálogo son los botones de categoría, cuyo listener siempre llama a `cargarProductos()` con `productos` ya descontado. Pendiente menor: regla `.producto-stock` en `styles.css` (hoy no existe → el stock pesa visualmente igual que el precio), diferenciar el `:disabled` con `opacity` (hoy solo cambia el cursor), y sacar el `contenedorProductos.innerHTML = ""` de `cargarCarrito()` (borra la grilla del catálogo, que no es su incumbencia)
- [x] Persistencia de estado durante la sesión (si aplica a la temática) → **`localStorage` del carrito terminado (Opción A, ver Notas).** **Escritura:** `guardarCarrito()` es la única dueña de la clave `"carrito"` (verificado por grep: un solo `setItem` en todo el archivo) y se llama en los **tres** puntos donde muta `productosCarrito` — `agregarAlCarrito`, `restarDelCarrito` y `finalizarCompra` (guarda `[]` tras `length = 0`, así el carrito comprado no revive con F5). **Lectura:** `restaurarCarrito()` en 5 líneas, llamada desde `inicio()` después del `await traerJuegos()`: guarda temprana `guardado === null` → `JSON.parse` en `carritoGuardado` → `productosCarrito.push(...carritoGuardado)` → `actualizarContadorCarrito()`. Los tres bugs que tuvo y su causa quedaron anotados en Notas (comparación contra `-1`, shadowing de `productos`, `push` sin spread). **Bloqueante ya resuelto:** el carrito ahora guarda una **copia** del juego (`{...productoAgregado}` + `cantidad`, línea 85) en vez de compartir la referencia con `productos`, y `restarDelCarrito` lee y escribe siempre sobre `productosCarrito[index]`. Catálogo y carrito son estados independientes → el carrito se puede serializar sin romper nada. Pendiente menor: sacar el `|| 1` de la línea 158 (parche que enmascara `cantidad` indefinida y convierte un `0` legítimo en `1`)

### Fase 4 — Librería externa + limpieza
- [x] Integrar **≥1 librería JS externa** con uso visible → SweetAlert2 v11 por CDN (`<script>` en `index.html` **antes** de `main.js`), usada en el checkout: confirmación Sí/No + aviso de éxito
- [x] Reemplazar `alert` / `confirm` / `prompt` por UI propia o de la librería → el único `alert` (checkout) ya es `Swal.fire`
- [x] Eliminar **todos** los `console.*` → verificado por grep: 0 ocurrencias en `main.js`
- [x] Verificar que no queden diálogos nativos en ningún flujo → verificado por grep: 0 `alert`/`confirm`/`prompt`. Los 4 usos de SweetAlert2 son: error de fetch, carrito vacío, confirmación de compra y aviso de éxito

### Fase 5 — Calidad de código
- [~] **Nombres descriptivos** (variables, funciones, archivos) → hecho: arreglada la global implícita (`botonesCarritoSuma`/`botonesCarritoResta` ahora coinciden declaración y uso) y renombradas las 4 funciones/variables que mentían: `agregarCarrito`→`agregarAlCarrito`, `eliminarCarrito`→`restarDelCarrito`, `traerDatos`→`traerJuegos`, `productoEliminado`→`juegoEnCatalogo`. Pendiente: el choque `contenedorCatalogo`/`contenedorCarrito` (secciones) vs `contenedorProductos`/`contenedorCompras` (grillas); `numeroTotal`; los `div` genéricos (36, 138); `productos` vs dominio "juegos"; `index` (único nombre en inglés)
- [ ] **Comentarios breves** donde aporten claridad
- [ ] **Sin** código comentado / en desuso
- [ ] Estructura y modularización claras para la corrección
- [ ] Pasada final de revisión completa

### Fase 6 — Entregable (Google Slides)
- [ ] **Contexto** del proyecto
- [ ] **Capturas** de HTML / CSS / JS
- [ ] **Link** al repositorio
- [ ] **Demo** (link o grabación)
- [ ] **Reflexión final**
- [ ] Entregar

---

## 6. Notas y decisiones

> Espacio para registrar decisiones de diseño, dudas pendientes y por qué se eligió cada cosa.
> (Ej.: "Se eligió la librería X para Y porque…").

- **Temática:** Tienda de videojuegos de PS2 (ecommerce retro).
- **Alcance:** circuito completo (catálogo → filtros → carrito → modificar → total → checkout).
- **Librería externa:** SweetAlert2 — para confirmaciones/notificaciones y reemplazar `alert`/`confirm`.
- **Persistencia — Opción A (decidida):** **solo `productosCarrito` se persiste** en `localStorage` (con `JSON.stringify`/`parse`); `productos` (y por lo tanto el `stock`) siempre viene del `fetch` a `juegos.json`. Se descartó persistir también el stock porque el JSON pasaría a ser fuente secundaria y eso compite con el criterio del 35 % (`fetch` + `.json` como fuente de datos). Consecuencia aceptada: el descuento de stock de `finalizarCompra()` se pierde al recargar. Regla derivada: **`setItem("carrito", …)` aparece una sola vez en todo el archivo, dentro de `guardarCarrito()`** — cualquier otra escritura duplica el dueño del formato de la clave y se contradicen (ya pasó una vez con un `setItem("carrito", 0)`).
- **Servidor de desarrollo:** Live Server de VS Code (para que `fetch` funcione vía `http://`, no `file://`).
- **Sin backend:** la "base de datos" es `data/juegos.json`, leído con `fetch`.
- **Modelo de datos (cada juego):** `id`, `titulo`, `categorias` (texto simple, una por juego), `precio`, `stock`, `descripcion`, `desarrollador`, `año_lanzamiento`, `imagen_url`.
- **Control de stock (decisión): Opción B — el stock se descuenta al confirmar la compra.** No alcanza con limitar cuánto se puede poner en el carrito: al confirmar en el `Swal`, cada juego de `productos` baja su `stock` según la `cantidad` comprada. Se pierde al recargar (no hay backend, `juegos.json` es de solo lectura); es una limitación aceptada del entorno. Implica que **la fuente de verdad del stock es `productos`**, no la copia congelada que el carrito guarda por el spread.
- **Estado del carrito (decisión):** `productosCarrito` guarda **copias** de los juegos (spread `{...juego}` + propiedad `cantidad`), no referencias al array `productos`. Motivo: `cantidad` es información del carrito, no del catálogo; compartir la referencia entrelazaba los dos estados y rompía al rehidratar desde `localStorage` (los objetos parseados son nuevos). Regla derivada: **`restarDelCarrito` / `agregarAlCarrito` leen y escriben siempre sobre `productosCarrito[index]`**, nunca sobre el objeto del catálogo.
- **Categorías (7):** Mundo Abierto, Horror, Aventura, Acción, Sigilo, RPG, Carreras.
- **Navegación/filtros:** sección "Todos los productos" muestra el catálogo completo; el filtrado por categoría se hace desde el header (comparación directa con `===`). Se eliminó la sección "catálogo" separada.
- **Layout de la grilla de productos:** CSS Grid en `.contenedor-juegos`.
- **Tres trampas de `restaurarCarrito()` (para no repetirlas):** (1) `getItem` devuelve **`null`** cuando la clave no existe, no `-1` — el `-1` es la convención de `findIndex` y mezclarlas dejaba la guarda siempre en `true`, o sea la función salía por `return` **siempre**; (2) `const productos = JSON.parse(...)` hacía **shadowing** del catálogo global de la línea 6 — se renombró a `carritoGuardado`, que además dice la verdad sobre lo que contiene; (3) `push(carritoGuardado)` mete el array entero como **un solo elemento** (`[[{…},{…}]]`) → el `reduce` del contador leía `undefined.cantidad` y mostraba `NaN`; hace falta el **spread**: `push(...carritoGuardado)`. Se eligió `push` + spread sobre pasar la línea 10 a `let` + reasignar: `productosCarrito` se muta en todo el archivo (`push`, `splice`, `length = 0`) y el `const` garantiza que las 6 funciones que lo leen ven siempre el mismo array.
- **`mostrarCatalogo(categoria = "Todos")` — única dueña de "volver al catálogo".** Concentra las 4 responsabilidades (ocultar carrito, mostrar catálogo, escribir `tituloPrincipal`, filtrar + `cargarProductos`). Se llama desde el listener de `.boton-categoria` (que quedó en una línea: `mostrarCatalogo(e.target.dataset.categoria)`) y desde `finalizarCompra()` **sin argumentos**, apoyándose en el parámetro por defecto. Motivo: esas 4 líneas estaban duplicadas en el listener y en `finalizarCompra`, y la copia de `finalizarCompra` se había olvidado del título → el catálogo completo se mostraba con el encabezado de la última categoría filtrada. Regla derivada: **ningún otro lugar toca `.oculta` del catálogo ni `tituloPrincipal`.**
- **Render y datos son dos estados que hay que sincronizar a mano.** `productosCarrito` tiene 4 representaciones: el array, `.carrito-numero`, `.total-numero` y las tarjetas de `.grilla-carrito`. Vaciar el array no borra las tarjetas: solo `cargarCarrito()` limpia esa grilla. `finalizarCompra()` llegó a mostrar carrito vacío con las tarjetas viejas todavía en el DOM (invisibles porque la sección quedaba `oculta` tras la redirección → el síntoma quedaba tapado, no resuelto). Test de regresión: tras comprar, `productosCarrito.length` y `document.querySelectorAll(".carrito").length` deben dar **ambos 0**. Regla derivada: **cada función de render limpia solo su propia grilla** (`cargarCarrito` → `.grilla-carrito`, `cargarProductos` → `.grilla-juegos`); se quitó de `cargarCarrito()` el `contenedorProductos.innerHTML = ""` que borraba la grilla del catálogo.
- **Arquitectura de navegación:** SPA de una sola página. `<header>` fijo (nav) + `<main>` con dos `<section>` (`#contenedor-catalogo`, `#contenedor-carrito`); el JS muestra/oculta secciones agregando/quitando la clase `.oculta` (`display:none`) según el nav clickeado. Sin cambiar de archivo HTML.
- **Estructura de carpetas real:** `index.html` en la raíz + `/css` (`styles.css`, CSS plano, **no** SCSS) + `/js` (`main.js`) + `/data` (`juegos.json`) + `/assets` (`logo.png`). El `<script>` se carga al final del `<body>` (sin `defer`).
- **Selectores clave (para no romper el DOM):** secciones `#contenedor-catalogo` / `#contenedor-carrito`; grillas `.grilla-juegos` / `.grilla-carrito`; título del catálogo `.titulo-principal`; filtros `.boton-categoria` (con `data-categoria`); tarjeta `.producto`; botón agregar `.boton-agregar` (su `id` = `id` del juego); contador `.carrito-numero`; total `.total-numero`; botones `.boton-carrito` y `.boton-finalizar`.
- **Paleta de colores:** opción A "Boot screen" (estética del arranque de la PS2). Roles: fondo principal `#0a0a14`, fondo secundario/tarjetas `#1a1a2e`, texto `#e2e2e2`, acento (hover/carrito/precio) `#0070d1`, borde `#3a3a5a`. Criterio: un solo color de acento, usado con moderación. **Estado actual:** los colores están **hardcodeados** en `styles.css` (todavía sin `:root`/`var(...)`) y el `:hover` de la nav usa `#f5a623` (naranja), que **contradice** el acento único `#0070d1` → pendiente refactor.
- **Categorías — Camino 2 (etiquetas tal cual):** el valor de categoría se guarda como etiqueta legible ("Mundo Abierto", "Acción", …) tanto en `juegos.json` como en el `data-categoria` de cada botón. Se comparan con `===`, así que deben ser **idénticos** carácter por carácter (misma tilde, mayúscula y espacio). No se usan slugs. El botón "Todos los juegos" no es una categoría: es el filtro que muestra todo el catálogo.
- **Tipografías:** Titillium Web (texto general, en `body`) + Chakra Petch (títulos/`h2`). **Estado actual:** el CSS ya las declara en `font-family`, pero **falta el `<link>` de Google Fonts en el `<head>`** de `index.html`, así que hoy no se descargan y el navegador cae al `sans-serif` por defecto → pendiente agregar el `<link>`.