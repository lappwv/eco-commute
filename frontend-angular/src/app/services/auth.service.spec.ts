import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('inicia con la cuenta demo de ciudadana por defecto', () => {
    expect(service.currentUser?.email).toBe('demo@ecocommute.org');
    expect(service.isAuthenticated).toBeTrue();
    expect(service.isAdmin).toBeFalse();
  });

  it('login resuelve con la cuenta demo cuando el backend no responde', done => {
    service.login({ email: 'demo@ecocommute.org', password: 'Demo123!' }).subscribe(res => {
      expect(res.email).toBe('demo@ecocommute.org');
      expect(service.currentUser?.email).toBe('demo@ecocommute.org');
      done();
    });
    const reqs = httpMock.match(() => true);
    reqs.forEach(req => req.error(new ProgressEvent('error')));
  });

  it('login reconoce a la administradora demo y marca isAdmin', done => {
    service.login({ email: 'admin@ecocommute.org', password: 'Admin123!' }).subscribe(res => {
      expect(res.role).toBe('ROLE_ADMIN');
      expect(service.isAdmin).toBeTrue();
      done();
    });
    const reqs = httpMock.match(() => true);
    reqs.forEach(req => req.error(new ProgressEvent('error')));
  });

  it('logout limpia la sesion actual', () => {
    service.logout();
    expect(service.currentUser).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });

  it('setApiBase normaliza la URL y la persiste en localStorage', () => {
    service.setApiBase('http://localhost:8080/');
    expect(service.apiBase).toBe('http://localhost:8080');
    expect(localStorage.getItem('ecocommute_api_base')).toBe('http://localhost:8080');
  });

  it('updatePointsAndLevel sube de nivel al cruzar el umbral de puntos', () => {
    service.setPointsAbsolute(50);
    expect(service.currentUser?.currentLevel).toBe(1);
    service.updatePointsAndLevel(300);
    expect(service.currentUser?.currentLevel).toBeGreaterThan(1);
  });
});
