import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { AiRecommendation, CommunityImpact, DashboardSummary } from '../../models/api.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  template: `
    <section class="app-page-container" aria-labelledby="dash-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU07 · HU09 · Reportes & Toma de Decisiones · ODS 11.2</span>
          <h1 id="dash-title">{{ i18n.t('dashboard.title') }}</h1>
          <p class="subtitle">{{ i18n.t('dashboard.subtitle') }}</p>
        </div>
        <div class="demo-btn-row">
          <a routerLink="/routes" class="btn-eco-primary">🗺️ Planificar Ruta con IA</a>
          <a routerLink="/trips" class="btn-eco-outline">➕ Registrar Viaje (CRUD)</a>
        </div>
      </div>

      <!-- KPIs Personales (GET /api/v1/dashboard/summary) -->
      <div class="kpi-grid-4" *ngIf="summary">
        <mat-card class="eco-kpi-card">
          <span class="kpi-icon">🌿</span>
          <span class="kpi-label">CO₂ Total Ahorrado</span>
          <strong class="kpi-number accent">{{ summary.totalCo2SavedKg | number:'1.2-2' }} kg</strong>
          <span class="kpi-foot">Equivale a {{ summary.treesEquivalent | number:'1.2-2' }} árboles maduros/año</span>
        </mat-card>

        <mat-card class="eco-kpi-card">
          <span class="kpi-icon">⚡</span>
          <span class="kpi-label">Saldo de Puntos Verdes</span>
          <strong class="kpi-number">{{ summary.currentPoints }} pts</strong>
          <span class="kpi-foot">Nivel Eco {{ summary.currentLevel }} · Canjeable en catálogo</span>
        </mat-card>

        <mat-card class="eco-kpi-card">
          <span class="kpi-icon">🚲</span>
          <span class="kpi-label">Distancia Sostenible</span>
          <strong class="kpi-number">{{ summary.totalDistanceKm | number:'1.1-1' }} km</strong>
          <span class="kpi-foot">{{ summary.totalTrips }} viajes verificados en Lima</span>
        </mat-card>

        <mat-card class="eco-kpi-card">
          <span class="kpi-icon">🔥</span>
          <span class="kpi-label">Salud y Calorías Activas</span>
          <strong class="kpi-number">{{ summary.totalCaloriesBurned }} kcal</strong>
          <span class="kpi-foot">Movilidad activa cero emisiones</span>
        </mat-card>
      </div>

      <div class="grid-2-col" *ngIf="summary">
        <!-- Gráfico de Evolución Semanal de CO2 Ahorrado -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <div>
              <span class="eyebrow-tag">Reporte Gráfico · Evolución Semanal</span>
              <h2>CO₂ Ahorrado por Día (gramos)</h2>
            </div>
            <span class="badge-pill">GET /api/v1/dashboard/summary</span>
          </div>

          <div class="bar-chart-container" role="img" aria-label="Gráfico de barras de evolución semanal de CO2 ahorrado">
            <div class="bar-column" *ngFor="let pt of summary.weeklyTrend">
              <span class="bar-val">{{ pt.co2SavedGrams | number:'1.0-0' }}g</span>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  [style.height.%]="getBarHeightPercent(pt.co2SavedGrams)"
                ></div>
              </div>
              <span class="bar-day">{{ pt.dayOfWeek }}</span>
            </div>
          </div>

          <div class="mode-split-box">
            <h3>Distribución por Medio de Transporte</h3>
            <div class="mode-row" *ngFor="let item of modeEntries">
              <span class="mode-name">{{ formatMode(item[0]) }}</span>
              <mat-progress-bar mode="determinate" [value]="getModePercent(item[1])"></mat-progress-bar>
              <strong class="mode-count">{{ item[1] }} viajes ({{ getModePercent(item[1]) }}%)</strong>
            </div>
          </div>
        </mat-card>

        <!-- Recomendación con Inteligencia Artificial (HU09 - Google Gemini) + Impacto Comunitario -->
        <div class="stack-col">
          <mat-card class="eco-mat-card ai-advisor-card" *ngIf="aiRecommendation">
            <div class="card-head-row">
              <span class="ai-badge">✨ IA Funcional · Google Gemini (gemini-1.5-flash)</span>
              <span class="badge-pill">HU09</span>
            </div>
            <h2>{{ aiRecommendation.title }}</h2>
            <p class="ai-text">{{ aiRecommendation.recommendation }}</p>
            <div class="ai-meta-row">
              <span>Motor: <strong>{{ aiRecommendation.advisor }}</strong></span>
              <a routerLink="/routes" class="link-accent">Simular ruta con Gemini →</a>
            </div>
          </mat-card>

          <mat-card class="eco-mat-card" *ngIf="community">
            <div class="card-head-row">
              <div>
                <span class="eyebrow-tag">Impacto Colectivo en Lima Metropolitana</span>
                <h2>Reporte Comunitario (ODS 11.2)</h2>
              </div>
              <span class="badge-pill">GET /api/v1/dashboard/community-impact</span>
            </div>
            <div class="community-stats-grid">
              <div class="comm-stat">
                <span>CO₂ Comunitario Evitado</span>
                <strong>{{ community.totalCo2SavedTons | number:'1.2-3' }} t CO₂</strong>
              </div>
              <div class="comm-stat">
                <span>Kilómetros Limpios</span>
                <strong>{{ community.totalCleanKm | number:'1.1-1' }} km</strong>
              </div>
              <div class="comm-stat">
                <span>Ciudadanos Activos</span>
                <strong>{{ community.totalActiveUsers }} usuarios</strong>
              </div>
              <div class="comm-stat">
                <span>Equivalencia Forestal</span>
                <strong>🌳 {{ community.totalTreesEquivalent | number:'1.1-1' }} árboles</strong>
              </div>
            </div>
          </mat-card>

          <mat-card class="eco-mat-card">
            <div class="card-head-row">
              <h2>Medallas y Progreso Reciente (HU10 · HU11)</h2>
              <a routerLink="/gamification" class="link-accent">Ver todas →</a>
            </div>
            <div class="badges-mini-list">
              <div
                class="badge-mini-item"
                *ngFor="let b of summary.recentBadges | slice:0:4"
                [class.unlocked]="b.unlocked"
              >
                <span class="badge-emoji">{{ b.iconEmoji }}</span>
                <div class="badge-info">
                  <strong>{{ b.title }}</strong>
                  <span>{{ b.unlocked ? 'Desbloqueada ✅' : 'Progreso: ' + b.progressPercent + '%' }}</span>
                </div>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </section>
  `
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  community: CommunityImpact | null = null;
  aiRecommendation: AiRecommendation | null = null;
  modeEntries: [string, number][] = [];

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.api.getDashboardSummary().subscribe(s => {
      this.summary = s;
      this.modeEntries = Object.entries(s.tripsByMode || {});
    });
    this.api.getCommunityImpact().subscribe(c => (this.community = c));
    this.api.getRecommendations().subscribe(r => (this.aiRecommendation = r));
  }

  getBarHeightPercent(grams: number): number {
    if (!this.summary?.weeklyTrend?.length) return 20;
    const max = Math.max(...this.summary.weeklyTrend.map(p => p.co2SavedGrams), 500);
    return Math.max(14, Math.min(100, Math.round((grams / max) * 100)));
  }

  getModePercent(count: number): number {
    if (!this.summary || !this.summary.totalTrips) return 0;
    return Math.round((count / this.summary.totalTrips) * 100);
  }

  formatMode(mode: string): string {
    const names: Record<string, string> = {
      BICYCLE: '🚲 Bicicleta',
      WALKING: '🚶 Caminata',
      ELECTRIC_SCOOTER: '🛴 Scooter Eléctrico',
      PUBLIC_TRANSIT: '🚌 Transporte Público',
      CARPOOL: '🚘 Carpool',
      CAR_SOLO: '🚗 Auto Particular'
    };
    return names[mode] || mode;
  }
}
