/**
 * EcoCommute Landing Page — 3D Spatial Terrarium, Botanical Ornaments,
 * Interactive Exploded Stack, Circular Recycling Alchemy Lab & i18n (es_419 / en_US)
 */

const CORRIDORS = {
  miraflores: {
    km: 4.2,
    coords: "-12.1219, -77.0297",
    bikeMin: 14,
    carMin: 22,
    originTag: "ORIGEN // MIRAFLORES",
    destTag: "META // SAN ISIDRO",
    carPath: "M 38 94 C 120 98, 165 28, 250 45 C 310 55, 345 32, 382 36",
    ecoPath: "M 38 94 C 110 86, 155 60, 225 58 C 295 56, 330 40, 382 36",
    es: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "«Por la ciclovía de Av. Arequipa llegas en 14 min sin congestión vehicular, ahorras 638 g de CO₂ frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.»"
    },
    en: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "“Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of CO₂ vs. driving (152 g/km) and earning Miraflores leaderboard points.”"
    }
  },
  upc: {
    km: 5.8,
    coords: "-12.1041, -76.9629",
    bikeMin: 19,
    carMin: 31,
    originTag: "ORIGEN // UPC MONTERRICO",
    destTag: "META // SAN BORJA",
    carPath: "M 38 96 C 95 42, 190 98, 275 40 C 325 24, 355 50, 382 30",
    ecoPath: "M 38 96 C 115 76, 185 66, 260 50 C 315 38, 350 34, 382 30",
    es: {
      routeTitle: "UPC Monterrico → San Borja",
      gemini:
        "«Conectando Av. Primavera con el eje ciclista de San Borja evitas el cuello de botella de Panamericana Sur, ahorras 882 g de CO₂ y desbloqueas progreso en el reto universitario.»"
    },
    en: {
      routeTitle: "UPC Monterrico → San Borja",
      gemini:
        "“Connecting Av. Primavera to San Borja's cycling network avoids the Panamericana Sur bottleneck, saving 882 g of CO₂ and advancing your campus challenge.”"
    }
  },
  jesusmaria: {
    km: 3.6,
    coords: "-12.0686, -77.0414",
    bikeMin: 12,
    carMin: 19,
    originTag: "ORIGEN // JESÚS MARÍA",
    destTag: "META // LINCE",
    carPath: "M 38 46 C 110 24, 195 92, 280 76 C 330 66, 355 84, 382 70",
    ecoPath: "M 38 46 C 115 50, 195 56, 275 62 C 325 66, 355 68, 382 70",
    es: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "«El corredor arbolado de Av. Salaverry ofrece sombra continua y pendiente plana: evitas 547 g de CO₂ y llegas 7 minutos antes que en auto particular.»"
    },
    en: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "“The tree-lined Av. Salaverry corridor provides continuous shade and flat terrain: you avoid 547 g of CO₂ and arrive 7 minutes faster than driving.”"
    }
  },
  barranco: {
    km: 2.9,
    coords: "-12.1497, -77.0219",
    bikeMin: 10,
    carMin: 16,
    originTag: "ORIGEN // BARRANCO",
    destTag: "META // MIRAFLORES",
    carPath: "M 38 98 C 130 102, 210 78, 290 62 C 340 50, 360 36, 382 28",
    ecoPath: "M 38 98 C 105 70, 180 44, 265 36 C 325 30, 355 28, 382 28",
    es: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "«Bordeando el Malecón Paul Harris y Cisneros pedaleas con brisa marina sin cruces semafóricos pesados, dejando de emitir 441 g de CO₂ en un trayecto corto.»"
    },
    en: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "“Riding along the Malecón coastal path gives you ocean breeze and zero heavy intersections, avoiding 441 g of CO₂ on a quick coastal commute.”"
    }
  }
};

const STACK_LAYERS = {
  4: {
    es: {
      title: "Capa 04: Dosel de Interacción (React 18 + Leaflet)",
      desc: "Renderiza la cartografía abierta de Lima sobre OpenStreetMap, traza corredores ciclistas y peatonales sin rastreo invasivo y traduce instantáneamente entre Español e Inglés.",
      artifact: "RoutePlannerView.tsx + MapCanvas",
      sla: "60 FPS · WCAG AA · Sin telemetría oculta"
    },
    en: {
      title: "Layer 04: Interaction Canopy (React 18 + Leaflet)",
      desc: "Renders Lima's open cartography over OpenStreetMap, plots cycling and walking corridors without invasive tracking, and switches seamlessly between Spanish and English.",
      artifact: "RoutePlannerView.tsx + MapCanvas",
      sla: "60 FPS · WCAG AA · Zero hidden tracking"
    }
  },
  3: {
    es: {
      title: "Capa 03: Clorofila Cognitiva (Google Gemini 1.5 Flash + CarbonService)",
      desc: "Evalúa determinísticamente el ahorro de carbono (152 g CO₂/km frente al auto) y genera explicaciones contextuales con gemini-1.5-flash y fallback heurístico resiliente.",
      artifact: "AiRouteAdvisorService.java + CarbonService.java",
      sla: "Modelo: gemini-1.5-flash · Fallback 100% disponible"
    },
    en: {
      title: "Layer 03: Cognitive Chlorophyll (Google Gemini 1.5 Flash + CarbonService)",
      desc: "Deterministically computes carbon savings (152 g CO₂/km vs. car) and generates contextual route advice with gemini-1.5-flash and resilient heuristic fallback.",
      artifact: "AiRouteAdvisorService.java + CarbonService.java",
      sla: "Model: gemini-1.5-flash · 100% Fallback uptime"
    }
  },
  2: {
    es: {
      title: "Capa 02: Tallo Transaccional REST (Spring Boot 3.2 + 25 Endpoints)",
      desc: "Orquesta autenticación stateless con JWT, registro de viajes, cálculo de Puntos Verdes, medallas automáticas, retos semanales y ranking distrital de Lima.",
      artifact: "TripController + GamificationController + SecurityConfig",
      sla: "25 Rutas OpenAPI 3.0 · 28/28 Tests en Verde"
    },
    en: {
      title: "Layer 02: Transactional REST Stem (Spring Boot 3.2 + 25 Endpoints)",
      desc: "Orchestrates stateless JWT authentication, trip logging, Green Points accounting, automated milestone badges, weekly challenges, and Lima's district leaderboard.",
      artifact: "TripController + GamificationController + SecurityConfig",
      sla: "25 OpenAPI 3.0 Routes · 28/28 Passing Tests"
    }
  },
  1: {
    es: {
      title: "Capa 01: Raíz de Persistencia Concurrente (PostgreSQL 16 + Liquibase)",
      desc: "Garantiza integridad transaccional con aislamiento REPEATABLE_READ y control de concurrencia optimista (@Version) en user_stats para evitar condiciones de carrera.",
      artifact: "UserStats.java (@Version) + db.changelog-master.yaml",
      sla: "ACID · REPEATABLE_READ · Ley N° 29733"
    },
    en: {
      title: "Layer 01: Concurrent Persistence Root (PostgreSQL 16 + Liquibase)",
      desc: "Guarantees transactional integrity with REPEATABLE_READ isolation and optimistic concurrency locking (@Version) on user_stats to prevent race conditions.",
      artifact: "UserStats.java (@Version) + db.changelog-master.yaml",
      sla: "ACID · REPEATABLE_READ · Law N° 29733"
    }
  }
};

