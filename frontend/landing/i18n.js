/**
 * EcoCommute Lima — i18n & Interactivity
 * Versión optimizada y enfocada en la propuesta de valor real:
 * - Rutas reales en Lima (Leaflet)
 * - Comparativa de medios de transporte urbano
 * - Calculadora de impacto ambiental y económico personal
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

const VEHICLE_SPECS = {
  bike: {
    badge: "0 g CO₂ / km",
    isDanger: false,
    speed: "18 km/h",
    space: "1.5 m²",
    pts: "+15 pts / viaje",
    es: {
      code: "Bicicleta urbana · Rápida y libre de tráfico",
      chassis: "0 g CO₂ directo",
      laneSummary:
        "30 ciclistas avanzan fluidos por la ciclovía mientras el tráfico vehicular está detenido en hora punta."
    },
    en: {
      code: "Urban bicycle · Fast & traffic-free",
      chassis: "0 g direct CO₂",
      laneSummary:
        "30 cyclists glide freely on the bike lane while car traffic is gridlocked in rush hour."
    },
    svg: `<img class="veh-stage-render-img" src="./media/veh-bike.jpg" alt="Bicicleta urbana sostenible" />`
  },
  scooter: {
    badge: "0 g CO₂ / km",
    isDanger: false,
    speed: "20 km/h",
    space: "1.2 m²",
    pts: "+14 pts / viaje",
    es: {
      code: "Scooter eléctrico · Ágil para última milla",
      chassis: "0 g CO₂ directo",
      laneSummary:
        "Ágil y compacto en tramos medios; combina perfectamente con el Metro o Metropolitano sin esfuerzo."
    },
    en: {
      code: "Electric scooter · Agile last-mile ride",
      chassis: "0 g direct CO₂",
      laneSummary:
        "Agile and compact for medium commutes; easily connects with the Metro or Bus rapid transit."
    },
    svg: `<img class="veh-stage-render-img" src="./media/veh-scooter.jpg" alt="Scooter eléctrico urbano" />`
  },
  transit: {
    badge: "-75% CO₂ / km",
    isDanger: false,
    speed: "24 km/h",
    space: "0.8 m²",
    pts: "+10 pts / viaje",
    es: {
      code: "Bus / Tren eléctrico · Corredor segregado",
      chassis: "38 g CO₂ / pasajero (-75%)",
      laneSummary:
        "Un solo bus de alta capacidad transporta hasta 80 pasajeros, liberando la avenida de más de 35 autos particulares."
    },
    en: {
      code: "Bus / Electric train · Dedicated lane",
      chassis: "38 g CO₂ / rider (-75%)",
      laneSummary:
        "A single high-capacity bus carries up to 80 riders, freeing the avenue from more than 35 private cars."
    },
    svg: `<img class="veh-stage-render-img" src="./media/veh-transit.jpg" alt="Bus y Tren eléctrico de Lima" />`
  },
  car: {
    badge: "152 g CO₂ / km",
    isDanger: true,
    speed: "12 km/h",
    space: "18.0 m²",
    pts: "0 pts (Tráfico)",
    es: {
      code: "Auto en hora punta · Congestión y emisiones",
      chassis: "152 g CO₂ / km",
      laneSummary:
        "Avanza a solo 12 km/h atrapado en embotellamientos, ocupa 18 m² de calzada y quema combustible innecesariamente."
    },
    en: {
      code: "Car in rush hour · Congestion & emissions",
      chassis: "152 g CO₂ / km",
      laneSummary:
        "Crawls at just 12 km/h trapped in traffic jams, takes up 18 m² of road space and burns fuel unnecessarily."
    },
    svg: `<img class="veh-stage-render-img" src="./media/veh-car.jpg" alt="Auto en tráfico de hora punta" />`
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
    "veh.title": "Elige cómo moverte hoy por Lima.",
    "veh.subtitle":
      "Compara la velocidad media en hora punta, el espacio vial ocupado y las emisiones de cada alternativa en la ciudad.",
    "veh.label_speed": "Velocidad media",
    "veh.label_space": "Espacio vial",
    "veh.label_emissions": "Emisiones directas",
    "veh.label_reward": "Recompensa",

    "veh.bike_title": "Bicicleta urbana",
    "veh.bike_desc": "Cero emisiones, ahorras S/ 8.50 por viaje y evitas los cuellos de botella en hora punta.",
    "veh.scooter_title": "Scooter eléctrico",
    "veh.scooter_desc": "Ágil y fácil de combinar con el Metro o Metropolitano para cubrir la última milla sin esfuerzo.",
    "veh.transit_title": "Bus / Tren eléctrico",
    "veh.transit_desc": "Para distancias largas, usar el Metropolitano o Metro reduce un 75% la huella frente al auto.",
    "veh.car_title": "Auto en hora punta",
    "veh.car_desc": "Avanza a solo 12 km/h promedio en congestión, ocupa 18 m² y emite 152 g de CO₂ por cada km.",

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
    "veh.title": "Choose how you travel through Lima.",
    "veh.subtitle":
      "Compare average rush hour speed, urban road space occupied, and direct emissions for each commute option.",
    "veh.label_speed": "Average speed",
    "veh.label_space": "Road space",
    "veh.label_emissions": "Direct emissions",
    "veh.label_reward": "Reward points",

    "veh.bike_title": "Urban bicycle",
    "veh.bike_desc": "Zero emissions, save S/ 8.50 per trip, and bypass rush hour traffic bottlenecks.",
    "veh.scooter_title": "Electric scooter",
    "veh.scooter_desc": "Agile and effortless for the last mile; easily combined with the Metro or Bus rapid transit.",
    "veh.transit_title": "Bus / Electric train",
    "veh.transit_desc": "For longer distances, transit reduces carbon footprint by 75% compared to private cars.",
    "veh.car_title": "Car in rush hour",
    "veh.car_desc": "Crawls at just 12 km/h in congestion, takes up 18 m² of road space, and emits 152 g of CO₂ per km.",

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
  const optionCards = document.querySelectorAll(".vehicle-option-card");
  if (!optionCards.length) return;

  optionCards.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-vehicle") || "bike";
      if (!VEHICLE_SPECS[key]) return;
      currentVehicleKey = key;

      optionCards.forEach((b) => {
        const isSelected = b === btn;
        b.classList.toggle("is-active", isSelected);
        b.setAttribute("aria-checked", isSelected ? "true" : "false");
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
