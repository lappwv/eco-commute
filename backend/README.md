# Backend EcoCommute

API REST inicial de EcoCommute desarrollada con Spring Boot, Java 21, Spring Security, JWT, JPA y PostgreSQL. Esta base permite demostrar el núcleo funcional del proyecto: autenticación, registro de viajes sostenibles, cálculo de CO2 ahorrado, puntos verdes, dashboard y rankings.

## Requisitos

- Java 21
- Maven 3.9 o superior
- PostgreSQL 15 o superior

## Configuración local

Crear la base de datos:

```sql
CREATE DATABASE eco_commute;
```

También puedes levantar PostgreSQL con Docker:

```bash
docker compose up -d
```

El esquema lo crea el propio backend al arrancar
(`spring.jpa.hibernate.ddl-auto=update`): no hay que ejecutar SQL a mano.
`../database/eco_commute_schema.sql` queda solo como referencia documental del
modelo (punto de partida del ERD). Para forzar la validacion del esquema en
lugar de modificarlo: `SPRING_JPA_DDL_AUTO=validate`.

Variables recomendadas:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/eco_commute
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
# Obligatorio: minimo 32 bytes, sin valor por defecto.
# Generar con: openssl rand -hex 32
JWT_SECRET=<tu-secreto-de-al-menos-32-bytes>
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
SEED_DEMO_DATA=true
```

`JWT_SECRET` es obligatorio para cualquier perfil distinto de `local` y `test`
(ambos traen su propio valor de desarrollo). La API no arranca sin el.

Ejecutar:

```bash
./mvnw spring-boot:run
```

La API queda disponible en `http://localhost:8080`.

Si PostgreSQL local no esta configurado todavia, se puede levantar la API con H2 en memoria para revisar Swagger y tomar evidencias:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

Documentacion interactiva:

```text
http://localhost:8080/swagger-ui/index.html
```

Ejecutar pruebas:

```bash
./mvnw test
```

## Endpoints principales

La API se mantiene deliberadamente acotada al alcance del TP: autenticación, rutas,
viajes, CO₂, gamificación, dashboard, ranking, rewards, challenges, CRUD
administrativo esencial y seguridad. Se redujo de 46 a 25 rutas expuestas
(24 bajo `/api/v1` y `GET /health`) para eliminar endpoints auxiliares y
sobre-ingeniería, sin cambiar el Product Backlog ni las HU01-HU14.

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/users/me
POST   /api/v1/routes/plan
POST   /api/v1/trips
GET    /api/v1/trips/history
GET    /api/v1/trips/{tripId}                          (admin)
PUT    /api/v1/trips/{tripId}                          (admin)
DELETE /api/v1/trips/{tripId}                          (admin)
GET    /api/v1/dashboard/summary
GET    /api/v1/dashboard/community-impact
GET    /api/v1/leaderboard
GET    /api/v1/leaderboard?district={district}
GET    /api/v1/rewards
POST   /api/v1/rewards/{rewardId}/redeem
GET    /api/v1/redemptions
GET    /api/v1/challenges
GET    /api/v1/admin/rewards
POST   /api/v1/admin/rewards
PUT    /api/v1/admin/rewards/{id}
DELETE /api/v1/admin/rewards/{id}
GET    /api/v1/admin/challenges
POST   /api/v1/admin/challenges
PUT    /api/v1/admin/challenges/{id}
DELETE /api/v1/admin/challenges/{id}
GET    /health
```

## Seguridad

- Contraseñas encriptadas con BCrypt.
- Autenticación mediante JWT.
- Rutas privadas protegidas con Spring Security.
- Rol administrador para endpoints `/api/v1/admin/**`.
- CORS habilitado para integración con el frontend.
- Validación de entradas con DTOs y Bean Validation.
- Respuestas de error uniformes mediante un manejador global.

## Datos demo

`SEED_DEMO_DATA=true` crea usuarios, factores de emisión, logros y viajes de ejemplo para la exposición. En producción o evaluación técnica estricta puede usarse `SEED_DEMO_DATA=false`.

## Integraciones opcionales

- `GOOGLE_CLIENT_ID`: habilita autenticación con Google si se configura el cliente real.
- `OPENAI_API_KEY`: habilita sugerencias de rutas con IA si se configura la clave.
- `GEMINI_API_KEY`: habilita sugerencias de rutas con Google Gemini. Si ambas claves estan configuradas, Gemini tiene prioridad y OpenAI queda como alternativa de respaldo.
- `GEMINI_MODEL`: permite cambiar el modelo de Gemini; el valor por defecto es `gemini-2.0-flash`.

Si esas variables no están configuradas, el backend mantiene el flujo principal con autenticación local, viajes, CO2, puntos, dashboard y ranking.
