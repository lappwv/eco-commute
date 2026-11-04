# Product Backlog & Sprint Backlogs — EcoCommute (Trabajo Final)

Espejo del Capítulo II del informe oficial del Trabajo Final
([docs/Universidad Peruana de Ciencias Aplicadas.md](Universidad%20Peruana%20de%20Ciencias%20Aplicadas.md)).

> **Criterio de Priorización por Valor de Negocio:** De acuerdo con las directrices de ingeniería de software y la rúbrica oficial del curso (`1ASI0705 Arquitectura de Aplicaciones Web`), el Product Backlog se ordena estrictamente por el **valor de negocio entregado al ciudadano y a la sostenibilidad urbana** (planificación de rutas sostenibles, registro y corrección de viajes, cuantificación de CO₂ evitado, recomendaciones inteligentes con IA y visualización en dashboard), ubicando las historias habilitadoras de administración, registro e inicio de sesión en posiciones posteriores.

## 2.1 Product Backlog

| Orden | User Story ID | Título | Descripción | Criterios de aceptación (Gherkin) | Story Points | Epic | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | HU03 | Consulta de rutas sostenibles | Como usuario, deseo consultar rutas sostenibles entre un origen y destino para elegir una alternativa de movilidad con menor impacto ambiental. | **Scenario 1: Consulta exitosa con OSRM**<br>Given que el usuario ingresa coordenadas o corredores de origen y destino en Lima y selecciona un perfil (`BICYCLE`, `WALKING`, `CAR`),<br>When solicita planificar la ruta (`POST /api/v1/routes/plan`),<br>Then el sistema consulta OSRM y muestra las alternativas (línea base vehicular, ruta estándar y corredor verde IA) con distancia en km, duración en minutos, calorías y trazado geoespacial en Leaflet.<br>**Scenario 2: Resiliencia ante contingencia de red**<br>Given que el proveedor externo OSRM presenta latencia o indisponibilidad,<br>When se procesa la solicitud,<br>Then el sistema aplica el cálculo geodésico Haversine con factor vial urbano (`1.32`) sin interrumpir la experiencia del usuario. | 8 | Movilidad sostenible | Done |
| 2 | HU04 | Registro y gestión de viaje sostenible | Como usuario, deseo registrar un viaje realizado y poder corregir o eliminar un registro erróneo para que EcoCommute mantenga mi impacto ambiental y progreso precisos. | **Scenario 1: Registro exitoso de viaje**<br>Given que el usuario selecciona medio de transporte sostenible, origen, destino y distancia válida (`> 0 km`),<br>When envía el registro (`POST /api/v1/trips`),<br>Then el sistema persiste el viaje asociado a su perfil, calcula CO₂ ahorrado y acredita EcoPuntos.<br>**Scenario 2: Corrección o eliminación por el propietario**<br>Given que el usuario detecta un error en la distancia o modalidad de un viaje propio,<br>When actualiza (`PUT /api/v1/trips/{id}`) o elimina (`DELETE /api/v1/trips/{id}`) el registro,<br>Then el sistema recalcula o revierte proporcionalmente el CO₂ ahorrado y los puntos verdes del perfil. | 5 | Viajes | Done |
| 3 | HU05 | Cálculo de CO₂ ahorrado | Como usuario, deseo conocer el CO₂ estimado que ahorro en cada viaje sostenible para comprender mi aporte ambiental frente al automóvil convencional. | **Scenario 1: Comparativa contra línea base vehicular**<br>Given que existe un viaje planificado o registrado con distancia $d$ y modalidad $m$,<br>When el motor ambiental (`CarbonCalculatorService`) procesa el trayecto,<br>Then calcula la línea base de automóvil a gasolina ($170\text{ g CO}_2/\text{km}$), resta la emisión del modo elegido ($0\text{ g/km}$ en bicicleta/caminata, $65\text{ g/km}$ en bus, $28\text{ g/km}$ en tren eléctrico) y presenta el ahorro neto en gramos y kilogramos. | 5 | Impacto ambiental | Done |
| 4 | HU09 | Recomendaciones con IA | Como usuario, deseo recibir una recomendación explicada sobre la ruta sostenible más conveniente para mi viaje según el contexto urbano de Lima. | **Scenario 1: Generación de insight contextual con Gemini**<br>Given que el usuario consulta alternativas entre origen y destino con el optimizador IA activo,<br>When el backend invoca `GeminiService`,<br>Then retorna una recomendación explicada que pondera ciclovías segregadas, ahorro de CO₂, calorías y tiempo en hora punta.<br>**Scenario 2: Fallback heurístico determinista**<br>Given que la clave o cuota de Gemini API no está disponible,<br>When se genera la respuesta,<br>Then el motor heurístico contextual construye la recomendación sin degradar el contrato JSON ni la interfaz Angular. | 8 | Inteligencia artificial | Done |
| 5 | HU07 | Dashboard personal | Como usuario, deseo visualizar mis estadísticas de movilidad para evaluar mi progreso ambiental, mis puntos acumulados y mi evolución semanal. | **Scenario 1: Visualización integral de KPIs y gráficos**<br>Given que el usuario autenticado accede a la vista `/dashboard`,<br>When el frontend Angular consume `GET /api/v1/dashboard/stats` y `/ai-insights`,<br>Then visualiza tarjetas KPI (CO₂ total evitado, distancia acumulada, viajes sostenibles, EcoPuntos y nivel), gráfico de barras de evolución diaria, desglose por modalidad y tarjetas de análisis inteligente. | 8 | Reportes | Done |
| 6 | HU06 | Acumulación de puntos verdes | Como usuario, deseo recibir puntos por mis viajes sostenibles para mantener la motivación y avanzar de nivel en mi EcoPerfil. | **Scenario 1: Acreditación automática y progresión de nivel**<br>Given que se registra un viaje sostenible con ahorro de CO₂ positivo,<br>When se calcula la recompensa (`1 EcoPunto` por cada `10 g` de CO₂ evitado, mínimo `10 pts` en modos cero emisiones y bono de `+15 pts` en viaje inaugural),<br>Then el sistema incrementa el saldo del usuario y actualiza su nivel (`Eco Starter`, `Urban Cyclist`, `Green Hero`, `Lima Legend`). | 3 | Gamificación | Done |
| 7 | HU08 | Ranking por distrito | Como usuario, deseo comparar mi impacto con otros usuarios de mi distrito y de Lima para participar en una competencia sana por movilidad sostenible. | **Scenario 1: Leaderboard global y filtrado por distrito**<br>Given que existen usuarios con viajes sostenibles en distritos de Lima,<br>When el usuario consulta `/leaderboard` (`GET /api/v1/leaderboard/users` y `/districts`),<br>Then el sistema muestra la tabla de posiciones individual (filtrable por distrito como Miraflores, San Isidro, Surco, San Borja, Barranco) y el ranking agregado interdistrital por CO₂ evitado. | 5 | Eco Identidad Urbana | Done |
| 8 | HU10 | Desbloqueo automático de medallas | Como usuario, deseo desbloquear medallas automáticamente al alcanzar hitos de movilidad sostenible para sentir reconocimiento tangible por mis hábitos. | **Scenario 1: Evaluación de reglas al registrar viaje**<br>Given que el usuario registra un viaje que alcanza un umbral (primer viaje, 3+ viajes en bicicleta, 10 km acumulados, 5 kg de CO₂ evitado, 10 viajes o 500 puntos),<br>When `GamificationService` evalúa los criterios,<br>Then desbloquea automáticamente la medalla correspondiente y registra la fecha de obtención sin duplicados. | 3 | Recompensas | Done |
| 9 | HU11 | Consulta de medallas | Como usuario, deseo revisar mis medallas obtenidas y el catálogo de logros disponibles para llevar control de mi reconocimiento sostenible. | **Scenario 1: Visualización de galería de medallas en EcoPerfil**<br>Given que el usuario accede al módulo `/gamification`,<br>When consulta su perfil de gamificación (`GET /api/v1/gamification/profile`),<br>Then el sistema muestra las medallas desbloqueadas resaltadas junto con las medallas por alcanzar y sus requisitos. | 5 | Recompensas | Done |
| 10 | HU14 | Catálogo y canje de recompensas | Como usuario, deseo canjear mis EcoPuntos por beneficios en comercios aliados y revisar mi historial de canjes con códigos de validación. | **Scenario 1: Canje exitoso con saldo suficiente**<br>Given que el usuario cuenta con EcoPuntos suficientes y existe stock en la recompensa seleccionada,<br>When ejecuta el canje (`POST /api/v1/rewards/redeem`),<br>Then el sistema descuenta los puntos, reduce el stock, genera un código alfanumérico (`ECO-XXXXXX`) y lo lista en `GET /api/v1/rewards/redemptions`.<br>**Scenario 2: Bloqueo por puntos insuficientes**<br>Given que el saldo de EcoPuntos es menor al costo del beneficio,<br>Then la aplicación deshabilita el botón de canje e informa la diferencia requerida. | 3 | Recompensas | Done |
| 11 | HU13 | Gestión y participación en retos sostenibles | Como administrador o ciudadano, deseo gestionar retos comunitarios y consultar el avance hacia metas semanales o mensuales de movilidad sostenible. | **Scenario 1: Creación y gestión de reto por administrador**<br>Given que un usuario con `ROLE_ADMIN` accede a `/admin`,<br>When crea, edita o desactiva un reto (`POST/PUT/DELETE /api/v1/challenges/{id}`),<br>Then el reto queda actualizado en el catálogo comunitario.<br>**Scenario 2: Seguimiento de progreso ciudadano**<br>Given que el ciudadano consulta `/gamification`,<br>When visualiza los retos activos (`GET /api/v1/challenges`),<br>Then observa su porcentaje de avance individual frente a la meta en kg de CO₂ y la recompensa en puntos. | 5 | Retos | Done |
| 12 | HU12 | Gestión administrativa de recompensas | Como administrador, deseo crear, actualizar y desactivar recompensas para mantener vigente el catálogo de beneficios de EcoCommute. | **Scenario 1: CRUD protegido por rol (`ROLE_ADMIN`)**<br>Given que el administrador está autenticado con token JWT y rol `ROLE_ADMIN`,<br>When registra, actualiza o elimina una recompensa (`POST/PUT/DELETE /api/v1/rewards/{id}`),<br>Then el sistema persiste los cambios en PostgreSQL.<br>**Scenario 2: Denegación a rol estándar**<br>Given que un usuario con `ROLE_USER` intenta invocar endpoints de mutación administrativa,<br>Then Spring Security retorna `403 Forbidden`. | 5 | Administración | Done |
| 13 | HU01 | Registro de usuario | Como ciudadano de Lima, deseo crear una cuenta en EcoCommute indicando mi distrito para acceder a mi EcoPerfil y registrar mis viajes sostenibles. | **Scenario 1: Registro válido con contraseña encriptada**<br>Given que el ciudadano completa nombre, correo único, contraseña (`>= 6` caracteres), distrito de Lima y acepta los Términos y Condiciones,<br>When envía el formulario (`POST /api/v1/auth/register`),<br>Then el sistema almacena el hash BCrypt, le asigna un bono de bienvenida de 50 EcoPuntos y devuelve su sesión JWT.<br>**Scenario 2: Prevención de correo duplicado**<br>Given que el correo ya está registrado,<br>Then el backend retorna `400 Bad Request` con mensaje claro. | 5 | Gestión de usuarios | Done |
| 14 | HU02 | Inicio de sesión seguro | Como usuario registrado, deseo iniciar sesión con mis credenciales para acceder de forma segura a las funcionalidades personalizadas de la plataforma. | **Scenario 1: Autenticación JWT exitosa**<br>Given que el usuario ingresa credenciales válidas en `/login`,<br>When solicita iniciar sesión (`POST /api/v1/auth/login`),<br>Then el sistema valida el hash BCrypt y emite un token JWT firmado (HS256) que el `authInterceptor` de Angular adjunta automáticamente a las peticiones protegidas.<br>**Scenario 2: Rechazo de credenciales inválidas**<br>Given credenciales incorrectas,<br>Then el sistema responde `401 Unauthorized` sin exponer detalles internos. | 5 | Seguridad | Done |

