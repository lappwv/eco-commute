import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcoIconComponent } from './eco-icon.component';

describe('EcoIconComponent', () => {
  let fixture: ComponentFixture<EcoIconComponent>;
  let component: EcoIconComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcoIconComponent] });
    fixture = TestBed.createComponent(EcoIconComponent);
    component = fixture.componentInstance;
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('mapea un medio de transporte a su icono', () => {
    component.name = 'BICYCLE';
    expect(component.resolvedName).toBe('bike');
  });

  it('mapea un emoji conocido a su icono', () => {
    component.name = '🏆';
    expect(component.resolvedName).toBe('trophy');
  });

  it('usa el nombre en minusculas cuando no hay mapeo', () => {
    component.name = 'Route';
    expect(component.resolvedName).toBe('route');
  });

  it('renderiza un svg al detectar cambios', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