const translations = {
  es_419: {
    // Meta & topbar
    "page.title": "EcoCommute — Terrario Urbano 3D y Movilidad Circular en Lima",
    "nav.skip": "Saltar al contenido principal",
    "topbar.badge": "TERRARIO URBANO 3D · LIMA METROPOLITANA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 endpoints activos",
    "topbar.recycled_label": "CO₂ RECICLADO:",
    "topbar.swagger": "Swagger OpenAPI",
    "biome.amancaes": "Amancaes",
    "biome.terracota": "Solar",
    "biome.micelio": "Micelio",
    "nav.aria": "Navegación principal",
    "nav.vr": "VR 360°",
    "nav.cycle": "Fotosíntesis Urbana",
    "nav.alchemy": "Terrario & Alquimia",
    "nav.why": "Manifiesto",
    "nav.features": "Capas 3D",
    "nav.screens": "Interfaz",
    "nav.team": "Equipo",
    "nav.pollinate": "Polinizar",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero
    "hero.kicker": "Lima · ODS 11 · Meta 11.2 · Ingeniería de Sistemas UPC",
    "hero.title": "Antes de subirte al auto, ",
    "hero.title_em": "recicla el CO₂ que aún no has emitido.",
    "hero.lead":
      "EcoCommute convierte el gris del asfalto limeño en un ecosistema vivo: compara tu ruta en bici, a pie o en auto con OSRM, explica la decisión con Google Gemini 1.5 Flash y transforma el humo evitado en biomasa digital, equivalentes de reciclaje PET y recompensas reales.",
    "hero.flora_tag": "ÍNDICE DE CLOROFILA DE TU SESIÓN EN VIVO",
    "hero.btn_vr": "Entrar a VR 360°",
    "hero.btn_simulator": "Abrir Terrario & Alquimia CO₂",
    "hero.btn_cycle": "Explorar Capas 3D",
    "hero.btn_screens": "Ver las pantallas →",
    "hero.stat1_label": "Emisión evitada vs. auto",
    "hero.stat2_label": "Equivalencia circular",
    "hero.stat2_unit": "botellas PET/km",
    "hero.stat3_label": "Backend verificado",
    "hero.stat3_unit": "tests en verde",
    "hero.card_label": "BIORREACTOR DE RUTA 3D · DEMO INTERACTIVA",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "En auto (combustión)",
    "hero.car_val": "640 g de CO₂",
    "hero.bike": "En bicicleta / a pie",
    "hero.bike_val": "0 g de CO₂",
    "hero.points": "Tu saldo circular",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot":
      "Así se ve cada viaje registrado en la app. Los factores de emisión están configurados por la aplicación, no los pone el usuario.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "CÁMARA ESPACIAL:",
    "sim.cam_iso": "Isométrica 3D",
    "sim.cam_orbit": "Vuelo de Ave",
    "sim.cam_flat": "Cenital 2D",
    "sim.by_bike": "en bici",
    "sim.by_car_traffic": "en auto (hora punta)",
    "sim.adjust_distance": "Ajustar distancia del corredor ecológico",
    "sim.pet_equiv_label": "Reciclaje equivalente evitado",
    "sim.gemini_tag": "GEMINI 1.5 FLASH · EXPLICACIÓN CONTEXTUAL",
    "sim.gemini_miraflores":
      "«Por la ciclovía de Av. Arequipa llegas en 14 min sin congestión vehicular, ahorras 638 g de CO₂ frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.»",
    "sim.btn_recycle_trip": "Sembrar y reciclar este viaje en el contador global",

    // VR 360° & Interactive 3D EcoCube
    "vr.title": "Pedalea en primera persona por el bioma circular de Lima en Realidad Virtual",
    "vr.intro":
      "Arrastra con el mouse para girar tu cabeza 360°, usa las teclas WASD/Flechas o activa el Modo Visor Estereoscópico (Doble Lente SBS / Meta Quest / Google Cardboard) mientras atraviesas anillos de captura de CO₂ (-152 g/km).",
    "vr.status_ready": "WEBXR & 360° POV ACTIVO // ARRASTRA PARA MIRAR",
    "vr.hud_speed": "VELOCIDAD:",
    "vr.hud_heading": "RUMBO 360°:",
    "vr.hud_rings": "ANILLOS CO₂ CAPTURADOS:",
    "vr.hint_drag":
      "🖱️ ARRASTRA EN 360° PARA MIRAR ALREDEDOR · HAZ CLIC EN LOS CRISTALES 3D · ⌨️ WASD / FLECHAS",
    "vr.world1": "🌲 Bosque El Olivar (San Isidro)",
    "vr.world2": "🌊 Malecón Costero (Miraflores)",
    "vr.world3": "⚡ Túnel Botánico Av. Arequipa",
    "vr.world4": "🎓 Corredor UPC Monterrico",
    "vr.pedal_cadence": "CADENCIA DE PEDALEO VR",
    "vr.btn_stereo": "Modo Visor Estereoscópico (Doble Lente SBS)",
    "vr.btn_boost": "Impulso Solar (+Velocidad)",
    "vr.btn_gyro": "Giroscopio 360°",
    "vr.btn_fullscreen": "Inmersión Total VR / WebXR",
    "cube.f1": "Captura de CO₂",
    "cube.f2": "Ruteo Abierto",
    "cube.f3": "1.5 Flash",
    "cube.f4": "82.8g / Botella",
    "cube.f5": "Bioma Lima",
    "cube.f6": "Tests Spring",
    "cube.hint": "✋ ARRASTRA EL CUBO 3D EN CUALQUIER DIRECCIÓN",
    "cube.kicker": "OBJETO VOLUMÉTRICO 3D MANIPULABLE EN TIEMPO REAL",
    "cube.title": "Biocubo Holográfico de Telemetría Circular",
    "cube.desc":
      "Gira libremente el prisma 3D con el puntero, enfoca cualquiera de sus 6 caras técnicas o activa la vista explosionada para abrir el cristal de clorofila interior.",
    "cube.btn_explode": "Explotar / Expandir Caras en 3D",
    "cube.btn_spin": "Órbita Automática 3D",

    // Circular Scrollytelling
    "cycle.title": "Cómo transmutamos el humo urbano en vida ecológica",
    "cycle.intro":
      "Reciclar en la ciudad no es solo separar plástico o vidrio: es impedir que el carbono fósil entre a la atmósfera de Lima y transformarlo en energía comunitaria.",
    "cycle.badge1": "Intercepción de combustión",
    "cycle.badge2": "Conversión en puntos verdes",
    "cycle.badge3": "Recompensas y bioma circular",
    "cycle.mode_orbit": "🌿 Órbita Clorofila",
    "cycle.mode_vortex": "🌀 Vórtice Polinizador",
    "cycle.mode_mycelium": "🍄 Red de Micelio",
    "cycle.btn_pulse": "Inyectar Pulso de Fotosíntesis (+152 g CO₂)",
    "cycle.s1_tag": "INTERCEPCIÓN EN EL ORIGEN",
    "cycle.s1_title": "Sustituir combustión por tracción limpia antes de girar la llave",
    "cycle.s1_desc":
      "Un automóvil promedio en el tráfico de Lima emite 152 gramos de CO₂ por cada kilómetro. Cuando eliges bicicleta o caminata en EcoCommute, ese carbono se «recicla» preventivamente: nunca llega al aire de tu distrito.",
    "cycle.s2_tag": "REFINACIÓN CON OSRM + GEMINI 1.5 FLASH",
    "cycle.s2_title": "Los datos geográficos crudos se transforman en inteligencia accionable",
    "cycle.s2_desc":
      "Nuestro backend en Spring Boot procesa las coordenadas de forma efímera sobre OpenStreetMap (OSRM), valida el ahorro con CarbonService y utiliza Google Gemini 1.5 Flash para explicarte por qué esa ruta ciclista o peatonal optimiza tu tiempo y tu salud.",
    "cycle.s3_tag": "ECONOMÍA CIRCULAR DISTRITAL",
    "cycle.s3_title": "El carbono evitado regresa a ti como puntos, medallas y bosque urbano",
    "cycle.s3_desc":
      "Cada gramo ahorrado alimenta tu cuenta de Puntos Verdes, desbloquea medallas automáticas al superar hitos y posiciona a tu distrito (Miraflores, San Isidro, Surco, Barranco, Jesús María) en el ranking metropolitano sostenible.",

    // Alchemy Lab & Terrarium
    "alchemy.title": "¿A cuánto reciclaje físico y biomasa equivale dejar el auto en Lima?",
    "alchemy.intro":
      "Un gramo de CO₂ es invisible; una botella PET reciclada, una lata de aluminio recuperada o una flor de Amancaes brotando en nuestro domo se pueden ver y tocar.",
    "alchemy.p1": "🌱 Brote Urbano (3 días/sem)",
    "alchemy.p2": "🌿 Commuter UPC (5 días/sem)",
    "alchemy.p3": "🌳 Guardián del Bosque (7 días/sem)",
    "alchemy.slider_trips": "Viajes sostenibles por semana",
    "alchemy.slider_km": "Distancia media por trayecto",
    "alchemy.terrarium_label": "DOMO BIOMECÁNICO · GERMINACIÓN EN VIVO",
    "alchemy.btn_plant": "Plantar Semilla de Amancaes en el Terrario",
    "alchemy.annual_saved_label": "CARBONO ANUAL QUE NO ENTRARÁ AL AIRE DE LIMA",
    "alchemy.card1_title": "Botellas plásticas PET recicladas",
    "alchemy.card1_desc":
      "Equivalente en huella de carbono evitada al reciclar botellas de 500 ml (82.8 g CO₂ evitados por envase recuperado).",
    "alchemy.card2_title": "Latas de aluminio fundidas en frío",
    "alchemy.card2_desc":
      "Ahorro energético equivalente a recuperar latas de bebidas frente a producir aluminio primario desde bauxita (170 g CO₂/lata).",
    "alchemy.card3_title": "Árboles adultos absorbiendo 1 año",
    "alchemy.card3_desc":
      "Cantidad de árboles urbanos maduros trabajando durante 365 días para fijar el mismo volumen de carbono (21 kg CO₂/año).",
    "alchemy.card4_title": "Puntos Verdes canjeables en catálogo",
    "alchemy.card4_desc":
      "Saldo acumulado en tu perfil de EcoCommute para desbloquear mantenimientos de bici, café orgánico aliado y accesorios reciclados.",

    // Solution / Story
    "story.title": "Por qué existe",
    "story.sidebar_note":
      "Lima pierde más de 150 horas al año por ciudadano en congestión vehicular, mientras las emisiones de transporte urbano siguen siendo invisibles en las apps tradicionales.",
    "story.p1":
      "En Lima la decisión de cómo movernos se toma por rapidez, costo o costumbre. Nadie ve cuánto CO₂ produce el trayecto que acaba de elegir, y las herramientas de mapas simplemente comparten tiempo y tráfico: el impacto ambiental queda fuera de la pantalla.",
    "story.p2_pre": "Lo que falta no es otro mapa. Falta ver el costo ambiental de la decisión ",
    "story.p2_under": "antes",
    "story.p2_post":
      " de tomarla, y algo que te haga querer repetir la alternativa buena la semana siguiente. Eso es lo que intentamos construir.",
    "story.comp_old_tag": "Apps de mapas tradicionales (Modelo Extractivo Lineal)",
    "story.comp_old_desc":
      "Solo muestran minutos estimados y congestión. El impacto de carbono es invisible y el viaje termina en humo sin retorno.",
    "story.comp_new_tag": "Enfoque EcoCommute (Bioma Circular Regenerativo)",
    "story.comp_new_desc":
      "Contrasta gramos de CO₂ antes de salir, explica por qué te conviene la ruta con IA y recicla tu constancia en puntos y comunidad.",
    "story.quote":
      "«Si el ahorro de CO₂ se ve igual de concreto que los minutos del viaje, la gente lo considera.»",
    "story.quote_author": "— El equipo EcoCommute, probando la app con usuarios en Lima",

    // Exploded 3D Stack & Features
    "feat.title": "Qué hace hoy (y cómo late por dentro)",
    "feat.intro":
      "Despliega las 4 capas del ecosistema en el espacio 3D o explora los módulos en producción respaldados por 28 tests automáticos.",
    "stack.kicker": "INSPECTOR ESTRATIGRÁFICO 3D INTERACTIVO",
    "stack.slider_z": "Separación Espacial Eje-Z (Exploded View)",
    "stack.slider_rot": "Rotación Azimutal de Cámara 3D",
    "stack.btn_pulse": "Transmitir Pulso de Savia por las 4 Capas 3D",
    "feat.routes_title": "Rutas sostenibles y Google Gemini",
    "feat.routes_desc":
      "Introduces el origen y el destino y la app arma alternativas con OSRM: qué tan lejos es, cuánto tarda cada medio de transporte y qué te conviene según tu historial. La recomendación asistida por Inteligencia Artificial (Google Gemini 1.5 Flash) explica en lenguaje simple por qué sugiere esa ruta.",
    "feat.trips_title": "Viajes y cálculo de CO₂",
    "feat.trips_desc":
      "Registras el viaje y la app calcula el CO₂ ahorrado frente al auto (152 g CO₂/km ahorrados) y los puntos verdes que ganas.",
    "feat.dash_title": "Dashboard de impacto",
    "feat.dash_desc":
      "CO₂ acumulado, distancia recorrida, evolución semanal, árboles equivalentes salvados e historial de viajes en gráficos legibles.",
    "feat.rank_title": "Ranking distrital",
    "feat.rank_desc":
      "Compara tu impacto ecológico con ciclistas y peatones de tu distrito en Lima para fortalecer la comunidad activa.",
    "feat.badges_title": "Medallas y recompensas",
    "feat.badges_desc":
      "Las medallas se desbloquean automáticamente al alcanzar hitos ecológicos; los puntos se canjean por recompensas sostenibles.",
    "feat.challenges_title": "Retos semanales",
    "feat.challenges_desc":
      "Desafíos mensuales y metas sostenibles administradas dinámicamente desde el panel de gestión para sostener el hábito.",

    // Badges / ODS Callout
    "ods.title": "Alineados con el ODS 11 (Meta 11.2) e Inteligencia Artificial",
    "ods.desc":
      "EcoCommute responde de manera directa al Objetivo de Desarrollo Sostenible 11 de la ONU (Meta 11.2: Proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos). Además, optimizamos la toma de decisiones con Google Gemini 1.5 Flash para brindar explicaciones contextuales.",
    "ods.badge_ods": "ODS 11 · Meta 11.2: Movilidad Sostenible",
    "ods.badge_ai": "Optimización con IA · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Ruteo Open Source OSRM",

    // Screenshots
    "demo.title": "Cómo se ve",
    "demo.tab_all": "Vista comparativa 3D",
    "demo.tab_routes": "Planificador y Mapa",
    "demo.tab_dash": "Dashboard de Impacto",
    "demo.img1_alt": "Mockup interactivo de rutas sostenibles con mapas y alternativas en Lima",
    "demo.cap1":
      "Planificación de rutas sostenibles con ubicación, medios de transporte, alternativas y optimización asistida por Google Gemini.",
    "demo.img2_alt": "Mockup del dashboard de impacto ecológico con CO2 y estadísticas",
    "demo.cap2":
      "Dashboard de impacto con CO₂ ahorrado, viajes, árboles equivalentes, medallas e historial.",

    // Impact
    "impact.title": "Estamos alineados con la Meta 11.2 del ODS 11",
    "impact.desc":
      "Transporte seguro, accesible, asequible y sostenible para todas las personas. El usuario transforma su huella de carbono en progreso visible, y la gamificación (retos, medallas y rankings) está para sostener el hábito más allá de la primera semana.",
    "impact.p1": "Emisiones directas en bicicleta o caminata",
    "impact.p2": "Privacidad por diseño sin rastreo en segundo plano",
    "impact.p3": "Cartografía abierta sobre OpenStreetMap",

    // Team
    "team.title": "Quiénes lo hacemos",
    "team.intro":
      "Seis estudiantes de Ingeniería de Sistemas de la UPC, NRC 8247, Ciclo 2026-2. Cada quien una parte del producto; todo el proceso en el repositorio.",
    "team.member1_role": "IA y recomendaciones de ruta",
    "team.member2_role": "Rutas, dashboard y medallas",
    "team.member3_role": "Entidades, viajes y cálculo de CO₂",
    "team.member4_role": "Puntos verdes y ranking",
    "team.member5_role": "Seguridad, JWT y registro",
    "team.member6_role": "Documentación, evidencias y landing",

    // Contact
    "contact.title": "Pruébalo y cuéntanos",
    "contact.intro":
      "Si algo no te convence o tienes una idea para Lima, escríbenos: leemos todo.",
    "contact.github": "Código en GitHub",
    "contact.swagger": "API & Swagger en Render",
    "contact.linkedin": "EcoCommute en LinkedIn",

    // Footer & Legal
    "footer.academic": "EcoCommute · Trabajo Parcial de Aplicaciones Web (UPC 2026-2)",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",

    // Modal
    "modal.title": "Términos de Servicio y Privacidad — EcoCommute",
    "modal.close": "Cerrar ventana modal",
    "modal.intro": "Compromiso ético, legal y ambiental del proyecto EcoCommute:",
    "modal.p1":
      "<strong>Protección de Datos:</strong> Cumplimos estrictamente la Ley N° 29733 (Perú). Tus coordenadas se procesan de forma efímera para calcular rutas y ahorro de CO₂; no rastreamos en segundo plano ni comercializamos datos.",
    "modal.p2":
      "<strong>Ruteo Abierto e IA:</strong> Empleamos OSRM sobre OpenStreetMap y Google Gemini 1.5 Flash para recomendaciones transparentes y sin sesgo comercial.",
    "modal.p3":
      "<strong>Ética Profesional:</strong> El desarrollo se rige bajo los Códigos de Ética de Software ACM/IEEE y el Código Deontológico del Colegio de Ingenieros del Perú (CIP), priorizando el interés público y la movilidad sostenible.",
    "modal.full_link": "Abrir página completa de Términos y Condiciones →"
  },

  en_US: {
    // Meta & topbar
    "page.title": "EcoCommute — 3D Urban Terrarium & Circular Mobility in Lima",
    "nav.skip": "Skip to main content",
    "topbar.badge": "3D URBAN TERRARIUM · LIMA METROPOLITAN AREA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 active endpoints",
    "topbar.recycled_label": "RECYCLED CO₂:",
    "topbar.swagger": "Swagger OpenAPI",
    "biome.amancaes": "Amancaes",
    "biome.terracota": "Solar Clay",
    "biome.micelio": "Mycelium",
    "nav.aria": "Main navigation",
    "nav.vr": "VR 360°",
    "nav.cycle": "Urban Photosynthesis",
    "nav.alchemy": "Terrarium & Alchemy",
    "nav.why": "Manifesto",
    "nav.features": "3D Strata",
    "nav.screens": "Interface",
    "nav.team": "Team",
    "nav.pollinate": "Pollinate",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero
    "hero.kicker": "Lima · SDG 11 · Target 11.2 · UPC Systems Engineering",
    "hero.title": "Before taking your car, ",
    "hero.title_em": "recycle the CO₂ you haven't emitted yet.",
    "hero.lead":
      "EcoCommute turns Lima's asphalt gray into a living ecosystem: it compares your bike, walk, or car route via OSRM, explains the choice with Google Gemini 1.5 Flash, and transforms avoided exhaust into digital biomass, PET recycling equivalents, and real rewards.",
    "hero.flora_tag": "LIVE SESSION CHLOROPHYLL INDEX",
    "hero.btn_vr": "Enter 360° VR",
    "hero.btn_simulator": "Open Terrarium & CO₂ Alchemy",
    "hero.btn_cycle": "Explore 3D Strata",
    "hero.btn_screens": "View Screenshots →",
    "hero.stat1_label": "Avoided vs. car",
    "hero.stat2_label": "Circular equivalence",
    "hero.stat2_unit": "PET bottles/km",
    "hero.stat3_label": "Verified backend",
    "hero.stat3_unit": "passing tests",
    "hero.card_label": "3D ROUTE BIOREACTOR · INTERACTIVE DEMO",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "By Car (combustion)",
    "hero.car_val": "640 g of CO₂",
    "hero.bike": "By Bicycle / Walking",
    "hero.bike_val": "0 g of CO₂",
    "hero.points": "Your circular balance",
    "hero.points_val": "+15 green points",
    "hero.card_foot":
      "This is how every logged commute looks in the app. Carbon emission factors are strictly configured by the system.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "SPATIAL CAMERA:",
    "sim.cam_iso": "3D Isometric",
    "sim.cam_orbit": "Bird's-Eye",
    "sim.cam_flat": "2D Zenith",
    "sim.by_bike": "by bike",
    "sim.by_car_traffic": "by car (rush hour)",
    "sim.adjust_distance": "Adjust ecological corridor distance",
    "sim.pet_equiv_label": "Equivalent recycling avoided",
    "sim.gemini_tag": "GEMINI 1.5 FLASH · CONTEXTUAL INSIGHT",
    "sim.gemini_miraflores":
      "“Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of CO₂ vs. driving (152 g/km) and earning Miraflores leaderboard points.”",
    "sim.btn_recycle_trip": "Plant & recycle this trip into global counter",

    // VR 360° & Interactive 3D EcoCube
    "vr.title": "Ride first-person through Lima's circular biome in Virtual Reality",
    "vr.intro":
      "Drag with your mouse to look around 360°, steer with WASD/Arrow keys, or activate Stereoscopic Headset Mode (Side-by-Side Dual Lens / Meta Quest / Google Cardboard) while passing through CO₂ capture rings (-152 g/km).",
    "vr.status_ready": "WEBXR & 360° POV ACTIVE // DRAG TO LOOK AROUND",
    "vr.hud_speed": "SPEED:",
    "vr.hud_heading": "360° HEADING:",
    "vr.hud_rings": "CAPTURED CO₂ RINGS:",
    "vr.hint_drag":
      "🖱️ DRAG 360° TO LOOK AROUND · CLICK 3D CRYSTALS TO HARVEST · ⌨️ WASD / ARROWS",
    "vr.world1": "🌲 El Olivar Forest (San Isidro)",
    "vr.world2": "🌊 Coastal Malecón (Miraflores)",
    "vr.world3": "⚡ Av. Arequipa Botanical Tunnel",
    "vr.world4": "🎓 UPC Monterrico Corridor",
    "vr.pedal_cadence": "VR PEDAL CADENCE",
    "vr.btn_stereo": "Stereoscopic Headset Mode (Dual SBS Lens)",
    "vr.btn_boost": "Solar Boost (+Speed)",
    "vr.btn_gyro": "360° Gyroscope",
    "vr.btn_fullscreen": "Full Immersion VR / WebXR",
    "cube.f1": "CO₂ Capture",
    "cube.f2": "Open Routing",
    "cube.f3": "1.5 Flash",
    "cube.f4": "82.8g / Bottle",
    "cube.f5": "Lima Biome",
    "cube.f6": "Spring Tests",
    "cube.hint": "✋ DRAG THE 3D CUBE IN ANY DIRECTION",
    "cube.kicker": "REAL-TIME MANIPULABLE 3D VOLUMETRIC ARTIFACT",
    "cube.title": "Holographic Circular Telemetry Biocube",
    "cube.desc":
      "Freely rotate the 3D prism with your pointer, focus any of its 6 technical faces, or trigger the exploded view to reveal the inner chlorophyll crystal.",
    "cube.btn_explode": "Explode / Expand Faces in 3D",
    "cube.btn_spin": "3D Auto-Orbit",

    // Circular Scrollytelling
    "cycle.title": "How we transmute urban exhaust into ecological life",
    "cycle.intro":
      "Urban recycling isn't just sorting plastic or glass: it's preventing fossil carbon from entering Lima's atmosphere and turning it into community energy.",
    "cycle.badge1": "Combustion interception",
    "cycle.badge2": "Green points conversion",
    "cycle.badge3": "Rewards & circular biome",
    "cycle.mode_orbit": "🌿 Chlorophyll Orbit",
    "cycle.mode_vortex": "🌀 Pollinator Vortex",
    "cycle.mode_mycelium": "🍄 Mycelium Lattice",
    "cycle.btn_pulse": "Inject Photosynthesis Pulse (+152 g CO₂)",
    "cycle.s1_tag": "SOURCE INTERCEPTION",
    "cycle.s1_title": "Replacing combustion with human traction before turning the key",
    "cycle.s1_desc":
      "An average passenger car in Lima traffic emits 152 grams of CO₂ per kilometer. When you choose cycling or walking in EcoCommute, that carbon is preventively recycled—it never enters your district's air.",
    "cycle.s2_tag": "REFINING WITH OSRM + GEMINI 1.5 FLASH",
    "cycle.s2_title": "Raw geographic telemetry becomes actionable urban intelligence",
    "cycle.s2_desc":
      "Our Spring Boot backend processes coordinates ephemerally over OpenStreetMap (OSRM), validates savings via CarbonService, and uses Google Gemini 1.5 Flash to explain why that cycling or walking corridor optimizes your time and health.",
    "cycle.s3_tag": "DISTRICT CIRCULAR ECONOMY",
    "cycle.s3_title": "Avoided carbon returns to you as points, medals, and urban forest",
    "cycle.s3_desc":
      "Every gram saved feeds your Green Points balance, unlocks automated milestone medals, and elevates your Lima district (Miraflores, San Isidro, Surco, Barranco, Jesús María) on the metropolitan leaderboard.",

    // Alchemy Lab & Terrarium
    "alchemy.title": "How much physical recycling and biomass does leaving your car equal?",
    "alchemy.intro":
      "A gram of CO₂ is invisible; a recycled PET bottle, a recovered aluminum can, or an Amancaes flower sprouting inside our dome can be seen and touched.",
    "alchemy.p1": "🌱 Urban Sprout (3 days/wk)",
    "alchemy.p2": "🌿 UPC Commuter (5 days/wk)",
    "alchemy.p3": "🌳 Forest Guardian (7 days/wk)",
    "alchemy.slider_trips": "Sustainable trips per week",
    "alchemy.slider_km": "Average distance per trip",
    "alchemy.terrarium_label": "BIOMECHANICAL DOME · LIVE GERMINATION",
    "alchemy.btn_plant": "Plant Amancaes Seed in Terrarium",
    "alchemy.annual_saved_label": "ANNUAL CARBON KEPT OUT OF LIMA'S AIR",
    "alchemy.card1_title": "Recycled 500ml PET plastic bottles",
    "alchemy.card1_desc":
      "Equivalent carbon footprint avoided by recycling 500 ml PET bottles (82.8 g CO₂ avoided per recovered container).",
    "alchemy.card2_title": "Cold-recovered aluminum cans",
    "alchemy.card2_desc":
      "Energy savings equivalent to recycling beverage cans instead of smelting primary aluminum from bauxite (170 g CO₂/can).",
    "alchemy.card3_title": "Mature urban trees absorbing for 1 year",
    "alchemy.card3_desc":
      "Number of mature urban trees working 365 days to sequester the same volume of atmospheric carbon (21 kg CO₂/year).",
    "alchemy.card4_title": "Redeemable Green Points",
    "alchemy.card4_desc":
      "Balance earned in your EcoCommute profile to unlock bike tune-ups, organic partner coffee, and upcycled accessories.",

    // Solution / Story
    "story.title": "Why it exists",
    "story.sidebar_note":
      "Lima commuters lose over 150 hours a year to traffic congestion, while urban transport emissions remain invisible in conventional navigation apps.",
    "story.p1":
      "In Lima, travel choices are made solely by speed, cost, or habit. Nobody sees the carbon footprint of their route, and map engines only display traffic times: environmental impact is left invisible.",
    "story.p2_pre": "We do not need another generic map. We need to visualize the environmental cost of our choice ",
    "story.p2_under": "before",
    "story.p2_post":
      " making it, and provide incentives to repeat sustainable habits the next week. That is what we are building.",
    "story.comp_old_tag": "Traditional map apps (Linear Extractive Model)",
    "story.comp_old_desc":
      "Only display estimated minutes and traffic congestion. Carbon impact is invisible and the trip ends in unrecovered exhaust.",
    "story.comp_new_tag": "The EcoCommute approach (Regenerative Circular Biome)",
    "story.comp_new_desc":
      "Contrasts grams of CO₂ before you depart, explains why the route fits you with AI, and recycles consistency into points and community.",
    "story.quote":
      "“If carbon savings are presented as clearly as travel minutes, citizens genuinely take them into account.”",
    "story.quote_author": "— The EcoCommute Team, testing the prototype with urban commuters in Lima",

    // Exploded 3D Stack & Features
    "feat.title": "What works today (and how it breathes inside)",
    "feat.intro":
      "Expand the 4 ecosystem strata in 3D space or explore the production modules backed by 28 automated tests.",
    "stack.kicker": "INTERACTIVE 3D STRATIGRAPHIC INSPECTOR",
    "stack.slider_z": "Z-Axis Spatial Separation (Exploded View)",
    "stack.slider_rot": "3D Camera Azimuth Rotation",
    "stack.btn_pulse": "Transmit Sap / REST Pulse Across All 4 3D Layers",
    "feat.routes_title": "Sustainable Routes & Google Gemini",
    "feat.routes_desc":
      "Enter origin and destination, and the app generates alternatives via OSRM: distance, travel time by mode, and tailored insights. AI recommendations powered by Google Gemini 1.5 Flash explain clearly why a route is suggested.",
    "feat.trips_title": "Trips & CO₂ Accounting",
    "feat.trips_desc":
      "Log your active commute and the system computes the exact CO₂ avoided compared to a passenger car (152 g CO₂/km avoided) along with earned points.",
    "feat.dash_title": "Impact Dashboard",
    "feat.dash_desc":
      "Cumulative CO₂ saved, total distance, weekly trends, equivalent trees preserved, and complete trip logs in clear visual cards.",
    "feat.rank_title": "District Leaderboard",
    "feat.rank_desc":
      "Compare your positive impact with fellow cyclists and pedestrians across Lima districts to build healthy community habits.",
    "feat.badges_title": "Badges & Rewards",
    "feat.badges_desc":
      "Badges unlock automatically upon achieving milestones; green points can be redeemed in the sustainable reward catalog.",
    "feat.challenges_title": "Weekly Challenges",
    "feat.challenges_desc":
      "Time-bounded monthly goals and eco-commute challenges managed dynamically from the administration portal.",

    // Badges / ODS Callout
    "ods.title": "Committed to SDG 11 (Target 11.2) & Artificial Intelligence",
    "ods.desc":
      "EcoCommute directly contributes to the United Nations Sustainable Development Goal 11 (Target 11.2: Providing access to safe, affordable, accessible, and sustainable transport systems for all). Furthermore, route evaluation is enhanced with Google Gemini 1.5 Flash for transparent, contextual advice.",
    "ods.badge_ods": "SDG 11 · Target 11.2: Sustainable Urban Mobility",
    "ods.badge_ai": "AI-Powered Optimization · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Open Source Routing Engine (OSRM)",

    // Screenshots
    "demo.title": "Application Preview",
    "demo.tab_all": "3D Side-by-side view",
    "demo.tab_routes": "Route Planner & Map",
    "demo.tab_dash": "Impact Dashboard",
    "demo.img1_alt": "Interactive mockup of sustainable route options across Lima map",
    "demo.cap1":
      "Sustainable route planner showing live locations, transport modes, eco-alternatives, and Google Gemini AI insights.",
    "demo.img2_alt": "Impact dashboard mockup with CO2 metrics and user statistics",
    "demo.cap2":
      "Impact dashboard displaying CO₂ saved, trips logged, tree equivalents, badges, and history.",

    // Impact
    "impact.title": "Aligned with UN SDG 11 Target 11.2",
    "impact.desc":
      "Safe, accessible, affordable, and sustainable transport for everyone. Commuters turn their carbon savings into visible progress, while gamification (challenges, badges, and district rankings) sustains the habit beyond week one.",
    "impact.p1": "Direct tailpipe emissions when cycling or walking",
    "impact.p2": "Privacy by design with zero background tracking",
    "impact.p3": "Open-source cartography built on OpenStreetMap",

    // Team
    "team.title": "Development Team",
    "team.intro":
      "Six Software Engineering students at UPC, NRC 8247, 2026-2 Semester. Full development tracked publicly in the GitHub repository.",
    "team.member1_role": "AI & Route Recommendations",
    "team.member2_role": "Routes, Dashboard & Badges",
    "team.member3_role": "Entities, Commute Logs & CO₂ Math",
    "team.member4_role": "Green Points & Leaderboard",
    "team.member5_role": "Security, JWT & Authentication",
    "team.member6_role": "Documentation, Evidence & Landing",

    // Contact
    "contact.title": "Try it and Share Feedback",
    "contact.intro":
      "If you have an idea to improve mobility in Lima, reach out: we read every message.",
    "contact.github": "Code on GitHub",
    "contact.swagger": "API & Swagger on Render",
    "contact.linkedin": "EcoCommute on LinkedIn",

    // Footer & Legal
    "footer.academic": "EcoCommute · Web Application Architecture Midterm Project (UPC 2026-2)",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",

    // Modal
    "modal.title": "Terms of Service & Privacy — EcoCommute",
    "modal.close": "Close modal window",
    "modal.intro": "Ethical, legal, and environmental commitments of EcoCommute:",
    "modal.p1":
      "<strong>Data Privacy:</strong> We strictly follow Peru's Personal Data Protection Law (Law N° 29733) and GDPR principles. Geolocation coordinates are processed ephemerally; we never perform background tracking nor monetize personal telemetry.",
    "modal.p2":
      "<strong>Open Routing & AI:</strong> We rely on OSRM over OpenStreetMap and Google Gemini 1.5 Flash for unbiased, transparent routing recommendations.",
    "modal.p3":
      "<strong>Professional Ethics:</strong> Development is guided by the ACM/IEEE Software Engineering Code of Ethics and the Deontological Code of the Colegio de Ingenieros del Perú (CIP), prioritizing public well-being and climate action.",
    "modal.full_link": "Open full Terms & Conditions page →"
  }
};

