import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RewardsComponent } from './rewards.component';

describe('RewardsComponent', () => {
  let fixture: ComponentFixture<RewardsComponent>;
  let component: RewardsComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RewardsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(RewardsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formatGoalUnit traduce la unidad de la meta', () => {
    expect(component.formatGoalUnit('kg_co2')).toBe('kg CO₂');
    expect(component.formatGoalUnit('km')).toBe('km');
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
