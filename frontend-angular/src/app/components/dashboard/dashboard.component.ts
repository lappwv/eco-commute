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
      <!-- Playful Illustrated Banner (Matches Reference Image Style) -->
      <div class="cartoon-hero-banner">
        <div class="cartoon-banner-copy">
          <span class="eyebrow-tag">
            <app-icon name="leaf" [size]="15"></app-icon>
            <span>¡Hola, {{ s.fullName }}!</span>
          </span>
          <h1 class="cartoon-banner-title">PEDALEA, AHORRA Y CUIDA LIMA</h1>
          <p class="cartoon-banner-sub">{{ i18n.t('dash.subtitle') }}</p>
          <div class="header-actions">
            <a routerLink="/trips" class="btn-emerald">
              <app-icon name="plus" [size]="17"></app-icon>
              <span>¡Anotar un viaje!</span>
            </a>
            <a routerLink="/routes" class="btn-outline">
              <app-icon name="route" [size]="17"></app-icon>
              <span>Explorar mapa de rutas</span>
            </a>
          </div>
        </div>

        <!-- White Circular Dome + Flat-Vector Cartoon Illustration -->
        <div class="cartoon-banner-art" aria-hidden="true">
          <svg viewBox="0 0 360 175" fill="none" class="dashboard-cartoon-svg">
            <!-- Nubes flotantes con borde oscuro -->
            <path d="M36 46H78C84.5 46 89 41.5 89 35.5C89 30 84.8 25.6 79.4 25C77 19.6 71.4 16 65 16C57.2 16 50.6 21.4 49.2 28.8C47.5 28 45.6 27.6 43.6 27.6C37.2 27.6 32 32.4 31.4 38.6C27 39.4 24 42.5 24 44C24 45.2 29.5 46 36 46Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.6" stroke-linejoin="round"/>
            <path d="M254 42H292C297.5 42 301.5 38 301.5 33C301.5 28.5 298 24.8 293.5 24.2C291.5 19.6 286.8 16.5 281.2 16.5C274.5 16.5 268.8 21.2 267.6 27.5C262 27.5 257.5 31.6 257 37C253.5 37.8 251 40.2 251 41.2C251 41.8 252.2 42 254 42Z" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.6" stroke-linejoin="round"/>
            <!-- Burbujas decorativas -->
            <circle cx="116" cy="28" r="6" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4"/>
            <circle cx="222" cy="24" r="5" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4"/>
            <circle cx="28" cy="96" r="5.5" fill="#FFFFFF" stroke="#1E241E" stroke-width="2.4"/>
            <!-- Arbustos verdes estilo Freepik -->
            <path d="M46 156C36 156 28 148 28 138C28 128 36 120 46 120C49 105 62 94 78 94C92 94 104 103 108 116C112 114 116 113 121 113C135 113 146 124 146 138C146 148 138 156 128 156H46Z" fill="#529E0B" stroke="#1E241E" stroke-width="2.8" stroke-linejoin="round"/>
            <path d="M68 156C60 156 53 149 53 141C53 133 60 126 68 126C72 115 82 108 94 108C108 108 119 118 121 131C129 131 136 138 136 146C136 152 131 156 125 156H68Z" fill="#8CE52E" stroke="#1E241E" stroke-width="2.8" stroke-linejoin="round"/>
            <path d="M82 118C88 114 95 114 101 118" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Contenedor Amarillo Eco & Botellas Reciclables -->
            <rect x="164" y="60" width="76" height="96" rx="9" fill="#FFB224" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="157" y="48" width="90" height="16" rx="6" fill="#FF9800" stroke="#1E241E" stroke-width="2.8"/>
            <path d="M186 48V40C186 36 190 33 195 33H209C214 33 218 36 218 40V48" stroke="#1E241E" stroke-width="2.8"/>
            <line x1="183" y1="78" x2="183" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="202" y1="78" x2="202" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="221" y1="78" x2="221" y2="138" stroke="#FFE082" stroke-width="3.2" stroke-linecap="round"/>
            <!-- Botella Azul Celeste -->
            <rect x="138" y="92" width="32" height="64" rx="10" fill="#74C7EC" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="146" y="78" width="16" height="14" rx="4" fill="#74C7EC" stroke="#1E241E" stroke-width="2.8"/>
            <rect x="145" y="71" width="18" height="8" rx="3" fill="#FF9800" stroke="#1E241E" stroke-width="2.5"/>
            <rect x="138" y="112" width="32" height="22" fill="#1E241E"/>
            <circle cx="154" cy="123" r="5" fill="#FFFFFF"/>
            <!-- Bicicleta Alegre -->
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

      <!-- Clear 3-Step Orientation Strip (Explains purpose at a glance without overwhelming) -->
      <div class="onboarding-strip" aria-label="Cómo usar EcoCommute en 3 pasos">
        <a routerLink="/routes" class="onboarding-step step-tint-green">
          <span class="step-num">PASO 1</span>
          <div class="step-icon-box">
            <app-icon name="route" [size]="22"></app-icon>
          </div>
          <div class="step-copy">
            <strong>1. Elige tu camino</strong>
            <p>Compara tu ruta en Lima y mira cuánto tiempo y humo ahorras frente al auto.</p>
          </div>
        </a>

        <a routerLink="/trips" class="onboarding-step step-tint-yellow">
          <span class="step-num">PASO 2</span>
          <div class="step-icon-box">
            <app-icon name="bike" [size]="22"></app-icon>
          </div>
          <div class="step-copy">
            <strong>2. Anota tu aventura</strong>
            <p>Guarda tus paseos en bici, a pie o en bus dentro de tu bitácora personal.</p>
          </div>
        </a>

        <a routerLink="/rewards" class="onboarding-step step-tint-blue">
          <span class="step-num">PASO 3</span>
          <div class="step-icon-box">
            <app-icon name="ticket" [size]="22"></app-icon>
          </div>
          <div class="step-copy">
            <strong>3. ¡Canjea tus premios!</strong>
            <p>Usa tus puntos para pedir cafés, horas de bici y entradas a parques.</p>
          </div>
        </a>
      </div>

      <!-- 4 Main Impact Cards -->
      <div class="kpi-grid-4">
        <article class="eco-kpi-card highlight">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.co2Saved') }}</span>
            <span class="kpi-icon"><app-icon name="leaf" [size]="21"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></div>
          <div class="kpi-foot">
            <app-icon name="tree" [size]="15"></app-icon>
            <span>Igual a <strong>{{ s.treesEquivalent | number: '1.2-2' }}</strong> árboles felices al año</span>
          </div>
        </article>

        <article class="eco-kpi-card kpi-yellow">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.distance') }}</span>
            <span class="kpi-icon"><app-icon name="bike" [size]="21"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalDistanceKm | number: '1.1-1' }} <small>km</small></div>
          <div class="kpi-foot">
            <app-icon name="check" [size]="15"></app-icon>
            <span><strong>{{ s.totalTrips }}</strong> aventuras anotadas en tu bitácora</span>
          </div>
        </article>

        <article class="eco-kpi-card kpi-blue">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.points') }}</span>
            <span class="kpi-icon"><app-icon name="bolt" [size]="21"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.currentPoints }} <small>pts</small></div>
          <div class="kpi-foot">
            <app-icon name="medal" [size]="15"></app-icon>
            <span>Nivel {{ s.currentLevel }} · <a routerLink="/rewards" class="inline-link">¡Ver premios!</a></span>
          </div>
        </article>

        <article class="eco-kpi-card kpi-orange">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.calories') }}</span>
            <span class="kpi-icon"><app-icon name="flame" [size]="21"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalCaloriesBurned }} <small>kcal</small></div>
          <div class="kpi-foot">
            <app-icon name="walk" [size]="15"></app-icon>
            <span>¡Mucha energía y salud para tu cuerpo!</span>
          </div>
        </article>
      </div>

      <!-- Two-Column Editorial Analytics & Insights -->
      <div class="grid-2-col">
        <!-- Left Column: Weekly CO2 Bar Chart & Mode Split -->
        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>{{ i18n.t('dash.weeklyTitle') }}</h2>
              <p class="card-sub">Gramos de humo (CO₂) que evitaste cada día de la semana</p>
            </div>
            <span class="badge-pill">
              <app-icon name="leaf" [size]="14"></app-icon>
              <span>Esta semana</span>
            </span>
          </div>

          <div class="bar-chart-container">
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

          <div class="mode-split-box">
            <h3>{{ i18n.t('dash.modeSplit') }}</h3>
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

        <!-- Right Column: Mobility Advisor, Collective Lima Impact & Recent Badges -->
        <div class="stack-col">
          <article class="eco-card ai-advisor-card" *ngIf="recommendation as rec">
            <div class="card-head-row">
              <div>
                <span class="eyebrow-tag">
                  <app-icon name="spark" [size]="14"></app-icon>
                  Consejo mágico del día
                </span>
                <h2>{{ rec.title }}</h2>
              </div>
            </div>
            <p class="advisor-body">{{ rec.recommendation }}</p>
            <div class="advisor-footer-row">
              <span class="advisor-meta">{{ rec.advisor }}</span>
              <a routerLink="/routes" class="inline-action-link">
                <span>Probar en el mapa</span>
                <app-icon name="arrow-right" [size]="14"></app-icon>
              </a>
            </div>
          </article>

          <article class="eco-card" *ngIf="community as c">
            <div class="card-head-row">
              <div>
                <h2>{{ i18n.t('dash.communityTitle') }}</h2>
                <p class="card-sub">Todo lo que hemos logrado juntos en Lima</p>
              </div>
              <a routerLink="/leaderboard" class="badge-pill clickable">
                <app-icon name="trophy" [size]="14"></app-icon>
                <span>Ver amigos</span>
              </a>
            </div>
            <div class="community-stats-grid">
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalCo2SavedTons | number: '1.2-2' }} t</span>
                <span class="comm-lbl">Humo evitado</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalCleanKm | number: '1.1-1' }} km</span>
                <span class="comm-lbl">Km limpios</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalActiveUsers }}</span>
                <span class="comm-lbl">Vecinos</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalTreesEquivalent | number: '1.1-1' }}</span>
                <span class="comm-lbl">Árboles</span>
              </div>
            </div>
          </article>

          <article class="eco-card">
            <div class="card-head-row">
              <h2>Tus medallas</h2>
              <a routerLink="/gamification" class="link-emerald">Ver colección</a>
            </div>
            <div class="badges-mini-list">
              <div
                class="badge-mini-item"
                *ngFor="let b of s.recentBadges | slice: 0 : 4"
                [class.unlocked]="b.unlocked"
              >
                <span class="badge-icon-circle">
                  <app-icon [name]="b.code || b.iconEmoji" [size]="19"></app-icon>
                </span>
                <div class="badge-info">
                  <strong>{{ b.title }}</strong>
                  <small>{{ b.progressPercent }}% listo</small>
                </div>
              </div>
            </div>
          </article>
        </div>
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