let currentLang = localStorage.getItem("ecocommute_lang") || "es_419";
let currentCorridor = "miraflores";
let currentKm = 4.2;
let sessionRecycledGrams = 1920;
let sessionSprouts = 12;

let alchemyTrips = 6;
let alchemyKm = 4.2;
let plantedBonusSeeds = 0;

let currentSelectedSlab = 4;
let spawnGlobalPollenBurst = null;

function updateSessionFloraBanner() {
  const isEn = currentLang === "en_US";
  const statusEl = document.getElementById("session-flora-status");
  const counterEl = document.getElementById("session-recycled-co2");
  const petEq = Math.max(1, Math.round(sessionRecycledGrams / 82.8));

  if (counterEl) {
    counterEl.textContent = `${sessionRecycledGrams.toLocaleString()} g`;
  }
  if (statusEl) {
    if (isEn) {
      statusEl.innerHTML = `You have sprouted <strong>${sessionSprouts} Amancaes shoots</strong> and prevented <strong>${sessionRecycledGrams.toLocaleString()} g of CO₂</strong> equal to <strong>${petEq} PET bottles</strong>.`;
    } else {
      statusEl.innerHTML = `Has germinado <strong>${sessionSprouts} brotes de Amancaes</strong> y evitado <strong>${sessionRecycledGrams.toLocaleString()} g de CO₂</strong> equivalentes a <strong>${petEq} botellas PET</strong>.`;
    }
  }
}

