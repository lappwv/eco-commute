#### 2.1.1.3 Sprint Backlog 3 (Arquitectura SPA Angular 18, Planificador OSRM+IA, CRUD de Viajes y Dashboard)2.1.1.4 Sprint Backlog 4 (Gamificación, Ranking Distrital, Recompensas, Panel Admin RBAC y Despliegue Full-Stack)4.2.3 Sprint 3 (Arquitectura SPA Angular 18, Planificador OSRM+IA, CRUD de Viajes y Dashboard)4.2.3.2 Development Evidence for Sprint Review (Sprint 3)4.2.4 Sprint 4 (Gamificación, Ranking Distrital, Recompensas, Panel Admin RBAC y Despliegue Full-Stack)4.2.4.2 Development Evidence for Sprint Review (Sprint 4)Con el objetivo de validar empíricamente la Landing Page pública (https://lappwv.github.io/eco-commute/) y la Aplicación Web SPA en Angular 18 (https://lappwv.github.io/eco-commute/app/), se ejecutaron entrevistas de validación con usuarios reales pertenecientes a los dos segmentos objetivo definidos en el Capítulo I. Durante cada sesión, los participantes interactuaron con el planificador OSRM+IA, el CRUD de viajes, el dashboard, las medallas, el ranking por distrito y el canje de recompensas.Segmento Objetivo 2: Usuarios activos (Ciclistas urbanos y caminantes habituales en Lima)Para garantizar la calidad de experiencia de usuario (UX), arquitectura de información y diseño inclusivo, se realizó una evaluación heurística integral sobre la Landing Page (https://lappwv.github.io/eco-commute/) y la Aplicación Web en Angular 18 (https://lappwv.github.io/eco-commute/app/), tomando como marco las 10 Heurísticas de Usabilidad de Jakob Nielsen y los criterios de accesibilidad WCAG 2.1 Nivel AA.El Video About-the-Product presenta la propuesta de valor de EcoCommute y demuestra en vivo la interacción de un usuario real con la Landing Page pública y la Aplicación Web SPA en Angular 18 conectada al backend en Render y PostgreSQL.El Video About-the-Team sintetiza la experiencia colaborativa del Grupo 5 a lo largo del desarrollo integral de EcoCommute (Trabajo Parcial y Trabajo Final), presentando las reflexiones individuales de cada integrante, los aprendizajes de ingeniería de software aplicando Scrum, Lean UX, Gitflow, Angular 18 y Spring Boot 3, y el cumplimiento del Student Outcome ABET 3.Universidad Peruana de Ciencias Aplicadas


**INGENIERÍA DE SISTEMAS DE INFORMACIÓN**

**ARQUITECTURA DE APLICACIONES WEB**


**1ASI0705**

**Ciclo 202620**

**INFORME DE TRABAJO FINAL**

**NRC: 8247**

**Grupo: 5**

**Tema: 	EcoCommute**

**Docente: Elio Jefferson Navarrete Vilca**

**Integrantes:**


| Alcocer Vasquez, Odar Javier | U20241D581 |
| --- | --- |
| Avalos Arias, Diego Alessandro | U20221D254 |
| Condor Silvera Rodrigo Sebastián | U202418511 |
| Espinoza Gamboa, Paulo Daniel | U202319631 |
| Mariños Alberca, Matias Santiago | U202220088 |
| Ramos Chauca, Jeampiero Sergio | U20241E361 |


**2026-2**


**Registro de versiones del informe**

| **Versión** | **Fecha** | **Autor** | **DESCRIPCIÓN Y MODIFICACIÓN** |
| :---: | :---: | :---: | :---: |
| 1.0 | 27/08/2026 | Equipo EcoCommute | Versión inicial del TP. |
| 1.1 | 03/09/2026 | Equipo EcoCommute | Corrección ortográfica, mejora de redacción y desarrollo del informe hasta el Capítulo II según la rúbrica del Trabajo Parcial. |
| 1.2 | 04/09/2026 | Equipo EcoCommute | Desarrollo y corrección del Capítulo III, Sprint Backlog, Student Outcome, tablas y diagrama de base de datos con relaciones. |
| 1.3 | 29/09/2026 | Equipo EcoCommute | Actualización del despliegue a Render, corrección de evidencias del Sprint Review, actualización del modelo de base de datos y reemplazo de la Figura 7. |
| 1.4 | 02/10/2026 | Equipo EcoCommute | Alineación integral del informe con la rúbrica del Trabajo Parcial y el repositorio: mejora de Lean UX, perfiles, Student Outcome, Sprint Backlog, landing page, arquitectura, base de datos, OpenAPI/Swagger y despliegue en Render. |
| 1.5 | 02/10/2026 | Equipo EcoCommute | Clarificación del alcance técnico del TP y actualización de Style Guidelines, configuración técnica e implementación del Sprint 1. |
| 1.6 | 03/10/2026 | Equipo EcoCommute | Sincronización del informe con los controladores REST expuestos en el Sprint 2 manteniendo cobertura HU01-HU14, CRUD, reportes y seguridad. |
| 1.7 | 04/10/2026 | Equipo EcoCommute | Sincronización técnica exhaustiva de la especificación de endpoints en la sección 4.2.2.4 con el backend desplegado en Render y Swagger UI. |
| 1.8 | 04/10/2026 | Equipo EcoCommute | Homologación de rutas en la sección 4.2.2.4 (/api/v1/routes/plan, /api/v1/trips/history y endpoints administrativos protegidos por rol). |
| 1.9 | 25/10/2026 | Equipo EcoCommute | Desarrollo e integración del Sprint 3 (Trabajo Final): implementación de la aplicación web SPA en Angular 18 + TypeScript + Angular Material + Leaflet, interceptores JWT, guardias de ruta, internacionalización (es\_419/en\_US), CRUD completo de viajes por propietario (PUT/DELETE /api/v1/trips/{id}), planificador OSRM+Gemini y dashboard personal. |
| 2.0 | 04/11/2026 | Equipo EcoCommute | Consolidación integral del Informe de Trabajo Final (Semana 15): reordenamiento del Product Backlog por valor de negocio, documentación del Sprint 4 (módulos de Gamificación, Ranking distrital, Canje de Recompensas, Panel Admin RBAC y Términos), exposición de 34 endpoints en OpenAPI 3.0 con 102 pruebas automatizadas en verde, despliegue full-stack en GitHub Pages (/app/) y Render, registro de entrevistas de validación (4.3.2), evaluaciones heurísticas (4.3.3), videos (4.4 y About-the-Team), conclusiones y recomendaciones. |


| 1.7 | 04/10/2026 | Equipo EcoCommute | Sincronización técnica exhaustiva de la especificación de endpoints en la sección 4.2.2.4 con el backend desplegado en Render y Swagger UI (25 rutas activas), detallando la ruta exacta de canjes GET /api/v1/redemptions para HU14 y el mapeo completo de controladores. |
| --- | --- | --- | --- |


**Tabla de Contenidos**



## **Student Outcome**


| **Criterios específicos** | **Acciones realizadas** | **Conclusiones** |
| --- | --- | --- |
| Comunica oralmente sus ideas y/o resultados con objetividad a público de diferentes especialidades y niveles jerárquicos, en el marco del desarrollo de un proyecto en ingeniería. | Alcocer Vasquez, Odar Javier (U20241D581): \[TP\] Sustentó los flujos de gamificación, asignación de puntos verdes por viaje y las reglas de negocio para el desbloqueo automático de medallas en los Sprints 1 y 2. \[TF\] Expuso la implementación en Angular 18 de los componentes TripsComponent y GamificationComponent, demostrando la previsualización en vivo de CO₂ y la galería interactiva de medallas y niveles. Avalos Arias, Diego Alessandro (U20221D254): \[TP\] Expuso la arquitectura del catálogo de recompensas, el flujo transaccional de canjes y los retos sostenibles en el backend. \[TF\] Sustentó la integración full-stack de RewardsComponent y AdminComponent en Angular 18, demostrando la emisión de códigos ECO-XXXXXX y el control de acceso basado en roles (ROLE\_ADMIN). Condor Silvera, Rodrigo Sebastián (U202418511): \[TP\] Presentó la arquitectura base en Spring Boot 3, seguridad stateless con Spring Security / JWT y despliegue continuo en Render con Docker y PostgreSQL. \[TF\] Sustentó la arquitectura SPA en Angular 18 (AuthService, authInterceptor, authGuard/adminGuard), la exposición de 34 endpoints en OpenAPI 3.0, las 102 pruebas automatizadas y el despliegue productivo full-stack. Espinoza Gamboa, Paulo Daniel (U202319631): \[TP\] Sustentó la lógica de ordenamiento del leaderboard distrital y cómo fomenta la identidad urbana en Lima. \[TF\] Presentó el módulo LeaderboardComponent en Angular 18 con filtros distritales en vivo, los hallazgos de las entrevistas de validación con usuarios reales y la evaluación heurística de usabilidad. Mariños Alberca, Matias Santiago (U202220088): \[TP\] Presentó las métricas de impacto en el dashboard, el servicio de recomendaciones con IA (Google Gemini) y la landing page. \[TF\] Sustentó el DashboardComponent analítico en Angular 18, el sistema reactivo de internacionalización (es\_419/en\_US), la accesibilidad WCAG 2.1 AA y la validación de hipótesis Lean UX. Ramos Chauca, Jeampiero Sergio (U20241E361): \[TP\] Explicó la integración con OSRM para rutas multimodales, el modelo JPA de viajes y el motor CarbonCalculatorService. \[TF\] Sustentó el planificador interactivo RoutesPlannerComponent con mapas Leaflet en Angular 18 y el CRUD completo de viajes por propietario (incluyendo corrección PUT y eliminación DELETE con recálculo de CO₂). | La comunicación oral evolucionó desde la defensa de la arquitectura base y API REST en el Trabajo Parcial hacia una demostración integral del producto full-stack (Angular 18 + Spring Boot 3 + PostgreSQL) en el Trabajo Final. El equipo logró transmitir decisiones arquitectónicas, métricas ambientales de CO₂ e indicadores de validación empírica con claridad tanto a audiencias técnicas como de negocio. |
| Comunica en forma escrita ideas y/o resultados con objetividad a público de diferentes especialidades y niveles jerárquicos, en el marco del desarrollo de un proyecto en ingeniería. | Alcocer Vasquez, Odar Javier (U20241D581): \[TP\] Documentó las reglas de gamificación y criterios Gherkin de HU06, HU10 y HU11. \[TF\] Redactó la especificación técnica de los componentes Angular de viajes y gamificación en los Sprints 3 y 4, así como la trazabilidad de estados en el EcoPerfil. Avalos Arias, Diego Alessandro (U20221D254): \[TP\] Redactó la especificación de HU12, HU13 y HU14 y las pruebas de integración de recompensas. \[TF\] Documentó los flujos de canje atómico y administración RBAC en el Sprint 4, la matriz de endpoints OpenAPI y las evidencias de ejecución del panel administrativo. Condor Silvera, Rodrigo Sebastián (U202418511): \[TP\] Redactó la arquitectura de software, configuración render.yaml y especificación de seguridad (HU01, HU02). \[TF\] Documentó el reordenamiento del Product Backlog por valor de negocio, la arquitectura de componentes Angular 18, la suite de 102 pruebas automatizadas y el pipeline de despliegue full-stack. Espinoza Gamboa, Paulo Daniel (U202319631): \[TP\] Documentó la historia HU08 y el diseño de LeaderboardController. \[TF\] Redactó el registro estructurado de entrevistas de validación por segmento (4.3.2), las tablas de evaluación heurística de usabilidad (4.3.3) y las métricas de colaboración del Sprint 4. Mariños Alberca, Matias Santiago (U202220088): \[TP\] Documentó el proceso Lean UX, KPIs del dashboard (HU07), integración de IA Gemini con fallback (HU09) y diseño de la landing page. \[TF\] Redactó las guías de estilo web actualizadas a Angular 18 + Angular Material, las conclusiones contrastadas con las hipótesis Lean UX y la hoja de ruta (Product Roadmap) en Recomendaciones. Ramos Chauca, Jeampiero Sergio (U20241E361): \[TP\] Redactó las especificaciones de HU03, HU04 y HU05, el modelo relacional PostgreSQL y pruebas de OSRM. \[TF\] Documentó la integración cartográfica Leaflet en el Sprint 3, los contratos de edición/eliminación de viajes por propietario y las evidencias técnicas de precisión en el cálculo de CO₂. | El informe técnico del Trabajo Final consolida con rigor académico y trazabilidad verificable las cuatro iteraciones (Sprints 1 al 4), articulando la investigación Lean UX, el Product Backlog priorizado por valor de negocio, la arquitectura C4/UML, la implementación full-stack en Angular 18 y Spring Boot 3, las 102 pruebas automatizadas y la validación empírica con usuarios de Lima Metropolitana. |

