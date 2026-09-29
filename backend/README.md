# Backend EcoCommute

API REST inicial de EcoCommute desarrollada con Spring Boot, Java 21, Spring Security, JWT, JPA y PostgreSQL. Esta base permite demostrar el núcleo funcional del proyecto: autenticación, registro de viajes sostenibles, cálculo de CO2 ahorrado, puntos verdes, dashboard y rankings.

## Requisitos

- Java 21
- Maven 3.9 o superior
- PostgreSQL 15 o superior

## Configuración local

Crear la base de datos y aplicar el esquema:

```sql
CREATE DATABASE eco_commute;
```

```bash
psql -d eco_commute -f ../database/eco_commute_schema.sql
```

También puedes levantar PostgreSQL con Docker:

```bash
docker compose up -d
```

El backend no genera el esquema: arranca con `spring.jpa.hibernate.ddl-auto=validate`
y falla al iniciar si `database/eco_commute_schema.sql` no coincide con las entidades.
Para regenerarlo desde las entidades (solo como ultima alternativa):
`SPRING_JPA_DDL_AUTO=update`.

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

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/google
GET    /api/v1/users/me
GET    /api/v1/users/profile/{userId}
POST   /api/v1/routes/plan
POST   /api/v1/routes/eco-route
POST   /api/v1/routes/recalculate
POST   /api/v1/trips
GET    /api/v1/trips/history
GET    /api/v1/trips/{tripId}                          (admin)
PUT    /api/v1/trips/{tripId}                          (admin)
DELETE /api/v1/trips/{tripId}                          (admin)
GET    /api/v1/dashboard/summary
GET    /api/v1/dashboard/community-impact
GET    /api/v1/leaderboard
GET    /api/v1/leaderboard?district={district}
GET    /api/v1/leaderboard/districts
GET    /api/v1/rewards
POST   /api/v1/rewards/{rewardId}/redeem
GET    /api/v1/redemptions
GET    /api/v1/challenges
GET    /api/v1/admin/dashboard/kpis
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{userId}/toggle-status
PUT    /api/v1/admin/users/{userId}
DELETE /api/v1/admin/users/{userId}
GET    /api/v1/admin/trips/suspicious
GET    /api/v1/admin/settings/emission-factors
POST   /api/v1/admin/settings/emission-factors
PUT    /api/v1/admin/settings/emission-factors/{id}
DELETE /api/v1/admin/settings/emission-factors/{id}
GET    /api/v1/admin/badges
POST   /api/v1/admin/badges
PUT    /api/v1/admin/badges/{id}
DELETE /api/v1/admin/badges/{id}
GET    /api/v1/admin/rewards
POST   /api/v1/admin/rewards
PUT    /api/v1/admin/rewards/{id}
DELETE /api/v1/admin/rewards/{id}
GET    /api/v1/admin/challenges
POST   /api/v1/admin/challenges
PUT    /api/v1/admin/challenges/{id}
DELETE /api/v1/admin/challenges/{id}
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