function renderSimulatorMetrics() {
  const isEn = currentLang === "en_US";
  const corridor = CORRIDORS[currentCorridor] || CORRIDORS.miraflores;
  const km = Number(currentKm);

  const carCo2Grams = Math.round(km * 152);
  const greenPoints = Math.max(5, Math.round(km * 3.57));
  const petBottles = Math.max(1, Math.round(carCo2Grams / 82.8));
  const bikeMin = Math.max(4, Math.round(km * 3.35));
  const carMin = Math.max(7, Math.round(km * 5.25));

  const routeTitleEl = document.getElementById("sim-route-title");
  const coordsEl = document.getElementById("sim-coords");
  const distOutEl = document.getElementById("sim-distance-output");
  const carCo2El = document.getElementById("sim-car-co2");
  const bikeCo2El = document.getElementById("sim-bike-co2");
  const petEquivEl = document.getElementById("sim-pet-equiv");
  const pointsEl = document.getElementById("sim-points");
  const bikeTimeEl = document.getElementById("sim-bike-time");
  const carTimeEl = document.getElementById("sim-car-time");
  const geminiTextEl = document.getElementById("sim-gemini-text");
  const svgCarPath = document.getElementById("svg-car-path");
  const svgEcoPath = document.getElementById("svg-eco-path");
  const originTagEl = document.getElementById("holo-origin-tag");
  const destTagEl = document.getElementById("holo-dest-tag");

  const localeData = isEn ? corridor.en : corridor.es;

  if (routeTitleEl) {
    routeTitleEl.textContent = `${localeData.routeTitle}, ${km.toFixed(1)} km`;
  }
  if (coordsEl) coordsEl.textContent = corridor.coords;
  if (distOutEl) distOutEl.textContent = `${km.toFixed(1)} km`;
  if (carCo2El) {
    carCo2El.textContent = isEn ? `${carCo2Grams} g of CO₂` : `${carCo2Grams} g de CO₂`;
  }
  if (bikeCo2El) {
    bikeCo2El.textContent = isEn ? "0 g of CO₂" : "0 g de CO₂";
  }
  if (petEquivEl) {
    petEquivEl.textContent = isEn ? `♻ ${petBottles} PET bottles` : `♻ ${petBottles} botellas PET`;
  }
  if (pointsEl) {
    pointsEl.textContent = isEn ? `+${greenPoints} green points` : `+${greenPoints} puntos verdes`;
  }
  if (bikeTimeEl) bikeTimeEl.textContent = `${bikeMin} min`;
  if (carTimeEl) carTimeEl.textContent = `${carMin} min`;
  if (geminiTextEl) geminiTextEl.textContent = localeData.gemini;
  if (svgCarPath) svgCarPath.setAttribute("d", corridor.carPath);
  if (svgEcoPath) svgEcoPath.setAttribute("d", corridor.ecoPath);
  if (originTagEl) originTagEl.textContent = corridor.originTag;
  if (destTagEl) destTagEl.textContent = corridor.destTag;
}