# **CAPÍTULO I: INTRODUCCIÓN**

### **1.1 Startup Profile**

#### **1.1.1 Descripción de la Startup**

EcoCommute es una plataforma web orientada a la movilidad urbana sostenible (alineada con el ODS 11, Ciudades y Comunidades Sostenibles). Su propósito es ayudar a los usuarios a elegir rutas y medios de transporte con menor impacto ambiental, mostrando en cada trayecto una comparación objetiva entre la opción elegida y un viaje equivalente en auto particular: distancia, tiempo estimado, CO2 emitido y CO2 ahorrado.

A diferencia de un planificador de rutas convencional, EcoCommute calcula además un puntaje de sostenibilidad por cada viaje, lleva un historial acumulado de impacto (CO2 ahorrado, calorías quemadas) y reconoce el progreso del usuario mediante un sistema de medallas que se desbloquean automáticamente al alcanzar hitos de movilidad sostenible.


**Misión:** Ayudar a las personas a reducir la huella de carbono de sus traslados diarios, dándoles información clara y confiable para elegir rutas y medios de transporte más sostenibles.

**Visión:** Convertirnos en una herramienta de referencia para la movilidad sostenible en entornos urbanos, motivando el cambio de hábitos de transporte a través de datos y reconocimiento tangible del progreso del usuario.


#### **1.1.3 Relación con los ODS y Uso de Inteligencia Artificial**

- **Relación con ODS 11 (Ciudades y Comunidades Sostenibles):** La solución contribuye de manera directa a la **Meta 11.2** ("proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos") (Naciones Unidas, 2018). EcoCommute visibiliza el impacto ecológico de los desplazamientos urbanos en Lima y promueve la transición modal hacia la bicicleta y la caminata mediante incentivos tangibles.
- **Beneficio ambiental:** Cuantificación y reducción de emisiones de gases de efecto invernadero (GEI) mediante el cálculo diferencial del CO₂ ahorrado frente a un automóvil particular por cada kilómetro recorrido.
- **Inteligencia Artificial funcional:** Incorpora la API de Google Gemini (Google, 2024) (modelo `gemini-1.5-flash`) para resolver la sobrecarga de rutas al generar sugerencias personalizadas ("Corredor Verde Optimizado con IA"). Consume datos de origen, destino, duración OSRM y preferencias del usuario, explicando en lenguaje simple por qué la ruta sugerida es más ecológica y eficiente, respaldado con un fallback heurístico ante fallas de red.

#### **1.1.2 Perfiles de Integrantes del Equipo**


| **Foto** | **Integrante** | **Código** | **Carrera** | **Acerca de** |
| --- | --- | --- | --- | --- |
|  | Odar Javier Alcocer Vasquez | U20241D581 | Ingeniería de Sistemas de Información | Participó en las features de gamificación y medallas, refinando la actualización de puntos verdes y las reglas de desbloqueo de logros sobre la estructura base del proyecto. |
|  | Diego Alessandro Avalos Arias | U20221D254 | Ingeniería de Sistemas de Información | Participó en las features de recompensas y retos, completando y validando flujos de catálogo, canjes y administración sobre la estructura base del proyecto. |
|  | Rodrigo Sebastián Condor Silvera | U202418511 | Ingeniería de Sistemas de Información | Definió la estructura base y la arquitectura general de EcoCommute, dejando preparados los módulos principales, la configuración común y el flujo de integración. Posteriormente coordinó la evolución del proyecto mediante ramas feature y Pull Requests. |
|  | Paulo Daniel Espinoza Gamboa | U202319631 | Ingeniería de Sistemas de Información | Participó en la feature de ranking por distrito, mejorando la lógica de clasificación y validando la consistencia de los datos mostrados. |
|  | Matias Santiago Mariños Alberca | U202220088 | Ingeniería de Sistemas de Información | Participó en las features de dashboard e inteligencia artificial, refinando KPIs, historial y recomendaciones, y apoyando la preparación de evidencias del Sprint. |
|  | Jeampiero Sergio Ramos Chauca | U20241E361 | Ingeniería de Sistemas de Información | Participó en las features de rutas y viajes, refinando la integración con OSRM, las entidades y repositorios asociados y la validación del cálculo de CO₂ sobre la estructura base del proyecto. |

### **1.2 Solution Profile**

#### **1.2.1 Antecedentes y problemática**

**What?**

Gran parte de los traslados diarios en ciudades se hacen en auto particular por comodidad o costumbre, sin que la persona tenga a la vista cuánto CO2 emite ese trayecto ni qué alternativas más sostenibles existen (bicicleta, caminata, o una ruta vehicular más eficiente) (Progressa Lean, 2020).

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

- Las aplicaciones de mapas priorizan el tiempo de viaje y no muestran de forma integrada el CO2 evitado, los puntos acumulados ni el progreso del usuario por elegir alternativas sostenibles. Las aplicaciones de actividad física registran caminatas o ciclismo, pero no comparan esos trayectos con un viaje equivalente en automóvil ni orientan la decisión antes del desplazamiento. 
- EcoCommute aprovecha esta oportunidad al reunir planificación de rutas, comparación de emisiones, registro de viajes, indicadores de impacto y reconocimiento por logros en una sola aplicación web. Problem Statement: Los estudiantes y trabajadores que se desplazan con frecuencia en Lima necesitan comparar alternativas de movilidad con información comprensible sobre tiempo, distancia e impacto ambiental antes de iniciar un viaje. 
- Actualmente suelen elegir el automóvil o la primera alternativa disponible porque las herramientas existentes no muestran, en un mismo flujo, el CO2 evitado frente a un auto, el impacto acumulado y un incentivo para sostener el hábito. EcoCommute busca reducir esa brecha mediante rutas basadas en OSRM, cálculo estimado de emisiones, historial de impacto, puntos y medallas. 
- El alcance inicial se limita a una aplicación web responsive, rutas disponibles por OSRM, datos ingresados por el usuario y factores de emisión configurados por la aplicación; no incluye una aplicación móvil nativa, acuerdos con comercios ni integración con sistemas de transporte municipales.

#### **1.2.2 Lean UX Process**

El proceso de diseño Lean UX (Gothelf & Seiden, 2021) permite formular hipótesis iterativas centradas en el usuario y validar rápidamente el valor de la solución.

##### 1.2.2.1 Lean UX Problem Statements

**Problem Statements 1:**

EcoCommute otorgará al usuario una forma clara de comparar el impacto ambiental de sus opciones de transporte antes de cada viaje.

No obstante, hemos observado que las personas siguen eligiendo el auto particular por costumbre, sin considerar alternativas más sostenibles. ¿Cómo haríamos para que el usuario compare fácilmente el impacto de cada opción antes de decidir cómo trasladarse?

**Problem Statements 2:** 

EcoCommute otorgará al usuario reconocimiento (medallas) por mantener hábitos de movilidad sostenible. No obstante, muchas apps de rutas o fitness no logran que el usuario mantenga el hábito más allá de las primeras semanas. ¿Cómo haríamos para que el usuario se mantenga motivado a elegir opciones sostenibles en el tiempo?

**Problem Statements 3:** 

EcoCommute busca ofrecer recomendaciones de ruta confiables generadas con inteligencia artificial. No obstante, los usuarios pueden desconfiar de una recomendación automática si no entienden por qué se sugiere esa ruta. ¿Cómo haríamos para que el usuario confíe en la recomendación de la IA y entienda el beneficio concreto de seguirla?

##### **1.2.2.2 Lean UX Assumptions**

- **Business outcomes y definición de terminado:** El incremento se considerará terminado cuando un usuario autenticado pueda consultar una ruta, registrar un viaje y visualizar el CO2 evitado y los puntos resultantes en su dashboard. Se medirá como éxito que al menos 40% de los viajes registrados use bicicleta o caminata, que 60% de los usuarios con viajes consulte el dashboard al menos una vez por semana y que al menos 50% de las recomendaciones mostradas sea seleccionada. Estas métricas se evaluarán con los registros de viajes, las consultas al dashboard y las selecciones de ruta almacenadas por la aplicación.
    - Incrementar el número de viajes registrados en modos sostenibles (bicicleta, caminata)
    - Mejorar la retención de usuarios mediante el sistema de medallas
    - Aumentar la tasa de aceptación de las rutas recomendadas por la IA
    - Reducir el CO2 no ahorrado por elección de rutas poco eficientes
- **Users Traslado diario:** Son estudiantes y trabajadores que se movilizan a diario dentro de la ciudad y buscan reducir la huella de carbono de sus trayectos.
- **Users Activos**: Son personas que ya usan bicicleta o caminan parte de su trayecto y buscan medir y compartir su impacto positivo.
- **User outcomes:**
    - Los usuarios ahorrarán tiempo al comparar rutas y medios de transporte en un solo lugar.
    - Los usuarios recibirán reconocimiento tangible (medallas) por mantener hábitos sostenibles.
    - Los usuarios podrán visualizar cuánto CO2 han ahorrado de forma acumulada en el tiempo.
    - Los usuarios recibirán recomendaciones de ruta explicadas en lenguaje simple.
- **Features**
    - Mapa interactivo con visualización geoespacial Leaflet de corredores sostenibles vs. rutas vehiculares en Lima integrado en la aplicación Angular 18
    - Comparación de rutas por CO2 emitido y ahorrado frente al auto
    - Recomendación de ruta con IA (Google Gemini)
    - Sistema de medallas por logros
    - Historial y dashboard de impacto acumulado
    - Ranking o leaderboard por distrito
    - Registro e inicio de sesión seguro con JWT (Spring Security + BCrypt) e interceptor HTTP reactivo en Angular 18
    - Aplicación web responsive, sin instalación adicional

##### **1.2.2.3 Lean UX Hypothesis Statements**

