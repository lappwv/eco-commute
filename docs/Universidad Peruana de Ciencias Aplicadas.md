# Universidad Peruana de Ciencias Aplicadas

[Imagen - logotipo institucional de la Universidad Peruana de Ciencias Aplicadas]

**INGENIERÍA DE SISTEMAS DE INFORMACIÓN**  
**ARQUITECTURA DE APLICACIONES WEB**  
1ASI0705  
Ciclo 202620

**TRABAJO PARCIAL**

- NRC: 8247
- Grupo: 5
- Tema: EcoCommute
- Docente: Elio Jefferson Navarrete Vilca

**Integrantes:**

| Integrante | Código |
| --- | --- |
| Alcocer Vasquez, Odar Javier | U20241D581 |
| Avalos Arias, Diego Alessandro | U20221D254 |
| Condor Silvera Rodrigo Sebastián | U202418511 |
| Espinoza Gamboa, Paulo Daniel | U202319631 |
| Mariños Alberca, Matias Santiago | U202220088 |
| Ramos Chauca, Jeampiero Sergio | U20241E361 |

2026-2

## Registro de versiones del informe

| Versión | Fecha | Autor | DESCRIPCIÓN Y MODIFICACIÓN |
| --- | --- | --- | --- |
| 1.0 | 27/08/2026 | Equipo EcoCommute | Versión inicial del TP. |
| 1.1 | 03/09/2026 | Equipo EcoCommute | Corrección ortográfica, mejora de redacción y desarrollo del informe hasta el Capítulo II según la rúbrica del Trabajo Parcial. |
| 1.2 | 04/09/2026 | Equipo EcoCommute | Desarrollo y corrección del Capítulo III, Sprint Backlog, Student Outcome, tablas y diagrama de base de datos con relaciones. |
| 1.3 | 29/09/2026 | Equipo EcoCommute | Actualización del despliegue a Render, corrección de evidencias del Sprint Review, actualización del modelo de base de datos y reemplazo de la Figura 7. |
| 1.4 | 02/10/2026 | Equipo EcoCommute | Alineación integral del informe con la rúbrica del Trabajo Parcial y el repositorio actual: mejora de Lean UX (Problem Statement, Assumptions, Hypotheses y métricas), actualización de perfiles y Student Outcome, sincronización del Sprint Backlog y de la metodología de trabajo por features, corrección de landing page, arquitectura, base de datos, OpenAPI/Swagger y despliegue en Render, actualización de evidencias del Sprint Review, conclusiones y recomendaciones. |
| 1.5 | 02/10/2026 | Equipo EcoCommute | Clarificación del alcance técnico: Angular + TypeScript + Angular Material se mantienen como arquitectura objetivo de la aplicación web principal, mientras que el Trabajo Parcial implementa y despliega la landing page responsive y el backend. Se actualizaron alcance, Web Style Guidelines, configuración técnica e implementación para diferenciar correctamente producto final y entregable del TP. |
| 1.6 | 03/10/2026 | Equipo EcoCommute | Ajuste final del informe al alcance implementado del TP: precisión de las recomendaciones con IA, aclaración del alcance de rutas y actualización de evidencias del Sprint. |

## Tabla de Contenidos

- Student Outcome
- CAPÍTULO I: INTRODUCCIÓN
  - 1.1 Startup Profile
    - 1.1.1 Descripción de la Startup
    - 1.1.2 Perfiles de Integrantes del Equipo
  - 1.2 Solution Profile
    - 1.2.1 Antecedentes y problemática
    - 1.2.2 Lean UX Process
    - 1.3 Segmentos objetivo
- CAPÍTULO II: REQUIREMENTS SPECIFICATION
  - 2.1 Product Backlog
    - 2.1.1 Sprint Backlog
    - 2.1.2 Priorización del backlog
    - 2.1.3 Alcance inicial del producto
    - 2.1.4 Funcionalidades fuera del alcance inicial
    - 2.1.5 Repositorio del proyecto
- CAPÍTULO III: PRODUCT DESIGN
  - 3.1 Style Guidelines
  - 3.2 Landing Page UI Design
  - 3.3 Web Applications UX/UI Design
  - 3.4 Database Design
- CAPÍTULO IV: PRODUCT IMPLEMENTATION, VALIDATION & DEPLOYMENT
  - 4.1 Software Deployment Configuration
  - 4.2 Landing Page, Services & Applications Implementation
  - 4.3 Validation Interviews
  - 4.4 Video About-the-Product
- Conclusiones
- Recomendaciones
- Video About-the-Team
- Bibliografía
- Anexos

## Student Outcome

| Criterios específicos | Acciones realizadas | Conclusiones |
| --- | --- | --- |
| Comunica oralmente sus ideas y/o resultados con objetividad a público de diferentes especialidades y niveles jerárquicos, en el marco del desarrollo de un proyecto en ingeniería. | Se preparó la sustentación del Sprint Review a partir de la propuesta de valor, los principales flujos del producto, la arquitectura, las decisiones técnicas y las evidencias del repositorio y despliegue. | La preparación de una narrativa común y evidencias técnicas facilita que el equipo explique el producto con claridad, diferenciando la arquitectura base de las mejoras realizadas en cada feature. |
| Comunica en forma escrita ideas y/o resultados con objetividad a público de diferentes especialidades y niveles jerárquicos, en el marco del desarrollo de un proyecto en ingeniería. | Se elaboró y actualizó el informe técnico del proyecto, documentando Lean UX, backlog, diseño, arquitectura, base de datos, implementación, configuración, despliegue y evidencias del Sprint. | El informe consolida decisiones de producto, diseño, arquitectura, implementación y despliegue con terminología técnica consistente y evidencias verificables del repositorio. |

# CAPÍTULO I: INTRODUCCIÓN

## 1.1 Startup Profile

### 1.1.1 Descripción de la Startup

EcoCommute es una plataforma web orientada a la movilidad urbana sostenible (alineada con el ODS 11, Ciudades y Comunidades Sostenibles). Su propósito es ayudar a los usuarios a elegir rutas y medios de transporte con menor impacto ambiental, mostrando en cada trayecto una comparación objetiva entre la opción elegida y un viaje equivalente en auto particular: distancia, tiempo estimado, CO2 emitido y CO2 ahorrado.

A diferencia de un planificador de rutas convencional, EcoCommute calcula además un puntaje de sostenibilidad por cada viaje, lleva un historial acumulado de impacto (CO2 ahorrado, calorías quemadas) y reconoce el progreso del usuario mediante un sistema de medallas que se desbloquean automáticamente al alcanzar hitos de movilidad sostenible.

**Misión:** Ayudar a las personas a reducir la huella de carbono de sus traslados diarios, dándoles información clara y confiable para elegir rutas y medios de transporte más sostenibles.