function renderLivingTerrarium(annualKg) {
  const group = document.getElementById("terrarium-flora-group");
  const stageLabel = document.getElementById("terrarium-stage-label");
  if (!group) return;

  const isEn = currentLang === "en_US";
  const count = Math.min(18, Math.max(4, Math.round(annualKg / 26) + plantedBonusSeeds));

  if (stageLabel) {
    if (count >= 12) {
      stageLabel.textContent = isEn ? "STAGE: CLIMAX LOMAS FOREST" : "ETAPA: BOSQUE CLÍMAX DE LOMAS";
    } else if (count >= 7) {
      stageLabel.textContent = isEn ? "STAGE: BLOOMING AMANCAES" : "ETAPA: FLORACIÓN DE AMANCAES";
    } else {
      stageLabel.textContent = isEn ? "STAGE: YOUNG GERMINATION" : "ETAPA: GERMINACIÓN INICIAL";
    }
  }

  let svgMarkup = "";
  for (let i = 0; i < count; i++) {
    const x = 48 + ((i * 257) % 264);
    const h = 24 + ((i * 19) % 58);
    const topY = 140 - h;
    const sway = (i % 2 === 0 ? 1 : -1) * (6 + (i % 7));
    const hasFlower = i % 3 === 0;

    svgMarkup += `
      <g class="terrarium-plant">
        <path d="M ${x} 140 Q ${x + sway} ${140 - h * 0.55}, ${x + sway * 0.5} ${topY}" stroke="#8ce868" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M ${x + sway * 0.3} ${140 - h * 0.45} C ${x + sway * 0.3 - 12} ${140 - h * 0.6}, ${x + sway * 0.3 - 6} ${140 - h * 0.72}, ${x + sway * 0.3} ${140 - h * 0.52} Z" fill="#d4ff59" opacity="0.85" />
        <path d="M ${x + sway * 0.4} ${140 - h * 0.65} C ${x + sway * 0.4 + 12} ${140 - h * 0.8}, ${x + sway * 0.4 + 6} ${140 - h * 0.9}, ${x + sway * 0.4} ${140 - h * 0.7} Z" fill="#52b788" opacity="0.9" />
        ${
          hasFlower
            ? `<circle cx="${x + sway * 0.5}" cy="${topY}" r="4.5" fill="#ff8c61" />
               <circle cx="${x + sway * 0.5}" cy="${topY}" r="2" fill="#d4ff59" />`
            : `<circle cx="${x + sway * 0.5}" cy="${topY}" r="3" fill="#d4ff59" />`
        }
      </g>
    `;
  }
  group.innerHTML = svgMarkup;
}

function renderAlchemyLab() {
  const isEn = currentLang === "en_US";
  const annualGrams = alchemyTrips * alchemyKm * 152 * 52;
  const annualKgNum = annualGrams / 1000;
  const annualKg = annualKgNum.toFixed(1);
  const petBottles = Math.round(annualGrams / 82.8);
  const aluCans = Math.round(annualGrams / 170);
  const trees = (annualGrams / 21000).toFixed(1);
  const greenPoints = Math.round(alchemyTrips * alchemyKm * 3.57 * 52);

  const tripsOut = document.getElementById("alchemy-trips-out");
  const kmOut = document.getElementById("alchemy-km-out");
  const annualKgEl = document.getElementById("alchemy-annual-kg");
  const petEl = document.getElementById("eq-pet-bottles");
  const aluEl = document.getElementById("eq-alu-cans");
  const treesEl = document.getElementById("eq-trees");
  const ptsEl = document.getElementById("eq-green-points");
  const tokenGrid = document.getElementById("pet-token-visualizer");

  if (tripsOut) {
    tripsOut.textContent = isEn ? `${alchemyTrips} trips/wk` : `${alchemyTrips} viajes/sem`;
  }
  if (kmOut) kmOut.textContent = `${alchemyKm.toFixed(1)} km`;
  if (annualKgEl) annualKgEl.textContent = annualKg;
  if (petEl) petEl.textContent = petBottles.toLocaleString();
  if (aluEl) aluEl.textContent = aluCans.toLocaleString();
  if (treesEl) treesEl.textContent = trees;
  if (ptsEl) ptsEl.textContent = `+${greenPoints.toLocaleString()}`;

  if (tokenGrid) {
    const dotsCount = Math.min(36, Math.max(6, Math.round(petBottles / 120)));
    tokenGrid.innerHTML = "";
    for (let i = 0; i < dotsCount; i++) {
      const span = document.createElement("span");
      span.className = "pet-dot";
      tokenGrid.appendChild(span);
    }
  }

  renderLivingTerrarium(annualKgNum);
}

function renderExplodedSlabDetails() {
  const isEn = currentLang === "en_US";
  const layer = STACK_LAYERS[currentSelectedSlab] || STACK_LAYERS[4];
  const copy = isEn ? layer.en : layer.es;

  const titleEl = document.getElementById("slab-detail-title");
  const descEl = document.getElementById("slab-detail-desc");
  const artifactEl = document.getElementById("slab-detail-artifact");
  const slaEl = document.getElementById("slab-detail-sla");

  if (titleEl) titleEl.textContent = copy.title;
  if (descEl) descEl.textContent = copy.desc;
  if (artifactEl) artifactEl.textContent = copy.artifact;
  if (slaEl) slaEl.textContent = copy.sla;
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations["es_419"];
  currentLang = lang;
  localStorage.setItem("ecocommute_lang", lang);

  document.documentElement.lang = lang === "en_US" ? "en" : "es";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] !== undefined) {
      el.setAttribute("alt", dict[key]);
    }
  });

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", lang === "en_US" ? "true" : "false");
    const esSpan = toggleBtn.querySelector(".lang-es");
    const enSpan = toggleBtn.querySelector(".lang-en");
    if (esSpan && enSpan) {
      if (lang === "en_US") {
        esSpan.classList.remove("active");
        enSpan.classList.add("active");
      } else {
        esSpan.classList.add("active");
        enSpan.classList.remove("active");
      }
    }
  }

  updateSessionFloraBanner();
  renderSimulatorMetrics();
  renderAlchemyLab();
  renderExplodedSlabDetails();
}

function setupLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextLang = currentLang === "es_419" ? "en_US" : "es_419";
      if (document.startViewTransition) {
        const transition = document.startViewTransition(() => applyTranslations(nextLang));
        transition.finished.finally(() => {
          toggleBtn.focus({ preventScroll: true });
        });
      } else {
        applyTranslations(nextLang);
      }
    });
  }
}

// Selector interactivo de Biomas / Paletas Ecológicas
function setupBiomeSwitcher() {
  const chips = document.querySelectorAll(".biome-chip");
  const savedBiome = localStorage.getItem("ecocommute_biome") || "amancaes";
  document.documentElement.setAttribute("data-biome", savedBiome);

  chips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.getAttribute("data-biome-target") === savedBiome);
    chip.addEventListener("click", () => {
      const targetBiome = chip.getAttribute("data-biome-target") || "amancaes";
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      localStorage.setItem("ecocommute_biome", targetBiome);

      const applyBiome = () => {
        document.documentElement.setAttribute("data-biome", targetBiome);
      };

      if (document.startViewTransition) {
        document.startViewTransition(applyBiome);
      } else {
        applyBiome();
      }

      if (typeof spawnGlobalPollenBurst === "function") {
        spawnGlobalPollenBurst(window.innerWidth * 0.5, window.innerHeight * 0.25, 22);
      }
    });
  });
}

function setupSimulator() {
  const corridorBtns = document.querySelectorAll(".corridor-btn");
  const camBtns = document.querySelectorAll(".cam-angle-btn");
  const holoStage = document.getElementById("holo-map-stage");
  const rangeInput = document.getElementById("sim-distance-range");
  const recycleBtn = document.getElementById("recycle-trip-btn");
  const routeTitleEl = document.getElementById("sim-route-title");

  corridorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-corridor");
      if (!CORRIDORS[key]) return;

      corridorBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      currentCorridor = key;
      currentKm = CORRIDORS[key].km;
      if (rangeInput) rangeInput.value = String(currentKm);

      if (document.startViewTransition) {
        const transition = document.startViewTransition(() => renderSimulatorMetrics());
        transition.finished.finally(() => {
          routeTitleEl?.focus({ preventScroll: true });
        });
      } else {
        renderSimulatorMetrics();
        routeTitleEl?.focus({ preventScroll: true });
      }
    });
  });

  camBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-cam") || "iso";
      camBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (holoStage) {
        holoStage.setAttribute("data-cam-mode", mode);
      }
    });
  });

  if (rangeInput) {
    rangeInput.addEventListener("input", (e) => {
      currentKm = parseFloat(e.target.value) || 4.2;
      renderSimulatorMetrics();
    });
  }

  if (recycleBtn) {
    recycleBtn.addEventListener("click", (e) => {
      const addedGrams = Math.round(currentKm * 152);
      sessionRecycledGrams += addedGrams;
      sessionSprouts += 1;
      plantedBonusSeeds = Math.min(8, plantedBonusSeeds + 1);
      updateSessionFloraBanner();
      renderAlchemyLab();

      if (typeof spawnGlobalPollenBurst === "function") {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top, 26);
      }
    });
  }
}

function setupAlchemyLab() {
  const presets = document.querySelectorAll(".alchemy-preset");
  const tripsSlider = document.getElementById("alchemy-trips-range");
  const kmSlider = document.getElementById("alchemy-km-range");
  const plantSeedBtn = document.getElementById("plant-seed-btn");
  const cutoutCards = document.querySelectorAll(".unified-cutout-card");

  presets.forEach((btn) => {
    btn.addEventListener("click", () => {
      presets.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      alchemyTrips = parseInt(btn.getAttribute("data-trips") || "6", 10);
      alchemyKm = parseFloat(btn.getAttribute("data-km") || "4.2");
      if (tripsSlider) tripsSlider.value = String(alchemyTrips);
      if (kmSlider) kmSlider.value = String(alchemyKm);
      renderAlchemyLab();
    });
  });

  if (tripsSlider) {
    tripsSlider.addEventListener("input", (e) => {
      alchemyTrips = parseInt(e.target.value, 10) || 6;
      renderAlchemyLab();
    });
  }

  if (kmSlider) {
    kmSlider.addEventListener("input", (e) => {
      alchemyKm = parseFloat(e.target.value) || 4.2;
      renderAlchemyLab();
    });
  }

  if (plantSeedBtn) {
    plantSeedBtn.addEventListener("click", (e) => {
      plantedBonusSeeds = (plantedBonusSeeds + 1) % 10;
      sessionSprouts += 1;
      sessionRecycledGrams += 152;
      updateSessionFloraBanner();
      renderAlchemyLab();

      if (typeof spawnGlobalPollenBurst === "function") {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top, 20);
      }
    });
  }

  cutoutCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (typeof spawnGlobalPollenBurst === "function") {
        spawnGlobalPollenBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 16);
      }
    });
  });
}

// Mesa Holográfica 3D de Capas Explotadas (Exploded View 3D Stack)
function setupExplodedArchitectureStack() {
  const scene = document.getElementById("iso-stack-scene");
  const slabs = document.querySelectorAll(".iso-slab");
  const pills = document.querySelectorAll(".slab-pill");
  const spreadRange = document.getElementById("stack-explosion-range");
  const spreadOut = document.getElementById("stack-explosion-out");
  const angleRange = document.getElementById("stack-angle-range");
  const angleOut = document.getElementById("stack-angle-out");
  const pulseBtn = document.getElementById("trigger-packet-btn");

  if (!scene || !slabs.length) return;

  function selectLayer(layerNum) {
    currentSelectedSlab = layerNum;
    slabs.forEach((s) => {
      s.classList.toggle("is-selected", Number(s.getAttribute("data-slab-layer")) === layerNum);
    });
    pills.forEach((p) => {
      p.classList.toggle("is-active", Number(p.getAttribute("data-select-slab")) === layerNum);
    });
    renderExplodedSlabDetails();
  }

  slabs.forEach((slab) => {
    slab.addEventListener("click", () => {
      selectLayer(Number(slab.getAttribute("data-slab-layer")) || 4);
    });
    slab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectLayer(Number(slab.getAttribute("data-slab-layer")) || 4);
      }
    });
  });

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      selectLayer(Number(pill.getAttribute("data-select-slab")) || 4);
    });
  });

  if (spreadRange) {
    spreadRange.addEventListener("input", (e) => {
      const pct = Number(e.target.value) || 100;
      const px = Math.round((pct / 100) * 42);
      scene.style.setProperty("--stack-spread", `${px}px`);
      if (spreadOut) spreadOut.textContent = `${pct}%`;
    });
  }

  if (angleRange) {
    angleRange.addEventListener("input", (e) => {
      const deg = Number(e.target.value) || -32;
      scene.style.setProperty("--stack-rot", `${deg}deg`);
      if (angleOut) angleOut.textContent = `${deg}°`;
    });
  }

  if (pulseBtn) {
    pulseBtn.addEventListener("click", (e) => {
      const ordered = [4, 3, 2, 1];
      ordered.forEach((layerNum, idx) => {
        setTimeout(() => {
          const target = document.querySelector(`.iso-slab[data-slab-layer="${layerNum}"]`);
          if (target) {
            target.classList.add("is-pulsing");
            selectLayer(layerNum);
            setTimeout(() => target.classList.remove("is-pulsing"), 420);
          }
        }, idx * 180);
      });

      if (typeof spawnGlobalPollenBurst === "function") {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top, 20);
      }
    });
  }
}

