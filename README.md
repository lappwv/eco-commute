# EcoCommute

EcoCommute es una aplicación web orientada a incentivar la movilidad sostenible en Lima Metropolitana mediante rutas ecoeficientes, cálculo de CO₂ ahorrado, puntos verdes, recompensas, rankings por distrito y recomendaciones personalizadas con IA.

## Equipo

- Rodrigo Condor Silvera - Líder del proyecto
- Diego Avalos - Frontend
- Odar Alcocer - Backend
- Paulo Espinoza - Base de datos
- Jeampiero Ramos - Pruebas
- Matías Mariños - Documentación

## Alcance del Trabajo Parcial

- Landing page responsive lista para publicación.
- Propuesta de valor, problema, segmentos, Lean UX y Product Backlog.
- Sprint Backlog con tareas de ingeniería de 4 a 8 horas.
- Diseño de interfaz y artefactos de Figma.
- Modelo de base de datos PostgreSQL para el alcance inicial.
- Landing page pública con CTA, mockups, contacto y redes sociales referenciales.
- Tablero público del Sprint 1 para seguimiento del avance.
- Primera base de API REST con autenticación, viajes, CO2, puntos, dashboard y ranking.

## Estructura

```text
frontend/landing/      Landing page del proyecto
backend/               API REST Spring Boot
database/              Script PostgreSQL del modelo de datos
capitulo3_figma_exports/ Imágenes usadas en el informe
assets/                Recursos visuales auxiliares
docs/                  Evidencias y tablero de seguimiento del Sprint
```

## Tecnologías Propuestas

- Frontend: Angular + TypeScript + Material Design
- Backend: Spring Boot + Java + Spring Security + JWT
- Base de datos: PostgreSQL
- Integraciones: Google Maps API y OpenAI API
- Despliegue esperado: frontend público y backend en entorno cloud

## Flujo principal del alcance inicial

1. El usuario se registra e inicia sesión.
2. Consulta o registra un viaje sostenible.
3. El sistema calcula CO₂ ahorrado y puntos verdes.
4. El usuario revisa su dashboard, historial y ranking.
5. El usuario canjea puntos por recompensas.
6. La IA sugiere mejores hábitos de movilidad.

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

Cosas a tener en cuenta del plan free:

- Tras ~15 min sin tráfico la instancia duerme y el primer request tarda ~30-60 s (cold start).
- El Postgres free expira a los 90 días (para la demo del TP no afecta).
- Cada push a `main` redeploya automáticamente.

Verificación post-deploy: `https://<tu-url>/health` debe responder `{"status":"UP",...}` y
`POST https://<tu-url>/api/v1/auth/login` con las credenciales demo.

## Documento del Proyecto

Google Docs del informe:
https://docs.google.com/document/d/1rS2YmaUWzP3o-Y5hm9gAD7u6cKaOvi2Oyo4YMZHumaI

Figma:
https://www.figma.com/design/qUCg9tJfKBqd5KAsD9DALq/Untitled

Landing pública:
https://lappwv.github.io/eco-commute/

Tablero Sprint 1:
https://github.com/lappwv/eco-commute/blob/main/docs/sprint-1-board.md