**Visión:** Convertirnos en una herramienta de referencia para la movilidad sostenible en entornos urbanos, motivando el cambio de hábitos de transporte a través de datos y reconocimiento tangible del progreso del usuario.

### 1.1.2 Perfiles de Integrantes del Equipo

| Integrante | Carrera | Acerca de |
| --- | --- | --- |
| Odar Javier Alcocer Vasquez | Ingeniería de Sistemas de Información | Participó en las features de gamificación y medallas, refinando la actualización de puntos verdes y las reglas de desbloqueo de logros sobre la estructura base del proyecto. |
| Diego Alessandro Avalos Arias | Ingeniería de Sistemas de Información | Participó en las features de recompensas y retos, completando y validando flujos de catálogo, canjes y administración sobre la estructura base del proyecto. |
| Rodrigo Sebastián Condor Silvera | Ingeniería de Sistemas de Información | Definió la estructura base y la arquitectura general de EcoCommute, dejando preparados los módulos principales, la configuración común y el flujo de integración. Posteriormente coordinó la evolución del proyecto mediante ramas feature y Pull Requests. |
| Paulo Daniel Espinoza Gamboa | Ingeniería de Sistemas de Información | Participó en la feature de ranking por distrito, mejorando la lógica de clasificación y validando la consistencia de los datos mostrados. |
| Matias Santiago Mariños Alberca | Ingeniería de Sistemas de Información | Participó en las features de dashboard e inteligencia artificial, refinando KPIs, historial y recomendaciones, y apoyando la preparación de evidencias del Sprint. |
| Jeampiero Sergio Ramos Chauca | Ingeniería de Sistemas de Información | Participó en las features de rutas y viajes, refinando la integración con OSRM, las entidades y repositorios asociados y la validación del cálculo de CO₂ sobre la estructura base del proyecto. |

## 1.2 Solution Profile

### 1.2.1 Antecedentes y problemática

**What?**
Gran parte de los traslados diarios en ciudades se hacen en auto particular por comodidad o costumbre, sin que la persona tenga a la vista cuánto CO2 emite ese trayecto ni qué alternativas más sostenibles existen (bicicleta, caminata, o una ruta vehicular más eficiente).

**When?**
Al planificar cualquier trayecto cotidiano: ir al trabajo, la universidad, o hacer mandados, cuando la persona decide qué medio de transporte usar sin comparar el impacto ambiental de las opciones disponibles.

**Where?**
Este problema se presenta en cualquier entorno urbano donde exista más de una forma razonable de llegar a un destino (a pie, en bicicleta o en vehículo), especialmente en ciudades con infraestructura ciclista y peatonal creciente pero subutilizada.

**Who?**
Afecta a personas que se movilizan regularmente dentro de la ciudad y que estarían dispuestas a elegir una opción más sostenible si tuvieran información clara y algún tipo de reconocimiento por hacerlo.

**Why?**
Porque hoy no existe, al momento de decidir cómo trasladarse, una comparación simple y confiable entre el impacto ambiental de las distintas opciones de transporte, ni un mecanismo que reconozca y motive el mantener hábitos de movilidad sostenible en el tiempo.

**How?**
El problema se hace presente cuando la persona ya está por iniciar su trayecto y elige medio de transporte casi por costumbre, sin abrir ninguna herramienta que le muestre el impacto ambiental de esa decisión ni alternativas más sostenibles disponibles en ese momento.

**How much?**
Este problema se presenta a diario, ya que la decisión de cómo trasladarse se repite en cada viaje (ida y vuelta al trabajo o la universidad, mandados, salidas), y en la mayoría de esos viajes la persona no cuenta con información que le permita comparar el impacto ambiental de sus opciones.

**Estado actual del mercado y oportunidad:**
Las aplicaciones de mapas priorizan el tiempo de viaje y no muestran de forma integrada el CO2 evitado, los puntos acumulados ni el progreso del usuario por elegir alternativas sostenibles. Las aplicaciones de actividad física registran caminatas o ciclismo, pero no comparan esos trayectos con un viaje equivalente en automóvil ni orientan la decisión antes del desplazamiento.

EcoCommute aprovecha esta oportunidad al reunir planificación de rutas, comparación de emisiones, registro de viajes, indicadores de impacto y reconocimiento por logros en una sola aplicación web.

**Problem Statement:** Los estudiantes y trabajadores que se desplazan con frecuencia en Lima necesitan comparar alternativas de movilidad con información comprensible sobre tiempo, distancia e impacto ambiental antes de iniciar un viaje.

Actualmente suelen elegir el automóvil o la primera alternativa disponible porque las herramientas existentes no muestran, en un mismo flujo, el CO2 evitado frente a un auto, el impacto acumulado y un incentivo para sostener el hábito. EcoCommute busca reducir esa brecha mediante rutas basadas en OSRM, cálculo estimado de emisiones, historial de impacto, puntos y medallas.

El alcance inicial se limita a una aplicación web responsive, rutas disponibles por OSRM, datos ingresados por el usuario y factores de emisión configurados por la aplicación; no incluye una aplicación móvil nativa, acuerdos con comercios ni integración con sistemas de transporte municipales.

### 1.2.2 Lean UX Process

#### 1.2.2.1 Lean UX Problem Statements

**Problem Statements 1:**
EcoCommute otorgará al usuario una forma clara de comparar el impacto ambiental de sus opciones de transporte antes de cada viaje.
No obstante, hemos observado que las personas siguen eligiendo el auto particular por costumbre, sin considerar alternativas más sostenibles. ¿Cómo haríamos para que el usuario compare fácilmente el impacto de cada opción antes de decidir cómo trasladarse?

**Problem Statements 2:**
EcoCommute otorgará al usuario reconocimiento (medallas) por mantener hábitos de movilidad sostenible. No obstante, muchas apps de rutas o fitness no logran que el usuario mantenga el hábito más allá de las primeras semanas. ¿Cómo haríamos para que el usuario se mantenga motivado a elegir opciones sostenibles en el tiempo?

**Problem Statements 3:**
EcoCommute busca ofrecer recomendaciones de ruta confiables generadas con inteligencia artificial. No obstante, los usuarios pueden desconfiar de una recomendación automática si no entienden por qué se sugiere esa ruta. ¿Cómo haríamos para que el usuario confíe en la recomendación de la IA y entienda el beneficio concreto de seguirla?

#### 1.2.2.2 Lean UX Assumptions

**Business outcomes y definición de terminado:** El incremento se considerará terminado cuando un usuario autenticado pueda consultar una ruta, registrar un viaje y visualizar el CO2 evitado y los puntos resultantes en su dashboard. Se medirá como éxito que al menos 40% de los viajes registrados use bicicleta o caminata, que 60% de los usuarios con viajes consulte el dashboard al menos una vez por semana y que al menos 50% de las recomendaciones mostradas sea seleccionada. Estas métricas se evaluarán con los registros de viajes, las consultas al dashboard y las selecciones de ruta almacenadas por la aplicación.

