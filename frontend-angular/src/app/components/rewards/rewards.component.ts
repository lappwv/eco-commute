import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';
import { ChallengeItem, RedemptionItem, RewardItem } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="ticket" [size]="14"></app-icon>
            Alianzas Locales · Lima
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

      <div class="toast-success" *ngIf="feedbackMsg">
        <app-icon name="check" [size]="17"></app-icon>
        <span>{{ feedbackMsg }}</span>
      </div>
      <div class="toast-error" *ngIf="errorMsg">
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Tactile Ticket-Stub Partner Perks Catalog -->
      <article class="eco-card">
        <div class="card-head-row">
          <div>
            <h2>Beneficios en comercios aliados</h2>
            <p class="card-sub">Elige un beneficio y canjéalo al instante con tus puntos acumulados</p>
          </div>
        </div>

        <div class="rewards-grid">
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
                      : 'Te faltan ' + (r.pointsCost - (auth.currentUser?.currentPoints || 0)) + ' pts'
                  }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <!-- Active Challenges & Redemption History -->
      <div class="grid-2-col">
        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>Retos colectivos del mes</h2>
              <p class="card-sub">Metas comunitarias activas en Lima Metropolitana</p>
            </div>
          </div>
          <div class="challenges-list">
            <div class="challenge-item" *ngFor="let c of challenges">
              <div class="challenge-head">
                <div class="challenge-title-wrap">
                  <span class="challenge-icon-box">
                    <app-icon name="target" [size]="17"></app-icon>
                  </span>
                  <strong>{{ c.title }}</strong>
                </div>
                <span class="badge-emerald">Meta: {{ c.goalValue }} {{ formatGoalUnit(c.goalUnit) }}</span>
              </div>
              <p>{{ c.description }}</p>
              <small class="challenge-dates">Vigencia: {{ c.periodStart }} al {{ c.periodEnd }}</small>
            </div>
          </div>
        </article>

        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>Tus cupones canjeados ({{ redemptions.length }})</h2>
              <p class="card-sub">Presenta el código en el comercio aliado para hacer válido tu beneficio</p>
            </div>
          </div>
          <div class="redemptions-list" *ngIf="redemptions.length; else emptyRedemptions">
            <div class="redemption-row" *ngFor="let rd of redemptions">
              <span class="redemption-icon">
                <app-icon [name]="rd.rewardCode || rd.rewardIconEmoji" [size]="18"></app-icon>
              </span>
              <div class="redemption-info">
                <strong>{{ rd.rewardTitle }}</strong>
                <small>{{ rd.createdAt | date: 'dd/MM/yyyy HH:mm' }} · Código: {{ rd.rewardCode }}</small>
              </div>
              <span class="pts-used">-{{ rd.pointsUsed }} pts</span>
              <span class="status-ok">
                <app-icon name="check" [size]="13"></app-icon>
                <span>Activo</span>
              </span>
            </div>
          </div>
          <ng-template #emptyRedemptions>
            <p class="empty-hint">Aún no has realizado canjes. ¡Suma puntos con tus viajes y desbloquea tu primer beneficio!</p>
          </ng-template>
        </article>
      </div>
    </section>
  `
})
export class RewardsComponent implements OnInit {
  rewards: RewardItem[] = [];
  redemptions: RedemptionItem[] = [];
  challenges: ChallengeItem[] = [];
  feedbackMsg = '';
  errorMsg = '';

  constructor(private api: ApiService, public auth: AuthService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.api.getRewards().subscribe(res => (this.rewards = res));
    this.api.getRedemptions().subscribe(res => (this.redemptions = res));
    this.api.getChallenges().subscribe(res => (this.challenges = res));
  }

  onRedeem(r: RewardItem): void {
    this.feedbackMsg = '';
    this.errorMsg = '';
    try {
      this.api.redeemReward(r.id).subscribe({
        next: () => {
          this.feedbackMsg = `Cupón generado para "${r.title}" (-${r.pointsCost} pts). Código disponible en tu lista.`;
          this.loadAll();
        },
        error: err => {
          this.errorMsg = err?.error?.message || 'No se pudo completar el canje.';
        }
      });
    } catch (e: unknown) {
      const errObj = e as { error?: { message?: string } };
      this.errorMsg = errObj?.error?.message || 'Saldo insuficiente para este beneficio.';
    }
  }

  formatGoalUnit(unit: string): string {
    const map: Record<string, string> = {
      kg_co2: 'kg de CO₂',
      km: 'km limpios',
      trips: 'viajes'
    };
    return map[unit] || unit;
  }
}
