import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea con la pestaña de inicio de sesion activa', () => {
    expect(component).toBeTruthy();
    expect(component.tabIndex).toBe(0);
  });

  it('quickDemoAdmin usa las credenciales de administradora demo', () => {
    component.quickDemoAdmin();
    expect(component.loginEmail).toBe('admin@ecocommute.org');
  });

  it('renderiza el formulario sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
