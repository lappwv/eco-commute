import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let fixture: ComponentFixture<AdminComponent>;
  let component: AdminComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true).forEach(req => req.flush(null, { status: 0, statusText: 'cleanup' }));
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('define las columnas de ambas tablas de administracion', () => {
    expect(component.rewardColumns).toEqual(['reward', 'code', 'cost', 'status', 'actions']);
    expect(component.challengeColumns).toEqual(['challenge', 'goal', 'period', 'status', 'actions']);
  });

  it('cancelRewardEdit limpia el beneficio en edicion', () => {
    component.editingRewardId = 5;
    component.cancelRewardEdit();
    expect(component.editingRewardId).toBeNull();
  });

  it('renderiza sin lanzar errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
