# Cómo trabajamos en este repositorio (EcoCommute — Trabajo Final)

El trabajo de ingeniería del equipo se organiza **por features** bajo flujo Gitflow: toda funcionalidad ingresa a `main` a través de ramas `feature/*`, `fix/*` o `docs/*` con revisión de Pull Requests y verificación de pruebas automatizadas.

El desarrollo partió de una estructura base y arquitectura general preparada por Rodrigo Condor (organización del backend Spring Boot 3, seguridad JWT, base SPA en Angular 18 e infraestructura de despliegue); a partir de esa base, cada integrante desarrolló e integró sus módulos extremo a extremo (Frontend Angular + Backend Spring Boot + Pruebas).

Arquitectura implementada del producto (**Trabajo Final**):
- **Frontend Web Application (`frontend-angular/`):** Angular 18 + TypeScript + Angular Material + Leaflet 1.9 + i18n (`es_419`/`en_US`) + accesibilidad WCAG 2.1 AA.
- **Landing Page (`frontend/landing/`):** HTML5 semántico, CSS3 moderno, JavaScript ES6+ y mapa interactivo de corredores de Lima.
- **Backend RESTful API (`backend/`):** Java 21 + Spring Boot 3.3.3 + Spring Security (JWT + RBAC) + Spring Data JPA + PostgreSQL 16 + OSRM + Google Gemini (`gemini-1.5-flash`) + 34 endpoints OpenAPI 3.0.

## 1. Configuración inicial (una sola vez)

```powershell
git config user.name  "Tu Nombre"
git config user.email "tu@correo.upc.pe"
```

## 2. Reparto de features (Sprints 1–4)

| Feature (rama) | Alcance (Backend + Frontend Angular) | Integrante |
|---|---|---|
| `feature/auth` | Registro, login, JWT, interceptores/guardias Angular, perfil de usuario, OpenAPI y despliegue | Rodrigo Condor |
| `feature/trips` | Planificador OSRM + Leaflet (`/routes`), CRUD completo de viajes (`/trips`), cálculo CO₂ (`HU03`, `HU04`, `HU05`) | Jeampiero Ramos |
| `feature/stats-badges` | EcoPuntos, niveles, galería de medallas y EcoPerfil (`/gamification`) (`HU06`, `HU10`, `HU11`) | Odar Alcocer |
| `feature/challenges-leaderboard` | Ranking ciudadano e interdistrital (`/leaderboard`) (`HU08`), validación heurística y entrevistas | Paulo Espinoza |
| `feature/rewards` | Catálogo y canje de recompensas (`/rewards`), retos y panel administrativo RBAC (`/admin`) (`HU12`, `HU13`, `HU14`) | Diego Avalos |
| `feature/dashboard-ia` | Dashboard analítico (`/dashboard`), asistente IA Gemini (`HU07`, `HU09`), i18n, a11y y Landing Page | Matías Mariños |

Cada feature es una **rebanada vertical**: entidad + repositorio + servicio + controller + componente Angular + pruebas.

## 3. Flujo de trabajo y verificación antes de cada PR

```powershell
# 1. Verificar suite de 102 pruebas automatizadas en el backend:
cd backend
.\mvnw.cmd -q clean test

# 2. Verificar compilación de producción en Angular 18:
cd ../frontend-angular
npx ng build --base-href /eco-commute/app/
```

## 4. Requisitos de calidad del repositorio (Rúbrica TF)

- Historial con commits de todos los integrantes del equipo.
- Rama `main` siempre estable (`102 tests` de backend en verde + build de producción de `frontend-angular` sin errores).
- Modelo de datos (`database/eco_commute_schema.sql`) y diagramas C4 / UML / ERD (`assets/capitulo-3/`) sincronizados con el código.
