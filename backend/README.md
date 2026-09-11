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

Variables recomendadas:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/eco_commute
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
SEED_DEMO_DATA=true
```

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
GET    /api/v1/dashboard/summary
GET    /api/v1/dashboard/community-impact
GET    /api/v1/leaderboard
GET    /api/v1/admin/dashboard/kpis
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{userId}/toggle-status
GET    /api/v1/admin/trips/suspicious
GET    /api/v1/admin/settings/emission-factors
PUT    /api/v1/admin/settings/emission-factors/{id}
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

Si esas variables no están configuradas, el backend mantiene el flujo principal con autenticación local, viajes, CO2, puntos, dashboard y ranking.
