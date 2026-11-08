import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RoutesPlannerComponent } from './routes-planner.component';

describe('RoutesPlannerComponent', () => {
  let fixture: ComponentFixture<RoutesPlannerComponent>;
  let component: RoutesPlannerComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RoutesPlannerComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(RoutesPlannerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea con el primer corredor rapido activo', () => {
    expect(component).toBeTruthy();
    expect(component.activePresetIndex).toBe(0);
  });

  it('applyPreset actualiza el origen y destino seleccionados', () => {
    component.applyPreset(component.presets[2], 2);
    expect(component.activePresetIndex).toBe(2);
    expect(component.originName).toBe(component.presets[2].originName);
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