- Incrementar el número de viajes registrados en modos sostenibles (bicicleta, caminata)
- Mejorar la retención de usuarios mediante el sistema de medallas
- Aumentar la tasa de aceptación de las rutas recomendadas por la IA
- Reducir el CO2 no ahorrado por elección de rutas poco eficientes

**Users**
- *Traslado diario:* Son estudiantes y trabajadores que se movilizan a diario dentro de la ciudad y buscan reducir la huella de carbono de sus trayectos.
- *Activos:* Son personas que ya usan bicicleta o caminan parte de su trayecto y buscan medir y compartir su impacto positivo.

**User outcomes:**

- Los usuarios ahorrarán tiempo al comparar rutas y medios de transporte en un solo lugar.
- Los usuarios recibirán reconocimiento tangible (medallas) por mantener hábitos sostenibles.
- Los usuarios podrán visualizar cuánto CO2 han ahorrado de forma acumulada en el tiempo.
- Los usuarios recibirán recomendaciones de ruta explicadas en lenguaje simple.

**Features**

- Consulta de rutas mediante origen, destino y coordenadas proporcionadas por el usuario
- Comparación de rutas por CO2 emitido y ahorrado frente al auto
- Recomendación de ruta con IA (Google Gemini)
- Sistema de medallas por logros
- Historial y dashboard de impacto acumulado
- Ranking o leaderboard por distrito
- Registro e inicio de sesión con JWT y Google OAuth2
- Aplicación web responsive, sin instalación adicional

#### 1.2.2.3 Lean UX Hypothesis Statements

1. Creemos que los estudiantes y trabajadores que realizan traslados diarios aumentarán el uso de rutas sostenibles si la función de consulta de rutas les permite comparar alternativas antes de iniciar el recorrido. El resultado esperado para el usuario es mayor confianza para elegir una opción sostenible; el resultado de negocio es incrementar los viajes sostenibles registrados. Sabremos que la hipótesis es correcta si más del 50% de los usuarios selecciona una alternativa sostenible en sus primeros viajes.
2. Creemos que mostrar la comparación de CO2 emitido y ahorrado frente a un viaje en auto ayudará a que el usuario elija más veces bicicleta o caminata. Sabremos que estamos en lo correcto si más del 40% de los viajes registrados corresponden a modos no motorizados.
3. Creemos que la recomendación de ruta generada con IA (Google Gemini) ayudará a que el usuario confíe y elija la ruta sugerida. Sabremos que estamos en lo correcto si la ruta "Corredor Verde Optimizado con IA" es seleccionada en más del 50% de los casos en que se ofrece.
4. Creemos que el sistema de medallas por logros ayudará a mantener el hábito de movilidad sostenible en el tiempo. Sabremos que estamos en lo correcto si los usuarios con al menos una medalla desbloqueada registran más viajes mensuales que los que no tienen ninguna.
5. Creemos que mostrar un historial y dashboard de impacto acumulado (CO2 ahorrado, calorías) ayudará a que el usuario perciba su progreso. Sabremos que estamos en lo correcto si más del 60% de los usuarios revisa su dashboard al menos una vez por semana.
6. Creemos que un ranking o leaderboard por distrito ayudará a motivar la competencia sana entre usuarios cercanos. Sabremos que estamos en lo correcto si más del 30% de los usuarios revisa la sección de ranking en su primer mes.
7. Creemos que ofrecer inicio de sesión con Google OAuth2 facilitará el registro de nuevos usuarios. Sabremos que estamos en lo correcto si más del 50% de los registros nuevos usan esta opción en vez del registro manual.
8. Creemos que explicar en lenguaje simple el porqué de cada recomendación de ruta reducirá el abandono al momento de elegir una opción. Sabremos que estamos en lo correcto si la tasa de abandono en la pantalla de comparación de rutas se reduce respecto a la línea base medida antes de agregar la explicación.
9. Creemos que ofrecer la plataforma como web responsive, sin necesidad de instalar una app adicional, facilitará la adopción. Sabremos que estamos en lo correcto si más del 70% de las sesiones provienen de un dispositivo móvil.
10. Creemos que mostrar el ahorro acumulado de CO2 en unidades comprensibles (por ejemplo, equivalente en árboles) ayudará a que el usuario entienda el impacto real de sus viajes. Sabremos que estamos en lo correcto si más del 50% de los usuarios encuestados identifica correctamente su ahorro acumulado.

#### 1.2.2.4 Lean UX Canvas

| BUSINESS PROBLEM | SOLUTIONS | BUSINESS OUTCOMES |
| --- | --- | --- |
| Difícil comparar el impacto ambiental de las opciones de transporte antes de viajar. Baja motivación para mantener hábitos de movilidad sostenible en el tiempo. Falta de confianza en recomendaciones automáticas de ruta. | Web app con comparación de rutas por CO2. Recomendación de ruta con IA explicada en lenguaje simple. Sistema de medallas por logros. | Incrementar el número de viajes registrados en modos sostenibles. Mejorar la retención de usuarios. Aumentar la tasa de aceptación de las rutas recomendadas por la IA. |
| USERS |  | USER BENEFITS |
| Estudiantes y trabajadores que se trasladan a diario dentro de la ciudad. Personas que ya usan bicicleta o caminan parte de su trayecto. |  | Ahorro de tiempo al comparar rutas y medios de transporte en un solo lugar. Reconocimiento tangible (medallas) por mantener hábitos sostenibles. Visualización clara del CO2 ahorrado acumulado. |
| HYPOTHESES | WHAT'S THE MOST IMPORTANT THING WE NEED TO LEARN FIRST? | WHAT'S THE LEAST AMOUNT OF WORK NEED TO DO TO LEARN THE NEXT MOST IMPORTANT THING? |
| Los usuarios elegirán más veces bicicleta o caminata si ven claramente cuánto CO2 ahorran frente al auto. Los usuarios confiarán en la recomendación de la IA si esta se explica en lenguaje simple. Los usuarios mantendrán el hábito de movilidad sostenible si reciben reconocimiento (medallas) por sus logros. | Si mostrar la comparación de CO2 realmente cambia la elección de medio de transporte del usuario. | Encuestas. Entrevistas. Prueba piloto con un grupo reducido de usuarios reales. |

### 1.3 Segmentos objetivo

**Segmento objetivo 1: Traslado diario en la ciudad**
Estudiantes y trabajadores que se movilizan a diario dentro de la ciudad (a la universidad, al trabajo, o para hacer mandados) y que tienen algún grado de sensibilidad ambiental, aunque hoy no cuenten con información clara para comparar el impacto de sus opciones de transporte.

**Segmento objetivo 2: Usuarios activos (ciclistas y caminantes)**
Personas que ya usan bicicleta o caminan parte de su trayecto de forma habitual, y que buscan una forma de medir su impacto positivo acumulado y recibir algún tipo de reconocimiento por mantener ese hábito.

