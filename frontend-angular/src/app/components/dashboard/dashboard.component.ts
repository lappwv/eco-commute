import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { AiRecommendation, CommunityImpact, DashboardSummary } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';
import { CountUpDirective } from '../../directives/count-up.directive';

interface QuickCorridorOption {
  index: number;
  origin: string;
  destination: string;
  distanceLabel: string;
  timeMinutes: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EcoIconComponent,
    CountUpDirective,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  template: `
    <section class="page-section dashboard-page" *ngIf="summary as s">
      <!-- ==================== SECCIÓN 1: HERO PRINCIPAL DE RUTAS ==================== -->
      <div class="dash-fullscreen-stage"><div class="cartoon-hero-banner">
        <div class="cartoon-banner-copy">
          <span class="eyebrow-tag hero-eyebrow-pill">
            <app-icon name="leaf" [size]="15"></app-icon>
            <span>{{ i18n.tn('dash.heroGreeting', { name: s.fullName, level: s.currentLevel }) }}</span>
          </span>
          <h1 class="cartoon-banner-title">{{ i18n.t('dash.heroTitle') }}</h1>
          <p class="cartoon-banner-sub">
            {{ i18n.t('dash.heroSubtitle') }}
          </p>

          <!-- Buscador Rápido de Origen / Destino con Acción Principal "Iniciar ruta" -->
          <div class="quick-route-launcher" role="region" [attr.aria-label]="i18n.t('dash.quickRouteRegionLabel')">
            <mat-form-field appearance="outline" subscriptSizing="dynamic" class="quick-route-field">
              <mat-label>
                <app-icon name="pin" [size]="14"></app-icon>
                {{ i18n.t('dash.quickRouteLabel') }}
              </mat-label>
              <mat-select [(ngModel)]="selectedQuickPreset" [attr.aria-label]="i18n.t('dash.quickRouteSelectAria')">
                <mat-option *ngFor="let c of quickCorridors" [value]="c.index">
                  {{ c.origin }} → {{ c.destination }} ({{ c.distanceLabel }} · {{ i18n.tn('dash.bikeLaneMinutes', { min: c.timeMinutes }) }})
                </mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-flat-button color="primary" type="button" class="btn-start-route" (click)="launchQuickRoute()">
              <app-icon name="route" [size]="18"></app-icon>
              <span>{{ i18n.t('dash.startRoute') }}</span>
            </button>
          </div>

          <!-- Guía informativa lineal de los 3 pasos -->
          <div class="hero-steps-guide" [attr.aria-label]="i18n.t('dash.stepsAriaLabel')">
            <a routerLink="/routes" class="step-guide-item active-step">
              <span class="step-guide-num">1</span>
              <span>{{ i18n.t('dash.step1') }}</span>
            </a>
            <span class="step-guide-sep" aria-hidden="true">→</span>
            <a routerLink="/trips" class="step-guide-item">
              <span class="step-guide-num">2</span>
              <span>{{ i18n.t('dash.step2') }}</span>
            </a>
            <span class="step-guide-sep" aria-hidden="true">→</span>
            <a routerLink="/rewards" class="step-guide-item">
              <span class="step-guide-num">3</span>
              <span>{{ i18n.t('dash.step3') }}</span>
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
              <clipPath id="dashClip"><rect x="14" y="0" width="446" height="182" /></clipPath>
              <!-- Edificios y árboles: cada capa se repite cada 460 px para el scroll infinito -->
              <g id="dashTowers" opacity="0.88">
                <rect x="176" y="54" width="38" height="128" rx="4" fill="url(#dashTowerA)" />
                <path d="M183 66H207M183 78H207M183 90H207M183 102H207" stroke="#A7F3D0" stroke-opacity="0.24" stroke-width="1.5" />
                <path d="M222 36L262 24V182H222V36Z" fill="url(#dashTowerB)" />
                <path d="M230 46H254M230 58H254M230 70H254M230 82H254M230 94H254" stroke="#D1FAE5" stroke-opacity="0.25" stroke-width="1.4" />
                <rect x="270" y="68" width="44" height="114" rx="4" fill="url(#dashTowerA)" />
                <rect x="382" y="58" width="36" height="124" rx="4" fill="url(#dashTowerB)" />
                <path d="M389 72H411M389 84H411M389 96H411" stroke="#D1FAE5" stroke-opacity="0.22" stroke-width="1.4" />
              </g>
              <g id="dashTrees">
                <ellipse cx="192" cy="154" rx="28" ry="22" fill="#166534" />
                <ellipse cx="185" cy="148" rx="22" ry="17" fill="#22C55E" fill-opacity="0.65" />
                <rect x="190" y="164" width="4" height="22" rx="2" fill="#0F291E" />
                <ellipse cx="418" cy="150" rx="30" ry="24" fill="#166534" />
                <ellipse cx="412" cy="144" rx="22" ry="18" fill="#4ADE80" fill-opacity="0.58" />
                <rect x="416" y="160" width="4.5" height="26" rx="2" fill="#0F291E" />
              </g>
            </defs>

            <!-- Resplandor atmosférico -->
            <ellipse cx="338" cy="64" rx="145" ry="92" fill="url(#dashSunGlow)" />

            <!-- Skyline de San Isidro / Miraflores: se aleja hacia atrás en bucle -->
            <g clip-path="url(#dashClip)"><g class="dash-layer-far">
              <use href="#dashTowers" />
              <use href="#dashTowers" x="460" />
            </g></g>

            <!-- Árboles urbanos: pasan más rápido (efecto de profundidad) -->
            <g clip-path="url(#dashClip)"><g class="dash-layer-near">
              <use href="#dashTrees" />
              <use href="#dashTrees" x="460" />
            </g></g>

            <!-- Tarjeta Flotante Estilizada de Navegación y Ruta (Izquierda) -->
            <g transform="translate(14, 24)"><g class="dash-card-float">
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
              <circle class="dash-ping" cx="28" cy="82" r="7" fill="#0284C7" fill-opacity="0.22" />
              <circle cx="28" cy="82" r="4.5" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.6" />

              <!-- Pin 3D esculpido de destino -->
              <ellipse cx="134" cy="72" rx="10" ry="4" fill="#059669" fill-opacity="0.28" />
              <g class="dash-pin">
                <path d="M134 68C134 68 147 52 147 41.5C147 34.3 141.2 28.5 134 28.5C126.8 28.5 121 34.3 121 41.5C121 52 134 68 134 68Z" fill="url(#dashPinGrad)" />
                <circle cx="134" cy="41.5" r="4.8" fill="#FFFFFF" />
              </g>

              <!-- Píldora inferior de telemetría -->
              <rect x="11" y="101" width="144" height="15" rx="7.5" fill="#064E3B" />
              <circle cx="21" cy="108.5" r="3" fill="#4ADE80" />
              <rect class="dash-progress" x="29" y="106.5" width="68" height="4" rx="2" fill="#A7F3D0" opacity="0.85" />
              <rect x="114" y="106.5" width="32" height="4" rx="2" fill="#FDE047" opacity="0.9" />
            </g></g>

            <!-- Haz de luz LED delantero de la bicicleta -->
            <polygon points="366,116 448,98 448,144" fill="url(#dashBeamGrad)" />

            <!-- Estelas aerodinámicas finas -->
            <line x1="196" y1="126" x2="228" y2="126" stroke="#7DD3FC" stroke-opacity="0.65" stroke-width="2" stroke-linecap="round" />
            <line x1="186" y1="140" x2="216" y2="140" stroke="#86EFAC" stroke-opacity="0.65" stroke-width="2" stroke-linecap="round" style="animation-delay: 0.4s" />
            <line x1="200" y1="156" x2="234" y2="156" stroke="#86EFAC" stroke-opacity="0.65" stroke-width="2" stroke-linecap="round" style="animation-delay: 0.8s" />

            <!-- Hojitas eco que suben -->
            <g transform="translate(300,86)"><path class="dash-leaf" style="--d: 0s" d="M0 6 C-6 0 -4 -8 4 -10 C8 -4 6 4 0 6Z" fill="#8CE52E" stroke="#1E241E" stroke-width="1.2" /></g>
            <g transform="translate(338,74)"><path class="dash-leaf" style="--d: 0.9s" d="M0 6 C-6 0 -4 -8 4 -10 C8 -4 6 4 0 6Z" fill="#8CE52E" stroke="#1E241E" stroke-width="1.2" /></g>
            <g transform="translate(270,78)"><path class="dash-leaf" style="--d: 1.7s" d="M0 6 C-6 0 -4 -8 4 -10 C8 -4 6 4 0 6Z" fill="#8CE52E" stroke="#1E241E" stroke-width="1.2" /></g>

            <!-- ==================== CICLISTA URBANO ESTILIZADO ==================== -->
            <g transform="translate(212, 42)">
              <!-- Sombra elíptica sobre la ciclovía -->
              <ellipse cx="86" cy="144" rx="74" ry="6.5" fill="#062312" fill-opacity="0.45" />

              <g class="dash-bob">

                <!-- Pierna posterior (profundidad) -->
                <path d="M62 66 L83 92 L76 119" stroke="#0F172A" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="70" y="117" width="14" height="5.5" rx="2.8" fill="#334155" />

                <!-- RUEDA TRASERA DETALLADA -->
                <g transform="translate(36, 114)"><g class="dash-wheel">
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
                </g></g>

                <!-- RUEDA DELANTERA DETALLADA -->
                <g transform="translate(136, 114)"><g class="dash-wheel">
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
                </g></g>

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
                <g transform="translate(82,114)"><g class="dash-wheel" style="--spin: 0.9s">
                  <line x1="-11" y1="0" x2="11" y2="0" stroke="#0F172A" stroke-width="2.6" stroke-linecap="round" />
                  <rect x="-15" y="-2.2" width="7" height="4.4" rx="2" fill="#475569" />
                  <rect x="8" y="-2.2" width="7" height="4.4" rx="2" fill="#475569" />
                </g></g>

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
            </g>

            <!-- Perspectiva de Ciclovía Segregada + Calzada -->
            <rect x="8" y="182" width="444" height="5" rx="2.5" fill="#CBD5E1" />
            <rect x="8" y="187" width="444" height="22" rx="5" fill="url(#dashLaneGrad)" />
            <line class="dash-road" x1="24" y1="198" x2="436" y2="198" stroke="#DCFCE7" stroke-opacity="0.85" stroke-width="2.2" stroke-dasharray="16 12" stroke-linecap="round" />
            <rect x="8" y="209" width="444" height="19" rx="5" fill="#1E293B" />
            <line class="dash-road-2" x1="34" y1="218.5" x2="426" y2="218.5" stroke="#64748B" stroke-width="1.8" stroke-dasharray="22 18" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      </div>

      <!-- ==================== SECCIÓN 2: CINTA DE IMPACTO PERSONAL ==================== -->
      <div class="dash-section-block">
        <div class="section-divider-head">
          <span class="section-step-badge">01</span>
          <div>
            <h2 class="section-block-title">{{ i18n.t('dash.section1Title') }}</h2>
            <p class="section-block-sub">{{ i18n.t('dash.section1Sub') }}</p>
          </div>
        </div>

        <div class="eco-stat-ribbon" [attr.aria-label]="i18n.t('dash.personalSummaryAria')">
          <div class="ribbon-metric accent-green">
            <span class="ribbon-icon tint-green"><app-icon name="leaf" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">{{ i18n.t('dash.co2Saved') }}</span>
              <strong class="ribbon-val"><span [appCountUp]="s.totalCo2SavedKg" [decimals]="2"></span> <small>kg</small></strong>
              <span class="ribbon-sub">{{ i18n.tn('dash.treesApprox', { count: (s.treesEquivalent | number: '1.1-1') }) }}</span>
            </div>
          </div>

          <div class="ribbon-metric accent-amber">
            <span class="ribbon-icon tint-yellow"><app-icon name="bike" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">{{ i18n.t('dash.distance') }}</span>
              <strong class="ribbon-val"><span [appCountUp]="s.totalDistanceKm" [decimals]="1"></span> <small>km</small></strong>
              <span class="ribbon-sub">{{ i18n.tn(s.totalTrips === 1 ? 'dash.tripsRegisteredOne' : 'dash.tripsRegisteredOther', { count: s.totalTrips }) }}</span>
            </div>
          </div>

          <div class="ribbon-metric accent-sky">
            <span class="ribbon-icon tint-blue"><app-icon name="bolt" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">{{ i18n.t('dash.points') }}</span>
              <strong class="ribbon-val"><span [appCountUp]="s.currentPoints"></span> <small>pts</small></strong>
              <a routerLink="/rewards" class="ribbon-link">{{ i18n.t('dash.redeemLink') }}</a>
            </div>
          </div>

          <div class="ribbon-metric accent-coral">
            <span class="ribbon-icon tint-orange"><app-icon name="flame" [size]="26"></app-icon></span>
            <div class="ribbon-copy">
              <span class="ribbon-label">{{ i18n.t('dash.calories') }}</span>
              <strong class="ribbon-val"><span [appCountUp]="s.totalCaloriesBurned"></span> <small>kcal</small></strong>
              <span class="ribbon-sub">{{ i18n.t('dash.caloriesSub') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== SECCIÓN 3: ANÁLISIS SEMANAL Y COMUNIDAD ==================== -->
      <div class="dash-section-block">
        <div class="section-divider-head">
          <span class="section-step-badge">02</span>
          <div>
            <h2 class="section-block-title">{{ i18n.t('dash.section2Title') }}</h2>
            <p class="section-block-sub">{{ i18n.t('dash.section2Sub') }}</p>
          </div>
        </div>

        <div class="dash-editorial-grid">
          <!-- Panel Principal Izquierdo: Evolución Semanal y Reparto por Vehículo -->
          <mat-card class="eco-card dash-main-chart-card">
            <div class="card-head-row">
              <div>
                <h2>{{ i18n.t('dash.weeklyTitle') }}</h2>
                <p class="card-sub">{{ i18n.t('dash.weeklySub') }}</p>
              </div>
              <mat-chip-set>
                <mat-chip disableRipple>
                  <app-icon name="leaf" [size]="15"></app-icon>
                  <span>{{ i18n.t('dash.last7days') }}</span>
                </mat-chip>
              </mat-chip-set>
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
                <h3>{{ i18n.t('dash.modeSplit') }}</h3>
                <span>{{ i18n.tn('dash.modeDistribution', { count: s.totalTrips }) }}</span>
              </div>
              <div class="mode-bars">
                <div class="mode-row" *ngFor="let m of getModeEntries(s.tripsByMode); trackBy: trackByMode">
                  <div class="mode-name-wrap">
                    <span class="mode-icon-chip"><app-icon [name]="m.mode" [size]="18"></app-icon></span>
                    <span class="mode-name">{{ formatMode(m.mode) }}</span>
                  </div>
                  <mat-progress-bar
                    class="mode-progress-track"
                    mode="determinate"
                    [value]="(m.count / Math.max(1, s.totalTrips)) * 100"
                  ></mat-progress-bar>
                  <span class="mode-count">{{ m.count }} {{ i18n.plural(m.count, 'dash.tripSingular', 'dash.tripsPlural') }}</span>
                </div>
              </div>
            </div>
          </mat-card>

          <!-- Columna Vertical Derecha -->
          <aside class="dash-vertical-sidebar">
            <!-- Tarjeta Destacada del Asesor IA -->
            <div class="advisor-callout" *ngIf="recommendation as rec">
              <div class="advisor-callout-top">
                <span class="advisor-spark-icon"><app-icon name="spark" [size]="20"></app-icon></span>
                <div>
                  <span class="advisor-kicker">{{ i18n.t('dash.advisorKicker') }}</span>
                  <h3>{{ translateRec(rec.title) }}</h3>
                </div>
              </div>
              <p class="advisor-text">{{ translateRec(rec.recommendation) }}</p>
              <a routerLink="/routes" class="inline-action-link">
                <span>{{ i18n.t('dash.openSuggestedRoute') }}</span>
                <app-icon name="arrow-right" [size]="15"></app-icon>
              </a>
            </div>

            <!-- Panel Contrastado de Impacto Colectivo y Medallas -->
            <div class="vertical-timeline-section">
              <div class="timeline-group" *ngIf="community as c">
                <div class="timeline-head">
                  <h3>{{ i18n.t('dash.collectiveImpactShort') }}</h3>
                  <a routerLink="/leaderboard" class="link-emerald">{{ i18n.t('dash.viewRanking') }}</a>
                </div>
                <ul class="vertical-stat-list">
                  <li>
                    <span class="v-stat-dot green"><app-icon name="leaf" [size]="18"></app-icon></span>
                    <div class="v-stat-body">
                      <strong>{{ i18n.tn('dash.tonsCo2', { value: (c.totalCo2SavedTons | number: '1.2-2') }) }}</strong>
                      <span>{{ i18n.tn('dash.avoidedAmongNeighbors', { count: c.totalActiveUsers }) }}</span>
                    </div>
                  </li>
                  <li>
                    <span class="v-stat-dot yellow"><app-icon name="bike" [size]="18"></app-icon></span>
                    <div class="v-stat-body">
                      <strong>{{ i18n.tn('dash.cleanKm', { value: (c.totalCleanKm | number: '1.0-0') }) }}</strong>
                      <span>{{ i18n.tn('dash.equivalentTrees', { count: (c.totalTreesEquivalent | number: '1.0-0') }) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="timeline-group">
                <div class="timeline-head">
                  <h3>{{ i18n.t('dash.recentBadges') }}</h3>
                  <a routerLink="/gamification" class="link-emerald">{{ i18n.t('dash.viewAll') }}</a>
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
                      <strong>{{ i18n.tc('badge', b.code, 'title', b.title) }}</strong>
                      <mat-progress-bar class="v-medal-bar" mode="determinate" [value]="b.progressPercent"></mat-progress-bar>
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
      timeMinutes: 12
    },
    {
      index: 1,
      origin: 'Jesús María (Av. Salaverry)',
      destination: 'San Isidro (Óvalo Gutiérrez)',
      distanceLabel: '4.2 km',
      timeMinutes: 14
    },
    {
      index: 2,
      origin: 'Miraflores (Parque Kennedy)',
      destination: 'Barranco (Plaza Municipal)',
      distanceLabel: '3.1 km',
      timeMinutes: 11
    },
    {
      index: 3,
      origin: 'Ciudad Universitaria (UNMSM)',
      destination: 'Centro Histórico (Plaza San Martín)',
      distanceLabel: '5.4 km',
      timeMinutes: 18
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

  /** Textos conocidos de la recomendación (backend y respaldo local) y su clave del diccionario. */
  private readonly knownRecommendations: Record<string, string> = {
    'Corredor Verde Optimizado con IA': 'dash.rec.greenTitle',
    'Prioriza viajes en bicicleta o caminata en horas valle para maximizar el ahorro de CO2 y ganar bonos de puntos verdes.':
      'dash.rec.greenText',
    'Corredor ciclista Arequipa – Salaverry': 'dash.rec.arequipaTitle',
    'Si sales entre las 7:00 y 9:00 a.m., toma la ciclovía segregada de Av. Salaverry o Av. Arequipa: evitarás hasta 1,445 g de CO₂ por trayecto, ahorrarás 12 minutos frente al tráfico vehicular y sumarás puntos extra para tu racha semanal.':
      'dash.rec.arequipaText'
  };

  /** Traduce la recomendación si es un texto conocido; si no, muestra el original del servidor. */
  translateRec(text: string): string {
    const key = this.knownRecommendations[text];
    return key ? this.i18n.t(key) : text;
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

  trackByMode(_index: number, item: { mode: string; count: number }): string {
    return item.mode;
  }

  getModeEntries(mapObj: Record<string, number> | undefined): { mode: string; count: number }[] {
    if (!mapObj) return [];
    return Object.entries(mapObj).map(([mode, count]) => ({ mode, count }));
  }

  formatDay(day: string): string {
    if (!day) return '';
    const clean = day.trim().toUpperCase();
    const canonicalMap: Record<string, string> = {
      MON: 'MON',
      MONDAY: 'MON',
      LUN: 'MON',
      LUNES: 'MON',
      TUE: 'TUE',
      TUESDAY: 'TUE',
      MAR: 'TUE',
      MARTES: 'TUE',
      WED: 'WED',
      WEDNESDAY: 'WED',
      MIE: 'WED',
      MIÉ: 'WED',
      MIERCOLES: 'WED',
      MIÉRCOLES: 'WED',
      THU: 'THU',
      THURSDAY: 'THU',
      JUE: 'THU',
      JUEVES: 'THU',
      FRI: 'FRI',
      FRIDAY: 'FRI',
      VIE: 'FRI',
      VIERNES: 'FRI',
      SAT: 'SAT',
      SATURDAY: 'SAT',
      SAB: 'SAT',
      SÁB: 'SAT',
      SABADO: 'SAT',
      SÁBADO: 'SAT',
      SUN: 'SUN',
      SUNDAY: 'SUN',
      DOM: 'SUN',
      DOMINGO: 'SUN'
    };
    const canonical = canonicalMap[clean];
    return canonical ? this.i18n.t(`day.${canonical}`) : day;
  }

  formatMode(mode: string): string {
    return this.i18n.t(`mode.full.${mode}`);
  }
}
