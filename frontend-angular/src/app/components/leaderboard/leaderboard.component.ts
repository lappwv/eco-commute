import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { DistrictsSummary, LeaderboardEntry } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="trophy" [size]="14"></app-icon>
            Comunidad EcoCommute · Lima
          </span>
          <h1 class="page-title">{{ i18n.t('leaderboard.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('leaderboard.subtitle') }}</p>
        </div>
        <div class="district-summary-pill" *ngIf="districtsSummary as ds">
          <app-icon name="pin" [size]="16"></app-icon>
          <span><strong>{{ ds.activeDistrictsCount }}</strong> distritos · <strong>{{ ds.totalRankedUsers }}</strong> vecinos</span>
        </div>
      </div>

      <!-- Podio Escalonado Vertical (#2 - #1 - #3) con Alineación Vertical Centrada -->
      <div class="podium-stepped-stage" *ngIf="entries.length >= 3">
        <article
          class="podium-pillar"
          *ngFor="let top of entries | slice: 0 : 3"
          [class.pillar-gold]="top.rank === 1"
          [class.pillar-silver]="top.rank === 2"
          [class.pillar-bronze]="top.rank === 3"
        >
          <span class="podium-medal-floating">
            <app-icon [name]="top.rank === 1 ? 'trophy' : 'medal'" [size]="16"></app-icon>
            <span>#{{ top.rank }}</span>
          </span>
          <img [src]="top.avatarUrl" [alt]="top.fullName" class="avatar-lg" />
          <h3>{{ top.fullName }}</h3>
          <span class="district-chip">
            <app-icon name="pin" [size]="12"></app-icon>
            {{ top.district }}
          </span>
          <div class="podium-pillar-score">
            <strong>{{ top.totalCo2SavedKg | number: '1.2-2' }} kg CO₂</strong>
            <span>{{ top.currentPoints }} pts · {{ top.tripsCount }} viajes</span>
          </div>
        </article>
      </div>

      <!-- Barra de Filtros en Línea + Tabla Limpia -->
      <article class="eco-card">
        <div class="filter-bar">
          <div class="filter-group">
            <label>Filtrar por distrito</label>
            <select [(ngModel)]="selectedDistrict" (change)="loadLeaderboard()">
              <option value="ALL">Todos los distritos de Lima</option>
              <option *ngFor="let d of districts" [value]="d">{{ d }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Ordenar ranking por</label>
            <select [(ngModel)]="sortBy" (change)="loadLeaderboard()">
              <option value="co2">Mayor CO₂ evitado (kg)</option>
              <option value="points">Mayor puntaje acumulado</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="eco-table">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Ciudadano</th>
                <th>Distrito</th>
                <th>CO₂ evitado</th>
                <th>Puntos</th>
                <th>Recorridos</th>
                <th>Racha</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of entries" [class.top-rank]="item.rank <= 3">
                <td>
                  <span class="rank-badge" [class.rank-1]="item.rank === 1" [class.rank-2]="item.rank === 2" [class.rank-3]="item.rank === 3">
                    <app-icon *ngIf="item.rank <= 3" [name]="item.rank === 1 ? 'trophy' : 'medal'" [size]="14"></app-icon>
                    <span>#{{ item.rank }}</span>
                  </span>
                </td>
                <td class="user-cell">
                  <img [src]="item.avatarUrl" [alt]="item.fullName" class="avatar-sm" />
                  <strong>{{ item.fullName }}</strong>
                </td>
                <td>
                  <span class="district-chip">
                    <app-icon name="pin" [size]="12"></app-icon>
                    <span>{{ item.district }}</span>
                  </span>
                </td>
                <td class="text-emerald font-bold">{{ item.totalCo2SavedKg | number: '1.2-2' }} kg</td>
                <td><span class="pts-pill">{{ item.currentPoints }} pts</span></td>
                <td>{{ item.tripsCount }}</td>
                <td>
                  <span class="streak-inline">
                    <app-icon name="flame" [size]="14"></app-icon>
                    <span>{{ item.streakDays }} d</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `
})
export class LeaderboardComponent implements OnInit {
  entries: LeaderboardEntry[] = [];
  districtsSummary: DistrictsSummary | null = null;
  districts: string[] = ['San Isidro', 'Miraflores', 'Lince', 'Surco', 'Surquillo', 'Barranco', 'Breña'];
  selectedDistrict = 'ALL';
  sortBy: 'co2' | 'points' = 'co2';

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
    this.api.getDistrictsSummary().subscribe(res => {
      this.districtsSummary = res;
      if (res?.activeDistricts?.length) {
        this.districts = res.activeDistricts;
      }
    });
  }

  loadLeaderboard(): void {
    this.api.getLeaderboard(this.selectedDistrict, this.sortBy).subscribe(res => (this.entries = res));
  }
}
