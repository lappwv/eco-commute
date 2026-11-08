# EcoCommute — Frontend Angular

Aplicación web (SPA) de EcoCommute: planificador de rutas sostenibles, bitácora de viajes, gamificación, ranking comunitario, beneficios y panel de administración para Lima Metropolitana.

## Estructura de carpetas

```text
src/
  app/
    components/
      admin/            Panel de administracion RBAC (beneficios y retos)
      auth/              Inicio de sesion, registro y cuentas demo
      confirm-dialog/     Dialogo de confirmacion reutilizable (MatDialog)
      dashboard/          "Mi Impacto": hero, metricas, grafico semanal, IA
      gamification/      "Logros": nivel, progreso y medallas
      icon/              Iconos propios en SVG (app-icon)
      leaderboard/        "Comunidad": podio y tabla de ranking por distrito
      rewards/           "Beneficios": catalogo de canje y retos del mes
      routes-planner/    "Rutas": comparador OSRM + mapa Leaflet
      terms/             Privacidad y Terminos
      trips/              "Bitacora": registro de viajes con filtros
    directives/
      count-up.directive.ts   Animacion de contador numerico
    interceptors/
      auth.interceptor.ts     Adjunta el JWT a las peticiones HTTP
    models/
      api.models.ts            Tipos compartidos con el backend
    services/
      api.service.ts            Datos de negocio (con respaldo local offline)
      auth.service.ts           Sesion, login/registro y JWT
      i18n.service.ts           Diccionario es_419 / en_US y persistencia
    app.component.ts            Shell: encabezado, pie de pagina, tema y tilt 3D
    app.routes.ts               Rutas con hash (#/dashboard, #/trips, ...)
  material-theme.scss           Tema de Angular Material (paleta verde de marca)
  styles.css                    Estilos globales e identidad visual
```

## Cómo correrlo

```bash
npm install
npm start                 # http://localhost:4200
```

Build de producción (sitio publicado en GitHub Pages bajo `/eco-commute/app/`):

```bash
npx ng build --base-href /eco-commute/app/
```

Pruebas automatizadas (Karma + Jasmine):

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

Credenciales de demostración (botón de 1 clic en la pantalla de cuenta):

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Ciudadana | `demo@ecocommute.org` | `Demo123!` |
| Administrador | `admin@ecocommute.org` | `Admin123!` |

## Pantallas y rutas

| Ruta | Pantalla | Descripción |
| --- | --- | --- |
| `#/login` | Cuenta | Inicio de sesión, registro (con aceptación de Términos) y accesos demo |
| `#/dashboard` | Mi Impacto | Hero de bienvenida, métricas acumuladas, gráfico semanal y sugerencia IA |
| `#/routes` | Rutas | Comparador de rutas sostenibles con mapa Leaflet y corredores rápidos |
| `#/trips` | Bitácora | Registro de viajes con filtros por medio de transporte y periodo |
| `#/gamification` | Logros | Nivel, progreso y colección de medallas |
| `#/leaderboard` | Comunidad | Podio y tabla de ranking por distrito |
| `#/rewards` | Beneficios | Catálogo de canje y retos comunitarios del mes |
| `#/admin` | Admin (`ROLE_ADMIN`) | CRUD de beneficios y retos comunitarios |
| `#/terms` | Privacidad y Términos | Información legal y de tratamiento de datos |

## Decisiones de diseño

- **Identidad visual propia**: paleta verde EcoCommute mediante variables CSS (`--emerald`, `--bg-card`, `--border`, etc.) que cambian según `[data-theme="light"|"dark"]`, en vez de depender de los colores por defecto de ninguna librería.
- **Angular Material** (`mat-card`, `mat-button`, `mat-form-field`/`mat-select`/`matInput`, `mat-tab-group`, `mat-table`, `mat-progress-bar`, `mat-chip`, `MatSnackBar`, `MatDialog`) se usa para la estructura e interacción de formularios, tablas y diálogos, pero el tema (`material-theme.scss`) reasigna sus tokens de color a las variables CSS del sitio para mantener la identidad visual y el modo oscuro.
- **Mapa, chips de filtro y tilt 3D** del encabezado/landing se dejaron con su implementación original (CSS/JS a medida) para no arriesgar la integración con Leaflet ni las animaciones ya afinadas.
- **i18n propio** (`I18nService`): diccionario `es_419`/`en_US` con persistencia en `localStorage`, sin librerías externas de internacionalización.
- **Accesibilidad**: `aria-label` en botones de icono, `:focus-visible` y roles ARIA en los componentes interactivos (ver `fix/a11y`).
- **Animaciones**: todas respetan `@media (prefers-reduced-motion: reduce)`.

## Librerías principales

- Angular 18 (standalone components) + Angular Material 18
- Leaflet 1.9 (mapa interactivo de corredores en Lima)
- RxJS (estado reactivo de los servicios)
- Karma + Jasmine (pruebas unitarias)
