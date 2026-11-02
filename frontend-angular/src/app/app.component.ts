import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface CorridorData {
  routeTitle: string;
  coords: string;
  km: number;
  origin: [number, number];
  dest: [number, number];
  originTag: string;
  destTag: string;
  bikeMin: number;
  carMin: number;
  moneySaved: string;
  gemini: string;
  ecoWaypoints: [number, number][];
  carWaypoints: [number, number][];
}

interface VehicleSpec {
  key: string;
  name: string;
  badge: string;
  isDanger: boolean;
  speed: string;
  space: string;
  pts: string;
  code: string;
  chassis: string;
  laneSummary: string;
  desc: string;
  imgSrc: string;
}

interface VRPovMode {
  speedFactor: number;
  laneOffset: number;
  stepBob: number;
  gateTags: string[];
  co2: string;
  time: string;
  money: string;
  pts: string;
  caption: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser = false;
  activeTheme: 'light' | 'dark' = 'light';
  currentLang: 'es' | 'en' = 'es';

  // Hero & Map
  currentCorridorKey: 'miraflores' | 'upc' | 'jesusmaria' | 'barranco' = 'miraflores';
  currentKm = 4.2;
  sessionRecycledGrams = 1920;
  sessionTripsCount = 4;
  tripLoggedMessage = '';

  corridors: Record<string, CorridorData> = {
    miraflores: {
      routeTitle: 'Miraflores → San Isidro',
      coords: 'Ciclovía Av. Arequipa · 4.2 km',
      km: 4.2,
      origin: [-12.1198, -77.0295],
      dest: [-12.0945, -77.0336],
      originTag: 'Óvalo Miraflores',
      destTag: 'San Isidro (C. Financiero)',
      bikeMin: 14,
      carMin: 22,
      moneySaved: 'S/ 8.50',
      gemini: 'Recorrido directo por la berma central de Av. Arequipa desde el Óvalo de Miraflores hasta el centro financiero de San Isidro.',
      ecoWaypoints: [
        [-12.1198, -77.0295],
        [-12.1125, -77.0315],
        [-12.1032, -77.0326],
        [-12.0945, -77.0336]
      ],
      carWaypoints: [
        [-12.1198, -77.0285],
        [-12.1145, -77.0272],
        [-12.1062, -77.0286],
        [-12.0975, -77.0318],
        [-12.0945, -77.0336]
      ]
    },
    upc: {
      routeTitle: 'Monterrico → San Borja',
      coords: 'Eje Primavera · 5.8 km',
      km: 5.8,
      origin: [-12.1052, -76.9635],
      dest: [-12.1072, -77.0015],
      originTag: 'Monterrico (UPC)',
      destTag: 'San Borja (Tren L1)',
      bikeMin: 19,
      carMin: 34,
      moneySaved: 'S/ 11.20',
      gemini: 'Conexión estratégica por la berma de Av. Primavera; ahorras más de 15 minutos frente al atasco del Puente Primavera.',
      ecoWaypoints: [
        [-12.1052, -76.9635],
        [-12.1082, -76.9745],
        [-12.1098, -76.9882],
        [-12.1072, -77.0015]
      ],
      carWaypoints: [
        [-12.1052, -76.9635],
        [-12.1115, -76.9715],
        [-12.1132, -76.9855],
        [-12.1095, -76.9965],
        [-12.1072, -77.0015]
      ]
    },
    jesusmaria: {
      routeTitle: 'Jesús María → Lince',
      coords: 'Corredor Salaverry · 3.4 km',
      km: 3.4,
      origin: [-12.0725, -77.0465],
      dest: [-12.0875, -77.0352],
      originTag: 'Plaza San José',
      destTag: 'Parque de los Bomberos',
      bikeMin: 11,
      carMin: 18,
      moneySaved: 'S/ 6.80',
      gemini: 'Ruta sombreada por la arboleda de Salaverry con ciclovía segregada sin contacto con el tráfico vehicular.',
      ecoWaypoints: [
        [-12.0725, -77.0465],
        [-12.0782, -77.0425],
        [-12.0835, -77.0388],
        [-12.0875, -77.0352]
      ],
      carWaypoints: [
        [-12.0725, -77.0465],
        [-12.0765, -77.0402],
        [-12.0815, -77.0365],
        [-12.0875, -77.0352]
      ]
    },
    barranco: {
      routeTitle: 'Barranco → Miraflores',
      coords: 'Malecón Costero · 2.9 km',
      km: 2.9,
      origin: [-12.1485, -77.0215],
      dest: [-12.1285, -77.0345],
      originTag: 'Plaza de Barranco',
      destTag: 'Parque del Amor',
      bikeMin: 10,
      carMin: 16,
      moneySaved: 'S/ 6.50',
      gemini: 'Ciclovía panorámica frente al mar desde la Plaza de Barranco por el Malecón Paul Harris y Bulevar Armendáriz.',
      ecoWaypoints: [
        [-12.1485, -77.0215],
        [-12.1415, -77.0245],
        [-12.1345, -77.0298],
        [-12.1285, -77.0345]
      ],
      carWaypoints: [
        [-12.1485, -77.0215],
        [-12.1432, -77.0218],
        [-12.1365, -77.0265],
        [-12.1315, -77.0322],
        [-12.1285, -77.0345]
      ]
    }
  };

