import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { DistrictsSummary, LeaderboardEntry } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EcoIconComponent,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule
  ],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="trophy" [size]="14"></app-icon>
            {{ i18n.t('leaderboard.eyebrow') }}
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
      <mat-card class="eco-card">
        <div class="filter-bar">
          <mat-form-field appearance="outline" class="filter-group">
            <mat-label>Filtrar por distrito</mat-label>
            <mat-select [(ngModel)]="selectedDistrict" (selectionChange)="loadLeaderboard()">
              <mat-option value="ALL">Todos los distritos de Lima</mat-option>
              <mat-option *ngFor="let d of districts" [value]="d">{{ d }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-group">
            <mat-label>Ordenar ranking por</mat-label>
            <mat-select [(ngModel)]="sortBy" (selectionChange)="loadLeaderboard()">
              <mat-option value="co2">Mayor CO₂ evitado (kg)</mat-option>
              <mat-option value="points">Mayor puntaje acumulado</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="table-responsive">
          <table mat-table [dataSource]="entries" class="eco-table">
            <ng-container matColumnDef="rank">
              <th mat-header-cell *matHeaderCellDef>Posición</th>
              <td mat-cell *matCellDef="let item">
                <span class="rank-badge" [class.rank-1]="item.rank === 1" [class.rank-2]="item.rank === 2" [class.rank-3]="item.rank === 3">
                  <app-icon *ngIf="item.rank <= 3" [name]="item.rank === 1 ? 'trophy' : 'medal'" [size]="14"></app-icon>
                  <span>#{{ item.rank }}</span>
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef>Ciudadano</th>
              <td mat-cell *matCellDef="let item" class="user-cell">
                <img [src]="item.avatarUrl" [alt]="item.fullName" class="avatar-sm" />
                <strong>{{ item.fullName }}</strong>
              </td>
            </ng-container>

            <ng-container matColumnDef="district">
              <th mat-header-cell *matHeaderCellDef>Distrito</th>
              <td mat-cell *matCellDef="let item">
                <span class="district-chip">
                  <app-icon name="pin" [size]="12"></app-icon>
                  <span>{{ item.district }}</span>
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="co2">
              <th mat-header-cell *matHeaderCellDef>CO₂ evitado</th>
              <td mat-cell *matCellDef="let item" class="text-emerald font-bold">{{ item.totalCo2SavedKg | number: '1.2-2' }} kg</td>
            </ng-container>

            <ng-container matColumnDef="points">
              <th mat-header-cell *matHeaderCellDef>Puntos</th>
              <td mat-cell *matCellDef="let item"><span class="pts-pill">{{ item.currentPoints }} pts</span></td>
            </ng-container>

            <ng-container matColumnDef="trips">
              <th mat-header-cell *matHeaderCellDef>Recorridos</th>
              <td mat-cell *matCellDef="let item">{{ item.tripsCount }}</td>
            </ng-container>

            <ng-container matColumnDef="streak">
              <th mat-header-cell *matHeaderCellDef>Racha</th>
              <td mat-cell *matCellDef="let item">
                <span class="streak-inline">
                  <app-icon name="flame" [size]="14"></app-icon>
                  <span>{{ item.streakDays }} d</span>
                </span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" [class.top-rank]="row.rank <= 3"></tr>
          </table>
        </div>
      </mat-card>
    </section>
  `
})
export class LeaderboardComponent implements OnInit {
  entries: LeaderboardEntry[] = [];
  districtsSummary: DistrictsSummary | null = null;
  districts: string[] = ['San Isidro', 'Miraflores', 'Lince', 'Surco', 'Surquillo', 'Barranco', 'Breña'];
  selectedDistrict = 'ALL';
  sortBy: 'co2' | 'points' = 'co2';
  readonly displayedColumns = ['rank', 'user', 'district', 'co2', 'points', 'trips', 'streak'];

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