---

## 2.1.1 Sprint Backlogs (Sprints 1, 2, 3 y 4)

### 2.1.1.1 Sprint Backlog 1 (Fundamentos Backend, Rutas OSRM, Cálculo CO₂ y Landing Page)

| Id | Title | User Story | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- | --- |
| T01 | Refinar DTOs y validaciones de registro de usuario con BCrypt | HU01 | 4h | Rodrigo Condor | Done |
| T02 | Completar endpoints `POST /api/v1/auth/register` y `/login` con pruebas unitarias | HU01, HU02 | 6h | Rodrigo Condor | Done |
| T03 | Configurar Spring Security stateless, filtro JWT y control de acceso por roles | HU02 | 8h | Rodrigo Condor | Done |
| T04 | Integrar cliente de ruteo OSRM y cálculo geodésico Haversine de respaldo | HU03 | 8h | Jeampiero Ramos | Done |
| T05 | Implementar entidades JPA y repositorios para usuarios, viajes y modalidades | HU04 | 6h | Jeampiero Ramos | Done |
| T06 | Implementar `CarbonCalculatorService` para cálculo de CO₂ ahorrado, calorías y puntos | HU05 | 6h | Jeampiero Ramos | Done |
| T07 | Implementar acreditación automática de EcoPuntos y progresión de niveles al registrar viaje | HU06 | 5h | Odar Alcocer | Done |
| T08 | Desarrollar `DashboardService` con KPIs agregados, evolución semanal y reparto modal | HU07 | 8h | Matías Mariños | Done |
| T09 | Implementar `LeaderboardService` y endpoints de ranking individual y por distrito | HU08 | 6h | Paulo Espinoza | Done |
| T10 | Integrar `GeminiService` con prompt contextual para Lima y fallback heurístico | HU09 | 6h | Matías Mariños | Done |
| T11 | Implementar motor de desbloqueo automático y catálogo de medallas sostenibles | HU10, HU11 | 8h | Odar Alcocer | Done |
| T12 | Construir Landing Page responsiva (`es_419`/`en_US`, claro/oscuro, mapa Leaflet de Lima) | HU03, HU05 | 6h | Matías Mariños | Done |

