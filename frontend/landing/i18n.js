/**
 * EcoCommute Lima — i18n & Interactivity
 * Comparador de movilidad amigable, simple y humano
 */

"use strict";

const CORRIDORS = {
  miraflores: {
    km: 4.2,
    originTag: "Óvalo Miraflores",
    destTag: "Centro Financiero",
    ecoLatLngs: [
      [-12.1218, -77.0298],
      [-12.1150, -77.0315],
      [-12.1065, -77.0332],
      [-12.0990, -77.0345],
      [-12.0915, -77.0338],
      [-12.0860, -77.0310]
    ],
    carLatLngs: [
      [-12.1218, -77.0298],
      [-12.1180, -77.0255],
      [-12.1070, -77.0240],
      [-12.0970, -77.0252],
      [-12.0860, -77.0310]
    ],
    es: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "Recorrido directo por la berma central de Av. Arequipa desde el Óvalo de Miraflores hasta el centro financiero de San Isidro."
    },
    en: {
      routeTitle: "Miraflores → San Isidro",
      gemini:
        "Direct central bike lane along Av. Arequipa from Miraflores Oval to the San Isidro financial district."
    }
  },
  upc: {
    km: 5.6,
    originTag: "UPC Monterrico",
    destTag: "Av. Aviación",
    ecoLatLngs: [
      [-12.1042, -76.9635],
      [-12.1025, -76.9740],
      [-12.1010, -76.9850],
      [-12.0995, -76.9950],
      [-12.0980, -77.0015]
    ],
    carLatLngs: [
      [-12.1042, -76.9635],
      [-12.1100, -76.9750],
      [-12.1075, -76.9890],
      [-12.0980, -77.0015]
    ],
    es: {
      routeTitle: "Monterrico → San Borja",
      gemini:
        "Conexión universitaria por Av. Primavera y ciclovía de San Borja Norte, evitando los atascos en el puente Primavera."
    },
    en: {
      routeTitle: "Monterrico → San Borja",
      gemini:
        "University commute via Av. Primavera and San Borja bike lane, avoiding traffic gridlocks at the Primavera overpass."
    }
  },
  jesusmaria: {
    km: 3.1,
    originTag: "Campo de Marte",
    destTag: "Parque Castilla",
    ecoLatLngs: [
      [-12.0720, -77.0420],
      [-12.0780, -77.0405],
      [-12.0855, -77.0385],
      [-12.0910, -77.0370]
    ],
    carLatLngs: [
      [-12.0720, -77.0420],
      [-12.0760, -77.0340],
      [-12.0860, -77.0320],
      [-12.0910, -77.0370]
    ],
    es: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "Ruta verde arbolada entre Campo de Marte y Parque Castilla conectando con ciclovías barriales de Jesús María y Lince."
    },
    en: {
      routeTitle: "Jesús María → Lince",
      gemini:
        "Tree-lined green path between Campo de Marte and Castilla Park connecting Jesús María and Lince residential lanes."
    }
  },
  barranco: {
    km: 3.8,
    originTag: "Plaza Barranco",
    destTag: "Malecón Miraflores",
    ecoLatLngs: [
      [-12.1492, -77.0218],
      [-12.1445, -77.0250],
      [-12.1380, -77.0285],
      [-12.1310, -77.0320],
      [-12.1268, -77.0360]
    ],
    carLatLngs: [
      [-12.1492, -77.0218],
      [-12.1420, -77.0205],
      [-12.1335, -77.0228],
      [-12.1258, -77.0285],
      [-12.1268, -77.0360]
    ],
    es: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "Ciclovía panorámica frente al mar desde la Plaza de Barranco por el Malecón Paul Harris y Cisneros hasta Miraflores."
    },
    en: {
      routeTitle: "Barranco → Miraflores",
      gemini:
        "Scenic oceanfront bike lane from Plaza de Barranco along Malecón Paul Harris and Cisneros to Miraflores."
    }
  }
};