- Creemos que los estudiantes y trabajadores que realizan traslados diarios aumentarán el uso de rutas sostenibles si la función de mapa con geolocalización les permite seguir el trayecto sugerido en tiempo real. El resultado esperado para el usuario es mayor confianza para iniciar el recorrido; el resultado de negocio es incrementar los viajes sostenibles registrados. Sabremos que la hipótesis es correcta si más del 50% de los usuarios activa la geolocalización durante sus primeros viajes.
- Creemos que mostrar la comparación de CO2 emitido y ahorrado frente a un viaje en auto ayudará a que el usuario elija más veces bicicleta o caminata. Sabremos que estamos en lo correcto si más del 40% de los viajes registrados corresponden a modos no motorizados.
- Creemos que la recomendación de ruta generada con IA (Google Gemini) ayudará a que el usuario confíe y elija la ruta sugerida. Sabremos que estamos en lo correcto si la ruta "Corredor Verde Optimizado con IA" es seleccionada en más del 50% de los casos en que se ofrece.
- Creemos que el sistema de medallas por logros ayudará a mantener el hábito de movilidad sostenible en el tiempo. Sabremos que estamos en lo correcto si los usuarios con al menos una medalla desbloqueada registran más viajes mensuales que los que no tienen ninguna.
- Creemos que mostrar un historial y dashboard de impacto acumulado (CO2 ahorrado, calorías) ayudará a que el usuario perciba su progreso. Sabremos que estamos en lo correcto si más del 60% de los usuarios revisa su dashboard al menos una vez por semana.
- Creemos que un ranking o leaderboard por distrito ayudará a motivar la competencia sana entre usuarios cercanos. Sabremos que estamos en lo correcto si más del 30% de los usuarios revisa la sección de ranking en su primer mes.
- Como hipótesis para una iteración posterior, creemos que ofrecer inicio de sesión con Google OAuth2 podría facilitar el registro de nuevos usuarios. Esta hipótesis no forma parte de la API expuesta en el TP y deberá validarse cuando se implemente dicha integración.
- Creemos que explicar en lenguaje simple el porqué de cada recomendación de ruta reducirá el abandono al momento de elegir una opción. Sabremos que estamos en lo correcto si la tasa de abandono en la pantalla de comparación de rutas se reduce respecto a la línea base medida antes de agregar la explicación.
- Creemos que ofrecer la plataforma como web responsive, sin necesidad de instalar una app adicional, facilitará la adopción. Sabremos que estamos en lo correcto si más del 70% de las sesiones provienen de un dispositivo móvil.
- Creemos que mostrar el ahorro acumulado de CO2 en unidades comprensibles (por ejemplo, equivalente en árboles) ayudará a que el usuario entienda el impacto real de sus viajes. Sabremos que estamos en lo correcto si más del 50% de los usuarios encuestados identifica correctamente su ahorro acumulado.

##### **1.2.2.4 Lean UX Canvas**

A continuación se presenta el Lean UX Canvas que sintetiza los problemas de negocio, resultados esperados, usuarios, soluciones e hipótesis de valor (Gothelf & Seiden, 2021):



| **BUSINESS PROBLEM**Difícil comparar el impacto ambiental de las opciones de transporte antes de viajar. Baja motivación para mantener hábitos de movilidad sostenible en el tiempo. Falta de confianza en recomendaciones automáticas de ruta. | **SOLUTIONS** Web app con comparación de rutas por CO2. Recomendación de ruta con IA explicada en lenguaje simple. Sistema de medallas por logros. | **BUSINESS OUTCOMES** Incrementar el número de viajes registrados en modos sostenibles. Mejorar la retención de usuarios. Aumentar la tasa de aceptación de las rutas recomendadas por la IA. |
| --- | --- | --- |
| **USERS**  Estudiantes y trabajadores que se trasladan a diario dentro de la ciudad. Personas que ya usan bicicleta o caminan parte de su trayecto. |  | **USER BENEFITS**  Ahorro de tiempo al comparar rutas y medios de transporte en un solo lugar. Reconocimiento tangible (medallas) por mantener hábitos sostenibles. Visualización clara del CO2 ahorrado acumulado. |
| **HYPOTHESES** Los usuarios elegirán más veces bicicleta o caminata si ven claramente cuánto CO2 ahorran frente al auto. Los usuarios confiarán en la recomendación de la IA si esta se explica en lenguaje simple. Los usuarios mantendrán el hábito de movilidad sostenible si reciben reconocimiento (medallas) por sus logros. | **WHAT'S THE MOST IMPORTANT THING WE NEED TO LEARN FIRST?** Si mostrar la comparación de CO2 realmente cambia la elección de medio de transporte del usuario. | **WHAT'S THE LEAST AMOUNT OF WORK NEED TO DO TO LEARN THE NEXT MOST IMPORTANT THING?** Encuestas. Entrevistas. Prueba piloto con un grupo reducido de usuarios reales. |


##### **1.3 Segmentos objetivo**

**Segmento objetivo 1: Traslado diario en la ciudad**

Estudiantes y trabajadores que se movilizan a diario dentro de la ciudad (a la universidad, al trabajo, o para hacer mandados) y que tienen algún grado de sensibilidad ambiental, aunque hoy no cuenten con información clara para comparar el impacto de sus opciones de transporte.

**Segmento objetivo 2: Usuarios activos (ciclistas y caminantes)**

Personas que ya usan bicicleta o caminan parte de su trayecto de forma habitual, y que buscan una forma de medir su impacto positivo acumulado y recibir algún tipo de reconocimiento por mantener ese hábito.


### **1.4 Competidores y Análisis Competitivo**

#### **1.4.1 Competitive Analysis Landscape**


| **¿Por qué llevar a cabo este análisis?** |
| --- |
| **Objetivo del análisis:** Determinar las fortalezas, debilidades, estrategias y vacíos de valor de las principales aplicaciones de mapas, transporte y actividad física (Google Maps, Moovit y Strava) en Lima Metropolitana, para definir la ventaja competitiva de EcoCommute en movilidad urbana sostenible, cálculo diferencial de CO₂ y gamificación por logros. |


| **Categoría** | **Factores de Evaluación** | **Su startup (EcoCommute)** | **Competidor 1 (Google Maps)** | **Competidor 2 (Moovit)** | **Competidor 3 (Strava)** |
| --- | --- | --- | --- | --- | --- |
| **Perfil** | **Overview** | Plataforma web de movilidad urbana sostenible con cálculo diferencial de CO₂ y gamificación | Navegador GPS y servicio cartográfico líder a nivel mundial de Google | Aplicación multimodal de transporte público urbano y movilidad compartida | Red social y plataforma de seguimiento de actividad física deportiva (ciclismo/running) |
| **Perfil** | **Ventaja competitiva ¿Qué valor ofrece a los clientes?** | Cálculo en tiempo real de CO₂ ahorrado frente al auto, puntos verdes, medallas e IA explicativa | Cobertura global masiva, datos de tráfico en tiempo real y directorio comercial | Planificación detallada de rutas en transporte público urbano y alertas de llegada en Lima | Red social deportiva, seguimiento GPS de alta precisión y análisis de rendimiento |
| **Perfil de Marketing** | **Mercado objetivo** | Estudiantes y trabajadores urbanos con sensibilidad ambiental en Lima | Toda persona con smartphone y necesidad de navegación o ubicación | Usuarios cotidianos dependientes de buses, trenes y Metropolitano | Atletas, ciclistas y corredores aficionados o profesionales |
| **Perfil de Marketing** | **Estrategias de marketing** | Alianzas con universidades, retos distritales de movilidad y redes sociales | Preinstalación nativa en Android, integración con Google Workspace y SEO masivo | Acuerdos institucionales con operadores de transporte masivo | Patrocinio de eventos deportivos, alianzas de marca y retos en comunidad |
| **Perfil de Producto** | **Productos & Servicios** | Rutas OSRM multimodales, recomendación IA con Gemini, dashboard y medallas | Mapas interactivos, navegación guiada paso a paso e información comercial | Planificador de transporte masivo, líneas, paradas y horarios en vivo | Registro GPS de actividad física, segmentos, estadísticas de pulso y clubes |
| **Perfil de Producto** | **Precios & Costos** | Gratuito para el usuario final (modelo freemium con canjes en comercios aliados) | Gratuito para el usuario final (monetización mediante anuncios y API comercial) | Gratuito con anuncios (suscripción de pago mensual Moovit+ sin publicidad) | Freemium (registro básico gratuito y suscripción mensual para métricas avanzadas) |
| **Perfil de Producto** | **Canales de distribución (Web y/o Móvil)** | Aplicación web responsive accesible sin instalación (Landing y Web App) | Web, aplicación móvil Android e iOS | Web, aplicación móvil Android e iOS | Aplicación móvil Android e iOS |
| **Análisis SWOT** | **Fortalezas** | Integración única de CO₂ ahorrado, gamificación por logros y acceso web ligero | Cobertura satelital global, precisión en tráfico vehicular y adopción universal | Exhaustiva base de datos de transporte urbano en Lima Metropolitana | Enorme comunidad de deportistas y alta fidelidad en el registro GPS |
| **Análisis SWOT** | **Debilidades** | Dependencia de adopción inicial y red de comercios aliados en fase de crecimiento | No calcula el CO₂ ahorrado individualmente ni premia el transporte sostenible | Interfaz recargada de publicidad comercial y sin enfoque ecológico individual | Orientada a métricas de rendimiento deportivo, no al traslado cotidiano utilitario |
| **Análisis SWOT** | **Oportunidades** | Creciente sensibilidad ecológica y ampliación de ciclovías en Lima (ODS 11.2) | Incorporación de filtros superficiales de rutas ecológicas motorizadas | Expansión hacia servicios de micromovilidad compartida en distritos | Auge del ciclismo como medio de transporte seguro ante congestión vehicular |
| **Análisis SWOT** | **Amenazas** | Posible adición de métricas de sostenibilidad en navegadores consolidados | Dominio casi monopólico del mercado de navegación en dispositivos móviles | Consolidación como herramienta de referencia de transporte público en Lima | Preferencia establecida entre ciclistas que ya usan la app para registrar rutas |


#### **1.4.2 Estrategias y tácticas frente a competidores**

- **Diferenciación de valor:** Mientras Google Maps y Moovit priorizan la rapidez vehicular sin considerar la huella ecológica, EcoCommute convierte cada trayecto en una acción climática medible y recompensable mediante medallas y puntos verdes.
- **Enfoque de usuario:** Frente a Strava (enfocado en el rendimiento atlético), EcoCommute se enfoca en el ciudadano de a pie y el estudiante universitario en sus viajes cotidianos, eliminando la barrera de instalar una app pesada al ofrecer una solución web responsive.
- **Táctica de validación:** Capitalizar la base inicial de usuarios en campus universitarios de Lima mediante desafíos de movilidad sostenible, respaldada por la arquitectura full-stack (Angular 18 + Spring Boot 3 con 34 endpoints OpenAPI y 102 pruebas automatizadas) desplegada en GitHub Pages y Render.

## **CAPÍTULO II: REQUIREMENTS SPECIFICATION**


### **2.1 Product Backlog**

El Product Backlog de EcoCommute organiza las funcionalidades del alcance inicial de acuerdo con el valor que aportan al usuario y a la propuesta de negocio (Cohn, 2004; Schwaber & Sutherland, 2020). De acuerdo con las buenas prácticas de ingeniería de software ágil y los lineamientos del curso, el orden del Product Backlog está determinado estrictamente por el valor para el negocio y para el ciudadano (planificación de rutas sostenibles con OSRM, registro y corrección de viajes, cálculo diferencial de CO₂, recomendaciones explicadas con IA Gemini y dashboard de impacto), ubicando las historias habilitadoras de administración, registro e inicio de sesión en las posiciones posteriores.