Tablero detallado en [docs/sprint-1-board.md](sprint-1-board.md).

### 2.1.1.2 Sprint Backlog 2 (Consolidación Backend, Recompensas, Retos, Pruebas y Despliegue Render)

| Id | Title | User Story | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- | --- |
| T13 | Completar controladores REST de recompensas, canjes, retos y administración | HU12, HU13, HU14 | 6h | Diego Avalos | Done |
| T14 | Ajustar flag `useAiOptimization` y validar contrato JSON del planificador de rutas | HU03, HU09 | 5h | Matías Mariños | Done |
| T15 | Diseñar e implementar pruebas automatizadas para rutas OSRM y fallback Haversine | HU03 | 6h | Jeampiero Ramos | Done |
| T16 | Implementar pruebas automatizadas para registro de viajes y cálculo de CO₂ | HU04, HU05 | 6h | Jeampiero Ramos | Done |
| T17 | Validar consistencia transaccional de puntos verdes y desbloqueo de medallas | HU06, HU10, HU11 | 5h | Odar Alcocer | Done |
| T18 | Implementar pruebas de ranking distrital y seguimiento de retos comunitarios | HU08, HU13 | 6h | Paulo Espinoza | Done |
| T19 | Implementar pruebas de catálogo de recompensas, canjes (`ECO-XXXXXX`) y RBAC | HU12, HU14 | 6h | Diego Avalos | Done |
| T20 | Incorporar Términos y Condiciones (`terms.html`) y mejoras de accesibilidad en Landing | HU01 | 5h | Matías Mariños | Done |
| T21 | Configurar Docker multi-stage y Render Blueprint (`render.yaml`) con PostgreSQL | Transversal | 4h | Rodrigo Condor | Done |
| T22 | Documentar contratos OpenAPI 3.0 / Swagger UI y verificar suite de pruebas en verde | Transversal | 5h | Rodrigo Condor | Done |

