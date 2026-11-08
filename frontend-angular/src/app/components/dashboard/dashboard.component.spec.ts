import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea con un resumen inicial', () => {
    expect(component).toBeTruthy();
    expect(component.summary).toBeTruthy();
  });

  it('formatMode traduce el codigo de medio de transporte', () => {
    expect(component.formatMode('BICYCLE')).toBe('Bicicleta');
  });

  it('formatDay normaliza el nombre corto del dia', () => {
    expect(component.formatDay('MONDAY')).toBe('Lun');
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
