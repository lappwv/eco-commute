# Cómo trabajamos en este repositorio

El profesor pidió que el trabajo se organice **por features** y que cada integrante
haga su parte. Esto es el flujo obligatorio: nada entra a `main` sin pasar por una
rama `feature/*` y un Pull Request revisado por otro integrante.

El desarrollo partió de una estructura base y arquitectura general preparada por
Rodrigo Condor (organización del backend, configuración común, entidades base y
flujo de integración); a partir de esa base, cada integrante trabajó su feature.

Arquitectura objetivo del producto: **Angular + TypeScript + Angular Material** en el
frontend principal (iteraciones posteriores). El alcance del Trabajo Parcial incluye
landing page responsive, backend API REST, base de datos, seguridad, despliegue y
documentación/evidencias.

## 1. Configuración inicial (una sola vez)

```powershell
git config user.name  "Tu Nombre"
git config user.email "tu@correo.upc.pe"
```

Sin esto, todos los commits quedan con el mismo autor y no se ve quién hizo qué.

## 2. Reparto de features (backlog)

| Feature (rama) | Alcance | Integrante |
|---|---|---|
| `feature/auth` | registro, login, JWT, perfil de usuario, distrito | Rodrigo Condor (estructura base e integración) |
| `feature/trips` | registro de viajes, telemetría, cálculo CO₂, `EcoRoute` | Jeampiero Ramos |
| `feature/stats-badges` | `user_stats`, puntos verdes, medallas, niveles, streaks | Odar Alcocer |
| `feature/challenges-leaderboard` | ranking por distrito (HU08) y retos (HU13) | Paulo Espinoza (ranking) y Diego Avalos (retos) |
| `feature/rewards` | catálogo de recompensas, canjes e historial (HU12, HU14) | Diego Avalos |
| `feature/dashboard-ia` | dashboard semanal/comunitario, asistente IA de rutas, evidencias del Sprint | Matías Mariños |

Cada feature es una **rebanada vertical**: entidad + repositorio + servicio +
controller + test. No se reparte por capas ("el back lo hace uno, el front otro").

Cada rama tiene su issue asociado en GitHub para registrar el avance.

## 3. Flujo de trabajo

```powershell
git checkout main
git pull
git checkout -b feature/rewards          # nombre = el de la tabla

# ... código y tests ...

git add backend/src/main/java/com/ecocommute/services/RewardService.java
git commit -m "feat(rewards): catalogo y canje de recompensas"
git push -u origin feature/rewards
```

Luego, en GitHub: **Pull request → base `main`, compare `feature/rewards`** (o con
`gh pr create` si tenés la CLI instalada). Otro integrante revisa y hace el merge.

## 4. Reglas

1. **Prohibido pushear directo a `main`.** Todo pasa por PR.
2. Commits chicos y frecuentes, con convención:
   `feat(modulo)`, `fix(modulo)`, `test(modulo)`, `docs(modulo)`, `refactor(modulo)`.
3. Antes de abrir el PR, los tests tienen que quedar verdes:
   ```powershell
   cd backend
   .\mvnw.cmd -q clean test
   ```
4. `git pull --rebase origin main` seguido para no acumular conflictos.
5. Dos features no tocan a la vez los mismos archivos compartidos
   (`application.yml`, `WebSecurityConfig`, `SecurityUtils`): se avisa en el grupo.
6. Cada integrante revisa al menos un PR de otro: así queda la comunicación
   registrada en el historial.
7. Los cambios en el informe (assets/capitulo-*) se suben en su propio commit
   `docs(...)`, separado del código.

## 5. Requisitos del repo (rúbrica)

- Historial con commits de **todos** los integrantes.
- `main` siempre verde (compila + 23 tests).
- Modelo de datos (`database/eco_commute_schema.sql`) y ERD
  (`assets/capitulo-3/erd.png`) sincronizados con el código.
