/**
 * EcoCommute Landing Page — Movilidad Urbana Divertida, Comparador Vehicular 3D,
 * Paseo VR 3D Realista, Calculadora de Ahorro & i18n (es_419 / en_US)
 */

const CORRIDORS = {
  miraflores: {
    km: 4.2,
    coords: "🚲 Ciclovía Arequipa",
    bikeMin: 14,
    carMin: 22,
    originTag: "SALIDA · MIRAFLORES",
    destTag: "LLEGADA · SAN ISIDRO",
    carPath: "M 38 94 C 120 98, 165 28, 250 45 C 310 55, 345 32, 382 36",
    ecoPath: "M 38 94 C 110 86, 155 60, 225 58 C 295 56, 330 40, 382 36",
    es: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "«¡Ándate en bici por Av. Arequipa! 🚲 Llegas en 14 min sin comerte el tráfico, ahorras S/ 8.50 y sumas +15 Puntos Verdes.»"
    },
    en: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "“Hop on a bike down Av. Arequipa! 🚲 You'll get there in 14 min skipping traffic, save S/ 8.50, and score +15 Green Points.”"
    }
  },
  upc: {
    km: 5.8,
    coords: "🎓 Ruta Universitaria",
    bikeMin: 19,
    carMin: 31,
    originTag: "SALIDA · UPC MONTERRICO",
    destTag: "LLEGADA · SAN BORJA",
    carPath: "M 38 96 C 95 42, 190 98, 275 40 C 325 24, 355 50, 382 30",
    ecoPath: "M 38 96 C 115 76, 185 66, 260 50 C 315 38, 350 34, 382 30",
    es: {
      routeTitle: "UPC Monterrico → San Borja",
      gemini:
        "«¡Por la ciclovía de Av. Primavera te libras del tráfico de Surco! 🛴 Ahorras 12 minutos y ganas +21 Puntos Verdes para tu café.»"
    },
    en: {
      routeTitle: "UPC Monterrico → San Borja",
      gemini:
        "“Ride down Av. Primavera to skip the Surco traffic jam! 🛴 You save 12 minutes and earn +21 Green Points toward a free coffee.”"
    }
  },
  jesusmaria: {
    km: 3.6,
    coords: "🌳 Vía Arbolada",
    bikeMin: 12,
    carMin: 19,
    originTag: "SALIDA · JESÚS MARÍA",
    destTag: "LLEGADA · LINCE",
    carPath: "M 38 46 C 110 24, 195 92, 280 76 C 330 66, 355 84, 382 70",
    ecoPath: "M 38 46 C 115 50, 195 56, 275 62 C 325 66, 355 68, 382 70",
    es: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "«Av. Salaverry está llenita de árboles y súper plana 🌿: llegas 7 minutos antes que en auto y sumas +13 Puntos Verdes.»"
    },
    en: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "“Av. Salaverry is flat and shaded by trees 🌿: you arrive 7 minutes faster than driving and score +13 Green Points.”"
    }
  },
  barranco: {
    km: 2.9,
    coords: "🌊 Ruta Malecón",
    bikeMin: 10,
    carMin: 16,
    originTag: "SALIDA · BARRANCO",
    destTag: "LLEGADA · MIRAFLORES",
    carPath: "M 38 98 C 130 102, 210 78, 290 62 C 340 50, 360 36, 382 28",
    ecoPath: "M 38 98 C 105 70, 180 44, 265 36 C 325 30, 355 28, 382 28",
    es: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "«¡Paseazo frente al mar por el Malecón! 🌊 Cero semáforos pesados, brisa fresca y +10 Puntos Verdes directos a tu cuenta.»"
    },
    en: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "“Cruise along the oceanfront Malecón bike path! 🌊 Zero heavy lights, ocean breeze, and +10 Green Points added to your balance.”"
    }
  }
};

