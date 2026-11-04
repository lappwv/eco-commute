import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { ChallengeItem, ChallengeRequest, RewardItem, RewardRequest } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="shield" [size]="14"></app-icon>
            Administración de Comunidad y Aliados
          </span>
          <h1 class="page-title">{{ i18n.t('admin.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('admin.subtitle') }}</p>
        </div>
      </div>

      <div class="toast-success" *ngIf="feedbackMsg">
        <app-icon name="check" [size]="17"></app-icon>
        <span>{{ feedbackMsg }}</span>
      </div>

      <div class="grid-2-col">
        <!-- Left Column: Partner Perks Management -->
        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingRewardId ? 'Editar beneficio #' + editingRewardId : 'Publicar beneficio aliado' }}</h2>
              <p class="card-sub">Define el comercio, el costo en puntos y el icono de marca</p>
            </div>
          </div>

          <form (ngSubmit)="saveReward()" class="eco-form">
            <div class="form-row-2">
              <div class="form-group">
                <label>Código del cupón</label>
                <input type="text" [(ngModel)]="rewardForm.code" name="rCode" required />
              </div>
              <div class="form-group">
                <label>Icono de marca</label>
                <select [(ngModel)]="rewardForm.iconEmoji" name="rIcon">
                  <option value="coffee">Café / Gastronomía</option>
                  <option value="bike">Bicicleta / Movilidad</option>
                  <option value="ticket">Pase cultural / Entrada</option>
                  <option value="tree">Reforestación urbana</option>
                  <option value="leaf">Beneficio sostenible</option>
                  <option value="bolt">Energía / Descuento</option>
                </select>
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Nombre del beneficio</label>
                <input type="text" [(ngModel)]="rewardForm.title" name="rTitle" required />
              </div>
              <div class="form-group">
                <label>Costo en puntos</label>
                <input type="number" min="10" [(ngModel)]="rewardForm.pointsCost" name="rPoints" required />
              </div>
            </div>

            <div class="form-group">
              <label>Descripción y comercio aliado</label>
              <input type="text" [(ngModel)]="rewardForm.description" name="rDesc" required />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="rewardForm.active" name="rActive" />
                <span>Disponible en el catálogo público</span>
              </label>
            </div>

            <div class="form-actions-row">
              <button type="submit" class="btn-emerald">
                <app-icon [name]="editingRewardId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingRewardId ? 'Guardar cambios' : 'Crear beneficio' }}</span>
              </button>
              <button type="button" class="btn-outline" *ngIf="editingRewardId" (click)="cancelRewardEdit()">
                <span>Cancelar</span>
              </button>
            </div>
          </form>

          <div class="table-responsive mt-4">
            <table class="eco-table">
              <thead>
                <tr>
                  <th>Beneficio</th>
                  <th>Código</th>
                  <th>Costo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of rewards">
                  <td>
                    <div class="user-cell">
                      <span class="mode-icon-chip">
                        <app-icon [name]="r.code || r.iconEmoji" [size]="16"></app-icon>
                      </span>
                      <strong>{{ r.title }}</strong>
                    </div>
                  </td>
                  <td><code>{{ r.code }}</code></td>
                  <td><span class="pts-pill">{{ r.pointsCost }} pts</span></td>
                  <td>
                    <span [class]="r.active ? 'status-ok' : 'status-warn'">
                      {{ r.active ? 'Activo' : 'Pausado' }}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button type="button" class="btn-table-action" (click)="editReward(r)" title="Editar">
                      <app-icon name="edit" [size]="14"></app-icon>
                    </button>
                    <button type="button" class="btn-table-action danger" (click)="deleteReward(r.id)" title="Eliminar">
                      <app-icon name="trash" [size]="14"></app-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <!-- Right Column: Monthly Challenges Management -->
        <article class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingChallengeId ? 'Editar reto #' + editingChallengeId : 'Crear reto comunitario' }}</h2>
              <p class="card-sub">Configura las metas colectivas del mes para Lima Metropolitana</p>
            </div>
          </div>

          <form (ngSubmit)="saveChallenge()" class="eco-form">
            <div class="form-row-2">
              <div class="form-group">
                <label>Título del reto</label>
                <input type="text" [(ngModel)]="challengeForm.title" name="cTitle" required />
              </div>
              <div class="form-group">
                <label>Valor de la meta</label>
                <input type="number" step="1" min="1" [(ngModel)]="challengeForm.goalValue" name="cGoalVal" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Unidad de medida</label>
                <select [(ngModel)]="challengeForm.goalUnit" name="cGoalUnit" required>
                  <option value="kg_co2">kg de CO₂ evitado</option>
                  <option value="km">Kilómetros sostenibles</option>
                  <option value="trips">Recorridos completados</option>
                </select>
              </div>
              <div class="form-group">
                <label>Fecha de inicio</label>
                <input type="date" [(ngModel)]="challengeForm.periodStart" name="cStart" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>Fecha de cierre</label>
                <input type="date" [(ngModel)]="challengeForm.periodEnd" name="cEnd" required />
              </div>
              <div class="form-group checkbox-align">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="challengeForm.active" name="cActive" />
                  <span>Reto activo</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Descripción para los vecinos</label>
              <input type="text" [(ngModel)]="challengeForm.description" name="cDesc" required />
            </div>

            <div class="form-actions-row">
              <button type="submit" class="btn-emerald">
                <app-icon [name]="editingChallengeId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingChallengeId ? 'Guardar cambios' : 'Publicar reto' }}</span>
              </button>
              <button type="button" class="btn-outline" *ngIf="editingChallengeId" (click)="cancelChallengeEdit()">
                <span>Cancelar</span>
              </button>
            </div>
          </form>

          <div class="table-responsive mt-4">
            <table class="eco-table">
              <thead>
                <tr>
                  <th>Reto</th>
                  <th>Meta</th>
                  <th>Vigencia</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of challenges">
                  <td><strong>{{ c.title }}</strong></td>
                  <td>{{ c.goalValue }} {{ c.goalUnit }}</td>
                  <td>{{ c.periodStart }} → {{ c.periodEnd }}</td>
                  <td>
                    <span [class]="c.active ? 'status-ok' : 'status-warn'">
                      {{ c.active ? 'Activo' : 'Cerrado' }}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button type="button" class="btn-table-action" (click)="editChallenge(c)" title="Editar">
                      <app-icon name="edit" [size]="14"></app-icon>
                    </button>
                    <button type="button" class="btn-table-action danger" (click)="deleteChallenge(c.id)" title="Eliminar">
                      <app-icon name="trash" [size]="14"></app-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  `
})
export class AdminComponent implements OnInit {
  rewards: RewardItem[] = [];
  challenges: ChallengeItem[] = [];
  editingRewardId: number | null = null;
  editingChallengeId: number | null = null;
  feedbackMsg = '';

  rewardForm: RewardRequest = {
    code: 'MUSEO_150',
    title: 'Pase Cultural MALI',
    description: 'Ingreso libre al Museo de Arte de Lima por movilidad limpia',
    pointsCost: 150,
    iconEmoji: 'ticket',
    active: true
  };

  challengeForm: ChallengeRequest = {
    title: 'Reto Costa Verde en Bici',
    description: 'Completa 25 km en bicicleta por el corredor Miraflores - Barranco',
    goalValue: 25,
    goalUnit: 'km',
    periodStart: '2026-11-01',
    periodEnd: '2026-11-30',
    active: true
  };

  constructor(private api: ApiService, public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getAdminRewards().subscribe(res => (this.rewards = res));
    this.api.getAdminChallenges().subscribe(res => (this.challenges = res));
  }

  saveReward(): void {
    if (this.editingRewardId) {
      this.api.updateAdminReward(this.editingRewardId, this.rewardForm).subscribe(res => {
        this.feedbackMsg = `Beneficio actualizado: ${res.title}`;
        this.editingRewardId = null;
        this.loadData();
      });
    } else {
      this.api.createAdminReward(this.rewardForm).subscribe(res => {
        this.feedbackMsg = `Beneficio publicado: ${res.title}`;
        this.loadData();
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

  cancelRewardEdit(): void {
    this.editingRewardId = null;
  }

  deleteReward(id: number): void {
    this.api.deleteAdminReward(id).subscribe(() => {
      this.feedbackMsg = `Beneficio eliminado del catálogo.`;
      this.loadData();
    });
  }

  saveChallenge(): void {
    if (this.editingChallengeId) {
      this.api.updateAdminChallenge(this.editingChallengeId, this.challengeForm).subscribe(res => {
        this.feedbackMsg = `Reto actualizado: ${res.title}`;
        this.editingChallengeId = null;
        this.loadData();
      });
    } else {
      this.api.createAdminChallenge(this.challengeForm).subscribe(res => {
        this.feedbackMsg = `Reto comunitario creado: ${res.title}`;
        this.loadData();
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

  cancelChallengeEdit(): void {
    this.editingChallengeId = null;
  }

  deleteChallenge(id: number): void {
    this.api.deleteAdminChallenge(id).subscribe(() => {
      this.feedbackMsg = `Reto eliminado.`;
      this.loadData();
    });
  }
}