**Tablero de Gestión del Proyecto (Trello / GitHub Projects):**

El seguimiento de historias de usuario, tareas técnicas del Sprint y control de estados se gestiona a través del tablero público del proyecto:


- Las columnas organizan las historias y tareas en: *Product Backlog*, *Sprint Backlog*, *In Progress*, *Testing/Review* y *Done*, asegurando trazabilidad con las ramas feature y Pull Requests en GitHub.



| **\# Orden** | **User Story ID** | **Título** | **Descripción** | **Criterios de aceptación** | **Story Points** | **Epic** |
| :---: | --- | --- | --- | --- | --- | --- |
| 1 | HU03 | Consulta de rutas sostenibles | Como usuario, deseo consultar rutas sostenibles entre un origen y destino en Lima para elegir una alternativa de movilidad con menor impacto ambiental. | Scenario 1 (Consulta OSRM exitosa): Given que el usuario ingresa origen, destino y perfil de movilidad (BICYCLE, WALKING, CAR), When solicita planificar la ruta (POST /api/v1/routes/plan), Then el sistema consulta OSRM y muestra las alternativas (línea base en auto, perfil estándar y corredor verde IA) con distancia en km, duración en minutos, calorías y trazado en el mapa Leaflet. Scenario 2 (Resiliencia geodésica): Given que el servicio externo OSRM presenta latencia o indisponibilidad, When se procesa la consulta, Then el sistema aplica el cálculo geodésico Haversine con factor urbano (1.32) garantizando continuidad operativa. | 8 | Movilidad sostenible |
| 2 | HU04 | Registro y corrección de viaje sostenible | Como usuario, deseo registrar un viaje realizado y poder corregirlo o eliminarlo si cometí un error para que EcoCommute mantenga mi impacto ambiental y progreso precisos. | Scenario 1 (Registro de viaje): Given que el usuario selecciona medio de transporte, origen, destino y distancia válida (> 0 km), When registra el viaje (POST /api/v1/trips), Then el sistema persiste el viaje asociado a su perfil, calcula el CO₂ ahorrado y acredita EcoPuntos. Scenario 2 (Edición o eliminación por propietario): Given que el usuario necesita corregir o eliminar un viaje que le pertenece, When invoca PUT /api/v1/trips/{id} o DELETE /api/v1/trips/{id}, Then el sistema verifica su autoría (retornando 403 Forbidden a terceros) y recalcula o revierte el CO₂ y los puntos verdes. | 5 | Viajes |
| 3 | HU05 | Cálculo de CO₂ ahorrado | Como usuario, deseo conocer el CO₂ estimado que ahorro en cada viaje sostenible para comprender mi aporte ambiental frente al uso del automóvil particular. | Scenario 1 (Cálculo diferencial EPA): Given que existe un viaje planificado o registrado con distancia en km y modalidad de transporte, When CarbonCalculatorService procesa el trayecto, Then calcula la línea base de automóvil a gasolina (170 g CO₂/km), resta la emisión del modo elegido (0 g/km en bicicleta o caminata, 65 g/km en bus, 28 g/km en tren eléctrico) y muestra el ahorro neto al usuario. | 5 | Impacto ambiental |
| 4 | HU09 | Recomendaciones con IA | Como usuario, deseo recibir una recomendación explicada sobre la ruta sostenible más conveniente para mi viaje según el contexto urbano de Lima. | Scenario 1 (Recomendación contextual con Gemini): Given que el usuario consulta rutas o revisa su dashboard con optimización IA activa, When el sistema invoca Google Gemini (gemini-1.5-flash), Then genera una recomendación en lenguaje claro basada en ciclovías, distancia, horario y CO₂ evitado. Scenario 2 (Fallback heurístico): Given que la API externa de Gemini no está disponible, When se solicita la recomendación, Then el motor heurístico contextual genera la explicación sin afectar la experiencia en Angular. | 8 | Inteligencia artificial |
| 5 | HU07 | Dashboard personal y comunitario | Como usuario, deseo visualizar mis estadísticas de movilidad junto con mi evolución temporal y reparto por medio de transporte para evaluar mi progreso ambiental. | Scenario 1 (Visualización de KPIs y gráficos): Given que el usuario ingresa al módulo /dashboard en la aplicación Angular, When se consultan GET /api/v1/dashboard/stats y /ai-insights, Then visualiza tarjetas KPI (CO₂ total evitado, distancia en km, viajes sostenibles, EcoPuntos y nivel), gráfico de barras de evolución diaria, desglose por modalidad e insights de IA. | 8 | Reportes |
| 6 | HU06 | Acumulación de puntos verdes | Como usuario, deseo recibir puntos por mis viajes sostenibles para mantener la motivación y avanzar de nivel en mi EcoPerfil. | Scenario 1 (Acreditación de EcoPuntos y nivel): Given que se registra un viaje válido con ahorro positivo de CO₂, When se procesa la recompensa (1 EcoPunto por cada 10 g de CO₂ evitado, mínimo 10 pts en modos cero emisiones y bono de +15 pts en primer viaje), Then el sistema incrementa el saldo del usuario y actualiza su nivel (Eco Starter, Urban Cyclist, Green Hero, Lima Legend). | 3 | Gamificación |
| 7 | HU08 | Ranking por distrito | Como usuario, deseo comparar mi impacto con otros usuarios de mi distrito y de Lima para participar en una competencia sana por movilidad sostenible. | Scenario 1 (Leaderboard individual y distrital): Given que existen usuarios con viajes registrados en distritos de Lima, When el usuario consulta /leaderboard (GET /api/v1/leaderboard/users y /districts), Then el sistema muestra posiciones filtrables por distrito (Miraflores, San Isidro, Surco, San Borja, Barranco) y la comparativa agregada interdistrital por CO₂ ahorrado. | 5 | Eco Identidad Urbana |
| 8 | HU10 | Desbloqueo automático de medallas | Como usuario, deseo desbloquear medallas automáticamente al alcanzar hitos de movilidad sostenible para sentir reconocimiento tangible por mis hábitos. | Scenario 1 (Evaluación automática de logros): Given que el usuario cumple la condición de una medalla al registrar un viaje (primer viaje, 3+ viajes en bici, 10 km acumulados, 5 kg de CO₂ ahorrado, 10 viajes o 500 puntos), When GamificationService evalúa los hitos, Then desbloquea la medalla automáticamente y registra la fecha de obtención. | 3 | Recompensas |
| 9 | HU11 | Consulta de medallas | Como usuario, deseo revisar mis medallas obtenidas y el catálogo de insignias disponibles para llevar control del reconocimiento ganado por mis hábitos sostenibles. | Scenario 1 (Galería de medallas en EcoPerfil): Given que el usuario accede a /gamification en la aplicación Angular, When consulta su perfil (GET /api/v1/gamification/profile), Then el sistema muestra las medallas desbloqueadas con ícono y descripción junto con las insignias pendientes por alcanzar. | 5 | Recompensas |
| 10 | HU14 | Catálogo e historial de canjes | Como usuario, deseo canjear mis EcoPuntos por beneficios sostenibles y revisar mi historial de canjes realizados para llevar control de mis cupones. | Scenario 1 (Canje transaccional y código ECO): Given que el usuario cuenta con EcoPuntos suficientes y stock disponible en /rewards, When solicita el canje (POST /api/v1/rewards/redeem), Then el sistema descuenta los puntos, reduce el stock, emite un código único (ECO-XXXXXX) y actualiza la tabla de historial (GET /api/v1/rewards/redemptions). | 3 | Recompensas |
| 11 | HU13 | Gestión y seguimiento de retos sostenibles | Como administrador o ciudadano, deseo crear y consultar retos de movilidad sostenible para incentivar metas semanales o mensuales dentro de la comunidad. | Scenario 1 (Gestión administrativa y participación): Given que el administrador autenticado (ROLE\_ADMIN) define título, meta de CO₂, recompensa en puntos y vigencia en /admin (POST/PUT/DELETE /api/v1/challenges), When guarda el reto, Then se publica en el listado activo (/gamification) donde cada ciudadano visualiza su porcentaje de avance. | 5 | Retos |
| 12 | HU12 | Gestión administrativa de recompensas | Como administrador, deseo crear, actualizar y desactivar recompensas para mantener vigente el catálogo de beneficios de EcoCommute. | Scenario 1 (CRUD protegido por ROLE\_ADMIN): Given que el administrador está autenticado con token JWT y rol ROLE\_ADMIN en /admin, When crea, modifica o elimina una recompensa (POST/PUT/DELETE /api/v1/rewards/{id}), Then el sistema persiste los cambios y bloquea con 403 Forbidden cualquier intento de mutación por usuarios sin privilegios. | 5 | Administración |
| 13 | HU01 | Registro de usuario | Como ciudadano de Lima, deseo crear una cuenta en EcoCommute indicando mi distrito para acceder a mi EcoPerfil y registrar mis viajes sostenibles. | Scenario 1 (Registro con BCrypt y validación): Given que el usuario completa nombre, correo único, contraseña segura (>= 6 caracteres), distrito de Lima y acepta los Términos y Condiciones en /login, When envía el formulario (POST /api/v1/auth/register), Then el sistema crea la cuenta con hash BCrypt, asigna el bono inicial de EcoPuntos y retorna la sesión JWT. | 5 | Gestión de usuarios |
| 14 | HU02 | Inicio de sesión seguro | Como usuario registrado, deseo iniciar sesión con mis credenciales para acceder a las funcionalidades personalizadas y protegidas de la aplicación. | Scenario 1 (Autenticación JWT stateless): Given que el usuario ingresa credenciales válidas en /login, When solicita iniciar sesión (POST /api/v1/auth/login), Then el sistema genera un token JWT firmado (HMAC-SHA256) que el interceptor Angular adjunta en cada petición. Given credenciales inválidas, Then retorna 401 Unauthorized sin exponer información sensible. | 5 | Seguridad |

### **2.1.1 Sprint Backlog**

El Sprint Backlog de EcoCommute descompone el desarrollo integral del proyecto en cuatro iteraciones (Sprints 1 y 2 correspondientes al Trabajo Parcial; Sprints 3 y 4 correspondientes al Trabajo Final), organizando el trabajo técnico mediante tareas de ingeniería estimadas entre 4 y 8 horas para Frontend Angular 18 y Backend Spring Boot 3 conforme a los estándares de la UPC.

#### **2.1.1.1 Sprint Backlog 1**

El Sprint 1 abordó la construcción del incremento funcional inicial sobre la arquitectura base de EcoCommute, implementando seguridad, cálculo de rutas sostenibles, registro de viajes, cálculo de emisiones, gamificación y dashboard.



