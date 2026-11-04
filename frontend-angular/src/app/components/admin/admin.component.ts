import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';
import { ChallengeItem, ChallengeRequest, RewardItem, RewardRequest } from '../../models/api.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  template: `
    <section class="app-page-container" aria-labelledby="admin-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU12 · HU13 · Control de Acceso Basado en Roles (&#64;PreAuthorize ROLE_ADMIN)</span>
          <h1 id="admin-title">{{ i18n.t('admin.title') }}</h1>
          <p class="subtitle">{{ i18n.t('admin.subtitle') }}</p>
        </div>
        <div class="demo-btn-row" *ngIf="!auth.isAdmin">
          <button type="button" class="btn-eco-primary" (click)="switchToAdmin()">
            🛡️ Activar Sesión ROLE_ADMIN (admin&#64;ecocommute.org)
          </button>
        </div>
      </div>

      <div *ngIf="bannerMessage" class="alert-success" role="status">{{ bannerMessage }}</div>

      <div class="grid-2-col">
        <!-- CRUD de Recompensas (HU12) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <h2>{{ editingRewardId ? '✏️ Editar Recompensa (PUT)' : '🎁 Crear Recompensa (HU12 · POST)' }}</h2>
            <button *ngIf="editingRewardId" type="button" class="btn-chip" (click)="resetRewardForm()">
              Cancelar
            </button>
          </div>

          <form class="eco-form" (ngSubmit)="saveReward()">
            <div class="form-row-2">
              <div class="form-group">
                <label for="rw-code">Código único</label>
                <input id="rw-code" type="text" name="rwCode" [(ngModel)]="rewardForm.code" required class="eco-input" />
              </div>
              <div class="form-group">
                <label for="rw-emoji">Ícono Emoji</label>
                <input id="rw-emoji" type="text" name="rwEmoji" [(ngModel)]="rewardForm.iconEmoji" required class="eco-input" />
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label for="rw-title">Título de la Recompensa</label>
                <input id="rw-title" type="text" name="rwTitle" [(ngModel)]="rewardForm.title" required class="eco-input" />
              </div>
              <div class="form-group">
                <label for="rw-cost">Costo en Puntos Verdes</label>
                <input id="rw-cost" type="number" min="1" name="rwCost" [(ngModel)]="rewardForm.pointsCost" required class="eco-input" />
              </div>
            </div>
            <div class="form-group">
              <label for="rw-desc">Descripción del beneficio</label>
              <input id="rw-desc" type="text" name="rwDesc" [(ngModel)]="rewardForm.description" required class="eco-input" />
            </div>
            <label class="checkbox-label">
              <input type="checkbox" name="rwActive" [(ngModel)]="rewardForm.active" />
              Recompensa activa en el catálogo público
            </label>

            <button type="submit" class="btn-eco-primary full-width">
              {{ editingRewardId ? '💾 Actualizar Recompensa (PUT /api/v1/admin/rewards)' : '➕ Publicar Recompensa (POST /api/v1/admin/rewards)' }}
            </button>
          </form>

          <div class="table-responsive" style="margin-top: 1.25rem;">
            <table class="eco-table" aria-label="Tabla administrativa de recompensas">
              <thead>
                <tr>
                  <th>Recompensa</th>
                  <th>Costo</th>
                  <th>Estado</th>
                  <th>Acciones CRUD</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of rewards">
                  <td>
                    <strong>{{ r.iconEmoji }} {{ r.title }}</strong>
                    <div class="muted-xs">{{ r.code }} · {{ r.description }}</div>
                  </td>
                  <td>{{ r.pointsCost }} pts</td>
                  <td>
                    <span class="status-tag" [class.ok]="r.active">{{ r.active ? 'Activa' : 'Inactiva' }}</span>
                  </td>
                  <td class="actions-cell">
                    <button type="button" class="btn-table-action edit" (click)="editReward(r)">✏️ Editar</button>
                    <button type="button" class="btn-table-action delete" (click)="deleteReward(r)">🗑️ Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </mat-card>

        <!-- CRUD de Retos Sostenibles (HU13) -->
        <mat-card class="eco-mat-card">
          <div class="card-head-row">
            <h2>{{ editingChallengeId ? '✏️ Editar Reto (PUT)' : '🎯 Crear Reto Comunitario (HU13 · POST)' }}</h2>
            <button *ngIf="editingChallengeId" type="button" class="btn-chip" (click)="resetChallengeForm()">
              Cancelar
            </button>
          </div>

          <form class="eco-form" (ngSubmit)="saveChallenge()">
            <div class="form-group">
              <label for="ch-title">Título del Reto Sostenible</label>
              <input id="ch-title" type="text" name="chTitle" [(ngModel)]="challengeForm.title" required class="eco-input" />
            </div>
            <div class="form-group">
              <label for="ch-desc">Descripción</label>
              <input id="ch-desc" type="text" name="chDesc" [(ngModel)]="challengeForm.description" required class="eco-input" />
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label for="ch-goal">Meta Numérica</label>
                <input id="ch-goal" type="number" min="1" name="chGoal" [(ngModel)]="challengeForm.goalValue" required class="eco-input" />
              </div>
              <div class="form-group">
                <label for="ch-unit">Unidad (kg_co2 / km / trips)</label>
                <input id="ch-unit" type="text" name="chUnit" [(ngModel)]="challengeForm.goalUnit" required class="eco-input" />
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label for="ch-start">Fecha Inicio</label>
                <input id="ch-start" type="date" name="chStart" [(ngModel)]="challengeForm.periodStart" required class="eco-input" />
              </div>
              <div class="form-group">
                <label for="ch-end">Fecha Fin</label>
                <input id="ch-end" type="date" name="chEnd" [(ngModel)]="challengeForm.periodEnd" required class="eco-input" />
              </div>
            </div>
            <label class="checkbox-label">
              <input type="checkbox" name="chActive" [(ngModel)]="challengeForm.active" />
              Reto activo para la comunidad
            </label>

            <button type="submit" class="btn-eco-primary full-width">
              {{ editingChallengeId ? '💾 Actualizar Reto (PUT /api/v1/admin/challenges)' : '➕ Publicar Reto (POST /api/v1/admin/challenges)' }}
            </button>
          </form>

          <div class="table-responsive" style="margin-top: 1.25rem;">
            <table class="eco-table" aria-label="Tabla administrativa de retos">
              <thead>
                <tr>
                  <th>Reto Comunitario</th>
                  <th>Meta</th>
                  <th>Vigencia</th>
                  <th>Acciones CRUD</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of challenges">
                  <td>
                    <strong>🎯 {{ c.title }}</strong>
                    <div class="muted-xs">{{ c.description }}</div>
                  </td>
                  <td>{{ c.goalValue }} {{ c.goalUnit }}</td>
                  <td>{{ c.periodStart }} → {{ c.periodEnd }}</td>
                  <td class="actions-cell">
                    <button type="button" class="btn-table-action edit" (click)="editChallenge(c)">✏️ Editar</button>
                    <button type="button" class="btn-table-action delete" (click)="deleteChallenge(c)">🗑️ Eliminar</button>
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
export class AdminComponent implements OnInit {
  rewards: RewardItem[] = [];
  challenges: ChallengeItem[] = [];
  editingRewardId: number | null = null;
  editingChallengeId: number | null = null;
  bannerMessage = '';

  rewardForm: RewardRequest = {
    code: 'METRO_PASS',
    title: 'Recarga Tarjeta Metro L1',
    description: 'S/ 10 de saldo en la Línea 1 del Metro de Lima',
    pointsCost: 150,
    iconEmoji: '🚇',
    active: true
  };

  challengeForm: ChallengeRequest = {
    title: 'Semana Universitaria Cero Humo',
    description: 'Llega al campus en bicicleta o caminata 5 veces esta semana',
    goalValue: 25,
    goalUnit: 'km',
    periodStart: '2026-11-04',
    periodEnd: '2026-11-30',
    active: true
  };

  constructor(private api: ApiService, public auth: AuthService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    this.api.getAdminRewards().subscribe(r => (this.rewards = r));
    this.api.getAdminChallenges().subscribe(c => (this.challenges = c));
  }

  switchToAdmin(): void {
    this.auth.login({ email: 'admin@ecocommute.org', password: 'Admin123!' }).subscribe(() => {
      this.bannerMessage = 'Sesión cambiada a Administrador (ROLE_ADMIN).';
      this.loadAdminData();
    });
  }

  saveReward(): void {
    if (this.editingRewardId) {
      this.api.updateAdminReward(this.editingRewardId, this.rewardForm).subscribe(updated => {
        this.bannerMessage = `Recompensa "${updated.title}" actualizada correctamente.`;
        this.editingRewardId = null;
        this.loadAdminData();
      });
    } else {
      this.api.createAdminReward(this.rewardForm).subscribe(created => {
        this.bannerMessage = `Recompensa "${created.title}" creada en el catálogo.`;
        this.loadAdminData();
      });
    }
  }

  editReward(r: RewardItem): void {
    this.editingRewardId = r.id;
    this.rewardForm = {
      code: r.code,
      title: r.title,
      description: r.description,
      pointsCost: r.pointsCost,
      iconEmoji: r.iconEmoji,
      active: r.active
    };
  }

  deleteReward(r: RewardItem): void {
    this.api.deleteAdminReward(r.id).subscribe(() => {
      this.bannerMessage = `Recompensa "${r.title}" eliminada del catálogo.`;
      this.loadAdminData();
    });
  }

  resetRewardForm(): void {
    this.editingRewardId = null;
    this.rewardForm = {
      code: 'METRO_PASS',
      title: 'Recarga Tarjeta Metro L1',
      description: 'S/ 10 de saldo en la Línea 1 del Metro de Lima',
      pointsCost: 150,
      iconEmoji: '🚇',
      active: true
    };
  }

  saveChallenge(): void {
    if (this.editingChallengeId) {
      this.api.updateAdminChallenge(this.editingChallengeId, this.challengeForm).subscribe(updated => {
        this.bannerMessage = `Reto "${updated.title}" actualizado correctamente.`;
        this.editingChallengeId = null;
        this.loadAdminData();
      });
    } else {
      this.api.createAdminChallenge(this.challengeForm).subscribe(created => {
        this.bannerMessage = `Reto "${created.title}" publicado para la comunidad.`;
        this.loadAdminData();
      });
    }
  }

  editChallenge(c: ChallengeItem): void {
    this.editingChallengeId = c.id;
    this.challengeForm = {
      title: c.title,
      description: c.description,
      goalValue: c.goalValue,
      goalUnit: c.goalUnit,
      periodStart: c.periodStart,
      periodEnd: c.periodEnd,
      active: c.active
    };
  }

  deleteChallenge(c: ChallengeItem): void {
    this.api.deleteAdminChallenge(c.id).subscribe(() => {
      this.bannerMessage = `Reto "${c.title}" eliminado.`;
      this.loadAdminData();
    });
  }

  resetChallengeForm(): void {
    this.editingChallengeId = null;
    this.challengeForm = {
      title: 'Semana Universitaria Cero Humo',
      description: 'Llega al campus en bicicleta o caminata 5 veces esta semana',
      goalValue: 25,
      goalUnit: 'km',
      periodStart: '2026-11-04',
      periodEnd: '2026-11-30',
      active: true
    };
  }
}