# CAPÍTULO II: REQUIREMENTS SPECIFICATION

## 2.1 Product Backlog

El Product Backlog de EcoCommute organiza las funcionalidades del alcance inicial de acuerdo con el valor que aportan al usuario y a la propuesta de negocio. La prioridad inicial se enfoca en permitir que el usuario acceda de forma segura, registre viajes sostenibles, visualice su impacto ambiental y reciba incentivos mediante puntos, recompensas y rankings. Las historias relacionadas con administración y mejoras avanzadas se ubican después de las funcionalidades centrales.

| Orden | User Story ID | Título | Descripción | Criterios de aceptación | Story Points | Epic |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | HU01 | Registro de usuario | Como ciudadano de Lima, deseo crear una cuenta en EcoCommute para acceder a mi EcoPerfil y registrar mis viajes sostenibles. | Given que el usuario completa los datos obligatorios, When envía el formulario de registro, Then el sistema crea la cuenta y guarda la contraseña encriptada. Rules: el correo debe ser único y la contraseña debe cumplir reglas mínimas de seguridad. | 5 | Gestión de usuarios |
| 12 | HU02 | Inicio de sesión seguro | Como usuario registrado, deseo iniciar sesión con mis credenciales para acceder a funcionalidades protegidas de la aplicación. | Given que el usuario ingresa credenciales válidas, When solicita iniciar sesión, Then el sistema genera un token JWT. Given credenciales inválidas, Then el sistema muestra un mensaje de error sin exponer información sensible. | 5 | Seguridad |
| 1 | HU03 | Consulta de rutas sostenibles | Como usuario, deseo consultar rutas sostenibles entre un origen y destino para elegir una alternativa de movilidad con menor impacto ambiental. | Given que el usuario ingresa origen y destino, When consulta rutas, Then el sistema muestra alternativas usando OSRM (Open Source Routing Machine) con distancia estimada y medio sugerido. | 8 | Movilidad sostenible |
| 2 | HU04 | Registro de viaje sostenible | Como usuario, deseo registrar un viaje realizado para que EcoCommute calcule mi impacto ambiental y actualice mi progreso. | Given que el usuario selecciona medio de transporte, distancia y fecha, When registra el viaje, Then el sistema guarda el viaje y lo asocia a su perfil. | 5 | Viajes |
| 3 | HU05 | Cálculo de CO₂ ahorrado | Como usuario, deseo conocer el CO₂ estimado que ahorro en cada viaje sostenible para comprender mi aporte ambiental. | Given que existe un viaje registrado, When el sistema procesa la distancia y medio de transporte, Then calcula el CO₂ estimado frente a un viaje equivalente en automóvil y muestra el resultado al usuario. | 5 | Impacto ambiental |
| 4 | HU06 | Acumulación de puntos verdes | Como usuario, deseo recibir puntos por mis viajes sostenibles para mantener la motivación y avanzar en mi EcoPerfil. | Given que se registra un viaje válido, When se calcula el CO₂ ahorrado, Then el sistema asigna puntos de acuerdo con reglas definidas y actualiza el total acumulado. | 3 | Gamificación |
| 5 | HU07 | Dashboard personal | Como usuario, deseo visualizar mis estadísticas de movilidad para evaluar mi progreso ambiental y mis puntos acumulados. | Given que el usuario tiene viajes registrados, When ingresa al dashboard, Then visualiza CO₂ total ahorrado, puntos, historial de viajes y evolución semanal mediante gráficos. | 8 | Reportes |
| 6 | HU08 | Ranking por distrito | Como usuario, deseo comparar mi impacto con otros usuarios de mi distrito para participar en una competencia sana por movilidad sostenible. | Given que existen usuarios con viajes registrados, When el usuario consulta el ranking, Then el sistema muestra posiciones por distrito ordenadas por puntos o CO₂ ahorrado. | 5 | Eco Identidad Urbana |
| 7 | HU09 | Recomendaciones con IA | Como usuario, deseo recibir una recomendación explicada sobre la ruta sostenible más conveniente para mi viaje. | Given que el usuario ingresa origen, destino y medio de transporte, When consulta las alternativas, Then el sistema genera una recomendación basada en la distancia, duración estimada, horario del viaje y CO₂ ahorrado. | 8 | Inteligencia artificial |
| 8 | HU10 | Desbloqueo automático de medallas | Como usuario, deseo desbloquear medallas automáticamente al alcanzar hitos de movilidad sostenible, para sentir reconocimiento tangible por mis hábitos. | Given que el usuario cumple la condición de una medalla (por ejemplo, cierto número de viajes en bicicleta o cierto CO2 ahorrado), When se registra el viaje que cumple la condición, Then el sistema desbloquea la medalla y la asocia a su perfil. | 3 | Recompensas |
| 9 | HU11 | Consulta de medallas | Como usuario, deseo revisar mis medallas obtenidas para llevar control del reconocimiento ganado por mis hábitos sostenibles. | Given que el usuario tiene medallas desbloqueadas, When consulta su perfil, Then el sistema muestra el listado de medallas con nombre, ícono y fecha de obtención. | 5 | Recompensas |
| 13 | HU12 | Gestión de recompensas | Como administrador, deseo crear, actualizar y desactivar recompensas para mantener vigente el catálogo de beneficios de EcoCommute. | Given que el administrador está autenticado, When registra o modifica una recompensa, Then el sistema guarda los cambios y controla el acceso por rol. | 5 | Administración |
| 14 | HU13 | Gestión de retos sostenibles | Como administrador, deseo crear retos de movilidad sostenible para incentivar metas semanales o mensuales dentro de la comunidad. | Given que el administrador define nombre, descripción, meta y periodo del reto, When guarda el reto, Then queda disponible para los usuarios dentro del periodo definido. | 5 | Retos |
| 10 | HU14 | Historial de canjes | Como usuario, deseo revisar mis canjes realizados para llevar control de los beneficios obtenidos con mis puntos. | Given que el usuario realizó canjes, When consulta el historial, Then el sistema muestra recompensa, fecha, puntos usados y estado del canje. | 3 | Recompensas |

### 2.1.1 Sprint Backlog

