# Correcciones para el informe (Google Doc)

Bloques listos para **copiar y pegar** sobre el documento
https://docs.google.com/document/d/1rS2YmaUWzP3o-Y5hm9gAD7u6cKaOvi2Oyo4YMZHumaI

Los textos describen lo que realmente hace este repositorio (`lappwv/eco-commute`).
Los que estaban (Cloud Run, `paulollito29-sketch/green-commute`, "no existe landing")
pertenecían a otro proyecto y restan puntos por inconsistencia.

---

## 1. Reemplazar la sección 4.1 Software Deployment Configuration

> El backend de EcoCommute está desplegado en la nube con **Render** (plan gratuito, sin costo), en el repositorio oficial https://github.com/lappwv/eco-commute. El despliegue se configura mediante el Blueprint `render.yaml` de la raíz del repositorio, que crea automáticamente el servicio web `ecocommute-backend` (contenedor Docker construido desde `backend/Dockerfile`, Java 21 + Spring Boot 3.3.3) y una base de datos PostgreSQL administrada `ecocommute-db`.
>
> La configuración inyecta las variables de entorno `JWT_SECRET` (generada por Render), `DB_HOST`, `DB_PORT`, `DB_NAME`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` y `PORT`; la aplicación crea o actualiza el esquema al arrancar (`spring.jpa.hibernate.ddl-auto=update`), por lo que no requiere ejecutar scripts SQL manualmente. El servicio expone `GET /health` como chequeo de salud para Render.
>
> URL pública del backend: **`https://ecocommute-backend-a14m.onrender.com`** (Blueprint activado; `GET /health` responde `{"status":"UP"}`). La landing page permanece publicada de forma independiente en GitHub Pages: https://lappwv.github.io/eco-commute/
>
> Repositorio principal: https://github.com/lappwv/eco-commute. Configuración de desarrollo: Git y GitHub para el control de versiones, con flujo por features (ramas `feature/*` y Pull Requests según `CONTRIBUTING.md`); Java 21, Spring Boot 3.3.3, Spring Security, Spring Data JPA, JWT y Maven en el backend; HTML5, Tailwind CSS, Leaflet y Chart.js en la aplicación estática; PostgreSQL (Render) en producción; Docker y Render para el despliegue. La API integra OSRM para el cálculo de rutas y Gemini cuando se configura la clave correspondiente.

## 2. Reemplazar 4.2.1.3 Execution Evidence for Sprint Review

> La aplicación puede revisarse en vivo en dos URL públicas: la landing page en GitHub Pages (https://lappwv.github.io/eco-commute/) y la API del backend en Render (`https://ecocommute-backend-a14m.onrender.com`, chequeo de salud en `/health`). Esta evidencia permite validar en vivo el flujo completo: registro e inicio de sesión con JWT, planificación de rutas con comparación de CO₂ frente al auto, recomendación con IA, registro de viajes, dashboard de impacto, ranking por distrito, medallas, recompensas y retos.

## 3. Reemplazar 4.2.1.5 Software Deployment Evidence for Sprint Review

> La evidencia de despliegue corresponde al backend publicado en Render mediante el Blueprint `render.yaml` (Docker + PostgreSQL administrado) y a la landing page publicada en GitHub Pages. Cada push a la rama `main` dispara un redeploy automático del servicio, y el historial de deploys queda registrado en el panel de Render. Adjuntar captura del panel de Render con el servicio en estado *Live* y de `GET /health` respondiendo `{"status":"UP"}`.

## 4. Corregir 4.2.1.6 Team Collaboration Insights during Sprint

> El equipo distribuyó responsabilidades por especialidad: rutas y backend, inteligencia artificial, dashboard, ranking, recompensas y documentación. El repositorio está organizado por features (ramas `feature/auth`, `feature/trips`, `feature/stats-badges`, `feature/challenges-leaderboard`, `feature/rewards`, `feature/dashboard-ia`) con Pull Requests revisados entre integrantes, tal como se define en `CONTRIBUTING.md`. Cada integrante debe registrar sus propios commits para que la pestaña Insights > Contributors de GitHub evidencie la participación individual.

## 5. Corregir el párrafo final de 3.4.1 Database Diagram (después de la Figura 7)

> El modelo implementado está compuesto por nueve tablas: `users`, `trips`, `user_stats`, `badges`, `user_badges`, `rewards`, `redemptions`, `challenges` y `emission_factors`. La tabla `users` se relaciona de 1 a N con `trips`, de 1 a 1 con `user_stats` y de 1 a N con `user_badges`, que a su vez se relaciona de N a 1 con `badges`; `redemptions` se relaciona de N a 1 con `users` y con `rewards`. `emission_factors` y `challenges` funcionan como catálogos sin clave foránea: `trips.transport_mode` referencia de forma lógica a `emission_factors.transport_mode` para calcular el CO₂ por kilómetro. El entorno de desarrollo y las pruebas usan H2 en memoria y producción usa **PostgreSQL administrado en Render**, con backend en Spring Boot, autenticación JWT, control de acceso con Spring Security, cifrado de contraseñas con BCrypt y autenticación alternativa con Google OAuth2.
>
> *Nota: reemplazar la imagen de la Figura 7 por `assets/capitulo-3/erd.png` de este repositorio (diagrama regenerado con las 9 tablas).*

## 6. Acciones manuales que quedan en el Doc

1. Borrar toda mención a `paulollito29-sketch/green-commute`, `deploy-gcp.sh`, Cloud Run, Cloud SQL y la URL `https://ecocommute-web-410146064965.us-central1.run.app/`.
2. Reemplazar la Figura 7 con `assets/capitulo-3/erd.png` (o `capitulo3_figma_exports/07-database-diagram.png`).
3. Completar la URL de Render una vez activado el Blueprint.
4. Actualizar la tabla de registro de versiones (v1.3) con estos cambios.