  private mapInstance: L.Map | null = null;
  private routeLayerGroup: L.LayerGroup | null = null;

  // VR Simulator
  currentVRPov: 'bike' | 'walk' | 'scooter' | 'car' = 'bike';
  isVRStereo = false;
  @ViewChild('vrCanvas') vrCanvasRef!: ElementRef<HTMLCanvasElement>;
  private vrAnimId: number | null = null;
  private vrCtx: CanvasRenderingContext2D | null = null;
  private vrYawDeg = 0;
  private vrPitchDeg = 0;
  private vrStepPhase = 0;
  private vrIsDragging = false;
  private vrLastX = 0;
  private vrLastY = 0;

  vrPovModes: Record<string, VRPovMode> = {
    bike: {
      speedFactor: 4.4,
      laneOffset: -68,
      stepBob: 0.25,
      gateTags: ['+15 pts', 'S/ 8.50 ahorro', '-638g CO₂', '8 botellas PET'],
      co2: '-638 g CO₂',
      time: '14 min · 18 km/h',
      money: 'S/ 8.50 · 115 kcal',
      pts: '+15 pts',
      caption: 'Ciclovía Av. Arequipa: avanzas fluido a 18 km/h mientras el tráfico vehicular está detenido.'
    },
    walk: {
      speedFactor: 1.85,
      laneOffset: -135,
      stepBob: 1.0,
      gateTags: ['0g emisiones', '+145 kcal', 'S/ 0.00 gasto', '+9 pts'],
      co2: '-274 g CO₂',
      time: '21 min · 5 km/h',
      money: 'S/ 0.00 · 145 kcal',
      pts: '+9 pts',
      caption: 'Vereda arbolada: caminas sin emisiones ni gasto de combustible sumando puntos en cada cuadra.'
    },
    scooter: {
      speedFactor: 4.9,
      laneOffset: -68,
      stepBob: 0.1,
      gateTags: ['0g emisiones', '-10 min tráfico', 'Conexión Metro', '+14 pts'],
      co2: '-638 g CO₂',
      time: '12 min · 20 km/h',
      money: 'S/ 7.80 ahorrados',
      pts: '+14 pts',
      caption: 'Micromovilidad eléctrica: conectas rápido desde el Metropolitano o Metro hasta tu destino a 20 km/h.'
    },
    car: {
      speedFactor: 0.85,
      laneOffset: 82,
      stepBob: 0.05,
      gateTags: ['+638g CO₂', 'Tráfico 11 km/h', '-S/ 8.50 gasto', '0 pts'],
      co2: '+638 g CO₂',
      time: '22 min · 11 km/h',
      money: 'S/ 8.50 en gasolina',
      pts: '0 pts',
      caption: 'Hora punta en auto: atrapado en congestión vehicular mientras la ciclovía fluye libre al costado.'
    }
  };

