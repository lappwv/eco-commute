# Sprint 1 - Tablero de seguimiento TP1

## Objetivo del Sprint

Implementar la base funcional de EcoCommute para evidenciar avance del Trabajo Parcial: rutas sostenibles, registro de viajes, cálculo de CO₂, puntos verdes, dashboard inicial, seguridad y documentación técnica.

## Backlog del Sprint

| Estado | Historia | Tarea | Responsable | Estimación |
| --- | --- | --- | --- | --- |
| Done | HU03 | Consulta de rutas sostenibles con OSRM (origen/destino, alternativas). | Jeampiero Ramos | 8 h |
| Done | HU04 | Entidades y repositorios para registrar viajes sostenibles. | Jeampiero Ramos | 6 h |
| Done | HU05 | Servicio de cálculo de CO₂ ahorrado y reglas de puntos. | Jeampiero Ramos | 6 h |
| Done | HU06 | Registro de puntos verdes al guardar viajes. | Odar Alcocer | 5 h |
| Done | HU07 | Dashboard con KPI, historial y evolución semanal. | Matías Mariños | 8 h |
| Done | HU08 | Endpoint y vista de ranking por distrito. | Paulo Espinoza | 6 h |
| Done | HU09 | Prompt y servicio de recomendación con IA (Gemini + fallback heurístico). | Matías Mariños | 6 h |
| Done | HU01-HU02 | Autenticación, JWT, BCrypt y reglas de acceso (admin/usuario). | Rodrigo Condor | 8 h |
| Done | HU10-HU11 | Medallas: desbloqueo automático y consulta en el perfil. | Odar Alcocer | 8 h |
| Done | HU12-HU14 | Catálogo de recompensas, canjes e historial; retos (CRUD admin). | Diego Avalos | 8 h |
| Done | Evidencia | Publicar landing page en GitHub Pages. | Matías Mariños | 4 h |
| Done | Evidencia | Desplegar el backend en la nube (Render Blueprint `render.yaml`, plan free). | Rodrigo Condor | 2 h |
| To-do | Evidencia | Preparar capturas, pruebas funcionales y documentación de Sprint Review. | Matías Mariños | 6 h |

## Verificación técnica

- `backend`: `.\mvnw.cmd clean test` → **23 tests en verde** (CRUD, seguridad, servicios).
- Endpoint de salud desplegable: `GET /health`.
- Modelos de datos alineados: `database/eco_commute_schema.sql` + `assets/capitulo-3/erd.png` (9 tablas).

## Evidencias

- Landing page: https://lappwv.github.io/eco-commute/
- Repositorio: https://github.com/lappwv/eco-commute
- Product Backlog (HU01–HU14): [docs/product-backlog.md](product-backlog.md)
- Tablero de seguimiento: https://github.com/lappwv/eco-commute/blob/main/docs/sprint-1-board.md
- Backend desplegado: **https://ecocommute-backend-a14m.onrender.com** — `GET /health` → `{"status":"UP"}` (verificado 01/10/2026); login `POST /api/v1/auth/login` → 200 con JWT; endpoints protegidos responden 200 con token y 403 sin rol admin. Swagger: `https://ecocommute-backend-a14m.onrender.com/swagger-ui.html`
