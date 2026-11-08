import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { RouteOption, RoutePlanResponse, TransportMode } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';
import { CountUpDirective } from '../../directives/count-up.directive';

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
  imports: [
    CommonModule,
    FormsModule,
    EcoIconComponent,
    CountUpDirective,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <section class="page-section">
      <!-- Cabecera con Corredores Rápidos en Línea (Sin tarjeta extra) -->
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="route" [size]="14"></app-icon>
            {{ i18n.t('routes.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('routes.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('routes.subtitle') }}</p>
        </div>
        <div class="preset-chips-row" role="group" [attr.aria-label]="i18n.t('routes.presetsAria')">
          <button
            type="button"
            class="chip-btn"
            *ngFor="let p of presets; let idx = index"
            [attr.aria-pressed]="activePresetIndex === idx"
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
          <h3>{{ i18n.t('routes.configureTrip') }}</h3>

          <div class="vertical-route-stops">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ i18n.t('routes.origin') }}</mat-label>
              <app-icon matPrefix name="pin" [size]="16"></app-icon>
              <input matInput type="text" [(ngModel)]="originName" name="originName" required [placeholder]="i18n.t('routes.originPlaceholder')" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ i18n.t('routes.destination') }}</mat-label>
              <app-icon matPrefix name="flag" [size]="16"></app-icon>
              <input matInput type="text" [(ngModel)]="destName" name="destName" required [placeholder]="i18n.t('routes.destinationPlaceholder')" />
            </mat-form-field>
          </div>

          <div class="form-group">
            <label>{{ i18n.t('routes.travelMode') }}</label>
            <div class="mode-pills-vertical" role="group" [attr.aria-label]="i18n.t('routes.travelMode')">
              <button
                type="button"
                class="mode-pill-row"
                [attr.aria-pressed]="selectedProfile === 'BICYCLE'"
                [class.selected]="selectedProfile === 'BICYCLE'"
                (click)="selectedProfile = 'BICYCLE'; calculateRoutes()"
              >
                <app-icon name="bike" [size]="18"></app-icon>
                <span>{{ i18n.t('routes.modeBike') }}</span>
                <small>0 g CO₂/km</small>
              </button>

              <button
                type="button"
                class="mode-pill-row"
                [attr.aria-pressed]="selectedProfile === 'WALKING'"
                [class.selected]="selectedProfile === 'WALKING'"
                (click)="selectedProfile = 'WALKING'; calculateRoutes()"
              >
                <app-icon name="walk" [size]="18"></app-icon>
                <span>{{ i18n.t('routes.modeWalk') }}</span>
                <small>0 g CO₂/km</small>
              </button>

              <button
                type="button"
                class="mode-pill-row"
                [attr.aria-pressed]="selectedProfile === 'CAR'"
                [class.selected]="selectedProfile === 'CAR'"
                (click)="selectedProfile = 'CAR'; calculateRoutes()"
              >
                <app-icon name="car" [size]="18"></app-icon>
                <span>{{ i18n.t('routes.modeCar') }}</span>
                <small>170 g CO₂/km</small>
              </button>
            </div>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="enableAiOptimization" name="enableAi" />
            <span>{{ i18n.t('routes.prioritizeTrees') }}</span>
          </label>

          <details class="coords-drawer">
            <summary>
              <app-icon name="sliders" [size]="14"></app-icon>
              <span>{{ i18n.t('routes.manualGps') }}</span>
            </summary>
            <div class="coords-drawer-body">
              <div class="form-row-2">
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('routes.latOrigin') }}</mat-label>
                  <input matInput type="number" step="0.0001" [(ngModel)]="originLat" name="originLat" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('routes.lngOrigin') }}</mat-label>
                  <input matInput type="number" step="0.0001" [(ngModel)]="originLng" name="originLng" required />
                </mat-form-field>
              </div>
              <div class="form-row-2">
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('routes.latDest') }}</mat-label>
                  <input matInput type="number" step="0.0001" [(ngModel)]="destLat" name="destLat" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('routes.lngDest') }}</mat-label>
                  <input matInput type="number" step="0.0001" [(ngModel)]="destLng" name="destLng" required />
                </mat-form-field>
              </div>
            </div>
          </details>

          <button mat-flat-button color="primary" type="submit" class="btn-emerald full-width" [disabled]="loading">
            <app-icon name="route" [size]="17"></app-icon>
            <span>{{ loading ? i18n.t('routes.calculating') : i18n.t('routes.updateMap') }}</span>
          </button>

          <div class="saving-teaser" *ngIf="planResult as r">
            <svg class="teaser-leaf leaf-1" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 10 5 20 4c0 10-4 15-13 15z" fill="currentColor" /></svg>
            <svg class="teaser-leaf leaf-2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 10 5 20 4c0 10-4 15-13 15z" fill="currentColor" /></svg>
            <svg class="teaser-leaf leaf-3" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 10 5 20 4c0 10-4 15-13 15z" fill="currentColor" /></svg>
            <small>{{ i18n.t('routes.savingsTeaser') }}</small>
            <strong><span [appCountUp]="r.aiGreenCorridorRoute.co2SavedGrams"></span> g de CO₂</strong>
            <span class="teaser-pts">+<span [appCountUp]="r.aiGreenCorridorRoute.potentialPoints"></span> {{ i18n.t('routes.savingsPts') }}</span>
          </div>
        </form>

        <div class="planner-map-pane">
          <div class="map-overlay-bar">
            <strong>{{ originName }} → {{ destName }}</strong>
            <div class="map-legend-pills">
              <span class="legend-chip eco"><i class="dot-green"></i> {{ i18n.t('routes.legendGreen') }}</span>
              <span class="legend-chip car"><i class="dot-red"></i> {{ i18n.t('routes.legendCar') }}</span>
            </div>
          </div>
          <div class="map-loading-bar" *ngIf="loading"></div>
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
                {{ i18n.t('routes.recommended') }}
              </span>
              <span class="pts-pill" *ngIf="opt.potentialPoints > 0">+<span [appCountUp]="opt.potentialPoints"></span> pts</span>
            </div>
            <h3>{{ translateRouteTitle(opt) }}</h3>
            <p class="route-summary">{{ translateRouteSummary(opt) }}</p>
          </div>

          <!-- Lista Vertical de Datos para Lectura Rápida -->
          <ul class="route-vertical-stats">
            <li>
              <span>{{ i18n.t('routes.distanceTotal') }}</span>
              <strong><span [appCountUp]="opt.distanceKm" [decimals]="2"></span> km</strong>
            </li>
            <li>
              <span>{{ i18n.t('routes.timeEstimate') }}</span>
              <strong><span [appCountUp]="opt.durationMinutes"></span> min</strong>
            </li>
            <li>
              <span>{{ i18n.t('routes.co2Avoided') }}</span>
              <strong class="text-emerald">-<span [appCountUp]="opt.co2SavedGrams"></span> g</strong>
            </li>
            <li>
              <span>{{ i18n.t('routes.activeEnergy') }}</span>
              <strong><span [appCountUp]="opt.caloriesBurned"></span> kcal</strong>
            </li>
            <li *ngIf="opt.aiInsight as ai">
              <span>{{ i18n.t('routes.greenIndex') }}</span>
              <strong>{{ i18n.tn('routes.greenIndexValue', { green: ai.greenScore, shade: ai.shadeTreeCoveragePercent }) }}</strong>
            </li>
          </ul>

          <button
            mat-stroked-button
            type="button"
            class="btn-outline full-width"
            [class.btn-emerald]="opt.id === res.recommendedRouteId || opt.isAiRecommended"
            (click)="recordThisRoute(opt)"
          >
            <app-icon name="check" [size]="16"></app-icon>
            <span>{{ i18n.t('routes.recordTrip') }} (+{{ opt.potentialPoints }} pts)</span>
          </button>
        </article>
      </div>
    </section>
  `
})
export class RoutesPlannerComponent implements OnInit, AfterViewInit, OnDestroy {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private riderMarker: any = null;
  private riderFrame = 0;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private zone: NgZone,
    private api: ApiService,
    public i18n: I18nService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const rawPreset = this.route.snapshot.queryParamMap.get('preset');
    const idx = rawPreset !== null ? Number(rawPreset) : NaN;
    if (!Number.isNaN(idx) && idx >= 0 && idx < this.presets.length) {
      this.applyPreset(this.presets[idx], idx);
    } else {
      this.calculateRoutes();
    }
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

  // Los titulos/resumenes de ruta pueden venir del backend en espanol (sin codigo propio);
  // se traducen por id + modo, que son estables, en vez de parchear el texto recibido.
  translateRouteTitle(opt: RouteOption): string {
    if (opt.id === 'route-baseline-car') return this.i18n.t('routes.result.carTitle');
    if (opt.id === 'route-standard-direct') {
      return opt.mode === 'WALKING'
        ? this.i18n.t('routes.result.walkDirectTitle')
        : this.i18n.t('routes.result.bikeDirectTitle');
    }
    if (opt.id === 'route-ai-green-corridor') {
      return opt.isAiRecommended
        ? this.i18n.t('routes.result.greenRecommendedTitle')
        : this.i18n.t('routes.result.greenTitle');
    }
    return opt.title;
  }

  translateRouteSummary(opt: RouteOption): string {
    if (opt.id === 'route-baseline-car') return this.i18n.t('routes.result.carSummary');
    if (opt.id === 'route-standard-direct') return this.i18n.t('routes.result.directSummary');
    if (opt.id === 'route-ai-green-corridor') return this.i18n.t('routes.result.greenSummary');
    return opt.summary;
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
        this.recordedBanner = this.i18n.tn('routes.recordedMsg', {
          co2: saved.co2SavedGrams,
          points: saved.pointsEarned
        });
        setTimeout(() => this.router.navigate(['/trips']), 1200);
      });
  }

  ngOnDestroy(): void {
    this.stopRider();
  }

  private stopRider(): void {
    cancelAnimationFrame(this.riderFrame);
    if (this.riderMarker && this.map) {
      this.map.removeLayer(this.riderMarker);
    }
    this.riderMarker = null;
  }

  // Ciclista que recorre el corredor verde en bucle (fuera de la zona de Angular)
  private startRider(coords: number[][]): void {
    this.stopRider();
    if (!this.L || !this.map || !coords || coords.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Distancias acumuladas para avanzar a velocidad constante
    const cum: number[] = [0];
    for (let i = 1; i < coords.length; i++) {
      const dLat = coords[i][0] - coords[i - 1][0];
      const dLng = coords[i][1] - coords[i - 1][1];
      cum.push(cum[i - 1] + Math.hypot(dLat, dLng));
    }
    const total = cum[cum.length - 1];
    if (!total) return;

    const icon = this.L.divIcon({
      className: 'rider-marker',
      html: '<span class="rider-pulse"></span><span class="rider-dot"></span>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    this.riderMarker = this.L.marker(coords[0], { icon, interactive: false, keyboard: false }).addTo(this.map);

    const duration = 9000;
    const start = performance.now();
    this.zone.runOutsideAngular(() => {
      const step = (now: number): void => {
        const target = (((now - start) % duration) / duration) * total;
        let i = 1;
        while (i < cum.length - 1 && cum[i] < target) i++;
        const seg = cum[i] - cum[i - 1] || 1;
        const k = Math.min(Math.max((target - cum[i - 1]) / seg, 0), 1);
        const lat = coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * k;
        const lng = coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * k;
        this.riderMarker?.setLatLng([lat, lng]);
        this.riderFrame = requestAnimationFrame(step);
      };
      this.riderFrame = requestAnimationFrame(step);
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

      // Animación de trazado solo para líneas continuas (la punteada se queda como está)
      if (!dashArray) {
        const path = poly.getElement?.() as SVGPathElement | undefined;
        if (path) {
          path.setAttribute('pathLength', '1');
          path.classList.add('route-draw');
          path.addEventListener('animationend', () => path.classList.remove('route-draw'), { once: true });
        }
      }
    };

    drawPoly(res.baselineCarRoute?.pathCoordinates, '#dc2626', 3, '6, 8');
    drawPoly(res.standardProfileRoute?.pathCoordinates, '#2563eb', 4);
    drawPoly(res.aiGreenCorridorRoute?.pathCoordinates, '#15803D', 6);

    this.startRider(res.aiGreenCorridorRoute?.pathCoordinates);

    if (res.aiGreenCorridorRoute?.pathCoordinates?.length) {
      const bounds = this.L.latLngBounds(res.aiGreenCorridorRoute.pathCoordinates);
      this.map.fitBounds(bounds, { padding: [28, 28] });
    }
  }
}

