import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TripsComponent } from './trips.component';

describe('TripsComponent', () => {
  let fixture: ComponentFixture<TripsComponent>;
  let component: TripsComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TripsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea con los filtros en "Todos"', () => {
    expect(component).toBeTruthy();
    expect(component.selectedMode).toBe('ALL');
    expect(component.selectedPeriod).toBe('ALL');
  });

  it('filteredTrips respeta el filtro por medio de transporte', () => {
    component.trips = [
      { id: '1', transportMode: 'BICYCLE', completedAt: new Date().toISOString() } as never,
      { id: '2', transportMode: 'WALKING', completedAt: new Date().toISOString() } as never
    ];
    component.setModeFilter('BICYCLE');
    expect(component.filteredTrips.length).toBe(1);
    expect(component.filteredTrips[0].transportMode).toBe('BICYCLE');
  });

  it('formatShortMode traduce el medio de transporte', () => {
    expect(component.formatShortMode('CAR_SOLO')).toBe('Automóvil');
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
