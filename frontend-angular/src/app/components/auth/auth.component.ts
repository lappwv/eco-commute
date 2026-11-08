import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService, DEFAULT_RENDER_API, LOCAL_BACKEND_API } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserProfile } from '../../models/api.models';
import { EcoIconComponent } from '../icon/eco-icon.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EcoIconComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="user" [size]="14"></app-icon>
            {{ i18n.t('auth.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('auth.title') }}</h1>
          <p class="page-subtitle">
            {{ i18n.t('auth.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid-2-col">
        <!-- Left Card: Login / Register & 1-Click Demo Profiles -->
        <mat-card class="eco-card">
          <mat-tab-group class="auth-tab-group" [(selectedIndex)]="tabIndex" animationDuration="0ms">
            <mat-tab [label]="i18n.t('auth.tabLogin')">
              <form (ngSubmit)="onLogin()" class="eco-form mat-tab-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.email') }}</mat-label>
                  <input matInput type="email" [(ngModel)]="loginEmail" name="loginEmail" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.password') }}</mat-label>
                  <input matInput type="password" [(ngModel)]="loginPassword" name="loginPassword" required />
                </mat-form-field>
                <button mat-flat-button color="primary" type="submit" class="full-width">
                  <app-icon name="check" [size]="16"></app-icon>
                  <span>{{ i18n.t('auth.enter') }}</span>
                </button>
              </form>
            </mat-tab>

            <mat-tab [label]="i18n.t('auth.tabRegister')">
              <form (ngSubmit)="onRegister()" class="eco-form mat-tab-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.fullName') }}</mat-label>
                  <input matInput type="text" [(ngModel)]="regName" name="regName" required [placeholder]="i18n.t('auth.namePlaceholder')" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.email') }}</mat-label>
                  <input matInput type="email" [(ngModel)]="regEmail" name="regEmail" required placeholder="valeria&#64;lima.pe" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.password') }}</mat-label>
                  <input matInput type="password" [(ngModel)]="regPassword" name="regPassword" required />
                </mat-form-field>
                <div class="form-row-2">
                  <div class="form-group checkbox-align">
                    <label class="checkbox-label">
                      <input type="checkbox" [(ngModel)]="regBicycle" name="regBicycle" />
                      <span>{{ i18n.t('auth.hasBike') }}</span>
                    </label>
                  </div>
                  <mat-form-field appearance="outline">
                    <mat-label>{{ i18n.t('auth.walkMax') }}</mat-label>
                    <input matInput type="number" [(ngModel)]="regWalkMin" name="regWalkMin" min="5" max="180" />
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="regAcceptTerms" name="regAcceptTerms" required />
                    <span>{{ i18n.t('auth.acceptPre') }} <a routerLink="/terms" target="_blank">{{ i18n.t('auth.termsLink') }}</a></span>
                  </label>
                </div>
                <button mat-flat-button color="primary" type="submit" class="full-width" [disabled]="!regAcceptTerms">
                  <app-icon name="plus" [size]="16"></app-icon>
                  <span>{{ i18n.t('auth.register') }}</span>
                </button>
              </form>
            </mat-tab>
          </mat-tab-group>

          <div class="demo-accounts-box">
            <h3>{{ i18n.t('auth.demoTitle') }}</h3>
            <p class="card-sub">{{ i18n.t('auth.demoSub') }}</p>
            <div class="demo-btns-row">
              <button mat-stroked-button type="button" (click)="quickDemoUser()">
                <app-icon name="user" [size]="16"></app-icon>
                <span>{{ i18n.t('auth.demoUser') }}</span>
              </button>
              <button mat-stroked-button type="button" (click)="quickDemoAdmin()">
                <app-icon name="shield" [size]="16"></app-icon>
                <span>{{ i18n.t('auth.demoAdmin') }}</span>
              </button>
            </div>
          </div>

          <div class="toast-success" *ngIf="feedbackMsg">
            <app-icon name="check" [size]="17"></app-icon>
            <span>{{ feedbackMsg }}</span>
          </div>
        </mat-card>

        <!-- Right Card: Active Profile Summary & Optional Server Settings -->
        <div class="stack-col">
          <mat-card class="eco-card" *ngIf="profile as p">
            <div class="profile-header">
              <img [src]="p.avatarUrl" [alt]="p.fullName" class="avatar-lg" />
              <div>
                <span class="badge-emerald">{{ p.role === 'ROLE_ADMIN' ? i18n.t('auth.roleAdmin') : i18n.t('auth.roleUser') }}</span>
                <h2>{{ p.fullName }}</h2>
                <p class="card-sub">{{ p.email }}</p>
              </div>
            </div>

            <div class="kpi-mini-grid">
              <div class="kpi-mini">
                <strong>{{ p.currentPoints }} pts</strong>
                <span>{{ i18n.t('auth.points') }}</span>
              </div>
              <div class="kpi-mini">
                <strong>{{ i18n.tn('auth.level', { level: p.currentLevel }) }}</strong>
                <span>{{ i18n.t('auth.progress') }}</span>
              </div>
              <div class="kpi-mini">
                <strong>{{ i18n.tn(p.streakDays === 1 ? 'auth.daysOne' : 'auth.daysOther', { count: p.streakDays }) }}</strong>
                <span>{{ i18n.t('auth.streak') }}</span>
              </div>
              <div class="kpi-mini">
                <strong>{{ p.totalCo2SavedKg | number: '1.2-2' }} kg</strong>
                <span>{{ i18n.t('auth.co2Avoided') }}</span>
              </div>
            </div>

            <details class="coords-drawer mt-4">
              <summary>
                <app-icon name="sliders" [size]="14"></app-icon>
                <span>{{ i18n.t('auth.advanced') }}</span>
              </summary>
              <div class="coords-drawer-body">
                <div class="demo-btns-row">
                  <button mat-stroked-button type="button" (click)="setServer(renderUrl)">
                    <span>{{ i18n.t('auth.cloud') }}</span>
                  </button>
                  <button mat-stroked-button type="button" (click)="setServer(localUrl)">
                    <span>Localhost (8080)</span>
                  </button>
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ i18n.t('auth.serverUrl') }}</mat-label>
                  <input matInput type="text" [(ngModel)]="customServerUrl" (change)="setServer(customServerUrl)" />
                </mat-form-field>
              </div>
            </details>
          </mat-card>
        </div>
      </div>
    </section>
  `
})
export class AuthComponent implements OnInit {
  tabIndex = 0;
  loginEmail = 'demo@ecocommute.org';
  loginPassword = 'Demo123!';

  regName = '';
  regEmail = '';
  regPassword = '';
  regBicycle = true;
  regWalkMin = 30;
  regAcceptTerms = false;

  renderUrl = DEFAULT_RENDER_API;
  localUrl = LOCAL_BACKEND_API;
  customServerUrl = DEFAULT_RENDER_API;

  profile: UserProfile | null = null;
  feedbackMsg = '';

  constructor(private auth: AuthService, private api: ApiService, private router: Router, public i18n: I18nService) {
    this.customServerUrl = this.auth.apiBase;
  }

  ngOnInit(): void {
    this.refreshProfile();
  }

  refreshProfile(): void {
    this.auth.getMyProfile().subscribe(res => (this.profile = res));
  }

  onLogin(): void {
    this.auth.login({ email: this.loginEmail, password: this.loginPassword }).subscribe(res => {
      this.feedbackMsg = this.i18n.tn('auth.loggedAs', { name: res.fullName });
      this.refreshProfile();
      setTimeout(() => this.router.navigate(['/dashboard']), 700);
    });
  }

  onRegister(): void {
    if (!this.regAcceptTerms) {
      return;
    }
    this.auth
      .register({
        fullName: this.regName,
        email: this.regEmail,
        password: this.regPassword,
        hasBicycle: this.regBicycle,
        maxWalkingMinutes: this.regWalkMin
      })
      .subscribe(res => {
        this.feedbackMsg = this.i18n.tn('auth.created', { name: res.fullName });
        this.refreshProfile();
        setTimeout(() => this.router.navigate(['/dashboard']), 700);
      });
  }

  quickDemoUser(): void {
    this.loginEmail = 'demo@ecocommute.org';
    this.loginPassword = 'Demo123!';
    this.onLogin();
  }

  quickDemoAdmin(): void {
    this.loginEmail = 'admin@ecocommute.org';
    this.loginPassword = 'Admin123!';
    this.onLogin();
  }

  setServer(url: string): void {
    this.customServerUrl = url;
    this.auth.setApiBase(url);
    this.api.checkHealth().subscribe(() => {
      this.feedbackMsg = this.i18n.tn('auth.serverUpdated', { url });
      this.refreshProfile();
    });
  }
}