// Scrollytelling sincronizado entre tarjetas de fase y el reactor circular sticky (scrollytelling)
let activeReactorStage = 0;
function setupCircularScrollytelling() {
  const stepCards = document.querySelectorAll("#tracked-cycle-steps .cycle-step-card");
  const stagePanels = document.querySelectorAll("#animated-stage-cards .stage-indicator");
  if (!stepCards.length || !stagePanels.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute("data-step-index") || "0", 10);
          activeReactorStage = idx;
          stepCards.forEach((c, i) => c.classList.toggle("is-current", i === idx));
          stagePanels.forEach((p, i) => p.classList.toggle("is-active", i === idx));
        }
      });
    },
    { threshold: 0.45 }
  );

  stepCards.forEach((card) => observer.observe(card));
}

// Canvas de partículas del reactor de fotosíntesis con modos físicos e interacción (efficient-background-processing)
function setupCircularParticleReactor() {
  const canvas = document.getElementById("circular-particles-canvas");
  const scrollySection = document.getElementById("ciclo-circular");
  const modeBtns = document.querySelectorAll(".reactor-mode-btn");
  const pulseBtn = document.getElementById("reactor-pulse-btn");
  if (!canvas || !scrollySection) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let reactorMode = "orbit";
  let pointerX = canvas.width / 2;
  let pointerY = canvas.height / 2;
  let pointerActive = false;
  let shockwaveRadius = 0;

  const particles = Array.from({ length: 48 }, (_, i) => ({
    angle: (i / 48) * Math.PI * 2,
    radius: 52 + (i % 5) * 24,
    baseRadius: 52 + (i % 5) * 24,
    speed: 0.005 + (i % 3) * 0.0028,
    size: 1.8 + (i % 3) * 0.9,
    x: 0,
    y: 0
  }));

  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      reactorMode = btn.getAttribute("data-reactor-mode") || "orbit";
      modeBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    });
  });

  function triggerShockwave() {
    shockwaveRadius = 12;
    sessionRecycledGrams += 152;
    sessionSprouts += 1;
    updateSessionFloraBanner();
  }

  if (pulseBtn) {
    pulseBtn.addEventListener("click", triggerShockwave);
  }

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    pointerY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    pointerActive = true;
  });

  canvas.addEventListener("pointerleave", () => {
    pointerActive = false;
  });

  canvas.addEventListener("click", triggerShockwave);

  let rafId = null;
  const stageColors = ["#d4ff59", "#7de2d1", "#ff8c61"];

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const primaryColor = stageColors[activeReactorStage] || "#d4ff59";

    if (shockwaveRadius > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, shockwaveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "#d4ff59";
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = Math.max(0, 1 - shockwaveRadius / 240);
      ctx.stroke();
      shockwaveRadius += 6.5;
      if (shockwaveRadius > 240) shockwaveRadius = 0;
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.angle += reactorMode === "vortex" ? p.speed * 1.9 : p.speed;

      let targetR = p.baseRadius;
      if (reactorMode === "vortex") {
        targetR = 32 + ((p.baseRadius + Math.sin(p.angle * 2) * 35) % 140);
      }
      p.radius += (targetR - p.radius) * 0.08;

      let x = cx + Math.cos(p.angle) * p.radius;
      let y = cy + Math.sin(p.angle) * p.radius;

      if (pointerActive) {
        const dx = pointerX - x;
        const dy = pointerY - y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 1) {
          x += (dx / dist) * 14;
          y += (dy / dist) * 14;
        }
      }

      p.x = x;
      p.y = y;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = i % 4 === 0 ? "#ff8c61" : primaryColor;
      ctx.globalAlpha = 0.72;
      ctx.fill();
    }

    // En modo Red de Micelio, trazamos filamentos bioluminiscentes entre partículas cercanas
    if (reactorMode === "mycelium") {
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 68) {
            ctx.globalAlpha = (1 - d / 68) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    rafId = requestAnimationFrame(drawFrame);
  }

  function startSimulation() {
    if (rafId === null) {
      rafId = requestAnimationFrame(drawFrame);
    }
  }

  function stopSimulation() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  scrollySection.addEventListener("contentvisibilityautostatechange", (event) => {
    if (event.skipped) {
      stopSimulation();
    } else {
      startSimulation();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startSimulation();
          } else {
            stopSimulation();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(scrollySection);
  } else {
    startSimulation();
  }
}

// Lienzo 3D de Fondo con Esporas Bioluminiscentes en 3 Planos Z + Ráfagas de Polinización
function setupSpatialDepthField() {
  const canvas = document.getElementById("spatial-depth-canvas");
  const pollinateBtn = document.getElementById("pollinate-burst-btn");
  const counterPill = document.getElementById("global-counter-pill");
  if (!canvas) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const spores = Array.from({ length: 42 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    z: 0.25 + (i % 3) * 0.35, // 3 planos de profundidad Z
    vx: (Math.random() - 0.5) * 0.28,
    vy: -0.18 - Math.random() * 0.35,
    size: 1.2 + (i % 3) * 1.1,
    hueType: i % 3
  }));

  const burstSpores = [];

  spawnGlobalPollenBurst = function (originX, originY, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.4 + Math.random() * 3.6;
      burstSpores.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: 2.2 + Math.random() * 2.5,
        alpha: 1,
        isLeaf: i % 2 === 0
      });
    }
  };

  if (pollinateBtn) {
    pollinateBtn.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
      sessionSprouts += 1;
      updateSessionFloraBanner();
    });
  }

  if (counterPill) {
    counterPill.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.bottom, 22);
    });
  }

  let camOffsetX = 0;
  let camOffsetY = 0;
  window.addEventListener(
    "pointermove",
    (e) => {
      camOffsetX = (e.clientX / window.innerWidth - 0.5) * 28;
      camOffsetY = (e.clientY / window.innerHeight - 0.5) * 28;
    },
    { passive: true }
  );

  function renderAmbient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const palette = ["#d4ff59", "#8ce868", "#ff8c61"];

    for (const s of spores) {
      s.x += s.vx * s.z;
      s.y += s.vy * s.z;

      if (s.y < -10) s.y = canvas.height + 10;
      if (s.x < -10) s.x = canvas.width + 10;
      if (s.x > canvas.width + 10) s.x = -10;

      const drawX = s.x + camOffsetX * s.z;
      const drawY = s.y + camOffsetY * s.z;

      ctx.beginPath();
      ctx.arc(drawX, drawY, s.size * s.z, 0, Math.PI * 2);
      ctx.fillStyle = palette[s.hueType];
      ctx.globalAlpha = 0.22 * s.z;
      ctx.fill();
    }

    for (let i = burstSpores.length - 1; i >= 0; i--) {
      const b = burstSpores[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy -= 0.02;
      b.alpha -= 0.018;

      if (b.alpha <= 0) {
        burstSpores.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.alpha;
      ctx.fillStyle = b.isLeaf ? "#d4ff59" : "#ff8c61";
      ctx.beginPath();
      if (b.isLeaf) {
        ctx.ellipse(0, 0, b.size * 1.6, b.size * 0.8, Math.atan2(b.vy, b.vx), 0, Math.PI * 2);
      } else {
        ctx.arc(0, 0, b.size, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(renderAmbient);
  }

  requestAnimationFrame(renderAmbient);
}

// Motor de Profundidad Estereoscópica 3D para tarjetas ([data-tilt-3d]) + Cursor Espacial
function setup3DTiltCards() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches;
  if (prefersReduced || !isFinePointer) return;

  const cards = document.querySelectorAll("[data-tilt-3d]");
  const cursorHud = document.getElementById("spatial-cursor-hud");
  const cursorReadout = document.getElementById("cursor-coords-readout");

  window.addEventListener(
    "pointermove",
    (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--parallax-x", `${nx * -26}px`);
      document.documentElement.style.setProperty("--parallax-y", `${ny * -26}px`);

      if (cursorHud) {
        cursorHud.style.setProperty("--cursor-x", `${e.clientX}px`);
        cursorHud.style.setProperty("--cursor-y", `${e.clientY}px`);
      }
      if (cursorReadout) {
        const lat = (-12.04 - ny * 0.12).toFixed(2);
        const lon = (-77.03 + nx * 0.12).toFixed(2);
        cursorReadout.textContent = `BIOMA // ${lat}°S ${lon}°W`;
      }
    },
    { passive: true }
  );

  cards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - py) * 9.5;
      const tiltY = (px - 0.5) * 9.5;

      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      card.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--glare-opacity", "1");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--glare-opacity", "0");
    });
  });
}

// Fallback para sibling-index() en listas escalonadas (dynamic-sibling-animations)
function setupSiblingIndexFallback() {
  if (!window.CSS?.supports?.("animation-delay: calc(sibling-index() * 0.1s)")) {
    ["stagger-team-list", "stagger-alchemy-grid"].forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        [...container.children].forEach((el, index) => {
          el.style.setProperty("--sibling-index", String(index + 1));
        });
      }
    });
  }
}

function setupShowcaseTabs() {
  const tabs = document.querySelectorAll(".showcase-tab");
  const grid = document.getElementById("showcase-grid");
  if (!tabs.length || !grid) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.getAttribute("data-view") || "both";
      const updateView = () => {
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        grid.setAttribute("data-mode", mode);
      };

      if (document.startViewTransition) {
        const transition = document.startViewTransition(updateView);
        transition.finished.finally(() => {
          tab.focus({ preventScroll: true });
        });
      } else {
        updateView();
        tab.focus({ preventScroll: true });
      }
    });
  });
}

function setupSpotlightCards() {
  const cards = document.querySelectorAll("[data-spotlight]");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    });
  });
}

// Top-layer discrete display transition probe & exit helper (animate-to-from-top-layer)
let supportsDisplayTransition;
function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();
}

async function closeTopLayer(dialog) {
  if (!supportsTopLayerExit()) {
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 2000))
      ]);
    }
    if (!dialog.hasAttribute("data-closing")) return;
    dialog.removeAttribute("data-closing");
  }
  dialog.close();
}

function setupTermsModal() {
  const dialog = document.getElementById("terms-modal");
  const openLinks = document.querySelectorAll(".open-terms-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!dialog || typeof dialog.showModal !== "function") return;

  openLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeTopLayer(dialog);
    });
  }

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTopLayer(dialog);
  });

  // Fallback para navegadores sin soporte nativo de closedby="any" (light-dismiss-a-dialog)
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (isDialogContent) return;
      closeTopLayer(dialog);
    });
  }
}

// Barra de progreso de lectura + lectura porcentual en el riel lateral
function setupScrollTelemetry() {
  const progress = document.getElementById("scroll-progress");
  const railReadout = document.getElementById("rail-scroll-readout");
  const hasNativeScrollTimeline = window.CSS?.supports?.("animation-timeline", "scroll()");

  window.addEventListener(
    "scroll",
    () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(1, Math.max(0, window.scrollY / scrollable));
      if (!hasNativeScrollTimeline && progress) {
        progress.style.transform = `scaleX(${pct})`;
      }
      if (railReadout) {
        const num = String(Math.round(pct * 100)).padStart(2, "0");
        railReadout.textContent = `FLORA · ${num}%`;
      }
    },
    { passive: true }
  );
}

