import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { BadgeCatalogItem, DashboardBadge, GamificationMilestones, GamificationStats } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [CommonModule, RouterModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="medal" [size]="14"></app-icon>
            Reconocimiento Ciudadano
          </span>
          <h1 class="page-title">{{ i18n.t('gamification.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('gamification.subtitle') }}</p>
        </div>
      </div>

      <!-- Level & Milestone Progress Card -->
      <article class="eco-card milestone-hero-card" *ngIf="milestones as m">
        <div class="milestone-header">
          <div class="level-badge-cluster">
            <span class="level-shield">
              <app-icon name="medal" [size]="26"></app-icon>
            </span>
            <div>
              <span class="eyebrow-tag">Nivel actual {{ m.currentLevel }}</span>
              <h2>{{ getLevelName(m.currentLevel) }}</h2>
              <p class="card-sub">
                Tienes <strong>{{ m.currentPoints }} puntos</strong> acumulados · Próxima meta:
                <strong>{{ m.nextMilestonePoints }} puntos</strong>
              </p>
            </div>
          </div>
          <div class="milestone-pct">{{ m.progressPercentage }}%</div>
        </div>
        <div class="milestone-progress-track">
          <div class="milestone-progress-fill" [style.width.%]="m.progressPercentage"></div>
        </div>
      </article>

      <!-- 4 Key Progress Metrics -->
      <div class="kpi-grid-4" *ngIf="stats as st">
        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Puntos acumulados</span>
            <span class="kpi-icon"><app-icon name="bolt" [size]="19"></app-icon></span>
          </div>
          <div class="kpi-number">{{ st.currentPoints }} <small>pts</small></div>
          <div class="kpi-foot">Disponibles para canjes en comercios aliados</div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Racha activa</span>
            <span class="kpi-icon"><app-icon name="flame" [size]="19"></app-icon></span>
          </div>
          <div class="kpi-number">{{ st.streakDays }} <small>días</small></div>
          <div class="kpi-foot">Días consecutivos moviéndote sin auto</div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Emisiones evitadas</span>
            <span class="kpi-icon"><app-icon name="leaf" [size]="19"></app-icon></span>
          </div>
          <div class="kpi-number">{{ st.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></div>
          <div class="kpi-foot">Ahorro verificado frente al vehículo particular</div>
        </article>

        <article class="eco-kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Recorridos limpios</span>
            <span class="kpi-icon"><app-icon name="bike" [size]="19"></app-icon></span>
          </div>
          <div class="kpi-number">{{ st.totalTrips }}</div>
          <div class="kpi-foot">{{ st.totalDistanceKm | number: '1.1-1' }} km registrados en Lima</div>
        </article>
      </div>

      <!-- Badges Collection -->
      <article class="eco-card">
        <div class="card-head-row">
          <div>
            <h2>Colección de insignias</h2>
            <p class="card-sub">Las insignias se desbloquean automáticamente cuando cumples su meta en la bitácora</p>
          </div>
        </div>

        <div class="badges-catalog-grid">
          <div
            class="badge-card-large"
            *ngFor="let b of userBadges"
            [class.unlocked]="b.unlocked"
          >
            <div class="badge-large-top">
              <span class="badge-icon-medallion">
                <app-icon [name]="b.code || b.iconEmoji" [size]="24"></app-icon>
              </span>
              <span class="badge-status-chip" [class.done]="b.unlocked">
                <app-icon [name]="b.unlocked ? 'check' : 'lock'" [size]="13"></app-icon>
                <span>{{ b.unlocked ? 'Desbloqueada' : b.progressPercent + '% completado' }}</span>
              </span>
            </div>
            <h3>{{ b.title }}</h3>
            <p>{{ b.description }}</p>
            <div class="mode-progress-track">
              <div class="mode-progress-fill" [style.width.%]="b.progressPercent"></div>
            </div>
          </div>
        </div>
      </article>
    </section>
  `
})
export class GamificationComponent implements OnInit {
  stats: GamificationStats | null = null;
  milestones: GamificationMilestones | null = null;
  userBadges: DashboardBadge[] = [];
  catalog: BadgeCatalogItem[] = [];

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.api.getGamificationStats().subscribe(res => (this.stats = res));
    this.api.getGamificationMilestones().subscribe(res => (this.milestones = res));
    this.api.getUserBadges().subscribe(res => (this.userBadges = res));
    this.api.getBadgeCatalog().subscribe(res => (this.catalog = res));
  }

  getLevelName(level: number): string {
    const names: Record<number, string> = {
      1: 'Explorador Sostenible',
      2: 'Ciclista Urbano',
      3: 'Embajador de Movilidad Limpia',
      4: 'Guardián del Aire de Lima',
      5: 'Leyenda Cero Emisiones'
    };
    return names[level] || `Nivel ${level} EcoCommute`;
  }
}
