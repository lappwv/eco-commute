import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { TransportMode, TripRequest, TripResponse } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

type PeriodFilter = 'ALL' | 'LAST_7' | 'LAST_30';
type ModeFilter = TransportMode | 'ALL';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EcoIconComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <section class="page-section trips-page">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="bike" [size]="14"></app-icon>
            {{ i18n.t('trips.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('trips.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('trips.subtitle') }}</p>
        </div>
      </div>

      <!-- Dos paneles simetricos: formulario a la izquierda, historial a la derecha -->
      <div class="trips-split-layout">
        <!-- Panel izquierdo: anotar o editar un viaje -->
        <mat-card class="eco-card trips-panel trips-form-panel" [ngClass]="'mode-' + form.transportMode">
          <div class="trips-panel-head">
            <span class="trips-head-badge" aria-hidden="true">
              <app-icon [name]="form.transportMode" [size]="20"></app-icon>
            </span>
            <div class="trips-head-text">
              <h2>{{ editingTripId ? i18n.t('trips.editTitle') : i18n.t('trips.newTitle') }}</h2>
              <p class="card-sub">{{ i18n.t('trips.formSub') }}</p>
            </div>
            <span class="trips-editing-pill" *ngIf="editingTripId">
              <app-icon name="edit" [size]="12"></app-icon>
              {{ i18n.t('trips.editing') }}
            </span>
          </div>

          <form (ngSubmit)="saveTrip()" class="trips-form">
            <div class="trips-form-fields">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ i18n.t('trips.transportMode') }}</mat-label>
                <mat-select [(ngModel)]="form.transportMode" name="transportMode" required>
                  <mat-option *ngFor="let m of transportModes" [value]="m">{{ i18n.t('mode.form.' + m) }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ i18n.t('trips.origin') }}</mat-label>
                <input matInput type="text" [(ngModel)]="form.originName" name="originName" required [placeholder]="i18n.t('trips.originPlaceholder')" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ i18n.t('trips.destination') }}</mat-label>
                <input matInput type="text" [(ngModel)]="form.destinationName" name="destinationName" required [placeholder]="i18n.t('trips.destinationPlaceholder')" />
              </mat-form-field>

              <div class="form-row-2">
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('trips.distanceKm') }}</mat-label>
                  <input matInput type="number" step="0.1" min="0.1" [(ngModel)]="form.distanceKm" name="distanceKm" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>{{ i18n.t('trips.durationMin') }}</mat-label>
                  <input matInput type="number" min="1" [(ngModel)]="form.durationMinutes" name="durationMinutes" required />
                </mat-form-field>
              </div>
            </div>

            <!-- Resumen vivo: cada cifra hace un pequeno rebote cuando cambia -->
            <div class="trips-live-summary">
              <span class="trips-live-label">{{ i18n.t('trips.liveSummary') }}</span>
              <div class="trips-live-grid">
                <div class="trips-live-tile tone-leaf">
                  <span class="trips-live-icon"><app-icon name="leaf" [size]="15"></app-icon></span>
                  <span class="trips-live-caption">{{ i18n.t('trips.avoidsEmitting') }}</span>
                  <strong *ngFor="let v of [getPreviewSaved()]" class="trips-live-value">-{{ v | number: '1.0-0' }} <small>g CO₂</small></strong>
                </div>
                <div class="trips-live-tile tone-energy">
                  <span class="trips-live-icon"><app-icon name="flame" [size]="15"></app-icon></span>
                  <span class="trips-live-caption">{{ i18n.t('trips.energy') }}</span>
                  <strong *ngFor="let v of [getPreviewCalories()]" class="trips-live-value">{{ v | number: '1.0-0' }} <small>kcal</small></strong>
                </div>
                <div class="trips-live-tile tone-points">
                  <span class="trips-live-icon"><app-icon name="spark" [size]="15"></app-icon></span>
                  <span class="trips-live-caption">{{ i18n.t('trips.earns') }}</span>
                  <strong *ngFor="let v of [getPreviewPoints()]" class="trips-live-value">+{{ v }} <small>pts</small></strong>
                </div>
              </div>
            </div>

            <div class="form-actions-stack">
              <button mat-flat-button color="primary" type="submit" class="btn-emerald full-width">
                <app-icon [name]="editingTripId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingTripId ? i18n.t('trips.saveChanges') : i18n.t('trips.addToLog') }}</span>
              </button>
              <button mat-stroked-button type="button" class="full-width" *ngIf="editingTripId" (click)="cancelEdit()">
                <span>{{ i18n.t('trips.cancelEdit') }}</span>
              </button>
            </div>
          </form>

          <div class="toast-success trips-toast" *ngIf="feedbackMsg" role="status">
            <app-icon name="check" [size]="17"></app-icon>
            <span>{{ feedbackMsg }}</span>
          </div>
        </mat-card>

        <!-- Panel derecho: historial con filtros -->
        <mat-card class="eco-card trips-panel trips-history-panel">
          <div class="trips-panel-head">
            <span class="trips-head-badge tone-neutral" aria-hidden="true">
              <app-icon name="route" [size]="20"></app-icon>
            </span>
            <div class="trips-head-text">
              <h2>{{ i18n.t('trips.historyTitle') }}</h2>
              <p class="card-sub">{{ i18n.t('trips.historySub') }}</p>
            </div>
            <span class="trips-filter-counter">{{ i18n.tn('trips.counterOf', { count: filteredTrips.length, total: trips.length }) }}</span>
          </div>

          <div class="trips-filters">
            <div class="trips-chip-row trips-mode-filters" role="group" [attr.aria-label]="i18n.t('trips.filterModeAria')">
              <button type="button" class="trips-chip" [attr.aria-pressed]="selectedMode === 'ALL'" [class.active]="selectedMode === 'ALL'" (click)="setModeFilter('ALL')">
                <span>{{ i18n.t('trips.filterAll') }}</span>
              </button>
              <button
                type="button"
                class="trips-chip"
                *ngFor="let m of transportModes"
                [ngClass]="'mode-' + m"
                [attr.aria-pressed]="selectedMode === m"
                [class.active]="selectedMode === m"
                (click)="setModeFilter(m)"
              >
                <app-icon [name]="m" [size]="14"></app-icon>
                <span>{{ formatShortMode(m) }}</span>
              </button>
            </div>

            <div class="trips-chip-row trips-period-filters" role="group" [attr.aria-label]="i18n.t('trips.filterPeriodAria')">
              <span class="trips-filter-lead" aria-hidden="true"><app-icon name="clock" [size]="14"></app-icon></span>
              <button type="button" class="trips-chip" [attr.aria-pressed]="selectedPeriod === 'ALL'" [class.active]="selectedPeriod === 'ALL'" (click)="setPeriodFilter('ALL')">
                <span>{{ i18n.t('trips.filterAnytime') }}</span>
              </button>
              <button type="button" class="trips-chip" [attr.aria-pressed]="selectedPeriod === 'LAST_7'" [class.active]="selectedPeriod === 'LAST_7'" (click)="setPeriodFilter('LAST_7')">
                <span>{{ i18n.t('trips.last7days') }}</span>
              </button>
              <button type="button" class="trips-chip" [attr.aria-pressed]="selectedPeriod === 'LAST_30'" [class.active]="selectedPeriod === 'LAST_30'" (click)="setPeriodFilter('LAST_30')">
                <span>{{ i18n.t('trips.last30days') }}</span>
              </button>
            </div>
          </div>

          <div class="trips-list-scroll">
            <div class="trips-empty-state" *ngIf="filteredTrips.length === 0">
              <span class="trips-empty-icon"><app-icon [name]="trips.length === 0 ? 'leaf' : 'route'" [size]="26"></app-icon></span>
              <strong>{{ trips.length === 0 ? i18n.t('trips.emptyNoTripsTitle') : i18n.t('trips.emptyTitle') }}</strong>
              <span>{{ trips.length === 0 ? i18n.t('trips.emptyNoTripsSub') : i18n.t('trips.emptySub') }}</span>
              <button mat-stroked-button type="button" class="trips-empty-action" *ngIf="hasActiveFilters" (click)="clearFilters()">
                {{ i18n.t('trips.clearFilters') }}
              </button>
            </div>

            <ul class="trips-timeline-list" *ngIf="filteredTrips.length > 0">
              <li
                class="trip-entry"
                *ngFor="let t of filteredTrips; let i = index; trackBy: trackTrip"
                [ngClass]="'mode-' + t.transportMode"
                [class.editing-row]="t.id === editingTripId"
                [style.--i]="i"
              >
                <span class="trip-mode-badge" aria-hidden="true">
                  <app-icon [name]="t.transportMode" [size]="20"></app-icon>
                </span>

                <div class="trip-feed-main">
                  <div class="trip-feed-route">
                    <strong>{{ t.originName }}</strong>
                    <span class="arrow-sep" aria-hidden="true">→</span>
                    <strong>{{ t.destinationName }}</strong>
                  </div>
                  <div class="trip-feed-meta">
                    <span class="trip-mode-label">{{ formatShortMode(t.transportMode) }}</span>
                    <span>{{ i18n.tn('trips.tripMeta', { distance: (t.distanceKm | number: '1.1-2'), duration: t.durationMinutes }) }}</span>
                    <span>{{ t.caloriesBurned }} kcal</span>
                    <span>{{ i18n.formatDate(t.completedAt) }}</span>
                  </div>
                  <div class="trip-dist-bar" aria-hidden="true">
                    <span [style.--w]="distanceRatio(t)"></span>
                  </div>
                </div>

                <div class="trip-feed-impact">
                  <strong class="trip-co2">-{{ (t.co2SavedGrams | number: '1.0-0') }} g CO₂</strong>
                  <span class="trip-pts">+{{ t.pointsEarned }} pts</span>
                </div>

                <div class="trip-feed-actions">
                  <button mat-icon-button type="button" class="btn-table-action" (click)="startEdit(t)" [title]="i18n.t('trips.editTooltip')" [attr.aria-label]="i18n.t('trips.editTooltip')">
                    <app-icon name="edit" [size]="14"></app-icon>
                  </button>
                  <button mat-icon-button type="button" class="btn-table-action danger" (click)="removeTrip(t)" [title]="i18n.t('trips.deleteTooltip')" [attr.aria-label]="i18n.t('trips.deleteTooltip')">
                    <app-icon name="trash" [size]="14"></app-icon>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </mat-card>
      </div>
    </section>
  `
})
export class TripsComponent implements OnInit {
  trips: TripResponse[] = [];
  editingTripId: string | null = null;
  feedbackMsg = '';

  readonly transportModes: TransportMode[] = [
    'BICYCLE',
    'WALKING',
    'ELECTRIC_SCOOTER',
    'PUBLIC_TRANSIT',
    'CARPOOL',
    'CAR_SOLO'
  ];

  selectedMode: ModeFilter = 'ALL';
  selectedPeriod: PeriodFilter = 'ALL';

  form: TripRequest = {
    transportMode: 'BICYCLE',
    originName: 'San Isidro (Centro Financiero)',
    originLat: -12.0965,
    originLng: -77.0285,
    destinationName: 'Miraflores (Parque Kennedy)',
    destinationLat: -12.1215,
    destinationLng: -77.0298,
    distanceKm: 5.4,
    durationMinutes: 20
  };

  private co2Rates: Record<TransportMode, number> = {
    BICYCLE: 0,
    WALKING: 0,
    ELECTRIC_SCOOTER: 15,
    PUBLIC_TRANSIT: 45,
    CARPOOL: 85,
    CAR_SOLO: 170
  };

  private kcalRates: Record<TransportMode, number> = {
    BICYCLE: 32,
    WALKING: 55,
    ELECTRIC_SCOOTER: 8,
    PUBLIC_TRANSIT: 10,
    CARPOOL: 3,
    CAR_SOLO: 2
  };

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.api.getTripsHistory(0, 25).subscribe(page => {
      this.trips = page.content || [];
    });
  }

  get filteredTrips(): TripResponse[] {
    const periodLimitMs = this.selectedPeriod === 'LAST_7'
      ? 7 * 24 * 60 * 60 * 1000
      : this.selectedPeriod === 'LAST_30'
        ? 30 * 24 * 60 * 60 * 1000
        : null;
    const now = Date.now();

    return this.trips.filter(t => {
      if (this.selectedMode !== 'ALL' && t.transportMode !== this.selectedMode) {
        return false;
      }
      if (periodLimitMs !== null) {
        const completedMs = new Date(t.completedAt).getTime();
        if (now - completedMs > periodLimitMs) {
          return false;
        }
      }
      return true;
    });
  }

  setModeFilter(mode: ModeFilter): void {
    this.selectedMode = mode;
  }

  setPeriodFilter(period: PeriodFilter): void {
    this.selectedPeriod = period;
  }

  get hasActiveFilters(): boolean {
    return this.selectedMode !== 'ALL' || this.selectedPeriod !== 'ALL';
  }

  clearFilters(): void {
    this.selectedMode = 'ALL';
    this.selectedPeriod = 'ALL';
  }

  trackTrip(_index: number, t: TripResponse): string {
    return t.id;
  }

  getPreviewBaseline(): number {
    return Math.round((this.form.distanceKm || 0) * 170);
  }

  getPreviewSaved(): number {
    const base = this.getPreviewBaseline();
    const emit = Math.round((this.form.distanceKm || 0) * (this.co2Rates[this.form.transportMode] ?? 0));
    return Math.round(Math.max(0, base - emit));
  }

  getPreviewCalories(): number {
    return Math.round((this.form.distanceKm || 0) * (this.kcalRates[this.form.transportMode] ?? 10));
  }

  getPreviewPoints(): number {
    if (this.form.transportMode === 'CAR_SOLO') return 0;
    return Math.max(5, Math.round(this.getPreviewSaved() / 10));
  }

  saveTrip(): void {
    if (this.editingTripId) {
      const id = this.editingTripId;
      this.api.updateTrip(id, this.form).subscribe(updated => {
        this.feedbackMsg = this.i18n.tn('trips.updatedMsg', {
          origin: updated.originName,
          destination: updated.destinationName,
          co2: Math.round(updated.co2SavedGrams)
        });
        this.editingTripId = null;
        this.loadTrips();
      });
    } else {
      this.api.recordTrip(this.form).subscribe(created => {
        this.feedbackMsg = this.i18n.tn('trips.createdMsg', {
          co2: Math.round(created.co2SavedGrams),
          points: created.pointsEarned
        });
        this.loadTrips();
      });
    }
  }

  /** Largo de la barra de un viaje (0 a 1) respecto al más largo de la lista visible. */
  distanceRatio(t: TripResponse): number {
    const max = Math.max(...this.filteredTrips.map(x => x.distanceKm), 0.1);
    return Math.round(Math.max(0.06, t.distanceKm / max) * 100) / 100;
  }

  startEdit(t: TripResponse): void {
    this.editingTripId = t.id;
    this.form = {
      transportMode: t.transportMode,
      originName: t.originName,
      originLat: t.originLat || -12.0965,
      originLng: t.originLng || -77.0285,
      destinationName: t.destinationName,
      destinationLat: t.destinationLat || -12.1215,
      destinationLng: t.destinationLng || -77.0298,
      distanceKm: t.distanceKm,
      durationMinutes: t.durationMinutes
    };
    this.feedbackMsg = '';
  }

  cancelEdit(): void {
    this.editingTripId = null;
    this.feedbackMsg = '';
  }

  removeTrip(t: TripResponse): void {
    this.api.deleteTrip(t.id).subscribe(() => {
      this.feedbackMsg = this.i18n.tn('trips.deletedMsg', { origin: t.originName, destination: t.destinationName });
      if (this.editingTripId === t.id) {
        this.editingTripId = null;
      }
      this.loadTrips();
    });
  }

  formatShortMode(mode: TransportMode): string {
    return this.i18n.t(`mode.short.${mode}`);
  }
}