Para el Trabajo Parcial se prioriza un primer sprint sobre una estructura base y arquitectura general preparada inicialmente por Rodrigo Condor. A partir de esa base, el trabajo se distribuyó mediante ramas feature/* para que cada integrante refinara, completara, corrigiera y validara los módulos asignados. Las historias se descomponen en tareas técnicas estimadas entre 4 y 8 horas, de acuerdo con la rúbrica, y representan la evolución del incremento funcional, no necesariamente la creación de cada módulo desde cero.

| Sprint | User Story | Engineering Task | Responsable | Horas |
| --- | --- | --- | --- | --- |
| Sprint 1 | HU01 | Refinar DTO y validaciones de registro de usuario sobre la estructura base | Rodrigo Condor | 4 |
| Sprint 1 | HU01 | Completar el endpoint POST /api/auth/register y su prueba básica | Rodrigo Condor | 6 |
| Sprint 1 | HU02 | Refinar y validar Spring Security, JWT y filtros de autenticación | Rodrigo Condor | 8 |
| Sprint 1 | HU03 | Refinar e integrar la búsqueda de ruta y distancia con OSRM | Jeampiero Ramos | 8 |
| Sprint 1 | HU04 | Completar y ajustar entidades JPA y repositorios para viajes y medios de transporte | Jeampiero Ramos | 6 |
| Sprint 1 | HU05 | Refinar y validar el servicio de cálculo de CO₂ y reglas de puntos | Jeampiero Ramos | 6 |
| Sprint 1 | HU06 | Mejorar la actualización de puntos verdes al registrar un viaje | Odar Alcocer | 5 |
| Sprint 1 | HU07 | Extender y ajustar el dashboard con KPIs, historial y evolución semanal | Matías Mariños | 8 |
| Sprint 1 | HU08 | Mejorar el endpoint y la vista de ranking por distrito | Paulo Espinoza | 6 |
| Sprint 1 | HU09 | Refinar el prompt y el servicio de recomendación con IA (Gemini) | Matías Mariños | 6 |
| Sprint 1 | HU10-HU11 | Completar y validar el sistema de medallas por logros | Odar Alcocer | 8 |
| Sprint 1 | Evidencias | Preparar capturas, pruebas funcionales y resumen de colaboración | Matías Mariños | 6 |

| Id | Title | Estimation | Assigned To | Status |
| --- | --- | --- | --- | --- |
| T01 | Refinar DTO y validaciones de registro de usuario sobre la estructura base | 4h | Rodrigo Condor | Done |
| T02 | Completar el endpoint POST /api/auth/register y su prueba básica | 6h | Rodrigo Condor | Done |
| T03 | Refinar y validar Spring Security, JWT y filtros de autenticación | 8h | Rodrigo Condor | Done |
| T04 | Refinar e integrar la búsqueda de ruta/distancia con OSRM | 8h | Jeampiero Ramos | Done |
| T05 | Completar y ajustar entidades JPA y repositorios para viajes y medios de transporte | 6h | Jeampiero Ramos | Done |
| T06 | Refinar y validar el servicio de cálculo de CO2 y reglas de puntos | 6h | Jeampiero Ramos | Done |
| T07 | Mejorar la actualización de puntos verdes al registrar un viaje | 5h | Odar Alcocer | Done |
| T08 | Extender y ajustar el dashboard con KPIs, historial y evolución semanal | 8h | Matías Mariños | Done |
| T09 | Mejorar el endpoint y la vista de ranking por distrito | 6h | Paulo Espinoza | Done |
| T10 | Refinar el prompt y el servicio de recomendación con IA (Gemini) | 6h | Matías Mariños | Done |
| T11 | Completar y validar el sistema de medallas por logros | 8h | Odar Alcocer | Done |
| T12 | Preparar capturas, pruebas funcionales y resumen de colaboración | 6h | Matías Mariños | Done |

### 2.1.2 Priorización del backlog

La priorización inicia con las funcionalidades que entregan valor directo al usuario: consulta de rutas sostenibles, registro de viajes, cálculo de CO₂ ahorrado, puntos verdes y dashboard. Luego se priorizan ranking, recomendaciones con IA, recompensas y canjes, porque fortalecen la motivación y el diferencial innovador de EcoCommute. La autenticación y seguridad se mantienen como habilitadores técnicos necesarios para proteger los datos, pero no se ubican como el primer elemento de valor del Product Backlog.

### 2.1.3 Alcance inicial del producto

| Componente del alcance inicial | Descripción |
| --- | --- |
| Consulta de rutas | El usuario proporciona origen y destino, y el backend consulta OSRM para calcular alternativas con distancia, duración, coordenadas y comparación de emisiones. |
| Aplicación web responsive | Arquitectura objetivo: aplicación web principal responsive con Angular + TypeScript + Angular Material. Para el TP se implementa la landing responsive y el backend; el frontend Angular queda para iteraciones posteriores. |
| Seguridad | Registro e inicio de sesión con JWT, Spring Security y contraseñas encriptadas con BCrypt, más autenticación alternativa con Google OAuth2 para inicio de sesión con un clic. |
| Rutas sostenibles | Consulta de rutas o distancias mediante OSRM (Open Source Routing Machine), con cálculo de trayectos alternativos por perfil de transporte. |
| Viajes | Registro de viajes sostenibles con medio de transporte, distancia y fecha. |
| Impacto ambiental | Cálculo estimado de CO₂ ahorrado por viaje. |
| Gamificación | Sistema de puntos verdes, recompensas simuladas y canjes. |
| Reportes | Dashboard con indicadores, gráficos, historial y evolución semanal. |
| Comunidad | Ranking por distrito para reforzar la EcoIdentidad Urbana. |
| Inteligencia artificial | Recomendaciones personalizadas basadas en el historial de uso. |

### 2.1.4 Funcionalidades fuera del alcance inicial

| Funcionalidad | Motivo para dejarla fuera del alcance inicial |
| --- | --- |
| Alianzas reales con comercios externos | Depende de acuerdos comerciales fuera del alcance académico del Trabajo Parcial. |
| Aplicación móvil nativa para Android o iOS | El alcance del curso prioriza una aplicación web responsive. |
| Integración con tarjetas de transporte público o sistemas municipales | Requiere acceso a sistemas externos no disponibles para el alcance inicial. |
| Rankings avanzados por empresas o universidades | Se considera una extensión futura después de validar el ranking por distrito. |

El alcance del producto completo contempla una aplicación web principal en Angular + TypeScript + Angular Material. No obstante, para el Trabajo Parcial el incremento evaluable se concentra en la landing page responsive, la API REST backend, la persistencia de datos, el despliegue y las evidencias técnicas asociadas. Los mock-ups y wireflows del Capítulo III representan la experiencia prevista para la aplicación Angular de siguientes iteraciones. Esta separación permite mantener una arquitectura objetivo clara sin atribuir al TP funcionalidades de frontend que todavía no forman parte de la entrega implementada.

### 2.1.5 Repositorio del proyecto

El repositorio oficial del proyecto EcoCommute se encuentra disponible en GitHub: https://github.com/lappwv/eco-commute

# CAPÍTULO III: PRODUCT DESIGN

## 3.1 Style Guidelines

### 3.1.1 General Style Guidelines

La identidad visual de EcoCommute se diseñó para comunicar sostenibilidad, movilidad urbana e innovación sin perder claridad funcional. La interfaz utiliza un tema oscuro por defecto, con acentos en verde esmeralda que refuerzan la asociación con movilidad sostenible y progreso ambiental.

La paleta cromática principal es una escala de verdes (desde #ecfdf5, el más claro, hasta #022c22, el más oscuro), con los tonos #10b981 y #34d399 como color de marca predominante en botones, íconos y elementos destacados. El fondo base de la aplicación es un azul muy oscuro casi negro (#060913), sobre el cual el verde resalta con alto contraste. No se usa una paleta separada de azul y lima para distinguir movilidad y recompensas: el verde de marca cumple ambas funciones dentro de una misma identidad visual coherente.

La tipografía base es Plus Jakarta Sans para títulos y elementos destacados, e Inter como tipografía de respaldo para el resto de contenido, ambas cargadas desde Google Fonts. Los títulos emplean pesos bold o extrabold, mientras que los textos de apoyo mantienen un peso regular o medium. Los componentes visuales usan bordes redondeados, gradientes sutiles en tonos verdes y suficiente contraste sobre el fondo oscuro para facilitar la lectura en escritorio y móvil.

[Figura 1 - Style Guidelines]

*Figura 1. Style Guidelines de EcoCommute.*

### 3.1.2 Web Style Guidelines

Para el producto completo, la aplicación web principal se plantea con Angular, TypeScript y Angular Material, manteniendo un enfoque responsive y una arquitectura de componentes reutilizables. Sin embargo, el alcance del Trabajo Parcial no incluye todavía la implementación del frontend Angular completo: en esta entrega se implementa y publica la landing page responsive con HTML5, JavaScript y Tailwind CSS, mientras que la experiencia de la futura aplicación Angular se representa mediante los mock-ups y wireflows del Capítulo III. Los botones principales se reservan para acciones críticas como iniciar sesión, calcular ruta o registrar un viaje, y los secundarios para acciones de consulta o navegación.

El formulario de registro e inicio de sesión solicita únicamente nombre, correo y contraseña. El backend también permite autenticación alternativa con Google OAuth2 cuando se configura la integración correspondiente. Los campos muestran etiquetas claras y validaciones visibles cuando el usuario ingresa datos inválidos.

La navegación principal del alcance inicial se organiza en Rutas, Impacto y Ranking, más una vista adicional de Administración visible solo para usuarios con rol administrador. Esta estructura permite que el usuario entienda rápidamente dónde planificar y comparar un viaje, dónde revisar su impacto acumulado (CO2 ahorrado, distancia, medallas) y dónde compararse con otros usuarios. En dispositivos móviles, la navegación se adapta a un menú compacto para mantener el mapa y el contenido principal visibles.

## 3.2 Landing Page UI Design

La landing page tiene como objetivo presentar EcoCommute de forma clara y persuasiva para usuarios nuevos. Su primera pantalla comunica la propuesta de valor: moverse por Lima de manera sostenible, medir el CO₂ ahorrado y recibir recompensas por hábitos responsables. La página evita una composición de marketing genérica y se enfoca en mostrar de inmediato el beneficio principal del producto.

### 3.2.1 Landing Page Wireframe

[Figura 2 - Landing Wireframe]

*Figura 2. Wireframe de la landing page de EcoCommute.*

### 3.2.2 Landing Page Mock-up

El mock-up aplica la identidad visual de EcoCommute sobre el wireframe. La propuesta utiliza fondo oscuro, botones verdes, métricas destacadas y una visualización de ruta para reforzar la idea de movilidad sostenible. La comunicación inicial se centra en el usuario y en el beneficio tangible: convertir su impacto ambiental en puntos, logros y recompensas.

[Figura 3 - Landing Mock-up]

*Figura 3. Mock-up de la landing page de EcoCommute.*

## 3.3 Web Applications UX/UI Design

El diseño de la aplicación web se orienta a un alcance inicial viable para el curso. Las pantallas principales cubren autenticación, planificación y comparación de rutas sostenibles, dashboard de impacto acumulado, reconocimiento por medallas y ranking por distrito. Esta selección permite demostrar la propuesta innovadora sin depender de un catálogo de recompensas externas en la primera versión.

### 3.3.1 Web Applications Mock-ups

Los mock-ups de la aplicación muestran las pantallas centrales que permiten validar la experiencia del usuario. La pantalla de acceso protege el uso de la aplicación mediante JWT y Spring Security, con opción adicional de autenticación con Google OAuth2. La vista de Rutas permite ingresar origen y destino, elegir el medio de transporte y comparar alternativas sostenibles con una recomendación explicada por IA (Gemini). La vista de Impacto presenta el CO2 ahorrado, los puntos y las medallas obtenidas por el usuario. La vista de Ranking refuerza la gamificación comparando el impacto entre usuarios de un mismo distrito.

[Figura 4 - Mockups de la aplicación]

*Figura 4. Mock-ups principales de la aplicación web EcoCommute.*

[Figura 5 - Mockup del dashboard]

*Figura 5. Mock-up del dashboard principal de EcoCommute.*

### 3.3.2 Web Applications Wireflow Diagrams

El wireflow organiza los recorridos principales del usuario dentro de la aplicación mediante pantallas, estados de interfaz, decisiones y caminos alternativos. El primer flujo cubre acceso seguro, validación de credenciales y llegada al dashboard. El segundo flujo representa la búsqueda de ruta sostenible, disponibilidad de alternativas, registro del viaje, cálculo de CO₂ y actualización de puntos. El tercer flujo cubre el reconocimiento por medallas: el sistema evalúa si el usuario cumple la condición de una medalla al registrar un viaje, y en caso afirmativo la desbloquea automáticamente y la agrega a su perfil; si aún no la cumple, el usuario continúa registrando viajes en Rutas.

Estos flujos permiten validar que la experiencia del alcance inicial sea coherente de inicio a fin y contemplan situaciones reales como credenciales inválidas, rutas no disponibles o condiciones de medalla aún no alcanzadas. También ayudan a identificar qué pantallas son necesarias para implementar el CRUD del proyecto y qué datos deben viajar entre frontend, backend y base de datos.

[Figura 6 - Wireflow]

*Figura 6. Wireflow de los flujos principales de EcoCommute.*

## 3.4 Database Design

El diseño de base de datos se elaboró para soportar autenticación, registro de viajes, cálculo de CO2 e impacto acumulado, y reconocimiento por medallas. La propuesta se basa en las entidades JPA reales del backend: usuario, viaje, medalla, la relación entre usuario y medalla, las estadísticas acumuladas del usuario, y una tabla de factores de emisión de CO2 por medio de transporte.

### 3.4.1 Database Diagram

El diagrama de base de datos representa las relaciones principales del sistema. La tabla User se relaciona de 1 a N con Trip (los viajes registrados), de 1 a 1 con UserStats (sus estadísticas acumuladas), y de 1 a N con UserBadge, que a su vez se relaciona de N a 1 con Badge (las medallas disponibles). La tabla EmissionFactor funciona como catálogo de referencia, con el factor de gramos de CO2 por kilómetro según el medio de transporte usado en cada viaje. Esta estructura permite calcular el impacto ambiental de cada viaje, acumular estadísticas por usuario y desbloquear medallas automáticamente según los logros alcanzados.

[Figura 7 - Database Diagram]

*Figura 7. Diagrama de base de datos de EcoCommute.*

El modelo implementado está compuesto por nueve tablas: users, trips, user_stats, badges, user_badges, rewards, redemptions, challenges y emission_factors. La tabla users se relaciona de 1 a N con trips, de 1 a 1 con user_stats y de 1 a N con user_badges, que a su vez se relaciona de N a 1 con badges; redemptions se relaciona de N a 1 con users y con rewards. emission_factors y challenges funcionan como catálogos sin clave foránea: trips.transport_mode referencia de forma lógica a emission_factors.transport_mode para calcular el CO₂ por kilómetro. El entorno de desarrollo y las pruebas usan H2 en memoria y producción usa PostgreSQL administrado en Render, con backend en Spring Boot, autenticación JWT, control de acceso con Spring Security, cifrado de contraseñas con BCrypt y autenticación alternativa con Google OAuth2.

# CAPÍTULO IV: PRODUCT IMPLEMENTATION, VALIDATION & DEPLOYMENT

## 4.1 Software Deployment Configuration

El backend de EcoCommute está desplegado en la nube con Render (plan gratuito, sin costo), desde el repositorio oficial https://github.com/lappwv/eco-commute. El despliegue se configura mediante el Blueprint render.yaml ubicado en la raíz del repositorio, que crea automáticamente el servicio web ecocommute-backend —un contenedor Docker construido desde backend/Dockerfile con Java 21 y Spring Boot 3.3.3— y una base de datos PostgreSQL administrada denominada ecocommute-db.

La configuración del Blueprint inyecta JWT_SECRET (generada por Render), DB_HOST, DB_PORT, DB_NAME, SPRING_DATASOURCE_USERNAME y SPRING_DATASOURCE_PASSWORD. La aplicación acepta además la variable PORT mediante su configuración de Spring Boot. El esquema se crea o actualiza al arrancar mediante spring.jpa.hibernate.ddl-auto=update, por lo que no es necesario ejecutar scripts SQL manualmente. El servicio expone GET /health como chequeo de salud para Render.

URL pública del backend: https://ecocommute-backend-a14m.onrender.com. La landing page permanece publicada de forma independiente en GitHub Pages: https://lappwv.github.io/eco-commute/

Repositorio principal: https://github.com/lappwv/eco-commute. La configuración de desarrollo utiliza Git y GitHub para el control de versiones, con un flujo por features mediante ramas feature/* y Pull Requests según CONTRIBUTING.md. La arquitectura objetivo del producto contempla Angular + TypeScript + Angular Material para la aplicación web principal. Para el Trabajo Parcial, el frontend implementado corresponde a la landing page responsive con HTML5, JavaScript y Tailwind CSS, mientras que el backend utiliza Java 21, Spring Boot 3.3.3, Spring Security, Spring Data JPA, JWT y Maven. PostgreSQL es la base de datos de producción administrada por Render; Docker + Render se utilizan para el despliegue del backend y GitHub Pages para la landing. La API integra OSRM para el cálculo de rutas y Gemini cuando se configura la clave correspondiente.

## 4.2 Landing Page, Services & Applications Implementation

Durante el avance del Trabajo Parcial se implementó y desplegó el backend funcional de EcoCommute y la landing page pública. El backend cubre autenticación, planificación y comparación de rutas sostenibles, registro de viajes, cálculo de CO2, dashboard de impacto, ranking por distrito, medallas, recompensas y retos. La aplicación web principal en Angular + TypeScript + Angular Material forma parte de la arquitectura objetivo del producto y será implementada en iteraciones posteriores; en esta entrega sus pantallas y flujos se documentan mediante los mock-ups y wireflows del Capítulo III. La landing y la API sí pueden revisarse en sus URL públicas.

### 4.2.1 Sprint 1

El Sprint 1 se enfoca en consolidar el primer incremento funcional de EcoCommute. Rodrigo Condor preparó inicialmente la estructura general y la arquitectura base del proyecto; después, las funcionalidades se distribuyeron por features para que los integrantes las mejoraran, completaran, corrigieran e integraran. La prioridad se definió por valor de negocio: rutas sostenibles, registro de viajes, cálculo de CO2, puntos y dashboard; luego ranking, recomendaciones con IA y medallas por logros. La autenticación se mantiene como requisito técnico necesario, pero no como el principal diferencial de valor del producto.

#### 4.2.1.1 Sprint Backlog 1

El Sprint Backlog 1 se encuentra registrado en el Capítulo II, en el formato de columnas Id, Title, Estimation, Assigned To y Status que exige la rúbrica. Las tareas reflejan el trabajo realizado sobre la estructura base: refinamiento, ampliación, corrección, integración y validación de cada feature. Los responsables y estimaciones permiten relacionar cada contribución con el seguimiento del Sprint y con las ramas feature/* del repositorio.

#### 4.2.1.2 Development Evidence for Sprint Review

Como evidencia de desarrollo se cuenta con el repositorio GitHub, las ramas feature/* y los commits registrados durante el Sprint. La estructura inicial fue preparada por Rodrigo Condor y posteriormente evolucionada por los integrantes en las features asignadas, mediante ajustes, correcciones, ampliaciones e integración de funcionalidades:

[Imagen - captura de GitHub Insights > Contributors]

#### 4.2.1.3 Execution Evidence for Sprint Review

El producto dispone de dos URL públicas: la landing page en GitHub Pages (https://lappwv.github.io/eco-commute/) y la API del backend en Render (https://ecocommute-backend-a14m.onrender.com, con chequeo de salud en /health). La landing permite revisar la propuesta de valor y los mock-ups del producto; la API permite verificar autenticación, rutas, viajes, cálculo de CO₂ y puntos, dashboard, ranking, medallas, recompensas y retos mediante sus endpoints y la documentación OpenAPI.

#### 4.2.1.4 Services Documentation Evidence for Sprint Review

El backend incluye la dependencia springdoc-openapi-starter-webmvc-ui 2.6.0, por lo que la documentación OpenAPI puede consultarse en /swagger-ui.html cuando la aplicación está en ejecución. Los servicios implementados incluyen autenticación con JWT y Google OAuth2, planificación y comparación de rutas con OSRM, recomendación con Gemini cuando existe una clave configurada y un mecanismo de respaldo heurístico, cálculo de CO2 y puntos, dashboard, ranking y asignación automática de medallas.

#### 4.2.1.5 Software Deployment Evidence for Sprint Review

La evidencia de despliegue corresponde al backend publicado en Render mediante el Blueprint render.yaml (Docker + PostgreSQL administrado) y a la landing page publicada en GitHub Pages. Cada push a la rama main dispara un redeploy automático del servicio, y el historial de deploys queda registrado en el panel de Render. Como evidencia del Sprint Review se debe adjuntar una captura del panel de Render con el servicio en estado Live y de GET /health respondiendo {"status":"UP"}.

#### 4.2.1.6 Team Collaboration Insights during Sprint

La estrategia de desarrollo comenzó con una estructura base y arquitectura general preparada por Rodrigo Condor, con el objetivo de establecer una organización común del backend, la configuración, las entidades principales y los flujos del producto. A partir de esa base, el trabajo se distribuyó entre los integrantes mediante ramas feature/auth, feature/trips, feature/stats-badges, feature/challenges-leaderboard, feature/rewards y feature/dashboard-ia. Cada integrante trabajó sobre su feature realizando mejoras, ampliaciones funcionales, correcciones, integración con otros módulos y validación del comportamiento esperado antes de incorporar los cambios a la rama principal. Esta organización permite distinguir la construcción de la base común de la evolución posterior de cada funcionalidad y debe complementarse con commits y Pull Requests atribuibles a cada integrante para evidenciar la participación individual en GitHub.

## 4.3 Validation Interviews

### 4.3.1 Diseño de Entrevistas

El diseño de entrevistas cualitativas para EcoCommute tiene como propósito validar de manera directa y empírica las hipótesis de valor planteadas en el Lean UX Canvas con usuarios potenciales en Lima Metropolitana que no conocen el proyecto de manera previa. Se busca comprender el comportamiento actual de los ciudadanos durante sus desplazamientos cotidianos, evaluar la relevancia de la problemática identificada y analizar la aceptación de las funcionalidades clave del producto.

**Objetivos de la entrevista:**

1. Comprender los criterios de decisión principales (tiempo, costo, comodidad, impacto ambiental) al elegir un medio de transporte para traslados diarios.
2. Identificar el nivel de consciencia ambiental y la disponibilidad de información al momento de realizar desplazamientos en la ciudad.
3. Evaluar la percepción de valor y la reacción inmediata ante la propuesta de EcoCommute (comparación de CO₂ emitido vs. ahorrado, recomendaciones con IA y sistema de medallas/recompensas).
4. Determinar la intención de uso de una aplicación web responsive para el seguimiento y gamificación de la movilidad sostenible.

**Perfil del entrevistado:**

- **Residencia y entorno:** Ciudadanos residentes en Lima Metropolitana que realizan desplazamientos frecuentes (al menos 3 a 5 veces por semana) hacia centros laborales o de estudio.
- **Edad y ocupación:** Jóvenes y adultos entre 18 y 45 años (estudiantes universitarios, técnicos y trabajadores activos).
- **Uso de tecnología:** Usuarios habituales de teléfonos inteligentes y aplicaciones de mapas, navegación o movilidad urbana.
- **Condición previa:** Personas sin conocimiento previo de la existencia o marca de EcoCommute para garantizar objetividad en las respuestas.

**Guía estructurada de preguntas:**

**1. Introducción y contexto diario**

1. ¿Qué medios de transporte utilizas habitualmente para trasladarte a tu trabajo, universidad o actividades diarias en Lima?
2. ¿Cuánto tiempo promedio inviertes en tus desplazamientos cotidianos y con qué frecuencia realizas estos recorridos?
3. ¿Qué factores influyen principalmente al momento de decidir el medio de transporte que vas a utilizar en un día determinado (tiempo, costo, comodidad, tráfico, seguridad)?

**2. Exploración de la problemática**

1. Cuando utilizas un vehículo particular, taxi o transporte público, ¿alguna vez consideras la cantidad de emisiones de CO₂ o el impacto ambiental que genera ese viaje?
2. ¿Has utilizado o intentado utilizar alternativas más sostenibles como bicicleta, caminata o rutas compartidas? Si la respuesta es negativa o esporádica, ¿qué impedimentos o desincentivos encuentras?
3. ¿Las herramientas digitales de navegación que usas actualmente (como Google Maps o Waze) te brindan información sobre el impacto ambiental de tus opciones de ruta?

**3. Presentación y reacción ante la solución**

1. Si una plataforma te mostrara en tiempo real la comparación directa de CO₂ emitido y CO₂ ahorrado entre tu viaje en auto y alternativas sostenibles (bicicleta/caminata), ¿crees que afectaría tu decisión sobre cómo trasladarte?
2. ¿Qué opinas de recibir sugerencias de ruta personalizadas generadas por Inteligencia Artificial que consideren tu historial, tiempos y beneficios ecológicos?
3. ¿Qué valor le otorgas a acumular puntos verdes y desbloquear medallas por tus logros sostenibles? ¿Te motivaría esto a mantener el hábito de movilidad ecológica a lo largo del tiempo?

**4. Cierre y disposición de uso**

1. ¿Estarías dispuesto a utilizar una aplicación web sin necesidad de instalar una app nativa pesada para planificar y registrar tus viajes cotidianos?
2. ¿Qué funcionalidad de las presentadas consideras absolutamente indispensable para que comiences a utilizar EcoCommute desde el primer día?
3. ¿Tienes alguna recomendación o sugerencia adicional sobre cómo la aplicación podría adaptarse mejor a las condiciones reales de transporte en Lima Metropolitano?

### 4.3.2 Registro de Entrevistas

### 4.3.3 Evaluaciones segun heuristicas

## 4.4 Video About-the-Product

# Conclusiones

EcoCommute consolidó un primer incremento técnico coherente con la propuesta de movilidad sostenible: el backend implementa autenticación y seguridad, rutas mediante OSRM, registro de viajes, cálculo de CO₂ y puntos, dashboard, ranking, medallas, recompensas y retos; además, la landing page comunica la propuesta de valor y el diseño del producto. La estrategia de desarrollo partió de una arquitectura base común y evolucionó mediante features asignadas, lo que permitió que los integrantes refinaran e integraran funcionalidades sin perder consistencia arquitectónica. El despliegue en Render y GitHub Pages permite contar con evidencias públicas del avance del Trabajo Parcial.

# Recomendaciones

Mantener sincronizados el informe, el Product Backlog, el Sprint Backlog y el repositorio para que las evidencias presentadas correspondan al estado real del proyecto. Asimismo, cada integrante debe conservar commits y Pull Requests atribuibles a su feature, de modo que la colaboración individual pueda verificarse en GitHub. Para las siguientes iteraciones se recomienda completar la validación con usuarios e implementar progresivamente la aplicación web principal con Angular, TypeScript y Angular Material, reutilizando los contratos de la API REST y los flujos definidos en los mock-ups y wireflows del Capítulo III.

# Video About-the-Team

# Bibliografía

# Anexos
