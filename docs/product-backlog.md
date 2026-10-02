# Product Backlog — EcoCommute (TP1)

Espejo del Capítulo II del informe
(https://docs.google.com/document/d/1rS2YmaUWzP3o-Y5hm9gAD7u6cKaOvi2Oyo4YMZHumaI).

## 2.1 Product Backlog

| Orden | User Story ID | Título | Descripción | Criterios de aceptación | Story Points | Epic | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | HU01 | Registro de usuario | Como ciudadano de Lima, deseo crear una cuenta en EcoCommute para acceder a mi EcoPerfil y registrar mis viajes sostenibles. | Given que el usuario completa los datos obligatorios, When envía el formulario de registro, Then el sistema crea la cuenta y guarda la contraseña encriptada. Rules: el correo debe ser único y la contraseña debe cumplir reglas mínimas de seguridad. | 5 | Gestión de usuarios | Done |
| 12 | HU02 | Inicio de sesión seguro | Como usuario registrado, deseo iniciar sesión con mis credenciales para acceder a funcionalidades protegidas de la aplicación. | Given que el usuario ingresa credenciales válidas, When solicita iniciar sesión, Then el sistema genera un token JWT. Given credenciales inválidas, Then el sistema muestra un mensaje de error sin exponer información sensible. | 5 | Seguridad | Done |
| 1 | HU03 | Consulta de rutas sostenibles | Como usuario, deseo consultar rutas sostenibles entre un origen y destino para elegir una alternativa de movilidad con menor impacto ambiental. | Given que el usuario ingresa origen y destino, When consulta rutas, Then el sistema muestra alternativas usando OSRM (Open Source Routing Machine) con distancia estimada y medio sugerido. | 8 | Movilidad sostenible | Done |
| 2 | HU04 | Registro de viaje sostenible | Como usuario, deseo registrar un viaje realizado para que EcoCommute calcule mi impacto ambiental y actualice mi progreso. | Given que el usuario selecciona medio de transporte, distancia y fecha, When registra el viaje, Then el sistema guarda el viaje y lo asocia a su perfil. | 5 | Viajes | Done |
| 3 | HU05 | Cálculo de CO₂ ahorrado | Como usuario, deseo conocer el CO₂ estimado que ahorro en cada viaje sostenible para comprender mi aporte ambiental. | Given que existe un viaje registrado, When el sistema procesa la distancia y medio de transporte, Then calcula el CO₂ estimado frente a un viaje equivalente en automóvil y muestra el resultado al usuario. | 5 | Impacto ambiental | Done |
| 4 | HU06 | Acumulación de puntos verdes | Como usuario, deseo recibir puntos por mis viajes sostenibles para mantener la motivación y avanzar en mi EcoPerfil. | Given que se registra un viaje válido, When se calcula el CO₂ ahorrado, Then el sistema asigna puntos de acuerdo con reglas definidas y actualiza el total acumulado. | 3 | Gamificación | Done |
| 5 | HU07 | Dashboard personal | Como usuario, deseo visualizar mis estadísticas de movilidad para evaluar mi progreso ambiental y mis puntos acumulados. | Given que el usuario tiene viajes registrados, When ingresa al dashboard, Then visualiza CO₂ total ahorrado, puntos, historial de viajes y evolución semanal mediante gráficos. | 8 | Reportes | Done |
| 6 | HU08 | Ranking por distrito | Como usuario, deseo comparar mi impacto con otros usuarios de mi distrito para participar en una competencia sana por movilidad sostenible. | Given que existen usuarios con viajes registrados, When el usuario consulta el ranking, Then el sistema muestra posiciones por distrito ordenadas por puntos o CO₂ ahorrado. | 5 | Eco Identidad Urbana | Done |
| 7 | HU09 | Recomendaciones con IA | Como usuario, deseo recibir recomendaciones personalizadas para mejorar mis hábitos de movilidad sostenible de forma realista. | Given que el usuario tiene historial de viajes, When solicita una recomendación, Then la IA genera una sugerencia basada en horarios, distancias, medios frecuentes y puntos acumulados. | 8 | Inteligencia artificial | Done |
| 8 | HU10 | Desbloqueo automático de medallas | Como usuario, deseo desbloquear medallas automáticamente al alcanzar hitos de movilidad sostenible, para sentir reconocimiento tangible por mis hábitos. | Given que el usuario cumple la condición de una medalla (por ejemplo, cierto número de viajes en bicicleta o cierto CO2 ahorrado), When se registra el viaje que cumple la condición, Then el sistema desbloquea la medalla y la asocia a su perfil. | 3 | Recompensas | Done |
| 9 | HU11 | Consulta de medallas | Como usuario, deseo revisar mis medallas obtenidas para llevar control del reconocimiento ganado por mis hábitos sostenibles. | Given que el usuario tiene medallas desbloqueadas, When consulta su perfil, Then el sistema muestra el listado de medallas con nombre, ícono y fecha de obtención. | 5 | Recompensas | Done |
| 13 | HU12 | Gestión de recompensas | Como administrador, deseo crear, actualizar y desactivar recompensas para mantener vigente el catálogo de beneficios de EcoCommute. | Given que el administrador está autenticado, When registra o modifica una recompensa, Then el sistema guarda los cambios y controla el acceso por rol. | 5 | Administración | Done |
| 14 | HU13 | Gestión de retos sostenibles | Como administrador, deseo crear retos de movilidad sostenible para incentivar metas semanales o mensuales dentro de la comunidad. | Given que el administrador define nombre, descripción, meta y periodo del reto, When guarda el reto, Then queda disponible para los usuarios dentro del periodo definido. | 5 | Retos | Done |
| 10 | HU14 | Historial de canjes | Como usuario, deseo revisar mis canjes realizados para llevar control de los beneficios obtenidos con mis puntos. | Given que el usuario realizó canjes, When consulta el historial, Then el sistema muestra recompensa, fecha, puntos usados y estado del canje. | 3 | Recompensas | Done |

## Sprint Backlog 1 (Capítulo II, sección 2.1.1)

| Id | Title | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- |
| T01 | Diseñar DTO y validaciones de registro de usuario | 4h | Rodrigo Condor | Done |
| T02 | Implementar endpoint POST /api/auth/register y prueba básica | 6h | Rodrigo Condor | Done |
| T03 | Configurar Spring Security, JWT y filtros de autenticación | 8h | Rodrigo Condor | Done |
| T04 | Integrar búsqueda de ruta/distancia con OSRM | 8h | Jeampiero Ramos | Done |
| T05 | Crear entidades JPA y repositorios para viajes y medios de transporte | 6h | Jeampiero Ramos | Done |
| T06 | Implementar servicio de cálculo de CO2 y reglas de puntos | 6h | Jeampiero Ramos | Done |
| T07 | Registrar transacciones de puntos al guardar un viaje | 5h | Odar Alcocer | Done |
| T08 | Construir dashboard con KPIs e historial inicial | 8h | Matías Mariños | Done |
| T09 | Crear endpoint y vista de ranking por distrito | 6h | Paulo Espinoza | Done |
| T10 | Diseñar prompt y servicio para recomendación con IA (Gemini) | 6h | Matías Mariños | Done |
| T11 | Implementar sistema de medallas por logros | 8h | Odar Alcocer | Done |
| T12 | Preparar capturas, pruebas funcionales y resumen de colaboración | 6h | Matías Mariños | To-do |

Estado verificado contra el código (46 tests en verde):
`Auth`, `Route`, `Trip`, `Dashboard`, `Leaderboard`, `Reward`, `Challenge`,
`Badge`, `Stats`, `Admin` y `Health` controllers + servicios en
`backend/src/main/java/com/ecocommute/`.
