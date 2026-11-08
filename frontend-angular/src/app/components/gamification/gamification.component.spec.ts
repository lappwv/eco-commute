import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { GamificationComponent } from './gamification.component';

describe('GamificationComponent', () => {
  let fixture: ComponentFixture<GamificationComponent>;
  let component: GamificationComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [GamificationComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(GamificationComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('getLevelName devuelve el nombre del nivel conocido', () => {
    expect(component.getLevelName(1)).toBe('Explorador Sostenible');
  });

  it('getLevelName usa un nombre generico para niveles desconocidos', () => {
    expect(component.getLevelName(99)).toBe('Nivel 99 EcoCommute');
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
