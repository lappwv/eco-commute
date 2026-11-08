import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="eco-icon"
      [style.width.px]="size"
      [style.height.px]="size"
      [attr.aria-hidden]="true"
      [ngSwitch]="resolvedName"
    >
      <!-- BRAND MARK -->
      <svg *ngSwitchCase="'brand'" viewBox="0 0 24 24" fill="none">
        <path d="M20 4C13.2 4 6.8 7.6 4.8 14.6C4.3 16.4 4.4 18.2 5 20C6.8 20.5 8.6 20.5 10.4 20C17.4 18 21 11.4 20 4Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.8 19.2C8.6 15.2 12.2 11.8 16.2 8.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="16.2" cy="8.8" r="2" fill="currentColor"/>
      </svg>

      <!-- LEAF / CO2 -->
      <svg *ngSwitchCase="'leaf'" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 4.5C12.8 4.5 7.4 7.9 5.4 14.3C4.9 16 4.9 17.8 5.5 19.5C7.2 20 9 20 10.7 19.5C17.1 17.5 20.5 12 19.5 4.5Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.8 19.2C8.6 15.2 12.1 11.9 15.8 9.2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M10.5 13.8L10.2 10.6M13.2 11.4L16.2 11.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.75"/>
      </svg>

      <!-- DASHBOARD -->
      <svg *ngSwitchCase="'dashboard'" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="3.5" width="7.5" height="9.2" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.75"/>
        <rect x="13" y="3.5" width="7.5" height="5.5" rx="2" stroke="currentColor" stroke-width="1.75"/>
        <rect x="13" y="11.3" width="7.5" height="9.2" rx="2" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.75"/>
        <rect x="3.5" y="15" width="7.5" height="5.5" rx="2" stroke="currentColor" stroke-width="1.75"/>
      </svg>

      <!-- ROUTE / MAP PLANNER -->
      <svg *ngSwitchCase="'route'" viewBox="0 0 24 24" fill="none">
        <circle cx="6.2" cy="17.8" r="2.8" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="1.8"/>
        <path d="M17.8 9.5C17.8 9.5 20.5 6.8 20.5 5C20.5 3.5 19.3 2.3 17.8 2.3C16.3 2.3 15.1 3.5 15.1 5C15.1 6.8 17.8 9.5 17.8 9.5Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M9 17.8H13.6C15.5 17.8 17 16.3 17 14.4C17 12.5 15.5 11 13.6 11H10.4C8.5 11 7 9.5 7 7.6C7 6.5 7.9 5.6 9 5.6H13.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- BICYCLE (Stylized Geometric Frame) -->
      <svg *ngSwitchCase="'bike'" viewBox="0 0 24 24" fill="none">
        <circle cx="5.6" cy="16.6" r="3.6" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.75"/>
        <circle cx="18.4" cy="16.6" r="3.6" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.75"/>
        <path d="M5.6 16.6L9.6 9.8H15L11.8 16.6H5.6Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
        <path d="M15 9.8L18.4 16.6M9.6 9.8L11.8 16.6" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>
        <path d="M8.1 7.6H10.9M14.2 7H16.8L15 9.8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- WALKING -->
      <svg *ngSwitchCase="'walk'" viewBox="0 0 24 24" fill="none">
        <circle cx="12.5" cy="4.6" r="2.1" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="1.75"/>
        <path d="M9.5 9.6L12 8.4L14.6 10.5L16.8 12.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.8 13L10.6 8.9L12.6 14.2L15.6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.1 14.5L8.4 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- ELECTRIC SCOOTER -->
      <svg *ngSwitchCase="'scooter'" viewBox="0 0 24 24" fill="none">
        <circle cx="5.8" cy="17.5" r="2.5" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.75"/>
        <circle cx="18.2" cy="17.5" r="2.5" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.75"/>
        <path d="M8.3 17.5H14.8L17.2 6.2H14.4" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.2 11.2L18.2 17.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
      </svg>

      <!-- PUBLIC TRANSIT -->
      <svg *ngSwitchCase="'bus'" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3.5" width="14" height="14.5" rx="2.8" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.75"/>
        <path d="M5 11.2H19M9 6.5H15" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>
        <circle cx="8.5" cy="14.8" r="1.1" fill="currentColor"/>
        <circle cx="15.5" cy="14.8" r="1.1" fill="currentColor"/>
        <path d="M7.5 18V20.2M16.5 18V20.2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
      </svg>

      <!-- CARPOOL -->
      <svg *ngSwitchCase="'carpool'" viewBox="0 0 24 24" fill="none">
        <path d="M3.8 13.2L5.9 8.2C6.3 7.2 7.3 6.6 8.4 6.6H15.6C16.7 6.6 17.7 7.2 18.1 8.2L20.2 13.2V18.2H18.2V16.6H5.8V18.2H3.8V13.2Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
        <circle cx="7.5" cy="13.8" r="1.15" fill="currentColor"/>
        <circle cx="16.5" cy="13.8" r="1.15" fill="currentColor"/>
      </svg>

      <!-- CAR SOLO -->
      <svg *ngSwitchCase="'car'" viewBox="0 0 24 24" fill="none">
        <path d="M3.8 13.5L5.9 8.5C6.3 7.5 7.3 7 8.4 7H15.6C16.7 7 17.7 7.5 18.1 8.5L20.2 13.5V18.5H18.2V17H5.8V18.5H3.8V13.5Z" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
        <circle cx="7.5" cy="14" r="1.15" fill="currentColor"/>
        <circle cx="16.5" cy="14" r="1.15" fill="currentColor"/>
      </svg>

      <!-- MEDAL -->
      <svg *ngSwitchCase="'medal'" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 3.5H15.5L13.9 9.3H10.1L8.5 3.5Z" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
        <circle cx="12" cy="14.6" r="5.4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 11.8L12.85 13.6L14.8 13.85L13.4 15.2L13.75 17.1L12 16.2L10.25 17.1L10.6 15.2L9.2 13.85L11.15 13.6L12 11.8Z" fill="currentColor"/>
      </svg>

      <!-- TROPHY -->
      <svg *ngSwitchCase="'trophy'" viewBox="0 0 24 24" fill="none">
        <path d="M7 4H17V9.8C17 12.6 14.8 14.8 12 14.8C9.2 14.8 7 12.6 7 9.8V4Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M7 6H4.5V8.4C4.5 10.1 5.8 11.4 7.4 11.4M17 6H19.5V8.4C19.5 10.1 18.2 11.4 16.6 11.4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M12 14.8V19.5M8.5 19.5H15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- TICKET -->
      <svg *ngSwitchCase="'ticket'" viewBox="0 0 24 24" fill="none">
        <path d="M3.5 7.5C3.5 6.4 4.4 5.5 5.5 5.5H18.5C19.6 5.5 20.5 6.4 20.5 7.5V9.8C19.1 10.1 18.2 11 18.2 12C18.2 13 19.1 13.9 20.5 14.2V16.5C20.5 17.6 19.6 18.5 18.5 18.5H5.5C4.4 18.5 3.5 17.6 3.5 16.5V14.2C4.9 13.9 5.8 13 5.8 12C5.8 11 4.9 10.1 3.5 9.8V7.5Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M10.2 8.5V15.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="2 2.4"/>
      </svg>

      <!-- COFFEE -->
      <svg *ngSwitchCase="'coffee'" viewBox="0 0 24 24" fill="none">
        <path d="M5 8.5H16V13.5C16 16.5 13.5 19 10.5 19C7.5 19 5 16.5 5 13.5V8.5Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M16 9.5H18C19.4 9.5 20.5 10.6 20.5 12C20.5 13.4 19.4 14.5 18 14.5H16" stroke="currentColor" stroke-width="1.75"/>
        <path d="M8.2 4.2C8.2 5.2 9 5.6 9 6.5M12.5 4.2C12.5 5.2 13.3 5.6 13.3 6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>

      <!-- TREE -->
      <svg *ngSwitchCase="'tree'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.2C8.8 3.2 6.2 5.8 6.2 9C6.2 10.2 6.6 11.3 7.2 12.2C6.4 12.8 6 13.8 6.3 14.8C6.8 16.2 8.2 17 9.8 17H14.2C15.8 17 17.2 16.2 17.7 14.8C18 13.8 17.6 12.8 16.8 12.2C17.4 11.3 17.8 10.2 17.8 9C17.8 5.8 15.2 3.2 12 3.2Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
        <path d="M12 11.5V20.5M9.2 20.5H14.8M12 14.5L14.2 12.6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
      </svg>

      <!-- FLAME -->
      <svg *ngSwitchCase="'flame'" viewBox="0 0 24 24" fill="none">
        <path d="M12.6 3.2C12.6 3.2 18 7.8 18 13.4C18 16.8 15.3 19.6 12 19.6C8.7 19.6 6 16.8 6 13.4C6 10.9 7.4 8.7 9.3 7.3C9.3 9 10.5 10.1 11.6 10.1C11.5 7.4 12.6 3.2 12.6 3.2Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M12 19.5C10.5 19.5 9.3 18.3 9.3 16.7C9.3 15.2 10.6 13.9 12 12.8C13.4 13.9 14.7 15.2 14.7 16.7C14.7 18.3 13.5 19.5 12 19.5Z" fill="currentColor" fill-opacity="0.28"/>
      </svg>

      <!-- BOLT -->
      <svg *ngSwitchCase="'bolt'" viewBox="0 0 24 24" fill="none">
        <path d="M13.2 3.2L5.5 13.4H11.8L10.8 20.8L18.5 10.6H12.2L13.2 3.2Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>

      <!-- SPARK / AI -->
      <svg *ngSwitchCase="'spark'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.2L14.2 9.8L20.8 12L14.2 14.2L12 20.8L9.8 14.2L3.2 12L9.8 9.8L12 3.2Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
      </svg>

      <!-- SHIELD -->
      <svg *ngSwitchCase="'shield'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.4L19 6.4V11.8C19 16.1 16 19.5 12 20.8C8 19.5 5 16.1 5 11.8V6.4L12 3.4Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M9.5 12.2L11.2 13.9L14.8 10.3" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- USER -->
      <svg *ngSwitchCase="'user'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.7" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8"/>
        <path d="M5.5 19.5C5.5 16.5 8.4 14 12 14C15.6 14 18.5 16.5 18.5 19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- GLOBE -->
      <svg *ngSwitchCase="'globe'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.8"/>
        <ellipse cx="12" cy="12" rx="3.8" ry="8.5" stroke="currentColor" stroke-width="1.65"/>
        <path d="M4 12H20" stroke="currentColor" stroke-width="1.65"/>
      </svg>

      <!-- SUN -->
      <svg *ngSwitchCase="'sun'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 3V5.2M12 18.8V21M3 12H5.2M18.8 12H21M5.6 5.6L7.2 7.2M16.8 16.8L18.4 18.4M18.4 5.6L16.8 7.2M7.2 16.8L5.6 18.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- MOON -->
      <svg *ngSwitchCase="'moon'" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 14.5C18.3 15.1 16.9 15.5 15.5 15.5C10.8 15.5 7 11.7 7 7C7 5.8 7.3 4.6 7.8 3.6C5 4.8 3 7.6 3 11C3 15.7 6.8 19.5 11.5 19.5C15.2 19.5 18.3 17.4 19.5 14.5Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>

      <!-- PLUS -->
      <svg *ngSwitchCase="'plus'" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
      </svg>

      <!-- EDIT -->
      <svg *ngSwitchCase="'edit'" viewBox="0 0 24 24" fill="none">
        <path d="M15.5 4.5L19.5 8.5L8.5 19.5H4.5V15.5L15.5 4.5Z" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>

      <!-- TRASH -->
      <svg *ngSwitchCase="'trash'" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 7H19.5M9.5 4H14.5M6.5 7L7.3 19.2C7.4 20.2 8.2 21 9.2 21H14.8C15.8 21 16.6 20.2 16.7 19.2L17.5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- CHECK -->
      <svg *ngSwitchCase="'check'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8.5 12.2L10.8 14.5L15.5 9.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- LOCK -->
      <svg *ngSwitchCase="'lock'" viewBox="0 0 24 24" fill="none">
        <rect x="5.5" y="10.5" width="13" height="9.5" rx="2.2" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8.5 10.5V7.5C8.5 5.6 10.1 4 12 4C13.9 4 15.5 5.6 15.5 7.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- PIN -->
      <svg *ngSwitchCase="'pin'" viewBox="0 0 24 24" fill="none">
        <path d="M12 20.5C12 20.5 18 15.2 18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10C6 15.2 12 20.5 12 20.5Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="12" cy="10" r="2.2" fill="currentColor"/>
      </svg>

      <!-- FLAG -->
      <svg *ngSwitchCase="'flag'" viewBox="0 0 24 24" fill="none">
        <path d="M6 4.5H18L15.5 9.25L18 14H6V4.5Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M6 4V20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- CLOCK -->
      <svg *ngSwitchCase="'clock'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 7.5V12L15.2 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- TARGET -->
      <svg *ngSwitchCase="'target'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="12" cy="12" r="4.6" stroke="currentColor" stroke-width="1.65"/>
        <circle cx="12" cy="12" r="1.7" fill="currentColor"/>
      </svg>

      <!-- SLIDERS -->
      <svg *ngSwitchCase="'sliders'" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20M4 17H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="9" cy="7" r="2.5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="15" cy="17" r="2.5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.8"/>
      </svg>

      <!-- ARROW RIGHT -->
      <svg *ngSwitchCase="'arrow-right'" viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19M13.5 6.5L19 12L13.5 17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>


      <!-- HOME -->
      <svg *ngSwitchCase="'home'" viewBox="0 0 24 24" fill="none">
        <path d="M4 11.2L12 4L20 11.2V19.5A1.5 1.5 0 0 1 18.5 21H5.5A1.5 1.5 0 0 1 4 19.5V11.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9.5 21V14H14.5V21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>


      <!-- MENU -->
      <svg *ngSwitchCase="'menu'" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- CLOSE -->
      <svg *ngSwitchCase="'close'" viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- DEFAULT FALLBACK -->
      <svg *ngSwitchDefault viewBox="0 0 24 24" fill="none">
        <path d="M19.5 4.5C12.8 4.5 7.4 7.9 5.4 14.3C4.9 16 4.9 17.8 5.5 19.5C7.2 20 9 20 10.7 19.5C17.1 17.5 20.5 12 19.5 4.5Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.8 19.2C8.6 15.2 12.1 11.9 15.8 9.2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
      </svg>
    </span>
  `,
  styles: [
    `
      .eco-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        vertical-align: middle;
        line-height: 1;
      }
      .eco-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `
  ]
})
export class EcoIconComponent {
  @Input() name = 'leaf';
  @Input() size = 18;

  get resolvedName(): string {
    const raw = (this.name || '').trim();
    const map: Record<string, string> = {
      BICYCLE: 'bike',
      WALKING: 'walk',
      ELECTRIC_SCOOTER: 'scooter',
      PUBLIC_TRANSIT: 'bus',
      CARPOOL: 'carpool',
      CAR_SOLO: 'car',
      CAR: 'car',
      COFFEE_50: 'coffee',
      BIKE_HOUR: 'bike',
      PARK_PASS: 'ticket',
      TREE_300: 'tree',
      FIRST_STEP: 'leaf',
      BIKE_CHAMP: 'bike',
      TRANSIT_PRO: 'leaf',
      STREAK_7: 'flame',
      FOREST_HERO: 'tree',
      ZERO_EMISSION: 'bolt',
      '☕': 'coffee',
      '🚲': 'bike',
      '🚶': 'walk',
      '🛴': 'scooter',
      '🚌': 'bus',
      '🚗': 'car',
      '🎟️': 'ticket',
      '🎁': 'ticket',
      '🌳': 'tree',
      '🌱': 'leaf',
      '🌿': 'leaf',
      '🍃': 'leaf',
      '🔥': 'flame',
      '⚡': 'bolt',
      '🏅': 'medal',
      '🏆': 'trophy',
      '🥇': 'trophy',
      '🥈': 'medal',
      '🥉': 'medal',
      '🛡️': 'shield',
      '✨': 'spark',
      '📍': 'pin',
      '🎯': 'target',
      '🔒': 'lock',
      '✅': 'check'
    };
    return map[raw] || raw.toLowerCase();
  }
}
