/**
 * EcoCommute Landing Page — Movilidad Urbana, Comparador Vehicular 3D,
 * Simulador de Carril Vial en Lima, Boleto de Cambio Modal & i18n (es_419 / en_US)
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
        "«El corredor de Av. Salaverry ofrece ciclovía segregada continua y pendiente plana: evitas 547 g de CO₂ y llegas 7 minutos antes que en auto particular.»"
    },
    en: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "“The Av. Salaverry corridor provides a continuous protected bike lane and flat terrain: you avoid 547 g of CO₂ and arrive 7 minutes faster than driving.”"
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
        "«Por la ciclovía costera del Malecón Paul Harris y Cisneros avanzas sin cruces semafóricos pesados, dejando de emitir 441 g de CO₂ en un trayecto corto.»"
    },
    en: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "“Riding along the Malecón coastal bike path bypasses heavy intersections, avoiding 441 g of CO₂ on a quick coastal commute.”"
    }
  }
};

const VEHICLE_SPECS = {
  bike: {
    badge: "0 g CO₂ / km",
    isDanger: false,
    speed: "18 km/h",
    space: "1.5 m²",
    pts: "+15 pts / 4.2 km",
    es: {
      code: "MODO 01 // TRACCIÓN HUMANA · CICLOVÍA SEGREGADA",
      chassis: "ESPACIO EN VÍA: 1.5 m² / VIAJERO · 0 COMBUSTIBLE",
      laneSummary: "30 ciclistas = 0 g CO₂ · Fluidez continua (18 km/h)"
    },
    en: {
      code: "MODE 01 // HUMAN TRACTION · PROTECTED BIKE LANE",
      chassis: "ROAD FOOTPRINT: 1.5 m² / RIDER · ZERO FUEL",
      laneSummary: "30 cyclists = 0 g CO₂ · Continuous flow (18 km/h)"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="6 4" />
        <circle cx="88" cy="68" r="24" stroke="#18191B" stroke-width="4" />
        <circle cx="88" cy="68" r="4" fill="#D84A27" />
        <circle cx="228" cy="68" r="24" stroke="#18191B" stroke-width="4" />
        <circle cx="228" cy="68" r="4" fill="#D84A27" />
        <path d="M88 68 L136 32 L202 32 L152 68 Z" stroke="#D84A27" stroke-width="4" stroke-linejoin="round" />
        <path d="M136 32 L152 68 M124 22 L146 22 M202 32 L228 68 M194 18 L212 22" stroke="#18191B" stroke-width="3.5" stroke-linecap="round" />
        <rect x="24" y="14" width="66" height="18" rx="4" fill="#286646" />
        <text x="57" y="26" text-anchor="middle" fill="#FAF7F0" font-family="JetBrains Mono" font-size="9" font-weight="700">0g CO₂/km</text>
      </svg>
    `
  },
  scooter: {
    badge: "0 g CO₂ / km*",
    isDanger: false,
    speed: "20 km/h",
    space: "1.2 m²",
    pts: "+14 pts / 4.2 km",
    es: {
      code: "MODO 02 // MICROMOVILIDAD ELÉCTRICA · ÚLTIMA MILLA",
      chassis: "ESPACIO EN VÍA: 1.2 m² / VIAJERO · INTERMODAL",
      laneSummary: "30 scooters = 0 g CO₂ de escape · Ágil en interconexión"
    },
    en: {
      code: "MODE 02 // ELECTRIC MICROMOBILITY · LAST MILE",
      chassis: "ROAD FOOTPRINT: 1.2 m² / RIDER · INTERMODAL",
      laneSummary: "30 e-scooters = 0 g tailpipe CO₂ · Agile last-mile link"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="6 4" />
        <circle cx="96" cy="76" r="16" stroke="#18191B" stroke-width="4" />
        <circle cx="220" cy="76" r="16" stroke="#18191B" stroke-width="4" />
        <path d="M96 76 H196 L214 20 M198 20 H224" stroke="#1F5666" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="118" y="68" width="64" height="8" rx="4" fill="#D84A27" />
        <rect x="24" y="14" width="84" height="18" rx="4" fill="#1F5666" />
        <text x="66" y="26" text-anchor="middle" fill="#FAF7F0" font-family="JetBrains Mono" font-size="9" font-weight="700">E-MICRO 20km/h</text>
      </svg>
    `
  },
  transit: {
    badge: "38 g CO₂ / km",
    isDanger: false,
    speed: "24 km/h",
    space: "0.8 m²",
    pts: "+10 pts / 4.2 km",
    es: {
      code: "MODO 03 // CORREDOR SEGREGADO & METRO LÍNEA 1",
      chassis: "ESPACIO EN VÍA: 0.8 m² / PASAJERO · ALTA CAPACIDAD",
      laneSummary: "1 unidad masiva reemplaza hasta 35 autos particulares"
    },
    en: {
      code: "MODE 03 // DEDICATED BUS CORRIDOR & METRO LINE 1",
      chassis: "ROAD FOOTPRINT: 0.8 m² / PASSENGER · HIGH CAPACITY",
      laneSummary: "1 transit unit replaces up to 35 single-occupancy cars"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="6 4" />
        <rect x="44" y="26" width="232" height="52" rx="8" fill="#FAF7F0" stroke="#18191B" stroke-width="3.5" />
        <rect x="58" y="36" width="38" height="22" rx="3" fill="#1F5666" fill-opacity="0.25" stroke="#18191B" stroke-width="2" />
        <rect x="106" y="36" width="38" height="22" rx="3" fill="#1F5666" fill-opacity="0.25" stroke="#18191B" stroke-width="2" />
        <rect x="154" y="36" width="38" height="22" rx="3" fill="#1F5666" fill-opacity="0.25" stroke="#18191B" stroke-width="2" />
        <rect x="202" y="36" width="56" height="22" rx="3" fill="#D84A27" fill-opacity="0.25" stroke="#18191B" stroke-width="2" />
        <circle cx="92" cy="80" r="13" fill="#18191B" />
        <circle cx="228" cy="80" r="13" fill="#18191B" />
      </svg>
    `
  },
  car: {
    badge: "152 g CO₂ / km",
    isDanger: true,
    speed: "12 km/h",
    space: "18.0 m²",
    pts: "0 pts (Línea Base)",
    es: {
      code: "MODO 04 // AUTOMÓVIL PARTICULAR EN HORA PUNTA",
      chassis: "ESPACIO EN VÍA: 18.0 m² · OCUPACIÓN MEDIA: 1.2 PERSONAS",
      laneSummary: "30 autos = 4,560 g CO₂/km · Congestión severa (12 km/h)"
    },
    en: {
      code: "MODE 04 // PRIVATE PASSENGER CAR IN RUSH HOUR",
      chassis: "ROAD FOOTPRINT: 18.0 m² · AVG OCCUPANCY: 1.2 PEOPLE",
      laneSummary: "30 cars = 4,560 g CO₂/km · Severe gridlock (12 km/h)"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="6 4" />
        <path d="M56 74 L74 42 H198 L226 56 L264 62 V78 H56 Z" fill="#F6E0DC" stroke="#B83227" stroke-width="3.5" stroke-linejoin="round" />
        <circle cx="98" cy="78" r="15" fill="#18191B" />
        <circle cx="222" cy="78" r="15" fill="#18191B" />
        <circle cx="34" cy="68" r="7" fill="#B83227" fill-opacity="0.35" />
        <circle cx="20" cy="62" r="10" fill="#B83227" fill-opacity="0.22" />
        <rect x="92" y="14" width="136" height="18" rx="4" fill="#B83227" />
        <text x="160" y="26" text-anchor="middle" fill="#FAF7F0" font-family="JetBrains Mono" font-size="9" font-weight="700">152 g CO₂/km · HORA PUNTA</text>
      </svg>
    `
  }
};

const translations = {
  es_419: {
    "page.title": "EcoCommute — Movilidad Urbana, Vehículos y Cambio Modal en Lima",
    "nav.skip": "Saltar al contenido principal",
    "topbar.badge": "RED DE MOVILIDAD SOSTENIBLE · LIMA METROPOLITANA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 endpoints",
    "topbar.recycled_label": "CO₂ EVITADO HOY:",
    "topbar.swagger": "Swagger OpenAPI",
    "biome.caliza": "Caliza Vial",
    "biome.asfalto": "Asfalto",
    "biome.ferroviario": "Ferroviario",
    "nav.aria": "Navegación principal",
    "nav.vehicles": "Vehículos 3D",
    "nav.alchemy": "Boleto & Ahorro",
    "nav.why": "El Tráfico",
    "nav.features": "Plataforma",
    "nav.screens": "Pantallas",
    "nav.team": "Equipo",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero
    "hero.kicker": "Lima · ODS 11 · Meta 11.2 · Ingeniería de Sistemas UPC",
    "hero.title": "Antes de encender el auto en el tráfico de Lima, ",
    "hero.title_em": "mira lo que ahorras cambiando de vehículo.",
    "hero.lead":
      "EcoCommute compara en segundos tu trayecto en bicicleta, scooter, transporte público o caminata frente al automóvil particular usando OSRM y Google Gemini 1.5 Flash: calcula el tiempo real en hora punta, los gramos de CO₂ que evitas emitir y los puntos canjeables que ganas en tu distrito.",
    "hero.flora_tag": "BITÁCORA DE DESPLAZAMIENTO DE TU SESIÓN",
    "hero.btn_vehicles": "Explorar Comparador de Vehículos 3D",
    "hero.btn_simulator": "Calcular Boleto de Ahorro Anual",
    "hero.btn_screens": "Ver las pantallas →",
    "hero.stat1_label": "Emisión media en auto",
    "hero.stat2_label": "Ciclovía / Caminata",
    "hero.stat2_unit": "g CO₂/km directo",
    "hero.stat3_label": "Backend verificado",
    "hero.stat3_unit": "tests en verde",
    "hero.card_label": "TABLERO DE CORREDOR VIAL · SIMULADOR EN VIVO",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "En automóvil particular (152 g/km)",
    "hero.car_val": "638 g de CO₂",
    "hero.bike": "En bicicleta / scooter / a pie",
    "hero.bike_val": "0 g de CO₂",
    "hero.points": "Recompensa por el viaje",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot":
      "Así se valida cada trayecto en EcoCommute. Los factores de emisión por vehículo están fijados en el backend.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "VISTA DEL CARRIL:",
    "sim.cam_iso": "Isométrica 3D",
    "sim.cam_orbit": "Rasante Vial",
    "sim.cam_flat": "Plano 2D",
    "sim.by_bike": "en bici",
    "sim.by_car_traffic": "en auto (tráfico)",
    "sim.adjust_distance": "Distancia del trayecto urbano",
    "sim.pet_equiv_label": "Equivalencia en envases PET",
    "sim.gemini_tag": "COPILOTO VIAL · GOOGLE GEMINI 1.5 FLASH",
    "sim.gemini_miraflores":
      "«Por la ciclovía de Av. Arequipa llegas en 14 min sin congestión vehicular, ahorras 638 g de CO₂ frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.»",
    "sim.btn_recycle_trip": "Registrar este viaje sin auto en mi bitácora",

    // Vehicles 3D Section
    "veh.title": "Compara cada vehículo en las calles de Lima: espacio vial, velocidad y emisiones",
    "veh.intro":
      "Selecciona un medio de transporte o gira la plataforma 3D con el mouse para inspeccionar cuánto espacio ocupa en la pista, a qué velocidad avanza en hora punta y cuánto carbono emite por kilómetro.",
    "veh.lbl_speed": "VELOCIDAD HORA PUNTA",
    "veh.lbl_space": "OCUPACIÓN DE PISTA",
    "veh.lbl_pts": "PUNTOS ECOCOMMUTE",
    "veh.drag_hint": "↔ ARRASTRA CON EL MOUSE PARA ROTAR EL VEHÍCULO EN 3D · HAZ CLIC EN CUALQUIER MODO",
    "veh.lane_sim_title": "FLUJO EN VIVO: ¿CÓMO SE MUEVEN 30 PERSONAS EN 1 CUADRA DE AV. JAVIER PRADO?",
    "veh.mode_bike": "Bicicleta Urbana / Ciclovía",
    "veh.mode_bike_desc":
      "Evita los cuellos de botella de Av. Arequipa, Salaverry y Primavera. Ocupa 12 veces menos espacio vial que un automóvil y genera el máximo de Puntos Verdes.",
    "veh.mode_scooter": "Scooter Eléctrico / Patinete",
    "veh.mode_scooter_desc":
      "Ideal para conectar el último kilómetro entre estaciones del Metropolitano o Línea 1 del Metro y el campus universitario sin esfuerzo físico en pendientes.",
    "veh.mode_transit": "Transporte Masivo (Bus / Tren)",
    "veh.mode_transit_desc":
      "En tramos largos interdistritales, compartir unidad reduce un 75% la huella por pasajero frente al auto individual y libera decenas de metros de calzada.",
    "veh.mode_car": "Automóvil Particular en Tráfico",
    "veh.mode_car_desc":
      "Con una ocupación media de 1.2 personas por vehículo en Lima, consume 18 m² de vía pública, avanza a 12 km/h en hora punta y emite 152 g de CO₂ cada kilómetro.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "¿Cuánto ahorras al año dejando el auto estacionado algunos días por semana?",
    "alchemy.intro":
      "Ajusta tus viajes por semana y la distancia de tu ruta habitual en Lima para emitir tu boleto de impacto anual en carbono evitado, reciclaje equivalente y puntos canjeables.",
    "alchemy.p1": "🚲 3 días en bici (6 viajes/sem)",
    "alchemy.p2": "🎓 Commuter UPC (10 viajes/sem)",
    "alchemy.p3": "⚡ Sin Auto 100% (14 viajes/sem)",
    "alchemy.slider_trips": "Viajes sin auto por semana",
    "alchemy.slider_km": "Distancia media por trayecto",
    "alchemy.fuel_label": "COMBUSTIBLE NO QUEMADO",
    "alchemy.hours_label": "TIEMPO LIBRE DE CONGESTIÓN",
    "alchemy.annual_saved_label": "EMISIONES DE ESCAPE EVITADAS AL AÑO",
    "alchemy.card1_title": "Botellas plásticas PET recicladas",
    "alchemy.card1_desc":
      "Equivalente en huella de carbono evitada al recuperar botellas de 500 ml (82.8 g CO₂ evitados por envase).",
    "alchemy.card2_title": "Latas de aluminio recuperadas",
    "alchemy.card2_desc":
      "Ahorro energético equivalente a reciclar latas frente a fundir aluminio primario desde cero (170 g CO₂/lata).",
    "alchemy.card3_title": "Árboles urbanos absorbiendo 1 año",
    "alchemy.card3_desc":
      "Cantidad de árboles adultos trabajando durante 365 días para fijar el mismo volumen de CO₂ vehicular (21 kg/año).",
    "alchemy.card4_title": "Puntos Verdes canjeables",
    "alchemy.card4_desc":
      "Puntos acumulados en tu cuenta de EcoCommute para mantenimiento de bicicleta, accesorios viales y comercios aliados.",

    // Story
    "story.title": "Por qué existe",
    "story.sidebar_note":
      "Un ciudadano en Lima pierde más de 150 horas al año en congestión vehicular, mientras las emisiones del transporte siguen fuera del radar en las apps de mapas habituales.",
    "story.p1":
      "En Lima la decisión de cómo movernos se toma por rapidez, costo o costumbre. Nadie ve cuánto CO₂ produce el trayecto que acaba de elegir, y las herramientas de mapas simplemente comparten tiempo y tráfico: el impacto ambiental queda fuera de la pantalla.",
    "story.p2_pre": "Lo que falta no es otro mapa. Falta ver el costo ambiental de la decisión ",
    "story.p2_under": "antes",
    "story.p2_post":
      " de tomarla, y algo que te haga querer repetir la alternativa buena la semana siguiente. Eso es lo que intentamos construir.",
    "story.comp_old_tag": "Navegadores de tráfico tradicionales",
    "story.comp_old_desc":
      "Optimizan únicamente para el automóvil, ocultan la huella de carbono por kilómetro y no premian el cambio hacia modos limpios.",
    "story.comp_new_tag": "Enfoque de movilidad EcoCommute",
    "story.comp_new_desc":
      "Compara tiempos reales en bici, a pie o transporte público, cuantifica los gramos de CO₂ evitados antes de salir y convierte cada viaje en puntos.",
    "story.quote":
      "«Si el ahorro de CO₂ se ve igual de concreto que los minutos del viaje, la gente lo considera.»",
    "story.quote_author": "— El equipo EcoCommute, probando la app con usuarios en Lima",

    // Features
    "feat.title": "Qué hace hoy la plataforma",
    "feat.intro":
      "Seis módulos operativos en producción sobre Spring Boot 3.3, PostgreSQL, OSRM y Google Gemini 1.5 Flash, respaldados por 28 tests automatizados.",
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

    // ODS
    "ods.title": "Alineados con el ODS 11 (Meta 11.2) e Inteligencia Artificial",
    "ods.desc":
      "EcoCommute responde de manera directa al Objetivo de Desarrollo Sostenible 11 de la ONU (Meta 11.2: Proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos). Además, optimizamos la toma de decisiones con Google Gemini 1.5 Flash para brindar explicaciones contextuales.",
    "ods.badge_ods": "ODS 11 · Meta 11.2: Movilidad Sostenible",
    "ods.badge_ai": "Optimización con IA · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Ruteo Open Source OSRM",

    // Demo
    "demo.title": "Cómo se ve",
    "demo.tab_all": "Vista comparativa",
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

    // Contact & Footer
    "contact.title": "Pruébalo y cuéntanos",
    "contact.intro": "Si algo no te convence o tienes una idea para Lima, escríbenos: leemos todo.",
    "contact.github": "Código en GitHub",
    "contact.swagger": "API & Swagger en Render",
    "contact.linkedin": "EcoCommute en LinkedIn",
    "footer.academic": "EcoCommute · Trabajo Parcial de Aplicaciones Web (UPC 2026-2)",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
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
    "page.title": "EcoCommute — Urban Mobility, Vehicles & Modal Shift in Lima",
    "nav.skip": "Skip to main content",
    "topbar.badge": "SUSTAINABLE MOBILITY NETWORK · LIMA METROPOLITAN AREA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 endpoints",
    "topbar.recycled_label": "CO₂ AVOIDED TODAY:",
    "topbar.swagger": "Swagger OpenAPI",
    "biome.caliza": "Road Limestone",
    "biome.asfalto": "Night Tarmac",
    "biome.ferroviario": "Rail Cobalt",
    "nav.aria": "Main navigation",
    "nav.vehicles": "3D Vehicles",
    "nav.alchemy": "Transit Pass & Savings",
    "nav.why": "Lima Traffic",
    "nav.features": "Platform",
    "nav.screens": "Screenshots",
    "nav.team": "Team",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero
    "hero.kicker": "Lima · SDG 11 · Target 11.2 · UPC Systems Engineering",
    "hero.title": "Before starting your car in Lima traffic, ",
    "hero.title_em": "see what you save by switching vehicles.",
    "hero.lead":
      "EcoCommute compares your bicycle, e-scooter, public transit, or walking commute against driving in seconds using OSRM and Google Gemini 1.5 Flash: see rush-hour travel times, avoided CO₂ emissions, and redeemable Green Points across Lima districts.",
    "hero.flora_tag": "ACTIVE SESSION COMMUTE LOGBOOK",
    "hero.btn_vehicles": "Explore 3D Vehicle Comparator",
    "hero.btn_simulator": "Calculate Annual Transit Savings",
    "hero.btn_screens": "View Screenshots →",
    "hero.stat1_label": "Average car emission",
    "hero.stat2_label": "Bike lane / Walking",
    "hero.stat2_unit": "g direct CO₂/km",
    "hero.stat3_label": "Verified backend",
    "hero.stat3_unit": "passing tests",
    "hero.card_label": "TRANSIT CORRIDOR BOARD · LIVE SIMULATOR",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "By passenger car (152 g/km)",
    "hero.car_val": "638 g of CO₂",
    "hero.bike": "By bicycle / scooter / walking",
    "hero.bike_val": "0 g of CO₂",
    "hero.points": "Commute reward",
    "hero.points_val": "+15 green points",
    "hero.card_foot":
      "This is how every commute is validated in EcoCommute. Vehicle emission factors are fixed server-side.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "LANE VIEW:",
    "sim.cam_iso": "3D Isometric",
    "sim.cam_orbit": "Road Level",
    "sim.cam_flat": "2D Plan",
    "sim.by_bike": "by bike",
    "sim.by_car_traffic": "by car (traffic)",
    "sim.adjust_distance": "Urban corridor distance",
    "sim.pet_equiv_label": "Equivalent PET containers",
    "sim.gemini_tag": "TRANSIT COPILOT · GOOGLE GEMINI 1.5 FLASH",
    "sim.gemini_miraflores":
      "“Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of CO₂ vs. driving (152 g/km) and earning Miraflores leaderboard points.”",
    "sim.btn_recycle_trip": "Log this car-free commute into my session",

    // Vehicles 3D Section
    "veh.title": "Compare every vehicle on Lima's streets: road footprint, rush-hour speed, and emissions",
    "veh.intro":
      "Select a transport mode or drag the 3D turntable to inspect how much street space it occupies, how fast it moves in rush hour, and how much carbon it emits per kilometer.",
    "veh.lbl_speed": "RUSH-HOUR SPEED",
    "veh.lbl_space": "ROAD FOOTPRINT",
    "veh.lbl_pts": "ECOCOMMUTE POINTS",
    "veh.drag_hint": "↔ DRAG WITH YOUR MOUSE TO ROTATE THE 3D VEHICLE · CLICK ANY MODE BELOW",
    "veh.lane_sim_title": "LIVE LANE FLOW: HOW DO 30 COMMUTERS MOVE ACROSS 1 BLOCK OF AV. JAVIER PRADO?",
    "veh.mode_bike": "Urban Bicycle / Protected Bike Lane",
    "veh.mode_bike_desc":
      "Bypasses bottlenecks along Av. Arequipa, Salaverry, and Primavera. Takes 12× less road space than a car and earns maximum Green Points.",
    "veh.mode_scooter": "Electric Scooter / Micromobility",
    "veh.mode_scooter_desc":
      "Ideal for bridging the last kilometer between Metropolitano or Metro Line 1 stations and campus with effortless hill climbing.",
    "veh.mode_transit": "Mass Transit (Bus Corridor / Metro)",
    "veh.mode_transit_desc":
      "On longer inter-district commutes, sharing a high-capacity vehicle cuts per-passenger emissions by 75% vs. driving alone.",
    "veh.mode_car": "Private Passenger Car in Traffic",
    "veh.mode_car_desc":
      "With an average occupancy of 1.2 people per vehicle in Lima, it consumes 18 m² of public road, crawls at 12 km/h in rush hour, and emits 152 g CO₂/km.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "How much do you save a year by leaving your car parked a few days a week?",
    "alchemy.intro":
      "Adjust your weekly car-free trips and average commute distance in Lima to issue your annual impact pass in avoided carbon, recycling equivalents, and redeemable points.",
    "alchemy.p1": "🚲 3 days by bike (6 trips/wk)",
    "alchemy.p2": "🎓 UPC Commuter (10 trips/wk)",
    "alchemy.p3": "⚡ 100% Car-Free (14 trips/wk)",
    "alchemy.slider_trips": "Car-free trips per week",
    "alchemy.slider_km": "Average distance per trip",
    "alchemy.fuel_label": "UNBURNED GASOLINE",
    "alchemy.hours_label": "TRAFFIC HOURS SAVED",
    "alchemy.annual_saved_label": "TAILPIPE EMISSIONS AVOIDED PER YEAR",
    "alchemy.card1_title": "Recycled 500ml PET plastic bottles",
    "alchemy.card1_desc":
      "Equivalent carbon footprint avoided by recovering 500 ml PET bottles (82.8 g CO₂ avoided per container).",
    "alchemy.card2_title": "Recovered aluminum beverage cans",
    "alchemy.card2_desc":
      "Energy savings equivalent to recycling aluminum cans instead of smelting primary aluminum from bauxite (170 g CO₂/can).",
    "alchemy.card3_title": "Urban trees absorbing for 1 year",
    "alchemy.card3_desc":
      "Number of mature urban trees working 365 days to sequester the same volume of vehicular CO₂ (21 kg/year).",
    "alchemy.card4_title": "Redeemable Green Points",
    "alchemy.card4_desc":
      "Points accumulated in your EcoCommute account for bike tune-ups, safety gear, and partner rewards.",

    // Story
    "story.title": "Why it exists",
    "story.sidebar_note":
      "Lima commuters lose over 150 hours a year to traffic congestion, while transport emissions remain invisible in conventional navigation apps.",
    "story.p1":
      "In Lima, travel choices are made solely by speed, cost, or habit. Nobody sees the carbon footprint of their route, and map engines only display traffic times: environmental impact is left off-screen.",
    "story.p2_pre": "We do not need another generic map. We need to visualize the environmental cost of our choice ",
    "story.p2_under": "before",
    "story.p2_post":
      " making it, and provide incentives to repeat sustainable habits the next week. That is what we built.",
    "story.comp_old_tag": "Conventional traffic navigators",
    "story.comp_old_desc":
      "Optimize exclusively for cars, hide per-kilometer carbon emissions, and offer zero incentives for switching to clean modes.",
    "story.comp_new_tag": "The EcoCommute mobility approach",
    "story.comp_new_desc":
      "Compares real cycling, walking, and transit times, quantifies avoided CO₂ grams before departure, and rewards every sustainable trip.",
    "story.quote":
      "“If carbon savings are presented as clearly as travel minutes, commuters genuinely take them into account.”",
    "story.quote_author": "— The EcoCommute Team, testing the app with commuters in Lima",

    // Features
    "feat.title": "What the platform does today",
    "feat.intro":
      "Six production modules running on Spring Boot 3.3, PostgreSQL, OSRM, and Google Gemini 1.5 Flash, backed by 28 automated tests.",
    "feat.routes_title": "Sustainable Routes & Google Gemini",
    "feat.routes_desc":
      "Enter origin and destination, and the app builds alternatives via OSRM: distance, travel time by mode, and tailored insights. AI recommendations powered by Google Gemini 1.5 Flash explain clearly why a route is suggested.",
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

    // ODS
    "ods.title": "Aligned with UN SDG 11 (Target 11.2) & Artificial Intelligence",
    "ods.desc":
      "EcoCommute directly contributes to the United Nations Sustainable Development Goal 11 (Target 11.2: Providing access to safe, affordable, accessible, and sustainable transport systems for all). Furthermore, route evaluation is enhanced with Google Gemini 1.5 Flash for transparent, contextual advice.",
    "ods.badge_ods": "SDG 11 · Target 11.2: Sustainable Urban Mobility",
    "ods.badge_ai": "AI-Powered Optimization · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Open Source Routing Engine (OSRM)",

    // Demo
    "demo.title": "Application Preview",
    "demo.tab_all": "Side-by-side view",
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

    // Contact & Footer
    "contact.title": "Try it and Share Feedback",
    "contact.intro": "If you have an idea to improve mobility in Lima, reach out: we read every message.",
    "contact.github": "Code on GitHub",
    "contact.swagger": "API & Swagger on Render",
    "contact.linkedin": "EcoCommute on LinkedIn",
    "footer.academic": "EcoCommute · Web Application Architecture Midterm Project (UPC 2026-2)",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
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
let sessionTripsCount = 12;

let currentVehicleKey = "bike";
let alchemyTrips = 6;
let alchemyKm = 4.2;

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
      statusEl.innerHTML = `You have logged <strong>${sessionTripsCount} car-free trips</strong> and avoided <strong>${sessionRecycledGrams.toLocaleString()} g of CO₂</strong> (equal to <strong>${petEq} PET bottles</strong>).`;
    } else {
      statusEl.innerHTML = `Has registrado <strong>${sessionTripsCount} tramos sin auto</strong> y evitado <strong>${sessionRecycledGrams.toLocaleString()} g de CO₂</strong> (equivalentes a <strong>${petEq} botellas PET</strong>).`;
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

  if (routeTitleEl) routeTitleEl.textContent = `${localeData.routeTitle}, ${km.toFixed(1)} km`;
  if (coordsEl) coordsEl.textContent = corridor.coords;
  if (distOutEl) distOutEl.textContent = `${km.toFixed(1)} km`;
  if (carCo2El) carCo2El.textContent = isEn ? `${carCo2Grams} g of CO₂` : `${carCo2Grams} g de CO₂`;
  if (bikeCo2El) bikeCo2El.textContent = isEn ? "0 g of CO₂" : "0 g de CO₂";
  if (petEquivEl) petEquivEl.textContent = isEn ? `♻ ${petBottles} PET bottles` : `♻ ${petBottles} botellas PET`;
  if (pointsEl) pointsEl.textContent = isEn ? `+${greenPoints} green points` : `+${greenPoints} puntos verdes`;
  if (bikeTimeEl) bikeTimeEl.textContent = `${bikeMin} min`;
  if (carTimeEl) carTimeEl.textContent = `${carMin} min`;
  if (geminiTextEl) geminiTextEl.textContent = localeData.gemini;
  if (svgCarPath) svgCarPath.setAttribute("d", corridor.carPath);
  if (svgEcoPath) svgEcoPath.setAttribute("d", corridor.ecoPath);
  if (originTagEl) originTagEl.textContent = corridor.originTag;
  if (destTagEl) destTagEl.textContent = corridor.destTag;
}

function renderVehicleStage() {
  const isEn = currentLang === "en_US";
  const spec = VEHICLE_SPECS[currentVehicleKey] || VEHICLE_SPECS.bike;
  const copy = isEn ? spec.en : spec.es;

  const codeEl = document.getElementById("veh-stage-code");
  const badgeEl = document.getElementById("veh-stage-badge");
  const chassisEl = document.getElementById("veh-chassis-dim");
  const svgContainer = document.getElementById("veh-svg-container");
  const speedEl = document.getElementById("veh-stat-speed");
  const spaceEl = document.getElementById("veh-stat-space");
  const ptsEl = document.getElementById("veh-stat-pts");
  const laneSummaryEl = document.getElementById("veh-lane-summary");

  if (codeEl) codeEl.textContent = copy.code;
  if (badgeEl) {
    badgeEl.textContent = spec.badge;
    badgeEl.classList.toggle("is-danger", spec.isDanger);
  }
  if (chassisEl) chassisEl.textContent = copy.chassis;
  if (svgContainer) svgContainer.innerHTML = spec.svg;
  if (speedEl) speedEl.textContent = spec.speed;
  if (spaceEl) spaceEl.textContent = spec.space;
  if (ptsEl) ptsEl.textContent = spec.pts;
  if (laneSummaryEl) laneSummaryEl.textContent = copy.laneSummary;
}

function renderAlchemyLab() {
  const isEn = currentLang === "en_US";
  const annualKm = alchemyTrips * alchemyKm * 52;
  const annualGrams = annualKm * 152;
  const annualKgNum = annualGrams / 1000;
  const annualKg = annualKgNum.toFixed(1);
  const petBottles = Math.round(annualGrams / 82.8);
  const aluCans = Math.round(annualGrams / 170);
  const trees = (annualGrams / 21000).toFixed(1);
  const greenPoints = Math.round(annualKm * 3.57);
  const fuelLiters = Math.round(annualKm * 0.065);
  const trafficHours = Math.round((alchemyTrips * 52 * (alchemyKm * 1.9)) / 60);

  const tripsOut = document.getElementById("alchemy-trips-out");
  const kmOut = document.getElementById("alchemy-km-out");
  const annualKgEl = document.getElementById("alchemy-annual-kg");
  const fuelEl = document.getElementById("alchemy-fuel-liters");
  const hoursEl = document.getElementById("alchemy-traffic-hours");
  const petEl = document.getElementById("eq-pet-bottles");
  const aluEl = document.getElementById("eq-alu-cans");
  const treesEl = document.getElementById("eq-trees");
  const ptsEl = document.getElementById("eq-green-points");
  const tokenGrid = document.getElementById("pet-token-visualizer");

  if (tripsOut) tripsOut.textContent = isEn ? `${alchemyTrips} trips/wk` : `${alchemyTrips} viajes/sem`;
  if (kmOut) kmOut.textContent = `${alchemyKm.toFixed(1)} km`;
  if (annualKgEl) annualKgEl.textContent = annualKg;
  if (fuelEl) fuelEl.textContent = isEn ? `${fuelLiters} L / yr` : `${fuelLiters} L / año`;
  if (hoursEl) hoursEl.textContent = isEn ? `${trafficHours} h / yr` : `${trafficHours} h / año`;
  if (petEl) petEl.textContent = petBottles.toLocaleString();
  if (aluEl) aluEl.textContent = aluCans.toLocaleString();
  if (treesEl) treesEl.textContent = trees;
  if (ptsEl) ptsEl.textContent = `+${greenPoints.toLocaleString()}`;

  if (tokenGrid) {
    const dotsCount = Math.min(32, Math.max(6, Math.round(petBottles / 120)));
    tokenGrid.innerHTML = "";
    for (let i = 0; i < dotsCount; i++) {
      const span = document.createElement("span");
      span.className = "pet-dot";
      tokenGrid.appendChild(span);
    }
  }
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
      esSpan.classList.toggle("active", lang !== "en_US");
      enSpan.classList.toggle("active", lang === "en_US");
    }
  }

  updateSessionFloraBanner();
  renderSimulatorMetrics();
  renderVehicleStage();
  renderAlchemyLab();
}

function setupLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const nextLang = currentLang === "es_419" ? "en_US" : "es_419";
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => applyTranslations(nextLang));
      transition.finished.finally(() => toggleBtn.focus({ preventScroll: true }));
    } else {
      applyTranslations(nextLang);
    }
  });
}

// Selector de Paleta Cartográfica (Caliza Vial, Asfalto Nocturno, Ferroviario)
function setupBiomeSwitcher() {
  const chips = document.querySelectorAll(".biome-chip");
  const validPalettes = ["caliza", "asfalto", "ferroviario"];
  let savedBiome = localStorage.getItem("ecocommute_biome") || "caliza";
  if (!validPalettes.includes(savedBiome)) {
    savedBiome = "caliza";
  }
  document.documentElement.setAttribute("data-biome", savedBiome);

  chips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.getAttribute("data-biome-target") === savedBiome);
    chip.addEventListener("click", () => {
      const targetBiome = chip.getAttribute("data-biome-target") || "caliza";
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
        transition.finished.finally(() => routeTitleEl?.focus({ preventScroll: true }));
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
      if (holoStage) holoStage.setAttribute("data-cam-mode", mode);
    });
  });

  if (rangeInput) {
    rangeInput.addEventListener("input", (e) => {
      currentKm = parseFloat(e.target.value) || 4.2;
      renderSimulatorMetrics();
    });
  }

  if (recycleBtn) {
    recycleBtn.addEventListener("click", () => {
      const addedGrams = Math.round(currentKm * 152);
      sessionRecycledGrams += addedGrams;
      sessionTripsCount += 1;
      updateSessionFloraBanner();
    });
  }
}

// ==================== GARAJE & COMPARADOR VEHICULAR 3D + SIMULADOR DE CARRIL ====================
function setupVehicle3DStudio() {
  const section = document.getElementById("vehiculos");
  const dragZone = document.getElementById("vehicle-drag-zone");
  const card3D = document.getElementById("vehicle-3d-card");
  const optionCards = document.querySelectorAll(".vehicle-option-card");
  const canvas = document.getElementById("transit-corridor-canvas");

  if (!section || !dragZone || !card3D) return;

  let rotX = -8;
  let rotY = 14;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function updateCardRotation() {
    card3D.style.setProperty("--veh-rx", `${rotX.toFixed(1)}deg`);
    card3D.style.setProperty("--veh-ry", `${rotY.toFixed(1)}deg`);
  }

  dragZone.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    dragZone.setPointerCapture?.(e.pointerId);
  });

  dragZone.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;

    rotY = Math.max(-42, Math.min(42, rotY + dx * 0.45));
    rotX = Math.max(-28, Math.min(28, rotX - dy * 0.35));
    updateCardRotation();
  });

  const endDrag = () => {
    isDragging = false;
  };
  dragZone.addEventListener("pointerup", endDrag);
  dragZone.addEventListener("pointercancel", endDrag);

  optionCards.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-vehicle") || "bike";
      if (!VEHICLE_SPECS[key]) return;
      currentVehicleKey = key;
      optionCards.forEach((b) => b.classList.toggle("is-active", b === btn));

      // Pequeño giro 3D de presentación al cambiar de vehículo
      rotY = key === "car" ? -16 : 16;
      rotX = -8;
      updateCardRotation();
      renderVehicleStage();
    });
  });

  renderVehicleStage();

  // Simulación comparativa en vivo en <canvas> (Ciclovía vs. Tráfico de Autos)
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ecoUnits = Array.from({ length: 8 }, (_, i) => ({
    x: i * 86,
    speed: 2.35
  }));

  const carUnits = Array.from({ length: 9 }, (_, i) => ({
    x: i * 74,
    speed: 0.55
  }));

  let rafId = null;

  function drawLaneComparison() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo de calzada dividida
    ctx.fillStyle = "#1f2327";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Carril Superior: Ciclovía / Vía Sostenible
    ctx.fillStyle = "rgba(40, 102, 70, 0.25)";
    ctx.fillRect(0, 0, canvas.width, 54);

    // Línea divisoria central de calzada
    ctx.strokeStyle = "#e59a23";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.moveTo(0, 58);
    ctx.lineTo(canvas.width, 58);
    ctx.stroke();
    ctx.setLineDash([]);

    // Etiquetas de carril
    ctx.fillStyle = "#d8e6dd";
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText("CICLOVÍA / VÍA SOSTENIBLE (18–24 km/h · 0g CO₂)", 12, 16);

    ctx.fillStyle = "#f4c7be";
    ctx.fillText("CARRIL DE AUTOS EN HORA PUNTA (12 km/h · 152g CO₂/km)", 12, 74);

    // Mover y dibujar unidades sostenibles (carril superior)
    for (const u of ecoUnits) {
      u.x = (u.x + u.speed) % (canvas.width + 40);
      const drawX = u.x - 20;
      ctx.fillStyle = "#489e6c";
      ctx.beginPath();
      ctx.roundRect(drawX, 24, 26, 18, 4);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = '700 8px "JetBrains Mono", monospace';
      ctx.fillText(currentVehicleKey === "transit" ? "BUS" : "BICI", drawX + 3, 36);
    }

    // Mover y dibujar fila congestionada de autos (carril inferior)
    for (const c of carUnits) {
      c.x = (c.x + c.speed) % (canvas.width + 55);
      const drawX = c.x - 28;
      ctx.fillStyle = "#d84a27";
      ctx.beginPath();
      ctx.roundRect(drawX, 82, 46, 22, 4);
      ctx.fill();

      ctx.fillStyle = "#fff5f2";
      ctx.font = '700 8px "JetBrains Mono", monospace';
      ctx.fillText("152g", drawX + 10, 96);
    }

    rafId = requestAnimationFrame(drawLaneComparison);
  }

  function startLaneSim() {
    if (rafId === null) {
      rafId = requestAnimationFrame(drawLaneComparison);
    }
  }

  function stopLaneSim() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Pausar animación de canvas cuando la sección está fuera del viewport (efficient-background-processing)
  section.addEventListener("contentvisibilityautostatechange", (event) => {
    if (event.skipped) {
      stopLaneSim();
    } else {
      startLaneSim();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLaneSim();
          } else {
            stopLaneSim();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(section);
  } else {
    startLaneSim();
  }
}

function setupAlchemyLab() {
  const presets = document.querySelectorAll(".alchemy-preset");
  const tripsSlider = document.getElementById("alchemy-trips-range");
  const kmSlider = document.getElementById("alchemy-km-range");

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
}

// Inclinación 3D sutil para tarjetas ([data-tilt-3d])
function setup3DTiltCards() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches;
  if (prefersReduced || !isFinePointer) return;

  const cards = document.querySelectorAll("[data-tilt-3d]");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - py) * 5.5;
      const tiltY = (px - 0.5) * 5.5;

      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
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
        transition.finished.finally(() => tab.focus({ preventScroll: true }));
      } else {
        updateView();
        tab.focus({ preventScroll: true });
      }
    });
  });
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
    closeBtn.addEventListener("click", () => dialog.close());
  }

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
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
        if (statusDot) statusDot.style.background = "#4cd964";
      }
    })
    .catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {
  setupSiblingIndexFallback();
  setupBiomeSwitcher();
  setupLanguageToggle();
  setup3DTiltCards();
  setupSimulator();
  setupVehicle3DStudio();
  setupAlchemyLab();
  setupShowcaseTabs();
  setupTermsModal();
  applyTranslations(currentLang);
  checkBackendHealth();
});
