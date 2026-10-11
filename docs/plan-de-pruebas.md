# Plan de Pruebas – Portafolio Personal

**Asignatura:** DSY1104 – Desarrollo Fullstack II
**Evaluación:** Formativa N° 2 – Portafolio personal y pruebas unitarias
**Autor:** Andeison Belandria
**Indicadores de logro:** IL2.2 (pruebas unitarias con Jasmine y Karma) · IL2.3 (proceso de testeo)

---

## 1. Objetivo

Verificar que los componentes React del portafolio rendericen correctamente, gestionen su estado y eventos, manipulen el DOM como se espera y carguen sus datos desde archivos JSON, detectando errores de forma temprana mediante pruebas unitarias automatizadas.

## 2. Alcance

**Dentro del alcance (componentes críticos):**

| Componente | Archivo | Responsabilidad |
|---|---|---|
| NavBar | `src/components/layout/NavBar.jsx` | Navegación responsiva con estado de menú |
| Introduction | `src/components/introduction/Introduction.jsx` | Presentación personal vía props |
| ProjectCard | `src/components/projects/ProjectCard.jsx` | Card de un proyecto |
| ProjectsSection | `src/components/projects/ProjectsSection.jsx` | Carga de proyectos desde JSON |
| NewsItem | `src/components/news/NewsItem.jsx` | Tarjeta de una noticia |
| NewsSection | `src/components/news/NewsSection.jsx` | Carga y filtrado de noticias desde JSON |
| ContactForm | `src/components/contact/ContactForm.jsx` | Formulario con validación |
| dataService | `src/services/dataService.js` | Lectura de archivos JSON |
| useFetchJson | `src/hooks/useFetchJson.js` | Estado de carga (se prueba a través de las secciones) |
| Footer | `src/components/layout/Footer.jsx` | Pie de página con enlaces por props |

**Fuera del alcance:**

- Pruebas end-to-end y de navegación real entre páginas.
- Pruebas de rendimiento y de accesibilidad automatizadas (se revisan manualmente).
- `main.jsx` y `App.jsx`, que solo ensamblan los componentes ya probados.

## 3. Estrategia y herramientas

| Elemento | Herramienta | Uso |
|---|---|---|
| Framework de pruebas | Jasmine | Estructura (`describe`, `it`) y aserciones (`expect`) |
| Ejecutor | Karma | Corre las pruebas en Chrome Headless |
| Empaquetado | webpack + babel-loader | Compila JSX y módulos para el navegador |
| Cobertura | karma-coverage + babel-plugin-istanbul | Informe de cobertura (HTML y texto) |
| Renderizado | `react-dom/client` + `act` | Monta los componentes en el DOM real |

**Nivel de prueba:** unitarias. Cada componente se prueba de forma aislada, y las dependencias externas (`fetch`) se reemplazan por dobles de prueba.

**Patrón de cada prueba (AAA):**

1. **Arrange (preparar):** montar el componente con props y datos controlados.
2. **Act (actuar):** simular la acción del usuario (clic, escritura) o esperar la carga.
3. **Assert (verificar):** comprobar el DOM resultante con `expect`.

## 4. Conceptos clave aplicados

| Concepto | Cómo se aplica en el proyecto |
|---|---|
| **Prueba unitaria** | Cada archivo `.spec.jsx` prueba un único componente en aislamiento. |
| **Aislamiento** | Antes de cada prueba se crea un contenedor DOM nuevo (`beforeEach`) y se destruye al terminar (`afterEach`), para que ninguna prueba dependa de otra. |
| **Mock / Spy** | `spyOn(window, 'fetch')` reemplaza la petición de red por una respuesta controlada. `jasmine.createSpy('onSubmit')` verifica que el formulario llame a la función recibida por props. |
| **Casos positivos y negativos** | Se prueban tanto los caminos correctos (JSON cargado, formulario válido) como los de fallo (error 404, correo inválido, lista vacía). |
| **Casos límite** | Nombre con solo espacios, categoría inexistente, props opcionales ausentes. |
| **Pruebas asíncronas** | La carga de JSON se espera con `act(async ...)` antes de verificar el DOM. |
| **Cobertura de código** | Se mide qué porcentaje del código ejecutan las pruebas (sentencias, ramas, funciones y líneas). |
| **Regresión** | `npm test` se ejecuta antes de cada commit para detectar que un cambio nuevo no rompa lo anterior. |

## 5. Entorno y ejecución

```
npm install
npm test                # ejecuta todas las pruebas una vez y genera cobertura
npm run test:watch      # modo observador mientras se desarrolla
```

