# EcoCommute

EcoCommute es una aplicación web orientada a incentivar la movilidad sostenible en Lima Metropolitana mediante rutas ecoeficientes, cálculo de CO₂ ahorrado, puntos verdes, recompensas, rankings por distrito y recomendaciones personalizadas con IA.

## Equipo y forma de trabajo

El desarrollo partió de una estructura base y arquitectura general preparada por Rodrigo Condor. A partir de esa base, el equipo trabajó por funcionalidades mediante ramas `feature/*`, refinando, completando, corrigiendo, integrando y validando los módulos asignados.

Responsabilidades principales del Sprint:

- Rodrigo Condor Silvera — estructura base, arquitectura general, autenticación e integración.
- Jeampiero Ramos — rutas, viajes y validación del cálculo de CO₂.
- Odar Alcocer — puntos verdes, gamificación y medallas.
- Paulo Espinoza — ranking por distrito.
- Matías Mariños — dashboard, IA y evidencias del Sprint.
- Diego Avalos — recompensas, canjes y retos.

El flujo de contribución (ramas, convención de commits, Pull Requests) está documentado en [CONTRIBUTING.md](CONTRIBUTING.md).

## Arquitectura objetivo del producto

La aplicación web principal de EcoCommute se implementará con:

- Frontend principal: **Angular + TypeScript + Angular Material**.
- Backend: Java 21 + Spring Boot 3.3.3 + Spring Security + JWT + Spring Data JPA.
- Base de datos: PostgreSQL.
- Ruteo: OSRM.
- Inteligencia artificial: Google Gemini, con fallback heurístico.
- Documentación de API: OpenAPI / Swagger (springdoc).

## Alcance del Trabajo Parcial

En esta entrega se implementan y despliegan:

- Landing page responsive.
- Backend API REST.
- Persistencia de datos.
- Seguridad y autenticación.
- Rutas, viajes, CO₂, puntos, dashboard, ranking, medallas, recompensas y retos.
- Documentación OpenAPI/Swagger.
- Despliegue del backend en Render.
- Landing publicada en GitHub Pages.
- Product Backlog.
- Sprint Backlog.
- Lean UX.
- Diseño y evidencias del Sprint.

La aplicación Angular completa **NO** forma parte todavía del entregable implementado del Trabajo Parcial.

Sus pantallas y flujos se representan actualmente mediante mock-ups y wireflows, y serán implementados en siguientes iteraciones.

## Estructura

```text
frontend/landing/        Landing page del Trabajo Parcial
backend/                 API REST Spring Boot
database/                Modelo y scripts PostgreSQL
capitulo3_figma_exports/ Artefactos visuales usados en el informe
assets/                  Recursos visuales auxiliares
docs/                    Backlog, evidencias y seguimiento del Sprint
```

## Flujo principal del alcance inicial

1. El usuario se registra e inicia sesión.
2. Consulta o registra un viaje sostenible.
3. El sistema calcula CO₂ ahorrado y puntos verdes.
4. El usuario revisa su dashboard, historial y ranking.
5. El usuario canjea puntos por recompensas.
6. La IA sugiere mejores hábitos de movilidad.

## Estado del backend (verificado)

- 24 endpoints bajo `/api/v1` más `GET /health` = 25 rutas expuestas (auth y perfil, rutas,
  viajes, dashboard, ranking, recompensas, retos y CRUD administrativo de rewards/challenges).
- 28 tests automatizados en verde: `cd backend && ./mvnw.cmd clean test`.
- Documentación interactiva: `https://ecocommute-backend-a14m.onrender.com/swagger-ui.html`.

## Despliegue del backend (Render, gratis, sin tarjeta)

El backend se despliega con el Blueprint `render.yaml` de la raíz (Docker + PostgreSQL gestionado):

1. Crear cuenta en https://render.com (no pide tarjeta).
2. **New → Blueprint →** elegir este repo → Render lee `render.yaml`, crea el servicio
   `ecocommute-backend` (plan free, 512 MB) y la base `ecocommute-db` (Postgres free, 256 MB),
   y genera `JWT_SECRET` automáticamente.
3. Esperar el primer deploy. La URL es **`https://ecocommute-backend-a14m.onrender.com`**;
   el chequeo de salud es `GET /health` → `{"status":"UP"}`.

Variables de entorno que usa el backend (todas resueltas por el Blueprint):

| Variable | Origen |
|---|---|
| `JWT_SECRET` | generada por Render |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` | desde `ecocommute-db` |
| `PORT` | inyectada por Render (el backend la respeta) |
| `APP_SEED_DEMO_DATA` | `true` |

Cuentas de demostración:

| Rol | Email | Contraseña |
|---|---|---|
| Usuario | `demo@ecocommute.org` | `Demo123!` |
| Administrador | `admin@ecocommute.org` | `Admin123!` |

Cosas a tener en cuenta del plan free:

- Tras ~30 min sin tráfico la instancia duerme y el primer request tarda ~30-60 s (cold start).
- El Postgres free expira a los 90 días (para la demo del TP no afecta).
- Cada push a `main` redeploya automáticamente.

Verificación post-deploy: `https://ecocommute-backend-a14m.onrender.com/health` debe responder
`{"status":"UP",...}` y `POST /api/v1/auth/login` con las credenciales demo debe devolver un JWT.

## Documento de referencia para desarrollo

- [docs/Universidad Peruana de Ciencias Aplicadas.md](docs/Universidad%20Peruana%20de%20Ciencias%20Aplicadas.md)

Es la conversión en Markdown del informe del Trabajo Parcial (versión 1.5 del
02/10/2026) y la **referencia académica principal** del repositorio para desarrollo
asistido por IA: alcance del TP, HU01–HU14, responsabilidades, arquitectura,
tecnologías y despliegue.

Alcance que debe respetarse al leer o generar documentación:

- Arquitectura objetivo del producto: Angular + TypeScript + Angular Material
  (**aún no implementada**; sus pantallas se representan con mock-ups y wireflows).
- Alcance implementado del TP: landing page responsive, backend API REST, base de
  datos, seguridad, despliegue y documentación/evidencias.

## Documento del Proyecto

Google Docs del informe:
https://docs.google.com/document/d/1rS2YmaUWzP3o-Y5hm9gAD7u6cKaOvi2Oyo4YMZHumaI

Figma:
https://www.figma.com/design/qUCg9tJfKBqd5KAsD9DALq/Untitled

Landing pública:
https://lappwv.github.io/eco-commute/

Tablero Sprint 1:
https://github.com/lappwv/eco-commute/blob/main/docs/sprint-1-board.md
