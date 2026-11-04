import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { DistrictsSummary, LeaderboardEntry } from '../../models/api.models';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  template: `
    <section class="app-page-container" aria-labelledby="lb-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU08 · Eco Identidad Urbana en Lima Metropolitana</span>
          <h1 id="lb-title">{{ i18n.t('leaderboard.title') }}</h1>
          <p class="subtitle">{{ i18n.t('leaderboard.subtitle') }}</p>
        </div>
        <div class="kpi-mini-grid" *ngIf="districtSummary">
          <div class="kpi-mini">
            <span class="kpi-label">Distritos Activos</span>
            <strong class="kpi-val accent">{{ districtSummary.activeDistrictsCount }} distritos</strong>
          </div>
          <div class="kpi-mini">
            <span class="kpi-label">Vecinos Clasificados</span>
            <strong class="kpi-val">{{ districtSummary.totalRankedUsers }} ciclistas/peatones</strong>
          </div>
        </div>
      </div>

      <mat-card class="eco-mat-card">
        <div class="filter-bar">
          <div class="filter-group">
            <label for="dist-filter">Filtrar por Distrito de Lima:</label>
            <select
              id="dist-filter"
              name="selectedDistrict"
              [(ngModel)]="selectedDistrict"
              (change)="loadRanking()"
              class="eco-input"
            >
              <option value="ALL">🏙️ Todos los distritos (Lima Metropolitana)</option>
              <option *ngFor="let d of districts" [value]="d">📍 {{ d }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Ordenar clasificación por:</label>
            <div class="demo-btn-row">
              <button
                type="button"
                class="btn-chip"
                [class.active]="sortBy === 'co2'"
                (click)="setSort('co2')"
              >
                🌱 Mayor CO₂ Ahorrado (kg)
              </button>
              <button
                type="button"
                class="btn-chip"
                [class.active]="sortBy === 'points'"
                (click)="setSort('points')"
              >
                ⚡ Mayor Puntaje Verde (pts)
              </button>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="eco-table" aria-label="Tabla de clasificación por distrito">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Ciudadano</th>
                <th>Distrito</th>
                <th>CO₂ Total Ahorrado</th>
                <th>Puntos Verdes</th>
                <th>Viajes</th>
                <th>Racha</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let entry of entries; let idx = index" [class.top-rank]="idx < 3">
                <td>
                  <span class="rank-medal">
                    {{ idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : '#' + (idx + 1) }}
                  </span>
                </td>
                <td class="user-cell">
                  <img [src]="entry.avatarUrl" [alt]="entry.fullName" class="avatar-sm" />
                  <strong>{{ entry.fullName }}</strong>
                </td>
                <td><span class="badge-pill">{{ entry.district }}</span></td>
                <td class="saved-cell"><strong>🌱 {{ entry.totalCo2SavedKg | number:'1.2-2' }} kg CO₂</strong></td>
                <td><strong>{{ entry.currentPoints }} pts</strong></td>
                <td>{{ entry.tripsCount }} viajes</td>
                <td>🔥 {{ entry.streakDays }} días</td>
              </tr>
            </tbody>
          </table>
        </div>
      </mat-card>
    </section>
  `
})
export class LeaderboardComponent implements OnInit {
  entries: LeaderboardEntry[] = [];
  districtSummary: DistrictsSummary | null = null;
  districts: string[] = ['San Isidro', 'Lince', 'Surco', 'Surquillo', 'Barranco', 'Breña'];
  selectedDistrict = 'ALL';
  sortBy: 'co2' | 'points' = 'co2';

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.api.getDistrictsSummary().subscribe(s => {
      this.districtSummary = s;
      if (s?.activeDistricts?.length) {
        this.districts = s.activeDistricts;
      }
    });
    this.loadRanking();
  }

  setSort(sort: 'co2' | 'points'): void {
    this.sortBy = sort;
    this.loadRanking();
  }

  loadRanking(): void {
    this.api.getLeaderboard(this.selectedDistrict, this.sortBy).subscribe(list => {
      this.entries = list;
    });
  }
}
