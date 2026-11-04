import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { RouteOption, RoutePlanResponse } from '../../models/api.models';

interface LimaCorridorPreset {
  key: string;
  label: string;
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
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  template: `
    <section class="app-page-container" aria-labelledby="routes-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU03 · HU09 · OSRM Geospatial API + Google Gemini (gemini-1.5-flash)</span>
          <h1 id="routes-title">{{ i18n.t('routes.title') }}</h1>
          <p class="subtitle">{{ i18n.t('routes.subtitle') }}</p>
        </div>
        <span class="badge-pill">POST /api/v1/routes/plan</span>
      </div>

      <div class="grid-2-col">
        <!-- Panel de Configuración de Ruta -->
        <mat-card class="eco-mat-card">
          <h2>1. Selecciona Corredor en Lima o Coordenadas</h2>
          <div class="preset-chips-row">
            <button
              type="button"
              class="btn-chip"
              *ngFor="let p of presets"
              [class.active]="selectedPresetKey === p.key"
              (click)="applyPreset(p)"
            >
              📍 {{ p.label }}
            </button>
          </div>

          <form class="eco-form" (ngSubmit)="calculateRoutes()">
            <div class="form-row-2">
              <div class="form-group">
                <label for="origin-name">Origen</label>
                <input id="origin-name" type="text" name="originName" [(ngModel)]="originName" class="eco-input" required />
              </div>
              <div class="form-group">
                <label for="dest-name">Destino</label>
                <input id="dest-name" type="text" name="destName" [(ngModel)]="destName" class="eco-input" required />
              </div>
            </div>

            <div class="form-row-4">
              <div class="form-group">
                <label for="o-lat">Latitud Origen</label>
                <input id="o-lat" type="number" step="0.0001" name="originLat" [(ngModel)]="originLat" class="eco-input" />
              </div>
              <div class="form-group">
                <label for="o-lng">Longitud Origen</label>
                <input id="o-lng" type="number" step="0.0001" name="originLng" [(ngModel)]="originLng" class="eco-input" />
              </div>
              <div class="form-group">
                <label for="d-lat">Latitud Destino</label>
                <input id="d-lat" type="number" step="0.0001" name="destLat" [(ngModel)]="destLat" class="eco-input" />
              </div>
              <div class="form-group">
                <label for="d-lng">Longitud Destino</label>
                <input id="d-lng" type="number" step="0.0001" name="destLng" [(ngModel)]="destLng" class="eco-input" />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="profile-select">Modo de Transporte Objetivo</label>
                <select id="profile-select" name="selectedProfile" [(ngModel)]="selectedProfile" class="eco-input">
                  <option value="BICYCLE">🚲 Bicicleta Urbana (0g CO₂/km)</option>
                  <option value="WALKING">🚶 Caminata Peatonal (0g CO₂/km)</option>
                  <option value="CAR">🚗 Auto Comparativo (170g CO₂/km)</option>
                </select>
              </div>
              <label class="checkbox-label ai-toggle">
                <input type="checkbox" name="enableAi" [(ngModel)]="enableAiOptimization" />
                ✨ Activar Optimización con IA (Google Gemini 1.5 Flash)
              </label>
            </div>

            <button type="submit" class="btn-eco-primary full-width" [disabled]="loading">
              {{ loading ? 'Consultando OSRM y Google Gemini...' : '🔍 Calcular y Comparar Rutas Sostenibles' }}
            </button>
          </form>

          <!-- Explicación de Inteligencia Artificial Gemini -->
          <div class="ai-insight-box" *ngIf="planResponse?.aiGreenCorridorRoute?.aiInsight as insight">
            <div class="card-head-row">
              <span class="ai-badge">✨ Análisis de Google Gemini (gemini-1.5-flash)</span>
              <span class="green-score-pill">Green Score: {{ insight.greenScore }}/100</span>
            </div>
            <p class="ai-reasoning">{{ insight.ecoReasoning }}</p>
            <div class="insight-metrics-row">
              <span>🛡️ Seguridad vial: <strong>{{ insight.safetyRating }}/100</strong></span>
              <span>🌳 Cobertura arbórea: <strong>{{ insight.shadeTreeCoveragePercent }}%</strong></span>
              <span>🛣️ Infraestructura: <strong>{{ insight.cyclingInfrastructureQuality }}</strong></span>
              <span>❤️ Salud: <strong>{{ insight.healthBenefitSummary }}</strong></span>
            </div>
          </div>
        </mat-card>

        <!-- Mapa Interactivo Leaflet + Tarjetas Comparativas -->
        <div class="stack-col">
          <mat-card class="eco-mat-card map-wrapper-card">
            <div class="card-head-row">
              <h2>2. Trazado Geoespacial OSRM (OpenStreetMap)</h2>
              <span class="legend-inline">
                <span class="dot-green"></span> Corredor Verde IA
                <span class="dot-orange"></span> Tráfico Auto
              </span>
            </div>
            <div id="planner-leaflet-map" class="planner-map-box" aria-label="Mapa interactivo de rutas OSRM en Lima"></div>
          </mat-card>

          <div class="route-options-grid" *ngIf="planResponse">
            <mat-card
              class="route-option-card"
              *ngFor="let opt of routeOptions"
              [class.recommended]="opt.id === planResponse.recommendedRouteId"
            >
              <div class="route-opt-header">
                <strong>{{ opt.title }}</strong>
                <span class="pts-tag" *ngIf="opt.potentialPoints > 0">+{{ opt.potentialPoints }} pts verdes</span>
              </div>
              <p class="route-summary">{{ opt.summary }}</p>
              <div class="route-metrics">
                <span>📏 {{ opt.distanceKm }} km</span>
                <span>⏱️ {{ opt.durationMinutes }} min</span>
                <span>💨 Emitido: {{ opt.co2EmittedGrams }} g CO₂</span>
                <span class="saved-highlight">🌱 Ahorrado: {{ opt.co2SavedGrams }} g CO₂</span>
              </div>
              <button
                type="button"
                class="btn-eco-primary full-width"
                (click)="registerSelectedRoute(opt)"
              >
                ✅ Registrar este Viaje en mi Historial (HU04)
              </button>
            </mat-card>
          </div>

          <div *ngIf="tripSavedBanner" class="alert-success" role="status">
            {{ tripSavedBanner }}
          </div>
        </div>
      </div>
    </section>
  `
})
export class RoutesPlannerComponent implements AfterViewInit, OnDestroy {
  presets: LimaCorridorPreset[] = [
    {
      key: 'arequipa',
      label: 'Miraflores → San Isidro (Av. Arequipa)',
      originName: 'Óvalo de Miraflores',
      originLat: -12.1198,
      originLng: -77.0295,
      destName: 'Centro Financiero San Isidro',
      destLat: -12.0945,
      destLng: -77.0336
    },
    {
      key: 'upc',
      label: 'UPC Monterrico → San Borja (Av. Primavera)',
      originName: 'Campus UPC Monterrico',
      originLat: -12.1052,
      originLng: -76.9635,
      destName: 'Estación San Borja Sur (Metro L1)',
      destLat: -12.1072,
      destLng: -77.0015
    },
    {
      key: 'salaverry',
      label: 'Jesús María → Lince (Ciclovía Salaverry)',
      originName: 'Plaza San José (Jesús María)',
      originLat: -12.0725,
      originLng: -77.0465,
      destName: 'Parque Mariscal Castilla (Lince)',
      destLat: -12.0875,
      destLng: -77.0352
    },
    {
      key: 'malecon',
      label: 'Barranco → Miraflores (Malecón Costero)',
      originName: 'Plaza de Barranco',
      originLat: -12.1485,
      originLng: -77.0215,
      destName: 'Parque del Amor (Miraflores)',
      destLat: -12.1285,
      destLng: -77.0345
    }
  ];