const VEHICLE_DATA = {
  bike: {
    img: "./media/veh-bike.jpg",
    alt: "Bicicleta urbana en Lima",
    co2Pill: "0 g de humo",
    badgeIcon: "⭐",
    isDanger: false,
    timeBarWidth: "40%",
    timeBarVal: "14 min",
    es: {
      badgeText: "¡La opción más rápida en hora punta!",
      kicker: "Recomendación para moverte hoy",
      title: "Bicicleta urbana",
      desc: "Llegas directo por la ciclovía sin quedarte atascado en el tráfico, ahorras en combustible y ganas premios mientras pedaleas.",
      barLabel: "🚲 En bicicleta",
      benefitTime: "14 min (fluido)",
      benefitTimeSub: "Sin semáforos atorados",
      benefitCost: "S/ 0.00 (Gratis)",
      benefitCostSub: "Ahorras S/ 17 al día",
      benefitAir: "Cero humo",
      benefitAirSub: "100% aire limpio",
      benefitReward: "+15 puntos",
      benefitRewardSub: "Para canjear en cafés",
      tip: "<strong>Dato útil:</strong> Las ciclovías de Av. Arequipa y Salaverry te permiten conectar 4 distritos sin detenerte en ningún embotellamiento vehicular."
    },
    en: {
      badgeText: "The fastest option during rush hour!",
      kicker: "Best recommendation for today",
      title: "Urban bicycle",
      desc: "Ride straight through dedicated bike lanes without getting stuck in traffic, save on fuel, and earn rewards as you pedal.",
      barLabel: "🚲 By bicycle",
      benefitTime: "14 min (smooth)",
      benefitTimeSub: "No traffic gridlocks",
      benefitCost: "S/ 0.00 (Free)",
      benefitCostSub: "Save S/ 17 per day",
      benefitAir: "Zero smoke",
      benefitAirSub: "100% clean air",
      benefitReward: "+15 points",
      benefitRewardSub: "Redeem for coffee & perks",
      tip: "<strong>Useful tip:</strong> Bike lanes along Av. Arequipa and Salaverry connect 4 districts without stopping in car traffic jams."
    }
  },
  scooter: {
    img: "./media/veh-scooter.jpg",
    alt: "Scooter eléctrico urbano",
    co2Pill: "0 g de humo",
    badgeIcon: "⚡",
    isDanger: false,
    timeBarWidth: "46%",
    timeBarVal: "16 min",
    es: {
      badgeText: "Ágil y sin esfuerzo físico",
      kicker: "Ideal para tramos medios",
      title: "Scooter eléctrico",
      desc: "Avanza ágil por ciclovías y vías secundarias. Es ligero, fácil de plegar y se complementa perfectamente con el transporte masivo.",
      barLabel: "⚡ En scooter eléctrico",
      benefitTime: "16 min (ágil)",
      benefitTimeSub: "Evita los cuellos de botella",
      benefitCost: "S/ 0.20 de carga",
      benefitCostSub: "Mucho más barato que taxi",
      benefitAir: "Cero humo",
      benefitAirSub: "Motor 100% eléctrico",
      benefitReward: "+14 puntos",
      benefitRewardSub: "Suma en cada viaje",
      tip: "<strong>Dato útil:</strong> Es la alternativa perfecta para combinar con la Línea 1 del Metro o Metropolitano en el tramo de última milla."
    },
    en: {
      badgeText: "Agile and effortless ride",
      kicker: "Ideal for medium commutes",
      title: "Electric scooter",
      desc: "Glide easily through bike paths and calm streets. Lightweight, foldable, and the ideal partner for rapid transit.",
      barLabel: "⚡ By e-scooter",
      benefitTime: "16 min (agile)",
      benefitTimeSub: "Bypasses traffic bottlenecks",
      benefitCost: "S/ 0.20 charge",
      benefitCostSub: "Way cheaper than taxis",
      benefitAir: "Zero smoke",
      benefitAirSub: "100% electric motor",
      benefitReward: "+14 points",
      benefitRewardSub: "Earn on every ride",
      tip: "<strong>Useful tip:</strong> The perfect companion for Metro Line 1 or Metropolitano for your last-mile commute."
    }
  },
  transit: {
    img: "./media/veh-transit.jpg",
    alt: "Bus y Tren eléctrico de Lima",
    co2Pill: "-75% de humo",
    badgeIcon: "🚌",
    isDanger: false,
    timeBarWidth: "58%",
    timeBarVal: "20 min",
    es: {
      badgeText: "Transporte masivo con vía segregada",
      kicker: "Para distancias mayores a 6 km",
      title: "Bus / Tren eléctrico",
      desc: "El Metropolitano y el Metro cuentan con corredores exclusivos que cruzan Lima de norte a sur sin quedar atrapados en semáforos.",
      barLabel: "🚌 En Bus / Tren eléctrico",
      benefitTime: "20 min (vía exclusiva)",
      benefitTimeSub: "Sin semáforos en corredor",
      benefitCost: "S/ 3.20 de pasaje",
      benefitCostSub: "Sin peajes ni estacionamiento",
      benefitAir: "-75% emisiones",
      benefitAirSub: "1 bus reemplaza 35 autos",
      benefitReward: "+10 puntos",
      benefitRewardSub: "Por viaje sustentable",
      tip: "<strong>Dato útil:</strong> Un bus de alta capacidad transporta hasta 80 pasajeros, liberando casi 2 cuadras de autos particulares en la vía."
    },
    en: {
      badgeText: "Mass transit with dedicated lanes",
      kicker: "Best for trips over 6 km",
      title: "Bus / Electric train",
      desc: "The Metropolitano and Metro use dedicated lanes across Lima from north to south, avoiding local traffic jams.",
      barLabel: "🚌 By Bus / Electric train",
      benefitTime: "20 min (dedicated lane)",
      benefitTimeSub: "Bypasses road traffic",
      benefitCost: "S/ 3.20 fare",
      benefitCostSub: "No tolls or parking fees",
      benefitAir: "-75% emissions",
      benefitAirSub: "1 bus replaces 35 cars",
      benefitReward: "+10 points",
      benefitRewardSub: "For sustainable transit",
      tip: "<strong>Useful tip:</strong> A high-capacity bus carries up to 80 riders, clearing nearly two full blocks of private cars off the avenue."
    }
  },
  car: {
    img: "./media/veh-car.jpg",
    alt: "Auto particular en tráfico de Lima",
    co2Pill: "152 g de humo / km",
    badgeIcon: "⚠️",
    isDanger: true,
    timeBarWidth: "100%",
    timeBarVal: "35 min",
    es: {
      badgeText: "La alternativa más lenta en hora punta",
      kicker: "Congestión vehicular",
      title: "Auto particular en hora punta",
      desc: "En avenidas principales como Javier Prado o Vía Expresa, la velocidad media cae a solo 12 km/h con alto gasto de combustible y estrés.",
      barLabel: "🚗 En auto con tráfico",
      benefitTime: "35+ min (congestión)",
      benefitTimeSub: "Atrapado en embotellamientos",
      benefitCost: "S/ 15 a S/ 25 por viaje",
      benefitCostSub: "Gasolina, peaje y cochera",
      benefitAir: "152 g humo / km",
      benefitAirSub: "El medio más contaminante",
      benefitReward: "0 puntos",
      benefitRewardSub: "Estrés y bocinazos",
      tip: "<strong>Dato útil:</strong> En Lima, el 85% de los autos particulares circulan con solo 1 persona a bordo, siendo la causa principal del tráfico."
    },
    en: {
      badgeText: "Slowest and most expensive in rush hour",
      kicker: "Traffic congestion",
      title: "Private car in rush hour",
      desc: "On avenues like Javier Prado, speed drops to just 12 km/h with heavy fuel burn, parking costs, and high commute stress.",
      barLabel: "🚗 By car in traffic",
      benefitTime: "35+ min (gridlock)",
      benefitTimeSub: "Stuck in traffic jams",
      benefitCost: "S/ 15 to S/ 25 per trip",
      benefitCostSub: "Fuel, parking & tolls",
      benefitAir: "152 g smoke / km",
      benefitAirSub: "Most polluting commute",
      benefitReward: "0 points",
      benefitRewardSub: "Traffic stress & honking",
      tip: "<strong>Useful tip:</strong> In Lima, 85% of private cars carry only 1 passenger, making them the primary cause of urban gridlock."
    }
  }
};