  // Vehicles
  currentVehicleKey = 'bike';
  vehRotX = -8;
  vehRotY = 14;
  private vehIsDragging = false;
  private vehStartX = 0;
  private vehStartY = 0;
  @ViewChild('transitCanvas') transitCanvasRef!: ElementRef<HTMLCanvasElement>;
  private laneAnimId: number | null = null;

  vehicles: VehicleSpec[] = [
    {
      key: 'bike',
      name: 'Bicicleta urbana',
      badge: '0 g CO₂ / km',
      isDanger: false,
      speed: '18 km/h',
      space: '1.5 m²',
      pts: '+15 pts / viaje',
      code: 'Bicicleta urbana · Rápido y sin tráfico',
      chassis: 'Espacio: 1.5 m² · Cero combustible',
      laneSummary: '30 ciclistas avanzan fluidos vs. tráfico detenido',
      desc: 'Cero emisiones, ahorras S/ 8.50 por viaje y evitas los cuellos de botella en hora punta.',
      imgSrc: './media/veh-bike.jpg'
    },
    {
      key: 'scooter',
      name: 'Scooter eléctrico',
      badge: '0 g CO₂ / km',
      isDanger: false,
      speed: '20 km/h',
      space: '1.2 m²',
      pts: '+14 pts / viaje',
      code: 'Scooter eléctrico · Ágil en última milla',
      chassis: 'Espacio: 1.2 m² · Conexión con Metro',
      laneSummary: '30 e-scooters = 0 humo · Ideal para distancias medias',
      desc: 'Ágil y fácil de combinar con el Metro o Metropolitano para cubrir la última milla sin esfuerzo.',
      imgSrc: './media/veh-scooter.jpg'
    },
    {
      key: 'transit',
      name: 'Bus / Tren eléctrico',
      badge: '-75% CO₂',
      isDanger: false,
      speed: '24 km/h',
      space: '0.8 m²',
      pts: '+10 pts / viaje',
      code: 'Bus / Tren eléctrico · Corredor segregado',
      chassis: 'Espacio por pasajero: 0.8 m² · Reemplaza 35 autos',
      laneSummary: '1 bus libera la avenida de hasta 35 autos particulares',
      desc: 'Para distancias largas, usar el Metropolitano o Metro reduce un 75% la huella frente al auto.',
      imgSrc: './media/veh-transit.jpg'
    },
    {
      key: 'car',
      name: 'Auto en hora punta',
      badge: '152 g CO₂',
      isDanger: true,
      speed: '12 km/h',
      space: '18.0 m²',
      pts: '0 pts (Tráfico)',
      code: 'Auto en hora punta · Congestión y emisiones',
      chassis: 'Ocupa 18 m² de vía · Consumo elevado en tráfico',
      laneSummary: '30 autos = fila detenida a 12 km/h en hora punta',
      desc: 'Avanza a solo 12 km/h promedio en congestión, ocupa 18 m² y emite 152 g de CO₂ por cada km.',
      imgSrc: './media/veh-car.jpg'
    }
  ];