El informe de cobertura se genera en `coverage/index.html`, y la carpeta está excluida del repositorio mediante `.gitignore`.

## 6. Casos de prueba

**Resultado esperado general:** todas las pruebas finalizan en estado SUCCESS.

### 6.1 Entorno

| ID | Caso | Resultado esperado |
|---|---|---|
| ENT-01 | Renderizar un componente React simple en el DOM | El elemento `h1` contiene el texto "Hola Jasmine" |

### 6.2 NavBar

| ID | Caso | Resultado esperado |
|---|---|---|
| NAV-01 | Renderizar la marca recibida por props | `.navbar-brand` muestra el texto entregado |
| NAV-02 | Renderizar enlaces desde el arreglo `links` | Existen 3 `.nav-link` con su texto y `href` correctos |
| NAV-03 | Estado inicial del menú | El menú no tiene la clase `show` y `aria-expanded="false"` |
| NAV-04 | Clic en el botón hamburguesa (evento + estado) | El menú se abre (`show`, `aria-expanded="true"`) y al repetir el clic se cierra |
| NAV-05 | Clic en un enlace con el menú abierto | El menú se cierra |

### 6.3 Introduction

| ID | Caso | Resultado esperado |
|---|---|---|
| INT-01 | Mostrar nombre, cargo y biografía | `h1`, `.lead` y el texto de la biografía coinciden con las props |
| INT-02 | Foto con texto alternativo por defecto | `src` igual a la prop `photo` y `alt` = "Foto de {nombre}" |
| INT-03 | Texto alternativo personalizado | El `alt` coincide con la prop `photoAlt` |
| INT-04 | Botón con texto y destino | `a.btn` muestra `ctaText` y apunta a `ctaHref` |
| INT-05 | Botón omitido sin `ctaHref` | No existe ningún `a.btn` |
| INT-06 | Diseño responsivo | Existen `.row` y `.col-md-4`, y la imagen tiene `img-fluid` |
| INT-07 | Prioridad de carga de la foto | `fetchpriority="high"` y `width`/`height` de 260 en la imagen |

### 6.4 ProjectCard

| ID | Caso | Resultado esperado |
|---|---|---|
| PRO-01 | Título y descripción por props | `.card-title` y `.card-text` coinciden con las props |
| PRO-02 | Imagen con `alt` por defecto | `alt` = "Captura del proyecto {título}" |
| PRO-03 | `alt` personalizado | El `alt` coincide con `imageAlt` |
| PRO-04 | Etiquetas de tecnologías | Hay un `.badge` por tecnología, en el mismo orden |
| PRO-05 | Sin tecnologías | No se renderiza ningún `.badge` |
| PRO-06 | Enlace seguro | `href` = url, `target="_blank"` y `rel="noopener noreferrer"` |
| PRO-07 | Texto de enlace por defecto | El botón muestra "Ver proyecto" |
| PRO-08 | Estructura Bootstrap | Existen `.card`, `.card-img-top` y `.card-body` |

### 6.5 ProjectsSection (con mock de `fetch`)

| ID | Caso | Resultado esperado |
|---|---|---|
| PSE-01 | Estado de carga | Se muestra `[role="status"]` con "Cargando proyectos" |
| PSE-02 | Carga exitosa | Se renderizan 3 `.card` y desaparece el indicador de carga |
| PSE-03 | Orden de los datos | Los títulos aparecen en el mismo orden del JSON |
| PSE-04 | Ruta por defecto | `fetch` se invoca con `data/projects.json` |
| PSE-05 | Ruta por props | `fetch` se invoca con el valor de `dataUrl` |
| PSE-06 | Error de carga | Se muestra `.alert-danger` y no hay tarjetas |
| PSE-07 | JSON vacío | Se muestra "Aún no hay proyectos para mostrar" |

### 6.6 dataService

| ID | Caso | Resultado esperado |
|---|---|---|
| DAT-01 | Respuesta correcta | `fetchJson` devuelve el contenido del JSON y llama a `fetch` con la ruta |
| DAT-02 | Respuesta con error (404) | `fetchJson` lanza un `Error` que menciona el código 404 |

### 6.7 NewsItem

| ID | Caso | Resultado esperado |
|---|---|---|
| NIT-01 | Título y contenido por props | `.card-title` y `.card-text` coinciden con las props |
| NIT-02 | Fecha original conservada | `time` tiene `datetime="2026-09-15"` |
| NIT-03 | Fecha legible | El texto de `time` contiene el año y el día, y no es `2026-09-15` |
| NIT-04 | Estructura Bootstrap | Es un `article` con clase `card` y un `.card-body` |

