import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.removeItem('ecocommute_locale');
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('se crea con es_419 por defecto', () => {
    expect(service.currentLocale).toBe('es_419');
  });

  it('traduce una clave conocida al español', () => {
    expect(service.t('nav.dashboard')).toBe('Mi Impacto');
  });

  it('devuelve la clave tal cual cuando no existe traduccion', () => {
    expect(service.t('clave.inexistente')).toBe('clave.inexistente');
  });

  it('alterna a ingles y traduce con el nuevo idioma', () => {
    service.toggleLocale();
    expect(service.currentLocale).toBe('en_US');
    expect(service.t('nav.dashboard')).toBe('My Impact');
  });

  it('persiste el idioma elegido en localStorage', () => {
    service.setLocale('en_US');
    expect(localStorage.getItem('ecocommute_locale')).toBe('en_US');
  });
});
