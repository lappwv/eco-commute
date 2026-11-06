import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { AiRecommendation, CommunityImpact, DashboardSummary } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, EcoIconComponent],
  template: `
    <section class="page-section" *ngIf="summary as s">
      <!-- 1. Hero Ilustrado con Guía de 3 Pasos Integrada (Sin tarjetas sueltas adicionales) -->
      <div class="cartoon-hero-banner">
        <div class="cartoon-banner-copy">
          <span class="eyebrow-tag">
            <app-icon name="leaf" [size]="15"></app-icon>
            <span>¡Hola, {{ s.fullName }}! · Nivel {{ s.currentLevel }}</span>
          </span>
          <h1 class="cartoon-banner-title">PEDALEA, AHORRA Y CUIDA LIMA</h1>
          <p class="cartoon-banner-sub">{{ i18n.t('dash.subtitle') }}</p>

          <!-- Flujo lineal de 3 pasos integrado (reemplaza las 3 tarjetas de onboarding) -->
          <div class="hero-inline-steps" aria-label="Pasos rápidos">
            <a routerLink="/routes" class="hero-step-pill">
              <span class="hero-step-badge">1</span>
              <app-icon name="route" [size]="16"></app-icon>
              <span>Elige tu ruta</span>
            </a>
            <span class="hero-step-arrow" aria-hidden="true">→</span>
            <a routerLink="/trips" class="hero-step-pill highlight">
              <span class="hero-step-badge">2</span>
              <app-icon name="plus" [size]="16"></app-icon>
              <span>Anota tu viaje</span>
            </a>
            <span class="hero-step-arrow" aria-hidden="true">→</span>
            <a routerLink="/rewards" class="hero-step-pill">
              <span class="hero-step-badge">3</span>
              <app-icon name="ticket" [size]="16"></app-icon>
              <span>Canjea premios</span>
            </a>
          </div>
        </div>

        <!-- Ilustración Cartoon Vectorial -->
        <div class="cartoon-banner-art" aria-hidden="true">
          <svg viewBox="0 0 360 175" fill="none" class="dashboard-cartoon-svg">
            <path d="M36 46H78C84.5 46 89 41.5 89 35.5C89 30 84.8 25.6 79.4 25C77 19.6 71.4 16 65 16C57.2 16 50.6 21.4 49.2 28.8C47.5 28 45.6 27.6 43.6 27.6C37.2 27.6 32 32.4 31.4 38.6C27 39.4 24 42.5 24 44C24 45.2 29.5 46 36 46Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M254 42H292C297.5 42 301.5 38 301.5 33C301.5 28.5 298 24.8 293.5 24.2C291.5 19.6 286.8 16.5 281.2 16.5C274.5 16.5 268.8 21.2 267.6 27.5C262 27.5 257.5 31.6 257 37C253.5 37.8 251 40.2 251 41.2C251 41.8 252.2 42 254 42Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.6" stroke-linejoin="round"/>
            <circle cx="116" cy="28" r="6" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4"/>
            <circle cx="222" cy="24" r="5" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4"/>
            <path d="M46 156C36 156 28 148 28 138C28 128 36 120 46 120C49 105 62 94 78 94C92 94 104 103 108 116C112 114 116 113 121 113C135 113 146 124 146 138C146 148 138 156 128 156H46Z" fill="#529E0B" stroke="#1E241E" stroke-width="2.8" stroke-linejoin="round"/>
            <path d="M68 156C60 156 53 149 53 141C53 133 60 126 68 126C72 115 82 108 94 108C108 108 119 118 121 131C129 131 136 138 136 146C136 152 131 156 125 156H68Z" fill="#8CE52E" stroke="#1E241E" stroke-width="2.8" stroke-linejoin="round"/>
            <rect x="164" y="60" width="76" height="96" rx="9" fill="#FFB224" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="157" y="48" width="90" height="16" rx="6" fill="#FF9800" stroke="#1E241E" stroke-width="2.8"/>
            <path d="M186 48V40C186 36 190 33 195 33H209C214 33 218 36 218 40V48" stroke="#1E241E" stroke-width="2.8"/>
            <line x1="183" y1="78" x2="183" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="202" y1="78" x2="202" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="221" y1="78" x2="221" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <rect x="138" y="92" width="32" height="64" rx="10" fill="#74C7EC" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="146" y="78" width="16" height="14" rx="4" fill="#74C7EC" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="145" y="71" width="18" height="8" rx="3" fill="#FF9800" stroke="#1E241E" stroke-width="2.5"/>
            <rect x="138" y="112" width="32" height="22" fill="#1E241E"/>
            <circle cx="154" cy="123" r="5" fill="#FFFFFF"/>
            <circle cx="268" cy="134" r="20" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.8"/>
            <circle cx="268" cy="134" r="11" fill="#74C7EC" stroke="#1E241E" stroke-width="2.2"/>
            <circle cx="330" cy="134" r="20" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.8"/>
            <circle cx="330" cy="134" r="11" fill="#74C7EC" stroke="#1E241E" stroke-width="2.2"/>
            <path d="M268 134L288 102H318L300 134H268Z" stroke="#FF6B4A" stroke-width="3.5" stroke-linejoin="round"/>
            <path d="M318 102L330 134" stroke="#1E241E" stroke-width="3" stroke-linecap="round"/>
            <line x1="18" y1="156" x2="346" y2="156" stroke="#1E241E" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- 2. Cinta Continua de 4 Métricas (1 sola franja limpia en lugar de 4 tarjetas separadas) -->
      <div class="eco-stat-ribbon" aria-label="Resumen de impacto personal">
        <div class="ribbon-metric">
          <span class="ribbon-icon tint-green"><app-icon name="leaf" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">{{ i18n.t('dash.co2Saved') }}</span>
            <strong class="ribbon-val">{{ s.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></strong>
            <span class="ribbon-sub">≈ {{ s.treesEquivalent | number: '1.1-1' }} árboles urbanos</span>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-yellow"><app-icon name="bike" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">{{ i18n.t('dash.distance') }}</span>
            <strong class="ribbon-val">{{ s.totalDistanceKm | number: '1.1-1' }} <small>km</small></strong>
            <span class="ribbon-sub">{{ s.totalTrips }} recorridos registrados</span>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-blue"><app-icon name="bolt" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">{{ i18n.t('dash.points') }}</span>
            <strong class="ribbon-val">{{ s.currentPoints }} <small>pts</small></strong>
            <a routerLink="/rewards" class="ribbon-link">Canjear beneficios →</a>
          </div>
        </div>

        <div class="ribbon-metric">
          <span class="ribbon-icon tint-orange"><app-icon name="flame" [size]="22"></app-icon></span>
          <div class="ribbon-copy">
            <span class="ribbon-label">{{ i18n.t('dash.calories') }}</span>
            <strong class="ribbon-val">{{ s.totalCaloriesBurned }} <small>kcal</small></strong>
            <span class="ribbon-sub">Energía activa acumulada</span>
          </div>
        </div>
      </div>

      <!-- 3. Diseño Editorial Asimétrico: Gráfico Horizontal (Izq) + Columna Vertical Abierta (Der) -->
      <div class="dash-editorial-grid">
        <!-- Panel Principal Izquierdo: Evolución Semanal y Reparto por Vehículo -->
        <article class="eco-card dash-main-chart-card">
          <div class="card-head-row">
            <div>
              <h2>{{ i18n.t('dash.weeklyTitle') }}</h2>
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
                  [title]="item.dayOfWeek + ': ' + item.co2SavedGrams + ' g CO₂'"
                ></div>
              </div>
              <div class="bar-day">{{ item.dayOfWeek }}</div>
            </div>
          </div>

          <div class="chart-divider-Section">
            <div class="split-header-inline">
              <h3>{{ i18n.t('dash.modeSplit') }}</h3>
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

        <!-- Columna Vertical Derecha (Sin anidar múltiples tarjetas pesadas) -->
        <aside class="dash-vertical-sidebar">
          <!-- Globo de Consejo del Día -->
          <div class="advisor-callout" *ngIf="recommendation as rec">
            <div class="advisor-callout-top">
              <span class="advisor-spark-icon"><app-icon name="spark" [size]="18"></app-icon></span>
              <div>
                <span class="advisor-kicker">Consejo mágico del día</span>
                <h3>{{ rec.title }}</h3>
              </div>
            </div>
            <p class="advisor-text">{{ rec.recommendation }}</p>
            <a routerLink="/routes" class="inline-action-link">
              <span>Probar ruta sugerida en el mapa</span>
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </a>
          </div>

          <!-- Línea Vertical de Impacto Colectivo y Medallas -->
          <div class="vertical-timeline-section">
            <div class="timeline-group" *ngIf="community as c">
              <div class="timeline-head">
                <h3>Impacto colectivo en Lima</h3>
                <a routerLink="/leaderboard" class="link-emerald">Ranking →</a>
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

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.api.getDashboardSummary().subscribe(res => (this.summary = res));
    this.api.getCommunityImpact().subscribe(res => (this.community = res));
    this.api.getRecommendations().subscribe(res => (this.recommendation = res));
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
