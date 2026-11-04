import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="app-page-container" aria-labelledby="terms-title">
      <div class="page-header-card">
        <div>
          <span class="eyebrow-tag">Sección 3.1.3 · Ética y Responsabilidad Profesional</span>
          <h1 id="terms-title">Términos y Condiciones de Servicio — EcoCommute Lima</h1>
          <p class="subtitle">
            Redactados en cumplimiento del Código de Ética de Ingeniería de Software de ACM/IEEE, el Código Deontológico del Colegio de Ingenieros del Perú (CIP) y la Ley N.° 29733.
          </p>
        </div>
      </div>

      <mat-card class="eco-mat-card terms-article">
        <h2>1. Interés Público y Alineación con el ODS 11 (Meta 11.2)</h2>
        <p>
          EcoCommute es una plataforma web desarrollada con fines académicos y de impacto ambiental positivo para Lima Metropolitana, alineada con el Objetivo de Desarrollo Sostenible 11 (Ciudades y Comunidades Sostenibles, Meta 11.2). Todo cálculo de emisiones de CO₂ utiliza factores estandarizados de la EPA y DEFRA (170 g CO₂/km como línea base para automóvil particular urbano), garantizando transparencia algorítmica y ausencia de manipulación de métricas.
        </p>

        <h2>2. Protección de Datos Personales y Privacidad (Ley N.° 29733)</h2>
        <p>
          Las contraseñas de los usuarios se almacenan exclusivamente mediante hash criptográfico unidireccional <strong>BCrypt</strong> y las sesiones se gestionan mediante tokens <strong>JWT stateless (HMAC-SHA256)</strong>. Las coordenadas de origen y destino ingresadas para el cálculo de rutas con OSRM y las consultas al asesor de IA (Google Gemini <code>gemini-1.5-flash</code>) se procesan sin exponer datos personales identificables a terceros.
        </p>

        <h2>3. Uso Ético de la Inteligencia Artificial y Seguridad Vial</h2>
        <p>
          Las sugerencias de movilidad ("Corredor Verde Optimizado con IA") generadas mediante Google Gemini y el motor heurístico de respaldo constituyen recomendaciones informativas. El usuario se compromete a respetar el Reglamento Nacional de Tránsito del Perú, priorizar su integridad física y utilizar ciclovías segregadas e implementos de seguridad.
        </p>

        <h2>4. Accesibilidad (WCAG 2.1 AA) e Internacionalización (i18n)</h2>
        <p>
          Siguiendo principios de Diseño Inclusivo, EcoCommute incorpora soporte bilingüe (<code>es_419</code> y <code>en_US</code>), alto contraste visual, navegación por teclado y atributos semánticos ARIA en tanto su Landing Page como su Aplicación Web en Angular.
        </p>
      </mat-card>
    </section>
  `
})
export class TermsComponent {}
