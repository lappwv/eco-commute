/**
 * Inserta la sección completa "4.2.2 Sprint 2" en el informe EcoCommute.
 * Uso: Extensiones > Apps Script > pegar este código > Ejecutar "insertarSprint2".
 * Se inserta justo debajo del título "4.2.2.1 Sprint Backlog 2".
 */
function insertarSprint2() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  // Evitar duplicados si se ejecuta dos veces
  if (body.findText('T13') && body.findText('T22')) {
    DocumentApp.getUi().alert('El Sprint Backlog 2 ya parece estar insertado (T13–T22 encontrados).');
    return;
  }

  var found = body.findText('4\\.2\\.2\\.1 Sprint Backlog 2');
  if (!found) {
    DocumentApp.getUi().alert('No se encontró el título "4.2.2.1 Sprint Backlog 2".');
    return;
  }
  var headingPara = found.getElement().getParent();
  var idx = body.getChildIndex(headingPara) + 1;

  function p(text) {
    var para = body.insertParagraph(idx++, text);
    para.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    para.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    return para;
  }
  function h4(text) {
    var para = body.insertParagraph(idx++, text);
    para.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    return para;
  }
  function li(text) {
    var item = body.insertListItem(idx++, text);
    item.setGlyphType(DocumentApp.GlyphType.BULLET);
    return item;
  }
  function table(rows) {
    var t = body.insertTable(idx++, rows);
    var header = t.getRow(0);
    for (var c = 0; c < header.getNumCells(); c++) {
      header.getCell(c).setBackgroundColor('#d9ead3');
      header.getCell(c).editAsText().setBold(true);
    }
    for (var r = 0; r < t.getNumRows(); r++) {
      for (var c2 = 0; c2 < t.getRow(r).getNumCells(); c2++) {
        t.getRow(r).getCell(c2).editAsText().setFontSize(9);
      }
    }
    p(''); // espacio después de la tabla
    return t;
  }

  // ---------- 4.2.2.1 Sprint Backlog 2 ----------
  p('El Sprint Backlog 2 consolidó el incremento del Trabajo Parcial enfocándose en calidad, cobertura de pruebas, acotamiento de la API REST a 25 rutas expuestas e integración de las ramas por features. Las tareas técnicas fueron ejecutadas y validadas por los integrantes sobre la estructura base del proyecto, manteniendo un rango de estimación de 4 a 6 horas según la rúbrica. El repositorio del proyecto se encuentra en https://github.com/lappwv/eco-commute.');

  table([
    ['Sprint', 'User Story', 'Engineering Task', 'Responsable', 'Horas'],
    ['Sprint 2', 'HU01-HU02, Arquitectura', 'Refactorizar controladores y acotar la superficie de la API a 25 rutas expuestas', 'Rodrigo Condor', '6'],
    ['Sprint 2', 'HU03', 'Corregir el flag de optimización IA y validar respuestas con fallback heurístico en rutas', 'Matías Mariños', '5'],
    ['Sprint 2', 'HU03', 'Diseñar e implementar pruebas de integración para rutas y fallback OSRM', 'Jeampiero Ramos', '6'],
    ['Sprint 2', 'HU04-HU05', 'Implementar pruebas de integración para registro de viajes, historial y cálculo de CO₂', 'Jeampiero Ramos', '6'],
    ['Sprint 2', 'HU06, HU10-HU11', 'Validar consistencia de cálculo de puntos y desbloqueo automático de medallas', 'Odar Alcocer', '5'],
    ['Sprint 2', 'HU08, HU13', 'Integrar y validar consistencia del ranking distrital y catálogo de retos', 'Paulo Espinoza', '6'],
    ['Sprint 2', 'HU12, HU14', 'Implementar pruebas de integración para endpoints de recompensas, canjes y administración', 'Diego Avalos', '6'],
    ['Sprint 2', 'Landing UI', 'Actualizar capturas de pantalla, catálogo demo y textos neutros de la landing page', 'Matías Mariños', '5'],
    ['Sprint 2', 'DevOps', 'Verificar pipeline de despliegue continuo en Render Blueprint con PostgreSQL y health check', 'Rodrigo Condor', '4'],
    ['Sprint 2', 'QA & Evidencias', 'Ejecutar la suite completa de 28 tests automatizados en verde y sincronizar informe técnico', 'Matías Mariños', '5']
  ]);

  table([
    ['Id', 'Title', 'Estimation', 'Assigned To', 'Status'],
    ['T13', 'Refactorizar controladores y acotar la superficie de la API a 25 rutas expuestas', '6h', 'Rodrigo Condor', 'Done'],
    ['T14', 'Corregir el flag de optimización IA y validar respuestas con fallback heurístico en rutas', '5h', 'Matías Mariños', 'Done'],
    ['T15', 'Diseñar e implementar pruebas de integración para rutas y fallback OSRM (HU03)', '6h', 'Jeampiero Ramos', 'Done'],
    ['T16', 'Implementar pruebas de integración para registro de viajes, historial y cálculo de CO₂ (HU04, HU05)', '6h', 'Jeampiero Ramos', 'Done'],
    ['T17', 'Validar consistencia de cálculo de puntos y desbloqueo automático de medallas (HU06, HU10-HU11)', '5h', 'Odar Alcocer', 'Done'],
    ['T18', 'Integrar y validar consistencia del ranking distrital y catálogo de retos (HU08, HU13)', '6h', 'Paulo Espinoza', 'Done'],
    ['T19', 'Implementar pruebas de integración para endpoints de recompensas, canjes y administración (HU12, HU14)', '6h', 'Diego Avalos', 'Done'],
    ['T20', 'Actualizar capturas de pantalla, catálogo demo y textos neutros de la landing page', '5h', 'Matías Mariños', 'Done'],
    ['T21', 'Verificar pipeline de despliegue continuo en Render Blueprint con PostgreSQL y health check', '4h', 'Rodrigo Condor', 'Done'],
    ['T22', 'Ejecutar la suite completa de 28 tests automatizados en verde y sincronizar informe del TP', '5h', 'Matías Mariños', 'Done']
  ]);

  // ---------- 4.2.2.2 ----------
  h4('4.2.2.2 Development Evidence for Sprint Review');
  p('Como evidencia de desarrollo del Sprint 2 se cuentan los Pull Requests integrados en el repositorio https://github.com/lappwv/eco-commute, que documentan la revisión cruzada de código y la consolidación de las ramas de trabajo hacia main:');
  li('PR #2 (refactor/reduce-api-surface): reducción de la API a 25 rutas públicas manteniendo la cobertura de HU01 a HU14.');
  li('PR #3 (docs/sync-current-tp-report): sincronización del informe técnico, capturas actualizadas de la landing y textos neutros.');
  li('PR #4 (feature/challenges-leaderboard): consistencia del ranking distrital, retos y medallas con los modos de transporte soportados.');
  li('PR #5 (feature/trips): pruebas de integración de viajes, cálculo de CO₂, alternativas y fallback OSRM, y corrección del flag de optimización IA.');
  li('PR #6 (feature/rewards): pruebas de integración del controlador de recompensas, canjes y CRUD administrativo.');

  // ---------- 4.2.2.3 ----------
  h4('4.2.2.3 Execution Evidence for Sprint Review');
  p('El producto fue verificado de forma integral mediante tres componentes de ejecución:');
  li('Ejecución local automatizada: ./mvnw clean test con 28 pruebas en verde (0 fallas, 0 errores), cubriendo autenticación, rutas, viajes, recompensas, retos, ranking y cálculo de emisiones.');
  li('Ambiente productivo en Render: GET https://ecocommute-backend-a14m.onrender.com/health responde {"status":"UP"} y POST /api/v1/auth/login devuelve un token JWT válido.');
  li('Landing page en GitHub Pages: https://lappwv.github.io/eco-commute/, con capturas y catálogo demostrativo consistentes con el backend.');

  // ---------- 4.2.2.4 ----------
  h4('4.2.2.4 Services Documentation Evidence for Sprint Review');
  p('La documentación interactiva OpenAPI / Swagger UI en https://ecocommute-backend-a14m.onrender.com/swagger-ui.html refleja la superficie acotada de 25 rutas expuestas (24 bajo /api/v1 y GET /health), con esquemas de entrada y salida, códigos de estado HTTP y requerimientos de autorización JWT consistentes con las historias de usuario HU01 a HU14.');

  // ---------- 4.2.2.5 ----------
  h4('4.2.2.5 Software Deployment Evidence for Sprint Review');
  p('El despliegue en Render se encuentra automatizado mediante el Blueprint render.yaml. Cada integración de Pull Request a la rama main dispara automáticamente un nuevo ciclo de build y deploy, manteniendo sincronizado el contenedor Docker del backend (ecocommute-backend) y la base de datos PostgreSQL administrada (ecocommute-db) bajo el plan gratuito de Render.');

  // ---------- 4.2.2.6 ----------
  h4('4.2.2.6 Team Collaboration Insights during Sprint');
  p('Durante el Sprint 2 el equipo consolidó la comunicación mediante la revisión de Pull Requests entre pares. Se identificaron y resolvieron tempranamente divergencias en los controladores y se estandarizaron las respuestas de la API. Esta práctica permitió que cada integrante sustentara técnicamente los cambios de su feature y garantizó que la suite de pruebas se mantuviera en verde antes de cada despliegue a producción.');

  DocumentApp.getUi().alert('Sección Sprint 2 insertada correctamente.');
}
