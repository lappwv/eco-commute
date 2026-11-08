import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcoIconComponent } from '../icon/eco-icon.component';
import { I18nService } from '../../services/i18n.service';

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
            {{ i18n.t('terms.eyebrow') }}
          </span>
          <h1 class="page-title">{{ i18n.t('terms.title') }}</h1>
          <p class="page-subtitle">{{ i18n.t('terms.subtitle') }}</p>
        </div>
        <a routerLink="/dashboard" class="btn-outline">
          <span>{{ i18n.t('terms.back') }}</span>
        </a>
      </div>

      <article class="eco-card legal-card">
        <h2>{{ i18n.t('terms.s1.title') }}</h2>
        <p>{{ i18n.t('terms.s1.body') }}</p>

        <h2>{{ i18n.t('terms.s2.title') }}</h2>
        <p [innerHTML]="i18n.t('terms.s2.body')"></p>

        <h2>{{ i18n.t('terms.s3.title') }}</h2>
        <p>{{ i18n.t('terms.s3.body') }}</p>
      </article>
    </section>
  `
})
export class TermsComponent {
  constructor(public i18n: I18nService) {}
}