  selectedPresetKey = 'arequipa';
  originName = this.presets[0].originName;
  originLat = this.presets[0].originLat;
  originLng = this.presets[0].originLng;
  destName = this.presets[0].destName;
  destLat = this.presets[0].destLat;
  destLng = this.presets[0].destLng;

  selectedProfile: 'BICYCLE' | 'WALKING' | 'CAR' = 'BICYCLE';
  enableAiOptimization = true;
  loading = false;
  tripSavedBanner = '';

  planResponse: RoutePlanResponse | null = null;
  routeOptions: RouteOption[] = [];

  private map: L.Map | null = null;
  private layerGroup: L.LayerGroup | null = null;

  constructor(private api: ApiService, public i18n: I18nService, private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      this.calculateRoutes();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  applyPreset(p: LimaCorridorPreset): void {
    this.selectedPresetKey = p.key;
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
    this.tripSavedBanner = '';
    this.api
      .planRoutes({
        origin: { latitude: this.originLat, longitude: this.originLng },
        destination: { latitude: this.destLat, longitude: this.destLng },
        selectedProfile: this.selectedProfile,
        enableAiOptimization: this.enableAiOptimization
      })
      .subscribe(res => {
        this.loading = false;
        this.planResponse = res;
        this.routeOptions = [res.aiGreenCorridorRoute, res.standardProfileRoute, res.baselineCarRoute];
        this.drawRoutesOnMap(res);
      });
  }

  registerSelectedRoute(opt: RouteOption): void {
    this.api
      .recordTrip({
        transportMode: opt.mode,
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
        this.tripSavedBanner = `¡Viaje registrado! Ahorraste ${saved.co2SavedGrams} g de CO₂ y ganaste +${saved.pointsEarned} puntos verdes.`;
      });
  }

  private initMap(): void {
    const el = document.getElementById('planner-leaflet-map');
    if (!el) return;
    this.map = L.map(el).setView([this.originLat, this.originLng], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }

  private drawRoutesOnMap(res: RoutePlanResponse): void {
    if (!this.map || !this.layerGroup) return;
    this.layerGroup.clearLayers();

    const carCoords = (res.baselineCarRoute.pathCoordinates || []).map(c => [c[0], c[1]] as [number, number]);
    const greenCoords = (res.aiGreenCorridorRoute.pathCoordinates || []).map(c => [c[0], c[1]] as [number, number]);

    if (carCoords.length > 1) {
      L.polyline(carCoords, { color: '#EA580C', weight: 3.5, dashArray: '6, 8', opacity: 0.85 }).addTo(this.layerGroup);
    }
    if (greenCoords.length > 1) {
      L.polyline(greenCoords, { color: '#16A34A', weight: 6, opacity: 0.95 }).addTo(this.layerGroup);
    }

    L.circleMarker([this.originLat, this.originLng], {
      radius: 8,
      color: '#15803D',
      fillColor: '#22C55E',
      fillOpacity: 1
    })
      .bindPopup(`<b>Origen:</b> ${this.originName}`)
      .addTo(this.layerGroup);

    L.circleMarker([this.destLat, this.destLng], {
      radius: 8,
      color: '#0F172A',
      fillColor: '#EA580C',
      fillOpacity: 1
    })
      .bindPopup(`<b>Destino:</b> ${this.destName}`)
      .addTo(this.layerGroup);

    const bounds = L.latLngBounds([
      [this.originLat, this.originLng],
      [this.destLat, this.destLng]
    ]);
    this.map.fitBounds(bounds, { padding: [36, 36], maxZoom: 15 });
  }
}
