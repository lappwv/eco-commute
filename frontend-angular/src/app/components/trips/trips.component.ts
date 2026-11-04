import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { TransportMode, TripRequest, TripResponse } from '../../models/api.models';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  template: `
    <section class="app-page-container" aria-labelledby="trips-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU04 · HU05 · Operaciones CRUD Transaccionales + Cálculo Diferencial de CO₂</span>
          <h1 id="trips-title">{{ i18n.t('trips.title') }}</h1>
          <p class="subtitle">{{ i18n.t('trips.subtitle') }}</p>
        </div>
        <span class="badge-pill">POST · GET · PUT · DELETE /api/v1/trips</span>
      </div>

      <div class="grid-2-col">
        <!-- Formulario Crear / Editar Viaje (CREATE & UPDATE) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <h2>{{ editingTripId ? '✏️ Corregir Viaje Registrado (PUT)' : '➕ Registrar Nuevo Viaje Sostenible (POST)' }}</h2>
            <button *ngIf="editingTripId" type="button" class="btn-chip" (click)="resetForm()">
              Cancelar edición
            </button>
          </div>

          <form class="eco-form" (ngSubmit)="saveTrip()" aria-label="Formulario CRUD de viajes">
            <div class="form-group">
              <label for="trip-mode">Medio de Transporte</label>
              <select id="trip-mode" name="transportMode" [(ngModel)]="form.transportMode" class="eco-input" required>
                <option value="BICYCLE">🚲 Bicicleta Mecánica (0 g CO₂/km)</option>
                <option value="WALKING">🚶 Caminata Peatonal (0 g CO₂/km)</option>
                <option value="ELECTRIC_SCOOTER">🛴 Scooter / Bici Eléctrica (15 g CO₂/km)</option>
                <option value="PUBLIC_TRANSIT">🚌 Transporte Público / Metro (45 g CO₂/km)</option>
                <option value="CARPOOL">🚘 Auto Compartido Carpool (85 g CO₂/km)</option>
                <option value="CAR_SOLO">🚗 Automóvil Particular (170 g CO₂/km)</option>
              </select>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="trip-origin">Punto de Partida (Origen)</label>
                <input
                  id="trip-origin"
                  type="text"
                  name="originName"
                  [(ngModel)]="form.originName"
                  required
                  placeholder="Ej. Campus UPC Monterrico"
                  class="eco-input"
                />
              </div>
              <div class="form-group">
                <label for="trip-dest">Punto de Llegada (Destino)</label>
                <input
                  id="trip-dest"
                  type="text"
                  name="destinationName"
                  [(ngModel)]="form.destinationName"
                  required
                  placeholder="Ej. San Borja Sur"
                  class="eco-input"
                />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="trip-dist">Distancia Recorrida (km)</label>
                <input
                  id="trip-dist"
                  type="number"
                  step="0.1"
                  min="0.1"
                  name="distanceKm"
                  [(ngModel)]="form.distanceKm"
                  required
                  class="eco-input"
                />
              </div>
              <div class="form-group">
                <label for="trip-dur">Duración del Viaje (minutos)</label>
                <input
                  id="trip-dur"
                  type="number"
                  min="1"
                  name="durationMinutes"
                  [(ngModel)]="form.durationMinutes"
                  required
                  class="eco-input"
                />
              </div>
            </div>

            <!-- Vista previa del cálculo de CO2 (HU05) -->
            <div class="co2-preview-box">
              <div class="preview-item">
                <span>Línea Base Auto (170g/km)</span>
                <strong>{{ previewBaselineCo2 }} g CO₂</strong>
              </div>
              <div class="preview-item">
                <span>Emisión de tu viaje</span>
                <strong>{{ previewEmittedCo2 }} g CO₂</strong>
              </div>
              <div class="preview-item highlight">
                <span>CO₂ Ahorrado (HU05)</span>
                <strong>🌱 {{ previewSavedCo2 }} g CO₂</strong>
              </div>
              <div class="preview-item highlight">
                <span>Puntos Estimados (HU06)</span>
                <strong>⚡ +{{ previewPoints }} pts</strong>
              </div>
            </div>

            <div *ngIf="statusMessage" class="alert-success" role="status">{{ statusMessage }}</div>

            <button type="submit" class="btn-eco-primary full-width">
              {{ editingTripId ? '💾 Guardar Corrección y Recalcular CO₂ (PUT)' : '✅ Registrar Viaje Sostenible (POST)' }}
            </button>
          </form>
        </mat-card>

        <!-- Historial Paginado con Edición y Eliminación (READ, UPDATE, DELETE) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <div>
              <h2>Historial de Viajes del Usuario ({{ totalElements }})</h2>
              <p class="muted">Selecciona "Editar" o "Eliminar" en cualquier viaje para recalcular tu CO₂ y puntos.</p>
            </div>
            <span class="badge-pill">GET /api/v1/trips/history</span>
          </div>

          <div class="table-responsive">
            <table class="eco-table" aria-label="Tabla de viajes registrados">
              <thead>
                <tr>
                  <th>Trayecto</th>
                  <th>Modo</th>
                  <th>Distancia</th>
                  <th>CO₂ Ahorrado</th>
                  <th>Puntos</th>
                  <th>Acciones CRUD</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let t of trips" [class.editing-row]="editingTripId === t.id">
                  <td>
                    <strong>{{ t.originName }} → {{ t.destinationName }}</strong>
                    <div class="muted-xs">{{ t.completedAt | date:'dd/MM/yyyy HH:mm' }} · {{ t.durationMinutes }} min</div>
                    <span *ngIf="t.suspicious" class="warn-tag">⚠️ {{ t.suspiciousReason }}</span>
                  </td>
                  <td>{{ t.modeDisplayName || t.transportMode }}</td>
                  <td>{{ t.distanceKm }} km</td>
                  <td class="saved-cell">🌱 {{ t.co2SavedGrams | number:'1.0-0' }} g</td>
                  <td><strong>+{{ t.pointsEarned }} pts</strong></td>
                  <td class="actions-cell">
                    <button
                      type="button"
                      class="btn-table-action edit"
                      (click)="startEdit(t)"
                      aria-label="Editar viaje"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      type="button"
                      class="btn-table-action delete"
                      (click)="removeTrip(t)"
                      aria-label="Eliminar viaje"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </mat-card>
      </div>
    </section>
  `
})
export class TripsComponent implements OnInit {
  trips: TripResponse[] = [];
  totalElements = 0;
  editingTripId: string | null = null;
  statusMessage = '';

