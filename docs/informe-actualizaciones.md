# Historial de actualizaciones del informe

Registro de las correcciones que **ya fueron aplicadas** al informe del TP.

- Fuente oficial vigente en el repositorio:
  [docs/Universidad Peruana de Ciencias Aplicadas.md](Universidad%20Peruana%20de%20Ciencias%20Aplicadas.md)
  (conversión del documento `Universidad Peruana de Ciencias Aplicadas.docx`, versión 1.5 del 02/10/2026).
- Este archivo reemplaza la lista anterior de "bloques para copiar y pegar": ya no
  queda ninguna corrección pendiente de ese tipo.

## Cambios aplicados

| # | Sección | Cambio aplicado | Estado |
| --- | --- | --- | --- |
| 1 | 4.1 Software Deployment Configuration | Descripción del despliegue en **Render** con Blueprint `render.yaml`, servicio `ecocommute-backend`, base `ecocommute-db` (PostgreSQL), variables `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `PORT` y `GET /health`. | Aplicado (informe v1.3) |
| 2 | 4.2.1.3 Execution Evidence for Sprint Review | Evidencia con las dos URL públicas: landing en GitHub Pages y API en Render (`/health`). | Aplicado (informe v1.4) |
| 3 | 4.2.1.5 Software Deployment Evidence for Sprint Review | Evidencia de Render (Blueprint `render.yaml`, Docker + PostgreSQL) y GitHub Pages, con redeploy automático en cada push a `main`. | Aplicado (informe v1.4) |
| 4 | 4.2.1.6 Team Collaboration Insights during Sprint | Redacción corregida: estructura base preparada por Rodrigo Condor y features `feature/auth`, `feature/trips`, `feature/stats-badges`, `feature/challenges-leaderboard`, `feature/rewards`, `feature/dashboard-ia`. | Aplicado (informe v1.4) |
| 5 | 3.4.1 Database Diagram | Párrafo del modelo con las nueve tablas (`users`, `trips`, `user_stats`, `badges`, `user_badges`, `rewards`, `redemptions`, `challenges`, `emission_factors`) y relaciones; producción en PostgreSQL administrado en Render. | Aplicado (informe v1.4) |
| 6 | Contenido general | Eliminadas todas las menciones a `paulollito29-sketch/green-commute`, `deploy-gcp.sh`, Cloud Run, Cloud SQL y la URL `https://ecocommute-web-410146064965.us-central1.run.app/`. | Aplicado (informe v1.4) |
| 7 | Figura 7 | Diagrama de base de datos regenerado con las 9 tablas (`assets/capitulo-3/erd.png`). | Aplicado (informe v1.3) |
| 8 | Alcance técnico | Angular + TypeScript + Angular Material declarados como **arquitectura objetivo**; el TP implementa landing responsive + backend. | Aplicado (informe v1.5) |
| 9 | Registro de versiones | Tabla actualizada hasta la versión 1.5 (02/10/2026). | Aplicado |
| 10 | Sprint Backlog | Tareas T01–T12 con redacción "refinar / completar / mejorar / validar" y responsables por feature. | Aplicado (informe v1.4) |

## Verificaciones posteriores

- Ninguna de las referencias obsoletas aparece presentada como estado vigente en
  la documentación del repositorio; solo se citan en esta tabla como antecedente
  de lo ya eliminado del informe.
- `GET /health` sigue siendo el chequeo de salud usado por Render (`render.yaml`).
