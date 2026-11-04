# Sprint 3 Board — EcoCommute (Trabajo Final)

> **Objetivo del Sprint 3:** Construir la arquitectura base de la aplicación web SPA en **Angular 18 + TypeScript + Angular Material + Leaflet**, integrarla con la API RESTful de Spring Boot mediante interceptores JWT y guardias de ruta, habilitar el CRUD completo de viajes para el propietario (`PUT` y `DELETE /api/v1/trips/{id}`) y entregar los módulos de Autenticación (`HU01`, `HU02`), Planificador de Rutas OSRM + IA Gemini (`HU03`, `HU09`), Registro y Gestión de Viajes con Cálculo de CO₂ (`HU04`, `HU05`) y Dashboard Personal (`HU07`).

## Sprint Backlog 3 (4.2.3.1)

| Task ID | Engineering Task Title | User Story | Estimation | Assigned To | Branch / Module | Status |
| --- | --- | --- | --- | --- | --- | --- |
| T23 | Configurar arquitectura SPA en Angular 18 (`app.config.ts`, `app.routes.ts`, Angular Material y tema accesible claro/oscuro) | Transversal | 6h | Matías Mariños | `frontend-angular/src/app` | Done |
| T24 | Implementar `I18nService` (`es_419`/`en_US`), `AuthService`, `authInterceptor` JWT y `authGuard`/`adminGuard` | HU01, HU02 | 6h | Rodrigo Condor | `services/`, `interceptors/`, `guards/` | Done |
| T25 | Desarrollar componente `AuthComponent` (`/login`) con pestañas de inicio de sesión, registro por distrito, validación y acceso demo 1-clic | HU01, HU02 | 6h | Rodrigo Condor | `components/auth/` | Done |
| T26 | Desarrollar `RoutesPlannerComponent` (`/routes`) con mapa Leaflet interactivo, trazado de corredores verdes vs. tráfico y tarjetas IA Gemini | HU03, HU09 | 8h | Jeampiero Ramos | `components/routes-planner/` | Done |
| T27 | Extender `TripController` backend para permitir edición (`PUT`) y eliminación (`DELETE`) al propietario del viaje con validación de pertenencia (`403 Forbidden`) | HU04, HU05 | 6h | Jeampiero Ramos | `backend/.../controller/TripController.java` | Done |
| T28 | Desarrollar `TripsComponent` (`/trips`) en Angular con previsualización en vivo de CO₂, calorías y EcoPuntos + tabla CRUD completa | HU04, HU05 | 7h | Odar Alcocer | `components/trips/` | Done |
| T29 | Desarrollar `DashboardComponent` (`/dashboard`) con tarjetas KPI, gráfico de evolución diaria, reparto por modo e insights IA | HU07 | 7h | Matías Mariños | `components/dashboard/` | Done |
| T30 | Ampliar suite de pruebas unitarias y de controladores en backend para edición/eliminación de viajes por propietario | HU04 | 5h | Paulo Espinoza | `backend/.../TripControllerTest.java` | Done |

**Total estimado:** 51 horas · **Completado:** 100% (8/8 tareas en estado `Done`).
