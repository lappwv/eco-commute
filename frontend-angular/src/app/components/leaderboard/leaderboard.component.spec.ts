import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let fixture: ComponentFixture<LeaderboardComponent>;
  let component: LeaderboardComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeaderboardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea con el distrito "Todos" seleccionado', () => {
    expect(component).toBeTruthy();
    expect(component.selectedDistrict).toBe('ALL');
  });

  it('define las columnas de la tabla de ranking', () => {
    expect(component.displayedColumns).toEqual(['rank', 'user', 'district', 'co2', 'points', 'trips', 'streak']);
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
