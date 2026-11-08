import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LocaleCode = 'es_419' | 'en_US';

const LOCALE_STORAGE_KEY = 'ecocommute_locale';

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
  'routes.eyebrow': 'Simulador de Corredores Verdes · Lima',
  'trips.title': 'Bitácora de Viajes',
  'trips.subtitle':
    'Registra tus recorridos diarios, revisa cuánto CO₂ evitaste en cada trayecto y mantén tu historial al día.',
  'trips.eyebrow': 'Registro Personal de Movilidad',
  'gamification.title': 'Logros y Progreso Personal',
  'gamification.subtitle':
    'Avanza de nivel con cada viaje limpio y desbloquea insignias verificadas por tu constancia.',
  'gamification.eyebrow': 'Reconocimiento Ciudadano',
  'leaderboard.title': 'Comunidad por Distritos',
  'leaderboard.subtitle':
    'Conoce a los vecinos y distritos de Lima que más emisiones están evitando esta semana.',
  'leaderboard.eyebrow': 'Comunidad EcoCommute · Lima',
  'rewards.title': 'Beneficios y Retos del Mes',
  'rewards.subtitle':
    'Canjea tus puntos por cafés, horas de bicicleta o pases culturales y participa en retos colectivos.',
  'rewards.eyebrow': 'Alianzas Locales · Lima',
  'admin.title': 'Gestión de Beneficios y Retos',
  'admin.subtitle':
    'Administra el catálogo de comercios aliados y las metas mensuales de la comunidad.',
  'admin.eyebrow': 'Administración de Comunidad y Aliados',
  'footer.tagline': 'Plataforma ciudadana para medir, premiar y compartir movilidad baja en carbono',
  'footer.home': 'Portada',
  'footer.routes': 'Comparador de rutas',
  'footer.trips': 'Bitácora de viajes',
  'footer.rewards': 'Catálogo de beneficios',
  'footer.terms': 'Privacidad y Términos',
  'theme.toLight': 'Cambiar a modo claro',
  'theme.toDark': 'Cambiar a modo oscuro',
  'theme.toggleTitle': 'Cambiar apariencia',
  'lang.toggleTitle': 'Cambiar idioma',
  'lang.switchToEnglish': 'Cambiar a inglés',
  'lang.switchToSpanish': 'Cambiar a español'
};

const ENGLISH_DICTIONARY: Record<string, string> = {
  'nav.dashboard': 'My Impact',
  'nav.routes': 'Routes',
  'nav.trips': 'Logbook',
  'nav.gamification': 'Achievements',
  'nav.leaderboard': 'Community',
  'nav.rewards': 'Rewards',
  'nav.admin': 'Management',
  'nav.login': 'Account',
  'nav.logout': 'Log out',
  'nav.landing': 'Home',
  'dash.title': 'Your mobility impact in Lima',
  'dash.subtitle':
    'Plan your route along safe bike lanes, avoid vehicle traffic and earn verified points on every trip to redeem at partner stores.',
  'dash.co2Saved': 'Total CO₂ avoided',
  'dash.distance': 'Sustainable distance',
  'dash.points': 'Available points',
  'dash.calories': 'Active energy',
  'dash.weeklyTitle': 'Emissions avoided this week',
  'dash.modeSplit': 'How you got around',
  'dash.aiAdvisor': "Today's route suggestion",
  'dash.communityTitle': 'Collective impact in Metropolitan Lima',
  'routes.title': 'Sustainable Route Comparator',
  'routes.subtitle':
    'Choose your starting point and destination in Lima to compare how much time, CO₂ and points you gain versus driving.',
  'routes.eyebrow': 'Green Corridor Simulator · Lima',
  'trips.title': 'Trip Logbook',
  'trips.subtitle':
    'Log your daily trips, check how much CO₂ you avoided on each one and keep your history up to date.',
  'trips.eyebrow': 'Personal Mobility Log',
  'gamification.title': 'Achievements and Personal Progress',
  'gamification.subtitle':
    'Level up with every clean trip and unlock badges verified by your consistency.',
  'gamification.eyebrow': 'Citizen Recognition',
  'leaderboard.title': 'Community by District',
  'leaderboard.subtitle':
    'Discover the neighbors and districts in Lima avoiding the most emissions this week.',
  'leaderboard.eyebrow': 'EcoCommute Community · Lima',
  'rewards.title': 'Rewards and Challenges of the Month',
  'rewards.subtitle':
    'Redeem your points for coffee, bike hours or cultural passes and join community challenges.',
  'rewards.eyebrow': 'Local Partnerships · Lima',
  'admin.title': 'Rewards and Challenges Management',
  'admin.subtitle':
    "Manage the partner store catalog and the community's monthly goals.",
  'admin.eyebrow': 'Community & Partner Administration',
  'footer.tagline': 'A citizen platform to measure, reward and share low-carbon mobility',
  'footer.home': 'Home',
  'footer.routes': 'Route comparator',
  'footer.trips': 'Trip logbook',
  'footer.rewards': 'Rewards catalog',
  'footer.terms': 'Privacy & Terms',
  'theme.toLight': 'Switch to light mode',
  'theme.toDark': 'Switch to dark mode',
  'theme.toggleTitle': 'Change appearance',
  'lang.toggleTitle': 'Change language',
  'lang.switchToEnglish': 'Switch to English',
  'lang.switchToSpanish': 'Switch to Spanish'
};

const TRANSLATIONS: Record<LocaleCode, Record<string, string>> = {
  es_419: SPANISH_DICTIONARY,
  en_US: ENGLISH_DICTIONARY
};

function readStoredLocale(): LocaleCode {
  if (typeof window === 'undefined') {
    return 'es_419';
  }
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === 'en_US' ? 'en_US' : 'es_419';
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private localeSubject = new BehaviorSubject<LocaleCode>(readStoredLocale());
  locale$ = this.localeSubject.asObservable();

  get currentLocale(): LocaleCode {
    return this.localeSubject.value;
  }

  setLocale(locale: LocaleCode): void {
    this.localeSubject.next(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }

  toggleLocale(): void {
    this.setLocale(this.currentLocale === 'es_419' ? 'en_US' : 'es_419');
  }

  t(key: string): string {
    return TRANSLATIONS[this.currentLocale][key] || TRANSLATIONS.es_419[key] || key;
  }
}
