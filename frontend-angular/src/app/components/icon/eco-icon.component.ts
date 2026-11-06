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
      <!-- BRAND MARK (EcoCommute Leaf + Route Node) -->
      <svg *ngSwitchCase="'brand'" viewBox="0 0 24 24" fill="none">
        <path d="M20 4C13.5 4 7 7.5 5 14.5C4.5 16.3 4.5 18.2 5 20C6.8 20.5 8.7 20.5 10.5 20C17.5 18 21 11.5 20 4Z" fill="#8CE52E" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 19L14.5 9.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
        <circle cx="15" cy="9" r="2.2" fill="#FFD24C" stroke="currentColor" stroke-width="1.8"/>
      </svg>

      <!-- LEAF / CO2 / ECO -->
      <svg *ngSwitchCase="'leaf'" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 4.5C13 4.5 7.5 7.8 5.5 14.2C5 15.9 5 17.7 5.5 19.5C7.3 20 9.1 20 10.8 19.5C17.2 17.5 20.5 12 19.5 4.5Z" fill="#8CE52E" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.5 19.5C8.5 15.5 12 12 15.5 9.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
      </svg>

      <!-- DASHBOARD / METRICS -->
      <svg *ngSwitchCase="'dashboard'" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="3.5" width="7.5" height="9" rx="2.2" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <rect x="13" y="3.5" width="7.5" height="5.5" rx="2.2" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <rect x="13" y="11.5" width="7.5" height="9" rx="2.2" fill="#74C7EC" stroke="currentColor" stroke-width="2"/>
        <rect x="3.5" y="15" width="7.5" height="5.5" rx="2.2" fill="#FFFFFF" stroke="currentColor" stroke-width="2"/>
      </svg>

      <!-- ROUTE / MAP PLANNER -->
      <svg *ngSwitchCase="'route'" viewBox="0 0 24 24" fill="none">
        <circle cx="6.5" cy="17.5" r="3" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <circle cx="17.5" cy="6.5" r="3" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <path d="M9.5 17.5H13.5C15.433 17.5 17 15.933 17 14C17 12.067 15.433 10.5 13.5 10.5H10.5C8.567 10.5 7 8.933 7 7C7 6.724 7.224 6.5 7.5 6.5H14.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
      </svg>

      <!-- BICYCLE -->
      <svg *ngSwitchCase="'bike'" viewBox="0 0 24 24" fill="none">
        <circle cx="5.75" cy="16.75" r="3.5" fill="#74C7EC" stroke="currentColor" stroke-width="2"/>
        <circle cx="18.25" cy="16.75" r="3.5" fill="#74C7EC" stroke="currentColor" stroke-width="2"/>
        <path d="M5.75 16.75L9.5 9.5H14.5L12 16.75H5.75Z" fill="#FFD24C" fill-opacity="0.6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M14.5 9.5L18.25 16.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 9.5H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M13.5 6.75H16L14.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- WALKING / PEDESTRIAN -->
      <svg *ngSwitchCase="'walk'" viewBox="0 0 24 24" fill="none">
        <circle cx="12.5" cy="4.75" r="2.2" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <path d="M10 9.5L12 8.5L14.5 10.5L16.5 12.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 13L10.5 9L12.5 14L15.5 20" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 14.5L8.5 20" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
      </svg>

      <!-- ELECTRIC SCOOTER -->
      <svg *ngSwitchCase="'scooter'" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="17.5" r="2.6" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <circle cx="18" cy="17.5" r="2.6" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <path d="M8.5 17.5H14.5L16.8 6.5H14" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 11.5L18 17.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
      </svg>

      <!-- PUBLIC TRANSIT / METRO / BUS -->
      <svg *ngSwitchCase="'bus'" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3.5" width="14" height="14.5" rx="3" fill="#74C7EC" stroke="currentColor" stroke-width="2"/>
        <path d="M5 11.5H19" stroke="currentColor" stroke-width="2"/>
        <circle cx="8.5" cy="15" r="1.2" fill="#FFD24C" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="15.5" cy="15" r="1.2" fill="#FFD24C" stroke="currentColor" stroke-width="1.4"/>
        <path d="M7.5 18V20.5M16.5 18V20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- CARPOOL -->
      <svg *ngSwitchCase="'carpool'" viewBox="0 0 24 24" fill="none">
        <path d="M4 13L6 8C6.4 7 7.4 6.5 8.5 6.5H15.5C16.6 6.5 17.6 7 18 8L20 13V18.5H18V16.5H6V18.5H4V13Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="7.5" cy="13.5" r="1.2" fill="currentColor"/>
        <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor"/>
      </svg>

      <!-- CAR SOLO -->
      <svg *ngSwitchCase="'car'" viewBox="0 0 24 24" fill="none">
        <path d="M4 13.5L6 8.5C6.4 7.5 7.4 7 8.5 7H15.5C16.6 7 17.6 7.5 18 8.5L20 13.5V18.5H18V17H6V18.5H4V13.5Z" fill="#FF9F68" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="7.5" cy="14" r="1.2" fill="currentColor"/>
        <circle cx="16.5" cy="14" r="1.2" fill="currentColor"/>
      </svg>

      <!-- MEDAL / BADGES / GAMIFICATION -->
      <svg *ngSwitchCase="'medal'" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 3.5H15.5L14 9.5H10L8.5 3.5Z" fill="#74C7EC" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="12" cy="14.5" r="5.5" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12V17M9.8 14.5H14.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
      </svg>

      <!-- TROPHY / LEADERBOARD -->
      <svg *ngSwitchCase="'trophy'" viewBox="0 0 24 24" fill="none">
        <path d="M7 4H17V10C17 12.761 14.761 15 12 15C9.239 15 7 12.761 7 10V4Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M7 6H4.5V8.5C4.5 10.157 5.843 11.5 7.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M17 6H19.5V8.5C19.5 10.157 18.157 11.5 16.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 15V19.5M8.5 19.5H15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- TICKET / REWARDS -->
      <svg *ngSwitchCase="'ticket'" viewBox="0 0 24 24" fill="none">
        <path d="M3.5 7.5C3.5 6.395 4.395 5.5 5.5 5.5H18.5C19.605 5.5 20.5 6.395 20.5 7.5V9.8C19.1 10.1 18.2 11 18.2 12C18.2 13 19.1 13.9 20.5 14.2V16.5C20.5 17.605 19.605 18.5 18.5 18.5H5.5C4.395 18.5 3.5 17.605 3.5 16.5V14.2C4.9 13.9 5.8 13 5.8 12C5.8 11 4.9 10.1 3.5 9.8V7.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M10 8.5V15.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-dasharray="2 2.5"/>
      </svg>

      <!-- COFFEE / PARTNER CAFE -->
      <svg *ngSwitchCase="'coffee'" viewBox="0 0 24 24" fill="none">
        <path d="M5 8.5H16V13.5C16 16.538 13.538 19 10.5 19C7.462 19 5 16.538 5 13.5V8.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M16 9.5H18C19.381 9.5 20.5 10.619 20.5 12C20.5 13.381 19.381 14.5 18 14.5H16" stroke="currentColor" stroke-width="2"/>
        <path d="M8 4.5V6.2M12.5 4.5V6.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- TREE / URBAN FOREST -->
      <svg *ngSwitchCase="'tree'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5C8.686 3.5 6 6.186 6 9.5C6 12.433 8.106 14.873 10.885 15.394L12 15.5L13.115 15.394C15.894 14.873 18 12.433 18 9.5C18 6.186 15.314 3.5 12 3.5Z" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <path d="M12 11.5V20.5M9 20.5H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- FLAME / STREAK / CALORIES -->
      <svg *ngSwitchCase="'flame'" viewBox="0 0 24 24" fill="none">
        <path d="M12.5 3.5C12.5 3.5 18 8 18 13.5C18 16.814 15.314 19.5 12 19.5C8.686 19.5 6 16.814 6 13.5C6 11.1 7.3 8.9 9.2 7.5C9.2 9.2 10.5 10.2 11.5 10.2C11.5 7.5 12.5 3.5 12.5 3.5Z" fill="#FF8A4C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- BOLT / ENERGY / POINTS -->
      <svg *ngSwitchCase="'bolt'" viewBox="0 0 24 24" fill="none">
        <path d="M13 3.5L5.5 13.5H12L11 20.5L18.5 10.5H12L13 3.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- SPARK / AI / GEMINI -->
      <svg *ngSwitchCase="'spark'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5L14.3 9.7L20.5 12L14.3 14.3L12 20.5L9.7 14.3L3.5 12L9.7 9.7L12 3.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- SHIELD / ADMIN / SECURITY -->
      <svg *ngSwitchCase="'shield'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5L19 6.5V11.8C19 16.1 16 19.5 12 20.8C8 19.5 5 16.1 5 11.8V6.5L12 3.5Z" fill="#74C7EC" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9.5 12.2L11.2 13.9L14.8 10.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- USER / PROFILE -->
      <svg *ngSwitchCase="'user'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.75" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <path d="M5.5 19.5C5.5 16.462 8.41 14 12 14C15.59 14 18.5 16.462 18.5 19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- GLOBE / LANGUAGE -->
      <svg *ngSwitchCase="'globe'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="#74C7EC" fill-opacity="0.35" stroke="currentColor" stroke-width="2"/>
        <ellipse cx="12" cy="12" rx="3.8" ry="8.5" stroke="currentColor" stroke-width="1.85"/>
        <path d="M4 12H20" stroke="currentColor" stroke-width="1.85"/>
      </svg>

      <!-- SUN / LIGHT MODE -->
      <svg *ngSwitchCase="'sun'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.25" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <path d="M12 3V5.2M12 18.8V21M3 12H5.2M18.8 12H21M5.6 5.6L7.2 7.2M16.8 16.8L18.4 18.4M18.4 5.6L16.8 7.2M7.2 16.8L5.6 18.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- MOON / DARK MODE -->
      <svg *ngSwitchCase="'moon'" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 14.5C18.3 15.1 16.9 15.5 15.5 15.5C10.8 15.5 7 11.7 7 7C7 5.8 7.3 4.6 7.8 3.6C5 4.8 3 7.6 3 11C3 15.7 6.8 19.5 11.5 19.5C15.2 19.5 18.3 17.4 19.5 14.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- PLUS / ADD -->
      <svg *ngSwitchCase="'plus'" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      </svg>

      <!-- EDIT / PENCIL -->
      <svg *ngSwitchCase="'edit'" viewBox="0 0 24 24" fill="none">
        <path d="M15.5 4.5L19.5 8.5L8.5 19.5H4.5V15.5L15.5 4.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- TRASH / DELETE -->
      <svg *ngSwitchCase="'trash'" viewBox="0 0 24 24" fill="none">
        <path d="M4.5 7H19.5M9.5 4H14.5M6.5 7L7.3 19.2C7.4 20.2 8.2 21 9.2 21H14.8C15.8 21 16.6 20.2 16.7 19.2L17.5 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- CHECK / VERIFIED -->
      <svg *ngSwitchCase="'check'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
        <path d="M8.5 12.2L10.8 14.5L15.5 9.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- LOCK -->
      <svg *ngSwitchCase="'lock'" viewBox="0 0 24 24" fill="none">
        <rect x="5.5" y="10.5" width="13" height="9.5" rx="2.2" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <path d="M8.5 10.5V7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5V10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- PIN / LOCATION -->
      <svg *ngSwitchCase="'pin'" viewBox="0 0 24 24" fill="none">
        <path d="M12 20.5C12 20.5 18 15.2 18 10C18 6.686 15.314 4 12 4C8.686 4 6 6.686 6 10C6 15.2 12 20.5 12 20.5Z" fill="#8CE52E" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="12" cy="10" r="2.2" fill="#FFFFFF" stroke="currentColor" stroke-width="1.6"/>
      </svg>

      <!-- FLAG / DESTINATION -->
      <svg *ngSwitchCase="'flag'" viewBox="0 0 24 24" fill="none">
        <path d="M6 4.5H18L15.5 9.25L18 14H6V4.5Z" fill="#FFD24C" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M6 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- CLOCK / TIME -->
      <svg *ngSwitchCase="'clock'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="#74C7EC" stroke="currentColor" stroke-width="2"/>
        <path d="M12 7.5V12L15.2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- TARGET / CHALLENGE -->
      <svg *ngSwitchCase="'target'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4.8" fill="#FFFFFF" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="1.8" fill="#8CE52E" stroke="currentColor" stroke-width="1.5"/>
      </svg>

      <!-- SLIDERS / SETTINGS -->
      <svg *ngSwitchCase="'sliders'" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="9" cy="7" r="2.6" fill="#FFD24C" stroke="currentColor" stroke-width="2"/>
        <circle cx="15" cy="17" r="2.6" fill="#8CE52E" stroke="currentColor" stroke-width="2"/>
      </svg>

      <!-- ARROW RIGHT -->
      <svg *ngSwitchCase="'arrow-right'" viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19M13.5 6.5L19 12L13.5 17.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- MENU -->
      <svg *ngSwitchCase="'menu'" viewBox="0 0 24 24" fill="none">
        <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      </svg>

      <!-- CLOSE -->
      <svg *ngSwitchCase="'close'" viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      </svg>

      <!-- DEFAULT FALLBACK (Brand Leaf) -->
      <svg *ngSwitchDefault viewBox="0 0 24 24" fill="none">
        <path d="M19.5 4.5C13 4.5 7.5 7.8 5.5 14.2C5 15.9 5 17.7 5.5 19.5C7.3 20 9.1 20 10.8 19.5C17.2 17.5 20.5 12 19.5 4.5Z" fill="#8CE52E" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.5 19.5C8.5 15.5 12 12 15.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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
