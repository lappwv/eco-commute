import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';
import { RedemptionItem, RewardItem } from '../../models/api.models';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="app-page-container" aria-labelledby="rewards-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU12 · HU14 · Canjes Transaccionales REPEATABLE_READ</span>
          <h1 id="rewards-title">{{ i18n.t('rewards.title') }}</h1>
          <p class="subtitle">{{ i18n.t('rewards.subtitle') }}</p>
        </div>
        <div class="points-balance-pill" *ngIf="auth.currentUser as u">
          <span>Saldo disponible para canje:</span>
          <strong>⚡ {{ u.currentPoints }} puntos verdes</strong>
        </div>
      </div>

      <div *ngIf="feedbackMsg" class="alert-success" role="status">{{ feedbackMsg }}</div>
      <div *ngIf="errorMsg" class="alert-error" role="alert">{{ errorMsg }}</div>

      <div class="grid-2-col">
        <!-- Catálogo de Recompensas Activas (GET /api/v1/rewards) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <h2>Catálogo de Beneficios Sostenibles ({{ rewards.length }})</h2>
            <span class="badge-pill">GET · POST /api/v1/rewards</span>
          </div>

          <div class="rewards-grid">
            <div class="reward-card" *ngFor="let r of rewards">
              <div class="reward-top">
                <span class="reward-emoji">{{ r.iconEmoji || '🎁' }}</span>
                <span class="cost-pill">{{ r.pointsCost }} pts</span>
              </div>
              <h3>{{ r.title }}</h3>
              <p class="muted">{{ r.description }}</p>
              <div class="muted-xs">Código: <code>{{ r.code }}</code></div>
              <button
                type="button"
                class="btn-eco-primary full-width"
                [disabled]="(auth.currentUser?.currentPoints || 0) < r.pointsCost"
                (click)="redeem(r)"
              >
                {{
                  (auth.currentUser?.currentPoints || 0) >= r.pointsCost
                    ? '🎟️ Canjear Recompensa (' + r.pointsCost + ' pts)'
                    : '🔒 Te faltan ' + (r.pointsCost - (auth.currentUser?.currentPoints || 0)) + ' pts'
                }}
              </button>
            </div>
          </div>
        </mat-card>

        <!-- Historial de Canjes y Cupones (GET /api/v1/redemptions - HU14) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <h2>Mis Canjes Realizados (HU14 · {{ redemptions.length }})</h2>
            <span class="badge-pill">GET /api/v1/redemptions</span>
          </div>

          <div class="table-responsive">
            <table class="eco-table" aria-label="Tabla de historial de canjes">
              <thead>
                <tr>
                  <th>Recompensa</th>
                  <th>Código Cupón</th>
                  <th>Puntos Usados</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of redemptions">
                  <td>
                    <strong>{{ item.rewardIconEmoji }} {{ item.rewardTitle }}</strong>
                  </td>
                  <td><code>{{ item.rewardCode }}-{{ item.id }}</code></td>
                  <td>-{{ item.pointsUsed }} pts</td>
                  <td><span class="status-tag ok">{{ item.status }}</span></td>
                  <td>{{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </mat-card>
      </div>
    </section>
  `
})
export class RewardsComponent implements OnInit {
  rewards: RewardItem[] = [];
  redemptions: RedemptionItem[] = [];
  feedbackMsg = '';
  errorMsg = '';

  constructor(private api: ApiService, public auth: AuthService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getRewards().subscribe(r => (this.rewards = r));
    this.api.getRedemptions().subscribe(h => (this.redemptions = h));
  }

  redeem(reward: RewardItem): void {
    this.feedbackMsg = '';
    this.errorMsg = '';
    this.api.redeemReward(reward.id).subscribe({
      next: res => {
        this.feedbackMsg = `¡Canje exitoso! Obtuviste "${res.redemption.rewardTitle}" (${res.redemption.pointsUsed} pts usados). Cupón #${res.redemption.id}.`;
        this.loadData();
      },
      error: err => {
        this.errorMsg = err?.error?.message || 'No se pudo completar el canje. Verifica tu saldo de puntos.';
      }
    });
  }
}