  // Annual Calculator
  alchemyTrips = 6;
  alchemyKm = 4.2;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('ecocommute_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        this.setTheme(savedTheme);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initLeafletMap();
        this.initVRCommute();
        this.initLaneFlow();
        document.documentElement.classList.add('js-reveal-ready');
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.vrAnimId) cancelAnimationFrame(this.vrAnimId);
    if (this.laneAnimId) cancelAnimationFrame(this.laneAnimId);
    if (this.mapInstance) this.mapInstance.remove();
  }

  // Getters for computed values
  get currentCorridor(): CorridorData {
    return this.corridors[this.currentCorridorKey] || this.corridors['miraflores'];
  }

  get currentVehicle(): VehicleSpec {
    return this.vehicles.find(v => v.key === this.currentVehicleKey) || this.vehicles[0];
  }

  get currentVRPovData(): VRPovMode {
    return this.vrPovModes[this.currentVRPov] || this.vrPovModes['bike'];
  }

  get carCo2Grams(): number {
    return Math.round(this.currentKm * 152);
  }

  get greenPoints(): number {
    return Math.max(5, Math.round(this.currentKm * 3.57));
  }

  get petBottlesEquivalent(): number {
    return Math.max(1, Math.round(this.carCo2Grams / 82.8));
  }

  // Annual impact getters
  get annualKm(): number {
    return this.alchemyTrips * this.alchemyKm * 52;
  }

  get annualGrams(): number {
    return this.annualKm * 152;
  }

  get annualKg(): string {
    return (this.annualGrams / 1000).toFixed(1);
  }

  get annualFuelLiters(): number {
    return Math.round(this.annualKm * 0.065);
  }

  get annualTrafficHours(): number {
    return Math.round((this.alchemyTrips * 52 * (this.alchemyKm * 1.9)) / 60);
  }

  get annualPetBottles(): number {
    return Math.round(this.annualGrams / 82.8);
  }

  get annualTrees(): string {
    return (this.annualGrams / 21000).toFixed(1);
  }

  get annualGreenPoints(): number {
    return Math.round(this.annualKm * 3.57);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.activeTheme = theme;
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ecocommute_theme', theme);
    }
  }

  toggleLang(): void {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
  }

  selectCorridor(key: 'miraflores' | 'upc' | 'jesusmaria' | 'barranco'): void {
    this.currentCorridorKey = key;
    this.currentKm = this.corridors[key].km;
    this.renderMapRoute();
  }

  logTrip(): void {
    const earnedPts = this.greenPoints;
    this.sessionRecycledGrams += this.carCo2Grams;
    this.sessionTripsCount += 1;
    this.tripLoggedMessage = `+${earnedPts} pts registrados`;
    setTimeout(() => {
      this.tripLoggedMessage = '';
    }, 2500);
  }

  selectVehicle(key: string): void {
    this.currentVehicleKey = key;
    this.vehRotY = key === 'car' ? -16 : 16;
    this.vehRotX = -8;
  }

  setAlchemyPreset(trips: number, km: number): void {
    this.alchemyTrips = trips;
    this.alchemyKm = km;
  }

  // Leaflet Map Logic
  private initLeafletMap(): void {
    const mapEl = document.getElementById('lima-hero-map');
    if (!mapEl) return;

    this.mapInstance = L.map(mapEl, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    }).setView([-12.1075, -77.0315], 14);

    this.mapInstance.zoomControl.setPosition('topright');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.mapInstance);

    this.routeLayerGroup = L.layerGroup().addTo(this.mapInstance);
    this.renderMapRoute();
  }

  private renderMapRoute(): void {
    if (!this.mapInstance || !this.routeLayerGroup) return;
    this.routeLayerGroup.clearLayers();

    const corridor = this.currentCorridor;

    // Traffic polyline (dashed orange)
    L.polyline(corridor.carWaypoints, {
      color: '#EA580C',
      weight: 3.5,
      dashArray: '6, 8',
      opacity: 0.85
    }).addTo(this.routeLayerGroup);

    // Eco polyline (solid green)
    L.polyline(corridor.ecoWaypoints, {
      color: '#22C55E',
      weight: 5.5,
      opacity: 0.95
    }).addTo(this.routeLayerGroup);

    const originIcon = L.divIcon({
      className: 'lima-pin-wrap',
      html: `<div class="lima-pin-badge origin"><span class="lima-pin-dot"></span>${corridor.originTag}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    const destIcon = L.divIcon({
      className: 'lima-pin-wrap',
      html: `<div class="lima-pin-badge dest"><span class="lima-pin-dot"></span>${corridor.destTag}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    L.marker(corridor.origin, { icon: originIcon }).addTo(this.routeLayerGroup);
    L.marker(corridor.dest, { icon: destIcon }).addTo(this.routeLayerGroup);

    const bounds = L.latLngBounds([corridor.origin, corridor.dest]);
    this.mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.mapInstance) {
      this.mapInstance.invalidateSize();
      this.renderMapRoute();
    }
  }

  // Vehicle Turntable Mouse/Touch interaction
  onVehPointerDown(e: PointerEvent): void {
    this.vehIsDragging = true;
    this.vehStartX = e.clientX;
    this.vehStartY = e.clientY;
  }

  onVehPointerMove(e: PointerEvent): void {
    if (!this.vehIsDragging) return;
    const dx = e.clientX - this.vehStartX;
    const dy = e.clientY - this.vehStartY;
    this.vehStartX = e.clientX;
    this.vehStartY = e.clientY;
    this.vehRotY = Math.max(-42, Math.min(42, this.vehRotY + dx * 0.45));
    this.vehRotX = Math.max(-28, Math.min(28, this.vehRotX - dy * 0.35));
  }

  onVehPointerUp(): void {
    this.vehIsDragging = false;
  }

  // VR Canvas Simulator Logic
  selectVRPov(mode: 'bike' | 'walk' | 'scooter' | 'car'): void {
    this.currentVRPov = mode;
  }

  toggleVRStereo(): void {
    this.isVRStereo = !this.isVRStereo;
  }

  toggleVRFullscreen(): void {
    const shell = document.getElementById('vr-commute-shell');
    if (!shell) return;
    if (!document.fullscreenElement && shell.requestFullscreen) {
      shell.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  onVRPointerDown(e: PointerEvent): void {
    this.vrIsDragging = true;
    this.vrLastX = e.clientX;
    this.vrLastY = e.clientY;
  }

  onVRPointerMove(e: PointerEvent): void {
    if (!this.vrIsDragging) return;
    const dx = e.clientX - this.vrLastX;
    const dy = e.clientY - this.vrLastY;
    this.vrLastX = e.clientX;
    this.vrLastY = e.clientY;
    this.vrYawDeg = Math.max(-55, Math.min(55, this.vrYawDeg - dx * 0.28));
    this.vrPitchDeg = Math.max(-24, Math.min(24, this.vrPitchDeg - dy * 0.2));
  }

  onVRPointerUp(): void {
    this.vrIsDragging = false;
  }

  private initVRCommute(): void {
    if (!this.vrCanvasRef) return;
    const canvas = this.vrCanvasRef.nativeElement;
    this.vrCtx = canvas.getContext('2d');
    if (!this.vrCtx) return;

    let roadScrollZ = 0;
    const buildings = Array.from({ length: 14 }, (_, i) => {
      const isLeft = i % 2 === 0;
      const palette = ['#d8d0c1', '#c7beb0', '#dfd7c8', '#b9b1a3'];
      return {
        isLeft,
        xInner: isLeft ? -235 : 225,
        width: 115 + (i % 3) * 28,
        depth: 110,
        h: 190 + (i % 4) * 58,
        z: Math.floor(i / 2) * 200 + 110,
        colorFront: palette[i % palette.length],
        colorSide: isLeft ? '#b5ad9e' : '#c2baab'
      };
    });

    const fellowCyclists = [
      { x: -66, z: 240, jacket: '#d84a27' },
      { x: -72, z: 690, jacket: '#286646' },
      { x: -64, z: 1150, jacket: '#c88a1b' }
    ];

    const render = () => {
      if (!this.vrCtx) return;
      const ctx = this.vrCtx;
      const w = canvas.width;
      const h = canvas.height;

      const modeSpec = this.currentVRPovData;
      roadScrollZ = (roadScrollZ + modeSpec.speedFactor) % 40;
      this.vrStepPhase += modeSpec.speedFactor * 0.05;

      ctx.clearRect(0, 0, w, h);

      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
      skyGrad.addColorStop(0, '#5ea8c9');
      skyGrad.addColorStop(1, '#dfebe5');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Ground / Road base
      const horizonY = h * 0.47 + this.vrPitchDeg * 3.2;
      ctx.fillStyle = '#26292c';
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // Bike lane green strip
      ctx.fillStyle = '#236e47';
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - 120, h);
      ctx.lineTo(w * 0.5 + 20, h);
      ctx.lineTo(w * 0.5 - this.vrYawDeg * 2.5 + 5, horizonY);
      ctx.lineTo(w * 0.5 - this.vrYawDeg * 2.5 - 25, horizonY);
      ctx.closePath();
      ctx.fill();

      // Simple 3D building perspective cues
      for (const b of buildings) {
        const bz = (b.z - roadScrollZ * 8) % 1400 + 100;
        const scale = 320 / bz;
        const bx = w * 0.5 - this.vrYawDeg * 3.8 + b.xInner * scale;
        const by = horizonY;
        const bw = b.width * scale;
        const bh = b.h * scale;

        ctx.fillStyle = b.colorFront;
        ctx.fillRect(bx, by - bh, bw, bh);
      }

      // Cyclist in front
      for (const cy of fellowCyclists) {
        const cz = (cy.z - roadScrollZ * 4) % 1200 + 80;
        const scale = 320 / cz;
        const cx = w * 0.5 - this.vrYawDeg * 3.8 + cy.x * scale;
        const cyY = horizonY + 22 * scale;
        ctx.fillStyle = cy.jacket;
        ctx.beginPath();
        ctx.arc(cx, cyY - 25 * scale, 9 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      this.vrAnimId = requestAnimationFrame(render);
    };

    this.vrAnimId = requestAnimationFrame(render);
  }

  // Live Lane Flow Simulation Canvas
  private initLaneFlow(): void {
    if (!this.transitCanvasRef) return;
    const canvas = this.transitCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ecoUnits = Array.from({ length: 8 }, (_, i) => ({ x: i * 86, speed: 2.35 }));
    const carUnits = Array.from({ length: 9 }, (_, i) => ({ x: i * 74, speed: 0.55 }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1f2327';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(40, 102, 70, 0.25)';
      ctx.fillRect(0, 0, canvas.width, 54);

      ctx.strokeStyle = '#e59a23';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.moveTo(0, 58);
      ctx.lineTo(canvas.width, 58);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#d8e6dd';
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.fillText('CICLOVÍA / VÍA SOSTENIBLE (18–24 km/h · 0g CO₂)', 12, 16);

      ctx.fillStyle = '#f4c7be';
      ctx.fillText('CARRIL DE AUTOS EN HORA PUNTA (12 km/h · 152g CO₂/km)', 12, 74);

      // Eco units
      for (const u of ecoUnits) {
        u.x = (u.x + u.speed) % (canvas.width + 40);
        const drawX = u.x - 20;
        ctx.fillStyle = '#489e6c';
        ctx.beginPath();
        ctx.roundRect(drawX, 24, 26, 18, 4);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 8px "JetBrains Mono", monospace';
        ctx.fillText(this.currentVehicleKey === 'transit' ? 'BUS' : 'BICI', drawX + 3, 36);
      }

      // Cars
      for (const c of carUnits) {
        c.x = (c.x + c.speed) % (canvas.width + 55);
        const drawX = c.x - 28;
        ctx.fillStyle = '#d84a27';
        ctx.beginPath();
        ctx.roundRect(drawX, 82, 46, 22, 4);
        ctx.fill();

        ctx.fillStyle = '#fff5f2';
        ctx.font = '700 8px "JetBrains Mono", monospace';
        ctx.fillText('152g', drawX + 10, 96);
      }

      this.laneAnimId = requestAnimationFrame(draw);
    };

    this.laneAnimId = requestAnimationFrame(draw);
  }
}
