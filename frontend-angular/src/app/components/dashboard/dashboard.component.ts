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
    <div class="dash-container" *ngIf="summary as s">
      <!-- ==================== 1. HERO EDITORIAL HEADER ==================== -->
      <header class="dash-hero-header">
        <div class="dash-hero-inner">
          <div class="dash-hero-copy">
            <div class="dash-eyebrow-row">
              <span class="dash-status-pill">
                <span class="dash-pulse-dot" aria-hidden="true"></span>
                <span>En Línea · Nivel {{ s.currentLevel }}</span>
              </span>
              <span class="dash-tag-subtle">Lima Metropolitana</span>
            </div>

            <h1 class="dash-title">Hola, {{ s.fullName }}</h1>
            <p class="dash-subtitle">
              {{ i18n.t('dash.subtitle') || 'Tu panel de telemetría de movilidad sostenible, impacto ambiental y beneficios reales en Lima.' }}
            </p>
          </div>

          <!-- Acciones Rápidas con Física Táctil -->
          <div class="dash-hero-actions" aria-label="Acciones prioritarias">
            <a routerLink="/routes" class="dash-action-btn primary" title="Planificar ruta multimodal segura">
              <app-icon name="route" [size]="16"></app-icon>
              <span>Planificar ruta</span>
            </a>
            <a routerLink="/trips" class="dash-action-btn secondary" title="Registrar nuevo viaje">
              <app-icon name="plus" [size]="16"></app-icon>
              <span>Anotar viaje</span>
            </a>
            <a routerLink="/rewards" class="dash-action-btn subtle" title="Canjear Puntos Verdes">
              <app-icon name="ticket" [size]="16"></app-icon>
              <span>Canjear premios</span>
            </a>
          </div>
        </div>
      </header>

      <!-- ==================== 2. GRID DE 4 KPIS CLAVE ==================== -->
      <section class="dash-kpi-grid" aria-label="Métricas de impacto personal">
        <!-- CO2 Evitado -->
        <article class="dash-kpi-card">
          <div class="kpi-head">
            <span class="kpi-icon-wrap tint-emerald">
              <app-icon name="leaf" [size]="18"></app-icon>
            </span>
            <span class="kpi-badge emerald">Huella Neta</span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">{{ i18n.t('dash.co2Saved') || 'CO₂ evitado acumulado' }}</span>
            <div class="kpi-value-row">
              <strong class="kpi-val">{{ s.totalCo2SavedKg | number: '1.2-2' }}</strong>
              <span class="kpi-unit">kg CO₂</span>
            </div>
            <p class="kpi-context">
              ≈ <strong>{{ s.treesEquivalent | number: '1.1-1' }}</strong> árboles urbanos en absorción
            </p>
          </div>
        </article>

        <!-- Distancia Limpia -->
        <article class="dash-kpi-card">
          <div class="kpi-head">
            <span class="kpi-icon-wrap tint-teal">
              <app-icon name="bike" [size]="18"></app-icon>
            </span>
            <span class="kpi-badge teal">Movilidad Activa</span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">{{ i18n.t('dash.distance') || 'Distancia recorrida limpia' }}</span>
            <div class="kpi-value-row">
              <strong class="kpi-val">{{ s.totalDistanceKm | number: '1.1-1' }}</strong>
              <span class="kpi-unit">km</span>
            </div>
            <p class="kpi-context">
              <strong>{{ s.totalTrips }}</strong> trayectos registrados y validados
            </p>
          </div>
        </article>

        <!-- Puntos Verdes -->
        <article class="dash-kpi-card">
          <div class="kpi-head">
            <span class="kpi-icon-wrap tint-amber">
              <app-icon name="bolt" [size]="18"></app-icon>
            </span>
            <a routerLink="/rewards" class="kpi-badge-link" title="Ir a recompensas">Canjear →</a>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">{{ i18n.t('dash.points') || 'Puntos Verdes acumulados' }}</span>
            <div class="kpi-value-row">
              <strong class="kpi-val">{{ s.currentPoints | number }}</strong>
              <span class="kpi-unit">pts</span>
            </div>
            <p class="kpi-context">
              Disponibles para vouchers y comercios aliados
            </p>
          </div>
        </article>

        <!-- Calorías Quemadas -->
        <article class="dash-kpi-card">
          <div class="kpi-head">
            <span class="kpi-icon-wrap tint-rose">
              <app-icon name="flame" [size]="18"></app-icon>
            </span>
            <span class="kpi-badge rose">Salud Activa</span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">{{ i18n.t('dash.calories') || 'Energía física activa' }}</span>
            <div class="kpi-value-row">
              <strong class="kpi-val">{{ s.totalCaloriesBurned | number }}</strong>
              <span class="kpi-unit">kcal</span>
            </div>
            <p class="kpi-context">
              Aporte cardiovascular directo en cada ruta
            </p>
          </div>
        </article>
      </section>

      <!-- ==================== 3. CUERPO PRINCIPAL (2 COLUMNAS EDITORIALES) ==================== -->
      <div class="dash-main-layout">
        <!-- COLUMNA IZQUIERDA: GRÁFICO SEMANAL + REPARTO MODAL -->
        <div class="dash-content-primary">
          <!-- Gráfico Semanal -->
          <article class="dash-card">
            <div class="dash-card-header">
              <div>
                <h2 class="dash-card-title">{{ i18n.t('dash.weeklyTitle') || 'Evolución semanal de emisiones' }}</h2>
                <p class="dash-card-desc">Gramos de CO₂ evitados por día en tus desplazamientos limpios</p>
              </div>
              <span class="dash-period-chip">Últimos 7 días</span>
            </div>

            <div class="dash-chart-wrap">
              <div class="dash-chart-bars">
                <div class="chart-col" *ngFor="let item of s.weeklyTrend">
                  <span class="chart-col-val">{{ item.co2SavedGrams }}g</span>
                  <div class="chart-col-track">
                    <div
                      class="chart-col-fill"
                      [style.height.%]="getBarHeightPercent(item.co2SavedGrams)"
                      [title]="item.dayOfWeek + ': ' + item.co2SavedGrams + ' g CO₂'"
                    ></div>
                  </div>
                  <span class="chart-col-label">{{ item.dayOfWeek }}</span>
                </div>
              </div>
            </div>

            <!-- Reparto por Modo de Transporte -->
            <div class="dash-modal-split">
              <div class="split-header">
                <h3 class="split-title">{{ i18n.t('dash.modeSplit') || 'Reparto por modo de transporte' }}</h3>
                <span class="split-sub">Total de {{ s.totalTrips }} viajes</span>
              </div>

              <div class="split-list">
                <div class="split-row" *ngFor="let m of getModeEntries(s.tripsByMode)">
                  <div class="split-meta">
                    <span class="split-icon-badge">
                      <app-icon [name]="m.mode" [size]="14"></app-icon>
                    </span>
                    <span class="split-name">{{ formatMode(m.mode) }}</span>
                  </div>
                  <div class="split-bar-wrap">
                    <div
                      class="split-bar-fill"
                      [style.width.%]="(m.count / Math.max(1, s.totalTrips)) * 100"
                    ></div>
                  </div>
                  <span class="split-count">{{ m.count }} {{ m.count === 1 ? 'viaje' : 'viajes' }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- COLUMNA DERECHA: ASESOR GEMINI AI + IMPACTO COLECTIVO + INSIGNIAS -->
        <aside class="dash-sidebar">
          <!-- Asesor Gemini AI -->
          <article class="dash-card gemini-card" *ngIf="recommendation as rec">
            <div class="gemini-header">
              <span class="gemini-badge">
                <app-icon name="spark" [size]="14"></app-icon>
                <span>Asesor Gemini AI</span>
              </span>
              <span class="gemini-live-dot" title="Análisis en tiempo real"></span>
            </div>
            <h3 class="gemini-title">{{ rec.title }}</h3>
            <p class="gemini-text">{{ rec.recommendation }}</p>
            <a routerLink="/routes" class="gemini-link">
              <span>Probar ruta sugerida en el mapa</span>
              <app-icon name="arrow-right" [size]="13"></app-icon>
            </a>
          </article>

          <!-- Impacto Colectivo de Lima -->
          <article class="dash-card collective-card" *ngIf="community as c">
            <div class="collective-header">
              <h3 class="dash-card-title">Impacto colectivo Lima</h3>
              <a routerLink="/leaderboard" class="sidebar-link">Ranking →</a>
            </div>
            <div class="collective-metrics">
              <div class="collective-item">
                <span class="collective-dot green"></span>
                <div class="collective-text">
                  <strong>{{ c.totalCo2SavedTons | number: '1.2-2' }} toneladas</strong>
                  <span>de CO₂ evitadas entre {{ c.totalActiveUsers }} ciclistas</span>
                </div>
              </div>
              <div class="collective-item">
                <span class="collective-dot teal"></span>
                <div class="collective-text">
                  <strong>{{ c.totalCleanKm | number: '1.0-0' }} km limpios</strong>
                  <span>equivalentes a {{ c.totalTreesEquivalent | number: '1.0-0' }} árboles urbanos</span>
                </div>
              </div>
            </div>
          </article>

          <!-- Medallas Recientes -->
          <article class="dash-card badges-card">
            <div class="badges-header">
              <h3 class="dash-card-title">Medallas recientes</h3>
              <a routerLink="/gamification" class="sidebar-link">Ver todas →</a>
            </div>
            <div class="badges-list">
              <div
                class="badge-row"
                *ngFor="let b of s.recentBadges | slice: 0 : 3"
                [class.unlocked]="b.unlocked"
              >
                <div class="badge-icon-wrap">
                  <app-icon [name]="b.code || b.iconEmoji" [size]="16"></app-icon>
                </div>
                <div class="badge-info">
                  <strong class="badge-title">{{ b.title }}</strong>
                  <div class="badge-progress-track">
                    <div class="badge-progress-bar" [style.width.%]="b.progressPercent"></div>
                  </div>
                </div>
                <span class="badge-pct">{{ b.progressPercent }}%</span>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .dash-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 1.5rem 1rem 3.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    /* 1. HERO EDITORIAL HEADER */
    .dash-hero-header {
      background: var(--card, #FFFFFF);
      border: 1px solid var(--border, #E4E7E5);
      border-radius: 16px;
      padding: clamp(1.4rem, 2.5vw, 2.2rem);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .dash-hero-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .dash-hero-copy {
      flex: 1;
      min-width: 280px;
    }

    .dash-eyebrow-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.6rem;
    }

    .dash-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: #059669;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      letter-spacing: 0.02em;
    }

    .dash-pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulseRadar 2s infinite;
    }

    @keyframes pulseRadar {
      0% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
      }
    }

    .dash-tag-subtle {
      font-size: 0.8rem;
      color: var(--ink-muted, #78827C);
      font-weight: 500;
    }

    .dash-title {
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      font-weight: 800;
      color: var(--ink, #111613);
      letter-spacing: -0.025em;
      line-height: 1.15;
      margin: 0 0 0.35rem;
      font-family: var(--sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .dash-subtitle {
      font-size: 0.94rem;
      color: var(--ink-secondary, #4E5752);
      line-height: 1.5;
      margin: 0;
      max-width: 620px;
    }

    .dash-hero-actions {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    .dash-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.65rem 1.15rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .dash-action-btn:active {
      transform: scale(0.97);
    }

    .dash-action-btn.primary {
      background: var(--accent, #10B981);
      color: #FFFFFF;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.28);
      border: 1px solid transparent;
    }

    .dash-action-btn.primary:hover {
      background: #059669;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.35);
    }

    .dash-action-btn.secondary {
      background: var(--card-subtle, #F6F5F0);
      color: var(--ink, #111613);
      border: 1px solid var(--border, #E4E7E5);
    }

    .dash-action-btn.secondary:hover {
      background: var(--card, #FFFFFF);
      border-color: var(--border-strong, #CBD2CE);
    }

    .dash-action-btn.subtle {
      background: transparent;
      color: var(--ink-secondary, #4E5752);
      border: 1px solid transparent;
    }

    .dash-action-btn.subtle:hover {
      background: var(--card-subtle, #F6F5F0);
      color: var(--ink, #111613);
    }

    /* 2. GRID DE 4 KPIS CLAVE */
    .dash-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.15rem;
    }

    .dash-kpi-card {
      background: var(--card, #FFFFFF);
      border: 1px solid var(--border, #E4E7E5);
      border-radius: 14px;
      padding: 1.35rem 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease;
    }

    .dash-kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      border-color: var(--border-strong, #CBD2CE);
    }

    .kpi-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .kpi-icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tint-emerald { background: rgba(16, 185, 129, 0.12); color: #059669; }
    .tint-teal    { background: rgba(20, 184, 166, 0.12); color: #0d9488; }
    .tint-amber   { background: rgba(245, 158, 11, 0.12); color: #d97706; }
    .tint-rose    { background: rgba(244, 63, 94, 0.12);  color: #e11d48; }

    .kpi-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      letter-spacing: 0.02em;
    }

    .kpi-badge.emerald { background: rgba(16, 185, 129, 0.1); color: #059669; }
    .kpi-badge.teal    { background: rgba(20, 184, 166, 0.1); color: #0d9488; }
    .kpi-badge.rose    { background: rgba(244, 63, 94, 0.1);  color: #e11d48; }

    .kpi-badge-link {
      font-size: 0.75rem;
      font-weight: 700;
      color: #059669;
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .kpi-badge-link:hover {
      text-decoration: underline;
    }

    .kpi-body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .kpi-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--ink-muted, #78827C);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .kpi-value-row {
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
    }

    .kpi-val {
      font-size: 1.85rem;
      font-weight: 800;
      color: var(--ink, #111613);
      font-family: var(--mono, 'JetBrains Mono', monospace);
      letter-spacing: -0.03em;
      line-height: 1.1;
    }

    .kpi-unit {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--ink-muted, #78827C);
    }

    .kpi-context {
      font-size: 0.8rem;
      color: var(--ink-secondary, #4E5752);
      margin: 0.25rem 0 0;
      line-height: 1.4;
    }

    /* 3. MAIN LAYOUT (2 COLUMNAS) */
    .dash-main-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.65fr) minmax(300px, 1fr);
      gap: 1.5rem;
      align-items: start;
    }

    @media (max-width: 960px) {
      .dash-main-layout {
        grid-template-columns: 1fr;
      }
    }

    .dash-card {
      background: var(--card, #FFFFFF);
      border: 1px solid var(--border, #E4E7E5);
      border-radius: 16px;
      padding: 1.5rem 1.6rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }

    .dash-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .dash-card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--ink, #111613);
      margin: 0 0 0.2rem;
    }

    .dash-card-desc {
      font-size: 0.84rem;
      color: var(--ink-muted, #78827C);
      margin: 0;
    }

    .dash-period-chip {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      background: var(--card-subtle, #F6F5F0);
      color: var(--ink-secondary, #4E5752);
      border: 1px solid var(--border, #E4E7E5);
      white-space: nowrap;
    }

    /* BARS CHART */
    .dash-chart-wrap {
      margin-bottom: 2rem;
    }

    .dash-chart-bars {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.75rem;
      height: 170px;
      padding: 1rem 0.5rem 0;
      border-bottom: 1px solid var(--border, #E4E7E5);
    }

    .chart-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.45rem;
      height: 100%;
      justify-content: flex-end;
    }

    .chart-col-val {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--ink-muted, #78827C);
      font-family: var(--mono, monospace);
    }

    .chart-col-track {
      width: 100%;
      max-width: 38px;
      height: 110px;
      background: var(--card-subtle, #F6F5F0);
      border-radius: 6px;
      display: flex;
      align-items: flex-end;
      overflow: hidden;
    }

    .chart-col-fill {
      width: 100%;
      background: linear-gradient(180deg, #10B981 0%, #059669 100%);
      border-radius: 6px 6px 0 0;
      transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
    }

    .chart-col:hover .chart-col-fill {
      opacity: 0.85;
    }

    .chart-col-label {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--ink-secondary, #4E5752);
      text-transform: uppercase;
    }

    /* REPARTO MODAL */
    .dash-modal-split {
      padding-top: 1.25rem;
      border-top: 1px solid var(--border, #E4E7E5);
    }

    .split-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }

    .split-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ink, #111613);
      margin: 0;
    }

    .split-sub {
      font-size: 0.78rem;
      color: var(--ink-muted, #78827C);
    }

    .split-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .split-row {
      display: grid;
      grid-template-columns: 140px 1fr 75px;
      align-items: center;
      gap: 0.85rem;
    }

    .split-meta {
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }

    .split-icon-badge {
      color: var(--ink-secondary, #4E5752);
    }

    .split-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--ink, #111613);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .split-bar-wrap {
      height: 8px;
      background: var(--card-subtle, #F6F5F0);
      border-radius: 9999px;
      overflow: hidden;
    }

    .split-bar-fill {
      height: 100%;
      background: var(--accent, #10B981);
      border-radius: 9999px;
    }

    .split-count {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--ink-muted, #78827C);
      text-align: right;
      font-family: var(--mono, monospace);
    }

    /* SIDEBAR */
    .dash-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    /* GEMINI CARD */
    .gemini-card {
      border-left: 3px solid #10B981;
      background: linear-gradient(145deg, var(--card, #FFFFFF) 0%, rgba(16, 185, 129, 0.04) 100%);
    }

    .gemini-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .gemini-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.76rem;
      font-weight: 700;
      color: #059669;
    }

    .gemini-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
    }

    .gemini-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--ink, #111613);
      margin: 0 0 0.4rem;
    }

    .gemini-text {
      font-size: 0.86rem;
      color: var(--ink-secondary, #4E5752);
      line-height: 1.5;
      margin: 0 0 1rem;
    }

    .gemini-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: #059669;
      text-decoration: none;
      transition: transform 0.15s ease;
    }

    .gemini-link:hover {
      transform: translateX(2px);
    }

    /* COLLECTIVE CARD */
    .collective-header,
    .badges-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
    }

    .sidebar-link {
      font-size: 0.78rem;
      font-weight: 600;
      color: #059669;
      text-decoration: none;
    }

    .sidebar-link:hover {
      text-decoration: underline;
    }

    .collective-metrics {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .collective-item {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
    }

    .collective-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 5px;
      flex-shrink: 0;
    }

    .collective-dot.green { background: #10B981; }
    .collective-dot.teal  { background: #14B8A6; }

    .collective-text {
      display: flex;
      flex-direction: column;
      font-size: 0.82rem;
      color: var(--ink-secondary, #4E5752);
      line-height: 1.4;
    }

    .collective-text strong {
      color: var(--ink, #111613);
      font-size: 0.88rem;
    }

    /* BADGES */
    .badges-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .badge-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.6rem;
      border-radius: 8px;
      background: var(--card-subtle, #F6F5F0);
      transition: background 0.15s ease;
    }

    .badge-row:hover {
      background: rgba(16, 185, 129, 0.06);
    }

    .badge-icon-wrap {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--card, #FFFFFF);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink-secondary, #4E5752);
      flex-shrink: 0;
    }

    .badge-info {
      flex: 1;
      min-width: 0;
    }

    .badge-title {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--ink, #111613);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.2rem;
    }

    .badge-progress-track {
      height: 5px;
      background: rgba(0, 0, 0, 0.06);
      border-radius: 9999px;
      overflow: hidden;
    }

    .badge-progress-bar {
      height: 100%;
      background: #10B981;
      border-radius: 9999px;
    }

    .badge-pct {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: var(--mono, monospace);
      color: var(--ink-muted, #78827C);
    }

    /* REDUCED MOTION */
    @media (prefers-reduced-motion: reduce) {
      .dash-pulse-dot {
        animation: none;
      }
      .dash-action-btn,
      .dash-kpi-card,
      .chart-col-fill {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
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
