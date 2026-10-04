/**
 * EcoCommute Landing Page i18n and Accessibility Module
 * Soporta Español de Latinoamérica (es_419) e Inglés (en_US)
 */

const translations = {
  es_419: {
    // Meta & topbar
    "page.title": "EcoCommute — Movilidad Sostenible en Lima",
    "nav.aria": "Navegación principal",
    "nav.why": "Por qué existe",
    "nav.features": "Qué hace",
    "nav.screens": "Pantallas",
    "nav.team": "Equipo",
    "nav.contact": "Contacto",
    "lang.toggle_label": "Cambiar idioma (Español / English)",

    // Hero
    "hero.kicker": "Lima · ODS 11 · Meta 11.2 · Proyecto UPC",
    "hero.title": "Antes de subirte al auto, ",
    "hero.title_em": "mira cuánto CO₂ podrías ahorrar.",
    "hero.lead": "EcoCommute compara tu recorrido en bici, a pie o en auto, te muestra el CO₂ que dejas de emitir y te da puntos verdes por elegir mejor. Todo queda guardado en un historial que sí se entiende de un vistazo.",
    "hero.btn_screens": "Ver las pantallas",
    "hero.btn_features": "Qué funciona hoy →",
    "hero.card_label": "Un viaje de la demo",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "En auto",
    "hero.car_val": "640 g de CO₂",
    "hero.bike": "En bicicleta",
    "hero.bike_val": "0 g de CO₂",
    "hero.points": "Tu saldo",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot": "Así se ve cada viaje registrado en la app. Los factores de emisión están configurados por la aplicación, no los pone el usuario.",

    // Solution / Story
    "story.title": "Por qué existe",
    "story.p1": "En Lima la decisión de cómo movernos se toma por rapidez, costo o costumbre. Nadie ve cuánto CO₂ produce el trayecto que acaba de elegir, y las herramientas de mapas simplemente comparten tiempo y tráfico: el impacto ambiental queda fuera de la pantalla.",
    "story.p2_pre": "Lo que falta no es otro mapa. Falta ver el costo ambiental de la decisión ",
    "story.p2_under": "antes",
    "story.p2_post": " de tomarla, y algo que te haga querer repetir la alternativa buena la semana siguiente. Eso es lo que intentamos construir.",
    "story.quote": "«Si el ahorro de CO₂ se ve igual de concreto que los minutos del viaje, la gente lo considera.»",
    "story.quote_author": "— El equipo EcoCommute, probando la app con usuarios en Lima",

    // Features
    "feat.title": "Qué hace hoy",
    "feat.intro": "Todo lo de abajo está implementado en el backend (Spring Boot) y cubierto por 28 tests automáticos que corren en cada Pull Request.",
    "feat.routes_title": "Rutas sostenibles y Google Gemini",
    "feat.routes_desc": "Introduces el origen y el destino y la app arma alternativas con OSRM: qué tan lejos es, cuánto tarda cada medio de transporte y qué te conviene según tu historial. La recomendación asistida por Inteligencia Artificial (Google Gemini 1.5 Flash) explica en lenguaje simple por qué sugiere esa ruta.",
    "feat.trips_title": "Viajes y cálculo de CO₂",
    "feat.trips_desc": "Registras el viaje y la app calcula el CO₂ ahorrado frente al auto (152 g CO₂/km ahorrados) y los puntos verdes que ganas.",
    "feat.dash_title": "Dashboard de impacto",
    "feat.dash_desc": "CO₂ acumulado, distancia recorrida, evolución semanal, árboles equivalentes salvados e historial de viajes en gráficos legibles.",
    "feat.rank_title": "Ranking distrital",
    "feat.rank_desc": "Compara tu impacto ecológico con ciclistas y peatones de tu distrito en Lima para fortalecer la comunidad activa.",
    "feat.badges_title": "Medallas y recompensas",
    "feat.badges_desc": "Las medallas se desbloquean automáticamente al alcanzar hitos ecológicos; los puntos se canjean por recompensas sostenibles.",
    "feat.challenges_title": "Retos semanales",
    "feat.challenges_desc": "Desafíos mensuales y metas sostenibles administradas dinámicamente desde el panel de gestión para sostener el hábito.",

    // Badges / ODS Callout
    "ods.title": "Alineados con el ODS 11 (Meta 11.2) e Inteligencia Artificial",
    "ods.desc": "EcoCommute responde de manera directa al Objetivo de Desarrollo Sostenible 11 de la ONU (Meta 11.2: Proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos). Además, optimizamos la toma de decisiones con Google Gemini 1.5 Flash para brindar explicaciones contextuales.",
    "ods.badge_ods": "ODS 11 · Meta 11.2: Movilidad Sostenible",
    "ods.badge_ai": "Optimización con IA · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Ruteo Open Source OSRM",

    // Screenshots
    "demo.title": "Cómo se ve",
    "demo.img1_alt": "Mockup interactivo de rutas sostenibles con mapas y alternativas en Lima",
    "demo.cap1": "Planificación de rutas sostenibles con ubicación, medios de transporte, alternativas y optimización asistida por Google Gemini.",
    "demo.img2_alt": "Mockup del dashboard de impacto ecológico con CO2 y estadísticas",
    "demo.cap2": "Dashboard de impacto con CO₂ ahorrado, viajes, árboles equivalentes, medallas e historial.",

    // Team
    "team.title": "Quiénes lo hacemos",
    "team.intro": "Seis estudiantes de Ingeniería de Sistemas de la UPC, NRC 8247, Ciclo 2026-2. Cada quien una parte del producto; todo el proceso en el repositorio.",
    "team.member1_role": "IA y recomendaciones de ruta",
    "team.member2_role": "Rutas, dashboard y medallas",
    "team.member3_role": "Entidades, viajes y cálculo de CO₂",
    "team.member4_role": "Puntos verdes y ranking",
    "team.member5_role": "Seguridad, JWT y registro",
    "team.member6_role": "Documentación, evidencias y landing",

    // Contact
    "contact.title": "Pruébalo y cuéntanos",
    "contact.intro": "Si algo no te convence o tienes una idea para Lima, escríbenos: leemos todo.",
    "contact.github": "Código en GitHub",
    "contact.linkedin": "EcoCommute en LinkedIn",

    // Footer & Legal
    "footer.academic": "EcoCommute · Trabajo Parcial de Aplicaciones Web (UPC 2026-2)",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
    "footer.view_terms_file": "Ver documento completo (terms.html)",

    // Modal
    "modal.title": "Términos de Servicio y Privacidad — EcoCommute",
    "modal.close": "Cerrar ventana modal",
    "modal.intro": "Compromiso ético, legal y ambiental del proyecto EcoCommute:",
    "modal.p1": "<strong>Protección de Datos:</strong> Cumplimos estrictamente la Ley N° 29733 (Perú). Tus coordenadas se procesan de forma efímera para calcular rutas y ahorro de CO₂; no rastreamos en segundo plano ni comercializamos datos.",
    "modal.p2": "<strong>Ruteo Abierto e IA:</strong> Empleamos OSRM sobre OpenStreetMap y Google Gemini 1.5 Flash para recomendaciones transparentes y sin sesgo comercial.",
    "modal.p3": "<strong>Ética Profesional:</strong> El desarrollo se rige bajo los Códigos de Ética de Software ACM/IEEE y el Código Deontológico del Colegio de Ingenieros del Perú (CIP), priorizando el interés público y la movilidad sostenible.",
    "modal.full_link": "Abrir página completa de Términos y Condiciones →"
  },

  en_US: {
    // Meta & topbar
    "page.title": "EcoCommute — Sustainable Urban Mobility in Lima",
    "nav.aria": "Main navigation",
    "nav.why": "Why it exists",
    "nav.features": "What it does",
    "nav.screens": "Screenshots",
    "nav.team": "Team",
    "nav.contact": "Contact",
    "lang.toggle_label": "Switch language (Español / English)",

    // Hero
    "hero.kicker": "Lima · SDG 11 · Target 11.2 · UPC University Project",
    "hero.title": "Before taking your car, ",
    "hero.title_em": "see how much CO₂ you could save.",
    "hero.lead": "EcoCommute compares your journey by bike, walking or driving, calculates the CO₂ emissions you avoid, and rewards you with green points for making better choices. Clear history at a glance.",
    "hero.btn_screens": "View Screenshots",
    "hero.btn_features": "What works today →",
    "hero.card_label": "Demo trip calculation",
    "hero.card_route": "Miraflores → San Isidro, 4.2 km",
    "hero.car": "By Car",
    "hero.car_val": "640 g of CO₂",
    "hero.bike": "By Bicycle",
    "hero.bike_val": "0 g of CO₂",
    "hero.points": "Your reward",
    "hero.points_val": "+15 green points",
    "hero.card_foot": "This is how every logged commute looks in the app. Carbon emission factors are configured strictly by the system.",

    // Solution / Story
    "story.title": "Why it exists",
    "story.p1": "In Lima, travel choices are made solely by speed, cost, or habit. Nobody sees the carbon footprint of their route, and map engines only display traffic times: environmental impact is left invisible.",
    "story.p2_pre": "We do not need another generic map. We need to visualize the environmental cost of our choice ",
    "story.p2_under": "before",
    "story.p2_post": " making it, and provide incentives to repeat sustainable habits the next week. That is what we are building.",
    "story.quote": "“If carbon savings are presented as clearly as travel minutes, citizens genuinely take them into account.”",
    "story.quote_author": "— The EcoCommute Team, testing the prototype with urban commuters in Lima",

    // Features
    "feat.title": "What works today",
    "feat.intro": "Everything below is fully implemented in the backend (Spring Boot) and covered by 28 automated tests running on every Pull Request.",
    "feat.routes_title": "Sustainable Routes & Google Gemini",
    "feat.routes_desc": "Enter origin and destination, and the app generates alternatives via OSRM: distance, travel time by mode, and tailored insights. AI recommendations powered by Google Gemini 1.5 Flash explain clearly why a route is suggested.",
    "feat.trips_title": "Trips & CO₂ Accounting",
    "feat.trips_desc": "Log your active commute and the system computes the exact CO₂ avoided compared to a passenger car (152 g CO₂/km avoided) along with earned points.",
    "feat.dash_title": "Impact Dashboard",
    "feat.dash_desc": "Cumulative CO₂ saved, total distance, weekly trends, equivalent trees preserved, and complete trip logs in clear visual cards.",
    "feat.rank_title": "District Leaderboard",
    "feat.rank_desc": "Compare your positive impact with fellow cyclists and pedestrians across Lima districts to build healthy community habits.",
    "feat.badges_title": "Badges & Rewards",
    "feat.badges_desc": "Badges unlock automatically upon achieving milestones; green points can be redeemed in the sustainable reward catalog.",
    "feat.challenges_title": "Weekly Challenges",
    "feat.challenges_desc": "Time-bounded monthly goals and eco-commute challenges managed dynamically from the administration portal.",

    // Badges / ODS Callout
    "ods.title": "Committed to SDG 11 (Target 11.2) & Artificial Intelligence",
    "ods.desc": "EcoCommute directly contributes to the United Nations Sustainable Development Goal 11 (Target 11.2: Providing access to safe, affordable, accessible, and sustainable transport systems for all). Furthermore, route evaluation is enhanced with Google Gemini 1.5 Flash for transparent, contextual advice.",
    "ods.badge_ods": "SDG 11 · Target 11.2: Sustainable Urban Mobility",
    "ods.badge_ai": "AI-Powered Optimization · Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Open Source Routing Engine (OSRM)",

    // Screenshots
    "demo.title": "Application Preview",
    "demo.img1_alt": "Interactive mockup of sustainable route options across Lima map",
    "demo.cap1": "Sustainable route planner showing live locations, transport modes, eco-alternatives, and Google Gemini AI insights.",
    "demo.img2_alt": "Impact dashboard mockup with CO2 metrics and user statistics",
    "demo.cap2": "Impact dashboard displaying CO₂ saved, trips logged, tree equivalents, badges, and history.",

    // Team
    "team.title": "Development Team",
    "team.intro": "Six Software Engineering students at UPC, NRC 8247, 2026-2 Semester. Full development tracked publicly in the GitHub repository.",
    "team.member1_role": "AI & Route Recommendations",
    "team.member2_role": "Routes, Dashboard & Badges",
    "team.member3_role": "Entities, Commute Logs & CO₂ Math",
    "team.member4_role": "Green Points & Leaderboard",
    "team.member5_role": "Security, JWT & Authentication",
    "team.member6_role": "Documentation, Evidence & Landing",

    // Contact
    "contact.title": "Try it and Share Feedback",
    "contact.intro": "If you have an idea to improve mobility in Lima, reach out: we read every message.",
    "contact.github": "Code on GitHub",
    "contact.linkedin": "EcoCommute on LinkedIn",

    // Footer & Legal
    "footer.academic": "EcoCommute · Web Application Architecture Midterm Project (UPC 2026-2)",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.view_terms_file": "View full document (terms.html)",

    // Modal
    "modal.title": "Terms of Service & Privacy — EcoCommute",
    "modal.close": "Close modal window",
    "modal.intro": "Ethical, legal, and environmental commitments of EcoCommute:",
    "modal.p1": "<strong>Data Privacy:</strong> We strictly follow Peru's Personal Data Protection Law (Law N° 29733) and GDPR principles. Geolocation coordinates are processed ephemerally; we never perform background tracking nor monetize personal telemetry.",
    "modal.p2": "<strong>Open Routing & AI:</strong> We rely on OSRM over OpenStreetMap and Google Gemini 1.5 Flash for unbiased, transparent routing recommendations.",
    "modal.p3": "<strong>Professional Ethics:</strong> Development is guided by the ACM/IEEE Software Engineering Code of Ethics and the Deontological Code of the Colegio de Ingenieros del Perú (CIP), prioritizing public well-being and climate action.",
    "modal.full_link": "Open full Terms & Conditions page →"
  }
};

let currentLang = localStorage.getItem("ecocommute_lang") || "es_419";

function applyTranslations(lang) {
  const dict = translations[lang] || translations["es_419"];
  currentLang = lang;
  localStorage.setItem("ecocommute_lang", lang);

  document.documentElement.lang = lang === "en_US" ? "en" : "es";

  // Elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Elements with data-i18n-aria
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  // Elements with data-i18n-alt
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] !== undefined) {
      el.setAttribute("alt", dict[key]);
    }
  });

  // Update toggle button text and aria-pressed
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
}

function setupLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextLang = currentLang === "es_419" ? "en_US" : "es_419";
      applyTranslations(nextLang);
    });
  }
}

// Modal handling
function setupTermsModal() {
  const modal = document.getElementById("terms-modal");
  const openLinks = document.querySelectorAll(".open-terms-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = document.getElementById("modal-backdrop");

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openLinks.forEach((link) => {
    link.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLanguageToggle();
  setupTermsModal();
  applyTranslations(currentLang);
});
