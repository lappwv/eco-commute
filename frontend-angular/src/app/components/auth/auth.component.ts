import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, DEFAULT_RENDER_API, LOCAL_BACKEND_API } from '../../services/auth.service';
import { UserProfile } from '../../models/api.models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatTabsModule, MatChipsModule],
  template: `
    <section class="app-page-container" aria-labelledby="auth-heading">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">HU01 · HU02 · Spring Security + JWT + BCrypt</span>
          <h1 id="auth-heading">Autenticación Segura y EcoPerfil</h1>
          <p class="subtitle">
            Inicia sesión con tu cuenta JWT o regístrate para sincronizar tus viajes sostenibles, puntos verdes y medallas con PostgreSQL en Render.
          </p>
        </div>
        <div class="quick-demo-box">
          <span class="demo-label">Acceso rápido para evaluación docente:</span>
          <div class="demo-btn-row">
            <button type="button" class="btn-eco-primary" (click)="quickDemoLogin('user')" aria-label="Iniciar sesión como Usuario Demo">
              👤 Demo Usuario (Elena · ROLE_USER)
            </button>
            <button type="button" class="btn-eco-outline" (click)="quickDemoLogin('admin')" aria-label="Iniciar sesión como Administrador Demo">
              🛡️ Demo Admin (ROLE_ADMIN)
            </button>
          </div>
        </div>
      </div>

      <div class="grid-2-col">
        <mat-card class="eco-mat-card">
          <mat-tab-group animationDuration="200ms">
            <mat-tab label="Iniciar Sesión (HU02)">
              <form class="eco-form" (ngSubmit)="onLogin()" aria-label="Formulario de inicio de sesión">
                <div class="form-group">
                  <label for="login-email">Correo electrónico</label>
                  <input
                    id="login-email"
                    type="email"
                    name="loginEmail"
                    [(ngModel)]="loginEmail"
                    required
                    placeholder="demo@ecocommute.org"
                    class="eco-input"
                  />
                </div>
                <div class="form-group">
                  <label for="login-password">Contraseña</label>
                  <input
                    id="login-password"
                    type="password"
                    name="loginPassword"
                    [(ngModel)]="loginPassword"
                    required
                    placeholder="••••••••"
                    class="eco-input"
                  />
                </div>

                <div *ngIf="errorMessage" class="alert-error" role="alert">{{ errorMessage }}</div>
                <div *ngIf="successMessage" class="alert-success" role="status">{{ successMessage }}</div>

                <button type="submit" class="btn-eco-primary full-width" [disabled]="loading">
                  {{ loading ? 'Autenticando con JWT...' : 'Iniciar Sesión (POST /api/v1/auth/login)' }}
                </button>
              </form>
            </mat-tab>

            <mat-tab label="Crear Cuenta (HU01)">
              <form class="eco-form" (ngSubmit)="onRegister()" aria-label="Formulario de registro de usuario">
                <div class="form-group">
                  <label for="reg-name">Nombre completo</label>
                  <input
                    id="reg-name"
                    type="text"
                    name="regName"
                    [(ngModel)]="regFullName"
                    required
                    placeholder="Ej. Rodrigo Condor Silvera"
                    class="eco-input"
                  />
                </div>
                <div class="form-group">
                  <label for="reg-email">Correo electrónico único</label>
                  <input
                    id="reg-email"
                    type="email"
                    name="regEmail"
                    [(ngModel)]="regEmail"
                    required
                    placeholder="usuario@upc.edu.pe"
                    class="eco-input"
                  />
                </div>
                <div class="form-group">
                  <label for="reg-password">Contraseña (mín. 8 caracteres, letra y número)</label>
                  <input
                    id="reg-password"
                    type="password"
                    name="regPassword"
                    [(ngModel)]="regPassword"
                    required
                    placeholder="EcoLima2026"
                    class="eco-input"
                  />
                </div>
                <div class="form-row-2">
                  <label class="checkbox-label">
                    <input type="checkbox" name="regBike" [(ngModel)]="regHasBicycle" />
                    Cuento con bicicleta propia
                  </label>
                  <div class="form-group">
                    <label for="reg-walk">Máx. caminata (min)</label>
                    <input
                      id="reg-walk"
                      type="number"
                      name="regWalk"
                      [(ngModel)]="regMaxWalkingMinutes"
                      min="5"
                      max="120"
                      class="eco-input"
                    />
                  </div>
                </div>

                <div *ngIf="errorMessage" class="alert-error" role="alert">{{ errorMessage }}</div>
                <div *ngIf="successMessage" class="alert-success" role="status">{{ successMessage }}</div>

                <button type="submit" class="btn-eco-primary full-width" [disabled]="loading">
                  {{ loading ? 'Registrando cuenta con BCrypt...' : 'Registrar Cuenta (POST /api/v1/auth/register)' }}
                </button>
              </form>
            </mat-tab>
          </mat-tab-group>
        </mat-card>

        <mat-card class="eco-mat-card" *ngIf="auth.currentUser as user">
          <div class="profile-header">
            <img [src]="user.avatarUrl" [alt]="user.fullName" class="avatar-lg" />
            <div>
              <span class="role-pill" [class.admin]="user.role === 'ROLE_ADMIN'">{{ user.role }}</span>
              <h2>{{ user.fullName }}</h2>
              <p class="muted">{{ user.email }}</p>
            </div>
          </div>

          <div class="kpi-mini-grid">
            <div class="kpi-mini">
              <span class="kpi-label">Puntos Verdes</span>
              <strong class="kpi-val accent">{{ user.currentPoints }} pts</strong>
            </div>
            <div class="kpi-mini">
              <span class="kpi-label">Nivel Eco</span>
              <strong class="kpi-val">Nivel {{ user.currentLevel }}</strong>
            </div>
            <div class="kpi-mini">
              <span class="kpi-label">Racha Activa</span>
              <strong class="kpi-val">🔥 {{ user.streakDays }} días</strong>
            </div>
          </div>

          <div class="api-selector-box">
            <label for="api-url-select">Servidor Backend RESTful API:</label>
            <div class="demo-btn-row">
              <button
                type="button"
                class="btn-chip"
                [class.active]="auth.apiBase === renderUrl"
                (click)="setBackend(renderUrl)"
              >
                ☁️ Render Cloud (Producción)
              </button>
              <button
                type="button"
                class="btn-chip"
                [class.active]="auth.apiBase === localUrl"
                (click)="setBackend(localUrl)"
              >
                💻 Localhost (:8080)
              </button>
            </div>
            <code class="token-preview">JWT Bearer: {{ user.token | slice:0:38 }}...</code>
          </div>
        </mat-card>
      </div>
    </section>
  `
})
export class AuthComponent implements OnInit {
  renderUrl = DEFAULT_RENDER_API;
  localUrl = LOCAL_BACKEND_API;