function checkBackendHealth() {
  const healthLink = document.getElementById("health-check-link");
  const statusDot = document.getElementById("api-status-dot");
  if (!healthLink || !window.fetch) return;

  fetch("https://ecocommute-backend-a14m.onrender.com/health", {
    method: "GET",
    priority: "low"
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data && data.status === "UP") {
        healthLink.textContent = "GET /health · UP";
        if (statusDot) statusDot.style.background = "#d4ff59";
      }
    })
    .catch(() => {});
}

// ==================== SIMULADOR DE REALIDAD VIRTUAL 360° & WEBXR ESTEREOSCÓPICO ====================
const VR_WORLDS = {
  olivar: {
    labelEs: "BOSQUE EL OLIVAR · SAN ISIDRO",
    labelEn: "EL OLIVAR FOREST · SAN ISIDRO",
    skyTop: "#06110b",
    skyMid: "#0d2417",
    ground: "#08140d",
    gridColor: "rgba(212, 255, 89, 0.25)",
    treeCrown: "#8ce868",
    crystalColor: "#d4ff59",
    accentColor: "#ff8c61"
  },
  malecon: {
    labelEs: "MALECÓN COSTERO · MIRAFLORES",
    labelEn: "COASTAL MALECÓN · MIRAFLORES",
    skyTop: "#05101a",
    skyMid: "#0c2536",
    ground: "#07141c",
    gridColor: "rgba(125, 226, 209, 0.26)",
    treeCrown: "#7de2d1",
    crystalColor: "#ffd166",
    accentColor: "#ff8c61"
  },
  arequipa: {
    labelEs: "TÚNEL BOTÁNICO · AV. AREQUIPA",
    labelEn: "BOTANICAL TUNNEL · AV. AREQUIPA",
    skyTop: "#110d08",
    skyMid: "#24190d",
    ground: "#120d08",
    gridColor: "rgba(255, 140, 97, 0.26)",
    treeCrown: "#d4ff59",
    crystalColor: "#ff8c61",
    accentColor: "#7de2d1"
  },
  upc: {
    labelEs: "CORREDOR UNIVERSITARIO · UPC MONTERRICO",
    labelEn: "CAMPUS CORRIDOR · UPC MONTERRICO",
    skyTop: "#080c17",
    skyMid: "#131c33",
    ground: "#080f18",
    gridColor: "rgba(199, 125, 255, 0.26)",
    treeCrown: "#7de2d1",
    crystalColor: "#d4ff59",
    accentColor: "#c77dff"
  }
};