const VEHICLE_SPECS = {
  bike: {
    badge: "0 g CO₂ / km",
    isDanger: false,
    speed: "18 km/h",
    space: "1.5 m²",
    pts: "+15 pts / viaje",
    es: {
      code: "🚲 EN BICICLETA · ¡RÁPIDO, DIVERTIDO Y SIN TRÁFICO!",
      chassis: "ESPACIO QUE OCUPAS: 1.5 m² · CERO GASOLINA",
      laneSummary: "30 ciclistas avanzan libres (0 g humo) vs. autos atorados"
    },
    en: {
      code: "🚲 BY BICYCLE · FAST, FUN & TRAFFIC-FREE!",
      chassis: "SPACE USED: 1.5 m² · ZERO GASOLINE",
      laneSummary: "30 cyclists glide freely (0 g smoke) vs. stuck cars"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="#8ce868" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4" />
        <circle cx="88" cy="68" r="24" stroke="#f4f7f4" stroke-width="4" />
        <circle cx="88" cy="68" r="5" fill="#ffd166" />
        <circle cx="228" cy="68" r="24" stroke="#f4f7f4" stroke-width="4" />
        <circle cx="228" cy="68" r="5" fill="#ffd166" />
        <path d="M88 68 L136 32 L202 32 L152 68 Z" stroke="#8ce868" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M136 32 L152 68 M124 22 L146 22 M202 32 L228 68 M194 18 L212 22" stroke="#f4f7f4" stroke-width="3.5" stroke-linecap="round" />
        <rect x="20" y="12" width="76" height="20" rx="10" fill="#8ce868" />
        <text x="58" y="25" text-anchor="middle" fill="#07150c" font-family="JetBrains Mono" font-size="9" font-weight="800">🚲 +15 PTS</text>
      </svg>
    `
  },
  scooter: {
    badge: "0 g CO₂ / km*",
    isDanger: false,
    speed: "20 km/h",
    space: "1.2 m²",
    pts: "+14 pts / viaje",
    es: {
      code: "🛴 SCOOTER ELÉCTRICO · ÁGIL Y SIN SUDAR",
      chassis: "ESPACIO QUE OCUPAS: 1.2 m² · CONECTA CON EL METRO",
      laneSummary: "30 scooters = 0 g de humo · Ideal para llegar rapidito"
    },
    en: {
      code: "🛴 ELECTRIC SCOOTER · AGILE & EFFORTLESS",
      chassis: "SPACE USED: 1.2 m² · CONNECTS WITH METRO",
      laneSummary: "30 e-scooters = 0 g smoke · Great for quick trips"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="#7de2d1" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4" />
        <circle cx="96" cy="76" r="16" stroke="#f4f7f4" stroke-width="4" />
        <circle cx="220" cy="76" r="16" stroke="#f4f7f4" stroke-width="4" />
        <path d="M96 76 H196 L214 20 M198 20 H224" stroke="#7de2d1" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="118" y="68" width="64" height="8" rx="4" fill="#8ce868" />
        <rect x="20" y="12" width="86" height="20" rx="10" fill="#7de2d1" />
        <text x="63" y="25" text-anchor="middle" fill="#07150c" font-family="JetBrains Mono" font-size="9" font-weight="800">🛴 +14 PTS</text>
      </svg>
    `
  },
  transit: {
    badge: "-75% CO₂ / km",
    isDanger: false,
    speed: "24 km/h",
    space: "0.8 m²",
    pts: "+10 pts / viaje",
    es: {
      code: "🚌 BUS / TREN ELÉCTRICO · VIAJE COMPARTIDO",
      chassis: "ESPACIO POR PASAJERO: 0.8 m² · REEMPLAZA 35 AUTOS",
      laneSummary: "1 bus libera la pista de hasta 35 autos particulares"
    },
    en: {
      code: "🚌 BUS / ELECTRIC TRAIN · SHARED RIDE",
      chassis: "SPACE PER RIDER: 0.8 m² · REPLACES 35 CARS",
      laneSummary: "1 bus frees the road from up to 35 private cars"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="#ffd166" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4" />
        <rect x="44" y="26" width="232" height="52" rx="10" fill="#182820" stroke="#ffd166" stroke-width="3.5" />
        <rect x="58" y="36" width="38" height="22" rx="4" fill="#7de2d1" fill-opacity="0.3" stroke="#7de2d1" stroke-width="2" />
        <rect x="106" y="36" width="38" height="22" rx="4" fill="#7de2d1" fill-opacity="0.3" stroke="#7de2d1" stroke-width="2" />
        <rect x="154" y="36" width="38" height="22" rx="4" fill="#7de2d1" fill-opacity="0.3" stroke="#7de2d1" stroke-width="2" />
        <rect x="202" y="36" width="56" height="22" rx="4" fill="#8ce868" fill-opacity="0.35" stroke="#8ce868" stroke-width="2" />
        <circle cx="92" cy="80" r="13" fill="#f4f7f4" />
        <circle cx="228" cy="80" r="13" fill="#f4f7f4" />
      </svg>
    `
  },
  car: {
    badge: "152 g CO₂ / km",
    isDanger: true,
    speed: "12 km/h",
    space: "18.0 m²",
    pts: "0 pts (Tráfico)",
    es: {
      code: "🚗 AUTO EN HORA PUNTA · LENTO Y CON HUMO",
      chassis: "OCUPA 18 m² DE PISTA · GASTA GASOLINA EN EL TRÁFICO",
      laneSummary: "30 autos = fila detenida a 12 km/h y mucho humo"
    },
    en: {
      code: "🚗 CAR IN RUSH HOUR · SLOW & SMOKY",
      chassis: "TAKES 18 m² OF ROAD · BURNS GAS IN TRAFFIC",
      laneSummary: "30 cars = gridlock at 12 km/h and heavy smoke"
    },
    svg: `
      <svg class="veh-blueprint-svg" viewBox="0 0 320 110" fill="none" aria-hidden="true">
        <line x1="16" y1="96" x2="304" y2="96" stroke="#ff8c61" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4" />
        <path d="M56 74 L74 42 H198 L226 56 L264 62 V78 H56 Z" fill="#3a1c18" stroke="#ff8c61" stroke-width="3.5" stroke-linejoin="round" />
        <circle cx="98" cy="78" r="15" fill="#f4f7f4" />
        <circle cx="222" cy="78" r="15" fill="#f4f7f4" />
        <circle cx="34" cy="68" r="7" fill="#ff8c61" fill-opacity="0.45" />
        <circle cx="20" cy="62" r="10" fill="#ff8c61" fill-opacity="0.28" />
        <rect x="86" y="12" width="148" height="20" rx="10" fill="#ff8c61" />
        <text x="160" y="25" text-anchor="middle" fill="#07150c" font-family="JetBrains Mono" font-size="9" font-weight="800">🚗 152g CO₂ · TRÁFICO</text>
      </svg>
    `
  }
};

const translations = {
  es_419: {
    "page.title": "EcoCommute — Muévete por Lima, Ahorra y Gana Premios Verdes",
    "nav.skip": "Saltar al contenido principal",
    "topbar.badge": "🌱 NIVEL 4: CICLISTA LIMEÑO",
    "topbar.spec": "🔥 Racha activa de 7 días · ¡Suma puntos en cada viaje!",
    "topbar.recycled_label": "CO₂ AHORRADO HOY:",
    "biome.caliza": "🌿 Lomas",
    "biome.asfalto": "💎 Esmeralda",
    "biome.ferroviario": "☀️ Sol",
    "nav.aria": "Navegación principal",
    "nav.vr": "Paseo VR 3D",
    "nav.vehicles": "Vehículos 3D",
    "nav.alchemy": "Tu Ahorro",
    "nav.why": "La Idea",
    "nav.features": "En la App",
    "nav.screens": "Pantallas",
    "nav.team": "Equipo",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero & Decorative App Badges
    "hero.kicker": "🚲 ¡Muévete por Lima, ahorra plata y gana premios reales!",
    "hero.title": "Deja el tráfico atrás, ",
    "hero.title_em": "pedalea o camina y gana premios en Lima.",
    "hero.lead":
      "Elige cómo moverte (bici, scooter, bus o a pie), mira cuánto dinero y CO₂ ahorras al instante y canjea tus puntos por cafés y descuentos.",
    "decor.badge_lbl": "TU MEDALLA",
    "decor.badge_val": "Ciclista Arequipa",
    "decor.streak_lbl": "TU RACHA",
    "decor.streak_val": "7 días seguidos",
    "decor.reward_lbl": "PREMIO LISTO",
    "decor.reward_val": "Café & Taller Bici",
    "decor.medals_title": "🏅 TUS MEDALLAS EN LA APP",
    "decor.m1": "1er Pedal",
    "decor.m2": "-10kg CO₂",
    "decor.m3": "Racha 7D",
    "decor.m4": "100 PET",
    "decor.m5": "500 km",
    "decor.streak_title": "🔥 TU RACHA DE LA SEMANA",
    "decor.rewards_title": "🎁 CANJEA TUS PUNTOS",
    "decor.r1": "Café Gratis",
    "decor.r2": "Taller Bici",
    "decor.r3": "Luces LED",

    "hero.flora_tag": "MIS VIAJES DE HOY",
    "hero.btn_vr": "¡Probar Paseo en Realidad Virtual!",
    "hero.btn_vehicles": "Ver Vehículos en 3D",
    "hero.btn_simulator": "Ver mi ahorro anual →",
    "hero.btn_screens": "Ver pantallas →",
    "hero.stat1_label": "Humo en el tráfico",
    "hero.stat2_label": "Aire 100% limpio",
    "hero.stat2_unit": "g de humo",
    "hero.stat3_label": "Ganas por viajar",
    "hero.stat3_unit": "puntos / ruta",
    "hero.card_label": "🗺️ ¿A DÓNDE VAMOS HOY? · PRUEBA UNA RUTA",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "Si vas en auto (humo emitido)",
    "hero.car_val": "638 g de CO₂",
    "hero.bike": "Si vas en bici, scooter o a pie",
    "hero.bike_val": "0 g de CO₂ 🎉",
    "hero.points": "Puntos que ganas hoy",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot": "¡Cada viaje sin auto suma puntos para canjear en cafés y talleres de bici aliados!",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "ÁNGULO DEL MAPA:",
    "sim.cam_iso": "Vista 3D",
    "sim.cam_orbit": "Inclinada",
    "sim.cam_flat": "Mapa 2D",
    "sim.by_bike": "en bici 🚲",
    "sim.by_car_traffic": "en auto 🚗",
    "sim.adjust_distance": "¿Cuántos kilómetros vas a recorrer?",
    "sim.pet_equiv_label": "Equivale a reciclar",
    "sim.gemini_tag": "CONSEJO DE ECOBOT · TU COPILOTO",
    "sim.gemini_miraflores":
      "«¡Ándate en bici por Av. Arequipa! 🚲 Llegas en 14 min sin comerte el tráfico, ahorras S/ 8.50 y sumas +15 Puntos Verdes.»",
    "sim.btn_recycle_trip": "¡Hice este viaje! Sumar mis Puntos Verdes",

    // VR First-Person Commute Mode
    "vr.title": "¡Súbete a la bici, camina o ve en scooter en Realidad Virtual!",
    "vr.mode_bike": "En Bicicleta (Ciclovía)",
    "vr.mode_walk": "A Pie (Vereda Arbolada)",
    "vr.mode_scooter": "En Scooter Eléctrico",
    "vr.mode_car": "En Auto (Atorado en Tráfico)",
    "vr.btn_stereo": "Gafas VR (Doble Lente)",
    "vr.btn_fullscreen": "Pantalla Completa",
    "vr.hud_co2_label": "HUMO QUE EVITAS",
    "vr.hud_time_label": "TIEMPO DE VIAJE",
    "vr.hud_money_label": "PLATA Y SALUD",
    "vr.hud_pts_label": "PREMIO DEL VIAJE",
    "vr.drag_pill": "🖱️ GIRA EN 360° · ⌨️ FLECHAS",

    // Vehicles 3D Section
    "veh.title": "¿En qué te mueves hoy? Compara tus opciones en 3D",
    "veh.lbl_speed": "TU VELOCIDAD",
    "veh.lbl_space": "ESPACIO EN PISTA",
    "veh.lbl_pts": "PUNTOS QUE GANAS",
    "veh.drag_hint": "↔ ARRASTRA PARA GIRARLO EN 3D · TOCA OTRO VEHÍCULO",
    "veh.lane_sim_title": "🚦 MIRA LA DIFERENCIA EN AV. JAVIER PRADO",
    "veh.mode_bike": "Bicicleta",
    "veh.mode_bike_desc": "Te olvidas de los embotellamientos, haces ejercicio y ganas el máximo de puntos.",
    "veh.mode_scooter": "Scooter Eléctrico",
    "veh.mode_scooter_desc": "Perfecto para ir a clases o a la oficina rapidito por la ciclovía.",
    "veh.mode_transit": "Bus / Tren Eléctrico",
    "veh.mode_transit_desc": "Contamina 4 veces menos por persona que ir solo en auto y también suma puntos.",
    "veh.mode_car": "Auto Particular",
    "veh.mode_car_desc": "Te quedas atorado en el tráfico, gastas en gasolina y no suma Puntos Verdes.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "Lo que ahorras en un año dejando el auto en casa",
    "alchemy.p1": "🚲 3 días por semana",
    "alchemy.p2": "🎓 Todos los días a la uni",
    "alchemy.p3": "⚡ Fan total de la bici",
    "alchemy.slider_trips": "Viajes sin auto por semana",
    "alchemy.slider_km": "Kilómetros por cada viaje",
    "alchemy.fuel_label": "⛽ GASOLINA QUE AHORRAS",
    "alchemy.hours_label": "⏰ HORAS LIBRES SIN TRÁFICO",
    "alchemy.annual_saved_label": "🌿 HUMO QUE LE AHORRAS A LIMA EN 1 AÑO",
    "alchemy.card1_title": "Botellas recicladas",
    "alchemy.card1_desc": "Equivale a reciclar miles de botellas plásticas al año.",
    "alchemy.card2_title": "Latas reutilizadas",
    "alchemy.card2_desc": "Toda la energía que ahorras con solo dejar el auto.",
    "alchemy.card3_title": "Árboles respirando",
    "alchemy.card3_desc": "Como plantar casi 10 árboles nuevos en tu distrito.",
    "alchemy.card4_title": "Puntos para canjear",
    "alchemy.card4_desc": "Úsalos por cafés gratis, mantenimiento de bici y más.",

    // Story
    "story.title": "¿Cómo funciona?",
    "story.sidebar_note":
      "Nada de menús complicados: eliges tu ruta, viajas sin auto y ganas premios reales.",
    "story.p1": "Moverse por Lima no tiene por qué ser estresante. Convertimos tus viajes diarios en un juego donde tú ahorras y la ciudad respira mejor.",
    "story.p2_pre": "Con EcoCommute ves tu ahorro ",
    "story.p2_under": "antes",
    "story.p2_post": " de salir de casa y recibes recompensas por cada kilómetro sin auto.",
    "story.comp_old_tag": "😴 Apps de mapas de siempre",
    "story.comp_old_desc": "Solo te mandan por el tráfico en auto y no te dan nada por cuidar el aire.",
    "story.comp_new_tag": "🎉 Con EcoCommute",
    "story.comp_new_desc": "Te muestra las mejores ciclovías, calcula tu ahorro y te regala Puntos Verdes.",
    "story.quote": "«Cuando viajar en bici o caminar se siente como subir de nivel y ganar premios, dejar el auto es facilísimo.»",
    "story.quote_author": "— Equipo EcoCommute · UPC",

    // Features
    "feat.title": "Fácil, divertida y hecha para tu día a día",
    "feat.routes_title": "Rutas rápidas y consejos de EcoBot",
    "feat.routes_desc":
      "Pregúntale cuál es el camino más fresco y seguro en bici, scooter o caminando y evita los embotellamientos.",
    "feat.trips_title": "Registra tu viaje en un toque",
    "feat.trips_desc": "Mira cuánto humo evitaste frente al auto y recibe tus monedas verdes al instante.",
    "feat.dash_title": "Mira todo lo que vas logrando",
    "feat.dash_desc": "Revisa tus kilómetros de la semana, el dinero ahorrado y los árboles que ayudaste a cuidar.",
    "feat.rank_title": "Ranking entre distritos",
    "feat.rank_desc": "Suma puntos con tus amigos para que tu distrito o universidad llegue al puesto #1.",
    "feat.badges_title": "Medallas y premios reales",
    "feat.badges_desc": "Colecciona medallas divertidas y cambia tus puntos por cafés, accesorios y descuentos.",
    "feat.challenges_title": "Retos de la semana",
    "feat.challenges_desc": "Completa misiones sencillas (como ir 3 días en bici) para duplicar tus Puntos Verdes.",

    // ODS
    "ods.title": "Una Lima más limpia y divertida para moverse (ODS 11.2)",
    "ods.desc":
      "Impulsamos el transporte sostenible en nuestra ciudad premiando a quienes eligen pedalear, caminar o usar transporte público.",
    "ods.badge_ods": "🌱 ODS 11.2 · Ciudades Sostenibles",
    "ods.badge_ai": "🤖 Rutas guiadas por EcoBot IA",
    "ods.badge_osrm": "🚲 Ciclovías de Lima",

    // Demo
    "demo.title": "Así de fácil se ve en tu pantalla",
    "demo.tab_all": "Ver ambas",
    "demo.tab_routes": "Mapa de Rutas",
    "demo.tab_dash": "Mis Logros y Puntos",
    "demo.img1_alt": "Vista del mapa de rutas sostenibles en Lima",
    "demo.cap1": "Elige tu destino y compara cuánto ahorras yendo en bici, bus o caminando.",
    "demo.img2_alt": "Vista de logros, medallas y puntos verdes",
    "demo.cap2": "Revisa tus Puntos Verdes acumulados, tus medallas y tu racha semanal.",

    // Impact
    "impact.title": "Pequeños viajes, gran cambio",
    "impact.desc": "Cada vez que dejas el auto, reduces el ruido y el humo en tu barrio mientras cuidas tu privacidad.",
    "impact.p1": "Humo cuando vas en bici o a pie",
    "impact.p2": "Privado: sin rastreo oculto",
    "impact.p3": "Beneficios en locales aliados",

    // Team
    "team.title": "Quiénes creamos la app",
    "team.intro": "Estudiantes de Ingeniería de Sistemas en la UPC apasionados por una Lima con menos tráfico.",
    "team.member1_role": "Copiloto EcoBot y rutas inteligentes",
    "team.member2_role": "Mapa interactivo, progreso y medallas",
    "team.member3_role": "Registro de viajes y calculadora de ahorro",
    "team.member4_role": "Puntos verdes, retos y ranking distrital",
    "team.member5_role": "Perfil de viajero y acceso seguro",
    "team.member6_role": "Diseño visual, guía de uso y web",

    // Contact & Footer
    "contact.title": "¿Te animas a pedalear con nosotros?",
    "contact.intro": "Si tienes ideas de rutas, ciclovías o cafeterías aliadas en Lima, escríbenos.",
    "contact.github": "💻 Proyecto en GitHub",
    "contact.linkedin": "💼 EcoCommute en LinkedIn",
    "footer.academic": "🚲 EcoCommute · Proyecto estudiantil UPC (Lima, 2026)",
    "footer.terms": "Términos de Uso",
    "footer.privacy": "Privacidad",
    "modal.title": "Términos de Uso y Privacidad — EcoCommute",
    "modal.close": "Cerrar ventana modal",
    "modal.intro": "Así cuidamos tus datos mientras te mueves por Lima:",
    "modal.p1":
      "<strong>Tu privacidad primero:</strong> Cumplimos con la Ley N° 29733 (Perú). Solo usamos tu ruta para calcular cuánto CO₂ ahorraste y darte tus Puntos Verdes; nunca te rastreamos en segundo plano ni vendemos tus datos.",
    "modal.p2":
      "<strong>Rutas transparentes:</strong> Usamos mapas abiertos de OpenStreetMap y sugerencias de IA para recomendarte siempre el camino más seguro y limpio.",
    "modal.p3":
      "<strong>Compromiso con la ciudad:</strong> Somos un proyecto universitario pensado para que moverse sin auto en Lima sea seguro, divertido y premiado.",
    "modal.full_link": "Ver página completa de Términos y Privacidad →"
  },

  en_US: {
    "page.title": "EcoCommute — Ride Around Lima, Save Money & Win Green Rewards",
    "nav.skip": "Skip to main content",
    "topbar.badge": "🌱 LEVEL 4: LIMA CYCLIST",
    "topbar.spec": "🔥 7-day active streak · Earn points on every ride!",
    "topbar.recycled_label": "CO₂ SAVED TODAY:",
    "biome.caliza": "🌿 Lomas",
    "biome.asfalto": "💎 Emerald",
    "biome.ferroviario": "☀️ Sunny",
    "nav.aria": "Main navigation",
    "nav.vr": "3D VR Ride",
    "nav.vehicles": "3D Vehicles",
    "nav.alchemy": "Your Savings",
    "nav.why": "The Idea",
    "nav.features": "In the App",
    "nav.screens": "Screens",
    "nav.team": "Team",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero & Decorative App Badges
    "hero.kicker": "🚲 Move around Lima, save cash, and win real rewards!",
    "hero.title": "Leave traffic behind, ",
    "hero.title_em": "bike or walk and win rewards in Lima.",
    "hero.lead":
      "Pick how you move (bike, scooter, bus, or walking), see how much money and CO₂ you save right away, and trade points for free coffee and perks.",
    "decor.badge_lbl": "YOUR BADGE",
    "decor.badge_val": "Arequipa Cyclist",
    "decor.streak_lbl": "YOUR STREAK",
    "decor.streak_val": "7 days in a row",
    "decor.reward_lbl": "REWARD READY",
    "decor.reward_val": "Café & Bike Tune-Up",
    "decor.medals_title": "🏅 YOUR APP MEDALS",
    "decor.m1": "1st Ride",
    "decor.m2": "-10kg CO₂",
    "decor.m3": "7D Streak",
    "decor.m4": "100 PET",
    "decor.m5": "500 km",
    "decor.streak_title": "🔥 YOUR WEEKLY STREAK",
    "decor.rewards_title": "🎁 REDEEM YOUR POINTS",
    "decor.r1": "Free Coffee",
    "decor.r2": "Bike Tune-Up",
    "decor.r3": "LED Lights",

    "hero.flora_tag": "MY RIDES TODAY",
    "hero.btn_vr": "Try the 3D Virtual Reality Ride!",
    "hero.btn_vehicles": "Explore Vehicles in 3D",
    "hero.btn_simulator": "See my yearly savings →",
    "hero.btn_screens": "See app screens →",
    "hero.stat1_label": "Smoke in traffic",
    "hero.stat2_label": "100% clean air",
    "hero.stat2_unit": "g of smoke",
    "hero.stat3_label": "You earn per trip",
    "hero.stat3_unit": "points / ride",
    "hero.card_label": "🗺️ WHERE ARE WE GOING TODAY? · TRY A ROUTE",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "If you go by car (smoke emitted)",
    "hero.car_val": "638 g of CO₂",
    "hero.bike": "If you bike, scooter, or walk",
    "hero.bike_val": "0 g of CO₂ 🎉",
    "hero.points": "Points you earn today",
    "hero.points_val": "+15 green points",
    "hero.card_foot": "Every car-free ride adds points you can redeem at partner cafés and bike shops!",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.cam_label": "MAP ANGLE:",
    "sim.cam_iso": "3D View",
    "sim.cam_orbit": "Tilted",
    "sim.cam_flat": "2D Map",
    "sim.by_bike": "by bike 🚲",
    "sim.by_car_traffic": "by car 🚗",
    "sim.adjust_distance": "How many kilometers is your ride?",
    "sim.pet_equiv_label": "Equals recycling",
    "sim.gemini_tag": "ECOBOT TIP · YOUR ROUTE BUDDY",
    "sim.gemini_miraflores":
      "“Hop on a bike down Av. Arequipa! 🚲 You'll arrive in 14 min skipping traffic, save S/ 8.50, and score +15 Green Points.”",
    "sim.btn_recycle_trip": "I did this ride! Add my Green Points",

    // VR First-Person Commute Mode
    "vr.title": "Hop on a bike, walk, or ride a scooter in Virtual Reality!",
    "vr.mode_bike": "By Bicycle (Bike Lane)",
    "vr.mode_walk": "On Foot (Tree-Lined Sidewalk)",
    "vr.mode_scooter": "By Electric Scooter",
    "vr.mode_car": "By Car (Stuck in Traffic)",
    "vr.btn_stereo": "VR Glasses (Dual Lens)",
    "vr.btn_fullscreen": "Fullscreen",
    "vr.hud_co2_label": "SMOKE AVOIDED",
    "vr.hud_time_label": "TRAVEL TIME",
    "vr.hud_money_label": "CASH & HEALTH",
    "vr.hud_pts_label": "RIDE REWARD",
    "vr.drag_pill": "🖱️ SPIN 360° · ⌨️ ARROWS",

    // Vehicles 3D Section
    "veh.title": "How are you riding today? Compare your options in 3D",
    "veh.lbl_speed": "YOUR SPEED",
    "veh.lbl_space": "ROAD SPACE",
    "veh.lbl_pts": "POINTS YOU WIN",
    "veh.drag_hint": "↔ DRAG TO SPIN IN 3D · TAP ANOTHER VEHICLE",
    "veh.lane_sim_title": "🚦 SEE THE DIFFERENCE ON AV. JAVIER PRADO",
    "veh.mode_bike": "Bicycle",
    "veh.mode_bike_desc": "Skip traffic jams, get a great workout, and score the maximum points.",
    "veh.mode_scooter": "Electric Scooter",
    "veh.mode_scooter_desc": "Great for cruising to class or work along the bike lane without breaking a sweat.",
    "veh.mode_transit": "Bus / Electric Train",
    "veh.mode_transit_desc": "Pollutes 4× less per person than driving solo and also earns points.",
    "veh.mode_car": "Private Car",
    "veh.mode_car_desc": "Stuck in rush-hour gridlock, spending money on gas, and earning 0 Green Points.",

    // Calculator / Modal Shift Ticket
    "alchemy.title": "What you save in a year by leaving the car at home",
    "alchemy.p1": "🚲 3 days a week",
    "alchemy.p2": "🎓 Daily campus ride",
    "alchemy.p3": "⚡ Full bike fan",
    "alchemy.slider_trips": "Car-free rides per week",
    "alchemy.slider_km": "Kilometers per ride",
    "alchemy.fuel_label": "⛽ GASOLINE YOU SAVE",
    "alchemy.hours_label": "⏰ FREE HOURS OUT OF TRAFFIC",
    "alchemy.annual_saved_label": "🌿 SMOKE YOU SPARE LIMA IN 1 YEAR",
    "alchemy.card1_title": "Recycled bottles",
    "alchemy.card1_desc": "Like keeping thousands of plastic bottles out of landfills.",
    "alchemy.card2_title": "Reused cans",
    "alchemy.card2_desc": "All the energy you save just by skipping the car.",
    "alchemy.card3_title": "Breathing trees",
    "alchemy.card3_desc": "Like planting nearly 10 new trees in your neighborhood.",
    "alchemy.card4_title": "Redeemable points",
    "alchemy.card4_desc": "Trade them for free coffees, bike tune-ups, and gear.",

    // Story
    "story.title": "How does it work?",
    "story.sidebar_note":
      "No complicated menus: pick your route, ride car-free, and win real rewards.",
    "story.p1": "Getting around Lima doesn't have to be stressful. We turn your daily rides into a game where you save cash and the city breathes cleaner air.",
    "story.p2_pre": "With EcoCommute you see your savings ",
    "story.p2_under": "before",
    "story.p2_post": " leaving home and earn rewards for every car-free kilometer.",
    "story.comp_old_tag": "😴 Regular map apps",
    "story.comp_old_desc": "Only send you into car traffic and give you nothing for keeping the air clean.",
    "story.comp_new_tag": "🎉 With EcoCommute",
    "story.comp_new_desc": "Shows you the best bike lanes, calculates your savings, and gifts you Green Points.",
    "story.quote": "“When riding a bike or walking feels like leveling up and winning prizes, leaving the car at home is easy.”",
    "story.quote_author": "— EcoCommute Team · UPC",

    // Features
    "feat.title": "Easy, fun, and built for your everyday rides",
    "feat.routes_title": "Fast routes & tips from EcoBot",
    "feat.routes_desc": "Ask for the safest, quickest path by bike, scooter, or foot and skip the gridlock.",
    "feat.trips_title": "Log your ride in one tap",
    "feat.trips_desc": "See how much smoke you avoided vs. driving and get your green coins right away.",
    "feat.dash_title": "See everything you're achieving",
    "feat.dash_desc": "Check your weekly kilometers, money saved, and the trees you helped protect.",
    "feat.rank_title": "District leaderboard",
    "feat.rank_desc": "Team up with friends so your district or university reaches #1.",
    "feat.badges_title": "Medals & real rewards",
    "feat.badges_desc": "Collect fun badges and trade your points for coffee, bike gear, and discounts.",
    "feat.challenges_title": "Weekly quests",
    "feat.challenges_desc": "Complete simple quests (like biking 3 days) to double your Green Points.",

    // ODS
    "ods.title": "A cleaner, more fun Lima to get around (SDG 11.2)",
    "ods.desc":
      "We champion sustainable transport in our city by rewarding everyone who chooses to cycle, walk, or ride transit.",
    "ods.badge_ods": "🌱 SDG 11.2 · Sustainable Cities",
    "ods.badge_ai": "🤖 Routes guided by EcoBot AI",
    "ods.badge_osrm": "🚲 Lima Bike Lanes",

    // Demo
    "demo.title": "How easy it looks on your screen",
    "demo.tab_all": "See both",
    "demo.tab_routes": "Route Map",
    "demo.tab_dash": "My Achievements & Points",
    "demo.img1_alt": "Interactive map of sustainable routes in Lima",
    "demo.cap1": "Pick your destination and compare how much you save by bike, bus, or walking.",
    "demo.img2_alt": "Achievements, medals, and green points screen",
    "demo.cap2": "Check your collected Green Points, unlocked medals, and weekly streak.",

    // Impact
    "impact.title": "Small rides, big change",
    "impact.desc": "Every time you skip the car, you cut noise and smoke in your neighborhood while keeping your privacy safe.",
    "impact.p1": "Smoke when biking or walking",
    "impact.p2": "Private: no hidden tracking",
    "impact.p3": "Perks at local partner spots",

    // Team
    "team.title": "Who built the app",
    "team.intro": "Systems Engineering students at UPC passionate about a traffic-free Lima.",
    "team.member1_role": "EcoBot copilot & smart routes",
    "team.member2_role": "Interactive map, progress & medals",
    "team.member3_role": "Ride logging & savings calculator",
    "team.member4_role": "Green points, quests & district ranking",
    "team.member5_role": "Rider profile & secure sign-in",
    "team.member6_role": "Visual design, user guide & web",

    // Contact & Footer
    "contact.title": "Ready to ride with us?",
    "contact.intro": "Have ideas for routes, bike lanes, or partner cafés in Lima? Drop us a line.",
    "contact.github": "💻 Project on GitHub",
    "contact.linkedin": "💼 EcoCommute on LinkedIn",
    "footer.academic": "🚲 EcoCommute · UPC Student Project (Lima, 2026)",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy",
    "modal.title": "Terms of Use & Privacy — EcoCommute",
    "modal.close": "Close modal window",
    "modal.intro": "How we protect your data while you ride around Lima:",
    "modal.p1":
      "<strong>Your privacy comes first:</strong> We follow Peru's Law N° 29733. We only use your route to calculate how much CO₂ you saved and give you Green Points; we never track you in the background or sell your data.",
    "modal.p2":
      "<strong>Transparent routes:</strong> We use open OpenStreetMap data and AI tips to always suggest the safest, cleanest path.",
    "modal.p3":
      "<strong>Commitment to our city:</strong> We're a university project built to make car-free mobility in Lima safe, fun, and rewarding.",
    "modal.full_link": "Open full Terms & Privacy page →"
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
      statusEl.innerHTML = `<strong>${sessionTripsCount} car-free rides</strong> · <strong>${sessionRecycledGrams.toLocaleString()} g CO₂ saved</strong> · <strong>♻ ${petEq} PET bottles</strong>`;
    } else {
      statusEl.innerHTML = `<strong>${sessionTripsCount} viajes sin auto</strong> · <strong>${sessionRecycledGrams.toLocaleString()} g CO₂ ahorrados</strong> · <strong>♻ ${petEq} botellas PET</strong>`;
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
  if (bikeCo2El) bikeCo2El.textContent = isEn ? "0 g of CO₂ 🎉" : "0 g de CO₂ 🎉";
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

  if (tripsOut) tripsOut.textContent = isEn ? `${alchemyTrips} rides/wk` : `${alchemyTrips} viajes/sem`;
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

// Selector de Paleta Original (Lomas de Amancaes, Esmeralda, Sol Terracota)
function setupBiomeSwitcher() {
  const chips = document.querySelectorAll(".biome-chip");
  const validPalettes = ["amancaes", "esmeralda", "terracota"];
  let savedBiome = localStorage.getItem("ecocommute_biome") || "amancaes";
  if (!validPalettes.includes(savedBiome)) {
    savedBiome = "amancaes";
  }
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
      const earnedPts = Math.max(5, Math.round(currentKm * 3.57));
      sessionRecycledGrams += addedGrams;
      sessionTripsCount += 1;
      updateSessionFloraBanner();

      const labelSpan = recycleBtn.querySelector("[data-i18n='sim.btn_recycle_trip']");
      if (labelSpan) {
        const isEn = currentLang === "en_US";
        labelSpan.textContent = isEn
          ? `🎉 Awesome! +${earnedPts} Green Points added!`
          : `🎉 ¡Genial! Sumaste +${earnedPts} Puntos Verdes`;
        setTimeout(() => {
          const dict = translations[currentLang] || translations.es_419;
          labelSpan.textContent = dict["sim.btn_recycle_trip"];
        }, 2000);
      }
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
    gateTags: ["🪙 +15 PUNTOS", "💵 S/ 8.50 AHORRO", "🌱 -638g CO₂", "♻ 8 BOTELLAS"],
    es: {
      co2: "-638 g CO₂ ahorrados",
      time: "14 min · 18 km/h (-8 min)",
      money: "S/ 8.50 ahorrados · 115 kcal",
      pts: "+15 pts · ♻ 8 PET",
      caption:
        "🚲 VISTA CICLISTA: ¡Avanzas libre por la ciclovía verde de Av. Arequipa recogiendo monedas de Puntos Verdes mientras a la derecha el tráfico está detenido!"
    },
    en: {
      co2: "-638 g CO₂ saved",
      time: "14 min · 18 km/h (-8 min)",
      money: "S/ 8.50 saved · 115 kcal",
      pts: "+15 pts · ♻ 8 PET",
      caption:
        "🚲 CYCLIST POV: Gliding smoothly down the Av. Arequipa green bike lane collecting Green Point coins while rush-hour cars sit still on the right!"
    }
  },
  walk: {
    speedFactor: 1.85,
    laneOffset: -135,
    stepBob: 1.0,
    gateTags: ["🌱 0g HUMO", "❤️ +145 KCAL", "💵 S/ 0.00 GASTO", "🪙 +9 PUNTOS"],
    es: {
      co2: "-274 g CO₂ (paseo 1.8 km)",
      time: "21 min · 5 km/h (paseo fresco)",
      money: "S/ 0.00 gasto · +145 kcal",
      pts: "+9 pts · ♻ 3 PET",
      caption:
        "🚶 VISTA A PIE: Caminas relajado bajo los árboles de la vereda sin gastar un sol y sumando pasos para tus recompensas."
    },
    en: {
      co2: "-274 g CO₂ (1.8 km walk)",
      time: "21 min · 5 km/h (fresh walk)",
      money: "S/ 0.00 cost · +145 kcal",
      pts: "+9 pts · ♻ 3 PET",
      caption:
        "🚶 WALKING POV: Strolling under the trees on a sunny sidewalk with zero fuel cost and earning rewards with every step."
    }
  },
  scooter: {
    speedFactor: 4.9,
    laneOffset: -68,
    stepBob: 0.1,
    gateTags: ["⚡ 0g HUMO", "🚀 -10 MIN TRÁFICO", "🚇 CONEXIÓN METRO", "🪙 +14 PUNTOS"],
    es: {
      co2: "-638 g CO₂ ahorrados",
      time: "12 min · 20 km/h (-10 min)",
      money: "S/ 7.80 ahorrados en taxi",
      pts: "+14 pts · ♻ 8 PET",
      caption:
        "🛴 VISTA SCOOTER: Conectas súper rápido desde la estación del Metropolitano o Metro hasta tu destino sin sudar una gota."
    },
    en: {
      co2: "-638 g CO₂ saved",
      time: "12 min · 20 km/h (-10 min)",
      money: "S/ 7.80 saved vs. taxi",
      pts: "+14 pts · ♻ 8 PET",
      caption:
        "🛴 E-SCOOTER POV: Zipping effortlessly from the Metropolitano or Metro station to your destination at 20 km/h."
    }
  },
  car: {
    speedFactor: 0.85,
    laneOffset: 82,
    stepBob: 0.05,
    gateTags: ["💨 +638g CO₂", "🐢 TRÁFICO 11 km/h", "💸 -S/ 8.50 GASTO", "0 PUNTOS 😢"],
    es: {
      co2: "+638 g CO₂ emitidos",
      time: "22 min · 11 km/h (hora punta)",
      money: "S/ 8.50 gastados en gasolina",
      pts: "0 pts · Sin premio 😢",
      caption:
        "🚗 VISTA EN AUTO: Atrapado en el tráfico de hora punta gastando gasolina mientras ves pasar a las bicis y scooters libres por la izquierda."
    },
    en: {
      co2: "+638 g CO₂ emitted",
      time: "22 min · 11 km/h (gridlock)",
      money: "S/ 8.50 spent on gas",
      pts: "0 pts · No rewards 😢",
      caption:
        "🚗 CAR POV: Stuck in bumper-to-bumper rush-hour traffic burning gas while cyclists and scooters breeze past on your left."
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

  // Monedas 3D coleccionables de Puntos Verdes flotando sobre la ruta sostenible
  const ecoCoins = Array.from({ length: 8 }, (_, i) => ({
    z: i * 195 + 110,
    phase: i * 0.85
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

    // 1. CIELO SOLEADO Y ALEGRE + SOL + NUBES + SKYLINE
    const skyH = Math.max(10, horizonY - vy);
    const skyGrad = ctx.createLinearGradient(vx, vy, vx, horizonY);
    skyGrad.addColorStop(0, "#3b82f6");
    skyGrad.addColorStop(0.55, "#7dd3fc");
    skyGrad.addColorStop(1, "#ecfccb");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(vx, vy, vw, skyH);

    // Sol radiante de mañana limeña
    const sunX = vanishX - 95;
    const sunY = horizonY - 86;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 105);
    sunGrad.addColorStop(0, "rgba(255, 250, 205, 0.98)");
    sunGrad.addColorStop(0.38, "rgba(255, 209, 102, 0.45)");
    sunGrad.addColorStop(1, "rgba(255, 209, 102, 0)");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 105, 0, Math.PI * 2);
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

    // 3. ORDENAR OBJETOS 3D POR PROFUNDIDAD Z (Edificios, Árboles/Farolas, Autos, Ciclistas, Monedas y Pórticos)
    const sceneItems = [];
    for (const b of buildings) sceneItems.push({ type: "building", z: b.z, obj: b });
    for (const t of trees) sceneItems.push({ type: "tree", z: t.z, obj: t });
    for (const c of trafficCars) sceneItems.push({ type: "car", z: c.z, obj: c });
    for (const cy of fellowCyclists) sceneItems.push({ type: "cyclist", z: cy.z, obj: cy });
    for (const coin of ecoCoins) sceneItems.push({ type: "coin", z: coin.z, obj: coin });
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
      } else if (item.type === "coin") {
        const coin = item.obj;
        if (z > 980 || z < 36) continue;
        const coinWorldX = currentVRPov === "walk" ? -135 : -68;
        const floatY = 34 + Math.sin(stepPhase * 1.6 + coin.phase) * 7;
        const sx = projectX(coinWorldX, z);
        const sy = projectY(floatY, z);
        const syGround = projectY(0, z);
        const r = Math.max(4, 18 * scale);
        const spinX = Math.max(0.28, Math.abs(Math.cos(stepPhase * 1.2 + coin.phase)));

        // Sombra brillante bajo la moneda verde/dorada
        ctx.fillStyle = "rgba(140, 232, 104, 0.28)";
        ctx.beginPath();
        ctx.ellipse(sx, syGround, r * 0.75, Math.max(1.5, r * 0.22), 0, 0, Math.PI * 2);
        ctx.fill();

        // Moneda 3D giratoria (Dorado + Verde Lima EcoCommute)
        ctx.fillStyle = "#ffd166";
        ctx.strokeStyle = "#8ce868";
        ctx.lineWidth = Math.max(1.2, 2.6 * scale);
        ctx.beginPath();
        ctx.ellipse(sx, sy, r * spinX, r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Estrella / símbolo central de punto verde
        if (spinX > 0.45 && z < 650) {
          ctx.fillStyle = "#0b1a10";
          ctx.font = `800 ${Math.max(7, Math.round(12 * scale))}px "Plus Jakarta Sans", sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("★", sx, sy + 4 * scale);
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

    for (const coin of ecoCoins) {
      coin.z -= modeSpec.speedFactor * 5.2;
      if (coin.z < 30) {
        coin.z += 1560;
      }
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
