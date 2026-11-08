import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Eliminar beneficio', message: '¿Eliminar "Cafe"?' } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
  });

  it('se crea correctamente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el titulo y el mensaje recibidos por datos', () => {
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent || '';
    expect(text).toContain('Eliminar beneficio');
    expect(text).toContain('¿Eliminar "Cafe"?');
  });

  it('usa "Eliminar" como etiqueta de confirmacion por defecto', () => {
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent || '';
    expect(text).toContain('Eliminar');
  });
});
