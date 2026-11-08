import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { TransportMode, TripRequest, TripResponse } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

type PeriodFilter = 'ALL' | 'LAST_7' | 'LAST_30';
type ModeFilter = TransportMode | 'ALL';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="bike" [size]="14"></app-icon>
            Registro Personal de Movilidad
          </span>
          <h1 class="page-title">{{ i18n.t('trips.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('trips.subtitle') }}</p>
        </div>
      </div>

      <!-- Diseño Dividido: Formulario Vertical a la Izquierda + Bitácora Cronológica Abierta a la Derecha -->
      <div class="trips-split-layout">
        <!-- Columna Izquierda: Formulario Vertical Compacto (1 sola tarjeta) -->
        <article class="eco-card trips-vertical-form-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingTripId ? 'Editar recorrido' : 'Anotar nuevo viaje' }}</h2>
              <p class="card-sub">Calculamos al instante tu ahorro de CO₂ y puntos</p>
            </div>
            <span class="badge-pill" *ngIf="editingTripId">
              <app-icon name="edit" [size]="13"></app-icon>
              <span>Editando</span>
            </span>
          </div>

          <form (ngSubmit)="saveTrip()" class="eco-form-vertical">
            <div class="form-group">
              <label>Medio de transporte</label>
              <select [(ngModel)]="form.transportMode" name="transportMode" required>
                <option value="BICYCLE">Bicicleta Mecánica (0 g CO₂/km)</option>
                <option value="WALKING">Caminata Peatonal (0 g CO₂/km)</option>
                <option value="ELECTRIC_SCOOTER">Scooter / Bici Eléctrica (15 g CO₂/km)</option>
                <option value="PUBLIC_TRANSIT">Transporte Público (45 g CO₂/km)</option>
                <option value="CARPOOL">Auto Compartido (85 g CO₂/km)</option>
                <option value="CAR_SOLO">Automóvil Particular (170 g CO₂/km)</option>
              </select>
            </div>

            <div class="form-group">
              <label>Punto de partida</label>
              <input type="text" [(ngModel)]="form.originName" name="originName" required placeholder="Ej. San Isidro" />
            </div>

            <div class="form-group">
              <label>Destino</label>
              <input type="text" [(ngModel)]="form.destinationName" name="destinationName" required placeholder="Ej. Miraflores" />
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Distancia (km)</label>
                <input type="number" step="0.1" min="0.1" [(ngModel)]="form.distanceKm" name="distanceKm" required />
              </div>
              <div class="form-group">
                <label>Duración (min)</label>
                <input type="number" min="1" [(ngModel)]="form.durationMinutes" name="durationMinutes" required />
              </div>
            </div>

            <!-- Resumen Vertical/Compacto en lugar de 4 cajas separadas -->
            <div class="live-impact-strip">
              <div>
                <span>Evitas emitir</span>
                <strong class="text-emerald">-{{ getPreviewSaved() }} g CO₂</strong>
              </div>
              <div>
                <span>Energía</span>
                <strong>{{ getPreviewCalories() }} kcal</strong>
              </div>
              <div>
                <span>Ganas</span>
                <strong class="text-emerald">+{{ getPreviewPoints() }} pts</strong>
              </div>
            </div>

            <div class="form-actions-stack">
              <button type="submit" class="btn-emerald full-width">
                <app-icon [name]="editingTripId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingTripId ? 'Guardar cambios' : 'Añadir a mi bitácora' }}</span>
              </button>
              <button type="button" class="btn-outline full-width" *ngIf="editingTripId" (click)="cancelEdit()">
                <span>Cancelar edición</span>
              </button>
            </div>
          </form>

          <div class="toast-success" *ngIf="feedbackMsg">
            <app-icon name="check" [size]="17"></app-icon>
            <span>{{ feedbackMsg }}</span>
          </div>
        </article>

        <!-- Columna Derecha: Línea de Tiempo / Lista Vertical de Viajes (Sin tabla congestionada de 10 columnas) -->
        <div class="trips-feed-column">
          <div class="feed-header-inline">
            <h2>Historial en tu bitácora</h2>
            <span class="trips-filter-counter">{{ filteredTrips.length }} de {{ trips.length }}</span>
          </div>

          <div class="preset-chips-row trips-mode-filters">
            <button type="button" class="chip-btn" [class.active]="selectedMode === 'ALL'" (click)="setModeFilter('ALL')">
              <strong>Todos</strong>
            </button>
            <button
              type="button"
              class="chip-btn"
              *ngFor="let m of transportModes"
              [class.active]="selectedMode === m"
              (click)="setModeFilter(m)"
            >
              <strong>{{ formatShortMode(m) }}</strong>
            </button>
          </div>

          <div class="trips-timeline-list">
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
                  <span>{{ t.distanceKm | number: '1.1-2' }} km en {{ t.durationMinutes }} min</span>
                  <span>·</span>
                  <span>{{ t.caloriesBurned }} kcal</span>
                  <span>·</span>
                  <span>{{ t.completedAt | date: 'dd/MM/yyyy HH:mm' }}</span>
                </div>
              </div>

              <div class="trip-feed-impact">
                <strong class="text-emerald">-{{ t.co2SavedGrams }} g CO₂</strong>
                <span class="pts-pill">+{{ t.pointsEarned }} pts</span>
              </div>

              <div class="trip-feed-actions">
                <button type="button" class="btn-table-action" (click)="startEdit(t)" title="Editar recorrido">
                  <app-icon name="edit" [size]="14"></app-icon>
                </button>
                <button type="button" class="btn-table-action danger" (click)="removeTrip(t)" title="Eliminar recorrido">
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
    return Math.max(0, base - emit);
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
        this.feedbackMsg = `Recorrido actualizado: ${updated.originName} → ${updated.destinationName} (-${updated.co2SavedGrams} g CO₂).`;
        this.editingTripId = null;
        this.loadTrips();
      });
    } else {
      this.api.recordTrip(this.form).subscribe(created => {
        this.feedbackMsg = `Recorrido registrado: evitaste ${created.co2SavedGrams} g de CO₂ y sumaste +${created.pointsEarned} pts.`;
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
      this.feedbackMsg = `Se eliminó el recorrido (${t.originName} → ${t.destinationName}).`;
      if (this.editingTripId === t.id) {
        this.editingTripId = null;
      }
      this.loadTrips();
    });
  }

  formatShortMode(mode: TransportMode): string {
    const map: Record<TransportMode, string> = {
      BICYCLE: 'Bicicleta',
      WALKING: 'Caminata',
      ELECTRIC_SCOOTER: 'Scooter eléc.',
      PUBLIC_TRANSIT: 'Transp. público',
      CARPOOL: 'Carpool',
      CAR_SOLO: 'Automóvil'
    };
    return map[mode] || mode;
  }
}
