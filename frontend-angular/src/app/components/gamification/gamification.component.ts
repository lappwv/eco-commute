import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { BadgeCatalogItem, DashboardBadge, GamificationMilestones, GamificationStats } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [CommonModule, RouterModule, EcoIconComponent, MatCardModule, MatChipsModule, MatProgressBarModule],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="medal" [size]="14"></app-icon>
            {{ i18n.t('gamification.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('gamification.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('gamification.subtitle') }}</p>
        </div>
      </div>

      <!-- Diseño Asimétrico: Torre Vertical de Nivel/Métricas (Izq) + Lista Abierta de Insignias (Der) -->
      <div class="gamification-split-layout">
        <!-- Columna Vertical Izquierda: Unifica Nivel + 4 Estadísticas en 1 sola tarjeta vertical -->
        <mat-card class="eco-card level-vertical-tower" *ngIf="milestones as m">
          <div class="tower-shield-wrap">
            <span class="level-shield-large">
              <app-icon name="medal" [size]="34"></app-icon>
            </span>
            <span class="eyebrow-tag">{{ i18n.tn('gamification.currentLevel', { level: m.currentLevel }) }}</span>
            <h2>{{ getLevelName(m.currentLevel) }}</h2>
            <p class="card-sub">
              {{ i18n.tn('gamification.pointsAccumulated', { points: m.currentPoints, next: m.nextMilestonePoints }) }}
            </p>
          </div>

          <div class="tower-progress-box">
            <div class="tower-progress-labels">
              <span>{{ i18n.t('gamification.levelProgress') }}</span>
              <strong>{{ m.progressPercentage }}%</strong>
            </div>
            <mat-progress-bar
              class="milestone-progress-track"
              mode="determinate"
              [value]="m.progressPercentage"
            ></mat-progress-bar>
          </div>

          <!-- Datos apilados verticalmente en vez de 4 tarjetas horizontales -->
          <ul class="tower-vertical-stats" *ngIf="stats as st">
            <li>
              <span class="tower-stat-icon"><app-icon name="bolt" [size]="18"></app-icon></span>
              <div>
                <span>{{ i18n.t('gamification.pointsForRedeeming') }}</span>
                <strong>{{ st.currentPoints }} pts</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="flame" [size]="18"></app-icon></span>
              <div>
                <span>{{ i18n.t('gamification.activeStreak') }}</span>
                <strong>{{ st.streakDays === 1 ? i18n.t('gamification.streakDaySingular') : i18n.tn('gamification.streakDaysPlural', { count: st.streakDays }) }}</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="leaf" [size]="18"></app-icon></span>
              <div>
                <span>{{ i18n.t('gamification.emissionsAvoided') }}</span>
                <strong>{{ st.totalCo2SavedKg | number: '1.2-2' }} kg CO₂</strong>
              </div>
            </li>
            <li>
              <span class="tower-stat-icon"><app-icon name="bike" [size]="18"></app-icon></span>
              <div>
                <span>{{ i18n.t('gamification.cleanTrips') }}</span>
                <strong>{{ i18n.tn('gamification.cleanTripsValue', { count: st.totalTrips, km: (st.totalDistanceKm | number: '1.1-1') }) }}</strong>
              </div>
            </li>
          </ul>
        </mat-card>

        <!-- Columna Derecha Abierta (Sin tarjeta contenedora redundante) -->
        <div class="badges-open-showcase">
          <div class="feed-header-inline">
            <h2>{{ i18n.tn('gamification.badgeCollection', { count: userBadges.length }) }}</h2>
            <span>{{ i18n.t('gamification.badgeCollectionSub') }}</span>
          </div>

          <div class="badges-horizontal-list">
            <article
              class="badge-row-strip"
              *ngFor="let b of userBadges"
              [class.unlocked]="b.unlocked"
            >
              <span class="badge-icon-medallion" [style.--p]="b.unlocked ? 100 : b.progressPercent">
                <app-icon [name]="b.code || b.iconEmoji" [size]="28"></app-icon>
              </span>

              <div class="badge-strip-body">
                <div class="badge-strip-head">
                  <h3>{{ i18n.tc('badge', b.code, 'title', b.title) }}</h3>
                  <mat-chip-set>
                    <mat-chip disableRipple class="badge-status-chip" [class.done]="b.unlocked">
                      <app-icon [name]="b.unlocked ? 'check' : 'lock'" [size]="13"></app-icon>
                      <span>{{ b.unlocked ? i18n.t('gamification.unlocked') : b.progressPercent + '%' }}</span>
                    </mat-chip>
                  </mat-chip-set>
                </div>
                <p>{{ i18n.tc('badge', b.code, 'description', b.description) }}</p>
                <mat-progress-bar class="mode-progress-track" mode="determinate" [value]="b.progressPercent"></mat-progress-bar>
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
    const key = `level.name.${level}`;
    const translated = this.i18n.t(key);
    return translated === key ? this.i18n.tn('level.name.generic', { level }) : translated;
  }
}