const translations = {
  es_419: {
    "nav.skip": "Saltar al contenido",
    "nav.routes": "Rutas en Lima",
    "nav.vehicles": "Comparativa de Transporte",
    "nav.impact": "Calculadora de Ahorro",
    "nav.terms": "Términos y Privacidad",

    "hero.title": "Deja el tráfico atrás. <em>Muévete libre</em> por Lima.",
    "hero.lead":
      "Planifica tu ruta en bicicleta, scooter o a pie, compara tiempos frente al tráfico vehicular y transforma cada kilómetro sin humo en ahorro económico, salud y recompensas.",
    "hero.btn_map": "Probar rutas en el mapa",
    "hero.btn_compare": "Comparar vehículos",

    "hero.stat_car_label": "En auto promedio",
    "hero.stat_car_sub": "CO₂ por kilómetro",
    "hero.stat_eco_label": "En bici o a pie",
    "hero.stat_eco_sub": "Emisiones directas",
    "hero.stat_saved_label": "CO₂ evitado hoy",
    "hero.stat_saved_sub": "En rutas activas",

    "map.eyebrow": "Mapa interactivo · Rutas reales en Lima",
    "map.by_bike": "en ciclovía",
    "map.by_car": "en tráfico",
    "map.stat_dist": "Distancia real",
    "map.stat_co2": "CO₂ evitado",
    "map.stat_points": "Ahorro y puntos",
    "sim.btn_recycle_trip": "Registrar ruta",

    "veh.eyebrow": "Comparativa de movilidad",
    "veh.title": "¿Cómo te conviene moverte por Lima?",
    "veh.subtitle":
      "Elige un medio de transporte y descubre cuánto tiempo, dinero y humo ahorras en tus recorridos cotidianos.",
    "veh.tab_bike": "Bicicleta",
    "veh.tab_bike_sub": "Más rápida · S/ 0 gasto",
    "veh.tab_scooter": "Scooter",
    "veh.tab_scooter_sub": "Ágil · Sin esfuerzo",
    "veh.tab_transit": "Bus / Metro",
    "veh.tab_transit_sub": "Para tramos largos",
    "veh.tab_car": "Auto en tráfico",
    "veh.tab_car_sub": "Lento en hora punta",
    "veh.comp_title": "Comparación de tiempo en hora punta (trayecto típico de 5 km)",
    "veh.bar_car_label": "🚗 En auto con tráfico",
    "veh.benefit_time": "Tiempo de viaje",
    "veh.benefit_cost": "Gasto del viaje",
    "veh.benefit_air": "Aire para Lima",
    "veh.benefit_reward": "Tu recompensa",

    "calc.eyebrow": "Calculadora de impacto personal",
    "calc.title": "Descubre cuánto ahorras en un año.",
    "calc.subtitle":
      "Ajusta tus viajes por semana y la distancia de tu ruta para proyectar tu impacto anual en Lima.",
    "calc.preset_student": "Universitario (4 viajes/sem)",
    "calc.preset_office": "Oficina (6 viajes/sem)",
    "calc.preset_cyclist": "Ciclista diario (10 viajes/sem)",
    "calc.label_trips": "Viajes sin auto por semana",
    "calc.label_dist": "Distancia promedio por viaje",
    "calc.avoided_label": "Emisiones evitadas al año",
    "calc.fuel_label": "Combustible ahorrado",
    "calc.card_pet_label": "Plástico equivalente",
    "calc.card_pet_desc": "Botellas PET de 500 ml cuyo impacto en carbono equivale al humo que evitaste emitir.",
    "calc.card_trees_label": "Oxígeno urbano (absorción de CO₂)",
    "calc.card_trees_desc": "Árboles urbanos adultos absorbiendo CO₂ durante un año (~21 kg CO₂/árbol al año).",
    "calc.card_time_label": "Tiempo libre de tráfico",
    "calc.card_time_desc": "Horas al año que recuperas fuera de los embotellamientos en hora punta.",
    "calc.card_reward_label": "Programa de recompensas",
    "calc.card_reward_desc": "Puntos acumulados para canjear en cafés locales, talleres de bici y comercios aliados."
  },
  en_US: {
    "nav.skip": "Skip to content",
    "nav.routes": "Lima Routes",
    "nav.vehicles": "Mobility Comparison",
    "nav.impact": "Savings Calculator",
    "nav.terms": "Terms & Privacy",

    "hero.title": "Leave traffic behind. <em>Move freely</em> through Lima.",
    "hero.lead":
      "Plan your route by bicycle, scooter, or walking, compare travel times against traffic gridlocks, and turn every emission-free kilometer into money saved, health, and local rewards.",
    "hero.btn_map": "Explore routes on map",
    "hero.btn_compare": "Compare vehicles",

    "hero.stat_car_label": "Average car",
    "hero.stat_car_sub": "CO₂ per kilometer",
    "hero.stat_eco_label": "By bike or foot",
    "hero.stat_eco_sub": "Direct emissions",
    "hero.stat_saved_label": "CO₂ avoided today",
    "hero.stat_saved_sub": "On active routes",

    "map.eyebrow": "Interactive map · Real routes in Lima",
    "map.by_bike": "by bike lane",
    "map.by_car": "in car traffic",
    "map.stat_dist": "Real distance",
    "map.stat_co2": "CO₂ avoided",
    "map.stat_points": "Savings & points",
    "sim.btn_recycle_trip": "Log route",

    "veh.eyebrow": "Urban mobility comparison",
    "veh.title": "What is the best way to move through Lima?",
    "veh.subtitle":
      "Choose a mode of transport and see how much time, money, and emissions you save on your daily commute.",
    "veh.tab_bike": "Bicycle",
    "veh.tab_bike_sub": "Fastest · S/ 0 cost",
    "veh.tab_scooter": "Scooter",
    "veh.tab_scooter_sub": "Agile · Effortless",
    "veh.tab_transit": "Bus / Metro",
    "veh.tab_transit_sub": "For long trips",
    "veh.tab_car": "Car in traffic",
    "veh.tab_car_sub": "Slow in rush hour",
    "veh.comp_title": "Rush-hour travel time comparison (typical 5 km commute)",
    "veh.bar_car_label": "🚗 By car in traffic",
    "veh.benefit_time": "Travel time",
    "veh.benefit_cost": "Trip cost",
    "veh.benefit_air": "Clean air impact",
    "veh.benefit_reward": "Your reward",

    "calc.eyebrow": "Personal impact calculator",
    "calc.title": "Discover how much you save in a year.",
    "calc.subtitle":
      "Adjust your weekly car-free trips and commute distance to project your annual savings in Lima.",
    "calc.preset_student": "Student (4 trips/wk)",
    "calc.preset_office": "Office worker (6 trips/wk)",
    "calc.preset_cyclist": "Daily cyclist (10 trips/wk)",
    "calc.label_trips": "Car-free trips per week",
    "calc.label_dist": "Average distance per trip",
    "calc.avoided_label": "Annual avoided emissions",
    "calc.fuel_label": "Fuel saved",
    "calc.card_pet_label": "Plastic bottle equivalent",
    "calc.card_pet_desc": "500 ml PET bottles whose carbon footprint matches the emissions you avoided.",
    "calc.card_trees_label": "Urban oxygen (CO₂ absorption)",
    "calc.card_trees_desc": "Adult urban trees absorbing CO₂ for a full year (~21 kg CO₂/tree annually).",
    "calc.card_time_label": "Traffic-free hours saved",
    "calc.card_time_desc": "Hours each year you reclaim away from rush hour traffic jams.",
    "calc.card_reward_label": "Rewards program",
    "calc.card_reward_desc": "Points accumulated to redeem at local cafés, bike repair shops, and allied stores."
  }
};