### 6.8 NewsSection (con mock de `fetch`)

| ID | Caso | Resultado esperado |
|---|---|---|
| NSE-01 | Estado de carga | Se muestra "Cargando noticias" |
| NSE-02 | Ruta por defecto | `fetch` se invoca con `data/news.json` |
| NSE-03 | Ruta por props | `fetch` se invoca con el valor de `dataUrl` |
| NSE-04 | Filtro por categoría | Solo se muestran las 2 noticias de "Tecnología" |
| NSE-05 | Sin categoría | Se muestran las 4 noticias y desaparece la carga |
| NSE-06 | Título e id por props | `h2` y `section.id` coinciden con las props |
| NSE-07 | Id por defecto | `section.id` es "noticias" |
| NSE-08 | Error de carga | Se muestra `.alert-danger` y ningún `article` |
| NSE-09 | Categoría sin resultados | Se muestra "No hay noticias para mostrar" |

### 6.9 ContactForm (eventos y estado)

| ID | Caso | Resultado esperado |
|---|---|---|
| CON-01 | Estructura del formulario | 3 campos con su `label` asociada y botón "Enviar mensaje" |
| CON-02 | Envío con campos vacíos | 3 mensajes de error, `aria-invalid="true"` y `onSubmit` no se llama |
| CON-03 | Nombre con solo espacios | Error "El nombre es obligatorio." |
| CON-04 | Correo con formato inválido | Error "Ingresa un correo válido." |
| CON-05 | Mensaje demasiado corto | Error de mínimo 10 caracteres |
| CON-06 | Datos válidos | `onSubmit` recibe los datos, aparece `.alert-success` y los campos se vacían |
| CON-07 | Campo controlado | El valor del input se actualiza mientras se escribe |
| CON-08 | Corrección de un campo | Desaparece el error de ese campo, pero no el de los demás |
| CON-09 | Nueva escritura tras el éxito | El mensaje de éxito se oculta |
| CON-10 | Estructura Bootstrap | 3 `.form-control`, 3 `.form-label`, `.btn-primary` y `.col-md-8` |

### 6.10 Footer

| ID | Caso | Resultado esperado |
|---|---|---|
| FOO-01 | Nombre y año por props | El párrafo contiene el año y el nombre entregados |
| FOO-02 | Año por defecto | El párrafo contiene el año actual |
| FOO-03 | Enlaces externos seguros | Un `a` por cada link, con `href`, `target="_blank"` y `rel="noopener noreferrer"` |
| FOO-04 | Sin enlaces | No se renderiza ningún `ul` |
| FOO-05 | Estructura semántica | Existe un `footer` con `bg-dark` y un `.container` |

## 7. Resultados de la última ejecución

| Componente | Casos | Resultado |
|---|---|---|
| Entorno | 1 | SUCCESS |
| NavBar | 5 | SUCCESS |
| Introduction | 7 | SUCCESS |
| ProjectCard | 8 | SUCCESS |
| ProjectsSection | 7 | SUCCESS |
| dataService | 2 | SUCCESS |
| NewsItem | 4 | SUCCESS |
| NewsSection | 9 | SUCCESS |
| ContactForm | 10 | SUCCESS |
| Footer | 5 | SUCCESS |
| **Total** | **58** | **58 SUCCESS, 0 FAILED** |

## 8. Informe de cobertura (IE2.3.2)

Generado con `karma-coverage` (Istanbul):

| Métrica | Resultado |
|---|---|
| Sentencias (Statements) | 100% (79/79) |
| Ramas (Branches) | 93.05% (67/72) |
| Funciones (Functions) | 100% (30/30) |
| Líneas (Lines) | 100% (72/72) |

**Análisis:** las funcionalidades críticas (renderizado, carga de datos, eventos y validación) quedan cubiertas en su totalidad. Las 5 ramas sin cubrir corresponden a condiciones alternativas poco relevantes, como valores por defecto de props opcionales. El detalle línea por línea se consulta en `coverage/index.html`.

## 9. Observaciones

- Durante la ejecución aparecen avisos `WARN 404: /images/Panda_Profile.jpg`. Ocurren porque el servidor interno de Karma no sirve la carpeta `public`, y no afectan el resultado de las pruebas ni el portafolio publicado.
- Los datos reales (`projects.json` y `news.json`) no se leen en las pruebas: se reemplazan por mocks para que sean rápidas, repetibles e independientes de la red.
- `App.jsx` y `main.jsx` no se prueban porque solo ensamblan componentes ya probados.