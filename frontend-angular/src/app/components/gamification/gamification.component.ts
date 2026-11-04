import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import {
  BadgeCatalogItem,
  ChallengeItem,
  DashboardBadge,
  GamificationMilestones,
  GamificationStats
} from '../../models/api.models';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  template: `
    <section class="app-page-container" aria-labelledby="gam-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU06 · HU10 · HU11 · HU13 · Gamificación e Incentivos Sostenibles</span>
          <h1 id="gam-title">{{ i18n.t('gamification.title') }}</h1>
          <p class="subtitle">{{ i18n.t('gamification.subtitle') }}</p>
        </div>
        <span class="badge-pill">GET /api/v1/gamification/* · /challenges</span>
      </div>

      <!-- Progreso de Nivel y Estadísticas (HU06, HU10) -->
      <div class="grid-2-col" *ngIf="stats && milestones">
        <mat-card class="eco-mat-card">
          <span class="eyebrow-tag">HU10 · Progreso de Hitos Personales</span>
          <h2>Nivel Eco {{ milestones.currentLevel }} → Próximo Hito: {{ milestones.nextMilestonePoints }} pts</h2>
          <div class="milestone-progress-wrap">
            <div class="milestone-labels">
              <span>Puntos actuales: <strong>{{ milestones.currentPoints }} pts</strong></span>
              <span>Avance: <strong>{{ milestones.progressPercentage }}%</strong></span>
            </div>
            <mat-progress-bar mode="determinate" [value]="milestones.progressPercentage"></mat-progress-bar>
          </div>
          <div class="kpi-mini-grid">
            <div class="kpi-mini">
              <span class="kpi-label">CO₂ Ahorrado</span>
              <strong class="kpi-val accent">{{ stats.totalCo2SavedKg | number:'1.2-2' }} kg</strong>
            </div>
            <div class="kpi-mini">
              <span class="kpi-label">Distancia Total</span>
              <strong class="kpi-val">{{ stats.totalDistanceKm | number:'1.1-1' }} km</strong>
            </div>
            <div class="kpi-mini">
              <span class="kpi-label">Racha Sostenible</span>
              <strong class="kpi-val">🔥 {{ stats.streakDays }} días</strong>
            </div>
          </div>
        </mat-card>

        <!-- Retos Comunitarios Activos (HU13) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <div>
              <span class="eyebrow-tag">HU13 · Desafíos Comunitarios ODS 11.2</span>
              <h2>Retos Sostenibles Activos ({{ challenges.length }})</h2>
            </div>
            <span class="badge-pill">GET /api/v1/challenges</span>
          </div>
          <div class="challenges-list">
            <div class="challenge-item" *ngFor="let c of challenges">
              <div class="challenge-head">
                <strong>🎯 {{ c.title }}</strong>
                <span class="pts-tag">Meta: {{ c.goalValue }} {{ c.goalUnit }}</span>
              </div>
              <p class="muted">{{ c.description }}</p>
              <div class="muted-xs">Vigencia: {{ c.periodStart }} al {{ c.periodEnd }}</div>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Catálogo y Estado de Medallas (HU10, HU11) -->
      <mat-card class="eco-mat-card">
        <div class="card-head-row">
          <div>
            <span class="eyebrow-tag">HU10 · HU11 · Desbloqueo Automático de Logros</span>
            <h2>Mis Medallas e Insignias Ambientales</h2>
          </div>
          <span class="badge-pill">GET /api/v1/gamification/badges & /catalog</span>
        </div>

        <div class="badges-grid-3">
          <div
            class="badge-card-full"
            *ngFor="let b of userBadges"
            [class.unlocked]="b.unlocked"
          >
            <div class="badge-card-top">
              <span class="badge-emoji-lg">{{ b.iconEmoji }}</span>
              <span class="status-tag" [class.ok]="b.unlocked">
                {{ b.unlocked ? '✅ Desbloqueada' : '🔒 En progreso (' + b.progressPercent + '%)' }}
              </span>
            </div>
            <h3>{{ b.title }}</h3>
            <p class="muted">{{ b.description }}</p>
            <mat-progress-bar mode="determinate" [value]="b.progressPercent"></mat-progress-bar>
          </div>
        </div>
      </mat-card>
    </section>
  `
})
export class GamificationComponent implements OnInit {
  stats: GamificationStats | null = null;
  milestones: GamificationMilestones | null = null;
  userBadges: DashboardBadge[] = [];
  catalog: BadgeCatalogItem[] = [];
  challenges: ChallengeItem[] = [];

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.api.getGamificationStats().subscribe(s => (this.stats = s));
    this.api.getGamificationMilestones().subscribe(m => (this.milestones = m));
    this.api.getUserBadges().subscribe(b => (this.userBadges = b));
    this.api.getBadgeCatalog().subscribe(c => (this.catalog = c));
    this.api.getChallenges().subscribe(ch => (this.challenges = ch));
  }
}