Tablero detallado en [docs/sprint-2-board.md](sprint-2-board.md).

### 2.1.1.3 Sprint Backlog 3 (Arquitectura Frontend Angular 18, Autenticación JWT, Planificador Leaflet, CRUD de Viajes y Dashboard)

| Id | Title | User Story | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- | --- |
| T23 | Configurar arquitectura SPA en Angular 18 (`app.config.ts`, `app.routes.ts`, Angular Material y tema accesible claro/oscuro) | Transversal | 6h | Matías Mariños | Done |
| T24 | Implementar `I18nService` (`es_419`/`en_US`), `AuthService`, `authInterceptor` JWT y `authGuard`/`adminGuard` | HU01, HU02 | 6h | Rodrigo Condor | Done |
| T25 | Desarrollar componente `AuthComponent` (`/login`) con pestañas de inicio de sesión, registro por distrito, validación y acceso demo 1-clic | HU01, HU02 | 6h | Rodrigo Condor | Done |
| T26 | Desarrollar `RoutesPlannerComponent` (`/routes`) con mapa Leaflet interactivo, trazado de corredores verdes vs. tráfico y tarjetas IA Gemini | HU03, HU09 | 8h | Jeampiero Ramos | Done |
| T27 | Extender `TripController` backend para permitir edición (`PUT`) y eliminación (`DELETE`) al propietario del viaje con validación de pertenencia (`403 Forbidden`) | HU04, HU05 | 6h | Jeampiero Ramos | Done |
| T28 | Desarrollar `TripsComponent` (`/trips`) en Angular con previsualización en vivo de CO₂, calorías y EcoPuntos + tabla CRUD completa | HU04, HU05 | 7h | Odar Alcocer | Done |
| T29 | Desarrollar `DashboardComponent` (`/dashboard`) con tarjetas KPI, gráfico de evolución diaria, reparto por modo e insights IA | HU07 | 7h | Matías Mariños | Done |
| T30 | Ampliar suite de pruebas unitarias y de controladores en backend para edición/eliminación de viajes por propietario | HU04 | 5h | Paulo Espinoza | Done |

