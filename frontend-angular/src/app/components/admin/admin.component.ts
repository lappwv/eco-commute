import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { I18nService } from '../../services/i18n.service';
import { ChallengeItem, ChallengeRequest, RewardItem, RewardRequest } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EcoIconComponent,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
  ],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="shield" [size]="14"></app-icon>
            {{ i18n.t('admin.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('admin.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('admin.subtitle') }}</p>
        </div>
      </div>

      <div class="grid-2-col">
        <!-- Left Column: Partner Perks Management -->
        <mat-card class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingRewardId ? i18n.tn('admin.editReward', { id: editingRewardId }) : i18n.t('admin.publishReward') }}</h2>
              <p class="card-sub">{{ i18n.t('admin.rewardHint') }}</p>
            </div>
          </div>

          <form (ngSubmit)="saveReward()" class="eco-form">
            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.couponCode') }}</mat-label>
                <input matInput type="text" [(ngModel)]="rewardForm.code" name="rCode" required />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.brandIcon') }}</mat-label>
                <mat-select [(ngModel)]="rewardForm.iconEmoji" name="rIcon">
                  <mat-option value="coffee">{{ i18n.t('admin.icon.coffee') }}</mat-option>
                  <mat-option value="bike">{{ i18n.t('admin.icon.bike') }}</mat-option>
                  <mat-option value="ticket">{{ i18n.t('admin.icon.ticket') }}</mat-option>
                  <mat-option value="tree">{{ i18n.t('admin.icon.tree') }}</mat-option>
                  <mat-option value="leaf">{{ i18n.t('admin.icon.leaf') }}</mat-option>
                  <mat-option value="bolt">{{ i18n.t('admin.icon.bolt') }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.rewardName') }}</mat-label>
                <input matInput type="text" [(ngModel)]="rewardForm.title" name="rTitle" required />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.pointsCost') }}</mat-label>
                <input matInput type="number" min="10" [(ngModel)]="rewardForm.pointsCost" name="rPoints" required />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ i18n.t('admin.rewardDesc') }}</mat-label>
              <input matInput type="text" [(ngModel)]="rewardForm.description" name="rDesc" required />
            </mat-form-field>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="rewardForm.active" name="rActive" />
                <span>{{ i18n.t('admin.publicCatalog') }}</span>
              </label>
            </div>

            <div class="form-actions-row">
              <button mat-flat-button color="primary" type="submit" class="btn-emerald">
                <app-icon [name]="editingRewardId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingRewardId ? i18n.t('admin.saveChanges') : i18n.t('admin.createReward') }}</span>
              </button>
              <button mat-stroked-button type="button" *ngIf="editingRewardId" (click)="cancelRewardEdit()">
                <span>{{ i18n.t('admin.cancel') }}</span>
              </button>
            </div>
          </form>

          <div class="table-responsive mt-4">
            <table mat-table [dataSource]="rewards" class="eco-table">
              <ng-container matColumnDef="reward">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colReward') }}</th>
                <td mat-cell *matCellDef="let r">
                  <div class="user-cell">
                    <span class="mode-icon-chip">
                      <app-icon [name]="r.code || r.iconEmoji" [size]="16"></app-icon>
                    </span>
                    <strong>{{ i18n.tc('reward', r.code, 'title', r.title) }}</strong>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colCode') }}</th>
                <td mat-cell *matCellDef="let r"><code>{{ r.code }}</code></td>
              </ng-container>

              <ng-container matColumnDef="cost">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colCost') }}</th>
                <td mat-cell *matCellDef="let r"><span class="pts-pill">{{ r.pointsCost }} pts</span></td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colStatus') }}</th>
                <td mat-cell *matCellDef="let r">
                  <span [class]="r.active ? 'status-ok' : 'status-warn'">
                    {{ r.active ? i18n.t('admin.active') : i18n.t('admin.paused') }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colActions') }}</th>
                <td mat-cell *matCellDef="let r" class="actions-cell">
                  <button mat-icon-button type="button" class="btn-table-action" (click)="editReward(r)" [title]="i18n.t('admin.edit')" [attr.aria-label]="i18n.t('admin.editRewardAria')">
                    <app-icon name="edit" [size]="14"></app-icon>
                  </button>
                  <button mat-icon-button type="button" class="btn-table-action danger" (click)="deleteReward(r.id, i18n.tc('reward', r.code, 'title', r.title))" [title]="i18n.t('admin.delete')" [attr.aria-label]="i18n.t('admin.deleteRewardAria')">
                    <app-icon name="trash" [size]="14"></app-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="rewardColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: rewardColumns;"></tr>
            </table>
          </div>
        </mat-card>

        <!-- Right Column: Monthly Challenges Management -->
        <mat-card class="eco-card">
          <div class="card-head-row">
            <div>
              <h2>{{ editingChallengeId ? i18n.tn('admin.editChallenge', { id: editingChallengeId }) : i18n.t('admin.createChallenge') }}</h2>
              <p class="card-sub">{{ i18n.t('admin.challengeHint') }}</p>
            </div>
          </div>

          <form (ngSubmit)="saveChallenge()" class="eco-form">
            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.challengeTitle') }}</mat-label>
                <input matInput type="text" [(ngModel)]="challengeForm.title" name="cTitle" required />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.goalValue') }}</mat-label>
                <input matInput type="number" step="1" min="1" [(ngModel)]="challengeForm.goalValue" name="cGoalVal" required />
              </mat-form-field>
            </div>

            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.goalUnit') }}</mat-label>
                <mat-select [(ngModel)]="challengeForm.goalUnit" name="cGoalUnit" required>
                  <mat-option value="kg_co2">{{ i18n.t('admin.unit.kg_co2') }}</mat-option>
                  <mat-option value="km">{{ i18n.t('admin.unit.km') }}</mat-option>
                  <mat-option value="trips">{{ i18n.t('admin.unit.trips') }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.startDate') }}</mat-label>
                <input matInput type="date" [(ngModel)]="challengeForm.periodStart" name="cStart" required />
              </mat-form-field>
            </div>

            <div class="form-row-2">
              <mat-form-field appearance="outline">
                <mat-label>{{ i18n.t('admin.endDate') }}</mat-label>
                <input matInput type="date" [(ngModel)]="challengeForm.periodEnd" name="cEnd" required />
              </mat-form-field>
              <div class="form-group checkbox-align">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="challengeForm.active" name="cActive" />
                  <span>{{ i18n.t('admin.challengeActive') }}</span>
                </label>
              </div>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ i18n.t('admin.challengeDesc') }}</mat-label>
              <input matInput type="text" [(ngModel)]="challengeForm.description" name="cDesc" required />
            </mat-form-field>

            <div class="form-actions-row">
              <button mat-flat-button color="primary" type="submit" class="btn-emerald">
                <app-icon [name]="editingChallengeId ? 'check' : 'plus'" [size]="16"></app-icon>
                <span>{{ editingChallengeId ? i18n.t('admin.saveChanges') : i18n.t('admin.publishChallenge') }}</span>
              </button>
              <button mat-stroked-button type="button" *ngIf="editingChallengeId" (click)="cancelChallengeEdit()">
                <span>{{ i18n.t('admin.cancel') }}</span>
              </button>
            </div>
          </form>

          <div class="table-responsive mt-4">
            <table mat-table [dataSource]="challenges" class="eco-table">
              <ng-container matColumnDef="challenge">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colChallenge') }}</th>
                <td mat-cell *matCellDef="let c"><strong>{{ i18n.tc('challenge', c.id, 'title', c.title) }}</strong></td>
              </ng-container>

              <ng-container matColumnDef="goal">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colGoal') }}</th>
                <td mat-cell *matCellDef="let c">{{ c.goalValue }} {{ unitLabel(c.goalUnit) }}</td>
              </ng-container>

              <ng-container matColumnDef="period">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colPeriod') }}</th>
                <td mat-cell *matCellDef="let c">{{ c.periodStart }} → {{ c.periodEnd }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colStatus') }}</th>
                <td mat-cell *matCellDef="let c">
                  <span [class]="c.active ? 'status-ok' : 'status-warn'">
                    {{ c.active ? i18n.t('admin.active') : i18n.t('admin.closed') }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>{{ i18n.t('admin.colActions') }}</th>
                <td mat-cell *matCellDef="let c" class="actions-cell">
                  <button mat-icon-button type="button" class="btn-table-action" (click)="editChallenge(c)" [title]="i18n.t('admin.edit')" [attr.aria-label]="i18n.t('admin.editChallengeAria')">
                    <app-icon name="edit" [size]="14"></app-icon>
                  </button>
                  <button mat-icon-button type="button" class="btn-table-action danger" (click)="deleteChallenge(c.id, i18n.tc('challenge', c.id, 'title', c.title))" [title]="i18n.t('admin.delete')" [attr.aria-label]="i18n.t('admin.deleteChallengeAria')">
                    <app-icon name="trash" [size]="14"></app-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="challengeColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: challengeColumns;"></tr>
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
  readonly rewardColumns = ['reward', 'code', 'cost', 'status', 'actions'];
  readonly challengeColumns = ['challenge', 'goal', 'period', 'status', 'actions'];

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

  constructor(
    private api: ApiService,
    public i18n: I18nService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /** Etiqueta traducida de la unidad de una meta; si no hay traducción, muestra el valor original. */
  unitLabel(unit: string): string {
    const key = `rewards.goalUnit.${unit}`;
    const label = this.i18n.t(key);
    return label === key ? unit : label;
  }

  loadData(): void {
    this.api.getAdminRewards().subscribe(res => (this.rewards = res));
    this.api.getAdminChallenges().subscribe(res => (this.challenges = res));
  }

  saveReward(): void {
    if (this.editingRewardId) {
      this.api.updateAdminReward(this.editingRewardId, this.rewardForm).subscribe(res => {
        this.snackBar.open(this.i18n.tn('admin.rewardUpdated', { title: res.title }), this.i18n.t('admin.close'), { duration: 4000 });
        this.editingRewardId = null;
        this.loadData();
      });
    } else {
      this.api.createAdminReward(this.rewardForm).subscribe(res => {
        this.snackBar.open(this.i18n.tn('admin.rewardPublished', { title: res.title }), this.i18n.t('admin.close'), { duration: 4000 });
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

  deleteReward(id: number, title: string): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.i18n.t('admin.deleteRewardTitle'),
        message: this.i18n.tn('admin.deleteRewardMsg', { title }),
        confirmLabel: this.i18n.t('admin.delete')
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.api.deleteAdminReward(id).subscribe(() => {
        this.snackBar.open(this.i18n.t('admin.rewardDeleted'), this.i18n.t('admin.close'), { duration: 4000 });
        this.loadData();
      });
    });
  }

  saveChallenge(): void {
    if (this.editingChallengeId) {
      this.api.updateAdminChallenge(this.editingChallengeId, this.challengeForm).subscribe(res => {
        this.snackBar.open(this.i18n.tn('admin.challengeUpdated', { title: res.title }), this.i18n.t('admin.close'), { duration: 4000 });
        this.editingChallengeId = null;
        this.loadData();
      });
    } else {
      this.api.createAdminChallenge(this.challengeForm).subscribe(res => {
        this.snackBar.open(this.i18n.tn('admin.challengeCreated', { title: res.title }), this.i18n.t('admin.close'), { duration: 4000 });
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

  deleteChallenge(id: number, title: string): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.i18n.t('admin.deleteChallengeTitle'),
        message: this.i18n.tn('admin.deleteChallengeMsg', { title }),
        confirmLabel: this.i18n.t('admin.delete')
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.api.deleteAdminChallenge(id).subscribe(() => {
        this.snackBar.open(this.i18n.t('admin.challengeDeleted'), this.i18n.t('admin.close'), { duration: 4000 });
        this.loadData();
      });
    });
  }
}