  form: TripRequest = {
    transportMode: 'BICYCLE',
    originName: 'Óvalo de Miraflores',
    originLat: -12.1198,
    originLng: -77.0295,
    destinationName: 'Centro Financiero San Isidro',
    destinationLat: -12.0945,
    destinationLng: -77.0336,
    distanceKm: 4.2,
    durationMinutes: 15
  };

  private modeRates: Record<TransportMode, number> = {
    BICYCLE: 0,
    WALKING: 0,
    ELECTRIC_SCOOTER: 15,
    PUBLIC_TRANSIT: 45,
    CARPOOL: 85,
    CAR_SOLO: 170
  };

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  get previewBaselineCo2(): number {
    return Math.round((this.form.distanceKm || 0) * 170);
  }

  get previewEmittedCo2(): number {
    const rate = this.modeRates[this.form.transportMode] ?? 0;
    return Math.round((this.form.distanceKm || 0) * rate);
  }

  get previewSavedCo2(): number {
    return Math.max(0, this.previewBaselineCo2 - this.previewEmittedCo2);
  }

  get previewPoints(): number {
    if (this.form.transportMode === 'CAR_SOLO') return 0;
    return Math.max(5, Math.round(this.previewSavedCo2 / 10));
  }

  loadHistory(): void {
    this.api.getTripsHistory(0, 20).subscribe(page => {
      this.trips = page.content;
      this.totalElements = page.totalElements;
    });
  }

  saveTrip(): void {
    this.statusMessage = '';
    if (this.editingTripId) {
      this.api.updateTrip(this.editingTripId, this.form).subscribe(updated => {
        this.statusMessage = `Viaje actualizado (${updated.originName} → ${updated.destinationName}). Nuevo ahorro: ${updated.co2SavedGrams} g CO₂ (+${updated.pointsEarned} pts).`;
        this.editingTripId = null;
        this.loadHistory();
      });
    } else {
      this.api.recordTrip(this.form).subscribe(created => {
        this.statusMessage = `Viaje registrado con éxito. Ahorraste ${created.co2SavedGrams} g de CO₂ y sumaste +${created.pointsEarned} puntos verdes.`;
        this.loadHistory();
      });
    }
  }

  startEdit(trip: TripResponse): void {
    this.editingTripId = trip.id;
    this.statusMessage = '';
    this.form = {
      transportMode: trip.transportMode,
      originName: trip.originName,
      originLat: trip.originLat,
      originLng: trip.originLng,
      destinationName: trip.destinationName,
      destinationLat: trip.destinationLat,
      destinationLng: trip.destinationLng,
      distanceKm: trip.distanceKm,
      durationMinutes: trip.durationMinutes
    };
  }

  removeTrip(trip: TripResponse): void {
    this.api.deleteTrip(trip.id).subscribe(() => {
      if (this.editingTripId === trip.id) {
        this.editingTripId = null;
      }
      this.statusMessage = `Viaje "${trip.originName} → ${trip.destinationName}" eliminado y estadísticas recalculadas.`;
      this.loadHistory();
    });
  }

  resetForm(): void {
    this.editingTripId = null;
    this.statusMessage = '';
    this.form = {
      transportMode: 'BICYCLE',
      originName: 'Óvalo de Miraflores',
      originLat: -12.1198,
      originLng: -77.0295,
      destinationName: 'Centro Financiero San Isidro',
      destinationLat: -12.0945,
      destinationLng: -77.0336,
      distanceKm: 4.2,
      durationMinutes: 15
    };
  }
}
