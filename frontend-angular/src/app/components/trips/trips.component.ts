import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
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
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <section class="page-section">
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

      <!-- Diseño Dividido: Formulario Vertical a la Izquierda + Bitácora Cronológica Abierta a la Derecha -->
      <div class="trips-split-layout">
        <!-- Columna Izquierda: Formulario Vertical Compacto (1 sola tarjeta) -->
        <mat-card class="eco-card trips-vertical-form-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingTripId ? i18n.t('trips.editTitle') : i18n.t('trips.newTitle') }}</h2>
              <p class="card-sub">{{ i18n.t('trips.formSub') }}</p>
            </div>
            <mat-chip-set *ngIf="editingTripId">
              <mat-chip disableRipple>
                <app-icon name="edit" [size]="13"></app-icon>
                <span>{{ i18n.t('trips.editing') }}</span>
              </mat-chip>
            </mat-chip-set>
          </div>

          <form (ngSubmit)="saveTrip()" class="eco-form-vertical">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ i18n.t('trips.transportMode') }}</mat-label>
              <mat-select [(ngModel)]="form.transportMode" name="transportMode" required>
                <mat-option value="BICYCLE">{{ i18n.t('mode.form.BICYCLE') }}</mat-option>
                <mat-option value="WALKING">{{ i18n.t('mode.form.WALKING') }}</mat-option>
                <mat-option value="ELECTRIC_SCOOTER">{{ i18n.t('mode.form.ELECTRIC_SCOOTER') }}</mat-option>
                <mat-option value="PUBLIC_TRANSIT">{{ i18n.t('mode.form.PUBLIC_TRANSIT') }}</mat-option>
                <mat-option value="CARPOOL">{{ i18n.t('mode.form.CARPOOL') }}</mat-option>
                <mat-option value="CAR_SOLO">{{ i18n.t('mode.form.CAR_SOLO') }}</mat-option>
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

            <!-- Resumen Vertical/Compacto en lugar de 4 cajas separadas -->
            <div class="live-impact-strip">
              <div>
                <span>{{ i18n.t('trips.avoidsEmitting') }}</span>
                <strong class="text-emerald">-{{ getPreviewSaved() }} g CO₂</strong>
              </div>
              <div>
                <span>{{ i18n.t('trips.energy') }}</span>
                <strong>{{ getPreviewCalories() }} kcal</strong>
              </div>
              <div>
                <span>{{ i18n.t('trips.earns') }}</span>
                <strong class="text-emerald">+{{ getPreviewPoints() }} pts</strong>
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

          <div class="toast-success" *ngIf="feedbackMsg">
            <app-icon name="check" [size]="17"></app-icon>
            <span>{{ feedbackMsg }}</span>
          </div>
        </mat-card>

        <!-- Columna Derecha: Línea de Tiempo / Lista Vertical de Viajes (Sin tabla congestionada de 10 columnas) -->
        <div class="trips-feed-column">
          <div class="feed-header-inline">
            <h2>{{ i18n.t('trips.historyTitle') }}</h2>
            <span class="trips-filter-counter">{{ i18n.tn('trips.counterOf', { count: filteredTrips.length, total: trips.length }) }}</span>
          </div>

          <div class="preset-chips-row trips-mode-filters" role="group" [attr.aria-label]="i18n.t('trips.filterModeAria')">
            <button type="button" class="chip-btn" [attr.aria-pressed]="selectedMode === 'ALL'" [class.active]="selectedMode === 'ALL'" (click)="setModeFilter('ALL')">
              <strong>{{ i18n.t('trips.filterAll') }}</strong>
            </button>
            <button
              type="button"
              class="chip-btn"
              *ngFor="let m of transportModes"
              [attr.aria-pressed]="selectedMode === m"
              [class.active]="selectedMode === m"
              (click)="setModeFilter(m)"
            >
              <strong>{{ formatShortMode(m) }}</strong>
            </button>
          </div>

          <div class="preset-chips-row trips-period-filters" role="group" [attr.aria-label]="i18n.t('trips.filterPeriodAria')">
            <button type="button" class="chip-btn" [attr.aria-pressed]="selectedPeriod === 'ALL'" [class.active]="selectedPeriod === 'ALL'" (click)="setPeriodFilter('ALL')">
              <strong>{{ i18n.t('trips.filterAll') }}</strong>
            </button>
            <button type="button" class="chip-btn" [attr.aria-pressed]="selectedPeriod === 'LAST_7'" [class.active]="selectedPeriod === 'LAST_7'" (click)="setPeriodFilter('LAST_7')">
              <strong>{{ i18n.t('trips.last7days') }}</strong>
            </button>
            <button type="button" class="chip-btn" [attr.aria-pressed]="selectedPeriod === 'LAST_30'" [class.active]="selectedPeriod === 'LAST_30'" (click)="setPeriodFilter('LAST_30')">
              <strong>{{ i18n.t('trips.last30days') }}</strong>
            </button>
          </div>

          <div class="trips-empty-state" *ngIf="filteredTrips.length === 0">
            <app-icon name="route" [size]="26"></app-icon>
            <strong>{{ i18n.t('trips.emptyTitle') }}</strong>
            <span>{{ i18n.t('trips.emptySub') }}</span>
          </div>

          <div class="trips-timeline-list" *ngIf="filteredTrips.length > 0">
            <div
              class="trip-feed-item"
              *ngFor="let t of filteredTrips"
              [class.editing-row]="t.id === editingTripId"
            >
              <span class="trip-feed-icon">
                <app-icon [name]="t.transportMode" [size]="20"></app-icon>
              </span>

              <div class="trip-feed-main">
                <div class="trip-feed-route">
                  <strong>{{ t.originName }}</strong>
                  <span class="arrow-sep">→</span>
                  <strong>{{ t.destinationName }}</strong>
                </div>
                <div class="trip-feed-meta">
                  <span>{{ formatShortMode(t.transportMode) }}</span>
                  <span>·</span>
                  <span>{{ i18n.tn('trips.tripMeta', { distance: (t.distanceKm | number: '1.1-2'), duration: t.durationMinutes }) }}</span>
                  <span>·</span>
                  <span>{{ t.caloriesBurned }} kcal</span>
                  <span>·</span>
                  <span>{{ i18n.formatDate(t.completedAt) }}</span>
                </div>
              </div>

              <div class="trip-feed-impact">
                <strong class="text-emerald">-{{ (t.co2SavedGrams | number: '1.0-0') }} g CO₂</strong>
                <span class="pts-pill">+{{ t.pointsEarned }} pts</span>
              </div>

              <div class="trip-feed-actions">
                <button mat-icon-button type="button" class="btn-table-action" (click)="startEdit(t)" [title]="i18n.t('trips.editTooltip')" [attr.aria-label]="i18n.t('trips.editTooltip')">
                  <app-icon name="edit" [size]="14"></app-icon>
                </button>
                <button mat-icon-button type="button" class="btn-table-action danger" (click)="removeTrip(t)" [title]="i18n.t('trips.deleteTooltip')" [attr.aria-label]="i18n.t('trips.deleteTooltip')">
                  <app-icon name="trash" [size]="14"></app-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
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
