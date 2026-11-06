import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { AiRecommendation, CommunityImpact, DashboardSummary } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

interface QuickCorridorOption {
  index: number;
  origin: string;
  destination: string;
  distanceLabel: string;
  timeLabel: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EcoIconComponent],
  template: `
    <section class="page-section" *ngIf="summary as s">
      <!-- 1. Hero Ilustrado con Buscador Rápido de Ruta + Ilustración de Mapa, Ciclovía y Ciclista -->
      <div class="cartoon-hero-banner">
        <div class="cartoon-banner-copy">
          <span class="eyebrow-tag">
            <app-icon name="leaf" [size]="15"></app-icon>
            <span>¡Hola, {{ s.fullName }}! · Nivel {{ s.currentLevel }}</span>
          </span>
          <h1 class="cartoon-banner-title">PEDALEA, AHORRA Y CUIDA LIMA</h1>
          <p class="cartoon-banner-sub">
            Planifica tu ruta por ciclovías seguras, evita el tráfico vehicular y suma puntos verificados en cada recorrido para canjear en comercios aliados.
          </p>

          <!-- Buscador Rápido de Origen / Destino con Acción Principal "Iniciar ruta" -->
          <div class="quick-route-launcher" role="region" aria-label="Planificador rápido de ruta">
            <div class="quick-route-field">
              <span class="quick-route-label">
                <app-icon name="pin" [size]="14"></app-icon>
                <span>Corredor rápido (Origen → Destino)</span>
              </span>
              <select
                class="quick-route-select"
                [(ngModel)]="selectedQuickPreset"
                aria-label="Seleccionar ruta rápida en Lima"
              >
                <option *ngFor="let c of quickCorridors" [ngValue]="c.index">
                  {{ c.origin }} → {{ c.destination }} ({{ c.distanceLabel }} · {{ c.timeLabel }})
                </option>
              </select>
            </div>

            <button type="button" class="btn-start-route" (click)="launchQuickRoute()">
              <app-icon name="route" [size]="18"></app-icon>
              <span>Iniciar ruta</span>
            </button>
          </div>

          <!-- Guía informativa lineal de los 3 pasos (sin parecer pestañas sueltas) -->
          <div class="hero-steps-guide" aria-label="Cómo funciona en 3 pasos">
            <a routerLink="/routes" class="step-guide-item active-step">
              <span class="step-guide-num">1</span>
              <span>Planifica tu ruta</span>
            </a>
            <span class="step-guide-sep" aria-hidden="true">→</span>
            <a routerLink="/trips" class="step-guide-item">
              <span class="step-guide-num">2</span>
              <span>Anota tu viaje</span>
            </a>
            <span class="step-guide-sep" aria-hidden="true">→</span>
            <a routerLink="/rewards" class="step-guide-item">
              <span class="step-guide-num">3</span>
              <span>Canjea premios</span>
            </a>
          </div>
        </div>

        <!-- Ilustración Cartoon: Mapa con Pin de Destino, Ciclovía y Ciclista en Movimiento -->
        <div class="cartoon-banner-art" aria-hidden="true">
          <svg viewBox="0 0 380 185" fill="none" class="dashboard-cartoon-svg">
            <!-- Nubes suaves en el cielo -->
            <path d="M24 38H64C70 38 74 34 74 28.5C74 23.5 70 19.5 65 19C62.8 14 57.5 10.5 51.5 10.5C44.2 10.5 38 15.5 36.8 22.2C31 22.2 26.5 26.5 26 32C22 32.8 19 35.2 19 36.5C19 37.5 21 38 24 38Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M286 34H322C327 34 331 30.2 331 25.5C331 21.2 327.8 17.8 323.5 17.2C321.5 12.8 317 10 311.8 10C305.5 10 300 14.4 299 20.4C293.8 20.4 289.5 24.2 289 29.2C285.8 30 283.5 32.2 283.5 33.2C283.5 33.8 284.5 34 286 34Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4" stroke-linejoin="round"/>

            <!-- Tarjeta de Mapa Urbano en el Fondo Izquierdo con Ruta Trazada y Pin de Destino -->
            <g transform="translate(16, 44)">
              <rect x="0" y="0" width="136" height="92" rx="12" fill="#FFFDF6" stroke="#1E241E" stroke-width="2.8"/>
              <!-- Parques y manzanas del mapa -->
              <rect x="8" y="8" width="44" height="32" rx="6" fill="#B8F272" stroke="#1E241E" stroke-width="1.8"/>
              <rect x="60" y="8" width="68" height="28" rx="6" fill="#E3F6FF" stroke="#1E241E" stroke-width="1.8"/>
              <rect x="8" y="48" width="52" height="36" rx="6" fill="#FFF3B8" stroke="#1E241E" stroke-width="1.8"/>
              <rect x="68" y="44" width="60" height="40" rx="6" fill="#C9F78E" stroke="#1E241E" stroke-width="1.8"/>
              <!-- Ruta punteada desde Origen (A) hasta el Pin de Destino (B) -->
              <path d="M22 68 C 38 68, 42 26, 68 26 C 88 26, 92 60, 106 58" stroke="#2B7A0B" stroke-width="3.4" stroke-dasharray="5 4" stroke-linecap="round"/>
              <!-- Punto de Origen -->
              <circle cx="22" cy="68" r="6" fill="#5BC0EB" stroke="#1E241E" stroke-width="2.2"/>
              <circle cx="22" cy="68" r="2.2" fill="#FFFFFF"/>
              <!-- Pin de Destino Destacado -->
              <ellipse cx="106" cy="62" rx="9" ry="4" fill="#FFD24C" stroke="#1E241E" stroke-width="1.8"/>
              <path d="M106 58C106 58 119 43 119 33C119 25.8 113.2 20 106 20C98.8 20 93 25.8 93 33C93 43 106 58 106 58Z" fill="#FF5A36" stroke="#1E241E" stroke-width="2.5" stroke-linejoin="round"/>
              <circle cx="106" cy="33" r="5" fill="#FFFDF6" stroke="#1E241E" stroke-width="2"/>
            </g>

            <!-- Poste Señalizador de Ciclovía -->
            <line x1="168" y1="86" x2="168" y2="148" stroke="#1E241E" stroke-width="3" stroke-linecap="round"/>
            <rect x="152" y="64" width="32" height="24" rx="6" fill="#5BC0EB" stroke="#1E241E" stroke-width="2.4"/>
            <path d="M161 76H173M173 76L169 72M173 76L169 80" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Líneas de velocidad / brisa de movimiento -->
            <line x1="176" y1="104" x2="198" y2="104" stroke="#5BC0EB" stroke-width="2.8" stroke-linecap="round"/>
            <line x1="168" y1="116" x2="192" y2="116" stroke="#FFD24C" stroke-width="2.8" stroke-linecap="round"/>

            <!-- Ciclista en Movimiento sobre Bicicleta Completa (con Asiento, Manubrio y Pedales claros) -->
            <!-- Rueda Trasera -->
            <circle cx="228" cy="126" r="22" fill="#FFFFFF" stroke="#1E241E" stroke-width="3.2"/>
            <circle cx="228" cy="126" r="14" fill="#74C7EC" stroke="#1E241E" stroke-width="2.2"/>
            <circle cx="228" cy="126" r="4.5" fill="#FFD24C" stroke="#1E241E" stroke-width="2"/>
            <!-- Rueda Delantera -->
            <circle cx="312" cy="126" r="22" fill="#FFFFFF" stroke="#1E241E" stroke-width="3.2"/>
            <circle cx="312" cy="126" r="14" fill="#74C7EC" stroke="#1E241E" stroke-width="2.2"/>
            <circle cx="312" cy="126" r="4.5" fill="#FFD24C" stroke="#1E241E" stroke-width="2"/>

            <!-- Cuadro Completo de la Bicicleta -->
            <path d="M228 126 L252 90 H292 L266 126 H228 Z" fill="none" stroke="#FF5A36" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="248" y1="78" x2="266" y2="126" stroke="#1E241E" stroke-width="3.8" stroke-linecap="round"/>
            <!-- Horquilla y Poste del Manubrio (Claramente visible) -->
            <line x1="312" y1="126" x2="288" y2="72" stroke="#1E241E" stroke-width="4" stroke-linecap="round"/>
            <path d="M278 72 H295 C299 72 301 75 299 79" fill="none" stroke="#1E241E" stroke-width="4.2" stroke-linecap="round"/>
            <!-- Faro delantero -->
            <circle cx="301" cy="84" r="4.5" fill="#FFD24C" stroke="#1E241E" stroke-width="2"/>
            <!-- Asiento / Sillín Anatómico (Claramente visible) -->
            <rect x="236" y="73" width="22" height="7" rx="3.5" fill="#1E241E"/>
            <!-- Catalina y Pedal -->
            <circle cx="266" cy="126" r="6.5" fill="#FFD24C" stroke="#1E241E" stroke-width="2.2"/>

            <!-- Figura del Ciclista con Casco y Mochila -->
            <!-- Pierna pedaleando -->
            <path d="M250 76 L268 102 L266 122" fill="none" stroke="#1E241E" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Mochila verde -->
            <rect x="232" y="48" width="14" height="22" rx="5" fill="#52B70A" stroke="#1E241E" stroke-width="2.4" transform="rotate(-14 232 48)"/>
            <!-- Torso celeste inclinado hacia adelante -->
            <path d="M248 74 L262 46" stroke="#5BC0EB" stroke-width="13" stroke-linecap="round"/>
            <path d="M248 74 L262 46" stroke="#1E241E" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Brazo sujetando el manubrio -->
            <path d="M262 48 L274 64 L286 71" fill="none" stroke="#5BC0EB" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M262 48 L274 64 L286 71" fill="none" stroke="#1E241E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Cabeza y Casco Amarillo de Ciclista -->
            <circle cx="268" cy="32" r="10" fill="#FFE0B2" stroke="#1E241E" stroke-width="2.5"/>
            <path d="M256 31 C256 22 263 17 271 17 C279 17 283 23 282 31 Z" fill="#FFD24C" stroke="#1E241E" stroke-width="2.5" stroke-linejoin="round"/>

            <!-- Pin de Meta en el Extremo Derecho de la Ciclovía -->
            <path d="M354 146C354 146 366 130 366 120C366 113.4 360.6 108 354 108C347.4 108 342 113.4 342 120C342 130 354 146 354 146Z" fill="#52B70A" stroke="#1E241E" stroke-width="2.5" stroke-linejoin="round"/>
            <circle cx="354" cy="120" r="4.5" fill="#FFFFFF" stroke="#1E241E" stroke-width="1.8"/>

            <!-- Pista / Ciclovía Asfáltica Gris con Líneas Blancas -->
            <rect x="8" y="148" width="364" height="6" rx="3" fill="#DCE4E0" stroke="#1E241E" stroke-width="2"/>
            <rect x="8" y="154" width="364" height="22" rx="6" fill="#4A5550" stroke="#1E241E" stroke-width="2.6"/>
            <line x1="22" y1="165" x2="358" y2="165" stroke="#FFFFFF" stroke-width="2.8" stroke-dasharray="16 12" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- 2. Cinta Continua de 4 Métricas en Español -->
      <div class="eco-stat-ribbon" aria-label="Resumen de impacto personal">
        <div class="ribbon-metric">
          <span class="ribbon-icon tint-green"><app-icon name="leaf" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">CO₂ evitado total</span>
            <strong class="ribbon-val">{{ s.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></strong>
            <span class="ribbon-sub">≈ {{ s.treesEquivalent | number: '1.1-1' }} árboles urbanos</span>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-yellow"><app-icon name="bike" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">Recorrido sostenible</span>
            <strong class="ribbon-val">{{ s.totalDistanceKm | number: '1.1-1' }} <small>km</small></strong>
            <span class="ribbon-sub">{{ s.totalTrips }} recorridos registrados</span>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-blue"><app-icon name="bolt" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">Puntos disponibles</span>
            <strong class="ribbon-val">{{ s.currentPoints }} <small>pts</small></strong>
            <a routerLink="/rewards" class="ribbon-link">Canjear beneficios →</a>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-orange"><app-icon name="flame" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">Energía activa</span>
            <strong class="ribbon-val">{{ s.totalCaloriesBurned }} <small>kcal</small></strong>
            <span class="ribbon-sub">Calorías quemadas en ruta</span>
          </div>
        </div>
      </div>

      <!-- 3. Diseño Editorial Asimétrico: Gráfico Horizontal (Izq) + Columna Vertical Abierta (Der) -->
      <div class="dash-editorial-grid">
        <!-- Panel Principal Izquierdo: Evolución Semanal y Reparto por Vehículo -->
        <article class="eco-card dash-main-chart-card">
          <div class="card-head-row">
            <div>
              <h2>Emisiones evitadas esta semana</h2>
              <p class="card-sub">Gramos de CO₂ que evitaste emitir cada día de la semana</p>
            </div>
            <span class="badge-pill">
              <app-icon name="leaf" [size]="14"></app-icon>
              <span>Últimos 7 días</span>
            </span>
          </div>

          <div class="bar-chart-clean">
            <div class="bar-column" *ngFor="let item of s.weeklyTrend">
              <div class="bar-val">{{ item.co2SavedGrams }}g</div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  [style.height.%]="getBarHeightPercent(item.co2SavedGrams)"
                  [title]="formatDay(item.dayOfWeek) + ': ' + item.co2SavedGrams + ' g CO₂'"
                ></div>
              </div>
              <div class="bar-day">{{ formatDay(item.dayOfWeek) }}</div>
            </div>
          </div>

          <div class="chart-divider-Section">
            <div class="split-header-inline">
              <h3>Cómo te moviste</h3>
              <span>Distribución de tus {{ s.totalTrips }} viajes</span>
            </div>
            <div class="mode-bars">
              <div class="mode-row" *ngFor="let m of getModeEntries(s.tripsByMode)">
                <div class="mode-name-wrap">
                  <span class="mode-icon-chip"><app-icon [name]="m.mode" [size]="16"></app-icon></span>
                  <span class="mode-name">{{ formatMode(m.mode) }}</span>
                </div>
                <div class="mode-progress-track">
                  <div class="mode-progress-fill" [style.width.%]="(m.count / Math.max(1, s.totalTrips)) * 100"></div>
                </div>
                <span class="mode-count">{{ m.count }} {{ m.count === 1 ? 'viaje' : 'viajes' }}</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Columna Vertical Derecha -->
        <aside class="dash-vertical-sidebar">
          <!-- Globo de Consejo del Día -->
          <div class="advisor-callout" *ngIf="recommendation as rec">
            <div class="advisor-callout-top">
              <span class="advisor-spark-icon"><app-icon name="spark" [size]="18"></app-icon></span>
              <div>
                <span class="advisor-kicker">Ruta recomendada de hoy</span>
                <h3>{{ rec.title }}</h3>
              </div>
            </div>
            <p class="advisor-text">{{ rec.recommendation }}</p>
            <a routerLink="/routes" class="inline-action-link">
              <span>Abrir ruta sugerida en el mapa</span>
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </a>
          </div>

          <!-- Línea Vertical de Impacto Colectivo y Medallas -->
          <div class="vertical-timeline-section">
            <div class="timeline-group" *ngIf="community as c">
              <div class="timeline-head">
                <h3>Impacto colectivo en Lima</h3>
                <a routerLink="/leaderboard" class="link-emerald">Ver ranking →</a>
              </div>
              <ul class="vertical-stat-list">
                <li>
                  <span class="v-stat-dot green"><app-icon name="leaf" [size]="15"></app-icon></span>
                  <div class="v-stat-body">
                    <strong>{{ c.totalCo2SavedTons | number: '1.2-2' }} toneladas de CO₂</strong>
                    <span>Evitadas entre {{ c.totalActiveUsers }} vecinos activos</span>
                  </div>
                </li>
                <li>
                  <span class="v-stat-dot yellow"><app-icon name="bike" [size]="15"></app-icon></span>
                  <div class="v-stat-body">
                    <strong>{{ c.totalCleanKm | number: '1.0-0' }} km sin humo</strong>
                    <span>Equivalentes a {{ c.totalTreesEquivalent | number: '1.0-0' }} árboles urbanos</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="timeline-group">
              <div class="timeline-head">
                <h3>Tus medallas recientes</h3>
                <a routerLink="/gamification" class="link-emerald">Ver todas →</a>
              </div>
              <div class="vertical-medals-list">
                <div
                  class="v-medal-row"
                  *ngFor="let b of s.recentBadges | slice: 0 : 3"
                  [class.unlocked]="b.unlocked"
                >
                  <span class="badge-icon-circle">
                    <app-icon [name]="b.code || b.iconEmoji" [size]="18"></app-icon>
                  </span>
                  <div class="v-medal-copy">
                    <strong>{{ b.title }}</strong>
                    <div class="v-medal-bar">
                      <div class="v-medal-fill" [style.width.%]="b.progressPercent"></div>
                    </div>
                  </div>
                  <span class="v-medal-pct">{{ b.progressPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  community: CommunityImpact | null = null;
  recommendation: AiRecommendation | null = null;
  Math = Math;

  selectedQuickPreset = 0;
  quickCorridors: QuickCorridorOption[] = [
    {
      index: 0,
      origin: 'San Isidro (Centro Financiero)',
      destination: 'Miraflores (Parque Kennedy)',
      distanceLabel: '3.6 km',
      timeLabel: '12 min en ciclovía'
    },
    {
      index: 1,
      origin: 'Jesús María (Av. Salaverry)',
      destination: 'San Isidro (Óvalo Gutiérrez)',
      distanceLabel: '4.2 km',
      timeLabel: '14 min en ciclovía'
    },
    {
      index: 2,
      origin: 'Miraflores (Parque Kennedy)',
      destination: 'Barranco (Plaza Municipal)',
      distanceLabel: '3.1 km',
      timeLabel: '11 min en ciclovía'
    },
    {
      index: 3,
      origin: 'Ciudad Universitaria (UNMSM)',
      destination: 'Centro Histórico (Plaza San Martín)',
      distanceLabel: '5.4 km',
      timeLabel: '18 min en ciclovía'
    }
  ];

  constructor(
    private api: ApiService,
    public i18n: I18nService,
    private router: Router
  ) {
    this.summary = this.api.buildFallbackDashboardSummary();
    this.community = this.api.buildFallbackCommunityImpact();
    this.recommendation = this.api.buildFallbackRecommendation();
  }

  ngOnInit(): void {
    this.api.getDashboardSummary().subscribe(res => (this.summary = res));
    this.api.getCommunityImpact().subscribe(res => (this.community = res));
    this.api.getRecommendations().subscribe(res => (this.recommendation = res));
  }

  launchQuickRoute(): void {
    this.router.navigate(['/routes'], {
      queryParams: { preset: this.selectedQuickPreset }
    });
  }

  getBarHeightPercent(grams: number): number {
    if (!this.summary?.weeklyTrend?.length) return 15;
    const max = Math.max(...this.summary.weeklyTrend.map(x => x.co2SavedGrams), 500);
    return Math.max(14, Math.round((grams / max) * 100));
  }

  getModeEntries(mapObj: Record<string, number> | undefined): { mode: string; count: number }[] {
    if (!mapObj) return [];
    return Object.entries(mapObj).map(([mode, count]) => ({ mode, count }));
  }

  formatDay(day: string): string {
    if (!day) return '';
    const clean = day.trim().toUpperCase();
    const dayMap: Record<string, string> = {
      MON: 'Lun',
      MONDAY: 'Lun',
      LUN: 'Lun',
      LUNES: 'Lun',
      TUE: 'Mar',
      TUESDAY: 'Mar',
      MAR: 'Mar',
      MARTES: 'Mar',
      WED: 'Mié',
      WEDNESDAY: 'Mié',
      MIE: 'Mié',
      MIÉ: 'Mié',
      MIERCOLES: 'Mié',
      MIÉRCOLES: 'Mié',
      THU: 'Jue',
      THURSDAY: 'Jue',
      JUE: 'Jue',
      JUEVES: 'Jue',
      FRI: 'Vie',
      FRIDAY: 'Vie',
      VIE: 'Vie',
      VIERNES: 'Vie',
      SAT: 'Sáb',
      SATURDAY: 'Sáb',
      SAB: 'Sáb',
      SÁB: 'Sáb',
      SABADO: 'Sáb',
      SÁBADO: 'Sáb',
      SUN: 'Dom',
      SUNDAY: 'Dom',
      DOM: 'Dom',
      DOMINGO: 'Dom'
    };
    return dayMap[clean] || day;
  }

  formatMode(mode: string): string {
    const names: Record<string, string> = {
      BICYCLE: 'Bicicleta',
      WALKING: 'Caminata',
      ELECTRIC_SCOOTER: 'Scooter eléctrico',
      PUBLIC_TRANSIT: 'Transporte público',
      CARPOOL: 'Auto compartido',
      CAR_SOLO: 'Automóvil'
    };
    return names[mode] || mode;
  }
}
