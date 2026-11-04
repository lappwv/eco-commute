import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLocale = 'es_419' | 'en_US';

const TRANSLATIONS: Record<SupportedLocale, Record<string, string>> = {
  es_419: {
    'nav.landing': 'Inicio',
    'nav.dashboard': 'Dashboard',
    'nav.routes': 'Rutas & IA',
    'nav.trips': 'Mis Viajes (CRUD)',
    'nav.gamification': 'Medallas & Retos',
    'nav.leaderboard': 'Ranking Distrital',
    'nav.rewards': 'Recompensas',
    'nav.admin': 'Admin CRUD',
    'nav.terms': 'Términos',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Salir',
    'status.online': 'API Render: Conectada',
    'status.fallback': 'Modo Resiliente / Local',
    'dashboard.title': 'Dashboard Personal y Comunitario',
    'dashboard.subtitle': 'Monitorea tu ahorro de CO₂, puntos verdes, evolución semanal y recomendaciones con Google Gemini.',
    'routes.title': 'Planificador Geoespacial OSRM + IA Gemini',
    'routes.subtitle': 'Compara emisiones frente al auto particular y recibe recomendaciones del Corredor Verde Optimizado con IA.',
    'trips.title': 'Gestión de Viajes Sostenibles (CRUD)',
    'trips.subtitle': 'Registra, consulta, corrige o elimina tus viajes con recálculo automático de CO₂ ahorrado y puntos verdes.',
    'gamification.title': 'Gamificación, Medallas y Retos Comunitarios',
    'gamification.subtitle': 'Progreso de nivel, insignias desbloqueadas automáticamente y desafíos del ODS 11.2 en Lima.',
    'leaderboard.title': 'Ranking por Distrito y Tabla Metropolitana',
    'leaderboard.subtitle': 'Compara el impacto ambiental entre distritos de Lima Metropolitana y vecinos activos.',
    'rewards.title': 'Catálogo de Recompensas e Historial de Canjes',
    'rewards.subtitle': 'Canjea tus puntos verdes por beneficios reales en comercios aliados y revisa tus cupones.',
    'admin.title': 'Consola de Administración (ROLE_ADMIN)',
    'admin.subtitle': 'Gestión CRUD completa del catálogo de recompensas y retos comunitarios sostenibles.',
    'footer.ethics': 'Cumple con el Código de Ética ACM/IEEE y CIP · WCAG 2.1 AA · ODS 11.2'
  },
  en_US: {
    'nav.landing': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.routes': 'Routes & AI',
    'nav.trips': 'My Trips (CRUD)',
    'nav.gamification': 'Badges & Challenges',
    'nav.leaderboard': 'District Ranking',
    'nav.rewards': 'Rewards',
    'nav.admin': 'Admin CRUD',
    'nav.terms': 'Terms',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'status.online': 'Render API: Online',
    'status.fallback': 'Resilient / Local Mode',
    'dashboard.title': 'Personal & Community Impact Dashboard',
    'dashboard.subtitle': 'Track your saved CO₂, green points, weekly trend, and Google Gemini AI recommendations.',
    'routes.title': 'OSRM Geospatial Route Planner + Gemini AI',
    'routes.subtitle': 'Compare emissions against a private car and get AI-Optimized Green Corridor recommendations.',
    'trips.title': 'Sustainable Trips Management (CRUD)',
    'trips.subtitle': 'Create, view, edit, or delete your trips with automatic recalculation of saved CO₂ and green points.',
    'gamification.title': 'Gamification, Badges & Community Challenges',
    'gamification.subtitle': 'Level progress, automatically unlocked badges, and SDG 11.2 urban mobility challenges in Lima.',
    'leaderboard.title': 'District Leaderboard & Metropolitan Ranking',
    'leaderboard.subtitle': 'Compare environmental impact across Lima districts and active commuters.',
    'rewards.title': 'Rewards Catalog & Redemption History',
    'rewards.subtitle': 'Redeem your green points for real benefits at partner stores and view your coupons.',
    'admin.title': 'Administration Console (ROLE_ADMIN)',
    'admin.subtitle': 'Full CRUD management of the rewards catalog and community sustainability challenges.',
    'footer.ethics': 'Compliant with ACM/IEEE & CIP Software Engineering Code of Ethics · WCAG 2.1 AA · SDG 11.2'
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private localeSubject = new BehaviorSubject<SupportedLocale>('es_419');
  locale$ = this.localeSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ecocommute_locale') as SupportedLocale | null;
      if (saved === 'es_419' || saved === 'en_US') {
        this.localeSubject.next(saved);
      }
    }
  }

  get currentLocale(): SupportedLocale {
    return this.localeSubject.value;
  }

  get isEnglish(): boolean {
    return this.localeSubject.value === 'en_US';
  }

  toggleLocale(): void {
    const next: SupportedLocale = this.localeSubject.value === 'es_419' ? 'en_US' : 'es_419';
    this.setLocale(next);
  }

  setLocale(locale: SupportedLocale): void {
    this.localeSubject.next(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecocommute_locale', locale);
      document.documentElement.lang = locale === 'es_419' ? 'es-PE' : 'en-US';
    }
  }

  t(key: string): string {
    return TRANSLATIONS[this.localeSubject.value][key] || key;
  }
}
