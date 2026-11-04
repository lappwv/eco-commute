import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="route" [size]="14"></app-icon>
            Simulador de Corredores Verdes · Lima
          </span>
          <h1 class="page-title">{{ i18n.t('routes.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('routes.subtitle') }}</p>
        </div>
      </div>

      <!-- Preset Corridors Strip -->
      <div class="preset-bar">
        <span class="preset-bar-label">
          <app-icon name="pin" [size]="15"></app-icon>
          <span>Corredores frecuentes en Lima:</span>
        </span>
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

      <div class="grid-planner">
        <!-- Left Form Panel -->
        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>Configura tu trayecto</h2>
              <p class="card-sub">Define tu punto de partida, destino y cómo prefieres moverte hoy</p>
            </div>
          </div>

          <form (ngSubmit)="calculateRoutes()" class="eco-form">
            <div class="route-timeline-inputs">
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
              <div class="mode-selector-grid">
                <button
                  type="button"
                  class="mode-select-card"
                  [class.selected]="selectedProfile === 'BICYCLE'"
                  (click)="selectedProfile = 'BICYCLE'; calculateRoutes()"
                >
                  <app-icon name="bike" [size]="20"></app-icon>
                  <span>Bicicleta</span>
                  <small>0 g CO₂/km</small>
                </button>

                <button
                  type="button"
                  class="mode-select-card"
                  [class.selected]="selectedProfile === 'WALKING'"
                  (click)="selectedProfile = 'WALKING'; calculateRoutes()"
                >
                  <app-icon name="walk" [size]="20"></app-icon>
                  <span>Caminata</span>
                  <small>0 g CO₂/km</small>
                </button>

                <button
                  type="button"
                  class="mode-select-card"
                  [class.selected]="selectedProfile === 'CAR'"
                  (click)="selectedProfile = 'CAR'; calculateRoutes()"
                >
                  <app-icon name="car" [size]="20"></app-icon>
                  <span>Auto (Ref.)</span>
                  <small>170 g CO₂/km</small>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="enableAiOptimization" name="enableAi" />
                <span>Priorizar calles arboladas y ciclovías segregadas (+10 pts extra)</span>
              </label>
            </div>

            <details class="coords-drawer">
              <summary>
                <app-icon name="sliders" [size]="14"></app-icon>
                <span>Ajustar coordenadas GPS manualmente</span>
              </summary>
              <div class="coords-drawer-body">
                <div class="form-row-2">
                  <div class="form-group">
                    <label>Latitud origen</label>
                    <input type="number" step="0.0001" [(ngModel)]="originLat" name="originLat" required />
                  </div>
                  <div class="form-group">
                    <label>Longitud origen</label>
                    <input type="number" step="0.0001" [(ngModel)]="originLng" name="originLng" required />
                  </div>
                </div>
                <div class="form-row-2">
                  <div class="form-group">
                    <label>Latitud destino</label>
                    <input type="number" step="0.0001" [(ngModel)]="destLat" name="destLat" required />
                  </div>
                  <div class="form-group">
                    <label>Longitud destino</label>
                    <input type="number" step="0.0001" [(ngModel)]="destLng" name="destLng" required />
                  </div>
                </div>
              </div>
            </details>

            <button type="submit" class="btn-emerald full-width" [disabled]="loading">
              <app-icon name="route" [size]="17"></app-icon>
              <span>{{ loading ? 'Calculando opciones...' : 'Actualizar comparación de rutas' }}</span>
            </button>
          </form>
        </article>

        <!-- Right Map & Route Comparison Panel -->
        <div class="stack-col">
          <article class="eco-card map-card">
            <div class="card-head-row">
              <div>
                <h2>Mapa del corredor: {{ originName }} → {{ destName }}</h2>
                <p class="card-sub">La línea verde muestra el corredor sostenible recomendado frente a la ruta vehicular</p>
              </div>
              <div class="map-legend-pills">
                <span class="legend-chip eco"><i class="dot-green"></i> Corredor verde</span>
                <span class="legend-chip car"><i class="dot-red"></i> Tráfico auto</span>
              </div>
            </div>
            <div id="eco-leaflet-map" class="leaflet-box"></div>
          </article>

          <div class="route-options-grid" *ngIf="planResult as res">
            <article
              class="eco-card route-option-card"
              *ngFor="let opt of getOrderedRoutes(res)"
              [class.recommended]="opt.id === res.recommendedRouteId || opt.isAiRecommended"
            >
              <div class="route-opt-header">
                <div class="route-title-row">
                  <span class="route-mode-avatar" [class.car-mode]="opt.mode === 'CAR_SOLO'">
                    <app-icon [name]="opt.mode" [size]="18"></app-icon>
                  </span>
                  <div>
                    <span class="badge-emerald" *ngIf="opt.id === res.recommendedRouteId || opt.isAiRecommended">
                      Recomendada
                    </span>
                    <h3>{{ opt.title }}</h3>
                  </div>
                </div>
                <span class="pts-pill" *ngIf="opt.potentialPoints > 0">
                  <app-icon name="bolt" [size]="13"></app-icon>
                  +{{ opt.potentialPoints }} pts
                </span>
              </div>

              <p class="route-summary">{{ opt.summary }}</p>

              <div class="route-metrics">
                <div>
                  <strong>{{ opt.distanceKm }} km</strong>
                  <span>Distancia</span>
                </div>
                <div>
                  <strong>{{ opt.durationMinutes }} min</strong>
                  <span>Tiempo est.</span>
                </div>
                <div>
                  <strong class="text-emerald">-{{ opt.co2SavedGrams }} g</strong>
                  <span>CO₂ evitado</span>
                </div>
                <div>
                  <strong>{{ opt.caloriesBurned }} kcal</strong>
                  <span>Energía activa</span>
                </div>
              </div>

              <div class="ai-insight-box" *ngIf="opt.aiInsight as ai">
                <div class="insight-metrics-row">
                  <span>
                    <app-icon name="leaf" [size]="13"></app-icon>
                    Índice verde: <strong>{{ ai.greenScore }}/100</strong>
                  </span>
                  <span>
                    <app-icon name="shield" [size]="13"></app-icon>
                    Seguridad vial: <strong>{{ ai.safetyRating }}/100</strong>
                  </span>
                  <span>
                    <app-icon name="tree" [size]="13"></app-icon>
                    Sombra arbórea: <strong>{{ ai.shadeTreeCoveragePercent }}%</strong>
                  </span>
                </div>
                <p>{{ ai.ecoReasoning }}</p>
              </div>

              <button
                type="button"
                class="btn-outline full-width"
                [class.btn-emerald]="opt.id === res.recommendedRouteId || opt.isAiRecommended"
                (click)="recordThisRoute(opt)"
              >
                <app-icon name="check" [size]="16"></app-icon>
                <span>Registrar este recorrido en mi bitácora (+{{ opt.potentialPoints }} pts)</span>
              </button>
            </article>
          </div>

          <div class="toast-success" *ngIf="recordedBanner">
            <app-icon name="check" [size]="18"></app-icon>
            <span>{{ recordedBanner }}</span>
          </div>
        </div>
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
      corridorTag: 'Eje Arequipa · 3.6 km',
      originName: 'San Isidro (Centro Financiero)',
      originLat: -12.0965,
      originLng: -77.0285,
      destName: 'Miraflores (Parque Kennedy)',
      destLat: -12.1215,
      destLng: -77.0298
    },
    {
      label: 'Jesús María → San Isidro',
      corridorTag: 'Ciclovía Salaverry · 4.2 km',
      originName: 'Av. Salaverry (Jesús María)',
      originLat: -12.085,
      originLng: -77.045,
      destName: 'San Isidro (Óvalo Gutiérrez)',
      destLat: -12.1112,
      destLng: -77.0365
    },
    {
      label: 'Miraflores → Barranco',
      corridorTag: 'Malecón Costero · 3.1 km',
      originName: 'Parque Kennedy (Miraflores)',
      originLat: -12.1215,
      originLng: -77.0298,
      destName: 'Plaza de Barranco',
      destLat: -12.1492,
      destLng: -77.0218
    },
    {
      label: 'UNMSM → Centro Histórico',
      corridorTag: 'Eje Colonial · 5.4 km',
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