let currentLang = localStorage.getItem("ecocommute_lang") || "es_419";
let currentCorridor = "miraflores";
let currentKm = CORRIDORS.miraflores.km;
let sessionRecycledGrams = 1920;
let sessionTripsCount = 3;
let currentVehicleKey = "bike";
let alchemyTrips = 6;
let alchemyKm = 4.2;

let limaMapInstance = null;
let limaRouteLayerGroup = null;
let limaTileLayer = null;

function updateLimaMapTiles() {
  if (!limaMapInstance || typeof window.L === "undefined") return;
  const L = window.L;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

  if (limaTileLayer) {
    limaMapInstance.removeLayer(limaTileLayer);
  }

  limaTileLayer = L.tileLayer(tileUrl, {
    attribution,
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(limaMapInstance);
}

function renderLimaMapRoute() {
  if (!limaMapInstance || !limaRouteLayerGroup || typeof window.L === "undefined") return;
  const L = window.L;
  const corridor = CORRIDORS[currentCorridor] || CORRIDORS.miraflores;
  limaRouteLayerGroup.clearLayers();

  // Ruta en auto con congestión (línea punteada naranja)
  if (corridor.carLatLngs) {
    L.polyline(corridor.carLatLngs, {
      color: "#EA580C",
      weight: 3.5,
      opacity: 0.78,
      dashArray: "6, 8",
      lineCap: "round"
    }).addTo(limaRouteLayerGroup);
  }

  // Halo suave + Ruta directa por ciclovía (línea verde sólida)
  if (corridor.ecoLatLngs) {
    L.polyline(corridor.ecoLatLngs, {
      color: "#22C55E",
      weight: 10,
      opacity: 0.22,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(limaRouteLayerGroup);

    const ecoLine = L.polyline(corridor.ecoLatLngs, {
      color: "#15803D",
      weight: 4.5,
      opacity: 0.98,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(limaRouteLayerGroup);

    const startPt = corridor.ecoLatLngs[0];
    const endPt = corridor.ecoLatLngs[corridor.ecoLatLngs.length - 1];

    // Marcadores circulares sobre inicio y fin
    L.circleMarker(startPt, {
      radius: 7,
      fillColor: "#15803D",
      color: "#FFFFFF",
      weight: 2.5,
      fillOpacity: 1
    }).addTo(limaRouteLayerGroup);

    L.circleMarker(endPt, {
      radius: 7,
      fillColor: "#111613",
      color: "#FFFFFF",
      weight: 2.5,
      fillOpacity: 1
    }).addTo(limaRouteLayerGroup);

    // Badges flotantes de origen y destino
    const startIcon = L.divIcon({
      className: "lima-pin-wrap",
      html: `<div class="lima-pin-badge origin"><span class="lima-pin-dot"></span>${corridor.originTag}</div>`,
      iconSize: [0, 0]
    });

    const endIcon = L.divIcon({
      className: "lima-pin-wrap",
      html: `<div class="lima-pin-badge dest"><span class="lima-pin-dot"></span>${corridor.destTag}</div>`,
      iconSize: [0, 0]
    });

    L.marker(startPt, { icon: startIcon, interactive: false }).addTo(limaRouteLayerGroup);
    L.marker(endPt, { icon: endIcon, interactive: false }).addTo(limaRouteLayerGroup);

    limaMapInstance.fitBounds(ecoLine.getBounds(), {
      paddingTopLeft: [42, 46],
      paddingBottomRight: [42, 54],
      maxZoom: 15,
      animate: true,
      duration: 0.55
    });
  }
}

function setupLimaHeroMap() {
  const mapEl = document.getElementById("lima-hero-map");
  if (!mapEl || typeof window.L === "undefined") return;
  const L = window.L;

  limaMapInstance = L.map(mapEl, {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true
  }).setView([-12.105, -77.03], 13);

  limaRouteLayerGroup = L.layerGroup().addTo(limaMapInstance);
  updateLimaMapTiles();
  renderLimaMapRoute();
}

function updateSessionFloraBanner() {
  const counterEl = document.getElementById("session-recycled-co2");
  if (counterEl) {
    counterEl.textContent = `${sessionRecycledGrams.toLocaleString()} g`;
  }
}

function renderSimulatorMetrics() {
  const isEn = currentLang === "en_US";
  const corridor = CORRIDORS[currentCorridor] || CORRIDORS.miraflores;
  const km = Number(currentKm);
  const carCo2Grams = Math.round(km * 152);
  const greenPoints = Math.max(5, Math.round(km * 3.57));
  const bikeMin = Math.max(4, Math.round(km * 3.35));
  const carMin = Math.max(6, Math.round(km * 5.25));

  const routeTitleEl = document.getElementById("sim-route-title");
  const coordsEl = document.getElementById("sim-coords");
  const distEl = document.getElementById("sim-distance-output");
  const carCo2El = document.getElementById("sim-car-co2");
  const pointsEl = document.getElementById("sim-points");
  const bikeTimeEl = document.getElementById("sim-bike-time");
  const carTimeEl = document.getElementById("sim-car-time");
  const geminiTextEl = document.getElementById("sim-gemini-text");

  if (routeTitleEl) {
    routeTitleEl.textContent = isEn ? corridor.en.routeTitle : corridor.es.routeTitle;
  }
  if (coordsEl) {
    coordsEl.textContent = `${km.toFixed(1)} km · ${corridor.originTag} ↔ ${corridor.destTag}`;
  }
  if (distEl) distEl.textContent = `${km.toFixed(1)} km`;
  if (carCo2El) carCo2El.textContent = `-${carCo2Grams.toLocaleString()} g`;
  if (pointsEl) {
    const soles = (km * 2.02).toFixed(2);
    pointsEl.textContent = `S/ ${soles} · +${greenPoints} pts`;
  }
  if (bikeTimeEl) bikeTimeEl.textContent = `${bikeMin} min`;
  if (carTimeEl) carTimeEl.textContent = `${carMin} min`;
  if (geminiTextEl) {
    geminiTextEl.textContent = isEn ? corridor.en.gemini : corridor.es.gemini;
  }

  renderLimaMapRoute();
}

function renderVehicleStage() {
  const isEn = currentLang === "en_US";
  const spec = VEHICLE_DATA[currentVehicleKey] || VEHICLE_DATA.bike;
  const copy = isEn ? spec.en : spec.es;

  const imgEl = document.getElementById("veh-showcase-img");
  const badgeEl = document.getElementById("veh-badge");
  const badgeIconEl = document.getElementById("veh-badge-icon");
  const badgeTextEl = document.getElementById("veh-badge-text");

  const barLabelEl = document.getElementById("time-bar-veh-label");
  const barFillEl = document.getElementById("time-bar-veh-fill");
  const barValEl = document.getElementById("time-bar-veh-val");

  const kickerEl = document.getElementById("veh-kicker");
  const titleEl = document.getElementById("veh-title");
  const co2PillEl = document.getElementById("veh-co2-pill");
  const descEl = document.getElementById("veh-desc");

  const bTimeEl = document.getElementById("veh-benefit-time");
  const bTimeSubEl = document.getElementById("veh-benefit-time-sub");
  const bCostEl = document.getElementById("veh-benefit-cost");
  const bCostSubEl = document.getElementById("veh-benefit-cost-sub");
  const bAirEl = document.getElementById("veh-benefit-air");
  const bAirSubEl = document.getElementById("veh-benefit-air-sub");
  const bRewardEl = document.getElementById("veh-benefit-reward");
  const bRewardSubEl = document.getElementById("veh-benefit-reward-sub");

  const tipTextEl = document.getElementById("veh-tip-text");

  if (imgEl) {
    imgEl.src = spec.img;
    imgEl.alt = spec.alt;
  }
  if (badgeEl) {
    badgeEl.classList.toggle("is-danger", spec.isDanger);
  }
  if (badgeIconEl) badgeIconEl.textContent = spec.badgeIcon;
  if (badgeTextEl) badgeTextEl.textContent = copy.badgeText;

  if (barLabelEl) barLabelEl.textContent = copy.barLabel;
  if (barFillEl) {
    barFillEl.style.width = spec.timeBarWidth;
    barFillEl.classList.toggle("car", spec.isDanger);
    barFillEl.classList.toggle("eco", !spec.isDanger);
  }
  if (barValEl) barValEl.textContent = spec.timeBarVal;

  if (kickerEl) kickerEl.textContent = copy.kicker;
  if (titleEl) titleEl.textContent = copy.title;
  if (co2PillEl) {
    co2PillEl.textContent = spec.co2Pill;
    co2PillEl.classList.toggle("is-danger", spec.isDanger);
  }
  if (descEl) descEl.textContent = copy.desc;

  if (bTimeEl) bTimeEl.textContent = copy.benefitTime;
  if (bTimeSubEl) bTimeSubEl.textContent = copy.benefitTimeSub;
  if (bCostEl) bCostEl.textContent = copy.benefitCost;
  if (bCostSubEl) bCostSubEl.textContent = copy.benefitCostSub;
  if (bAirEl) bAirEl.textContent = copy.benefitAir;
  if (bAirSubEl) bAirSubEl.textContent = copy.benefitAirSub;
  if (bRewardEl) bRewardEl.textContent = copy.benefitReward;
  if (bRewardSubEl) bRewardSubEl.textContent = copy.benefitRewardSub;

  if (tipTextEl) tipTextEl.innerHTML = copy.tip;
}

function renderAlchemyLab() {
  const isEn = currentLang === "en_US";
  const annualKm = alchemyTrips * alchemyKm * 52;
  const annualGrams = annualKm * 152;
  const annualKgNum = annualGrams / 1000;
  const annualKg = annualKgNum.toFixed(1);
  const petBottles = Math.round(annualGrams / 82.8);
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
  const treesEl = document.getElementById("eq-trees");
  const ptsEl = document.getElementById("eq-green-points");

  if (tripsOut) tripsOut.textContent = isEn ? `${alchemyTrips} rides/wk` : `${alchemyTrips} viajes/sem`;
  if (kmOut) kmOut.textContent = `${alchemyKm.toFixed(1)} km`;
  if (annualKgEl) annualKgEl.textContent = annualKg;
  if (fuelEl) fuelEl.textContent = isEn ? `${fuelLiters} L / yr` : `${fuelLiters} L / año`;
  if (hoursEl) hoursEl.textContent = isEn ? `${trafficHours} h / yr` : `${trafficHours} h / año`;
  if (petEl) petEl.textContent = isEn ? `${petBottles.toLocaleString()} bottles` : `${petBottles.toLocaleString()} botellas`;
  if (treesEl) treesEl.textContent = isEn ? `${trees} trees` : `${trees} árboles`;
  if (ptsEl) ptsEl.textContent = `+${greenPoints.toLocaleString()} pts`;
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.es_419;
  currentLang = lang;
  localStorage.setItem("ecocommute_lang", lang);
  document.documentElement.lang = lang === "en_US" ? "en" : "es";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
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
    applyTranslations(nextLang);
  });
}

function setupThemeSwitcher() {
  const themeButtons = document.querySelectorAll(".biome-chip");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("ecocommute_theme") || "light";
  root.setAttribute("data-theme", savedTheme);

  themeButtons.forEach((btn) => {
    const target = btn.getAttribute("data-theme-target");
    const isActive = target === savedTheme;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");

    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-target");
      root.setAttribute("data-theme", theme);
      localStorage.setItem("ecocommute_theme", theme);

      themeButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });

      updateLimaMapTiles();
    });
  });
}

