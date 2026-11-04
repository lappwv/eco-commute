# EcoCommute — Movilidad Urbana Sostenible en Lima (Trabajo Final)

> ### 🌐 Enlaces Oficiales de Despliegue en Producción
> - **Web Application SPA (Angular 18 + Angular Material + Leaflet):** [https://lappwv.github.io/eco-commute/app/](https://lappwv.github.io/eco-commute/app/)
> - **Landing Page Pública (`es_419` / `en_US`):** [https://lappwv.github.io/eco-commute/](https://lappwv.github.io/eco-commute/)
> - **API Backend en Render (Health Check):** [https://ecocommute-backend-a14m.onrender.com/health](https://ecocommute-backend-a14m.onrender.com/health)
> - **Documentación OpenAPI 3.0 / Swagger UI (34 Endpoints Activos):** [https://ecocommute-backend-a14m.onrender.com/swagger-ui.html](https://ecocommute-backend-a14m.onrender.com/swagger-ui.html)
> - **Tablero de Gestión (GitHub Projects):** [https://github.com/users/lappwv/projects/1](https://github.com/users/lappwv/projects/1)

EcoCommute es una plataforma web full-stack orientada a incentivar la movilidad urbana sostenible en Lima Metropolitana, alineada con el **ODS 11 (Meta 11.2: Proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos)** mediante planificación de rutas ecoeficientes con **OSRM**, cuantificación de CO₂ evitado, gamificación con EcoPuntos, medallas, retos comunitarios, catálogo de recompensas, rankings por distrito y recomendaciones inteligentes explicadas con **Google Gemini (`gemini-1.5-flash`)**.

---

## 👥 Equipo de Desarrollo y Responsabilidades (Sprints 1–4)

- **Rodrigo Condor Silvera** — Arquitectura full-stack, seguridad Spring Security + JWT, interceptores/guardias en Angular 18, OpenAPI 3.0 y despliegue continuo (Render + GitHub Pages).
- **Jeampiero Ramos** — Integración geoespacial OSRM + Leaflet, motor de cálculo de CO₂ (`CarbonCalculatorService`) y CRUD completo de viajes (`HU03`, `HU04`, `HU05`).
- **Odar Alcocer** — Sistema de gamificación, progresión de niveles, acreditación de EcoPuntos y desbloqueo automático de medallas (`HU06`, `HU10`, `HU11`).
- **Paulo Espinoza** — Ranking competitivo ciudadano e interdistrital en Lima, validación heurística y pruebas de controladores (`HU08`).
- **Matías Mariños** — Dashboard analítico, integración con Google Gemini (`HU07`, `HU09`), internacionalización (`es_419`/`en_US`), accesibilidad WCAG 2.1 AA y Landing Page.
- **Diego Avalos** — Catálogo y canje de recompensas (`ECO-XXXXXX`), retos comunitarios y panel administrativo RBAC (`ROLE_ADMIN`) (`HU12`, `HU13`, `HU14`).

---

## 📋 Gestión Ágil del Proyecto y Tableros (Sprints 1, 2, 3 y 4)

- **Product Backlog & Sprint Backlogs 1–4:** [docs/product-backlog.md](docs/product-backlog.md)
- **Tablero del Sprint 1:** [docs/sprint-1-board.md](docs/sprint-1-board.md)
- **Tablero del Sprint 2:** [docs/sprint-2-board.md](docs/sprint-2-board.md)
- **Tablero del Sprint 3:** [docs/sprint-3-board.md](docs/sprint-3-board.md)
- **Tablero del Sprint 4:** [docs/sprint-4-board.md](docs/sprint-4-board.md)
- **Guía de Contribución y Gitflow:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🏗️ Arquitectura Implementada (Trabajo Final)

- **Frontend Web Application (`frontend-angular/`):** Angular 18 (Standalone Components) + TypeScript + Angular Material + Leaflet 1.9 + i18n reactivo (`es_419` / `en_US`) + accesibilidad WCAG 2.1 AA (ARIA, `skip-link`, modo claro/oscuro) + cliente HTTP resiliente conectado al backend en producción.
- **Landing Page (`frontend/landing/`):** HTML5 semántico, CSS3 moderno, JavaScript ES6+, mapa interactivo de corredores de Lima, comparador multimodal y calculadora de impacto anual.
- **Backend RESTful API (`backend/`):** Java 21 + Spring Boot 3.3.3 + Spring Security (JWT stateless + RBAC `@PreAuthorize`) + Spring Data JPA / Hibernate + Bean Validation + 34 endpoints documentados en OpenAPI 3.0 / Swagger UI.
- **Base de Datos (`database/`):** PostgreSQL 16 en producción (Render Managed PostgreSQL) y H2 en memoria para la suite de 102 pruebas automatizadas.
- **Servicios Externos:** Ruteo geoespacial con **OSRM** (con fallback geodésico Haversine) e inteligencia artificial generativa con **Google Gemini (`gemini-1.5-flash`)** (con fallback heurístico determinista).

---

## 📁 Estructura del Repositorio

```text
frontend-angular/        Aplicación Web SPA completa en Angular 18 + Angular Material + Leaflet (HU01–HU14)
frontend/landing/        Landing Page pública responsive con i18n (ES/EN), tema claro/oscuro y mapa de Lima
backend/                 API RESTful en Spring Boot 3.3.3 (Java 21) con 34 endpoints y 102 tests automatizados
database/                Esquema DDL y scripts SQL para PostgreSQL
docs/                    Product Backlog priorizado por valor de negocio, tableros de Sprints 1–4 y documentación
assets/                  Recursos gráficos del informe y diagramas de arquitectura
render.yaml              Blueprint de infraestructura como código (Backend Docker + Frontend Static + PostgreSQL)
```

---

## ✅ Verificación y Ejecución Local

### 1. Backend (Spring Boot 3 + 102 Tests Automatizados)

```bash
cd backend
./mvnw.cmd clean test
./mvnw.cmd spring-boot:run
```

- **Endpoints expuestos:** 34 rutas bajo `/api/v1/*` y `/health` (`Auth`, `Routes`, `Trips`, `Dashboard`, `Gamification`, `Leaderboard`, `Rewards`, `Challenges`, `Admin`, `Health`).
- **Swagger UI local:** `http://localhost:8080/swagger-ui.html`

### 2. Frontend Web Application (Angular 18)

```bash
cd frontend-angular
npm install
npm start
# Build de producción:
npx ng build --base-href /eco-commute/app/
```

- **Servidor de desarrollo:** `http://localhost:4200/`

### 3. Credenciales de Demostración (1-Clic en la Web App)

| Rol | Correo | Contraseña | Capacidades |
| --- | --- | --- | --- |
| **Ciudadano (`ROLE_USER`)** | `demo@ecocommute.org` | `Demo123!` | Planificador OSRM+IA, CRUD de viajes propios, Dashboard, EcoPerfil, Ranking y Canje de Recompensas |
| **Administrador (`ROLE_ADMIN`)** | `admin@ecocommute.org` | `Admin123!` | Todas las funciones ciudadanas + Panel Admin (`/admin`) con CRUD de recompensas, retos y gestión de usuarios |
