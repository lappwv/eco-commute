import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LocaleCode = 'es_419' | 'en_US';

const TRANSLATIONS: Record<LocaleCode, Record<string, string>> = {
  es_419: {
    'nav.dashboard': 'Mi Impacto',
    'nav.routes': 'Rutas',
    'nav.trips': 'Bitácora',
    'nav.gamification': 'Logros',
    'nav.leaderboard': 'Comunidad',
    'nav.rewards': 'Beneficios',
    'nav.admin': 'Gestión',
    'nav.login': 'Cuenta',
    'nav.logout': 'Salir',
    'nav.landing': 'Inicio',
    'dash.title': 'Tu impacto de movilidad en Lima',
    'dash.subtitle': 'Cada traslado en bicicleta, a pie o en transporte público reduce emisiones reales, mejora tu salud y suma puntos para canjear en comercios locales.',
    'dash.co2Saved': 'CO₂ evitado total',
    'dash.distance': 'Recorrido sostenible',
    'dash.points': 'Puntos disponibles',
    'dash.calories': 'Energía activa',
    'dash.weeklyTitle': 'Emisiones evitadas esta semana',
    'dash.modeSplit': 'Cómo te moviste',
    'dash.aiAdvisor': 'Sugerencia de ruta para hoy',
    'dash.communityTitle': 'Impacto colectivo en Lima Metropolitana',
    'routes.title': 'Comparador de Rutas Sostenibles',
    'routes.subtitle': 'Elige tu punto de partida y destino en Lima para comparar cuánto tiempo, CO₂ y puntos ganas frente a ir en auto.',
    'trips.title': 'Bitácora de Viajes',
    'trips.subtitle': 'Registra tus recorridos diarios, revisa cuánto CO₂ evitaste en cada trayecto y mantén tu historial al día.',
    'gamification.title': 'Logros y Progreso Personal',
    'gamification.subtitle': 'Avanza de nivel con cada viaje limpio y desbloquea insignias verificadas por tu constancia.',
    'leaderboard.title': 'Comunidad por Distritos',
    'leaderboard.subtitle': 'Conoce a los vecinos y distritos de Lima que más emisiones están evitando esta semana.',
    'rewards.title': 'Beneficios y Retos del Mes',
    'rewards.subtitle': 'Canjea tus puntos por cafés, horas de bicicleta o pases culturales y participa en retos colectivos.',
    'admin.title': 'Gestión de Beneficios y Retos',
    'admin.subtitle': 'Administra el catálogo de comercios aliados y las metas mensuales de la comunidad.'
  },
  en_US: {
    'nav.dashboard': 'My Impact',
    'nav.routes': 'Routes',
    'nav.trips': 'Trip Log',
    'nav.gamification': 'Milestones',
    'nav.leaderboard': 'Community',
    'nav.rewards': 'Perks',
    'nav.admin': 'Manage',
    'nav.login': 'Account',
    'nav.logout': 'Sign out',
    'nav.landing': 'Home',
    'dash.title': 'Your sustainable mobility impact in Lima',
    'dash.subtitle': 'Every bike ride, walk, or transit trip cuts real emissions, boosts your health, and earns points you can redeem at local partner shops.',
    'dash.co2Saved': 'Total CO₂ avoided',
    'dash.distance': 'Clean distance',
    'dash.points': 'Available points',
    'dash.calories': 'Active energy',
    'dash.weeklyTitle': 'Emissions avoided this week',
    'dash.modeSplit': 'How you commuted',
    'dash.aiAdvisor': 'Today’s route suggestion',
    'dash.communityTitle': 'Collective impact across Lima',
    'routes.title': 'Sustainable Route Comparator',
    'routes.subtitle': 'Pick your origin and destination in Lima to compare travel time, avoided CO₂, and points earned versus driving.',
    'trips.title': 'Personal Trip Log',
    'trips.subtitle': 'Log your daily commutes, review the CO₂ saved on each journey, and keep your travel record up to date.',
    'gamification.title': 'Milestones & Personal Progress',
    'gamification.subtitle': 'Level up with every clean commute and unlock verified badges for your consistency.',
    'leaderboard.title': 'District Community Board',
    'leaderboard.subtitle': 'See which neighbors and Lima districts are avoiding the most emissions this week.',
    'rewards.title': 'Partner Perks & Monthly Challenges',
    'rewards.subtitle': 'Redeem your points for coffee, bike-share hours, or cultural passes and join collective challenges.',
    'admin.title': 'Perks & Challenges Management',
    'admin.subtitle': 'Manage the partner catalog and monthly community goals.'
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private localeSubject = new BehaviorSubject<LocaleCode>('es_419');
  locale$ = this.localeSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ecocommute_locale') as LocaleCode | null;
      if (saved === 'es_419' || saved === 'en_US') {
        this.localeSubject.next(saved);
      }
    }
  }

  get currentLocale(): LocaleCode {
    return this.localeSubject.value;
  }

  toggleLocale(): void {
    const next: LocaleCode = this.localeSubject.value === 'es_419' ? 'en_US' : 'es_419';
    this.localeSubject.next(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecocommute_locale', next);
    }
  }

  t(key: string): string {
    return TRANSLATIONS[this.localeSubject.value][key] || key;
  }
}
