# Sprint 2 - Tablero de seguimiento TP1

## Objetivo del Sprint

Consolidar la calidad, estabilidad y documentación del alcance técnico del Trabajo Parcial de EcoCommute:
1. Reducir la superficie expuesta de la API a 25 rutas esenciales (24 endpoints bajo `/api/v1` + `GET /health`).
2. Completar e integrar las pruebas automatizadas (alcanzando 28 tests en verde).
3. Corregir y validar el comportamiento del flag de optimización con IA y alternativas OSRM.
4. Integrar las ramas feature pendientes (`feature/trips`, `feature/rewards`, `feature/challenges-leaderboard`, `refactor/reduce-api-surface`, `docs/sync-current-tp-report`).
5. Actualizar la landing page en GitHub Pages con capturas reales y textos neutros.
6. Sincronizar el informe técnico del TP con la arquitectura y el código desplegado en Render.

## Metodología

1. Se mantuvo el flujo obligatorio por ramas `feature/*` y `refactor/*` con Pull Requests revisados antes del merge a `main`.
2. Las tareas no agregaron alcance nuevo innecesario, sino que consolidaron robustez técnica, cobertura de pruebas y alineación con la rúbrica del Trabajo Parcial.

## Backlog del Sprint

| Estado | Historia / Área | Tarea | Responsable | Estimación |
| --- | --- | --- | --- | --- |
| Done | HU01-HU02, API | Refactorizar controladores y acotar la superficie de la API a 25 rutas expuestas (`refactor/reduce-api-surface`). | Rodrigo Condor | 6 h |
| Done | HU03, Rutas | Corregir el flag de optimización IA y validar respuestas con fallback heurístico en rutas sostenibles. | Matías Mariños | 5 h |
| Done | HU03, Rutas | Diseñar e implementar pruebas de integración para alternativas y fallback de rutas con OSRM (`RouteServiceTest`). | Jeampiero Ramos | 6 h |
| Done | HU04-HU05, Viajes | Implementar pruebas de integración para registro de viajes, historial y cálculo de CO₂ ahorrado (`TripControllerTest`, `CarbonServiceTest`). | Jeampiero Ramos | 6 h |
| Done | HU06, HU10-HU11 | Validar consistencia de cálculo de puntos y reglas de desbloqueo automático de medallas (`feature/stats-badges`). | Odar Alcocer | 5 h |
| Done | HU08, HU13 | Integrar y validar consistencia del ranking distrital y catálogo de retos (`feature/challenges-leaderboard`). | Paulo Espinoza | 6 h |
| Done | HU12, HU14 | Implementar pruebas de integración para endpoints de catálogo de recompensas, canjes e historial (`RewardControllerTest`). | Diego Avalos | 6 h |
| Done | Landing UI | Actualizar capturas de pantalla, catálogo demo y textos neutros de la landing page en GitHub Pages. | Matías Mariños | 5 h |
| Done | DevOps | Verificar pipeline de despliegue continuo en Render Blueprint (`render.yaml`) con PostgreSQL y health check. | Rodrigo Condor | 4 h |
| Done | QA & Docs | Ejecutar la suite completa de 28 tests automatizados en verde y sincronizar el informe técnico del TP. | Matías Mariños | 5 h |

## Tareas detalladas (Formato de seguimiento)

| Id | Title | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- |
| T13 | Refactorizar controladores y acotar la superficie de la API a 25 rutas expuestas | 6h | Rodrigo Condor | Done |
| T14 | Corregir el flag de optimización IA y validar respuestas con fallback heurístico en rutas | 5h | Matías Mariños | Done |
| T15 | Diseñar e implementar pruebas de integración para rutas y fallback OSRM (HU03) | 6h | Jeampiero Ramos | Done |
| T16 | Implementar pruebas de integración para registro de viajes, historial y cálculo de CO₂ (HU04, HU05) | 6h | Jeampiero Ramos | Done |
| T17 | Validar consistencia de cálculo de puntos y desbloqueo automático de medallas (HU06, HU10-HU11) | 5h | Odar Alcocer | Done |
| T18 | Integrar y validar consistencia del ranking distrital y catálogo de retos (HU08, HU13) | 6h | Paulo Espinoza | Done |
| T19 | Implementar pruebas de integración para endpoints de recompensas, canjes y administración (HU12, HU14) | 6h | Diego Avalos | Done |
| T20 | Actualizar capturas de pantalla, catálogo demo y textos neutros de la landing page | 5h | Matías Mariños | Done |
| T21 | Verificar pipeline de despliegue continuo en Render Blueprint con PostgreSQL y health check | 4h | Rodrigo Condor | Done |
| T22 | Ejecutar la suite completa de 28 tests automatizados en verde y sincronizar informe del TP | 5h | Matías Mariños | Done |

## Pull Requests integrados en el Sprint 2

| PR # | Rama | Descripción | Revisor / Merge |
| --- | --- | --- | --- |
| #2 | `refactor/reduce-api-surface` | Reducción de la API a 25 rutas públicas respetando HU01–HU14 | lappwv / Rodrigo Condor |
| #3 | `docs/sync-current-tp-report` | Sincronización del informe técnico, capturas y textos de landing | lappwv / Matías Mariños |
| #4 | `feature/challenges-leaderboard` | Consistencia de retos y ranking por distrito con transport modes | lappwv / Paulo Espinoza |
| #5 | `feature/trips` | Pruebas de integración para viajes, rutas OSRM, CO₂ y flag IA | lappwv / Jeampiero Ramos |
| #6 | `feature/rewards` | Pruebas de integración de controller de recompensas y canjes | lappwv / Diego Avalos |

## Verificación técnica final

- `backend`: `.\mvnw.cmd clean test` → **28 tests automatizados en verde** (0 fallas, 0 errores).
- Endpoint de salud: `GET https://ecocommute-backend-a14m.onrender.com/health` → `{"status":"UP"}`.
- Swagger OpenAPI: `https://ecocommute-backend-a14m.onrender.com/swagger-ui.html` (25 rutas documentadas).
- Landing page pública: `https://lappwv.github.io/eco-commute/`.
