# Sprint 4 Board — EcoCommute (Trabajo Final)

> **Objetivo del Sprint 4:** Completar los módulos comunitarios, de gamificación y administrativos en la aplicación web Angular 18 (`GamificationComponent`, `LeaderboardComponent`, `RewardsComponent`, `AdminComponent`, `TermsComponent`), exponer la totalidad de los 34 endpoints en OpenAPI 3.0 / Swagger UI, verificar las 102 pruebas automatizadas de backend, desplegar la aplicación web en producción y ejecutar la validación con usuarios reales (Segmentos 1 y 2) y evaluación heurística.

## Sprint Backlog 4 (4.2.4.1)

| Task ID | Engineering Task Title | User Story | Estimation | Assigned To | Branch / Module | Status |
| --- | --- | --- | --- | --- | --- | --- |
| T31 | Desarrollar `GamificationComponent` (`/gamification`) con barra de progreso de nivel, galería de medallas y tarjetas de retos comunitarios | HU06, HU10, HU11, HU13 | 7h | Odar Alcocer | `components/gamification/` | Done |
| T32 | Desarrollar `LeaderboardComponent` (`/leaderboard`) con filtro por distrito de Lima, ranking ciudadano y tabla comparativa interdistrital | HU08 | 6h | Paulo Espinoza | `components/leaderboard/` | Done |
| T33 | Desarrollar `RewardsComponent` (`/rewards`) con flujo de canje interactivo, validación de saldo y tabla de códigos `ECO-XXXXXX` | HU14 | 6h | Diego Avalos | `components/rewards/` | Done |
| T34 | Desarrollar `AdminComponent` (`/admin`) para gestión CRUD de recompensas, retos y moderación de usuarios protegido por `ROLE_ADMIN` | HU12, HU13 | 7h | Diego Avalos | `components/admin/` | Done |
| T35 | Desarrollar `TermsComponent` (`/terms`), auditoría de accesibilidad WCAG 2.1 AA (ARIA, `skip-link`, contraste) y resiliencia offline/online en `ApiService` | HU01 | 5h | Matías Mariños | `components/terms/`, `services/api.service.ts` | Done |
| T36 | Exponer los 34 endpoints en OpenAPI 3.0 / Swagger UI eliminando anotaciones `@Hidden` residuales y ejecutando 102 pruebas automatizadas en verde | Transversal | 6h | Rodrigo Condor | `backend/.../controller/` | Done |
| T37 | Compilar bundle de producción de Angular 18, integrar enlaces CTA desde la Landing Page y desplegar en GitHub Pages (`/app/`) y Render | Transversal | 6h | Rodrigo Condor | `frontend-angular/`, `render.yaml` | Done |
| T38 | Conducir entrevistas de validación con usuarios de los Segmentos 1 y 2, evaluación heurística y consolidación del Informe de Trabajo Final | Transversal | 6h | Paulo Espinoza | `docs/` | Done |

**Total estimado:** 49 horas · **Completado:** 100% (8/8 tareas en estado `Done`).
