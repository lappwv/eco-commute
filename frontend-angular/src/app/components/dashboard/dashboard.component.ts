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
    <section class="page-section dashboard-page" *ngIf="summary as s">
      <!-- ==================== SECCIÓN 1: HERO PRINCIPAL DE RUTAS ==================== -->
      <div class="dash-fullscreen-stage"><div class="cartoon-hero-banner">
        <div class="cartoon-banner-copy">
          <span class="eyebrow-tag hero-eyebrow-pill">
            <app-icon name="leaf" [size]="15"></app-icon>
            <span>Hola, {{ s.fullName }} · Nivel {{ s.currentLevel }}</span>
          </span>
          <h1 class="cartoon-banner-title">Pedalea, ahorra y transforma Lima</h1>
          <p class="cartoon-banner-sub">
            Planifica tus recorridos por ciclovías segregadas, evita la congestión vehicular y convierte cada kilómetro limpio en beneficios reales.
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

          <!-- Guía informativa lineal de los 3 pasos -->
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

        <!-- Ilustración Vectorial Estilizada: Skyline de Lima, Tarjeta de Ruta 3D, Ciclovía y Ciclista Urbano -->
        <div class="cartoon-banner-art" aria-hidden="true">
          <svg viewBox="0 0 460 238" fill="none" class="dashboard-cartoon-svg">
            <defs>
              <radialGradient id="dashSunGlow" cx="76%" cy="22%" r="54%">
                <stop offset="0%" stop-color="#FDE047" stop-opacity="0.34" />
                <stop offset="55%" stop-color="#4ADE80" stop-opacity="0.12" />
                <stop offset="100%" stop-color="#14532D" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="dashTowerA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2D6A4F" stop-opacity="0.72" />
                <stop offset="100%" stop-color="#143D29" stop-opacity="0.9" />
              </linearGradient>
              <linearGradient id="dashTowerB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#40916C" stop-opacity="0.65" />
                <stop offset="100%" stop-color="#1B4332" stop-opacity="0.88" />
              </linearGradient>
              <linearGradient id="dashCardGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.97" />
                <stop offset="100%" stop-color="#ECFDF5" stop-opacity="0.92" />
              </linearGradient>
              <linearGradient id="dashPinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FB923C" />
                <stop offset="100%" stop-color="#DC2626" />
              </linearGradient>
              <linearGradient id="dashFrameGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#34D399" />
                <stop offset="100%" stop-color="#059669" />
              </linearGradient>
              <linearGradient id="dashJacketGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#38BDF8" />
                <stop offset="100%" stop-color="#0369A1" />
              </linearGradient>
              <linearGradient id="dashBeamGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.62" />
                <stop offset="100%" stop-color="#FEF08A" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="dashLaneGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#15803D" />
                <stop offset="100%" stop-color="#16A34A" />
              </linearGradient>
            </defs>

            <!-- Resplandor atmosférico -->
            <ellipse cx="338" cy="64" rx="145" ry="92" fill="url(#dashSunGlow)" />

            <!-- Skyline arquitectónico estilizado de San Isidro / Miraflores -->
            <g opacity="0.88">
              <rect x="176" y="54" width="38" height="128" rx="4" fill="url(#dashTowerA)" />
              <path d="M183 66H207M183 78H207M183 90H207M183 102H207" stroke="#A7F3D0" stroke-opacity="0.24" stroke-width="1.5" />
              <path d="M222 36L262 24V182H222V36Z" fill="url(#dashTowerB)" />
              <path d="M230 46H254M230 58H254M230 70H254M230 82H254M230 94H254" stroke="#D1FAE5" stroke-opacity="0.25" stroke-width="1.4" />
              <rect x="270" y="68" width="44" height="114" rx="4" fill="url(#dashTowerA)" />
              <rect x="382" y="58" width="36" height="124" rx="4" fill="url(#dashTowerB)" />
              <path d="M389 72H411M389 84H411M389 96H411" stroke="#D1FAE5" stroke-opacity="0.22" stroke-width="1.4" />
            </g>

            <!-- Copas de árboles urbanos multicapa -->
            <g>
              <ellipse cx="192" cy="154" rx="28" ry="22" fill="#166534" />
              <ellipse cx="185" cy="148" rx="22" ry="17" fill="#22C55E" fill-opacity="0.65" />
              <rect x="190" y="164" width="4" height="22" rx="2" fill="#0F291E" />

              <ellipse cx="418" cy="150" rx="30" ry="24" fill="#166534" />
              <ellipse cx="412" cy="144" rx="22" ry="18" fill="#4ADE80" fill-opacity="0.58" />
              <rect x="416" y="160" width="4.5" height="26" rx="2" fill="#0F291E" />
            </g>

            <!-- Tarjeta Flotante Estilizada de Navegación y Ruta (Izquierda) -->
            <g transform="translate(14, 24)">
              <!-- Sombra suave proyectada -->
              <rect x="5" y="8" width="166" height="122" rx="16" fill="#071F12" fill-opacity="0.34" />
              <!-- Superficie cristalina -->
              <rect x="0" y="0" width="166" height="122" rx="16" fill="url(#dashCardGlass)" stroke="#A7F3D0" stroke-width="1.4" />
              <!-- Bloques cartográficos estilizados -->
              <rect x="11" y="12" width="56" height="38" rx="7" fill="#DCFCE7" />
              <rect x="74" y="12" width="81" height="34" rx="7" fill="#E0F2FE" />
              <rect x="11" y="57" width="66" height="40" rx="7" fill="#F1F5F9" />
              <rect x="84" y="53" width="71" height="44" rx="7" fill="#D1FAE5" />
              <!-- Ríos / avenidas finas -->
              <path d="M11 45 L155 38" stroke="#FFFFFF" stroke-width="3" />
              <path d="M71 12 L80 97" stroke="#FFFFFF" stroke-width="3" />

              <!-- Trazado de ciclovía activa con halo -->
              <path d="M28 82 C 50 82, 54 31, 88 31 C 114 31, 116 70, 134 68" stroke="#10B981" stroke-opacity="0.28" stroke-width="8" stroke-linecap="round" />
              <path d="M28 82 C 50 82, 54 31, 88 31 C 114 31, 116 70, 134 68" stroke="#059669" stroke-width="3.2" stroke-dasharray="6 4" stroke-linecap="round" />

              <!-- Nodo de origen -->
              <circle cx="28" cy="82" r="7" fill="#0284C7" fill-opacity="0.22" />
              <circle cx="28" cy="82" r="4.5" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.6" />

              <!-- Pin 3D esculpido de destino -->
              <ellipse cx="134" cy="72" rx="10" ry="4" fill="#059669" fill-opacity="0.28" />
              <path d="M134 68C134 68 147 52 147 41.5C147 34.3 141.2 28.5 134 28.5C126.8 28.5 121 34.3 121 41.5C121 52 134 68 134 68Z" fill="url(#dashPinGrad)" />
              <circle cx="134" cy="41.5" r="4.8" fill="#FFFFFF" />

              <!-- Píldora inferior de telemetría -->
              <rect x="11" y="101" width="144" height="15" rx="7.5" fill="#064E3B" />
              <circle cx="21" cy="108.5" r="3" fill="#4ADE80" />
              <rect x="29" y="106.5" width="68" height="4" rx="2" fill="#A7F3D0" opacity="0.85" />
              <rect x="114" y="106.5" width="32" height="4" rx="2" fill="#FDE047" opacity="0.9" />
            </g>

            <!-- Haz de luz LED delantero de la bicicleta -->
            <polygon points="366,116 448,98 448,144" fill="url(#dashBeamGrad)" />

            <!-- Estelas aerodinámicas finas -->
            <line x1="196" y1="126" x2="228" y2="126" stroke="#7DD3FC" stroke-opacity="0.65" stroke-width="2" stroke-linecap="round" />
            <line x1="186" y1="140" x2="216" y2="140" stroke="#86EFAC" stroke-opacity="0.65" stroke-width="2" stroke-linecap="round" />

            <!-- ==================== CICLISTA URBANO ESTILIZADO ==================== -->
            <g transform="translate(212, 42)">
              <!-- Sombra elíptica sobre la ciclovía -->
              <ellipse cx="86" cy="144" rx="74" ry="6.5" fill="#062312" fill-opacity="0.45" />

              <!-- Pierna posterior (profundidad) -->
              <path d="M62 66 L83 92 L76 119" stroke="#0F172A" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
              <rect x="70" y="117" width="14" height="5.5" rx="2.8" fill="#334155" />

              <!-- RUEDA TRASERA DETALLADA -->
              <g transform="translate(36, 114)">
                <circle cx="0" cy="0" r="27" stroke="#0F172A" stroke-width="5.2" />
                <circle cx="0" cy="0" r="23.2" stroke="#CBD5E1" stroke-width="1.8" />
                <g stroke="#94A3B8" stroke-width="0.9" opacity="0.85">
                  <line x1="-22" y1="0" x2="22" y2="0" />
                  <line x1="0" y1="-22" x2="0" y2="22" />
                  <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" />
                  <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" />
                </g>
                <circle cx="0" cy="0" r="6.5" stroke="#64748B" stroke-width="1.6" fill="none" />
                <circle cx="0" cy="0" r="3.4" fill="#F8FAFC" />
              </g>

              <!-- RUEDA DELANTERA DETALLADA -->
              <g transform="translate(136, 114)">
                <circle cx="0" cy="0" r="27" stroke="#0F172A" stroke-width="5.2" />
                <circle cx="0" cy="0" r="23.2" stroke="#CBD5E1" stroke-width="1.8" />
                <g stroke="#94A3B8" stroke-width="0.9" opacity="0.85">
                  <line x1="-22" y1="0" x2="22" y2="0" />
                  <line x1="0" y1="-22" x2="0" y2="22" />
                  <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" />
                  <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" />
                </g>
                <circle cx="0" cy="0" r="6.5" stroke="#64748B" stroke-width="1.6" fill="none" />
                <circle cx="0" cy="0" r="3.4" fill="#F8FAFC" />
              </g>

              <!-- Cuadro hidroformado de la bicicleta -->
              <path d="M36 114 L66 72 H114 L82 114 H36 Z" stroke="url(#dashFrameGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
              <!-- Tubo vertical y tija -->
              <line x1="59" y1="59" x2="82" y2="114" stroke="#1E293B" stroke-width="4.2" stroke-linecap="round" />
              <!-- Horquilla delantera y potencia/manubrio -->
              <line x1="136" y1="114" x2="110" y2="54" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round" />
              <path d="M101 54 H118 C122 54 124 57 122 60" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
              <!-- Faro LED frontal -->
              <rect x="119" y="64" width="8" height="6" rx="3" fill="#FEF08A" />
              <!-- Sillín ergonómico esculpido -->
              <path d="M48 56 C52 53, 66 54, 71 57 C68 60, 53 60, 48 56 Z" fill="#0F172A" />
              <!-- Catalina y biela -->
              <circle cx="82" cy="114" r="7.5" fill="#1E293B" stroke="#34D399" stroke-width="2" />

              <!-- Pierna delantera articulada -->
              <path d="M60 63 L86 86 L85 113" stroke="#1E293B" stroke-width="9.2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M81 112 H94 C96 112 97 115 95 116.5 H81 Z" fill="#F8FAFC" />

              <!-- Mochila urbana roll-top -->
              <rect x="41" y="25" width="18" height="28" rx="6" transform="rotate(-17 41 25)" fill="#F59E0B" />
              <rect x="44" y="28" width="13" height="8" rx="3" transform="rotate(-17 44 28)" fill="#D97706" />

              <!-- Torso estilizado con cortavientos -->
              <path d="M56 60 C55 44, 64 27, 76 22 C83 24, 86 32, 83 43 L69 63 Z" fill="url(#dashJacketGrad)" />
              <!-- Brazo extendido al manubrio -->
              <path d="M76 27 L93 46 L111 54" stroke="#38BDF8" stroke-width="7.2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="112" cy="54" r="3.5" fill="#FDBA74" />

              <!-- Cabeza y casco aerodinámico -->
              <circle cx="83" cy="11" r="9" fill="#FDBA74" />
              <path d="M71 10 C71 2, 79 -3, 88 -2 C95 -1, 99 4, 98 10 L71 10 Z" fill="#FACC15" />
              <path d="M89 9 H99 L96 12 H89 Z" fill="#0F172A" />
            </g>

            <!-- Perspectiva de Ciclovía Segregada + Calzada -->
            <rect x="8" y="182" width="444" height="5" rx="2.5" fill="#CBD5E1" />
            <rect x="8" y="187" width="444" height="22" rx="5" fill="url(#dashLaneGrad)" />
            <line x1="24" y1="198" x2="436" y2="198" stroke="#DCFCE7" stroke-opacity="0.85" stroke-width="2.2" stroke-dasharray="16 12" stroke-linecap="round" />
            <rect x="8" y="209" width="444" height="19" rx="5" fill="#1E293B" />
            <line x1="34" y1="218.5" x2="426" y2="218.5" stroke="#64748B" stroke-width="1.8" stroke-dasharray="22 18" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      </div>

      <!-- ==================== SECCIÓN 2: CINTA DE IMPACTO PERSONAL ==================== -->
      <div class="dash-section-block">
        <div class="section-divider-head">
          <span class="section-step-badge">01</span>
          <div>
            <h2 class="section-block-title">Tu impacto personal acumulado</h2>
            <p class="section-block-sub">Métricas verificadas a partir de tus recorridos registrados en Lima</p>
          </div>
        </div>

        <div class="eco-stat-ribbon" aria-label="Resumen de impacto personal">
          <div class="ribbon-metric accent-green">
            <span class="ribbon-icon tint-green"><app-icon name="leaf" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">CO₂ evitado total</span>
              <strong class="ribbon-val">{{ s.totalCo2SavedKg | number: '1.2-2' }} <small>kg</small></strong>
              <span class="ribbon-sub">≈ {{ s.treesEquivalent | number: '1.1-1' }} árboles urbanos</span>
            </div>
          </div>

          <div class="ribbon-metric accent-amber">
            <span class="ribbon-icon tint-yellow"><app-icon name="bike" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">Recorrido sostenible</span>
              <strong class="ribbon-val">{{ s.totalDistanceKm | number: '1.1-1' }} <small>km</small></strong>
              <span class="ribbon-sub">{{ s.totalTrips }} recorridos registrados</span>
            </div>
          </div>

          <div class="ribbon-metric accent-sky">
            <span class="ribbon-icon tint-blue"><app-icon name="bolt" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">Puntos disponibles</span>
              <strong class="ribbon-val">{{ s.currentPoints }} <small>pts</small></strong>
              <a routerLink="/rewards" class="ribbon-link">Canjear beneficios →</a>
            </div>
          </div>

          <div class="ribbon-metric accent-coral">
            <span class="ribbon-icon tint-orange"><app-icon name="flame" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">Energía activa</span>
              <strong class="ribbon-val">{{ s.totalCaloriesBurned }} <small>kcal</small></strong>
              <span class="ribbon-sub">Calorías quemadas en ruta</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== SECCIÓN 3: ANÁLISIS SEMANAL Y COMUNIDAD ==================== -->
      <div class="dash-section-block">
        <div class="section-divider-head">
          <span class="section-step-badge">02</span>
          <div>
            <h2 class="section-block-title">Evolución semanal, rutas sugeridas y comunidad</h2>
            <p class="section-block-sub">Detalle diario de emisiones evitadas y avance colectivo en la ciudad</p>
          </div>
        </div>

        <div class="dash-editorial-grid">
          <!-- Panel Principal Izquierdo: Evolución Semanal y Reparto por Vehículo -->
          <article class="eco-card dash-main-chart-card">
            <div class="card-head-row">
              <div>
                <h2>Emisiones evitadas esta semana</h2>
                <p class="card-sub">Gramos de CO₂ que evitaste emitir cada día de la semana</p>
              </div>
              <span class="badge-pill">
                <app-icon name="leaf" [size]="15"></app-icon>
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
                    <span class="mode-icon-chip"><app-icon [name]="m.mode" [size]="18"></app-icon></span>
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
            <!-- Tarjeta Destacada del Asesor IA -->
            <div class="advisor-callout" *ngIf="recommendation as rec">
              <div class="advisor-callout-top">
                <span class="advisor-spark-icon"><app-icon name="spark" [size]="20"></app-icon></span>
                <div>
                  <span class="advisor-kicker">Ruta recomendada de hoy</span>
                  <h3>{{ rec.title }}</h3>
                </div>
              </div>
              <p class="advisor-text">{{ rec.recommendation }}</p>
              <a routerLink="/routes" class="inline-action-link">
                <span>Abrir ruta sugerida en el mapa</span>
                <app-icon name="arrow-right" [size]="15"></app-icon>
              </a>
            </div>

            <!-- Panel Contrastado de Impacto Colectivo y Medallas -->
            <div class="vertical-timeline-section">
              <div class="timeline-group" *ngIf="community as c">
                <div class="timeline-head">
                  <h3>Impacto colectivo en Lima</h3>
                  <a routerLink="/leaderboard" class="link-emerald">Ver ranking →</a>
                </div>
                <ul class="vertical-stat-list">
                  <li>
                    <span class="v-stat-dot green"><app-icon name="leaf" [size]="18"></app-icon></span>
                    <div class="v-stat-body">
                      <strong>{{ c.totalCo2SavedTons | number: '1.2-2' }} toneladas de CO₂</strong>
                      <span>Evitadas entre {{ c.totalActiveUsers }} vecinos activos</span>
                    </div>
                  </li>
                  <li>
                    <span class="v-stat-dot yellow"><app-icon name="bike" [size]="18"></app-icon></span>
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
                      <app-icon [name]="b.code || b.iconEmoji" [size]="20"></app-icon>
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