Tablero detallado en [docs/sprint-3-board.md](sprint-3-board.md).

### 2.1.1.4 Sprint Backlog 4 (Gamificación, Ranking, Recompensas, Panel Admin RBAC, Pruebas E2E y Despliegue Full-Stack)

| Id | Title | User Story | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- | --- |
| T31 | Desarrollar `GamificationComponent` (`/gamification`) con barra de progreso de nivel, galería de medallas y tarjetas de retos comunitarios | HU06, HU10, HU11, HU13 | 7h | Odar Alcocer | Done |
| T32 | Desarrollar `LeaderboardComponent` (`/leaderboard`) con filtro por distrito de Lima, ranking ciudadano y tabla comparativa interdistrital | HU08 | 6h | Paulo Espinoza | Done |
| T33 | Desarrollar `RewardsComponent` (`/rewards`) con flujo de canje interactivo, validación de saldo y tabla de códigos `ECO-XXXXXX` | HU14 | 6h | Diego Avalos | Done |
| T34 | Desarrollar `AdminComponent` (`/admin`) para gestión CRUD de recompensas, retos y moderación de usuarios protegido por `ROLE_ADMIN` | HU12, HU13 | 7h | Diego Avalos | Done |
| T35 | Desarrollar `TermsComponent` (`/terms`), auditoría de accesibilidad WCAG 2.1 AA (ARIA, `skip-link`, contraste) y resiliencia offline/online en `ApiService` | HU01 | 5h | Matías Mariños | Done |
| T36 | Exponer los 34 endpoints en OpenAPI 3.0 / Swagger UI eliminando anotaciones `@Hidden` residuales y ejecutando 102 pruebas automatizadas en verde | Transversal | 6h | Rodrigo Condor | Done |
| T37 | Compilar bundle de producción de Angular 18, integrar enlaces CTA desde la Landing Page y desplegar en GitHub Pages (`/app/`) y Render | Transversal | 6h | Rodrigo Condor | Done |
| T38 | Conducir entrevistas de validación con usuarios de los Segmentos 1 y 2, evaluación heurística y consolidación del Informe de Trabajo Final | Transversal | 6h | Paulo Espinoza | Done |

Tablero detallado en [docs/sprint-4-board.md](sprint-4-board.md).
