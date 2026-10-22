/**
 * EcoCommute Landing Page — i18n, Interactive Lima Telemetry Simulator & Modern Web UI Module
 * Soporta Español de Latinoamérica (es_419) e Inglés (en_US)
 */

const CORRIDORS = {
  miraflores: {
    km: 4.2,
    coords: "-12.1219, -77.0297",
    bikeMin: 14,
    carMin: 22,
    carPath: "M 38 88 C 120 92, 165 25, 250 42 C 310 52, 345 30, 382 34",
    ecoPath: "M 38 88 C 110 82, 155 58, 225 56 C 295 54, 330 38, 382 34",
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
    carPath: "M 38 92 C 95 40, 190 95, 275 38 C 325 22, 355 48, 382 28",
    ecoPath: "M 38 92 C 115 74, 185 65, 260 48 C 315 36, 350 32, 382 28",
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
    carPath: "M 38 42 C 110 22, 195 88, 280 72 C 330 64, 355 82, 382 68",
    ecoPath: "M 38 42 C 115 48, 195 54, 275 60 C 325 64, 355 66, 382 68",
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
    carPath: "M 38 94 C 130 98, 210 75, 290 60 C 340 48, 360 35, 382 26",
    ecoPath: "M 38 94 C 105 68, 180 42, 265 34 C 325 28, 355 26, 382 26",
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

const translations = {
  es_419: {
    // Meta & topbar
    "page.title": "EcoCommute — Movilidad Urbana Sostenible en Lima",
    "nav.skip": "Saltar al contenido principal",
    "topbar.badge": "PRODUCCIÓN · LIMA METROPOLITANA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 endpoints activos",
    "topbar.swagger": "Swagger OpenAPI",
    "nav.aria": "Navegación principal",
    "nav.why": "Manifiesto",
    "nav.simulator": "Simulador",
    "nav.features": "Arquitectura",
    "nav.screens": "Interfaz",
    "nav.team": "Equipo",
    "nav.contact": "Contacto",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero
    "hero.kicker": "Lima · ODS 11 · Meta 11.2 · Ingeniería de Sistemas UPC",
    "hero.title": "Antes de subirte al auto, ",
    "hero.title_em": "mira cuánto CO₂ podrías ahorrar hoy.",
    "hero.lead":
      "EcoCommute compara tu recorrido en bicicleta, a pie o en auto por Lima, calcula al gramo las emisiones que evitas con ruteo abierto OSRM y te explica la mejor alternativa con Google Gemini 1.5 Flash.",
    "hero.btn_simulator": "Simular un trayecto en Lima",
    "hero.btn_screens": "Explorar pantallas",
    "hero.btn_features": "Qué funciona hoy →",
    "hero.stat1_label": "Factor base auto",
    "hero.stat2_label": "API REST en Render",
    "hero.stat2_unit": "rutas activas",
    "hero.stat3_label": "Suite de integración",
    "hero.stat3_unit": "tests en verde",
    "hero.card_label": "TELEMETRÍA DE VIAJE · DEMO INTERACTIVA",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "En auto",
    "hero.car_val": "640 g de CO₂",
    "hero.bike": "En bicicleta / a pie",
    "hero.bike_val": "0 g de CO₂",
    "hero.points": "Tu saldo por viaje",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot":
      "Así se ve cada viaje registrado en la app. Los factores de emisión están configurados por la aplicación, no los pone el usuario.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.by_bike": "en bici",
    "sim.by_car_traffic": "en auto (tráfico hora punta)",
    "sim.adjust_distance": "Ajustar distancia del trayecto",
    "sim.monthly_projection": "Si repites 20 días al mes",
    "sim.gemini_tag": "GEMINI 1.5 FLASH · EXPLICACIÓN CONTEXTUAL",
    "sim.gemini_miraflores":
      "«Por la ciclovía de Av. Arequipa llegas en 14 min sin congestión vehicular, ahorras 638 g de CO₂ frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.»",

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
    "story.comp_old_tag": "Apps de mapas tradicionales",
    "story.comp_old_desc":
      "Solo muestran minutos estimados y congestión. El impacto de carbono es invisible y no existe incentivo por dejar el auto.",
    "story.comp_new_tag": "Enfoque EcoCommute",
    "story.comp_new_desc":
      "Contrasta gramos de CO₂ antes de salir, explica por qué te conviene la ruta con IA y premia la constancia en tu distrito.",
    "story.quote":
      "«Si el ahorro de CO₂ se ve igual de concreto que los minutos del viaje, la gente lo considera.»",
    "story.quote_author": "— El equipo EcoCommute, probando la app con usuarios en Lima",

    // Features
    "feat.title": "Qué hace hoy",
    "feat.intro":
      "Todo lo de abajo está implementado en el backend (Spring Boot) y cubierto por 28 tests automáticos que corren en cada Pull Request.",
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
    "page.title": "EcoCommute — Sustainable Urban Mobility in Lima",
    "nav.skip": "Skip to main content",
    "topbar.badge": "PRODUCTION · LIMA METROPOLITAN AREA",
    "topbar.spec": "Spring Boot 3.3 · OSRM · Gemini 1.5 Flash · 25 active endpoints",
    "topbar.swagger": "Swagger OpenAPI",
    "nav.aria": "Main navigation",
    "nav.why": "Manifesto",
    "nav.simulator": "Simulator",
    "nav.features": "Architecture",
    "nav.screens": "Interface",
    "nav.team": "Team",
    "nav.contact": "Contact",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero
    "hero.kicker": "Lima · SDG 11 · Target 11.2 · UPC Systems Engineering",
    "hero.title": "Before taking your car, ",
    "hero.title_em": "see how much CO₂ you could save today.",
    "hero.lead":
      "EcoCommute compares your journey by bicycle, walking, or driving across Lima, computes avoided carbon emissions down to the gram using open OSRM routing, and explains the smartest option with Google Gemini 1.5 Flash.",
    "hero.btn_simulator": "Simulate a Lima commute",
    "hero.btn_screens": "Explore interface",
    "hero.btn_features": "What works today →",
    "hero.stat1_label": "Car baseline factor",
    "hero.stat2_label": "Render REST API",
    "hero.stat2_unit": "active routes",
    "hero.stat3_label": "Integration suite",
    "hero.stat3_unit": "passing tests",
    "hero.card_label": "TRIP TELEMETRY · INTERACTIVE DEMO",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "By Car",
    "hero.car_val": "640 g of CO₂",
    "hero.bike": "By Bicycle / Walking",
    "hero.bike_val": "0 g of CO₂",
    "hero.points": "Your reward per trip",
    "hero.points_val": "+15 green points",
    "hero.card_foot":
      "This is how every logged commute looks in the app. Carbon emission factors are strictly configured by the system.",

    // Simulator
    "sim.route1": "Miraflores → San Isidro",
    "sim.route2": "UPC Monterrico → San Borja",
    "sim.route3": "Jesús María → Lince",
    "sim.route4": "Barranco → Miraflores",
    "sim.by_bike": "by bike",
    "sim.by_car_traffic": "by car (rush-hour traffic)",
    "sim.adjust_distance": "Adjust trip distance",
    "sim.monthly_projection": "Repeated 20 days a month",
    "sim.gemini_tag": "GEMINI 1.5 FLASH · CONTEXTUAL INSIGHT",
    "sim.gemini_miraflores":
      "“Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of CO₂ vs. driving (152 g/km) and earning Miraflores leaderboard points.”",

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
    "story.comp_old_tag": "Traditional map apps",
    "story.comp_old_desc":
      "Only display estimated minutes and traffic congestion. Carbon impact is invisible and there is zero incentive to leave the car.",
    "story.comp_new_tag": "The EcoCommute approach",
    "story.comp_new_desc":
      "Contrasts grams of CO₂ before you depart, explains why the route fits you with AI, and rewards consistency across your district.",
    "story.quote":
      "“If carbon savings are presented as clearly as travel minutes, citizens genuinely take them into account.”",
    "story.quote_author": "— The EcoCommute Team, testing the prototype with urban commuters in Lima",

    // Features
    "feat.title": "What works today",
    "feat.intro":
      "Everything below is fully implemented in the backend (Spring Boot) and covered by 28 automated tests running on every Pull Request.",
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

function renderSimulatorMetrics() {
  const isEn = currentLang === "en_US";
  const corridor = CORRIDORS[currentCorridor] || CORRIDORS.miraflores;
  const km = Number(currentKm);

  const carCo2Grams = Math.round(km * 152);
  const greenPoints = Math.max(5, Math.round(km * 3.57));
  const monthlyKg = ((carCo2Grams * 20) / 1000).toFixed(1);
  const bikeMin = Math.max(4, Math.round(km * 3.35));
  const carMin = Math.max(7, Math.round(km * 5.25));

  const routeTitleEl = document.getElementById("sim-route-title");
  const coordsEl = document.getElementById("sim-coords");
  const distOutEl = document.getElementById("sim-distance-output");
  const carCo2El = document.getElementById("sim-car-co2");
  const bikeCo2El = document.getElementById("sim-bike-co2");
  const pointsEl = document.getElementById("sim-points");
  const monthlyEl = document.getElementById("sim-monthly");
  const bikeTimeEl = document.getElementById("sim-bike-time");
  const carTimeEl = document.getElementById("sim-car-time");
  const geminiTextEl = document.getElementById("sim-gemini-text");
  const svgCarPath = document.getElementById("svg-car-path");
  const svgEcoPath = document.getElementById("svg-eco-path");

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
  if (pointsEl) {
    pointsEl.textContent = isEn ? `+${greenPoints} green points` : `+${greenPoints} puntos verdes`;
  }
  if (monthlyEl) {
    monthlyEl.textContent = isEn ? `-${monthlyKg} kg CO₂ / mo` : `-${monthlyKg} kg CO₂ / mes`;
  }
  if (bikeTimeEl) bikeTimeEl.textContent = `${bikeMin} min`;
  if (carTimeEl) carTimeEl.textContent = `${carMin} min`;
  if (geminiTextEl) geminiTextEl.textContent = localeData.gemini;
  if (svgCarPath) svgCarPath.setAttribute("d", corridor.carPath);
  if (svgEcoPath) svgEcoPath.setAttribute("d", corridor.ecoPath);
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

  renderSimulatorMetrics();
}

function setupLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextLang = currentLang === "es_419" ? "en_US" : "es_419";
      if (document.startViewTransition) {
        document.startViewTransition(() => applyTranslations(nextLang));
      } else {
        applyTranslations(nextLang);
      }
    });
  }
}