  loginEmail = 'demo@ecocommute.org';
  loginPassword = 'Demo123!';

  regFullName = '';
  regEmail = '';
  regPassword = '';
  regHasBicycle = true;
  regMaxWalkingMinutes = 25;

  loading = false;
  errorMessage = '';
  successMessage = '';
  profile: UserProfile | null = null;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getMyProfile().subscribe(p => (this.profile = p));
  }

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    this.auth.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: res => {
        this.loading = false;
        this.successMessage = `Sesión iniciada correctamente como ${res.fullName} (${res.role}).`;
        setTimeout(() => this.router.navigate(['/dashboard']), 600);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Credenciales inválidas. Verifica tu correo y contraseña.';
      }
    });
  }

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(this.regPassword)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres e incluir letras y números (HU01).';
      return;
    }
    this.loading = true;
    this.auth
      .register({
        fullName: this.regFullName,
        email: this.regEmail,
        password: this.regPassword,
        hasBicycle: this.regHasBicycle,
        maxWalkingMinutes: this.regMaxWalkingMinutes
      })
      .subscribe({
        next: res => {
          this.loading = false;
          this.successMessage = `Cuenta creada para ${res.fullName}. Token JWT generado exitosamente.`;
          setTimeout(() => this.router.navigate(['/dashboard']), 600);
        },
        error: err => {
          this.loading = false;
          this.errorMessage = err?.error?.message || 'Error al registrar usuario. Verifica los campos.';
        }
      });
  }

  quickDemoLogin(type: 'user' | 'admin'): void {
    if (type === 'admin') {
      this.loginEmail = 'admin@ecocommute.org';
      this.loginPassword = 'Admin123!';
    } else {
      this.loginEmail = 'demo@ecocommute.org';
      this.loginPassword = 'Demo123!';
    }
    this.onLogin();
  }

  setBackend(url: string): void {
    this.auth.setApiBase(url);
    this.successMessage = `Servidor API actualizado a: ${url}`;
  }
}
