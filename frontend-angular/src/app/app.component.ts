import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { I18nService } from './services/i18n.service';
import { EcoIconComponent } from './components/icon/eco-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, EcoIconComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isBrowser = false;
  activeTheme: 'light' | 'dark' = 'light';
  mobileMenuOpen = false;
  backendOnline = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    public auth: AuthService,
    public api: ApiService,
    public i18n: I18nService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedTheme = (localStorage.getItem('ecocommute_theme_v3') as 'light' | 'dark' | null) || 'light';
      this.setTheme(savedTheme);
    }
    this.api.backendOnline$.subscribe(status => (this.backendOnline = status));
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.activeTheme = theme;
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ecocommute_theme_v3', theme);
    }
  }

  toggleTheme(): void {
    this.setTheme(this.activeTheme === 'dark' ? 'light' : 'dark');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
