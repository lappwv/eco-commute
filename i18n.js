/**
 * EcoCommute Landing Page ÔÇö i18n, Circular Recycling Alchemy Lab, Scrollytelling & Modern Web UI
 * Soporta Espa├▒ol de Latinoam├®rica (es_419) e Ingl├®s (en_US)
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
      routeTitle: "Miraflores ÔåÆ San Isidro",
      gemini:
        "┬½Por la ciclov├¡a de Av. Arequipa llegas en 14 min sin congesti├│n vehicular, ahorras 638 g de COÔéé frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.┬╗"
    },
    en: {
      routeTitle: "Miraflores ÔåÆ San Isidro",
      gemini:
        "ÔÇ£Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of COÔéé vs. driving (152 g/km) and earning Miraflores leaderboard points.ÔÇØ"
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
      routeTitle: "UPC Monterrico ÔåÆ San Borja",
      gemini:
        "┬½Conectando Av. Primavera con el eje ciclista de San Borja evitas el cuello de botella de Panamericana Sur, ahorras 882 g de COÔéé y desbloqueas progreso en el reto universitario.┬╗"
    },
    en: {
      routeTitle: "UPC Monterrico ÔåÆ San Borja",
      gemini:
        "ÔÇ£Connecting Av. Primavera to San Borja's cycling network avoids the Panamericana Sur bottleneck, saving 882 g of COÔéé and advancing your campus challenge.ÔÇØ"
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
      routeTitle: "Jes├║s Mar├¡a ÔåÆ Lince",
      gemini:
        "┬½El corredor arbolado de Av. Salaverry ofrece sombra continua y pendiente plana: evitas 547 g de COÔéé y llegas 7 minutos antes que en auto particular.┬╗"
    },
    en: {
      routeTitle: "Jes├║s Mar├¡a ÔåÆ Lince",
      gemini:
        "ÔÇ£The tree-lined Av. Salaverry corridor provides continuous shade and flat terrain: you avoid 547 g of COÔéé and arrive 7 minutes faster than driving.ÔÇØ"
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
      routeTitle: "Barranco ÔåÆ Miraflores",
      gemini:
        "┬½Bordeando el Malec├│n Paul Harris y Cisneros pedaleas con brisa marina sin cruces semaf├│ricos pesados, dejando de emitir 441 g de COÔéé en un trayecto corto.┬╗"
    },
    en: {
      routeTitle: "Barranco ÔåÆ Miraflores",
      gemini:
        "ÔÇ£Riding along the Malec├│n coastal path gives you ocean breeze and zero heavy intersections, avoiding 441 g of COÔéé on a quick coastal commute.ÔÇØ"
    }
  }
};

const translations = {
  es_419: {
    // Meta & topbar
    "page.title": "EcoCommute ÔÇö Metabolismo Urbano y Movilidad Circular en Lima",
    "nav.skip": "Saltar al contenido principal",
    "topbar.badge": "METABOLISMO URBANO ┬À LIMA METROPOLITANA",
    "topbar.spec": "Spring Boot 3.3 ┬À OSRM ┬À Gemini 1.5 Flash ┬À 25 endpoints activos",
    "topbar.recycled_label": "COÔéé RECICLADO EN SESI├ôN:",
    "topbar.swagger": "Swagger OpenAPI",
    "nav.aria": "Navegaci├│n principal",
    "nav.cycle": "Ciclo Circular",
    "nav.alchemy": "Reciclaje COÔéé",
    "nav.why": "Manifiesto",
    "nav.features": "Arquitectura",
    "nav.screens": "Interfaz",
    "nav.team": "Equipo",
    "lang.toggle_label": "Cambiar idioma (Espa├▒ol / English)",

    // Hero
    "hero.kicker": "Lima ┬À ODS 11 ┬À Meta 11.2 ┬À Ingenier├¡a de Sistemas UPC",
    "hero.title": "Antes de subirte al auto, ",
    "hero.title_em": "recicla el COÔéé que a├║n no has emitido.",
    "hero.lead":
      "EcoCommute trata cada kil├│metro en Lima como materia prima circular: compara tu ruta en bici, a pie o en auto con OSRM, explica la decisi├│n con Google Gemini 1.5 Flash y transforma el humo evitado en puntos verdes, equivalentes de reciclaje PET y recompensas reales.",
    "hero.btn_simulator": "Abrir Laboratorio de Reciclaje COÔéé",
    "hero.btn_cycle": "Ver el Ciclo Circular",
    "hero.btn_screens": "Ver las pantallas ÔåÆ",
    "hero.stat1_label": "Emisi├│n evitada vs. auto",
    "hero.stat2_label": "Equivalencia circular",
    "hero.stat2_unit": "botellas PET/km",
    "hero.stat3_label": "Backend verificado",
    "hero.stat3_unit": "tests en verde",
    "hero.card_label": "TELEMETR├ìA DE VIAJE ┬À DEMO INTERACTIVA",
    "hero.card_route": "Miraflores ÔåÆ San Isidro, 4.2 km",
    "hero.car": "En auto (combusti├│n)",
    "hero.car_val": "640 g de COÔéé",
    "hero.bike": "En bicicleta / a pie",
    "hero.bike_val": "0 g de COÔéé",
    "hero.points": "Tu saldo circular",
    "hero.points_val": "+15 puntos verdes",
    "hero.card_foot":
      "As├¡ se ve cada viaje registrado en la app. Los factores de emisi├│n est├ín configurados por la aplicaci├│n, no los pone el usuario.",

    // Simulator
    "sim.route1": "Miraflores ÔåÆ San Isidro",
    "sim.route2": "UPC Monterrico ÔåÆ San Borja",
    "sim.route3": "Jes├║s Mar├¡a ÔåÆ Lince",
    "sim.route4": "Barranco ÔåÆ Miraflores",
    "sim.by_bike": "en bici",
    "sim.by_car_traffic": "en auto (tr├ífico hora punta)",
    "sim.adjust_distance": "Ajustar distancia del trayecto",
    "sim.pet_equiv_label": "Reciclaje equivalente evitado",
    "sim.gemini_tag": "GEMINI 1.5 FLASH ┬À EXPLICACI├ôN CONTEXTUAL",
    "sim.gemini_miraflores":
      "┬½Por la ciclov├¡a de Av. Arequipa llegas en 14 min sin congesti├│n vehicular, ahorras 638 g de COÔéé frente al auto particular (152 g/km) y sumas puntos para el ranking de Miraflores.┬╗",
    "sim.btn_recycle_trip": "Reciclar este viaje en el contador global",

    // Circular Scrollytelling
    "cycle.title": "C├│mo reciclamos un viaje urbano en valor ecol├│gico",
    "cycle.intro":
      "Reciclar no es solo separar pl├ístico o vidrio: es evitar que el carbono f├│sil entre a la atm├│sfera de Lima y reintroducir esa energ├¡a en la comunidad.",
    "cycle.badge1": "Intercepci├│n de combusti├│n",
    "cycle.badge2": "Conversi├│n en puntos verdes",
    "cycle.badge3": "Recompensas y h├íbito circular",
    "cycle.s1_tag": "INTERCEPCI├ôN EN EL ORIGEN",
    "cycle.s1_title": "Sustituir combusti├│n por tracci├│n limpia antes de girar la llave",
    "cycle.s1_desc":
      "Un autom├│vil promedio en el tr├ífico de Lima emite 152 gramos de COÔéé por cada kil├│metro. Cuando eliges bicicleta o caminata en EcoCommute, ese carbono se ┬½recicla┬╗ preventivamente: nunca llega al aire de tu distrito.",
    "cycle.s2_tag": "REFINACI├ôN CON OSRM + GEMINI 1.5 FLASH",
    "cycle.s2_title": "Los datos geogr├íficos crudos se transforman en inteligencia accionable",
    "cycle.s2_desc":
      "Nuestro backend en Spring Boot procesa las coordenadas de forma ef├¡mera sobre OpenStreetMap (OSRM), valida el ahorro con CarbonService y utiliza Google Gemini 1.5 Flash para explicarte por qu├® esa ruta ciclista o peatonal optimiza tu tiempo y tu salud.",
    "cycle.s3_tag": "ECONOM├ìA CIRCULAR DISTRITAL",
    "cycle.s3_title": "El carbono evitado regresa a ti como puntos, medallas y beneficios",
    "cycle.s3_desc":
      "Cada gramo ahorrado alimenta tu cuenta de Puntos Verdes, desbloquea medallas autom├íticas al superar hitos y posiciona a tu distrito (Miraflores, San Isidro, Surco, Barranco, Jes├║s Mar├¡a) en el ranking metropolitano sostenible.",

    // Alchemy Lab
    "alchemy.title": "┬┐A cu├ínto reciclaje f├¡sico equivale dejar el auto en Lima?",
    "alchemy.intro":
      "Un gramo de COÔéé es abstracto; una botella PET reciclada o una lata de aluminio recuperada se pueden tocar. Mueve la frecuencia semanal y observa la equivalencia material exacta.",
    "alchemy.p1": "Ciclista casual (3 d├¡as/sem)",
    "alchemy.p2": "Commuter UPC (5 d├¡as/sem)",
    "alchemy.p3": "Guardi├ín del Aire (7 d├¡as/sem)",
    "alchemy.slider_trips": "Viajes sostenibles por semana",
    "alchemy.slider_km": "Distancia media por trayecto",
    "alchemy.annual_saved_label": "CARBONO ANUAL QUE NO ENTRAR├ü AL AIRE DE LIMA",
    "alchemy.card1_title": "Botellas pl├ísticas PET recicladas",
    "alchemy.card1_desc":
      "Equivalente en huella de carbono evitada al reciclar botellas de 500 ml (82.8 g COÔéé evitados por envase recuperado).",
    "alchemy.card2_title": "Latas de aluminio fundidas en fr├¡o",
    "alchemy.card2_desc":
      "Ahorro energ├®tico equivalente a recuperar latas de bebidas frente a producir aluminio primario desde bauxita (170 g COÔéé/lata).",
    "alchemy.card3_title": "├ürboles adultos absorbiendo 1 a├▒o",
    "alchemy.card3_desc":
      "Cantidad de ├írboles urbanos maduros trabajando durante 365 d├¡as para fijar el mismo volumen de carbono (21 kg COÔéé/a├▒o).",
    "alchemy.card4_title": "Puntos Verdes canjeables en cat├ílogo",
    "alchemy.card4_desc":
      "Saldo acumulado en tu perfil de EcoCommute para desbloquear mantenimientos de bici, caf├® aliado y accesorios reciclados.",

    // Solution / Story
    "story.title": "Por qu├® existe",
    "story.sidebar_note":
      "Lima pierde m├ís de 150 horas al a├▒o por ciudadano en congesti├│n vehicular, mientras las emisiones de transporte urbano siguen siendo invisibles en las apps tradicionales.",
    "story.p1":
      "En Lima la decisi├│n de c├│mo movernos se toma por rapidez, costo o costumbre. Nadie ve cu├ínto COÔéé produce el trayecto que acaba de elegir, y las herramientas de mapas simplemente comparten tiempo y tr├ífico: el impacto ambiental queda fuera de la pantalla.",
    "story.p2_pre": "Lo que falta no es otro mapa. Falta ver el costo ambiental de la decisi├│n ",
    "story.p2_under": "antes",
    "story.p2_post":
      " de tomarla, y algo que te haga querer repetir la alternativa buena la semana siguiente. Eso es lo que intentamos construir.",
    "story.comp_old_tag": "Apps de mapas tradicionales (Modelo Lineal)",
    "story.comp_old_desc":
      "Solo muestran minutos estimados y congesti├│n. El impacto de carbono es invisible y el viaje termina en humo sin retorno.",
    "story.comp_new_tag": "Enfoque EcoCommute (Modelo Circular)",
    "story.comp_new_desc":
      "Contrasta gramos de COÔéé antes de salir, explica por qu├® te conviene la ruta con IA y recicla tu constancia en puntos y comunidad.",
    "story.quote":
      "┬½Si el ahorro de COÔéé se ve igual de concreto que los minutos del viaje, la gente lo considera.┬╗",
    "story.quote_author": "ÔÇö El equipo EcoCommute, probando la app con usuarios en Lima",

    // Features
    "feat.title": "Qu├® hace hoy",
    "feat.intro":
      "Todo lo de abajo est├í implementado en el backend (Spring Boot) y cubierto por 28 tests autom├íticos que corren en cada Pull Request.",
    "feat.routes_title": "Rutas sostenibles y Google Gemini",
    "feat.routes_desc":
      "Introduces el origen y el destino y la app arma alternativas con OSRM: qu├® tan lejos es, cu├ínto tarda cada medio de transporte y qu├® te conviene seg├║n tu historial. La recomendaci├│n asistida por Inteligencia Artificial (Google Gemini 1.5 Flash) explica en lenguaje simple por qu├® sugiere esa ruta.",
    "feat.trips_title": "Viajes y c├ílculo de COÔéé",
    "feat.trips_desc":
      "Registras el viaje y la app calcula el COÔéé ahorrado frente al auto (152 g COÔéé/km ahorrados) y los puntos verdes que ganas.",
    "feat.dash_title": "Dashboard de impacto",
    "feat.dash_desc":
      "COÔéé acumulado, distancia recorrida, evoluci├│n semanal, ├írboles equivalentes salvados e historial de viajes en gr├íficos legibles.",
    "feat.rank_title": "Ranking distrital",
    "feat.rank_desc":
      "Compara tu impacto ecol├│gico con ciclistas y peatones de tu distrito en Lima para fortalecer la comunidad activa.",
    "feat.badges_title": "Medallas y recompensas",
    "feat.badges_desc":
      "Las medallas se desbloquean autom├íticamente al alcanzar hitos ecol├│gicos; los puntos se canjean por recompensas sostenibles.",
    "feat.challenges_title": "Retos semanales",
    "feat.challenges_desc":
      "Desaf├¡os mensuales y metas sostenibles administradas din├ímicamente desde el panel de gesti├│n para sostener el h├íbito.",

    // Badges / ODS Callout
    "ods.title": "Alineados con el ODS 11 (Meta 11.2) e Inteligencia Artificial",
    "ods.desc":
      "EcoCommute responde de manera directa al Objetivo de Desarrollo Sostenible 11 de la ONU (Meta 11.2: Proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos). Adem├ís, optimizamos la toma de decisiones con Google Gemini 1.5 Flash para brindar explicaciones contextuales.",
    "ods.badge_ods": "ODS 11 ┬À Meta 11.2: Movilidad Sostenible",
    "ods.badge_ai": "Optimizaci├│n con IA ┬À Google Gemini 1.5 Flash",
    "ods.badge_osrm": "Ruteo Open Source OSRM",

    // Screenshots
    "demo.title": "C├│mo se ve",
    "demo.tab_all": "Vista comparativa",
    "demo.tab_routes": "Planificador y Mapa",
    "demo.tab_dash": "Dashboard de Impacto",
    "demo.img1_alt": "Mockup interactivo de rutas sostenibles con mapas y alternativas en Lima",
    "demo.cap1":
      "Planificaci├│n de rutas sostenibles con ubicaci├│n, medios de transporte, alternativas y optimizaci├│n asistida por Google Gemini.",
    "demo.img2_alt": "Mockup del dashboard de impacto ecol├│gico con CO2 y estad├¡sticas",
    "demo.cap2":
      "Dashboard de impacto con COÔéé ahorrado, viajes, ├írboles equivalentes, medallas e historial.",

    // Impact
    "impact.title": "Estamos alineados con la Meta 11.2 del ODS 11",
    "impact.desc":
      "Transporte seguro, accesible, asequible y sostenible para todas las personas. El usuario transforma su huella de carbono en progreso visible, y la gamificaci├│n (retos, medallas y rankings) est├í para sostener el h├íbito m├ís all├í de la primera semana.",
    "impact.p1": "Emisiones directas en bicicleta o caminata",
    "impact.p2": "Privacidad por dise├▒o sin rastreo en segundo plano",
    "impact.p3": "Cartograf├¡a abierta sobre OpenStreetMap",

    // Team
    "team.title": "Qui├®nes lo hacemos",
    "team.intro":
      "Seis estudiantes de Ingenier├¡a de Sistemas de la UPC, NRC 8247, Ciclo 2026-2. Cada quien una parte del producto; todo el proceso en el repositorio.",
    "team.member1_role": "IA y recomendaciones de ruta",
    "team.member2_role": "Rutas, dashboard y medallas",
    "team.member3_role": "Entidades, viajes y c├ílculo de COÔéé",
    "team.member4_role": "Puntos verdes y ranking",
    "team.member5_role": "Seguridad, JWT y registro",
    "team.member6_role": "Documentaci├│n, evidencias y landing",

    // Contact
    "contact.title": "Pru├®balo y cu├®ntanos",
    "contact.intro":
      "Si algo no te convence o tienes una idea para Lima, escr├¡benos: leemos todo.",
    "contact.github": "C├│digo en GitHub",
    "contact.swagger": "API & Swagger en Render",
    "contact.linkedin": "EcoCommute en LinkedIn",

    // Footer & Legal
    "footer.academic": "EcoCommute ┬À Trabajo Parcial de Aplicaciones Web (UPC 2026-2)",
    "footer.terms": "T├®rminos y Condiciones",
    "footer.privacy": "Pol├¡tica de Privacidad",

    // Modal
    "modal.title": "T├®rminos de Servicio y Privacidad ÔÇö EcoCommute",
    "modal.close": "Cerrar ventana modal",
    "modal.intro": "Compromiso ├®tico, legal y ambiental del proyecto EcoCommute:",
    "modal.p1":
      "<strong>Protecci├│n de Datos:</strong> Cumplimos estrictamente la Ley N┬░ 29733 (Per├║). Tus coordenadas se procesan de forma ef├¡mera para calcular rutas y ahorro de COÔéé; no rastreamos en segundo plano ni comercializamos datos.",
    "modal.p2":
      "<strong>Ruteo Abierto e IA:</strong> Empleamos OSRM sobre OpenStreetMap y Google Gemini 1.5 Flash para recomendaciones transparentes y sin sesgo comercial.",
    "modal.p3":
      "<strong>├ëtica Profesional:</strong> El desarrollo se rige bajo los C├│digos de ├ëtica de Software ACM/IEEE y el C├│digo Deontol├│gico del Colegio de Ingenieros del Per├║ (CIP), priorizando el inter├®s p├║blico y la movilidad sostenible.",
    "modal.full_link": "Abrir p├ígina completa de T├®rminos y Condiciones ÔåÆ"
  },

  en_US: {
    // Meta & topbar
    "page.title": "EcoCommute ÔÇö Urban Metabolism & Circular Mobility in Lima",
    "nav.skip": "Skip to main content",
    "topbar.badge": "URBAN METABOLISM ┬À LIMA METROPOLITAN AREA",
    "topbar.spec": "Spring Boot 3.3 ┬À OSRM ┬À Gemini 1.5 Flash ┬À 25 active endpoints",
    "topbar.recycled_label": "SESSION RECYCLED COÔéé:",
    "topbar.swagger": "Swagger OpenAPI",
    "nav.aria": "Main navigation",
    "nav.cycle": "Circular Loop",
    "nav.alchemy": "COÔéé Recycling",
    "nav.why": "Manifesto",
    "nav.features": "Architecture",
    "nav.screens": "Interface",
    "nav.team": "Team",
    "lang.toggle_label": "Switch language (Espa├▒ol / English)",

    // Hero
    "hero.kicker": "Lima ┬À SDG 11 ┬À Target 11.2 ┬À UPC Systems Engineering",
    "hero.title": "Before taking your car, ",
    "hero.title_em": "recycle the COÔéé you haven't emitted yet.",
    "hero.lead":
      "EcoCommute treats every kilometer in Lima as circular raw material: it compares your bike, walk, or car route via OSRM, explains the choice with Google Gemini 1.5 Flash, and turns avoided exhaust into green points, PET recycling equivalents, and real rewards.",
    "hero.btn_simulator": "Open COÔéé Recycling Lab",
    "hero.btn_cycle": "Explore Circular Loop",
    "hero.btn_screens": "View Screenshots ÔåÆ",
    "hero.stat1_label": "Avoided vs. car",
    "hero.stat2_label": "Circular equivalence",
    "hero.stat2_unit": "PET bottles/km",
    "hero.stat3_label": "Verified backend",
    "hero.stat3_unit": "passing tests",
    "hero.card_label": "TRIP TELEMETRY ┬À INTERACTIVE DEMO",
    "hero.card_route": "Miraflores ÔåÆ San Isidro, 4.2 km",
    "hero.car": "By Car (combustion)",
    "hero.car_val": "640 g of COÔéé",
    "hero.bike": "By Bicycle / Walking",
    "hero.bike_val": "0 g of COÔéé",
    "hero.points": "Your circular balance",
    "hero.points_val": "+15 green points",
    "hero.card_foot":
      "This is how every logged commute looks in the app. Carbon emission factors are strictly configured by the system.",

    // Simulator
    "sim.route1": "Miraflores ÔåÆ San Isidro",
    "sim.route2": "UPC Monterrico ÔåÆ San Borja",
    "sim.route3": "Jes├║s Mar├¡a ÔåÆ Lince",
    "sim.route4": "Barranco ÔåÆ Miraflores",
    "sim.by_bike": "by bike",
    "sim.by_car_traffic": "by car (rush-hour traffic)",
    "sim.adjust_distance": "Adjust trip distance",
    "sim.pet_equiv_label": "Equivalent recycling avoided",
    "sim.gemini_tag": "GEMINI 1.5 FLASH ┬À CONTEXTUAL INSIGHT",
    "sim.gemini_miraflores":
      "ÔÇ£Taking the Av. Arequipa protected bike lane gets you there in 14 min bypassing rush-hour traffic, avoiding 638 g of COÔéé vs. driving (152 g/km) and earning Miraflores leaderboard points.ÔÇØ",
    "sim.btn_recycle_trip": "Recycle this trip into global counter",

    // Circular Scrollytelling
    "cycle.title": "How we recycle an urban commute into ecological value",
    "cycle.intro":
      "Recycling isn't just sorting plastic or glass: it's preventing fossil carbon from entering Lima's sky and feeding that clean energy back into the community.",
    "cycle.badge1": "Combustion interception",
    "cycle.badge2": "Green points conversion",
    "cycle.badge3": "Rewards & circular habit",
    "cycle.s1_tag": "SOURCE INTERCEPTION",
    "cycle.s1_title": "Replacing combustion with human traction before turning the key",
    "cycle.s1_desc":
      "An average passenger car in Lima traffic emits 152 grams of COÔéé per kilometer. When you choose cycling or walking in EcoCommute, that carbon is preventively recycledÔÇöit never enters your district's air.",
    "cycle.s2_tag": "REFINING WITH OSRM + GEMINI 1.5 FLASH",
    "cycle.s2_title": "Raw geographic telemetry becomes actionable urban intelligence",
    "cycle.s2_desc":
      "Our Spring Boot backend processes coordinates ephemerally over OpenStreetMap (OSRM), validates savings via CarbonService, and uses Google Gemini 1.5 Flash to explain why that cycling or walking corridor optimizes your time and health.",
    "cycle.s3_tag": "DISTRICT CIRCULAR ECONOMY",
    "cycle.s3_title": "Avoided carbon returns to you as points, medals, and perks",
    "cycle.s3_desc":
      "Every gram saved feeds your Green Points balance, unlocks automated milestone medals, and elevates your Lima district (Miraflores, San Isidro, Surco, Barranco, Jes├║s Mar├¡a) on the metropolitan leaderboard.",

    // Alchemy Lab
    "alchemy.title": "How much physical recycling does leaving your car equal?",
    "alchemy.intro":
      "A gram of COÔéé feels abstract; a recycled PET bottle or recovered aluminum can is tangible. Adjust your weekly commute frequency to see the exact material equivalence.",
    "alchemy.p1": "Casual cyclist (3 days/wk)",
    "alchemy.p2": "UPC Commuter (5 days/wk)",
    "alchemy.p3": "Air Guardian (7 days/wk)",
    "alchemy.slider_trips": "Sustainable trips per week",
    "alchemy.slider_km": "Average distance per trip",
    "alchemy.annual_saved_label": "ANNUAL CARBON KEPT OUT OF LIMA'S AIR",
    "alchemy.card1_title": "Recycled 500ml PET plastic bottles",
    "alchemy.card1_desc":
      "Equivalent carbon footprint avoided by recycling 500 ml PET bottles (82.8 g COÔéé avoided per recovered container).",
    "alchemy.card2_title": "Cold-recovered aluminum cans",
    "alchemy.card2_desc":
      "Energy savings equivalent to recycling beverage cans instead of smelting primary aluminum from bauxite (170 g COÔéé/can).",
    "alchemy.card3_title": "Mature urban trees absorbing for 1 year",
    "alchemy.card3_desc":
      "Number of mature urban trees working 365 days to sequester the same volume of atmospheric carbon (21 kg COÔéé/year).",
    "alchemy.card4_title": "Redeemable Green Points",
    "alchemy.card4_desc":
      "Balance earned in your EcoCommute profile to unlock bike tune-ups, partner coffee, and upcycled accessories.",

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
    "story.comp_old_tag": "Traditional map apps (Linear Model)",
    "story.comp_old_desc":
      "Only display estimated minutes and traffic congestion. Carbon impact is invisible and the trip ends in unrecovered exhaust.",
    "story.comp_new_tag": "The EcoCommute approach (Circular Model)",
    "story.comp_new_desc":
      "Contrasts grams of COÔéé before you depart, explains why the route fits you with AI, and recycles consistency into points and community.",
    "story.quote":
      "ÔÇ£If carbon savings are presented as clearly as travel minutes, citizens genuinely take them into account.ÔÇØ",
    "story.quote_author": "ÔÇö The EcoCommute Team, testing the prototype with urban commuters in Lima",

    // Features
    "feat.title": "What works today",
    "feat.intro":
      "Everything below is fully implemented in the backend (Spring Boot) and covered by 28 automated tests running on every Pull Request.",
    "feat.routes_title": "Sustainable Routes & Google Gemini",
    "feat.routes_desc":
      "Enter origin and destination, and the app generates alternatives via OSRM: distance, travel time by mode, and tailored insights. AI recommendations powered by Google Gemini 1.5 Flash explain clearly why a route is suggested.",
    "feat.trips_title": "Trips & COÔéé Accounting",
    "feat.trips_desc":
      "Log your active commute and the system computes the exact COÔéé avoided compared to a passenger car (152 g COÔéé/km avoided) along with earned points.",
    "feat.dash_title": "Impact Dashboard",
    "feat.dash_desc":
      "Cumulative COÔéé saved, total distance, weekly trends, equivalent trees preserved, and complete trip logs in clear visual cards.",
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
    "ods.badge_ods": "SDG 11 ┬À Target 11.2: Sustainable Urban Mobility",
    "ods.badge_ai": "AI-Powered Optimization ┬À Google Gemini 1.5 Flash",
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
      "Impact dashboard displaying COÔéé saved, trips logged, tree equivalents, badges, and history.",

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
    "team.member3_role": "Entities, Commute Logs & COÔéé Math",
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
    "footer.academic": "EcoCommute ┬À Web Application Architecture Midterm Project (UPC 2026-2)",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",

    // Modal
    "modal.title": "Terms of Service & Privacy ÔÇö EcoCommute",
    "modal.close": "Close modal window",
    "modal.intro": "Ethical, legal, and environmental commitments of EcoCommute:",
    "modal.p1":
      "<strong>Data Privacy:</strong> We strictly follow Peru's Personal Data Protection Law (Law N┬░ 29733) and GDPR principles. Geolocation coordinates are processed ephemerally; we never perform background tracking nor monetize personal telemetry.",
    "modal.p2":
      "<strong>Open Routing & AI:</strong> We rely on OSRM over OpenStreetMap and Google Gemini 1.5 Flash for unbiased, transparent routing recommendations.",
    "modal.p3":
      "<strong>Professional Ethics:</strong> Development is guided by the ACM/IEEE Software Engineering Code of Ethics and the Deontological Code of the Colegio de Ingenieros del Per├║ (CIP), prioritizing public well-being and climate action.",
    "modal.full_link": "Open full Terms & Conditions page ÔåÆ"
  }
};

let currentLang = localStorage.getItem("ecocommute_lang") || "es_419";
let currentCorridor = "miraflores";
let currentKm = 4.2;
let sessionRecycledGrams = 1920;

let alchemyTrips = 6;
let alchemyKm = 4.2;

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

  const localeData = isEn ? corridor.en : corridor.es;

  if (routeTitleEl) {
    routeTitleEl.textContent = `${localeData.routeTitle}, ${km.toFixed(1)} km`;
  }
  if (coordsEl) coordsEl.textContent = corridor.coords;
  if (distOutEl) distOutEl.textContent = `${km.toFixed(1)} km`;
  if (carCo2El) {
    carCo2El.textContent = isEn ? `${carCo2Grams} g of COÔéé` : `${carCo2Grams} g de COÔéé`;
  }
  if (bikeCo2El) {
    bikeCo2El.textContent = isEn ? "0 g of COÔéé" : "0 g de COÔéé";
  }
  if (petEquivEl) {
    petEquivEl.textContent = isEn ? `ÔÖ╗ ${petBottles} PET bottles` : `ÔÖ╗ ${petBottles} botellas PET`;
  }
  if (pointsEl) {
    pointsEl.textContent = isEn ? `+${greenPoints} green points` : `+${greenPoints} puntos verdes`;
  }
  if (bikeTimeEl) bikeTimeEl.textContent = `${bikeMin} min`;
  if (carTimeEl) carTimeEl.textContent = `${carMin} min`;
  if (geminiTextEl) geminiTextEl.textContent = localeData.gemini;
  if (svgCarPath) svgCarPath.setAttribute("d", corridor.carPath);
  if (svgEcoPath) svgEcoPath.setAttribute("d", corridor.ecoPath);
}

function renderAlchemyLab() {
  const isEn = currentLang === "en_US";
  const annualGrams = alchemyTrips * alchemyKm * 152 * 52;
  const annualKg = (annualGrams / 1000).toFixed(1);
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
  renderAlchemyLab();
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

function setupSimulator() {
  const corridorBtns = document.querySelectorAll(".corridor-btn");
  const rangeInput = document.getElementById("sim-distance-range");
  const recycleBtn = document.getElementById("recycle-trip-btn");
  const sessionCounter = document.getElementById("session-recycled-co2");
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

  if (rangeInput) {
    rangeInput.addEventListener("input", (e) => {
      currentKm = parseFloat(e.target.value) || 4.2;
      renderSimulatorMetrics();
    });
  }

  if (recycleBtn && sessionCounter) {
    recycleBtn.addEventListener("click", () => {
      const addedGrams = Math.round(currentKm * 152);
      sessionRecycledGrams += addedGrams;
      sessionCounter.textContent = `${sessionRecycledGrams.toLocaleString()} g`;
      sessionCounter.animate(
        [
          { transform: "scale(1)", color: "#f0b429" },
          { transform: "scale(1.22)", color: "#34d399" },
          { transform: "scale(1)", color: "#f0b429" }
        ],
        { duration: 480, easing: "ease-out" }
      );
    });
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

// Canvas de part├¡culas circulares con pausa inteligente fuera de pantalla (efficient-background-processing)
function setupCircularParticleReactor() {
  const canvas = document.getElementById("circular-particles-canvas");
  const scrollySection = document.getElementById("ciclo-circular");
  if (!canvas || !scrollySection) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const particles = Array.from({ length: 42 }, (_, i) => ({
    angle: (i / 42) * Math.PI * 2,
    radius: 58 + (i % 4) * 26,
    speed: 0.004 + (i % 3) * 0.0025,
    size: 1.6 + (i % 3) * 0.8
  }));

  let rafId = null;
  const stageColors = ["#34d399", "#38bdf8", "#f0b429"];

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const primaryColor = stageColors[activeReactorStage] || "#34d399";

    for (const p of particles) {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.globalAlpha = 0.55;
      ctx.fill();
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
        railReadout.textContent = `CICLO ┬À ${num}%`;
      }
    },
    { passive: true }
  );
}

// Fallback con IntersectionObserver para entry effects en navegadores sin view() timeline (scroll-entry-exit-effects)
function setupScrollEntryFallback() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  if (!window.CSS?.supports?.("(animation-timeline: view()) and (animation-range: entry)")) {
    const targets = document.querySelectorAll(".bento-card, .preview-card, .ods-card");
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
        healthLink.textContent = "GET /health ┬À UP";
        if (statusDot) statusDot.style.background = "#10b981";
      }
    })
    .catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {
  setupSiblingIndexFallback();
  setupLanguageToggle();
  setupSimulator();
  setupAlchemyLab();
  setupCircularScrollytelling();
  setupCircularParticleReactor();
  setupShowcaseTabs();
  setupSpotlightCards();
  setupTermsModal();
  setupScrollTelemetry();
  setupScrollEntryFallback();
  applyTranslations(currentLang);
  checkBackendHealth();
});