| **US Id** | **US Title** | **Task Id** | **Task Title** | **Description** | **Est.** | **Assigned To** | **Status** |
| :---: | --- | :---: | --- | --- | :---: | --- | :---: |
| HU01 | Registro de usuario | T01 | Refinar DTO y validaciones de registro de usuario sobre la estructura base | Validación de campos obligatorios, formato de email y unicidad de cuenta | 4h | R. Condor | Done |
| HU01 | Registro de usuario | T02 | Completar el endpoint POST /api/v1/auth/register y su prueba básica | Implementación del controlador, servicio y persistencia con encriptación BCrypt | 6h | R. Condor | Done |
| HU02 | Inicio de sesión seguro | T03 | Refinar y validar Spring Security, JWT y filtros de autenticación | Configuración de filtros de autorización stateless y emisión de token JWT | 8h | R. Condor | Done |
| HU03 | Consulta de rutas sostenibles | T04 | Refinar e integrar la búsqueda de ruta y distancia con OSRM | Conexión con cliente REST OSRM para cálculo de distancia estimada y trazado | 8h | J. Ramos | Done |
| HU04 | Registro de viaje sostenible | T05 | Completar y ajustar entidades JPA y repositorios para viajes | Mapeo de entidades Trip, repositorios Spring Data y persistencia de viajes | 6h | J. Ramos | Done |
| HU05 | Cálculo de CO₂ ahorrado | T06 | Refinar y validar el servicio de cálculo de CO₂ y reglas de puntos | Lógica de cálculo comparativo de emisiones de CO₂ frente a automóvil | 6h | J. Ramos | Done |
| HU06 | Acumulación de puntos verdes | T07 | Mejorar la actualización de puntos verdes al registrar un viaje | Actualización transaccional de puntos verdes en el perfil tras el viaje | 5h | O. Alcocer | Done |
| HU07 | Dashboard personal | T08 | Extender y ajustar el dashboard con KPIs, historial y evolución | Agregación de estadísticas de CO₂ acumulado, puntos y resumen histórico | 8h | M. Mariños | Done |
| HU08 | Ranking por distrito | T09 | Mejorar el endpoint y la vista de ranking por distrito | Implementación de LeaderboardController y ordenamiento distrital | 6h | P. Espinoza | Done |
| HU09 | Recomendaciones con IA | T10 | Refinar el prompt y el servicio de recomendación con IA (Gemini) | Integración con API de Google Gemini y fallback heurístico para rutas | 6h | M. Mariños | Done |
| HU10-HU11 | Medallas por logros | T11 | Completar y validar el sistema de medallas por logros | Motor de evaluación y desbloqueo automático de medallas (UserBadge) | 8h | O. Alcocer | Done |
| General | Preparación de evidencias | T12 | Preparar capturas, pruebas funcionales y resumen de colaboración | Documentación de evidencias, capturas y preparación de reporte técnico | 6h | M. Mariños | Done |

#### **2.1.1.2 Sprint Backlog 2**

El Sprint 2 consolidó la calidad, cobertura de pruebas y acotamiento de la API REST a 25 rutas públicas, integrando las ramas feature y validando el despliegue continuo en Render.




| **Id** | **Title** | **Id** | **Title** | **Description** | **Est.** | **Assigned To** | **Status** |
| :---: | --- | :---: | --- | --- | :---: | --- | :---: |
| HU01-02 | Seguridad | T13 | Refactorizar controladores y acotar API a 25 rutas | Reducción a 24 rutas bajo /api/v1 y /health con roles USER y ADMIN | 6h | R. Condor | Done |
| HU03 | Rutas | T14 | Corregir flag optimización IA y fallback en rutas | Ajuste en RouteService para ruta optimizada con fallback heurístico | 5h | M. Mariños | Done |
| HU03 | Rutas | T15 | Pruebas de integración de rutas y OSRM (HU03) | Tests de integración en RouteController y RouteService con mock | 6h | J. Ramos | Done |
| HU04-05 | Viajes y CO₂ | T16 | Pruebas de integración de viajes y cálculo de CO₂ | Tests de integración en TripController y CarbonService con factores | 6h | J. Ramos | Done |
| HU06, 10-11 | Medallas | T17 | Validar consistencia de puntos y medallas | Pruebas de persistencia de UserStats y desbloqueo de UserBadge | 5h | O. Alcocer | Done |
| HU08, 13 | Ranking | T18 | Integrar ranking distrital y catálogo de retos | Consistencia de ordenamiento en leaderboard y catálogo de retos | 6h | P. Espinoza | Done |
| HU12, 14 | Recompensas | T19 | Pruebas de integración de recompensas y canjes | Tests de integración en RewardController para canjes y CRUD admin | 6h | D. Avalos | Done |
| Landing | Landing UI | T20 | Actualizar capturas y catálogo demo de landing | Capturas reales en GitHub Pages y textos explicativos de producto | 5h | M. Mariños | Done |
| DevOps | Pipeline | T21 | Verificar pipeline CI/CD en Render con PostgreSQL | Verificación de build automático en Render con Blueprint render.yaml | 4h | R. Condor | Done |
| QA | Pruebas | T22 | Ejecutar 28 tests en verde y sincronizar informe | Ejecución de suite de 28 tests en verde (./mvnw clean test) e informe | 5h | M. Mariños | Done |



## **CAPÍTULO III: PRODUCT DESIGN**


### **3.1 Style Guidelines**

Las guías de estilo definen los patrones visuales y componentes reutilizables del sistema de diseño para asegurar consistencia e identidad en la aplicación (Nielsen Norman Group, 2020).


#### **3.1.1 General Style Guidelines**


La identidad visual de EcoCommute se diseñó para comunicar sostenibilidad, movilidad urbana e innovación sin perder claridad funcional. La interfaz utiliza un tema oscuro por defecto, con acentos en verde esmeralda que refuerzan la asociación con movilidad sostenible y progreso ambiental.


