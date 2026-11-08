import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';
import { ChallengeItem, RedemptionItem, RewardItem } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, EcoIconComponent, MatButtonModule, MatCardModule, MatSnackBarModule],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="ticket" [size]="14"></app-icon>
            {{ i18n.t('rewards.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('rewards.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('rewards.subtitle') }}</p>
        </div>
        <div class="balance-card-inline" *ngIf="auth.currentUser as u">
          <span class="balance-icon"><app-icon name="bolt" [size]="18"></app-icon></span>
          <div>
            <span>Saldo disponible</span>
            <strong>{{ u.currentPoints }} pts</strong>
          </div>
        </div>
      </div>

      <!-- Diseño Dividido sin Cajas Anidadas: Cupones Abiertos (Izq) + Columna Vertical de Retos y Canjes (Der) -->
      <div class="rewards-open-layout">
        <div class="rewards-catalog-column">
          <div class="feed-header-inline">
            <h2>Beneficios en comercios aliados</h2>
            <span>Canjea al instante con tus puntos</span>
          </div>

          <div class="rewards-grid-2">
            <div class="ticket-voucher-card" *ngFor="let r of rewards">
              <div class="ticket-main">
                <div class="ticket-top-row">
                  <span class="reward-icon-badge">
                    <app-icon [name]="r.code || r.iconEmoji" [size]="22"></app-icon>
                  </span>
                  <span class="pts-cost-pill">
                    <app-icon name="bolt" [size]="13"></app-icon>
                    {{ r.pointsCost }} pts
                  </span>
                </div>
                <h3>{{ r.title }}</h3>
                <p>{{ r.description }}</p>
              </div>
              <div class="ticket-perforation" aria-hidden="true"></div>
              <div class="ticket-stub-footer">
                <span class="voucher-code">{{ r.code }}</span>
                <button
                  mat-flat-button
                  color="primary"
                  type="button"
                  class="btn-emerald btn-compact"
                  [disabled]="(auth.currentUser?.currentPoints || 0) < r.pointsCost"
                  (click)="onRedeem(r)"
                >
                  <app-icon name="ticket" [size]="15"></app-icon>
                  <span>
                    {{
                      (auth.currentUser?.currentPoints || 0) >= r.pointsCost
                        ? 'Canjear ahora'
                        : 'Faltan ' + (r.pointsCost - (auth.currentUser?.currentPoints || 0)) + ' pts'
                    }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra Vertical Derecha: Retos del Mes y Mis Cupones en 1 sola Columna Limpia -->
        <mat-card class="eco-card rewards-sidebar-card">
          <div class="sidebar-block">
            <h3>Retos colectivos del mes</h3>
            <p class="card-sub">Metas comunitarias activas en Lima</p>
            <ul class="vertical-challenges-list">
              <li *ngFor="let c of challenges">
                <div class="v-challenge-top">
                  <strong>{{ c.title }}</strong>
                  <span class="badge-emerald">{{ c.goalValue }} {{ formatGoalUnit(c.goalUnit) }}</span>
                </div>
                <p>{{ c.description }}</p>
                <small>Vigencia: {{ c.periodStart }} al {{ c.periodEnd }}</small>
              </li>
            </ul>
          </div>

          <div class="sidebar-divider"></div>

          <div class="sidebar-block">
            <h3>Mis cupones canjeados ({{ redemptions.length }})</h3>
            <div class="redemptions-list" *ngIf="redemptions.length; else emptyRedemptions">
              <div class="redemption-row" *ngFor="let rd of redemptions">
                <span class="redemption-icon">
                  <app-icon [name]="rd.rewardCode || rd.rewardIconEmoji" [size]="18"></app-icon>
                </span>
                <div class="redemption-info">
                  <strong>{{ rd.rewardTitle }}</strong>
                  <small>Código: <code>{{ rd.rewardCode }}</code></small>
                </div>
                <span class="status-ok">
                  <app-icon name="check" [size]="13"></app-icon>
                  <span>Activo</span>
                </span>
              </div>
            </div>
            <ng-template #emptyRedemptions>
              <p class="empty-hint">Aún no tienes cupones canjeados. ¡Elige un beneficio de la izquierda!</p>
            </ng-template>
          </div>
        </mat-card>
      </div>
    </section>
  `
})
export class RewardsComponent implements OnInit {
  rewards: RewardItem[] = [];
  redemptions: RedemptionItem[] = [];
  challenges: ChallengeItem[] = [];

  constructor(
    private api: ApiService,
    public auth: AuthService,
    public i18n: I18nService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.api.getRewards().subscribe(res => (this.rewards = res));
    this.api.getRedemptions().subscribe(res => (this.redemptions = res));
    this.api.getChallenges().subscribe(res => (this.challenges = res));
  }

  onRedeem(r: RewardItem): void {
    try {
      this.api.redeemReward(r.id).subscribe({
        next: () => {
          this.snackBar.open(
            `Cupón generado para "${r.title}" (-${r.pointsCost} pts). Código disponible en tu lista.`,
            'Cerrar',
            { duration: 5000 }
          );
          this.loadAll();
        },
        error: err => {
          this.snackBar.open(err?.error?.message || 'No se pudo completar el canje.', 'Cerrar', { duration: 5000 });
        }
      });
    } catch (e: unknown) {
      const errObj = e as { error?: { message?: string } };
      this.snackBar.open(errObj?.error?.message || 'Saldo insuficiente para este beneficio.', 'Cerrar', { duration: 5000 });
    }
  }

  formatGoalUnit(unit: string): string {
    const map: Record<string, string> = {
      kg_co2: 'kg CO₂',
      km: 'km',
      trips: 'viajes'
    };
    return map[unit] || unit;
  }
}