function setupScrollAnimations() {
  const elements = document.querySelectorAll("[data-scroll-reveal]");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function setupSimulator() {
  const corridorBtns = document.querySelectorAll(".corridor-btn");
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

      renderSimulatorMetrics();
      routeTitleEl?.focus({ preventScroll: true });
    });
  });

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
          ? `Route logged (+${earnedPts} pts)`
          : `Ruta registrada (+${earnedPts} pts)`;
        setTimeout(() => {
          const dict = translations[currentLang] || translations.es_419;
          labelSpan.textContent = dict["sim.btn_recycle_trip"];
        }, 2200);
      }
    });
  }
}

function setupVehicleStudio() {
  const tabBtns = document.querySelectorAll(".transport-tab-btn");
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-vehicle") || "bike";
      if (!VEHICLE_DATA[key]) return;
      currentVehicleKey = key;

      tabBtns.forEach((b) => {
        const isSelected = b === btn;
        b.classList.toggle("is-active", isSelected);
        b.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      renderVehicleStage();
    });
  });

  renderVehicleStage();
}

function setupAlchemyLab() {
  const tripsRange = document.getElementById("alchemy-trips-range");
  const kmRange = document.getElementById("alchemy-km-range");
  const presets = document.querySelectorAll(".alchemy-preset");

  presets.forEach((btn) => {
    btn.addEventListener("click", () => {
      alchemyTrips = parseInt(btn.getAttribute("data-trips"), 10) || 6;
      alchemyKm = parseFloat(btn.getAttribute("data-km")) || 4.2;

      if (tripsRange) tripsRange.value = String(alchemyTrips);
      if (kmRange) kmRange.value = String(alchemyKm);

      presets.forEach((b) => b.classList.toggle("is-active", b === btn));
      renderAlchemyLab();
    });
  });

  if (tripsRange) {
    tripsRange.addEventListener("input", (e) => {
      alchemyTrips = parseInt(e.target.value, 10);
      presets.forEach((b) => b.classList.remove("is-active"));
      renderAlchemyLab();
    });
  }

  if (kmRange) {
    kmRange.addEventListener("input", (e) => {
      alchemyKm = parseFloat(e.target.value);
      presets.forEach((b) => b.classList.remove("is-active"));
      renderAlchemyLab();
    });
  }

  renderAlchemyLab();
}

document.addEventListener("DOMContentLoaded", () => {
  setupLimaHeroMap();
  setupThemeSwitcher();
  setupScrollAnimations();
  setupLanguageToggle();
  setupSimulator();
  setupVehicleStudio();
  setupAlchemyLab();
  applyTranslations(currentLang);
});