function setupSimulator() {
  const corridorBtns = document.querySelectorAll(".corridor-btn");
  const rangeInput = document.getElementById("sim-distance-range");

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
        document.startViewTransition(() => renderSimulatorMetrics());
      } else {
        renderSimulatorMetrics();
      }
    });
  });

  if (rangeInput) {
    rangeInput.addEventListener("input", (e) => {
      currentKm = parseFloat(e.target.value) || 4.2;
      renderSimulatorMetrics();
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

// Fallback para barra de progreso de lectura cuando animation-timeline: scroll() no está disponible
function setupScrollProgressFallback() {
  if (!window.CSS?.supports?.("animation-timeline", "scroll()")) {
    const progress = document.getElementById("scroll-progress");
    if (!progress) return;
    window.addEventListener(
      "scroll",
      () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const pct = Math.min(1, Math.max(0, window.scrollY / scrollable));
        progress.style.transform = `scaleX(${pct})`;
      },
      { passive: true }
    );
  }
}

// Fallback con IntersectionObserver para entry effects en navegadores sin view() timeline (scroll-entry-exit-effects)
function setupScrollEntryFallback() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  if (!window.CSS?.supports?.("(animation-timeline: view()) and (animation-range: entry)")) {
    const targets = document.querySelectorAll(".bento-card, .preview-card, .team-card, .ods-card");
    if (!("IntersectionObserver" in window) || !targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
      observer.observe(el);
    });
  }
}

// Verificación opcional en segundo plano del estado de la API en Render
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
        if (statusDot) statusDot.style.background = "#10b981";
      }
    })
    .catch(() => {
      // Silencioso en caso de cold-start de Render o bloqueo CORS local
    });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLanguageToggle();
  setupSimulator();
  setupShowcaseTabs();
  setupSpotlightCards();
  setupTermsModal();
  setupScrollProgressFallback();
  setupScrollEntryFallback();
  applyTranslations(currentLang);
  checkBackendHealth();
});
