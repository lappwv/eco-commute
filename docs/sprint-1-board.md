# Sprint 1 - Tablero de seguimiento TP1

## Objetivo del Sprint

Consolidar el primer incremento funcional de EcoCommute sobre la estructura base y
la arquitectura general preparadas por Rodrigo Condor: rutas sostenibles, registro
de viajes, cálculo de CO₂, puntos verdes, dashboard, seguridad, documentación
técnica y evidencias del Sprint.

## Metodología

1. Rodrigo Condor preparó la estructura base y la arquitectura general.
2. Luego cada integrante refinó, completó, corrigió, integró y validó su feature
   (ramas `feature/*`), sin crear los módulos desde cero.

## Backlog del Sprint

| Estado | Historia | Tarea | Responsable | Estimación |
| --- | --- | --- | --- | --- |
| Done | HU01-HU02 | Refinar y validar autenticación, JWT, BCrypt y reglas de acceso (admin/usuario). | Rodrigo Condor | 18 h |
| Done | HU03 | Refinar e integrar la consulta de rutas sostenibles con OSRM (origen/destino, alternativas). | Jeampiero Ramos | 8 h |
| Done | HU04 | Completar y ajustar entidades y repositorios para registrar viajes sostenibles. | Jeampiero Ramos | 6 h |
| Done | HU05 | Refinar y validar el servicio de cálculo de CO₂ ahorrado y reglas de puntos. | Jeampiero Ramos | 6 h |
| Done | HU06 | Mejorar la actualización de puntos verdes al guardar viajes. | Odar Alcocer | 5 h |
| Done | HU07 | Extender y ajustar el dashboard con KPI, historial y evolución semanal. | Matías Mariños | 8 h |
| Done | HU08 | Mejorar el endpoint y la vista de ranking por distrito. | Paulo Espinoza | 6 h |
| Done | HU09 | Refinar el prompt y el servicio de recomendación con IA (Gemini + fallback heurístico). | Matías Mariños | 6 h |
| Done | HU10-HU11 | Completar y validar el sistema de medallas: desbloqueo automático y consulta en el perfil. | Odar Alcocer | 8 h |
| Done | HU12-HU14 | Completar y validar catálogo de recompensas, canjes e historial; retos (CRUD admin). | Diego Avalos | — |
| Done | Evidencia | Publicar landing page en GitHub Pages. | Matías Mariños | 4 h |
| Done | Evidencia | Desplegar el backend en la nube (Render Blueprint `render.yaml`, plan free). | Rodrigo Condor | 2 h |
| To-do | T12 / Evidencia | Preparar capturas, pruebas funcionales y resumen de colaboración del Sprint Review. | Matías Mariños | 6 h |

HU12–HU14 no tienen horas asignadas en el Sprint Backlog del informe; la cobertura
queda documentada en `feature/rewards` ([CONTRIBUTING.md](../CONTRIBUTING.md)) y
en [docs/product-backlog.md](product-backlog.md).

## API expuesta (alcance acotado del TP)

La API se documenta con su superficie reducida: 25 rutas (24 bajo `/api/v1` y
`GET /health`). El conteo anterior de la API amplia ya no aplica y no debe
documentarse.

- Auth: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/users/me`
- Routes: `POST /api/v1/routes/plan`
- Trips: `POST /api/v1/trips`, `GET /api/v1/trips/history`, `GET|PUT|DELETE /api/v1/trips/{tripId}`
- Dashboard: `GET /api/v1/dashboard/summary`, `GET /api/v1/dashboard/community-impact`
- Leaderboard: `GET /api/v1/leaderboard` (query param opcional: `district`)
- Rewards: `GET /api/v1/rewards`, `POST /api/v1/rewards/{rewardId}/redeem`, `GET /api/v1/redemptions`
- Challenges: `GET /api/v1/challenges`
- Admin rewards CRUD: `GET|POST /api/v1/admin/rewards`, `PUT|DELETE /api/v1/admin/rewards/{id}`
- Admin challenges CRUD: `GET|POST /api/v1/admin/challenges`, `PUT|DELETE /api/v1/admin/challenges/{id}`
- Infra: `GET /health`

Cobertura sin endpoint propio: HU10 (desbloqueo automático de medallas) se ejecuta
al registrar un viaje en `POST /api/v1/trips`; HU11 (consulta de medallas) se cubre
con `GET /api/v1/users/me`; HU09 (recomendación con IA) se entrega dentro del flujo
de `POST /api/v1/routes/plan`.

## Verificación técnica

- `backend`: `.\mvnw.cmd clean test` → **28 tests en verde** (CRUD, seguridad,
  servicios), verificado 03/10/2026 sobre `main`.
- Endpoint de salud desplegable: `GET /health`.
- Modelos de datos alineados: `database/eco_commute_schema.sql` + `assets/capitulo-3/erd.png` (9 tablas).

## Evidencias

- Landing page: https://lappwv.github.io/eco-commute/
- Repositorio: https://github.com/lappwv/eco-commute
- Informe (Markdown de referencia): [docs/Universidad Peruana de Ciencias Aplicadas.md](Universidad%20Peruana%20de%20Ciencias%20Aplicadas.md)
- Product Backlog (HU01–HU14): [docs/product-backlog.md](product-backlog.md)
- Tablero de seguimiento: https://github.com/lappwv/eco-commute/blob/main/docs/sprint-1-board.md
- Backend desplegado: **https://ecocommute-backend-a14m.onrender.com** — `GET /health` → `{"status":"UP"}` (verificado 01/10/2026); login `POST /api/v1/auth/login` → 200 con JWT; endpoints protegidos responden 200 con token y 403 sin rol admin. Swagger: `https://ecocommute-backend-a14m.onrender.com/swagger-ui.html`
