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
      <!-- Editorial Header -->
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="leaf" [size]="14"></app-icon>
            Movilidad Sostenible · Lima Metropolitana
          </span>
          <h1 class="page-title">{{ i18n.t('dash.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('dash.subtitle') }}</p>
        </div>
        <div class="header-actions">
          <a routerLink="/routes" class="btn-outline">
            <app-icon name="route" [size]="17"></app-icon>
            <span>Comparar rutas</span>
          </a>
          <a routerLink="/trips" class="btn-emerald">
            <app-icon name="plus" [size]="17"></app-icon>
            <span>Registrar viaje</span>
          </a>
        </div>
      </div>

      <!-- Clear 3-Step Orientation Strip (Explains purpose at a glance without overwhelming) -->
      <div class="onboarding-strip" aria-label="Cómo usar EcoCommute en 3 pasos">
        <a routerLink="/routes" class="onboarding-step">
          <span class="step-num">01</span>
          <div class="step-icon-box">
            <app-icon name="route" [size]="20"></app-icon>
          </div>
          <div class="step-copy">
            <strong>Compara tu ruta</strong>
            <p>Simula tu trayecto en Lima y descubre cuánto CO₂ y tiempo ahorras frente al auto.</p>
          </div>
        </a>

        <a routerLink="/trips" class="onboarding-step">
          <span class="step-num">02</span>
          <div class="step-icon-box">
            <app-icon name="bike" [size]="20"></app-icon>
          </div>
          <div class="step-copy">
            <strong>Registra tu recorrido</strong>
            <p>Guarda tus viajes en bici, caminata o transporte público en tu bitácora personal.</p>
          </div>
        </a>

        <a routerLink="/rewards" class="onboarding-step">
          <span class="step-num">03</span>
          <div class="step-icon-box">
            <app-icon name="ticket" [size]="20"></app-icon>
          </div>
          <div class="step-copy">
            <strong>Canjea tus puntos</strong>
            <p>Cambia tus puntos acumulados por cafés, horas de bicicleta y pases en Lima.</p>
          </div>
        </a>
      </div>

      <!-- 4 Main Impact Cards -->
      <div class="kpi-grid-4">
        <article class="eco-kpi-card highlight">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.co2Saved') }}</span>
            <span class="kpi-icon"><app-icon name="leaf" [size]="20"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></div>
          <div class="kpi-foot">
            <app-icon name="tree" [size]="14"></app-icon>
            <span>Equivale a <strong>{{ s.treesEquivalent | number: '1.2-2' }}</strong> árboles absorbiendo CO₂ al año</span>
          </div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.distance') }}</span>
            <span class="kpi-icon"><app-icon name="bike" [size]="20"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalDistanceKm | number: '1.1-1' }} <small>km</small></div>
          <div class="kpi-foot">
            <app-icon name="check" [size]="14"></app-icon>
            <span><strong>{{ s.totalTrips }}</strong> recorridos verificados en tu bitácora</span>
          </div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.points') }}</span>
            <span class="kpi-icon"><app-icon name="bolt" [size]="20"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.currentPoints }} <small>pts</small></div>
          <div class="kpi-foot">
            <app-icon name="medal" [size]="14"></app-icon>
            <span>Nivel {{ s.currentLevel }} · <a routerLink="/rewards" class="inline-link">Ver beneficios</a></span>
          </div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">{{ i18n.t('dash.calories') }}</span>
            <span class="kpi-icon"><app-icon name="flame" [size]="20"></app-icon></span>
          </div>
          <div class="kpi-number">{{ s.totalCaloriesBurned }} <small>kcal</small></div>
          <div class="kpi-foot">
            <app-icon name="walk" [size]="14"></app-icon>
            <span>Salud cardiovascular y movilidad activa</span>
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
              <p class="card-sub">Gramos de CO₂ evitados cada día frente a viajar en automóvil particular</p>
            </div>
            <span class="badge-pill">
              <app-icon name="leaf" [size]="13"></app-icon>
              <span>Últimos 7 días</span>
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
                  <span class="mode-icon-chip"><app-icon [name]="m.mode" [size]="15"></app-icon></span>
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
                  <app-icon name="spark" [size]="13"></app-icon>
                  Recomendación personalizada
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
                <p class="card-sub">Suma de todos los ciudadanos activos en EcoCommute Lima</p>
              </div>
              <a routerLink="/leaderboard" class="badge-pill clickable">
                <app-icon name="trophy" [size]="13"></app-icon>
                <span>Ver ranking</span>
              </a>
            </div>
            <div class="community-stats-grid">
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalCo2SavedTons | number: '1.2-2' }} t</span>
                <span class="comm-lbl">CO₂ evitado</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalCleanKm | number: '1.1-1' }} km</span>
                <span class="comm-lbl">Km limpios</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalActiveUsers }}</span>
                <span class="comm-lbl">Vecinos activos</span>
              </div>
              <div class="comm-stat">
                <span class="comm-val">{{ c.totalTreesEquivalent | number: '1.1-1' }}</span>
                <span class="comm-lbl">Árboles equiv.</span>
              </div>
            </div>
          </article>

          <article class="eco-card">
            <div class="card-head-row">
              <h2>Logros destacados</h2>
              <a routerLink="/gamification" class="link-emerald">Ver todos</a>
            </div>
            <div class="badges-mini-list">
              <div
                class="badge-mini-item"
                *ngFor="let b of s.recentBadges | slice: 0 : 4"
                [class.unlocked]="b.unlocked"
              >
                <span class="badge-icon-circle">
                  <app-icon [name]="b.code || b.iconEmoji" [size]="18"></app-icon>
                </span>
                <div class="badge-info">
                  <strong>{{ b.title }}</strong>
                  <small>{{ b.progressPercent }}% completado</small>
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
