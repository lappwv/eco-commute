import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LocaleCode = 'es_419' | 'en_US';

const SPANISH_DICTIONARY: Record<string, string> = {
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
  'dash.subtitle':
    'Planifica tu ruta por ciclovías seguras, evita el tráfico vehicular y suma puntos verificados en cada recorrido para canjear en comercios aliados.',
  'dash.co2Saved': 'CO₂ evitado total',
  'dash.distance': 'Recorrido sostenible',
  'dash.points': 'Puntos disponibles',
  'dash.calories': 'Energía activa',
  'dash.weeklyTitle': 'Emisiones evitadas esta semana',
  'dash.modeSplit': 'Cómo te moviste',
  'dash.aiAdvisor': 'Sugerencia de ruta para hoy',
  'dash.communityTitle': 'Impacto colectivo en Lima Metropolitana',
  'routes.title': 'Comparador de Rutas Sostenibles',
  'routes.subtitle':
    'Elige tu punto de partida y destino en Lima para comparar cuánto tiempo, CO₂ y puntos ganas frente a ir en auto.',
  'trips.title': 'Bitácora de Viajes',
  'trips.subtitle':
    'Registra tus recorridos diarios, revisa cuánto CO₂ evitaste en cada trayecto y mantén tu historial al día.',
  'gamification.title': 'Logros y Progreso Personal',
  'gamification.subtitle':
    'Avanza de nivel con cada viaje limpio y desbloquea insignias verificadas por tu constancia.',
  'leaderboard.title': 'Comunidad por Distritos',
  'leaderboard.subtitle':
    'Conoce a los vecinos y distritos de Lima que más emisiones están evitando esta semana.',
  'rewards.title': 'Beneficios y Retos del Mes',
  'rewards.subtitle':
    'Canjea tus puntos por cafés, horas de bicicleta o pases culturales y participa en retos colectivos.',
  'admin.title': 'Gestión de Beneficios y Retos',
  'admin.subtitle':
    'Administra el catálogo de comercios aliados y las metas mensuales de la comunidad.'
};

const TRANSLATIONS: Record<LocaleCode, Record<string, string>> = {
  es_419: SPANISH_DICTIONARY,
  en_US: SPANISH_DICTIONARY
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private localeSubject = new BehaviorSubject<LocaleCode>('es_419');
  locale$ = this.localeSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecocommute_locale', 'es_419');
    }
  }

  get currentLocale(): LocaleCode {
    return 'es_419';
  }

  toggleLocale(): void {
    this.localeSubject.next('es_419');
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecocommute_locale', 'es_419');
    }
  }

  t(key: string): string {
    return TRANSLATIONS.es_419[key] || key;
  }
}
