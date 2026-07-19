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
- [ ] Crear el **repositorio** en GitHub
- [x] Definir **estructura de carpetas** → `index.html`, `/css`, `/js`, `/data` (creada)
- [x] `README.md` inicial con descripción breve

### Fase 1 — Estructura base (HTML + CSS)
- [ ] Maquetar las **pantallas/estados clave** del flujo
- [ ] Estilos base y layout
- [ ] Verificar que la estructura HTML soporte la manipulación por DOM que viene después

### Fase 2 — Datos (JSON + Fetch)
- [ ] Identificar los **arrays de objetos** del dominio
- [ ] Externalizarlos a archivo(s) **`.json`**
- [ ] Cargarlos con **`fetch`** (async/await o promesas)
- [ ] Manejo de **errores** de carga (qué pasa si el fetch falla)

### Fase 3 — Lógica del negocio
- [ ] Implementar el **circuito completo** (de principio a fin)
- [ ] **Manipulación del DOM** (render dinámico de datos/estados)
- [ ] **Eventos** que disparan las transiciones del flujo
- [ ] Tratamiento de **casos comunes** y validaciones
- [ ] Persistencia de estado durante la sesión (si aplica a la temática)

### Fase 4 — Librería externa + limpieza
- [ ] Integrar **≥1 librería JS externa** con uso visible
- [ ] Reemplazar `alert` / `confirm` / `prompt` por UI propia o de la librería
- [ ] Eliminar **todos** los `console.*`
- [ ] Verificar que no queden diálogos nativos en ningún flujo

### Fase 5 — Calidad de código
- [ ] **Nombres descriptivos** (variables, funciones, archivos)
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
- **Persistencia:** carrito guardado en `localStorage` (sobrevive al F5, con `JSON.stringify`/`parse`).
- **Servidor de desarrollo:** Live Server de VS Code (para que `fetch` funcione vía `http://`, no `file://`).
- **Sin backend:** la "base de datos" es `data/juegos.json`, leído con `fetch`.
- **Modelo de datos (cada juego):** `id`, `titulo`, `categorias` (texto simple, una por juego), `precio`, `stock`, `descripcion`, `desarrollador`, `año_lanzamiento`, `imagen_url`.
- **Categorías (7):** Mundo Abierto, Horror, Aventura, Acción, Sigilo, RPG, Carreras.
- **Navegación/filtros:** sección "Todos los productos" muestra el catálogo completo; el filtrado por categoría se hace desde el header (comparación directa con `===`). Se eliminó la sección "catálogo" separada.
- **Arquitectura de navegación:** SPA de una sola página. `<header>` fijo (nav) + `<main>` con varias `<section>` (catálogo, carrito, etc.); el JS muestra/oculta secciones vía `classList` según el nav clickeado. Sin cambiar de archivo HTML.