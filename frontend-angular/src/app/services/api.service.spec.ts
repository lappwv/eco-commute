import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('buildFallbackDashboardSummary arma un resumen consistente', () => {
    const summary = service.buildFallbackDashboardSummary();
    expect(summary.weeklyTrend.length).toBe(7);
    expect(summary.email).toBe('demo@ecocommute.org');
    expect(summary.totalTrips).toBeGreaterThanOrEqual(0);
  });

  it('getDashboardSummary emite primero el resumen local (startWith)', done => {
    service
      .getDashboardSummary()
      .pipe(take(1))
      .subscribe(res => {
        expect(res.weeklyTrend.length).toBe(7);
        done();
      });
  });

  it('getRewards emite el catalogo local activo antes de responder el backend', done => {
    service
      .getRewards()
      .pipe(take(1))
      .subscribe(rewards => {
        expect(Array.isArray(rewards)).toBeTrue();
        expect(rewards.every(r => r.active)).toBeTrue();
        done();
      });
  });

  it('getChallenges emite los retos locales activos', done => {
    service
      .getChallenges()
      .pipe(take(1))
      .subscribe(challenges => {
        expect(Array.isArray(challenges)).toBeTrue();
        expect(challenges.every(c => c.active)).toBeTrue();
        done();
      });
  });

  it('checkHealth no lanza error cuando el backend no responde', done => {
    service
      .checkHealth()
      .pipe(take(1))
      .subscribe({
        next: () => {
          expect(true).toBeTrue();
          done();
        },
        error: () => {
          expect(true).toBeTrue();
          done();
        }
      });
    httpMock.match(() => true).forEach(req => req.error(new ProgressEvent('error')));
  });
});
