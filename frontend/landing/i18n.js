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
    "nav.vr": "Viaje en VR",
    "nav.vehicles": "Vehículos 3D",
    "nav.alchemy": "Boleto & Ahorro",
    "nav.why": "El Tráfico",
    "nav.features": "Plataforma",
    "nav.screens": "Pantallas",
    "nav.team": "Equipo",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero & Decorative App Badges
    "hero.kicker": "Lima · ODS 11 · Meta 11.2 · Ingeniería de Sistemas UPC",
    "hero.title": "Antes de encender el auto en Lima, ",
    "hero.title_em": "mira lo que ahorras cambiando de vehículo.",
    "hero.lead":
      "Compara bici, scooter, bus o caminata con OSRM + Gemini 1.5 Flash: mide tu ahorro de CO₂ en vivo y canjea puntos verdes.",
    "decor.badge_lbl": "MEDALLA ACTIVA",
    "decor.badge_val": "Ciclista Arequipa",
    "decor.streak_lbl": "RACHA SIN AUTO",
    "decor.streak_val": "7 días seguidos",
    "decor.reward_lbl": "CANJE DISPONIBLE",
    "decor.reward_val": "Café & Taller Bici",
    "decor.medals_title": "🏅 MEDALLAS DE LA APP",
    "decor.m1": "1er Pedal",
    "decor.m2": "-10kg CO₂",
    "decor.m3": "Racha 7D",
    "decor.m4": "100 PET",
    "decor.m5": "500 km",
    "decor.streak_title": "🔥 RACHA SEMANAL EN LA APP",
    "decor.rewards_title": "🎁 TIENDA DE PUNTOS VERDES",
    "decor.r1": "Café Aliado",
    "decor.r2": "Taller Bici",
    "decor.r3": "Kit LED Vial",

    "hero.flora_tag": "BITÁCORA DE TU SESIÓN",
    "hero.btn_vr": "Modo VR: Viaje en Bici, A Pie o Auto",
    "hero.btn_vehicles": "Comparador de Vehículos 3D",
    "hero.btn_simulator": "Calcular Boleto Anual →",
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
    "hero.card_foot": "Factores de emisión por vehículo validados en el backend.",

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
      "«Por la ciclovía de Av. Arequipa llegas en 14 min sin congestión, ahorras 638 g de CO₂ y sumas +15 puntos.»",
    "sim.btn_recycle_trip": "Registrar este viaje sin auto en mi bitácora",

    // VR First-Person Commute Mode
    "vr.title": "Vive tu viaje en VR: en bici, a pie, scooter o auto",
    "vr.mode_bike": "En Bicicleta (Ciclovía)",
    "vr.mode_walk": "A Pie (Vereda Arbolada)",
    "vr.mode_scooter": "En Scooter Eléctrico",
    "vr.mode_car": "En Auto (Tráfico Hora Punta)",
    "vr.btn_stereo": "Gafas VR (Doble Lente)",
    "vr.btn_fullscreen": "Pantalla Completa",
    "vr.hud_co2_label": "CO₂ FRENTE AL AUTO",
    "vr.hud_time_label": "TIEMPO & VELOCIDAD",
    "vr.hud_money_label": "AHORRO & SALUD",
    "vr.hud_pts_label": "RECOMPENSA APP",
    "vr.drag_pill": "🖱️ ARRASTRA EN 360° · ⌨️ WASD / FLECHAS",

    // Vehicles 3D Section
    "veh.title": "Compara cada vehículo en 3D: espacio, velocidad y CO₂",
    "veh.lbl_speed": "VELOCIDAD HORA PUNTA",
    "veh.lbl_space": "OCUPACIÓN DE PISTA",
    "veh.lbl_pts": "PUNTOS ECOCOMMUTE",
    "veh.drag_hint": "↔ ARRASTRA PARA ROTAR EN 3D · ELIGE UN VEHÍCULO",
    "veh.lane_sim_title": "FLUJO EN VIVO · 30 VIAJEROS EN AV. JAVIER PRADO",
    "veh.mode_bike": "Bicicleta Urbana",
    "veh.mode_bike_desc": "Av. Arequipa, Salaverry y Primavera sin tráfico · 12× menos espacio vial.",
    "veh.mode_scooter": "Scooter Eléctrico",
    "veh.mode_scooter_desc": "Conecta estaciones del Metropolitano y Línea 1 del Metro sin esfuerzo en cuestas.",
    "veh.mode_transit": "Transporte Masivo",
    "veh.mode_transit_desc": "Reduce 75% las emisiones por pasajero en tramos largos interdistritales.",
    "veh.mode_car": "Auto en Hora Punta",
    "veh.mode_car_desc": "Ocupación media de 1.2 personas, consume 18 m² y avanza a 12 km/h en congestión.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "Tu boleto de ahorro anual sin auto",
    "alchemy.p1": "🚲 3 días en bici (6 viajes/sem)",
    "alchemy.p2": "🎓 Commuter UPC (10 viajes/sem)",
    "alchemy.p3": "⚡ Sin Auto 100% (14 viajes/sem)",
    "alchemy.slider_trips": "Viajes sin auto por semana",
    "alchemy.slider_km": "Distancia media por trayecto",
    "alchemy.fuel_label": "COMBUSTIBLE NO QUEMADO",
    "alchemy.hours_label": "TIEMPO LIBRE DE CONGESTIÓN",
    "alchemy.annual_saved_label": "EMISIONES DE ESCAPE EVITADAS AL AÑO",
    "alchemy.card1_title": "Botellas PET recicladas",
    "alchemy.card1_desc": "82.8 g CO₂ ahorrados por envase de 500 ml.",
    "alchemy.card2_title": "Latas recuperadas",
    "alchemy.card2_desc": "170 g CO₂ evitados frente a bauxita virgen.",
    "alchemy.card3_title": "Árboles urbanos / año",
    "alchemy.card3_desc": "Absorción anual equivalente (21 kg CO₂/árbol).",
    "alchemy.card4_title": "Puntos Verdes canjeables",
    "alchemy.card4_desc": "Canjeables en talleres de bici y cafés aliados.",

    // Story
    "story.title": "Por qué existe",
    "story.sidebar_note":
      "+150 horas perdidas al año en tráfico en Lima mientras el CO₂ vehicular queda oculto en los mapas tradicionales.",
    "story.p1": "Los mapas habituales solo muestran tráfico y minutos, dejando invisible la huella ambiental de cada viaje.",
    "story.p2_pre": "EcoCommute muestra el ahorro de CO₂ ",
    "story.p2_under": "antes",
    "story.p2_post": " de salir y premia cada kilómetro recorrido sin auto.",
    "story.comp_old_tag": "❌ Apps de mapas tradicionales",
    "story.comp_old_desc": "Priorizan el auto, ocultan los gramos de CO₂/km y no premian el cambio modal.",
    "story.comp_new_tag": "✅ Enfoque EcoCommute",
    "story.comp_new_desc": "Ruteo OSRM + Gemini 1.5 Flash, cálculo exacto de CO₂ evitado y Puntos Verdes canjeables.",
    "story.quote": "«Si el ahorro de CO₂ se ve igual de concreto que los minutos del viaje, la gente lo considera.»",
    "story.quote_author": "— Equipo EcoCommute · UPC",

    // Features
    "feat.title": "Módulos activos en la app",
    "feat.routes_title": "Rutas sostenibles y Google Gemini",
    "feat.routes_desc":
      "Trazado multimodal con OSRM y copiloto IA (Google Gemini 1.5 Flash) que recomienda la vía más rápida y limpia.",
    "feat.trips_title": "Viajes y cálculo de CO₂",
    "feat.trips_desc": "Cuantifica el CO₂ evitado frente al auto (152 g/km) y acredita Puntos Verdes al instante.",
    "feat.dash_title": "Dashboard de impacto",
    "feat.dash_desc": "Métricas semanales de CO₂ ahorrado, kilómetros limpios y árboles equivalentes.",
    "feat.rank_title": "Ranking distrital",
    "feat.rank_desc": "Tabla de posiciones en vivo entre ciclistas y peatones de cada distrito limeño.",
    "feat.badges_title": "Medallas y recompensas",
    "feat.badges_desc": "Insignias automáticas por hitos y catálogo de recompensas con bloqueo pesimista.",
    "feat.challenges_title": "Retos semanales",
    "feat.challenges_desc": "Metas comunitarias semanales que multiplican tus Puntos Verdes.",

    // ODS
    "ods.title": "ODS 11 (Meta 11.2) + Google Gemini 1.5 Flash",
    "ods.desc":
      "Acceso a transporte seguro, asequible y sostenible en Lima con recomendaciones explicables por IA y ruteo abierto OSRM.",
    "ods.badge_ods": "ODS 11 · Meta 11.2: Movilidad Sostenible",
    "ods.badge_ai": "Optimización con IA · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Ruteo Open Source OSRM",

    // Demo
    "demo.title": "Pantallas de la aplicación",
    "demo.tab_all": "Vista comparativa",
    "demo.tab_routes": "Planificador y Mapa",
    "demo.tab_dash": "Dashboard de Impacto",
    "demo.img1_alt": "Mockup interactivo de rutas sostenibles con mapas y alternativas en Lima",
    "demo.cap1": "Comparador multimodal OSRM con sugerencias de Google Gemini 1.5 Flash.",
    "demo.img2_alt": "Mockup del dashboard de impacto ecológico con CO2 y estadísticas",
    "demo.cap2": "CO₂ evitado, árboles equivalentes, medallas y bitácora semanal.",

    // Impact
    "impact.title": "Meta 11.2 del ODS 11",
    "impact.desc": "Movilidad segura, limpia y premiada con gamificación sin rastreo invasivo.",
    "impact.p1": "Emisiones directas en bici o a pie",
    "impact.p2": "Privacidad sin rastreo en 2do plano",
    "impact.p3": "Cartografía abierta OpenStreetMap",

    // Team
    "team.title": "Quiénes lo hacemos",
    "team.intro": "Ingeniería de Sistemas UPC · NRC 8247 · Ciclo 2026-2.",
    "team.member1_role": "IA y recomendaciones de ruta",
    "team.member2_role": "Rutas, dashboard y medallas",
    "team.member3_role": "Entidades, viajes y cálculo de CO₂",
    "team.member4_role": "Puntos verdes y ranking",
    "team.member5_role": "Seguridad, JWT y registro",
    "team.member6_role": "Documentación, evidencias y landing",

    // Contact & Footer
    "contact.title": "Pruébalo y cuéntanos",
    "contact.intro": "¿Ideas para las ciclovías de Lima? Escríbenos directo.",
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
    "nav.vr": "VR Commute",
    "nav.vehicles": "3D Vehicles",
    "nav.alchemy": "Transit Pass & Savings",
    "nav.why": "Lima Traffic",
    "nav.features": "Platform",
    "nav.screens": "Screenshots",
    "nav.team": "Team",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero & Decorative App Badges
    "hero.kicker": "Lima · SDG 11 · Target 11.2 · UPC Systems Engineering",
    "hero.title": "Before starting your car in Lima, ",
    "hero.title_em": "see what you save by switching vehicles.",
    "hero.lead":
      "Compare bike, scooter, bus, or walking via OSRM + Gemini 1.5 Flash: track live CO₂ savings and redeem green points.",
    "decor.badge_lbl": "ACTIVE BADGE",
    "decor.badge_val": "Arequipa Cyclist",
    "decor.streak_lbl": "CAR-FREE STREAK",
    "decor.streak_val": "7-day streak",
    "decor.reward_lbl": "REWARD READY",
    "decor.reward_val": "Café & Bike Tune-Up",
    "decor.medals_title": "🏅 APP BADGE COLLECTION",
    "decor.m1": "1st Ride",
    "decor.m2": "-10kg CO₂",
    "decor.m3": "7D Streak",
    "decor.m4": "100 PET",
    "decor.m5": "500 km",
    "decor.streak_title": "🔥 WEEKLY APP STREAK",
    "decor.rewards_title": "🎁 GREEN POINTS SHOP",
    "decor.r1": "Partner Café",
    "decor.r2": "Bike Tune-Up",
    "decor.r3": "LED Safety Kit",

    "hero.flora_tag": "ACTIVE SESSION LOGBOOK",
    "hero.btn_vr": "VR Mode: Ride by Bike, Foot, or Car",
    "hero.btn_vehicles": "3D Vehicle Comparator",
    "hero.btn_simulator": "Calculate Annual Pass →",
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
    "hero.card_foot": "Vehicle emission factors are verified server-side.",

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
      "“Taking the Av. Arequipa bike lane gets you there in 14 min bypassing gridlock, saving 638 g CO₂ and +15 pts.”",
    "sim.btn_recycle_trip": "Log this car-free commute into my session",

    // VR First-Person Commute Mode
    "vr.title": "Experience your commute in VR: bike, walk, scooter, or car",
    "vr.mode_bike": "By Bicycle (Bike Lane)",
    "vr.mode_walk": "On Foot (Shaded Sidewalk)",
    "vr.mode_scooter": "By Electric Scooter",
    "vr.mode_car": "By Car (Rush-Hour Gridlock)",
    "vr.btn_stereo": "VR Glasses (Dual Lens)",
    "vr.btn_fullscreen": "Fullscreen",
    "vr.hud_co2_label": "CO₂ VS. CAR",
    "vr.hud_time_label": "TIME & SPEED",
    "vr.hud_money_label": "SAVINGS & HEALTH",
    "vr.hud_pts_label": "APP REWARD",
    "vr.drag_pill": "🖱️ DRAG 360° · ⌨️ WASD / ARROWS",

    // Vehicles 3D Section
    "veh.title": "Compare every vehicle in 3D: space, speed, and CO₂",
    "veh.lbl_speed": "RUSH-HOUR SPEED",
    "veh.lbl_space": "ROAD FOOTPRINT",
    "veh.lbl_pts": "ECOCOMMUTE POINTS",
    "veh.drag_hint": "↔ DRAG TO ROTATE IN 3D · PICK A VEHICLE",
    "veh.lane_sim_title": "LIVE FLOW · 30 COMMUTERS ON AV. JAVIER PRADO",
    "veh.mode_bike": "Urban Bicycle",
    "veh.mode_bike_desc": "Av. Arequipa, Salaverry & Primavera congestion-free · 12× less road space.",
    "veh.mode_scooter": "Electric Scooter",
    "veh.mode_scooter_desc": "Bridges the last kilometer from Metropolitano & Metro Line 1 stations effortlessly.",
    "veh.mode_transit": "Mass Transit",
    "veh.mode_transit_desc": "Cuts per-passenger emissions by 75% on inter-district corridors.",
    "veh.mode_car": "Car in Rush Hour",
    "veh.mode_car_desc": "1.2 avg occupancy, consumes 18 m² of road, and crawls at 12 km/h in gridlock.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "Your annual car-free savings pass",
    "alchemy.p1": "🚲 3 days by bike (6 trips/wk)",
    "alchemy.p2": "🎓 UPC Commuter (10 trips/wk)",
    "alchemy.p3": "⚡ 100% Car-Free (14 trips/wk)",
    "alchemy.slider_trips": "Car-free trips per week",
    "alchemy.slider_km": "Average distance per trip",
    "alchemy.fuel_label": "UNBURNED GASOLINE",
    "alchemy.hours_label": "TRAFFIC HOURS SAVED",
    "alchemy.annual_saved_label": "TAILPIPE EMISSIONS AVOIDED PER YEAR",
    "alchemy.card1_title": "Recycled PET bottles",
    "alchemy.card1_desc": "82.8 g CO₂ avoided per 500 ml bottle.",
    "alchemy.card2_title": "Recovered cans",
    "alchemy.card2_desc": "170 g CO₂ saved vs. primary aluminum.",
    "alchemy.card3_title": "Urban trees / year",
    "alchemy.card3_desc": "Annual tree absorption equivalent (21 kg/tree).",
    "alchemy.card4_title": "Redeemable Green Points",
    "alchemy.card4_desc": "Redeemable at partner bike shops and cafés.",

    // Story
    "story.title": "Why it exists",
    "story.sidebar_note":
      "+150 hours lost yearly in Lima traffic while vehicular CO₂ stays hidden in traditional map apps.",
    "story.p1": "Conventional map apps only show traffic and minutes, hiding the carbon footprint of each trip.",
    "story.p2_pre": "EcoCommute reveals your CO₂ savings ",
    "story.p2_under": "before",
    "story.p2_post": " departure and rewards every car-free kilometer.",
    "story.comp_old_tag": "❌ Traditional map apps",
    "story.comp_old_desc": "Car-centric routing, hidden CO₂/km metrics, and zero modal-shift rewards.",
    "story.comp_new_tag": "✅ EcoCommute approach",
    "story.comp_new_desc": "OSRM + Gemini 1.5 Flash routing, exact CO₂ accounting, and redeemable Green Points.",
    "story.quote": "“If carbon savings are presented as clearly as travel minutes, commuters genuinely take them into account.”",
    "story.quote_author": "— EcoCommute Team · UPC",

    // Features
    "feat.title": "Active platform modules",
    "feat.routes_title": "Sustainable Routes & Google Gemini",
    "feat.routes_desc": "Multimodal OSRM routing and AI copilot (Google Gemini 1.5 Flash) suggesting the cleanest path.",
    "feat.trips_title": "Trips & CO₂ Accounting",
    "feat.trips_desc": "Computes avoided CO₂ vs. driving (152 g/km) and credits Green Points instantly.",
    "feat.dash_title": "Impact Dashboard",
    "feat.dash_desc": "Weekly CO₂ saved, clean kilometers, and equivalent urban trees.",
    "feat.rank_title": "District Leaderboard",
    "feat.rank_desc": "Live rankings among cyclists and pedestrians across Lima districts.",
    "feat.badges_title": "Badges & Rewards",
    "feat.badges_desc": "Automatic milestone badges and pessimistic-locked reward redemptions.",
    "feat.challenges_title": "Weekly Challenges",
    "feat.challenges_desc": "Community weekly goals that multiply your Green Points.",

    // ODS
    "ods.title": "UN SDG 11 (Target 11.2) + Google Gemini 1.5 Flash",
    "ods.desc":
      "Safe, affordable, sustainable transport in Lima powered by explainable AI recommendations and open OSRM routing.",
    "ods.badge_ods": "SDG 11 · Target 11.2: Sustainable Urban Mobility",
    "ods.badge_ai": "AI-Powered Optimization · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Open Source Routing Engine (OSRM)",

    // Demo
    "demo.title": "Application Screens",
    "demo.tab_all": "Side-by-side view",
    "demo.tab_routes": "Route Planner & Map",
    "demo.tab_dash": "Impact Dashboard",
    "demo.img1_alt": "Interactive mockup of sustainable route options across Lima map",
    "demo.cap1": "Multimodal OSRM route planner with Google Gemini 1.5 Flash insights.",
    "demo.img2_alt": "Impact dashboard mockup with CO2 metrics and user statistics",
    "demo.cap2": "Saved CO₂, tree equivalents, unlocked badges, and weekly logbook.",

    // Impact
    "impact.title": "UN SDG 11 Target 11.2",
    "impact.desc": "Safe, clean mobility rewarded with gamification and privacy by design.",
    "impact.p1": "Direct emissions when cycling or walking",
    "impact.p2": "Zero background location tracking",
    "impact.p3": "OpenStreetMap open cartography",

    // Team
    "team.title": "Development Team",
    "team.intro": "Software Engineering at UPC · NRC 8247 · 2026-2.",
    "team.member1_role": "AI & Route Recommendations",
    "team.member2_role": "Routes, Dashboard & Badges",
    "team.member3_role": "Entities, Commute Logs & CO₂ Math",
    "team.member4_role": "Green Points & Leaderboard",
    "team.member5_role": "Security, JWT & Authentication",
    "team.member6_role": "Documentation, Evidence & Landing",

    // Contact & Footer
    "contact.title": "Try it and Share Feedback",
    "contact.intro": "Ideas for Lima's bike network? Drop us a line.",
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
      statusEl.innerHTML = `<strong>${sessionTripsCount} car-free trips</strong> · <strong>${sessionRecycledGrams.toLocaleString()} g CO₂ saved</strong> · <strong>♻ ${petEq} PET</strong>`;
    } else {
      statusEl.innerHTML = `<strong>${sessionTripsCount} viajes sin auto</strong> · <strong>${sessionRecycledGrams.toLocaleString()} g CO₂ evitados</strong> · <strong>♻ ${petEq} PET</strong>`;
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
  if (typeof renderVRCommuteHud === "function") {
    renderVRCommuteHud();
  }
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

// ==================== SIMULADOR VR EN PRIMERA PERSONA (EN BICI, A PIE, SCOOTER, AUTO) ====================
const VR_POV_MODES = {
  bike: {
    speedFactor: 4.4,
    laneOffset: -68,
    stepBob: 0.25,
    gateTags: ["-152g CO₂/km", "S/ 8.50 AHORRO", "+15 PUNTOS", "♻ 8 BOTELLAS PET"],
    es: {
      co2: "-638 g CO₂ ahorrados",
      time: "14 min · 18 km/h (-8 min)",
      money: "S/ 8.50 ahorrados · 115 kcal",
      pts: "+15 pts · ♻ 8 PET",
      caption:
        "🚲 VISTA CICLISTA: Avanzas fluido por la ciclovía segregada de Av. Arequipa mientras a la derecha la fila de autos permanece detenida."
    },
    en: {
      co2: "-638 g CO₂ saved",
      time: "14 min · 18 km/h (-8 min)",
      money: "S/ 8.50 saved · 115 kcal",
      pts: "+15 pts · ♻ 8 PET",
      caption:
        "🚲 CYCLIST POV: Gliding smoothly down the Av. Arequipa protected bike lane while rush-hour cars sit bumper-to-bumper on the right."
    }
  },
  walk: {
    speedFactor: 1.85,
    laneOffset: -135,
    stepBob: 1.0,
    gateTags: ["0g EMISIÓN", "+145 KCAL SALUD", "S/ 0.00 COSTO", "+9 PUNTOS VERDES"],
    es: {
      co2: "-274 g CO₂ (tramo 1.8 km)",
      time: "21 min · 5 km/h (paseo activo)",
      money: "S/ 0.00 gasto · +145 kcal",
      pts: "+9 pts · ♻ 3 PET",
      caption:
        "🚶 VISTA PEATÓN: Caminas bajo los árboles de la vereda peatonal sin estrés de semáforos ni gasto de combustible."
    },
    en: {
      co2: "-274 g CO₂ (1.8 km walk)",
      time: "21 min · 5 km/h (active walk)",
      money: "S/ 0.00 cost · +145 kcal",
      pts: "+9 pts · ♻ 3 PET",
      caption:
        "🚶 PEDESTRIAN POV: Walking along a tree-shaded Lima sidewalk with zero fuel cost and active cardiovascular benefit."
    }
  },
  scooter: {
    speedFactor: 4.9,
    laneOffset: -68,
    stepBob: 0.1,
    gateTags: ["0g ESCAPE", "-10 MIN TRÁFICO", "CONEXIÓN METRO", "+14 PUNTOS"],
    es: {
      co2: "-638 g CO₂ de escape",
      time: "12 min · 20 km/h (-10 min)",
      money: "S/ 7.80 ahorrados en taxi",
      pts: "+14 pts · ♻ 8 PET",
      caption:
        "🛴 VISTA SCOOTER: Conectas rápidamente desde la estación del Metropolitano / Metro hasta tu destino sin esfuerzo en pendientes."
    },
    en: {
      co2: "-638 g tailpipe CO₂",
      time: "12 min · 20 km/h (-10 min)",
      money: "S/ 7.80 saved vs. taxi",
      pts: "+14 pts · ♻ 8 PET",
      caption:
        "🛴 E-SCOOTER POV: Bridging the last mile from the Metropolitano / Metro station effortlessly at 20 km/h."
    }
  },
  car: {
    speedFactor: 0.85,
    laneOffset: 82,
    stepBob: 0.05,
    gateTags: ["+152g CO₂/km", "TRÁFICO 11 km/h", "-S/ 8.50 GASTO", "0 PUNTOS"],
    es: {
      co2: "+638 g CO₂ emitidos",
      time: "22 min · 11 km/h (hora punta)",
      money: "S/ 8.50 gastados en combustible",
      pts: "0 pts · Sin ahorro circular",
      caption:
        "🚗 VISTA EN AUTO: Atrapado en la congestión de hora punta detrás de otros vehículos mientras la ciclovía a tu izquierda avanza libre."
    },
    en: {
      co2: "+638 g CO₂ emitted",
      time: "22 min · 11 km/h (gridlock)",
      money: "S/ 8.50 spent on fuel",
      pts: "0 pts · Zero circular savings",
      caption:
        "🚗 CAR CABIN POV: Stuck in bumper-to-bumper rush-hour traffic while cyclists on your left glide past freely."
    }
  }
};

let currentVRPov = "bike";

function renderVRCommuteHud() {
  const isEn = currentLang === "en_US";
  const shell = document.getElementById("vr-commute-shell");
  const co2El = document.getElementById("vr-hud-co2");
  const timeEl = document.getElementById("vr-hud-time");
  const moneyEl = document.getElementById("vr-hud-money");
  const ptsEl = document.getElementById("vr-hud-pts");
  const captionEl = document.getElementById("vr-pov-caption");

  const modeData = VR_POV_MODES[currentVRPov] || VR_POV_MODES.bike;
  const copy = isEn ? modeData.en : modeData.es;

  if (shell) shell.setAttribute("data-pov-mode", currentVRPov);
  if (co2El) co2El.textContent = copy.co2;
  if (timeEl) timeEl.textContent = copy.time;
  if (moneyEl) moneyEl.textContent = copy.money;
  if (ptsEl) ptsEl.textContent = copy.pts;
  if (captionEl) captionEl.textContent = copy.caption;
}

function setupVRCommuteSimulator() {
  const vrSection = document.getElementById("modo-vr");
  const shell = document.getElementById("vr-commute-shell");
  const canvas = document.getElementById("vr-commute-canvas");
  const povBtns = document.querySelectorAll(".vr-pov-btn");
  const stereoBtn = document.getElementById("vr-stereo-toggle");
  const fullscreenBtn = document.getElementById("vr-fullscreen-toggle");

  if (!vrSection || !shell || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let isStereo = false;
  let yawDeg = 0;
  let pitchDeg = 0;
  let camLaneX = VR_POV_MODES.bike.laneOffset;
  let stepPhase = 0;
  let roadScrollZ = 0;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  // Edificios 3D extruidos a ambos lados de Av. Arequipa (z: 80 .. 1680)
  const buildings = Array.from({ length: 16 }, (_, i) => {
    const isLeft = i % 2 === 0;
    const palette = ["#d8d0c1", "#c7beb0", "#dfd7c8", "#b9b1a3"];
    return {
      side: isLeft ? -1 : 1,
      xInner: isLeft ? -235 : 225,
      width: 115 + (i % 3) * 28,
      depth: 110,
      h: 190 + (i % 4) * 58,
      z: Math.floor(i / 2) * 200 + 110,
      colorFront: palette[i % palette.length],
      colorSide: isLeft ? "#b5ad9e" : "#c2baab",
      accent: i % 3 === 0 ? "#d84a27" : "#1f5666"
    };
  });

  // Árboles urbanos multicapa y postes de alumbrado (z: 40 .. 1640)
  const trees = Array.from({ length: 30 }, (_, i) => ({
    x: i % 2 === 0 ? -202 : -18,
    z: i * 54 + 45,
    h: 122 + (i % 3) * 26,
    r: 38 + (i % 3) * 11,
    hasLamp: i % 2 === 1 && i % 4 === 1
  }));

  // Fila de autos y buses 3D en los carriles derechos (x: 52 y 146)
  const trafficCars = Array.from({ length: 12 }, (_, i) => ({
    x: i % 2 === 0 ? 52 : 146,
    z: i * 132 + 95,
    isBus: i % 5 === 0,
    color: i % 5 === 0 ? "#c88a1b" : i % 3 === 0 ? "#9e2b22" : i % 2 === 0 ? "#383d42" : "#224857",
    plate: `LIM-${140 + i * 7}`
  }));

  // Ciclistas compañeros adelante en la ciclovía verde
  const fellowCyclists = [
    { x: -66, z: 240, jacket: "#d84a27" },
    { x: -72, z: 690, jacket: "#286646" },
    { x: -64, z: 1150, jacket: "#c88a1b" }
  ];

  // Pórticos viales 3D con indicadores de ahorro de la app
  const savingsGates = Array.from({ length: 4 }, (_, i) => ({
    z: i * 395 + 260,
    tagIdx: i % 4
  }));

  povBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-vr-pov") || "bike";
      if (!VR_POV_MODES[mode]) return;
      currentVRPov = mode;
      povBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      renderVRCommuteHud();
    });
  });

  if (stereoBtn) {
    stereoBtn.addEventListener("click", () => {
      isStereo = !isStereo;
      shell.setAttribute("data-stereo", isStereo ? "true" : "false");
      stereoBtn.setAttribute("aria-pressed", isStereo ? "true" : "false");
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement && shell.requestFullscreen) {
        shell.requestFullscreen().catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    yawDeg = Math.max(-55, Math.min(55, yawDeg - dx * 0.28));
    pitchDeg = Math.max(-24, Math.min(24, pitchDeg - dy * 0.2));
  });

  const stopDrag = () => {
    isDragging = false;
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);

  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      e.preventDefault();
      yawDeg = Math.max(-55, yawDeg - 4);
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      e.preventDefault();
      yawDeg = Math.min(55, yawDeg + 4);
    } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault();
      pitchDeg = Math.min(22, pitchDeg + 3);
    } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      e.preventDefault();
      pitchDeg = Math.max(-22, pitchDeg - 3);
    }
  });

  function renderEye(vx, vy, vw, vh, eyeOffset) {
    const modeSpec = VR_POV_MODES[currentVRPov] || VR_POV_MODES.bike;
    ctx.save();
    ctx.beginPath();
    ctx.rect(vx, vy, vw, vh);
    ctx.clip();

    const bobY = Math.sin(stepPhase) * 4.2 * modeSpec.stepBob;
    const bobX = Math.cos(stepPhase * 0.5) * 1.8 * modeSpec.stepBob;
    const horizonY = vy + vh * 0.47 + pitchDeg * 3.2 + bobY;
    const vanishX = vx + vw * 0.5 - yawDeg * 4.4 + eyeOffset * 0.32 + bobX;
    const fov = 330;
    const camHeight = 86;

    function projectX(wx, wz) {
      return vanishX + (wx - camLaneX - eyeOffset) * (fov / wz);
    }
    function projectY(wy, wz) {
      return horizonY + (camHeight - wy) * (fov / wz);
    }

    // 1. CIELO REALISTA DE LIMA + SOL + NUBES VOLUMÉTRICAS + SKYLINE
    const skyH = Math.max(10, horizonY - vy);
    const skyGrad = ctx.createLinearGradient(vx, vy, vx, horizonY);
    skyGrad.addColorStop(0, "#8faec2");
    skyGrad.addColorStop(0.55, "#c8d6dc");
    skyGrad.addColorStop(1, "#f2eadb");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(vx, vy, vw, skyH);

    // Halo solar de tarde limeña
    const sunX = vanishX - 95;
    const sunY = horizonY - 82;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 95);
    sunGrad.addColorStop(0, "rgba(255, 246, 214, 0.92)");
    sunGrad.addColorStop(0.35, "rgba(245, 205, 135, 0.35)");
    sunGrad.addColorStop(1, "rgba(245, 205, 135, 0)");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 95, 0, Math.PI * 2);
    ctx.fill();

    // Silueta de torres de San Isidro / Miraflores en el horizonte
    for (let b = -8; b <= 8; b++) {
      const bx = vanishX + b * 56;
      const bw = 42 + (Math.abs(b * 13) % 16);
      const bh = 28 + ((Math.abs(b * 19 + 7) % 5) * 16);
      ctx.fillStyle = b % 2 === 0 ? "#b8b1a3" : "#c6bfb0";
      ctx.fillRect(bx - bw / 2, horizonY - bh, bw, bh);
      // Ventanas sutiles en edificios lejanos
      ctx.fillStyle = "rgba(255, 248, 225, 0.45)";
      for (let wy = horizonY - bh + 5; wy < horizonY - 4; wy += 6) {
        ctx.fillRect(bx - bw * 0.35, wy, bw * 0.7, 2);
      }
    }

    // 2. SUPERFICIE VIAL EN PERSPECTIVA (Vereda, Ciclovía Verde, Berma, Pista Asfáltica)
    const groundGrad = ctx.createLinearGradient(vx, horizonY, vx, vy + vh);
    groundGrad.addColorStop(0, "#33373d");
    groundGrad.addColorStop(1, "#1b1d21");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(vx, horizonY, vw, vh - (horizonY - vy));

    function drawLaneStrip(wxLeft, wxRight, topColor, botColor) {
      const zFar = 1650;
      const zNear = 20;
      const g = ctx.createLinearGradient(vx, horizonY, vx, vy + vh);
      g.addColorStop(0, topColor);
      g.addColorStop(1, botColor || topColor);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(projectX(wxLeft, zFar), projectY(0, zFar));
      ctx.lineTo(projectX(wxRight, zFar), projectY(0, zFar));
      ctx.lineTo(projectX(wxRight, zNear), projectY(0, zNear));
      ctx.lineTo(projectX(wxLeft, zNear), projectY(0, zNear));
      ctx.closePath();
      ctx.fill();
    }

    // Vereda izquierda peatonal con losetas cálidas (-235 a -105)
    drawLaneStrip(-235, -105, "#bfb7a6", "#d8d0c0");
    // Sardineles de concreto (-105 a -101)
    drawLaneStrip(-105, -101, "#8c8577", "#6e685c");
    // Ciclovía segregada verde esmeralda (-101 a -33)
    drawLaneStrip(-101, -33, "#26593e", "#1e6e46");
    // Línea blanca demarcatoria de ciclovía (-99 a -97 y -36 a -34)
    drawLaneStrip(-99.5, -97.5, "#e8e4da", "#ffffff");
    drawLaneStrip(-36, -34, "#e8e4da", "#ffffff");
    // Berma central arborizada con césped y sardinel (-33 a -8)
    drawLaneStrip(-33, -8, "#476246", "#395238");
    drawLaneStrip(-11, -8, "#c88a1b", "#e59a23");
    // Calzada de 2 carriles de autos en hora punta (-8 a 205)
    drawLaneStrip(-8, 205, "#2b2f35", "#1c1f24");
    // Vereda derecha (205 a 265)
    drawLaneStrip(205, 265, "#b5ad9d", "#cbc3b3");

    // 2B. MARCAS VIALES EN MOVIMIENTO (Líneas discontinuas, pictogramas de bici y bolardos)
    const stripeSpacing = 90;
    for (let s = 0; s < 18; s++) {
      const z1 = ((s * stripeSpacing - roadScrollZ) % 1620 + 1620) % 1620 + 26;
      const z2 = Math.min(1650, z1 + 36);
      if (z1 < 28 || z1 > 1580) continue;

      // Línea discontinua blanca entre los 2 carriles de autos (wx = 96)
      ctx.fillStyle = "rgba(250, 247, 240, 0.78)";
      ctx.beginPath();
      ctx.moveTo(projectX(94, z2), projectY(0, z2));
      ctx.lineTo(projectX(98, z2), projectY(0, z2));
      ctx.lineTo(projectX(98, z1), projectY(0, z1));
      ctx.lineTo(projectX(94, z1), projectY(0, z1));
      ctx.closePath();
      ctx.fill();

      // Juntas transversales en la vereda peatonal
      ctx.strokeStyle = "rgba(24, 25, 27, 0.18)";
      ctx.lineWidth = Math.max(0.6, 1.5 * (fov / z1));
      ctx.beginPath();
      ctx.moveTo(projectX(-225, z1), projectY(0, z1));
      ctx.lineTo(projectX(-105, z1), projectY(0, z1));
      ctx.stroke();

      // Bolardos amarillos reflectivos en el borde de la ciclovía (cada 2 segmentos)
      if (s % 2 === 0) {
        const sc = fov / z1;
        const bx = projectX(-32, z1);
        const by = projectY(0, z1);
        const bw = Math.max(2, 5.5 * sc);
        const bh = Math.max(4, 22 * sc);
        ctx.fillStyle = "#e59a23";
        ctx.fillRect(bx - bw / 2, by - bh, bw, bh);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(bx - bw / 2, by - bh * 0.75, bw, bh * 0.22);
      }

      // Flecha / chevron blanco pintado en la ciclovía verde
      if (s % 3 === 0 && z1 < 900) {
        const zMid = z1 + 14;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
        ctx.lineWidth = Math.max(1, 3 * (fov / z1));
        ctx.beginPath();
        ctx.moveTo(projectX(-78, z1), projectY(0, z1));
        ctx.lineTo(projectX(-67, zMid), projectY(0, zMid));
        ctx.lineTo(projectX(-56, z1), projectY(0, z1));
        ctx.stroke();
      }
    }

    // 3. ORDENAR OBJETOS 3D POR PROFUNDIDAD Z (Edificios, Árboles/Farolas, Autos, Ciclistas y Pórticos)
    const sceneItems = [];
    for (const b of buildings) sceneItems.push({ type: "building", z: b.z, obj: b });
    for (const t of trees) sceneItems.push({ type: "tree", z: t.z, obj: t });
    for (const c of trafficCars) sceneItems.push({ type: "car", z: c.z, obj: c });
    for (const cy of fellowCyclists) sceneItems.push({ type: "cyclist", z: cy.z, obj: cy });
    for (const g of savingsGates) sceneItems.push({ type: "gate", z: g.z, obj: g });
    sceneItems.sort((a, b) => b.z - a.z);

    for (const item of sceneItems) {
      const z = item.z;
      if (z < 26) continue;
      const scale = fov / z;

      if (item.type === "building") {
        const b = item.obj;
        const zFront = Math.max(28, b.z - b.depth * 0.5);
        const zBack = b.z + b.depth * 0.5;
        const xWall = b.xInner;
        const xOuter = b.side < 0 ? b.xInner - b.width : b.xInner + b.width;

        // Pared lateral en perspectiva 3D que da hacia la avenida
        const p1x = projectX(xWall, zBack);
        const p1yBot = projectY(0, zBack);
        const p1yTop = projectY(b.h, zBack);
        const p2x = projectX(xWall, zFront);
        const p2yBot = projectY(0, zFront);
        const p2yTop = projectY(b.h, zFront);

        ctx.fillStyle = b.colorSide;
        ctx.strokeStyle = "rgba(24, 25, 27, 0.35)";
        ctx.lineWidth = Math.max(0.8, 1.5 * scale);
        ctx.beginPath();
        ctx.moveTo(p1x, p1yTop);
        ctx.lineTo(p2x, p2yTop);
        ctx.lineTo(p2x, p2yBot);
        ctx.lineTo(p1x, p1yBot);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Fachada frontal del edificio
        const fOuterX = projectX(xOuter, zFront);
        ctx.fillStyle = b.colorFront;
        ctx.beginPath();
        ctx.moveTo(p2x, p2yTop);
        ctx.lineTo(fOuterX, p2yTop);
        ctx.lineTo(fOuterX, p2yBot);
        ctx.lineTo(p2x, p2yBot);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Ventanas iluminadas en la pared lateral (perspectiva)
        if (z < 1100) {
          ctx.strokeStyle = "rgba(31, 86, 102, 0.38)";
          ctx.lineWidth = Math.max(1, 3 * scale);
          for (let fl = 0.22; fl <= 0.86; fl += 0.2) {
            ctx.beginPath();
            ctx.moveTo(p1x, p1yBot - (p1yBot - p1yTop) * fl);
            ctx.lineTo(p2x, p2yBot - (p2yBot - p2yTop) * fl);
            ctx.stroke();
          }
        }
      } else if (item.type === "tree") {
        const t = item.obj;
        const sx = projectX(t.x, z);
        const syGround = projectY(0, z);
        const syTop = projectY(t.h, z);
        const sr = t.r * scale;

        // Sombra elíptica del árbol en el suelo
        ctx.fillStyle = "rgba(15, 18, 20, 0.28)";
        ctx.beginPath();
        ctx.ellipse(sx + 6 * scale, syGround, sr * 0.95, Math.max(2, sr * 0.26), 0, 0, Math.PI * 2);
        ctx.fill();

        // Farola arqueada de alumbrado público junto a la ciclovía
        if (t.hasLamp && z < 1150) {
          const lampX = projectX(-28, z);
          const lampTopY = projectY(152, z);
          const armEndX = projectX(-52, z);
          ctx.strokeStyle = "#2c3137";
          ctx.lineWidth = Math.max(1.2, 3.5 * scale);
          ctx.beginPath();
          ctx.moveTo(lampX, syGround);
          ctx.lineTo(lampX, lampTopY);
          ctx.quadraticCurveTo(lampX, lampTopY - 12 * scale, armEndX, lampTopY - 8 * scale);
          ctx.stroke();

          // Luminaria LED cálida
          ctx.fillStyle = "#fff3c4";
          ctx.beginPath();
          ctx.arc(armEndX, lampTopY - 7 * scale, Math.max(2, 5.5 * scale), 0, Math.PI * 2);
          ctx.fill();
        }

        // Tronco cónico realista con ramas
        ctx.strokeStyle = "#4e3824";
        ctx.lineWidth = Math.max(1.8, 8.5 * scale);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sx, syGround);
        ctx.lineTo(sx, syTop + sr * 0.2);
        ctx.stroke();

        // Copa arbórea 3D en 3 volúmenes sombreados
        ctx.fillStyle = "#1d4630";
        ctx.beginPath();
        ctx.arc(sx - sr * 0.32, syTop + sr * 0.16, sr * 0.82, 0, Math.PI * 2);
        ctx.arc(sx + sr * 0.34, syTop + sr * 0.14, sr * 0.78, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#2e6b49";
        ctx.beginPath();
        ctx.arc(sx, syTop, sr * 0.96, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#488c62";
        ctx.beginPath();
        ctx.arc(sx - sr * 0.22, syTop - sr * 0.24, sr * 0.58, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === "cyclist") {
        const cy = item.obj;
        if (currentVRPov === "bike" && z < 75) continue;
        const sx = projectX(cy.x, z);
        const syGround = projectY(0, z);
        const hBike = 52 * scale;
        const wBike = 18 * scale;

        // Sombra y rueda trasera del ciclista adelante
        ctx.fillStyle = "rgba(0,0,0,0.32)";
        ctx.beginPath();
        ctx.ellipse(sx, syGround, wBike * 0.7, Math.max(1.5, 4 * scale), 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#18191b";
        ctx.lineWidth = Math.max(1.5, 3.5 * scale);
        ctx.beginPath();
        ctx.moveTo(sx, syGround);
        ctx.lineTo(sx, syGround - hBike * 0.48);
        ctx.stroke();

        // Casaca del ciclista y casco
        ctx.fillStyle = cy.jacket;
        ctx.beginPath();
        ctx.roundRect(sx - wBike * 0.5, syGround - hBike * 0.85, wBike, hBike * 0.42, Math.max(2, 4 * scale));
        ctx.fill();

        ctx.fillStyle = "#faf7f0";
        ctx.beginPath();
        ctx.arc(sx, syGround - hBike * 0.96, Math.max(2.5, 7 * scale), 0, Math.PI * 2);
        ctx.fill();

        // Etiqueta flotante EcoCommute sobre el ciclista
        if (z < 650) {
          const tagW = 68 * scale;
          const tagH = 18 * scale;
          ctx.fillStyle = "#286646";
          ctx.beginPath();
          ctx.roundRect(sx - tagW / 2, syGround - hBike * 1.38, tagW, tagH, 4 * scale);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${Math.max(7, Math.round(9.5 * scale))}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.fillText("0g · +15pts", sx, syGround - hBike * 1.22);
        }
      } else if (item.type === "car") {
        const c = item.obj;
        const sx = projectX(c.x, z);
        const syGround = projectY(0, z);
        const carW = (c.isBus ? 72 : 58) * scale;
        const carH = (c.isBus ? 64 : 38) * scale;

        // Sombra de contacto bajo el vehículo
        ctx.fillStyle = "rgba(10, 12, 14, 0.48)";
        ctx.beginPath();
        ctx.ellipse(sx, syGround, carW * 0.56, Math.max(2, 6 * scale), 0, 0, Math.PI * 2);
        ctx.fill();

        // Neumáticos traseros izquierdo y derecho
        const wheelW = Math.max(2.5, 9 * scale);
        const wheelH = Math.max(3, 11 * scale);
        ctx.fillStyle = "#111315";
        ctx.fillRect(sx - carW * 0.46, syGround - wheelH, wheelW, wheelH);
        ctx.fillRect(sx + carW * 0.46 - wheelW, syGround - wheelH, wheelW, wheelH);

        // Carrocería inferior + cabina superior trapezoidal (3D realista)
        const bodyH = carH * 0.56;
        const cabinW = carW * (c.isBus ? 0.94 : 0.78);
        const cabinH = carH * 0.44;

        ctx.fillStyle = c.color;
        ctx.strokeStyle = "#141618";
        ctx.lineWidth = Math.max(1, 1.8 * scale);

        // Parte baja del chasis
        ctx.beginPath();
        ctx.roundRect(sx - carW / 2, syGround - wheelH * 0.4 - bodyH, carW, bodyH, Math.max(2, 5 * scale));
        ctx.fill();
        ctx.stroke();

        // Cabina / techo con pilares C inclinados
        ctx.beginPath();
        ctx.moveTo(sx - carW * 0.46, syGround - wheelH * 0.4 - bodyH);
        ctx.lineTo(sx - cabinW * 0.5, syGround - carH);
        ctx.lineTo(sx + cabinW * 0.5, syGround - carH);
        ctx.lineTo(sx + carW * 0.46, syGround - wheelH * 0.4 - bodyH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Parabrisas trasero polarizado con reflejo de cielo
        ctx.fillStyle = "#1d2830";
        ctx.beginPath();
        ctx.moveTo(sx - carW * 0.39, syGround - wheelH * 0.4 - bodyH - 2 * scale);
        ctx.lineTo(sx - cabinW * 0.43, syGround - carH + 3.5 * scale);
        ctx.lineTo(sx + cabinW * 0.43, syGround - carH + 3.5 * scale);
        ctx.lineTo(sx + carW * 0.39, syGround - wheelH * 0.4 - bodyH - 2 * scale);
        ctx.closePath();
        ctx.fill();

        // Luces de freno LED rojas con resplandor (hora punta detenida)
        const lightW = Math.max(3.5, 12 * scale);
        const lightH = Math.max(2.2, 5.5 * scale);
        const lightY = syGround - bodyH * 0.85;
        ctx.fillStyle = "rgba(255, 59, 48, 0.35)";
        ctx.beginPath();
        ctx.arc(sx - carW * 0.36, lightY, lightW * 0.9, 0, Math.PI * 2);
        ctx.arc(sx + carW * 0.36, lightY, lightW * 0.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ff2d20";
        ctx.fillRect(sx - carW * 0.44, lightY - lightH / 2, lightW, lightH);
        ctx.fillRect(sx + carW * 0.44 - lightW, lightY - lightH / 2, lightW, lightH);

        // Placa de rodaje trasera
        if (z < 520) {
          const pw = 18 * scale;
          const ph = 6.5 * scale;
          ctx.fillStyle = "#f5f1e6";
          ctx.fillRect(sx - pw / 2, syGround - bodyH * 0.45, pw, ph);
        }

        // Humo de escape animado (152 g CO2/km)
        if (z < 760) {
          const puffOffset = ((stepPhase * 9 + z) % 24) * scale;
          ctx.fillStyle = "rgba(185, 188, 194, 0.34)";
          ctx.beginPath();
          ctx.arc(
            sx + carW * 0.32 + puffOffset * 0.3,
            syGround - 4 * scale - puffOffset * 0.55,
            Math.max(2, (6 + (puffOffset / scale) * 0.35) * scale),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      } else if (item.type === "gate") {
        const g = item.obj;
        const gateCenterWorldX = currentVRPov === "car" ? 92 : currentVRPov === "walk" ? -152 : -67;
        const sx = projectX(gateCenterWorldX, z);
        const syTop = projectY(118, z);
        const syGround = projectY(0, z);
        const boxW = 156 * scale;
        const boxH = 34 * scale;

        if (z < 1050) {
          const isCarMode = currentVRPov === "car";
          // Postes laterales del pórtico vial
          ctx.strokeStyle = "#2b3036";
          ctx.lineWidth = Math.max(1.2, 3.2 * scale);
          ctx.beginPath();
          ctx.moveTo(sx - boxW * 0.46, syGround);
          ctx.lineTo(sx - boxW * 0.46, syTop);
          ctx.moveTo(sx + boxW * 0.46, syGround);
          ctx.lineTo(sx + boxW * 0.46, syTop);
          ctx.stroke();

          // Tablero electrónico superior
          ctx.fillStyle = isCarMode ? "#a8291f" : "#1f5e3e";
          ctx.strokeStyle = "#faf7f0";
          ctx.lineWidth = Math.max(1.2, 2.2 * scale);
          ctx.beginPath();
          ctx.roundRect(sx - boxW / 2, syTop - boxH / 2, boxW, boxH, Math.max(3, 6 * scale));
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#faf7f0";
          ctx.font = `700 ${Math.max(8, Math.round(13 * scale))}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          const label = modeSpec.gateTags[g.tagIdx % modeSpec.gateTags.length];
          ctx.fillText(label, sx, syTop + 4.5 * scale);
        }
      }
    }

    // 4. CABINA EN PRIMERA PERSONA REALISTA (POV COCKPIT) SEGÚN EL VEHÍCULO ACTIVO
    const cx = vx + vw * 0.5 + bobX * 0.7;
    const botY = vy + vh;

    if (currentVRPov === "bike") {
      // Rueda delantera girando vista por delante de la horquilla
      ctx.fillStyle = "#18191b";
      ctx.beginPath();
      ctx.roundRect(cx - 9, botY - 46, 18, 46, 8);
      ctx.fill();
      ctx.strokeStyle = "#5a6068";
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 7, botY - 42 + ((stepPhase * 8) % 8), 14, 4);

      // Barra del manubrio de aluminio curvado 3D + cables de freno
      ctx.strokeStyle = "rgba(24, 25, 27, 0.45)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 125, botY - 38);
      ctx.quadraticCurveTo(cx - 30, botY - 12, cx, botY - 10);
      ctx.moveTo(cx + 125, botY - 38);
      ctx.quadraticCurveTo(cx + 30, botY - 12, cx, botY - 10);
      ctx.stroke();

      // Manubrio principal metálico
      ctx.strokeStyle = "#25282c";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 175, botY - 16);
      ctx.quadraticCurveTo(cx - 85, botY - 56, cx, botY - 46);
      ctx.quadraticCurveTo(cx + 85, botY - 56, cx + 175, botY - 16);
      ctx.stroke();

      // Puños ergonómicos bermellón + manetas de freno
      ctx.strokeStyle = "#d84a27";
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(cx - 185, botY - 12);
      ctx.lineTo(cx - 125, botY - 36);
      ctx.moveTo(cx + 185, botY - 12);
      ctx.lineTo(cx + 125, botY - 36);
      ctx.stroke();

      // Timbre metálico a la izquierda
      ctx.fillStyle = "#c88a1b";
      ctx.beginPath();
      ctx.arc(cx - 92, botY - 54, 9, 0, Math.PI * 2);
      ctx.fill();

      // Smartphone montado en el manubrio ejecutando la App EcoCommute GPS en vivo
      const phW = 104;
      const phH = 62;
      const phX = cx - phW / 2;
      const phY = botY - 96;

      ctx.fillStyle = "#141619";
      ctx.strokeStyle = "#faf7f0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(phX, phY, phW, phH, 9);
      ctx.fill();
      ctx.stroke();

      // Mini-mapa GPS OSRM dentro del celular
      ctx.fillStyle = "#1e2923";
      ctx.fillRect(phX + 5, phY + 5, phW - 10, phH - 10);
      ctx.strokeStyle = "#4cd964";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(phX + 18, phY + phH - 10);
      ctx.quadraticCurveTo(cx, phY + 26, phX + phW - 16, phY + 12);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("18.4 km/h · 0g", cx, phY + 22);
      ctx.fillStyle = "#8ce868";
      ctx.font = '700 9.5px "JetBrains Mono", monospace';
      ctx.fillText("✦ +15 PTS VERDES", cx, phY + 46);
    } else if (currentVRPov === "walk") {
      // Vista peatonal realista con muñeca/reloj inteligente Smartwatch EcoCommute
      const watchX = cx - 120 + Math.sin(stepPhase) * 10;
      const watchY = botY - 54 + Math.abs(Math.cos(stepPhase)) * 6;

      // Correa del smartwatch
      ctx.fillStyle = "#2c3138";
      ctx.beginPath();
      ctx.roundRect(watchX - 18, watchY - 26, 36, 68, 8);
      ctx.fill();

      // Caja del reloj inteligente con métricas de caminata
      ctx.fillStyle = "#141619";
      ctx.strokeStyle = "#d84a27";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(watchX - 44, watchY - 18, 88, 48, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#8ce868";
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("🚶 5.2 km/h · 0g", watchX, watchY + 2);
      ctx.fillStyle = "#faf7f0";
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillText("♥ 145 kcal · +9 pts", watchX, watchY + 18);
    } else if (currentVRPov === "scooter") {
      // Columna de dirección T-Bar 3D + Acelerador + Velocímetro OLED Circular
      ctx.strokeStyle = "#1d2228";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, botY);
      ctx.lineTo(cx, botY - 56);
      ctx.moveTo(cx - 130, botY - 48);
      ctx.lineTo(cx + 130, botY - 48);
      ctx.stroke();

      // Puños acanalados y gatillo acelerador eléctrico
      ctx.strokeStyle = "#1f5666";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(cx - 140, botY - 48);
      ctx.lineTo(cx - 88, botY - 48);
      ctx.moveTo(cx + 88, botY - 48);
      ctx.lineTo(cx + 140, botY - 48);
      ctx.stroke();

      // Pantalla OLED circular central del Scooter
      ctx.fillStyle = "#111316";
      ctx.strokeStyle = "#4cd964";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, botY - 56, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("20 km/h", cx, botY - 58);
      ctx.fillStyle = "#8ce868";
      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      ctx.fillText("BAT 92% ⚡", cx, botY - 43);
    } else if (currentVRPov === "car") {
      // Cabina interior completa de automóvil 3D (Pilares A, Espejo Retrovisor, Tablero, Pantalla y Volante)
      ctx.fillStyle = "#1a1c20";
      // Pilar A izquierdo
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(vx + 54, vy);
      ctx.lineTo(vx + 96, botY - 70);
      ctx.lineTo(vx, botY - 70);
      ctx.closePath();
      ctx.fill();

      // Pilar A derecho
      ctx.beginPath();
      ctx.moveTo(vx + vw, vy);
      ctx.lineTo(vx + vw - 54, vy);
      ctx.lineTo(vx + vw - 96, botY - 70);
      ctx.lineTo(vx + vw, botY - 70);
      ctx.closePath();
      ctx.fill();

      // Espejo retrovisor superior
      ctx.fillStyle = "#141619";
      ctx.strokeStyle = "#525860";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 58, vy + 12, 116, 26, 6);
      ctx.fill();
      ctx.stroke();

      // Tablero interior esculpido (Dashboard)
      ctx.fillStyle = "#16181c";
      ctx.fillRect(vx, botY - 74, vw, 74);
      ctx.strokeStyle = "#2e3238";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vx, botY - 74);
      ctx.lineTo(vx + vw, botY - 74);
      ctx.stroke();

      // Pantalla central de infoentretenimiento con alerta de tráfico rojo
      ctx.fillStyle = "#221616";
      ctx.strokeStyle = "#b83227";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx + 16, botY - 64, 156, 46, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ff695c";
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("TRÁFICO HORA PUNTA", cx + 94, botY - 44);
      ctx.fillStyle = "#f3efe6";
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillText("11 km/h · +152g CO₂/km", cx + 94, botY - 28);

      // Volante 3D de cuero frente al conductor
      const wheelX = cx - 92;
      const wheelY = botY - 8;
      ctx.strokeStyle = "#2c3036";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, 64, Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();

      // Cuadro de instrumentos tras el volante
      ctx.fillStyle = "#ff453a";
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillText("11 km/h", wheelX, botY - 32);
    }

    ctx.restore();
  }

  let rafId = null;

  function stepVRScene() {
    const modeSpec = VR_POV_MODES[currentVRPov] || VR_POV_MODES.bike;
    camLaneX += (modeSpec.laneOffset - camLaneX) * 0.08;
    stepPhase += 0.11;
    roadScrollZ = (roadScrollZ + modeSpec.speedFactor * 6.5) % 1620;

    for (const b of buildings) {
      b.z -= modeSpec.speedFactor * 5.2;
      if (b.z < 45) b.z += 1600;
    }

    for (const t of trees) {
      t.z -= modeSpec.speedFactor * 5.2;
      if (t.z < 28) t.z += 1620;
    }

    for (const cy of fellowCyclists) {
      cy.z -= (modeSpec.speedFactor - 3.1) * 4.2;
      if (cy.z < 40) cy.z += 1450;
      if (cy.z > 1550) cy.z -= 1450;
    }

    // Los autos en tráfico avanzan lento; si vas en bici/scooter/a pie los adelantas claramente
    const relCarSpeed = (modeSpec.speedFactor - 0.72) * 4.8;
    for (const c of trafficCars) {
      c.z -= relCarSpeed;
      if (c.z < 36) c.z += 1580;
      if (c.z > 1620) c.z -= 1580;
    }

    for (const g of savingsGates) {
      g.z -= modeSpec.speedFactor * 5.2;
      if (g.z < 32) {
        g.z += 1580;
        if (currentVRPov !== "car") {
          sessionRecycledGrams += 38;
          updateSessionFloraBanner();
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isStereo) {
      const halfW = canvas.width / 2;
      renderEye(0, 0, halfW, canvas.height, -16);
      renderEye(halfW, 0, halfW, canvas.height, 16);
    } else {
      renderEye(0, 0, canvas.width, canvas.height, 0);
    }

    rafId = requestAnimationFrame(stepVRScene);
  }

  function startVR() {
    if (rafId === null) {
      rafId = requestAnimationFrame(stepVRScene);
    }
  }

  function stopVR() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Pausar renderizado cuando la sección VR está fuera del viewport (efficient-background-processing)
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

  renderVRCommuteHud();
}

document.addEventListener("DOMContentLoaded", () => {
  setupSiblingIndexFallback();
  setupBiomeSwitcher();
  setupLanguageToggle();
  setup3DTiltCards();
  setupSimulator();
  setupVRCommuteSimulator();
  setupVehicle3DStudio();
  setupAlchemyLab();
  setupShowcaseTabs();
  setupTermsModal();
  applyTranslations(currentLang);
  checkBackendHealth();
});
