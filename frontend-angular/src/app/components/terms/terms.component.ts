import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcoIconComponent } from '../icon/eco-icon.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, EcoIconComponent],
  template: `
    <section class="page-section">
      <div class="section-header-row">
        <div>
          <span class="eyebrow-tag">
            <app-icon name="shield" [size]="14"></app-icon>
            Transparencia y Protección de Datos
          </span>
          <h1 class="page-title">Privacidad y Términos de Uso</h1>
          <p class="page-subtitle">
            Cómo cuidamos tu información de movilidad y cómo calculamos tus ahorros de emisiones en Lima.
          </p>
        </div>
        <a routerLink="/dashboard" class="btn-outline">
          <span>Volver a Mi Impacto</span>
        </a>
      </div>

      <article class="eco-card legal-card">
        <h2>1. Protección de Datos Personales (Ley N° 29733 — Perú)</h2>
        <p>
          EcoCommute procesa tus trayectos de origen y destino únicamente con el propósito de estimar emisiones de CO₂ evitadas,
          tiempo de viaje, energía activa y puntos canjeables en comercios aliados. Nunca compartimos ni vendemos tus ubicaciones
          individuales a terceros; los reportes distritales solo muestran indicadores colectivos y anónimos.
        </p>

        <h2>2. Cómo calculamos tu impacto ambiental</h2>
        <p>
          Para cada recorrido comparamos las emisiones de un automóvil particular promedio en Lima Metropolitana
          (<strong>170 g CO₂/km</strong>) frente al medio sostenible que elegiste (<strong>0 g CO₂/km</strong> en bicicleta mecánica o
          caminata, <strong>15 g CO₂/km</strong> en micromovilidad eléctrica y <strong>45 g CO₂/km</strong> en transporte público masivo).
        </p>

        <h2>3. Canje responsable de beneficios</h2>
        <p>
          Los puntos acumulados por tus recorridos verificados pueden canjearse en cafeterías, sistemas de bicicleta pública y
          espacios culturales afiliados en Lima. Cada cupón es personal y tiene vigencia de 30 días desde su emisión.
        </p>
      </article>
    </section>
  `
})
export class TermsComponent {}
