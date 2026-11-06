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

      <!-- Diseño Asimétrico: Torre Vertical de Nivel/Métricas (Izq) + Lista Abierta de Insignias (Der) -->
      <div class="gamification-split-layout">
        <!-- Columna Vertical Izquierda: Unifica Nivel + 4 Estadísticas en 1 sola tarjeta vertical -->
        <aside class="eco-card level-vertical-tower" *ngIf="milestones as m">
          <div class="tower-shield-wrap">
            <span class="level-shield-large">
              <app-icon name="medal" [size]="34"></app-icon>
            </span>
            <span class="eyebrow-tag">Nivel actual {{ m.currentLevel }}</span>
            <h2>{{ getLevelName(m.currentLevel) }}</h2>
            <p class="card-sub">
              <strong>{{ m.currentPoints }} pts</strong> acumulados · Próxima meta:
              <strong>{{ m.nextMilestonePoints }} pts</strong>
            </p>
          </div>

          <div class="tower-progress-box">
            <div class="tower-progress-labels">
              <span>Progreso de nivel</span>
              <strong>{{ m.progressPercentage }}%</strong>
            </div>
            <div class="milestone-progress-track">
              <div class="milestone-progress-fill" [style.width.%]="m.progressPercentage"></div>
            </div>
          </div>

          <!-- Datos apilados verticalmente en vez de 4 tarjetas horizontales -->
          <ul class="tower-vertical-stats" *ngIf="stats as st">
            <li>
              <span class="tower-stat-icon"><app-icon name="bolt" [size]="18"></app-icon></span>
              <div>
                <span>Puntos para canjes</span>
                <strong>{{ st.currentPoints }} pts</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="flame" [size]="18"></app-icon></span>
              <div>
                <span>Racha activa sin auto</span>
                <strong>{{ st.streakDays }} días seguidos</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="leaf" [size]="18"></app-icon></span>
              <div>
                <span>Emisiones evitadas</span>
                <strong>{{ st.totalCo2SavedKg | number: '1.2-2' }} kg CO₂</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="bike" [size]="18"></app-icon></span>
              <div>
                <span>Recorridos limpios</span>
                <strong>{{ st.totalTrips }} viajes ({{ st.totalDistanceKm | number: '1.1-1' }} km)</strong>
              </div>
            </li>
          </ul>
        </aside>

        <!-- Columna Derecha Abierta (Sin tarjeta contenedora redundante) -->
        <div class="badges-open-showcase">
          <div class="feed-header-inline">
            <h2>Colección de insignias ({{ userBadges.length }})</h2>
            <span>Se desbloquean automáticamente al cumplir cada meta</span>
          </div>

          <div class="badges-horizontal-list">
            <article
              class="badge-row-strip"
              *ngFor="let b of userBadges"
              [class.unlocked]="b.unlocked"
            >
              <span class="badge-icon-medallion">
                <app-icon [name]="b.code || b.iconEmoji" [size]="24"></app-icon>
              </span>

              <div class="badge-strip-body">
                <div class="badge-strip-head">
                  <h3>{{ b.title }}</h3>
                  <span class="badge-status-chip" [class.done]="b.unlocked">
                    <app-icon [name]="b.unlocked ? 'check' : 'lock'" [size]="13"></app-icon>
                    <span>{{ b.unlocked ? '¡Desbloqueada!' : b.progressPercent + '%' }}</span>
                  </span>
                </div>
                <p>{{ b.description }}</p>
                <div class="mode-progress-track">
                  <div class="mode-progress-fill" [style.width.%]="b.progressPercent"></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
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