function setupVR360Portal() {
  const vrSection = document.getElementById("vr-portal");
  const visorShell = document.getElementById("vr-visor-shell");
  const canvas = document.getElementById("vr-corridor-canvas");
  const statusEl = document.getElementById("vr-xr-status");
  const worldLabelEl = document.getElementById("vr-active-world-label");
  const speedValEl = document.getElementById("vr-hud-speed-val");
  const yawValEl = document.getElementById("vr-hud-yaw-val");
  const ringsValEl = document.getElementById("vr-hud-rings-val");
  const speedRange = document.getElementById("vr-speed-range");
  const stereoBtn = document.getElementById("vr-stereo-btn");
  const boostBtn = document.getElementById("vr-boost-btn");
  const gyroBtn = document.getElementById("vr-gyro-btn");
  const fullscreenBtn = document.getElementById("vr-fullscreen-btn");
  const worldBtns = document.querySelectorAll(".vr-world-btn");

  if (!canvas || !vrSection || !visorShell) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let activeWorldKey = "olivar";
  let isStereoSBS = false;
  let speedKmh = 22;
  let boostTimer = 0;
  let yawDeg = 0; // Rotación horizontal 360° (-180 a 180)
  let pitchDeg = 0; // Inclinación vertical (-35 a 35)
  let playerX = 0; // Posición lateral en la ciclovía (-180 a 180)
  let capturedRings = 0;
  let captureFlash = 0;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  // Árboles 3D y cristales/anillos de CO₂ en el corredor profundo (z: 60 .. 1800)
  const trees3D = Array.from({ length: 34 }, (_, i) => ({
    x: (i % 2 === 0 ? -1 : 1) * (175 + (i % 4) * 75),
    z: (i * 55) % 1800 + 60,
    height: 115 + (i % 3) * 35,
    canopyRadius: 38 + (i % 3) * 14
  }));

  const rings3D = Array.from({ length: 8 }, (_, i) => ({
    x: Math.sin(i * 1.4) * 115,
    y: -36 - (i % 2) * 18,
    z: i * 225 + 180,
    radius: 42,
    rotAngle: i * 0.6,
    screenX: 0,
    screenY: 0,
    screenR: 0
  }));

  // Estrellas / esporas en la bóveda celeste 360°
  const skySpores = Array.from({ length: 64 }, (_, i) => ({
    az: (i * 360) / 64,
    el: 8 + (i % 7) * 9,
    size: 1.2 + (i % 3) * 0.9
  }));

  // Comprobar soporte nativo WebXR (Meta Quest / Visores XR)
  if (navigator.xr && typeof navigator.xr.isSessionSupported === "function") {
    navigator.xr
      .isSessionSupported("immersive-vr")
      .then((supported) => {
        if (supported && statusEl) {
          statusEl.textContent = "WEBXR HEADSET READY // IMMERSIVE-VR SUPPORTED";
        }
      })
      .catch(() => {});
  }

  function updateHudReadout() {
    const effectiveSpeed = Math.round(speedKmh + (boostTimer > 0 ? 18 : 0));
    if (speedValEl) speedValEl.textContent = `${effectiveSpeed} km/h`;
    const normYaw = ((Math.round(yawDeg) % 360) + 360) % 360;
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const cardinal = dirs[Math.round(normYaw / 45) % 8];
    if (yawValEl) {
      yawValEl.textContent = `${String(normYaw).padStart(3, "0")}° ${cardinal}`;
    }
    if (ringsValEl) {
      ringsValEl.textContent = `${capturedRings} (-${capturedRings * 152} g)`;
    }
  }

  function collectRing() {
    capturedRings += 1;
    captureFlash = 1;
    sessionRecycledGrams += 152;
    sessionSprouts += 1;
    updateSessionFloraBanner();
    updateHudReadout();
  }

  // Renderizado de un ojo (soporta vista única o doble lente estereoscópico SBS)
  function renderEyeViewport(vx, vy, vw, vh, eyeOffsetX) {
    const world = VR_WORLDS[activeWorldKey] || VR_WORLDS.olivar;
    ctx.save();
    ctx.beginPath();
    ctx.rect(vx, vy, vw, vh);
    ctx.clip();

    const horizonY = vy + vh * 0.52 + pitchDeg * 3.8;
    const vanishX = vx + vw * 0.5 - yawDeg * 4.5 + eyeOffsetX * 0.35;
    const fov = 340;

    // 1. Bóveda celeste 360° con gradiente atmosférico
    const skyGrad = ctx.createLinearGradient(vx, vy, vx, Math.max(vy + 20, horizonY));
    skyGrad.addColorStop(0, world.skyTop);
    skyGrad.addColorStop(1, world.skyMid);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(vx, vy, vw, Math.max(0, horizonY - vy));

    // Esporas estelares que giran con el rumbo 360° (yaw / pitch)
    ctx.fillStyle = world.crystalColor;
    for (const sp of skySpores) {
      let deltaAz = ((sp.az - yawDeg + 540) % 360) - 180;
      if (Math.abs(deltaAz) < 95) {
        const sx = vx + vw * 0.5 + deltaAz * (vw / 110);
        const sy = horizonY - sp.el * 3.2;
        if (sy > vy && sy < horizonY) {
          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Silueta de cerros / lomas costeras de Lima en el horizonte 360°
    ctx.beginPath();
    ctx.moveTo(vx, horizonY);
    for (let x = 0; x <= vw; x += 28) {
      const worldAngle = (x - vw * 0.5) * 0.25 + yawDeg * 2.2;
      const hillH = Math.sin(worldAngle * 0.04) * 18 + Math.cos(worldAngle * 0.09) * 11 + 22;
      ctx.lineTo(vx + x, horizonY - hillH);
    }
    ctx.lineTo(vx + vw, horizonY);
    ctx.closePath();
    ctx.fillStyle = "rgba(12, 28, 19, 0.85)";
    ctx.fill();

    // 2. Suelo del corredor ecológico + grilla de perspectiva 3D
    ctx.fillStyle = world.ground;
    ctx.fillRect(vx, horizonY, vw, vh - (horizonY - vy));

    ctx.strokeStyle = world.gridColor;
    ctx.lineWidth = 1;
    // Líneas longitudinales de perspectiva hacia el punto de fuga
    for (let lane = -6; lane <= 6; lane++) {
      const bottomX = vanishX + (lane * 145 - playerX - eyeOffsetX) * 2.4;
      ctx.beginPath();
      ctx.moveTo(vanishX + lane * 6, horizonY);
      ctx.lineTo(bottomX, vy + vh);
      ctx.stroke();
    }

    // Bordes luminosos de la ciclovía central
    ctx.strokeStyle = world.crystalColor;
    ctx.lineWidth = 2;
    [-110, 110].forEach((edgeX) => {
      ctx.beginPath();
      ctx.moveTo(vanishX + (edgeX - playerX) * 0.08, horizonY);
      ctx.lineTo(vanishX + (edgeX - playerX - eyeOffsetX) * 2.2, vy + vh);
      ctx.stroke();
    });

    // 3. Ordenar objetos 3D (árboles y octaedros/anillos CO₂) por profundidad Z (Pintor de atrás hacia adelante)
    const renderQueue = [];
    for (const t of trees3D) {
      renderQueue.push({ type: "tree", z: t.z, obj: t });
    }
    for (const r of rings3D) {
      renderQueue.push({ type: "ring", z: r.z, obj: r });
    }
    renderQueue.sort((a, b) => b.z - a.z);

    for (const item of renderQueue) {
      const z = item.z;
      if (z < 25) continue;
      const scale = fov / z;

      if (item.type === "tree") {
        const t = item.obj;
        const relX = t.x - playerX - eyeOffsetX;
        const sx = vanishX + relX * scale;
        const syGround = horizonY + 88 * scale;
        const trunkTopY = syGround - t.height * scale;
        const crownR = t.canopyRadius * scale;

        if (sx < vx - 120 || sx > vx + vw + 120) continue;

        // Tronco 3D
        ctx.strokeStyle = "#8a5a36";
        ctx.lineWidth = Math.max(1.5, 8 * scale);
        ctx.beginPath();
        ctx.moveTo(sx, syGround);
        ctx.lineTo(sx, trunkTopY);
        ctx.stroke();

        // Dosel botánico 3D en capas
        ctx.fillStyle = world.treeCrown;
        ctx.globalAlpha = Math.min(0.9, 1400 / (z + 300));
        ctx.beginPath();
        ctx.arc(sx, trunkTopY, crownR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = world.crystalColor;
        ctx.lineWidth = Math.max(0.8, 1.8 * scale);
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (item.type === "ring") {
        const r = item.obj;
        const relX = r.x - playerX - eyeOffsetX;
        const sx = vanishX + relX * scale;
        const sy = horizonY + (88 + r.y) * scale;
        const sr = Math.max(4, r.radius * scale);

        if (eyeOffsetX <= 0) {
          r.screenX = sx;
          r.screenY = sy;
          r.screenR = sr;
        }

        if (sx < vx - 100 || sx > vx + vw + 100) continue;

        ctx.save();
        ctx.translate(sx, sy);

        // Anillo exterior de captura de CO₂
        ctx.strokeStyle = world.crystalColor;
        ctx.lineWidth = Math.max(1.5, 4.5 * scale);
        ctx.beginPath();
        ctx.arc(0, 0, sr, 0, Math.PI * 2);
        ctx.stroke();

        // Octaedro 3D wireframe giratorio en el centro del anillo
        const octR = sr * 0.58;
        const c = Math.cos(r.rotAngle);
        const s = Math.sin(r.rotAngle);
        const vTop = { x: 0, y: -octR };
        const vBot = { x: 0, y: octR };
        const v1 = { x: c * octR, y: s * octR * 0.35 };
        const v2 = { x: -s * octR, y: c * octR * 0.35 };
        const v3 = { x: -c * octR, y: -s * octR * 0.35 };
        const v4 = { x: s * octR, y: -c * octR * 0.35 };

        ctx.strokeStyle = world.accentColor;
        ctx.lineWidth = Math.max(1, 2.2 * scale);
        ctx.beginPath();
        [v1, v2, v3, v4].forEach((v, idx, arr) => {
          const next = arr[(idx + 1) % arr.length];
          ctx.moveTo(vTop.x, vTop.y);
          ctx.lineTo(v.x, v.y);
          ctx.moveTo(vBot.x, vBot.y);
          ctx.lineTo(v.x, v.y);
          ctx.moveTo(v.x, v.y);
          ctx.lineTo(next.x, next.y);
        });
        ctx.stroke();

        if (z < 650) {
          ctx.fillStyle = "#f2f7ec";
          ctx.font = `600 ${Math.max(9, Math.round(12 * scale))}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.fillText("-152g CO₂", 0, -sr - 6 * scale);
        }
        ctx.restore();
      }
    }

    // 4. Manubrio Holográfico de Bicicleta en Primera Persona (Cockpit POV)
    const barCenterX = vx + vw * 0.5 - (yawDeg * 0.6);
    const barBaseY = vy + vh;
    ctx.strokeStyle = "rgba(212, 255, 89, 0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(barCenterX - 95, barBaseY - 12);
    ctx.quadraticCurveTo(barCenterX, barBaseY - 46, barCenterX + 95, barBaseY - 12);
    ctx.stroke();

    // Destello verde al capturar un anillo de CO₂
    if (captureFlash > 0.02) {
      ctx.fillStyle = `rgba(212, 255, 89, ${captureFlash * 0.26})`;
      ctx.fillRect(vx, vy, vw, vh);
    }

    ctx.restore();
  }

  let rafId = null;
  function stepVR() {
    const dtSpeed = (speedKmh + (boostTimer > 0 ? 18 : 0)) * 0.42;
    if (boostTimer > 0) {
      boostTimer -= 1;
      if (boostTimer === 0) updateHudReadout();
    }
    if (captureFlash > 0) {
      captureFlash *= 0.88;
    }

    // Avanzar árboles en Z hacia la cámara
    for (const t of trees3D) {
      t.z -= dtSpeed;
      if (t.z < 30) {
        t.z += 1780;
      }
    }

    // Avanzar anillos/cristales 3D y detectar captura al atravesarlos
    for (const r of rings3D) {
      r.z -= dtSpeed;
      r.rotAngle += 0.045;
      if (r.z < 95 && r.z > 35 && Math.abs(r.x - playerX - yawDeg * 2.5) < 95) {
        collectRing();
        r.z += 1750;
        r.x = (Math.random() - 0.5) * 210;
      } else if (r.z < 28) {
        r.z += 1750;
        r.x = (Math.random() - 0.5) * 210;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isStereoSBS) {
      const halfW = canvas.width / 2;
      renderEyeViewport(0, 0, halfW, canvas.height, -18);
      renderEyeViewport(halfW, 0, halfW, canvas.height, 18);
    } else {
      renderEyeViewport(0, 0, canvas.width, canvas.height, 0);
    }

    rafId = requestAnimationFrame(stepVR);
  }

  function startVR() {
    if (rafId === null) {
      rafId = requestAnimationFrame(stepVR);
    }
  }

  function stopVR() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Control 360° por arrastre de puntero / touch + clic para cosechar cristales 3D
  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const cy = ((e.clientY - rect.top) / rect.height) * canvas.height;

    // Verificar si el usuario hizo clic directamente sobre un octaedro/anillo 3D
    for (const r of rings3D) {
      const dist = Math.hypot(cx - r.screenX, cy - r.screenY);
      if (dist < Math.max(28, r.screenR * 1.25)) {
        collectRing();
        r.z += 1650;
        if (typeof spawnGlobalPollenBurst === "function") {
          spawnGlobalPollenBurst(e.clientX, e.clientY, 20);
        }
        return;
      }
    }

    isDragging = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    yawDeg -= dx * 0.35;
    pitchDeg = Math.max(-32, Math.min(32, pitchDeg - dy * 0.22));
    updateHudReadout();
  });

  const endDrag = () => {
    isDragging = false;
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  // Teclado WASD / Flechas cuando el canvas o visor tiene foco
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      e.preventDefault();
      playerX = Math.max(-165, playerX - 18);
      yawDeg -= 4;
      updateHudReadout();
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      e.preventDefault();
      playerX = Math.min(165, playerX + 18);
      yawDeg += 4;
      updateHudReadout();
    } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault();
      pitchDeg = Math.min(28, pitchDeg + 3);
    } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      e.preventDefault();
      pitchDeg = Math.max(-28, pitchDeg - 3);
    }
  });

  // Selector de mundos VR de Lima
  worldBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-vr-world") || "olivar";
      if (!VR_WORLDS[key]) return;
      activeWorldKey = key;
      worldBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (worldLabelEl) {
        const isEn = currentLang === "en_US";
        worldLabelEl.textContent = isEn ? VR_WORLDS[key].labelEn : VR_WORLDS[key].labelEs;
      }
    });
  });

  if (speedRange) {
    speedRange.addEventListener("input", (e) => {
      speedKmh = Number(e.target.value) || 22;
      updateHudReadout();
    });
  }

  // Modo Visor Estereoscópico SBS (Doble Lente VR)
  if (stereoBtn) {
    stereoBtn.addEventListener("click", () => {
      isStereoSBS = !isStereoSBS;
      visorShell.setAttribute("data-stereo", isStereoSBS ? "true" : "false");
      stereoBtn.setAttribute("aria-pressed", isStereoSBS ? "true" : "false");
    });
  }

  // Impulso Solar (+Velocidad y cosecha inmediata)
  if (boostBtn) {
    boostBtn.addEventListener("click", (e) => {
      boostTimer = 110;
      collectRing();
      if (typeof spawnGlobalPollenBurst === "function") {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top, 24);
      }
    });
  }

  // Giroscopio 360° (DeviceOrientation para móviles y cascos Cardboard)
  if (gyroBtn) {
    let gyroEnabled = false;
    gyroBtn.addEventListener("click", async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const perm = await DeviceOrientationEvent.requestPermission();
          if (perm !== "granted") return;
        } catch (_) {}
      }
      gyroEnabled = !gyroEnabled;
      gyroBtn.setAttribute("aria-pressed", gyroEnabled ? "true" : "false");
      if (gyroEnabled) {
        window.addEventListener(
          "deviceorientation",
          (ev) => {
            if (!gyroEnabled) return;
            if (typeof ev.alpha === "number") yawDeg = ev.alpha;
            if (typeof ev.beta === "number") {
              pitchDeg = Math.max(-30, Math.min(30, ev.beta - 45));
            }
            updateHudReadout();
          },
          { passive: true }
        );
      }
    });
  }

  // Inmersión Pantalla Completa / WebXR
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement && visorShell.requestFullscreen) {
        visorShell.requestFullscreen().catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Pausar renderizado 3D cuando la sección VR está fuera de pantalla (efficient-background-processing)
  vrSection.addEventListener("contentvisibilityautostatechange", (event) => {
    if (event.skipped) {
      stopVR();
    } else {
      startVR();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startVR();
          } else {
            stopVR();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(vrSection);
  } else {
    startVR();
  }
}

// ==================== ARTEFACTO 3D INTERACTIVO: BIOCUBO HOLOGRÁFICO DE 6 CARAS ====================
function setupInteractive3DEcoCube() {
  const dragZone = document.getElementById("ecocube-drag-zone");
  const cubeScene = document.getElementById("ecocube-scene");
  const faceBtns = document.querySelectorAll(".cube-face-btn");
  const explodeBtn = document.getElementById("cube-explode-btn");
  const spinBtn = document.getElementById("cube-autospin-btn");

  if (!dragZone || !cubeScene) return;

  let rotX = -18;
  let rotY = 28;
  let isDraggingCube = false;
  let startX = 0;
  let startY = 0;
  let autoSpin = true;

  function applyCubeTransform() {
    cubeScene.style.setProperty("--cube-rx", `${rotX.toFixed(1)}deg`);
    cubeScene.style.setProperty("--cube-ry", `${rotY.toFixed(1)}deg`);
  }

  dragZone.addEventListener("pointerdown", (e) => {
    isDraggingCube = true;
    autoSpin = false;
    if (spinBtn) spinBtn.setAttribute("aria-pressed", "false");
    startX = e.clientX;
    startY = e.clientY;
    dragZone.setPointerCapture?.(e.pointerId);
  });

  dragZone.addEventListener("pointermove", (e) => {
    if (!isDraggingCube) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;

    rotY += dx * 0.65;
    rotX = Math.max(-85, Math.min(85, rotX - dy * 0.65));
    applyCubeTransform();
  });

  const stopCubeDrag = () => {
    isDraggingCube = false;
  };
  dragZone.addEventListener("pointerup", stopCubeDrag);
  dragZone.addEventListener("pointercancel", stopCubeDrag);

  faceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      autoSpin = false;
      if (spinBtn) spinBtn.setAttribute("aria-pressed", "false");
      faceBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      rotX = Number(btn.getAttribute("data-rot-x")) || -16;
      rotY = Number(btn.getAttribute("data-rot-y")) || 24;
      applyCubeTransform();
    });
  });

  if (explodeBtn) {
    explodeBtn.addEventListener("click", (e) => {
      const currentlyExploded = cubeScene.getAttribute("data-exploded") === "true";
      const nextState = !currentlyExploded;
      cubeScene.setAttribute("data-exploded", nextState ? "true" : "false");
      explodeBtn.setAttribute("aria-pressed", nextState ? "true" : "false");
      if (nextState && typeof spawnGlobalPollenBurst === "function") {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnGlobalPollenBurst(rect.left + rect.width / 2, rect.top, 22);
      }
    });
  }

  if (spinBtn) {
    spinBtn.addEventListener("click", () => {
      autoSpin = !autoSpin;
      spinBtn.setAttribute("aria-pressed", autoSpin ? "true" : "false");
    });
  }

  function spinTick() {
    if (autoSpin && !isDraggingCube) {
      rotY += 0.35;
      applyCubeTransform();
    }
    requestAnimationFrame(spinTick);
  }
  requestAnimationFrame(spinTick);
}

document.addEventListener("DOMContentLoaded", () => {
  setupSiblingIndexFallback();
  setupBiomeSwitcher();
  setupLanguageToggle();
  setupSpatialDepthField();
  setup3DTiltCards();
  setupSimulator();
  setupVR360Portal();
  setupInteractive3DEcoCube();
  setupAlchemyLab();
  setupExplodedArchitectureStack();
  setupCircularScrollytelling();
  setupCircularParticleReactor();
  setupShowcaseTabs();
  setupSpotlightCards();
  setupTermsModal();
  setupScrollTelemetry();
  applyTranslations(currentLang);
  checkBackendHealth();
});
