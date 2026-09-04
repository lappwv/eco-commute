# Backend EcoCommute

Backend propuesto para implementar con Spring Boot, Java, Spring Security, JWT y SQL Server.

## Módulos previstos

- Autenticación y registro de usuarios.
- Gestión de usuarios y perfiles.
- Registro de viajes sostenibles.
- Cálculo de CO2 ahorrado y puntos verdes.
- Transacciones de puntos.
- Catálogo de recompensas y canjes.
- Rankings por distrito.
- Recomendaciones personalizadas con IA.

## Endpoints mínimos del MVP

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me
POST   /api/trips
GET    /api/trips/me
GET    /api/dashboard/me
GET    /api/rewards
POST   /api/redemptions
GET    /api/rankings/districts
POST   /api/recommendations
```

## Seguridad

- Contraseñas encriptadas con BCrypt.
- Autenticación mediante JWT.
- Rutas privadas protegidas con Spring Security.
- CORS configurado para el frontend.
- Validaciones de entrada en DTO.
