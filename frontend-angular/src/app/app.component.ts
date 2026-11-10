import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { combineLatest, filter, startWith } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
  isBrowser = false;
  activeTheme: 'light' | 'dark' = 'light';
  mobileMenuOpen = false;
  backendOnline = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    public auth: AuthService,
    public api: ApiService,
    public i18n: I18nService,
    private router: Router,
    private zone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedTheme = (localStorage.getItem('ecocommute_theme_v3') as 'light' | 'dark' | null) || 'light';
      this.setTheme(savedTheme);

      // Fuera de la zona de Angular: mover el mouse no dispara revisiones de pantalla
      this.zone.runOutsideAngular(() => {
        document.addEventListener('pointermove', this.onPointerMove, { passive: true });
      });
    }
    this.api.backendOnline$.subscribe(status => (this.backendOnline = status));

    if (this.isBrowser) {
      // Se suscribe después del servicio de idioma, así su título ("Página · EcoCommute") prevalece
      combineLatest([
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          startWith(null)
        ),
        this.i18n.locale$
      ]).subscribe(() => this.updateDocumentTitle());
    }
  }

  /** Título de la pestaña según la pantalla actual y el idioma. */
  private updateDocumentTitle(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const key = route.data?.['titleKey'] as string | undefined;
    document.title = key ? `${this.i18n.t(key)} · EcoCommute Lima` : this.i18n.t('meta.title');
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('pointermove', this.onPointerMove);
    }
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = (event.target as HTMLElement | null)?.closest?.(
      '.trip-entry, .eco-card, .ribbon-metric, .ticket-voucher-card, .badge-row-strip, .podium-pillar, ' +
      '.quick-route-launcher, .hero-steps-guide, .v-medal-row, .trip-feed-item, ' +
      '.live-impact-strip, .tower-progress-box, .balance-card-inline, .vertical-timeline-section, ' +
      '.route-vertical-col, .cartoon-banner-art, .saving-teaser, .advisor-callout'
    ) as HTMLElement | null;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.style.setProperty('--rx', `${((y / rect.height - 0.5) * -4).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${((x / rect.width - 0.5) * 4).toFixed(2)}deg`);
  };

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