La paleta cromática principal es una escala de verdes (desde **\#ecfdf5**, el más claro, hasta **\#022c22**, el más oscuro), con los tonos **\#10b981** y **\#34d399** como color de marca predominante en botones, íconos y elementos destacados. El fondo base de la aplicación es un azul muy oscuro casi negro (**\#060913**), sobre el cual el verde resalta con alto contraste. No se usa una paleta separada de azul y lima para distinguir movilidad y recompensas: el verde de marca cumple ambas funciones dentro de una misma identidad visual coherente.


La tipografía base es Plus Jakarta Sans para títulos y elementos destacados, e Inter como tipografía de respaldo para el resto del contenido, ambas cargadas desde Google Fonts. Los títulos emplean pesos bold o extrabold, mientras que los textos de apoyo mantienen un peso regular o medium. Los componentes visuales usan bordes redondeados, gradientes sutiles en tonos verdes y suficiente contraste sobre el fondo oscuro para facilitar la lectura en escritorio y móvil.


*Figura 1. Style Guidelines de EcoCommute.*

#### **3.1.2 Web Style Guidelines**


Para el producto completo del Trabajo Final, la aplicación web principal está implementada y desplegada con Angular 18 (Standalone Components), TypeScript, Angular Material y Leaflet 1.9 (https://lappwv.github.io/eco-commute/app/), manteniendo un diseño responsive, soporte bilingüe en vivo (es\_419/en\_US), accesibilidad WCAG 2.1 AA y selector de tema claro/oscuro, complementada por la landing page pública en HTML5, CSS3 y JavaScript (https://lappwv.github.io/eco-commute/). Los botones principales se reservan para acciones críticas como iniciar sesión, calcular ruta con OSRM+IA, registrar o editar un viaje y canjear recompensas, y los secundarios para acciones de consulta o filtrado.


El formulario de registro e inicio de sesión en AuthComponent (/login) solicita nombre, correo, contraseña segura, distrito de Lima Metropolitana y aceptación de Términos y Condiciones, e incorpora botones de acceso demostrativo en 1 clic para los roles ROLE\_USER y ROLE\_ADMIN. Los campos muestran etiquetas accesibles y validaciones reactivas inmediatas.


La navegación principal del alcance inicial se organiza en Rutas, Impacto y Ranking, más una vista adicional de Administración visible solo para usuarios con rol administrador. Esta estructura permite que el usuario entienda rápidamente dónde planificar y comparar un viaje, dónde revisar su impacto acumulado (CO2 ahorrado, distancia, medallas) y dónde compararse con otros usuarios. En dispositivos móviles, la navegación se adapta a un menú compacto para mantener el mapa y el contenido principal visibles.


#### **3.1.3 Términos y Condiciones de Servicio**

La plataforma incluye términos y condiciones de servicio enlazados en el pie de página (footer) de la landing page y de la aplicación web. El texto estipula la protección de datos personales de los usuarios registrados, el uso ético y anónimo de los datos de desplazamiento urbano y la exención de responsabilidad en rutas, rigiéndose bajo los principios del código de ética en ingeniería de software de ACM/IEEE y del Colegio de Ingenieros del Perú (CIP).


#### **3.1.4 Internacionalización y Accesibilidad (i18n & a11y)**

- **Internacionalización (i18n):** La solución contempla soporte multilingüe en dos idiomas: Español de Latinoamérica (`es_419`) como idioma nativo e Inglés (`en_US`) como alternativa internacional, estructurado mediante diccionarios JSON de traducción y selectores en el encabezado.
- **Accesibilidad (a11y):** La interfaz web sigue las directrices WCAG 2.1 nivel AA, empleando contrastes superiores a 4.5:1 en elementos interactivos, etiquetas semánticas HTML5, configuración de atributos ARIA (`aria-label`, `role`, `aria-live`) para tecnologías asistivas y navegación completa por teclado.


### **3.2 Landing Page UI Design**


La landing page tiene como objetivo presentar EcoCommute de forma clara y persuasiva para usuarios nuevos. Su primera pantalla comunica la propuesta de valor: moverse por Lima de manera sostenible, medir el CO₂ ahorrado y recibir recompensas por hábitos responsables. La página evita una composición de marketing genérica y se enfoca en mostrar de inmediato el beneficio principal del producto.


#### **3.2.1 Landing Page Wireframe**


*Figura 2. Wireframe de la landing page de EcoCommute.*


#### **3.2.2 Landing Page Mock-up**


El mock-up aplica la identidad visual de EcoCommute sobre el wireframe. La propuesta utiliza fondo oscuro, botones verdes, métricas destacadas y una visualización de ruta para reforzar la idea de movilidad sostenible. La comunicación inicial se centra en el usuario y en el beneficio tangible: convertir su impacto ambiental en puntos, logros y recompensas.



*Figura 3. Mock-up de la landing page de EcoCommute.*


### **3.3 Web Applications UX/UI Design**


El diseño de la aplicación web se orienta a un alcance inicial viable para el curso. Las pantallas principales cubren autenticación, planificación y comparación de rutas sostenibles, dashboard de impacto acumulado, reconocimiento por medallas y ranking por distrito. Esta selección permite demostrar la propuesta innovadora sin depender de un catálogo de recompensas externas en la primera versión.


#### **3.3.1 Web Applications Mock-ups**


Los mock-ups de la aplicación muestran las pantallas centrales que permiten validar la experiencia del usuario. La pantalla de acceso representa el uso de JWT y Spring Security; Google OAuth2 queda como alternativa prevista para una iteración posterior. La vista de Rutas permite ingresar origen y destino, elegir el medio de transporte y comparar alternativas sostenibles con ayuda de IA (Gemini). La vista de Impacto presenta el CO2 ahorrado, los puntos y las medallas obtenidas por el usuario. La vista de Ranking refuerza la gamificación comparando el impacto entre usuarios de un mismo distrito.



*Figura 4. Mock-ups principales de la aplicación web EcoCommute.*



*Figura 5. Mock-up del dashboard principal de EcoCommute.*


#### **3.3.2 Web Applications Wireflow Diagrams**


El wireflow organiza los recorridos principales del usuario dentro de la aplicación mediante pantallas, estados de interfaz, decisiones y caminos alternativos. El primer flujo cubre acceso seguro, validación de credenciales y llegada al dashboard. El segundo flujo representa la búsqueda de ruta sostenible, disponibilidad de alternativas, registro del viaje, cálculo de CO₂ y actualización de puntos. El tercer flujo cubre el reconocimiento por medallas: el sistema evalúa si el usuario cumple la condición de una medalla al registrar un viaje, y en caso afirmativo la desbloquea automáticamente y la agrega a su perfil; si aún no la cumple, el usuario continúa registrando viajes en Rutas.


Estos flujos permiten validar que la experiencia del alcance inicial sea coherente de inicio a fin y contemplan situaciones reales como credenciales inválidas, rutas no disponibles o condiciones de medalla aún no alcanzadas. También ayudan a identificar qué pantallas son necesarias para implementar el CRUD del proyecto y qué datos deben viajar entre frontend, backend y base de datos.


*Figura 6. Wireflow de los flujos principales de EcoCommute.*


### **3.4 Database Design**


El diseño de base de datos se elaboró para soportar autenticación, registro de viajes, cálculo de CO2 e impacto acumulado, y reconocimiento por medallas. La propuesta se basa en las entidades JPA reales del backend: usuario, viaje, medalla, la relación entre usuario y medalla, las estadísticas acumuladas del usuario, y una tabla de factores de emisión de CO2 por medio de transporte.


#### **3.4.1 Database Diagram**


El diagrama de base de datos representa las relaciones principales del sistema. La tabla User se relaciona de 1 a N con Trip (los viajes registrados), de 1 a 1 con UserStats (sus estadísticas acumuladas), y de 1 a N con UserBadge, que a su vez se relaciona de N a 1 con Badge (las medallas disponibles). La tabla EmissionFactor funciona como catálogo de referencia, con el factor de gramos de CO2 por kilómetro según el medio de transporte usado en cada viaje. Esta estructura permite calcular el impacto ambiental de cada viaje, acumular estadísticas por usuario y desbloquear medallas automáticamente según los logros alcanzados.*Figura 7. Diagrama de base de datos de EcoCommute.*


El modelo implementado está compuesto por nueve tablas: users, trips, user\_stats, badges, user\_badges, rewards, redemptions, challenges y emission\_factors. La tabla users se relaciona de 1 a N con trips, de 1 a 1 con user\_stats y de 1 a N con user\_badges, que a su vez se relaciona de N a 1 con badges; redemptions se relaciona de N a 1 con users y con rewards. emission\_factors y challenges funcionan como catálogos sin clave foránea: trips.transport\_mode referencia de forma lógica a emission\_factors.transport\_mode para calcular el CO₂ por kilómetro. El entorno de desarrollo y las pruebas usan H2 en memoria y producción usa PostgreSQL administrado en Render, con backend en Spring Boot, autenticación JWT, control de acceso con Spring Security y cifrado de contraseñas con BCrypt. Google OAuth2 queda considerado para una iteración posterior.





## CAPÍTULO IV: PRODUCT IMPLEMENTATION, VALIDATION & DEPLOYMENT


### 4.1 Software Deployment Configuration


El backend de EcoCommute está desplegado en la nube con Render (plan gratuito, sin costo), desde el repositorio oficial https://github.com/lappwv/eco-commute. El despliegue se configura mediante el Blueprint render.yaml ubicado en la raíz del repositorio, que crea automáticamente el servicio web ecocommute-backend —un contenedor Docker construido desde backend/Dockerfile con Java 21 y Spring Boot 3.3.3— y una base de datos PostgreSQL administrada denominada ecocommute-db.


La configuración del Blueprint inyecta JWT\_SECRET (generada por Render), DB\_HOST, DB\_PORT, DB\_NAME, SPRING\_DATASOURCE\_USERNAME y SPRING\_DATASOURCE\_PASSWORD. La aplicación acepta además la variable PORT mediante su configuración de Spring Boot. El esquema se crea o actualiza al arrancar mediante spring.jpa.hibernate.ddl-auto=update, por lo que no es necesario ejecutar scripts SQL manualmente. El servicio expone GET /health como chequeo de salud para Render.


**URL pública del backend:** [https://ecocommute-backend-a14m.onrender.com](https://ecocommute-backend-a14m.onrender.com/). La landing page permanece publicada de forma independiente en GitHub Pages: [https://lappwv.github.io/eco-commute/](https://lappwv.github.io/eco-commute/)


**Repositorio principal:** [https://github.com/lappwv/eco-commute.](https://github.com/lappwv/eco-commute) La configuración de desarrollo utiliza Git y GitHub para el control de versiones, con un flujo por features mediante ramas feature/\* y Pull Requests según CONTRIBUTING.md. La arquitectura objetivo del producto contempla Angular + TypeScript + Angular Material para la aplicación web principal. Para el Trabajo Final, el frontend implementado comprende tanto la aplicación web SPA completa en Angular 18 + TypeScript + Angular Material + Leaflet (desplegada en https://lappwv.github.io/eco-commute/app/) como la landing page pública responsive (https://lappwv.github.io/eco-commute/), mientras que el backend utiliza Java 21, Spring Boot 3.3.3, Spring Security, Spring Data JPA, JWT y Maven con 34 endpoints documentados en OpenAPI 3.0 y 102 pruebas automatizadas en verde. PostgreSQL es la base de datos de producción administrada por Render; Docker + Render se utilizan para el despliegue del backend y GitHub Pages para la landing. La API integra OSRM para el cálculo de rutas y Gemini cuando se configura la clave correspondiente.



### 4.2 Landing Page, Services & Applications Implementation

A lo largo de las cuatro iteraciones del proyecto (Sprints 1, 2, 3 y 4) se implementó, integró y desplegó en producción la arquitectura full-stack completa de EcoCommute: (1) la Landing Page pública bilingüe en GitHub Pages (https://lappwv.github.io/eco-commute/), (2) el Backend RESTful en Spring Boot 3.3.3 + PostgreSQL 16 en Render (https://ecocommute-backend-a14m.onrender.com/swagger-ui.html) con 34 endpoints documentados en OpenAPI 3.0 y 102 pruebas automatizadas en verde, y (3) la Aplicación Web SPA en Angular 18 + TypeScript + Angular Material + Leaflet (https://lappwv.github.io/eco-commute/app/) que materializa las 14 Historias de Usuario (HU01 a HU14) de extremo a extremo.


#### **4.2.1 Sprint 1**

El Sprint 1 se enfocó en consolidar el primer incremento funcional de EcoCommute. Rodrigo Condor preparó inicialmente la arquitectura base y la estructura del backend en Spring Boot; posteriormente, las funcionalidades se distribuyeron por ramas de características (feature/\*) para que los integrantes implementaran y completaran los módulos asignados de acuerdo con la propuesta de valor del producto.

##### 4.2.1.1 Sprint Backlog 1

Se organizó el trabajo mediante tareas técnicas de desarrollo asignadas individualmente:




| **US Id** | **US Title** | **Task Id** | **Task Title** | **Description** | **Est.** | **Assigned To** | **Status** |
| :---: | --- | :---: | --- | --- | :---: | --- | :---: |
| HU01 | Registro de usuario | T01 | Refinar DTO y validaciones de registro de usuario sobre la estructura base | Validación de campos obligatorios, formato de email y unicidad de cuenta | 4h | R. Condor | Done |
| HU01 | Registro de usuario | T02 | Completar el endpoint POST /api/v1/auth/register y su prueba básica | Implementación del controlador, servicio y persistencia con encriptación BCrypt | 6h | R. Condor | Done |
| HU02 | Inicio de sesión seguro | T03 | Refinar y validar Spring Security, JWT y filtros de autenticación | Configuración de filtros de autorización stateless y emisión de token JWT | 8h | R. Condor | Done |
| HU03 | Consulta de rutas sostenibles | T04 | Refinar e integrar la búsqueda de ruta y distancia con OSRM | Conexión con cliente REST OSRM para cálculo de distancia estimada y trazado | 8h | J. Ramos | Done |
| HU04 | Registro de viaje sostenible | T05 | Completar y ajustar entidades JPA y repositorios para viajes | Mapeo de entidades Trip, repositorios Spring Data y persistencia de viajes | 6h | J. Ramos | Done |
| HU05 | Cálculo de CO₂ ahorrado | T06 | Refinar y validar el servicio de cálculo de CO₂ y reglas de puntos | Lógica de cálculo comparativo de emisiones de CO₂ frente a automóvil | 6h | J. Ramos | Done |
| HU06 | Acumulación de puntos verdes | T07 | Mejorar la actualización de puntos verdes al registrar un viaje | Actualización transaccional de puntos verdes en el perfil tras el viaje | 5h | O. Alcocer | Done |
| HU07 | Dashboard personal | T08 | Extender y ajustar el dashboard con KPIs, historial y evolución | Agregación de estadísticas de CO₂ acumulado, puntos y resumen histórico | 8h | M. Mariños | Done |
| HU08 | Ranking por distrito | T09 | Mejorar el endpoint y la vista de ranking por distrito | Implementación de LeaderboardController y ordenamiento distrital | 6h | P. Espinoza | Done |
| HU09 | Recomendaciones con IA | T10 | Refinar el prompt y el servicio de recomendación con IA (Gemini) | Integración con API de Google Gemini y fallback heurístico para rutas | 6h | M. Mariños | Done |
| HU10-HU11 | Medallas por logros | T11 | Completar y validar el sistema de medallas por logros | Motor de evaluación y desbloqueo automático de medallas (UserBadge) | 8h | O. Alcocer | Done |
| General | Preparación de evidencias | T12 | Preparar capturas, pruebas funcionales y resumen de colaboración | Documentación de evidencias, capturas y preparación de reporte técnico | 6h | M. Mariños | Done |



##### **4.2.1.2 Development Evidence for Sprint Review**

Como evidencia de desarrollo del Sprint 1 se cuenta con los commits registrados en el repositorio oficial de GitHub ([eco-commute](https://github.com/lappwv/eco-commute)) organizados mediante una estrategia de desarrollo por ramas de características (feature branches) y Git Flow (Driessen, 2020), incluyendo el PR \#1.



| **Repository** | **Branch** | **Commit Id** | **Commit Message** | **Commit Message Body** | **Committed on** |
| --- | --- | --- | --- | --- | --- |
| lappwv/eco-commute | feature/auth | 99f80ef | feat(auth): exigir letra y numero en la contrasena de registro HU01 | @lappwv (R. Condor): Validación de contraseñas complejas | 02/10/2026 |
| lappwv/eco-commute | feature/auth | 8e1473a | fix(auth): devolver 401 en credenciales invalidas HU02 | @lappwv (R. Condor): Retorno de 401 en credenciales inválidas | 02/10/2026 |
| lappwv/eco-commute | feature/auth | 3c0f56d | fix(auth): hacer null-safe la validacion del JWT | @lappwv (R. Condor): Manejo null-safe de tokens JWT en filtro | 02/10/2026 |
| lappwv/eco-commute | feature/auth | 2025569 | docs(auth): documentar respuestas de Swagger para register/login HU01 | @lappwv (R. Condor): Documentación Swagger para autenticación | 02/10/2026 |
| lappwv/eco-commute | feature/auth | 3a3ac81 | test(auth): cubrir credenciales invalidas, password debil y login HU02 | @lappwv (R. Condor): Pruebas de integración de seguridad | 02/10/2026 |
| lappwv/eco-commute | feature/trips | 04b68c2 | fix(routes): respeta flag de optimización IA HU03 | @jsramos0712 (J. Ramos): Integración y trazado de rutas OSRM | 04/10/2026 |
| lappwv/eco-commute | feature/stats-badges | 802e685 | feat(stats): add environmental equivalents and dedicated StatsController (HU07) | @MrOdar (O. Alcocer): Puntos verdes y equivalencias de CO₂ | 01/10/2026 |
| lappwv/eco-commute | feature/challenges-leaderboard | 2f52419 | feat(leaderboard): soporte de ordenamiento por puntos y filtro por distrito | @paulollito29-sketch (P. Espinoza): Ordenamiento distrital HU08 | 03/10/2026 |
| lappwv/eco-commute | feature/rewards | 9a12e4f | Feature/rewards | @DevAvalos (D. Avalos): Modelo y lógica de recompensas HU12 | 04/10/2026 |
| lappwv/eco-commute | feature/dashboard-ia | 5140853 | feat(dashboard): documentar summary y community-impact HU07 | @mbtibs357 (M. Mariños): Dashboard e integración IA Gemini HU09 | 04/10/2026 |

##### **4.2.1.3 Execution Evidence for Sprint Review**

El producto dispone de dos URL públicas activas para evidenciar su funcionamiento:

- **Landing page responsive:** Publicada en GitHub Pages ([EcoCommute Landing](https://lappwv.github.io/eco-commute/)), permitiendo validar la presentación de la propuesta de valor, beneficios ecológicos y mock-ups.
- **Backend API REST:** Desplegado en la nube de Render ([EcoCommute API](https://ecocommute-backend-a14m.onrender.com/health)), permitiendo verificar el estado operativo del servicio y la interacción con los endpoints de autenticación, rutas, viajes, emisiones, gamificación y dashboard.



##### **4.2.1.4 Services Documentation Evidence for Sprint Review**

El backend incluye la dependencia `springdoc-openapi-starter-webmvc-ui 2.6.0`, exponiendo la documentación interactiva Swagger UI en [Swagger UI](https://ecocommute-backend-a14m.onrender.com/swagger-ui.html), donde se documentan contratos, esquemas JSON de entrada y salida, códigos de estado HTTP y requerimientos de autorización Bearer Token.

##### **4.2.1.5 Software Deployment Evidence for Sprint Review**

La infraestructura está configurada como código mediante el Blueprint `render.yaml` en la raíz del repositorio, orquestando un servicio web contenedorizado con Docker (Java 21 / Spring Boot 3.3.3) y una base de datos gestionada PostgreSQL (`ecocommute-db`). Cada push a `main` activa un webhook de despliegue continuo automático.

##### **4.2.1.6 Team Collaboration Insights during Sprint**

La estrategia de colaboración se estructuró a partir de una arquitectura base preparada por Rodrigo Condor, distribuyendo el desarrollo en ramas `feature/*` independientes. Cada integrante realizó commits periódicos, sometiendo sus cambios a revisiones de código entre pares antes de la integración a la rama principal.


#### **4.2.2 Sprint 2**

El Sprint 2 se centró en la consolidación técnica, aseguramiento de la calidad, acotamiento riguroso de la API REST a 25 rutas expuestas (24 en /api/v1 y /health), diseño e implementación de pruebas de integración automatizadas y verificación integral del despliegue en producción.

##### **4.2.2.1 Sprint Backlog 2**

Las tareas técnicas ejecutadas para consolidar el incremento fueron:




| **Id** | **Title** | **Id** | **Title** | **Description** | **Est.** | **Assigned To** | **Status** |
| :---: | --- | :---: | --- | --- | :---: | --- | :---: |
| HU01-02 | Seguridad | T13 | Refactorizar controladores y acotar API a 25 rutas | Reducción a 24 rutas bajo /api/v1 y /health con roles USER y ADMIN | 6h | R. Condor | Done |
| HU03 | Rutas | T14 | Corregir flag optimización IA y fallback en rutas | Ajuste en RouteService para ruta optimizada con fallback heurístico | 5h | M. Mariños | Done |
| HU03 | Rutas | T15 | Pruebas de integración de rutas y OSRM (HU03) | Tests de integración en RouteController y RouteService con mock | 6h | J. Ramos | Done |
| HU04-05 | Viajes y CO₂ | T16 | Pruebas de integración de viajes y cálculo de CO₂ | Tests de integración en TripController y CarbonService con factores | 6h | J. Ramos | Done |
| HU06, 10-11 | Medallas | T17 | Validar consistencia de puntos y medallas | Pruebas de persistencia de UserStats y desbloqueo de UserBadge | 5h | O. Alcocer | Done |
| HU08, 13 | Ranking | T18 | Integrar ranking distrital y catálogo de retos | Consistencia de ordenamiento en leaderboard y catálogo de retos | 6h | P. Espinoza | Done |
| HU12, 14 | Recompensas | T19 | Pruebas de integración de recompensas y canjes | Tests de integración en RewardController para canjes y CRUD admin | 6h | D. Avalos | Done |
| Landing | Landing UI | T20 | Actualizar capturas y catálogo demo de landing | Capturas reales en GitHub Pages y textos explicativos de producto | 5h | M. Mariños | Done |
| DevOps | Pipeline | T21 | Verificar pipeline CI/CD en Render con PostgreSQL | Verificación de build automático en Render con Blueprint render.yaml | 4h | R. Condor | Done |
| QA | Pruebas | T22 | Ejecutar 28 tests en verde y sincronizar informe | Ejecución de suite de 28 tests en verde (./mvnw clean test) e informe | 5h | M. Mariños | Done |


##### **4.2.2.2 Development Evidence for Sprint Review**

Como evidencia de desarrollo del Sprint 2 se cuenta con el historial de Pull Requests y commits integrados en GitHub ([eco-commute Pull Requests](https://github.com/lappwv/eco-commute/pulls?q=is%3Apr+is%3Aclosed)):


- **PR \#1 (feature/auth) - @lappwv (Rodrigo Condor):** Validación de autenticación y seguridad JWT.
- **PR \#2 (refactor/reduce-api-surface) - @lappwv (Rodrigo Condor):** Reducción de la API a 25 rutas expuestas.
- **PR \#3 (docs/sync-current-tp-report) - @mbtibs357 (Matías Mariños):** Sincronización del informe técnico y landing.
- **PR \#4 (feature/challenges-leaderboard) - @paulollito29-sketch (Paulo Espinoza):** Ranking distrital y retos.
- **PR \#5 (feature/trips) - @jsramos0712 (Jeampiero Ramos):** Pruebas de rutas OSRM, viajes y cálculo de CO₂.
- **PR \#6 (feature/rewards) - @DevAvalos (Diego Avalos):** Pruebas del controlador de recompensas.
- **PR \#7 (feature/stats-badges) - @MrOdar (Odar Alcocer):** Automatización de medallas y puntos verdes.
- **PR \#8 (feature/dashboard-ia) - @mbtibs357 (Matías Mariños):** Dashboard personal y recomendación con IA.



| **Repository** | **Branch** | **Commit Id** | **Commit Message** | **Commit Message Body** | **Committed on** |
| --- | --- | --- | --- | --- | --- |
| lappwv/eco-commute | refactor/reduce-api-surface | 7c39e88 | refactor(api): reduce exposed endpoints to TP core scope | PR \#2 - @lappwv (R. Condor): Acota API a 25 rutas para TP | 03/10/2026 |
| lappwv/eco-commute | refactor/reduce-api-surface | 542ef25 | test(security): align authorization tests with reduced API surface | PR \#2 - @lappwv (R. Condor): Pruebas de autorización por rol | 03/10/2026 |
| lappwv/eco-commute | docs/sync-current-tp-report | ba4b592 | docs(report): add current TP report markdown | PR \#3 - @mbtibs357 (M. Mariños): Sincronización de informe TP | 03/10/2026 |
| lappwv/eco-commute | feature/challenges-leaderboard | 3b89a01 | feat(leaderboard): ranking por distrito, filtros y documentacion HU08 | PR \#4 - @paulollito29-sketch (P. Espinoza): Leaderboard HU08 | 03/10/2026 |
| lappwv/eco-commute | feature/challenges-leaderboard | 9f61831 | chore(build): asegurar permisos de ejecucion en mvnw | PR \#4 - @paulollito29-sketch (P. Espinoza): Compatibilidad build | 03/10/2026 |
| lappwv/eco-commute | feature/trips | 7244791 | test(trips): valida registro e historial HU04 | PR \#5 - @jsramos0712 (J. Ramos): Tests en TripControllerTest | 04/10/2026 |
| lappwv/eco-commute | feature/trips | d29ebee | test(carbon): valida factores y ahorro CO2 HU05 | PR \#5 - @jsramos0712 (J. Ramos): Tests en CarbonServiceTest | 04/10/2026 |
| lappwv/eco-commute | feature/trips | a3999e3 | test(routes): valida alternativas y fallback OSRM HU03 | PR \#5 - @jsramos0712 (J. Ramos): Tests en RouteServiceTest | 04/10/2026 |
| lappwv/eco-commute | feature/rewards | b4f3a29 | test(rewards): agrega pruebas de integracion del controller | PR \#6 - @DevAvalos (D. Avalos): Tests en RewardController | 04/10/2026 |
| lappwv/eco-commute | feature/stats-badges | 4c710ab | feat(gamification): validación y automatización de HU06, HU10 y HU11 | PR \#7 - @MrOdar (O. Alcocer): Persistencia de medallas | 04/10/2026 |
| lappwv/eco-commute | feature/stats-badges | 9a432f4 | refactor(gamification): align HU06, HU10, HU11 without extra routes | PR \#7 - @MrOdar (O. Alcocer): Validación en API acotada | 04/10/2026 |
| lappwv/eco-commute | feature/dashboard-ia | 2e859d3 | refactor(dashboard-ia): refine trend accuracy and unify CO2 constants | PR \#8 - @mbtibs357 (M. Mariños): Precisión de métricas CO₂ | 04/10/2026 |
| lappwv/eco-commute | feature/dashboard-ia | e61fb71 | test(ia): validar Gemini, fallback heuristico y hora punta de Lima (HU09) | PR \#8 - @mbtibs357 (M. Mariños): Pruebas de integración Gemini | 04/10/2026 |
| lappwv/eco-commute | feature/dashboard-ia | c759d32 | test(dashboard): validar summary, 401, community-impact (HU07) | PR \#8 - @mbtibs357 (M. Mariños): Tests de KPIs de dashboard | 04/10/2026 |

##### **4.2.2.3 Execution Evidence for Sprint Review**

La validación integral del incremento funcional se respaldó en tres evidencias de ejecución:

- **Ejecución local automatizada:** Ejecución del comando `./mvnw clean test` arrojando un total de **28 pruebas automatizadas en verde** (0 fallas, 0 errores), abarcando pruebas de controladores, servicios de cálculo de CO₂, seguridad JWT, OSRM y validación de modelos.
- **Ambiente productivo en Render:** Monitoreo del endpoint `GET https://ecocommute-backend-a14m.onrender.com/health` retornando `{"status":"UP"}` y autenticación exitosa mediante `POST /api/v1/auth/login`, validando la conectividad con la base de datos PostgreSQL en la nube.
- **Landing page en GitHub Pages:** Acceso público y operativo en `https://lappwv.github.io/eco-commute/`, con catálogo de impacto visual y contenido demostrativo sincronizado.


##### **4.2.2.4 Services Documentation Evidence for Sprint Review**

La especificación OpenAPI / Swagger UI en `https://ecocommute-backend-a14m.onrender.com/swagger-ui.html` refleja con exactitud las 25 rutas activas del sistema, incluyendo esquemas DTO, validaciones de campos, códigos HTTP de respuesta (200, 201, 400, 401, 403, 404) y autenticación mediante JWT Bearer.



| **Módulo** | **Método** | **Ruta del Endpoint** | **HU** | **Descripción de Servicio** |
| --- | :---: | --- | :---: | --- |
| Autenticación | POST | /api/v1/auth/register | HU01 | Registro de nuevos usuarios con contraseña cifrada en BCrypt. |
| Autenticación | POST | /api/v1/auth/login | HU02 | Autenticación y generación de token JWT Bearer (HMAC-SHA256). |
| Rutas | POST | /api/v1/routes/plan | HU03 | Planificación y consulta geoespacial de rutas optimizadas (OSRM) con fallback de Haversine. |
| Viajes | POST | /api/v1/trips | HU04, 05 | Registro transaccional de viajes y cálculo de CO₂ ahorrado (EPA). |
| Viajes | GET | /api/v1/trips/history | HU04 | Historial de viajes realizados por el usuario autenticado (extraído vía token JWT). |
| Viajes | GET | /api/v1/trips/{id} | HU04 | Detalle y métricas de emisiones de un viaje específico. |
| Gamificación | GET | /api/v1/gamification/stats | HU06 | Saldo de puntos verdes y total CO₂ con bloqueo @Version. |
| Gamificación | GET | /api/v1/gamification/milestones | HU10 | Progreso porcentual y estado de hitos personales. |
| Gamificación | GET | /api/v1/gamification/badges | HU11 | Medallas desbloqueadas del usuario con fecha de obtención. |
| Gamificación | GET | /api/v1/gamification/badges/catalog | HU11 | Catálogo general de insignias e hitos disponibles. |
| Leaderboard | GET | /api/v1/leaderboard/districts | HU08 | Ranking distrital (GROUP BY) con Spring Data Projections. |
| Leaderboard | GET | /api/v1/leaderboard/districts/summary | HU08 | Resumen consolidado de métricas distritales y vecinos activos. |
| Leaderboard | GET | /api/v1/leaderboard/users | HU06, 08 | Tabla de posiciones de usuarios por puntos acumulados. |
| Recompensas | GET | /api/v1/rewards | HU12 | Catálogo público de recompensas y beneficios activos. |
| Recompensas | GET | /api/v1/rewards/{id} | HU12 | Detalle de recompensa, puntos requeridos y stock disponible. |
| Recompensas (Admin) | POST | /api/v1/admin/rewards | HU12 | Creación de recompensas en catálogo protegida por rol (@PreAuthorize('hasRole(ADMIN)')). |
| Recompensas (Admin) | PUT | /api/v1/admin/rewards/{id} | HU12 | Actualización de stock o condiciones de recompensa para administrador (ADMIN). |
| Recompensas | POST | /api/v1/rewards/{rewardId}/redeem | HU14 | Canje atómico transaccional (REPEATABLE\_READ) y emisión de cupón. |
| Recompensas | GET | /api/v1/redemptions | HU14 | Historial de canjes y cupones del usuario autenticado vía JWT. |
| Retos | GET | /api/v1/challenges | HU13 | Listado de retos y desafíos comunitarios activos. |
| Retos | GET | /api/v1/challenges/{id} | HU13 | Detalle y porcentaje de avance de un reto colectivo. |
| Retos (Admin) | POST | /api/v1/admin/challenges | HU13 | Creación de nuevo reto comunitario de reducción de CO₂ protegida por rol (ADMIN). |
| Dashboard | GET | /api/v1/dashboard/summary | HU07 | Resumen personal unificado de impacto, viajes y balance. |
| Dashboard | GET | /api/v1/dashboard/recommendations | HU09 | Recomendaciones ecológicas con Google Gemini 1.5 Flash e IA fallback. |
| Infraestructura | GET | /health | RNF | Verificación de salud y uptime de backend y PostgreSQL en Render. |

##### **4.2.2.5 Software Deployment Evidence for Sprint Review**

El despliegue en Render se encuentra completamente automatizado mediante el archivo `render.yaml`. Cada integración de Pull Request a la rama `main` dispara automáticamente la construcción del contenedor Docker (`ecocommute-backend`) y la sincronización con la base de datos PostgreSQL administrada (`ecocommute-db`), asegurando disponibilidad continua y sin costo bajo el plan gratuito de Render.

##### **4.2.2.6 Team Collaboration Insights during Sprint**

Durante el Sprint 2, el equipo perfeccionó la metodología de trabajo colaborativo basada en GitHub Flow. Se implementó la revisión cruzada obligatoria de Pull Requests antes de cada merge a `main`, lo que permitió detectar discrepancias en los controladores, estandarizar formatos de respuesta DTO y asegurar que ningún código fuera incorporado sin superar exitosamente las 28 pruebas unitarias y de integración.


### 4.3 Validation Interviews

#### **4.3.1 Diseño de Entrevistas**

El diseño de entrevistas cualitativas para EcoCommute tiene como propósito validar de manera directa y empírica las hipótesis de valor planteadas en el Lean UX Canvas con usuarios potenciales en Lima Metropolitana que no conocen el proyecto de manera previa. Se busca comprender el comportamiento actual de los ciudadanos durante sus desplazamientos cotidianos, evaluar la relevancia de la problemática identicada y analizar la aceptación de las funcionalidades clave del producto.

**Objetivos de la entrevista:**

- Comprender los criterios de decisión principales (tiempo, costo, comodidad, impacto ambiental) al elegir un medio de transporte para traslados diarios.
- Identificar el nivel de consciencia ambiental y la disponibilidad de información al momento de realizar desplazamientos en la ciudad.
- Evaluar la percepción de valor y la reacción inmediata ante la propuesta de EcoCommute (comparación de CO₂ emitido vs. ahorrado, recomendaciones con IA y sistema de medallas/recompensas).
- Determinar la intención de uso de una aplicación web responsive para el seguimiento y gamificación de la movilidad sostenible.

**Perfil del entrevistado:**

- **Residencia y entorno:** Ciudadanos residentes en Lima Metropolitana que realizan desplazamientos frecuentes (al menos 3 a 5 veces por semana) hacia centros laborales o de estudio.
- **Edad y ocupación:** Jóvenes y adultos entre 18 y 45 años (estudiantes universitarios, técnicos y trabajadores activos).
- **Uso de tecnología:** Usuarios habituales de teléfonos inteligentes y aplicaciones de mapas, navegación o movilidad urbana.
- **Condición previa:** Personas sin conocimiento previo de la existencia o marca de EcoCommute para garantizar objetividad en las respuestas.

**Guía estructurada de preguntas:**

**1. Introducción y contexto diario**

- ¿Qué medios de transporte utilizas habitualmente para trasladarte a tu trabajo, universidad o actividades diarias en Lima?
- ¿Cuánto tiempo promedio inviertes en tus desplazamientos cotidianos y con qué frecuencia realizas estos recorridos?
- ¿Qué factores influyen principalmente al momento de decidir el medio de transporte que vas a utilizar en un día determinado (tiempo, costo, comodidad, tráfico, seguridad)?

**2. Exploración de la problemática**

- Cuando utilizas un vehículo particular, taxi o transporte público, ¿alguna vez consideras la cantidad de emisiones de CO₂ o el impacto ambiental que genera ese viaje?
- ¿Has utilizado o intentado utilizar alternativas más sostenibles como bicicleta, caminata o rutas compartidas? Si la respuesta es negativa o esporádica, ¿qué impedimentos o desincentivos encuentras?
- ¿Las herramientas digitales de navegación que usas actualmente (como Google Maps o Waze) te brindan información sobre el impacto ambiental de tus opciones de ruta?

**3. Presentación y reacción ante la solución**

- Si una plataforma te mostrara en tiempo real la comparación directa de CO₂ emitido y CO₂ ahorrado entre tu viaje en auto y alternativas sostenibles (bicicleta/caminata), ¿crees que afectaría tu decisión sobre cómo trasladarte?
- ¿Qué opinas de recibir sugerencias de ruta personalizadas generadas por Inteligencia Artificial que consideren tu historial, tiempos y beneficios ecológicos?
- ¿Qué valor le otorgas a acumular puntos verdes y desbloquear medallas por tus logros sostenibles? ¿Te motivaría esto a mantener el hábito de movilidad ecológica a lo largo del tiempo?

**4. Cierre y disposición de uso**

- ¿Estarías dispuesto a utilizar una aplicación web sin necesidad de instalar una app nativa pesada para planificar y registrar tus viajes cotidianos?
- ¿Qué funcionalidad de las presentadas consideras absolutamente indispensable para que comiences a utilizar EcoCommute desde el primer día?

#### 4.3.2 Registro de Entrevistas

#### 4.3.3 Evaluaciones segun heuristicas

### 4.4 Video About-the-Product

## Conclusiones

A partir del desarrollo full-stack completado en los Sprints 1, 2, 3 y 4 y de la validación empírica con usuarios de los dos segmentos objetivo en Lima Metropolitana, se establecen las siguientes conclusiones contrastadas con los Problem Statements, Assumptions e Hypothesis Statements del proceso Lean UX (Capítulo I):



## Recomendaciones

Con el producto full-stack implementado, validado y desplegado al 100


## Video About-the-Team

## Bibliografía

Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley Professional.

Driessen, V. (2020). *A successful Git branching model*. nvie.com. [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

Google. (2024). *Gemini API Documentation: Text generation and multimodal models*. Google AI for Developers. [https://ai.google.dev/docs/gemini\_api](https://ai.google.dev/docs/gemini_api)

Gothelf, J., & Seiden, J. (2021). *Lean UX: Designing Great Products with Agile Teams* (3.ª ed.). O'Reilly Media.

Luxen, D., & Vetter, C. (2011). Real-time routing with OpenStreetMap data. En *Proceedings of the 19th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems* (pp. 513–516). [https://doi.org/10.1145/2093973.2094062](https://doi.org/10.1145/2093973.2094062)

Naciones Unidas. (2018). *La Agenda 2030 y los Objetivos de Desarrollo Sostenible: una oportunidad para América Latina y el Caribe* (LC/G.2681-P/Rev.3). Comisión Económica para América Latina y el Caribe (CEPAL). [https://repositorio.cepal.org/handle/11362/40155](https://repositorio.cepal.org/handle/11362/40155)

Nielsen Norman Group. (2020). *Design Systems 101: Components, Pattern Libraries, and Style Guides*. [https://www.nngroup.com/articles/design-systems-101/](https://www.nngroup.com/articles/design-systems-101/)

Pivotal Software. (2024). *Spring Boot Reference Documentation (Version 3.3.3)*. VMware Tanzu. [https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/)

Progressa Lean. (2020). *5W2H: Metodología para la identificación y resolución de problemas*. [https://www.progressalean.com/5w2h-tecnica-de-analisis-de-problemas/](https://www.progressalean.com/5w2h-tecnica-de-analisis-de-problemas/)

Schwaber, K., & Sutherland, J. (2020). *La Guía de Scrum: Las Reglas del Juego*. Scrum.org. [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html)

Sommerville, I. (2016). *Ingeniería del Software* (10.ª ed.). Pearson Educación.

## Anexos


