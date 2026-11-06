import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { RouteOption, RoutePlanResponse, TransportMode } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

interface LimaPreset {
  label: string;
  corridorTag: string;
  originName: string;
  originLat: number;
  originLng: number;
  destName: string;
  destLat: number;
  destLng: number;
}

@Component({
  selector: 'app-routes-planner',
  standalone: true,
  imports: [CommonModule, FormsModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <!-- Cabecera con Corredores Rápidos en Línea (Sin tarjeta extra) -->
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="route" [size]="14"></app-icon>
            Simulador de Corredores Verdes · Lima
          </span>
          <h1 class="page-title">{{ i18n.t('routes.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('routes.subtitle') }}</p>
        </div>
        <div class="preset-chips-row">
          <button
            type="button"
            class="chip-btn"
            *ngFor="let p of presets; let idx = index"
            [class.active]="activePresetIndex === idx"
            (click)="applyPreset(p, idx)"
          >
            <strong>{{ p.label }}</strong>
            <small>{{ p.corridorTag }}</small>
          </button>
        </div>
      </div>

      <!-- 1. Escenario Unificado: Controles Verticales + Mapa Interactivo en un solo contenedor -->
      <div class="planner-unified-stage">
        <form (ngSubmit)="calculateRoutes()" class="planner-sidebar-form">
          <h3>Configura tu trayecto</h3>

          <div class="vertical-route-stops">
            <div class="form-group">
              <label>Punto de partida</label>
              <div class="input-with-icon">
                <app-icon name="pin" [size]="16"></app-icon>
                <input type="text" [(ngModel)]="originName" name="originName" required placeholder="Ej. San Isidro" />
              </div>
            </div>

            <div class="form-group">
              <label>Destino</label>
              <div class="input-with-icon">
                <app-icon name="flag" [size]="16"></app-icon>
                <input type="text" [(ngModel)]="destName" name="destName" required placeholder="Ej. Miraflores" />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Modo de traslado</label>
            <div class="mode-pills-vertical">
              <button
                type="button"
                class="mode-pill-row"
                [class.selected]="selectedProfile === 'BICYCLE'"
                (click)="selectedProfile = 'BICYCLE'; calculateRoutes()"
              >
                <app-icon name="bike" [size]="18"></app-icon>
                <span>Bicicleta</span>
                <small>0 g CO₂/km</small>
              </button>

              <button
                type="button"
                class="mode-pill-row"
                [class.selected]="selectedProfile === 'WALKING'"
                (click)="selectedProfile = 'WALKING'; calculateRoutes()"
              >
                <app-icon name="walk" [size]="18"></app-icon>
                <span>Caminata</span>
                <small>0 g CO₂/km</small>
              </button>

              <button
                type="button"
                class="mode-pill-row"
                [class.selected]="selectedProfile === 'CAR'"
                (click)="selectedProfile = 'CAR'; calculateRoutes()"
              >
                <app-icon name="car" [size]="18"></app-icon>
                <span>Auto (Ref.)</span>
                <small>170 g CO₂/km</small>
              </button>
            </div>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="enableAiOptimization" name="enableAi" />
            <span>Priorizar calles arboladas (+10 pts)</span>
          </label>

          <details class="coords-drawer">
            <summary>
              <app-icon name="sliders" [size]="14"></app-icon>
              <span>Coordenadas GPS manuales</span>
            </summary>
            <div class="coords-drawer-body">
              <div class="form-row-2">
                <div class="form-group">
                  <label>Lat. origen</label>
                  <input type="number" step="0.0001" [(ngModel)]="originLat" name="originLat" required />
                </div>
                <div class="form-group">
                  <label>Lng. origen</label>
                  <input type="number" step="0.0001" [(ngModel)]="originLng" name="originLng" required />
                </div>
              </div>
              <div class="form-row-2">
                <div class="form-group">
                  <label>Lat. destino</label>
                  <input type="number" step="0.0001" [(ngModel)]="destLat" name="destLat" required />
                </div>
                <div class="form-group">
                  <label>Lng. destino</label>
                  <input type="number" step="0.0001" [(ngModel)]="destLng" name="destLng" required />
                </div>
              </div>
            </div>
          </details>

          <button type="submit" class="btn-emerald full-width" [disabled]="loading">
            <app-icon name="route" [size]="17"></app-icon>
            <span>{{ loading ? 'Calculando...' : 'Actualizar mapa' }}</span>
          </button>
        </form>

        <div class="planner-map-pane">
          <div class="map-overlay-bar">
            <strong>{{ originName }} → {{ destName }}</strong>
            <div class="map-legend-pills">
              <span class="legend-chip eco"><i class="dot-green"></i> Corredor verde</span>
              <span class="legend-chip car"><i class="dot-red"></i> Tráfico auto</span>
            </div>
          </div>
          <div id="eco-leaflet-map" class="leaflet-box-tall"></div>
        </div>
      </div>

      <div class="toast-success" *ngIf="recordedBanner">
        <app-icon name="check" [size]="18"></app-icon>
        <span>{{ recordedBanner }}</span>
      </div>

      <!-- 2. Comparativa en 3 Columnas Verticales Lado a Lado (En vez de 3 bloques apilados) -->
      <div class="route-columns-3" *ngIf="planResult as res">
        <article
          class="route-vertical-col"
          *ngFor="let opt of getOrderedRoutes(res)"
          [class.recommended]="opt.id === res.recommendedRouteId || opt.isAiRecommended"
        >
          <div class="route-col-top">
            <div class="route-col-badges">
              <span class="route-mode-avatar" [class.car-mode]="opt.mode === 'CAR_SOLO'">
                <app-icon [name]="opt.mode" [size]="20"></app-icon>
              </span>
              <span class="badge-emerald" *ngIf="opt.id === res.recommendedRouteId || opt.isAiRecommended">
                ★ Recomendada
              </span>
              <span class="pts-pill" *ngIf="opt.potentialPoints > 0">+{{ opt.potentialPoints }} pts</span>
            </div>
            <h3>{{ opt.title }}</h3>
            <p class="route-summary">{{ opt.summary }}</p>
          </div>

          <!-- Lista Vertical de Datos para Lectura Rápida -->
          <ul class="route-vertical-stats">
            <li>
              <span>Distancia total</span>
              <strong>{{ opt.distanceKm }} km</strong>
            </li>
            <li>
              <span>Tiempo estimado</span>
              <strong>{{ opt.durationMinutes }} min</strong>
            </li>
            <li>
              <span>CO₂ evitado</span>
              <strong class="text-emerald">-{{ opt.co2SavedGrams }} g</strong>
            </li>
            <li>
              <span>Energía activa</span>
              <strong>{{ opt.caloriesBurned }} kcal</strong>
            </li>
            <li *ngIf="opt.aiInsight as ai">
              <span>Índice verde / Sombra</span>
              <strong>{{ ai.greenScore }}/100 · {{ ai.shadeTreeCoveragePercent }}% árboles</strong>
            </li>
          </ul>

          <button
            type="button"
            class="btn-outline full-width"
            [class.btn-emerald]="opt.id === res.recommendedRouteId || opt.isAiRecommended"
            (click)="recordThisRoute(opt)"
          >
            <app-icon name="check" [size]="16"></app-icon>
            <span>Anotar este viaje (+{{ opt.potentialPoints }} pts)</span>
          </button>
        </article>
      </div>
    </section>
  `
})
export class RoutesPlannerComponent implements OnInit, AfterViewInit {
  originName = 'San Isidro (Centro Financiero)';
  originLat = -12.0965;
  originLng = -77.0285;
  destName = 'Miraflores (Parque Kennedy)';
  destLat = -12.1215;
  destLng = -77.0298;
  selectedProfile: 'BICYCLE' | 'WALKING' | 'CAR' = 'BICYCLE';
  enableAiOptimization = true;
  loading = false;
  planResult: RoutePlanResponse | null = null;
  recordedBanner = '';
  activePresetIndex = 0;

  presets: LimaPreset[] = [
    {
      label: 'San Isidro → Miraflores',
      corridorTag: '3.6 km',
      originName: 'San Isidro (Centro Financiero)',
      originLat: -12.0965,
      originLng: -77.0285,
      destName: 'Miraflores (Parque Kennedy)',
      destLat: -12.1215,
      destLng: -77.0298
    },
    {
      label: 'Jesús María → San Isidro',
      corridorTag: '4.2 km',
      originName: 'Av. Salaverry (Jesús María)',
      originLat: -12.085,
      originLng: -77.045,
      destName: 'San Isidro (Óvalo Gutiérrez)',
      destLat: -12.1112,
      destLng: -77.0365
    },
    {
      label: 'Miraflores → Barranco',
      corridorTag: '3.1 km',
      originName: 'Parque Kennedy (Miraflores)',
      originLat: -12.1215,
      originLng: -77.0298,
      destName: 'Plaza de Barranco',
      destLat: -12.1492,
      destLng: -77.0218
    },
    {
      label: 'UNMSM → Centro',
      corridorTag: '5.4 km',
      originName: 'Ciudad Universitaria',
      originLat: -12.056,
      originLng: -77.0845,
      destName: 'Plaza San Martín (Cercado)',
      destLat: -12.0515,
      destLng: -77.0346
    }
  ];

  private isBrowser = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private L: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private map: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private polylines: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private api: ApiService,
    public i18n: I18nService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.calculateRoutes();
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;
    try {
      const leafletModule = await import('leaflet');
      this.L = leafletModule.default || leafletModule;
      this.initMap();
      if (this.planResult) {
        this.drawRoutesOnMap(this.planResult);
      }
    } catch {
      // Fallback if leaflet fails in headless test
    }
  }

  applyPreset(p: LimaPreset, idx: number): void {
    this.activePresetIndex = idx;
    this.originName = p.originName;
    this.originLat = p.originLat;
    this.originLng = p.originLng;
    this.destName = p.destName;
    this.destLat = p.destLat;
    this.destLng = p.destLng;
    this.calculateRoutes();
  }

  calculateRoutes(): void {
    this.loading = true;
    this.api
      .planRoutes({
        origin: { latitude: this.originLat, longitude: this.originLng },
        destination: { latitude: this.destLat, longitude: this.destLng },
        selectedProfile: this.selectedProfile,
        enableAiOptimization: this.enableAiOptimization
      })
      .subscribe(res => {
        this.planResult = res;
        this.loading = false;
        this.drawRoutesOnMap(res);
      });
  }

  getOrderedRoutes(res: RoutePlanResponse): RouteOption[] {
    return [res.aiGreenCorridorRoute, res.standardProfileRoute, res.baselineCarRoute];
  }

  recordThisRoute(opt: RouteOption): void {
    const mode: TransportMode = opt.mode || 'BICYCLE';
    this.api
      .recordTrip({
        transportMode: mode,
        originName: this.originName,
        originLat: this.originLat,
        originLng: this.originLng,
        destinationName: this.destName,
        destinationLat: this.destLat,
        destinationLng: this.destLng,
        distanceKm: opt.distanceKm,
        durationMinutes: opt.durationMinutes
      })
      .subscribe(saved => {
        this.recordedBanner = `Recorrido guardado en tu bitácora: evitaste ${saved.co2SavedGrams} g de CO₂ y sumaste +${saved.pointsEarned} pts.`;
        setTimeout(() => this.router.navigate(['/trips']), 1200);
      });
  }

  private initMap(): void {
    if (!this.L || this.map) return;
    const container = document.getElementById('eco-leaflet-map');
    if (!container) return;
    this.map = this.L.map(container).setView([this.originLat, this.originLng], 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private drawRoutesOnMap(res: RoutePlanResponse): void {
    if (!this.L || !this.map) return;
    for (const layer of this.polylines) {
      this.map.removeLayer(layer);
    }
    this.polylines = [];

    const drawPoly = (coords: number[][], color: string, weight: number, dashArray?: string) => {
      if (!coords?.length) return;
      const poly = this.L.polyline(coords, { color, weight, dashArray }).addTo(this.map);
      this.polylines.push(poly);
    };

    drawPoly(res.baselineCarRoute?.pathCoordinates, '#dc2626', 3, '6, 8');
    drawPoly(res.standardProfileRoute?.pathCoordinates, '#2563eb', 4);
    drawPoly(res.aiGreenCorridorRoute?.pathCoordinates, '#15803D', 6);

    if (res.aiGreenCorridorRoute?.pathCoordinates?.length) {
      const bounds = this.L.latLngBounds(res.aiGreenCorridorRoute.pathCoordinates);
      this.map.fitBounds(bounds, { padding: [28, 28] });
    }
  }
}
