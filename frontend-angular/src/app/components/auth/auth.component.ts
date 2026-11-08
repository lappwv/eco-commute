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
            Tu Cuenta EcoCommute
          </span>
          <h1 class="page-title">Perfil y Acceso Rápido</h1>
          <p class="page-subtitle">
            Inicia sesión con tu cuenta o cambia entre los perfiles de demostración con un clic.
          </p>
        </div>
      </div>

      <div class="grid-2-col">
        <!-- Left Card: Login / Register & 1-Click Demo Profiles -->
        <mat-card class="eco-card">
          <mat-tab-group class="auth-tab-group" [(selectedIndex)]="tabIndex" animationDuration="0ms">
            <mat-tab label="Iniciar sesión">
              <form (ngSubmit)="onLogin()" class="eco-form mat-tab-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Correo electrónico</mat-label>
                  <input matInput type="email" [(ngModel)]="loginEmail" name="loginEmail" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Contraseña</mat-label>
                  <input matInput type="password" [(ngModel)]="loginPassword" name="loginPassword" required />
                </mat-form-field>
                <button mat-flat-button color="primary" type="submit" class="full-width">
                  <app-icon name="check" [size]="16"></app-icon>
                  <span>Entrar a mi cuenta</span>
                </button>
              </form>
            </mat-tab>

            <mat-tab label="Crear cuenta">
              <form (ngSubmit)="onRegister()" class="eco-form mat-tab-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nombre completo</mat-label>
                  <input matInput type="text" [(ngModel)]="regName" name="regName" required placeholder="Ej. Valeria Paredes" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Correo electrónico</mat-label>
                  <input matInput type="email" [(ngModel)]="regEmail" name="regEmail" required placeholder="valeria&#64;lima.pe" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Contraseña</mat-label>
                  <input matInput type="password" [(ngModel)]="regPassword" name="regPassword" required />
                </mat-form-field>
                <div class="form-row-2">
                  <div class="form-group checkbox-align">
                    <label class="checkbox-label">
                      <input type="checkbox" [(ngModel)]="regBicycle" name="regBicycle" />
                      <span>Cuento con bicicleta</span>
                    </label>
                  </div>
                  <mat-form-field appearance="outline">
                    <mat-label>Caminata diaria máx. (min)</mat-label>
                    <input matInput type="number" [(ngModel)]="regWalkMin" name="regWalkMin" min="5" max="180" />
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="regAcceptTerms" name="regAcceptTerms" required />
                    <span>Acepto los <a routerLink="/terms" target="_blank">Términos y Condiciones</a></span>
                  </label>
                </div>
                <button mat-flat-button color="primary" type="submit" class="full-width" [disabled]="!regAcceptTerms">
                  <app-icon name="plus" [size]="16"></app-icon>
                  <span>Registrarme en EcoCommute</span>
                </button>
              </form>
            </mat-tab>
          </mat-tab-group>

          <div class="demo-accounts-box">
            <h3>Acceso rápido con cuentas de prueba</h3>
            <p class="card-sub">Prueba la experiencia como ciudadana o como administrador de comercios aliados:</p>
            <div class="demo-btns-row">
              <button mat-stroked-button type="button" (click)="quickDemoUser()">
                <app-icon name="user" [size]="16"></app-icon>
                <span>Ciudadana (Elena Rios)</span>
              </button>
              <button mat-stroked-button type="button" (click)="quickDemoAdmin()">
                <app-icon name="shield" [size]="16"></app-icon>
                <span>Administrador</span>
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
                <span class="badge-emerald">{{ p.role === 'ROLE_ADMIN' ? 'Perfil Administrador' : 'Perfil Ciudadano' }}</span>
                <h2>{{ p.fullName }}</h2>
                <p class="card-sub">{{ p.email }}</p>
              </div>
            </div>

            <div class="kpi-mini-grid">
              <div class="kpi-mini">
                <strong>{{ p.currentPoints }} pts</strong>
                <span>Puntos</span>
              </div>
              <div class="kpi-mini">
                <strong>Nivel {{ p.currentLevel }}</strong>
                <span>Progreso</span>
              </div>
              <div class="kpi-mini">
                <strong>{{ p.streakDays }} días</strong>
                <span>Racha</span>
              </div>
              <div class="kpi-mini">
                <strong>{{ p.totalCo2SavedKg | number: '1.2-2' }} kg</strong>
                <span>CO₂ evitado</span>
              </div>
            </div>

            <details class="coords-drawer mt-4">
              <summary>
                <app-icon name="sliders" [size]="14"></app-icon>
                <span>Configuración avanzada de servidor</span>
              </summary>
              <div class="coords-drawer-body">
                <div class="demo-btns-row">
                  <button mat-stroked-button type="button" (click)="setServer(renderUrl)">
                    <span>Nube (Render)</span>
                  </button>
                  <button mat-stroked-button type="button" (click)="setServer(localUrl)">
                    <span>Localhost (8080)</span>
                  </button>
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>URL del servidor</mat-label>
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

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {
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
      this.feedbackMsg = `Sesión iniciada como ${res.fullName}`;
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
        this.feedbackMsg = `Cuenta creada para ${res.fullName}`;
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
      this.feedbackMsg = `Servidor actualizado: ${url}`;
      this.refreshProfile();
    });
  }
}
