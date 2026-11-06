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
      <!-- BRAND MARK (Exact EcoCommute Logo Style: Emerald Leaf + Turquoise Wave + Slate-Petrol Pin Loop) -->
      <svg *ngSwitchCase="'brand'" viewBox="0 0 32 32" fill="none">
        <!-- Outer Slate-Petrol Right Pin Loop -->
        <path d="M16 3C23.2 3 28.5 8.5 28.5 15.8C28.5 21.8 23.6 26.8 18.8 29.5C19.5 26.2 19.2 22.8 17.2 20.2C20.6 19.6 23 16.8 23 13.2C23 9.2 19.8 6 15.8 6C12.2 6 9.2 8.6 8.8 12C7.4 9.5 8.5 5.2 16 3Z" fill="#3E5668"/>
        <!-- Aqua-Turquoise Swirling Ribbon -->
        <path d="M15.8 2.5C10.2 2.5 6.2 6.8 6.8 12.4C7.2 15.8 10.2 18.2 13.8 20.4C16.8 22.2 18.5 24.8 18.2 28.4C22.8 25.2 25.8 20.4 25.8 14.8C25.8 8.2 21.4 2.5 15.8 2.5ZM15.8 18.8C12.5 18.8 9.8 16.2 9.8 12.8C9.8 9.5 12.5 6.8 15.8 6.8C19.2 6.8 21.8 9.5 21.8 12.8C21.8 16.2 19.2 18.8 15.8 18.8Z" fill="#00B8B8"/>
        <!-- White Pin Center Core -->
        <circle cx="15.8" cy="12.8" r="4.8" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.2"/>
        <!-- Vibrant Emerald Leaf with White Negative-Space Vein -->
        <path d="M5.2 9.2C2.4 14.6 3.2 21.4 8.2 25.8C11.4 28.6 14.2 29.8 15.8 31C16.4 27.6 15.6 24.4 12.8 21.6C9.2 18.2 5.4 15.2 5.2 9.2Z" fill="#00A86B"/>
        <path d="M5.2 9.2C5.2 14.5 9.6 17.6 13.8 20.8C16.8 23.1 17.8 26.2 17.2 29.2C18.8 26.8 19.2 23.2 16.8 20.2C13.6 16.4 7.5 14.2 5.2 9.2Z" fill="#10B981"/>
        <path d="M6.5 15.2C9.2 19.2 13.2 22.2 15.2 27.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- LEAF / CO2 / ECO (Layered Emerald & Turquoise Dual-Leaf with White Vein & Petrol Stem) -->
      <svg *ngSwitchCase="'leaf'" viewBox="0 0 32 32" fill="none">
        <!-- Turquoise Back Leaf Swirl -->
        <path d="M26.5 6.5C26.5 15.5 21.5 23.2 12.5 25.5C9.2 26.2 6.5 25.5 4.8 24C6.5 14.5 13.5 6.5 26.5 6.5Z" fill="#00B8B8" stroke="#3E5668" stroke-width="1.6" stroke-linejoin="round"/>
        <!-- Emerald Front Leaf -->
        <path d="M24.5 4.5C14.5 4.8 7.2 11.2 5.5 20.5C5.1 22.8 5.5 25.2 6.5 26.8C15.8 25.2 23.5 18.2 24.5 4.5Z" fill="#00A86B" stroke="#3E5668" stroke-width="1.6" stroke-linejoin="round"/>
        <!-- Inner White Negative-Space Vein & Dewdrop -->
        <path d="M6.2 25.8C10.5 20.5 15.2 15.5 21.2 10.2" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M12.5 18.5L16.8 19.2M15.2 14.8L19.2 15.2" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="22.5" cy="9.5" r="2.2" fill="#FFD24C" stroke="#3E5668" stroke-width="1.4"/>
      </svg>

      <!-- DASHBOARD / METRICS (Multi-Layered Logo-Colored Control Emblem) -->
      <svg *ngSwitchCase="'dashboard'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13.5" fill="#E6FAF5" stroke="#3E5668" stroke-width="1.6"/>
        <rect x="5.5" y="5.5" width="9.5" height="11" rx="3" fill="#00A86B" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M8 12.5L10.2 9.8L12.5 11.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="17" y="5.5" width="9.5" height="7.5" rx="3" fill="#FFD24C" stroke="#3E5668" stroke-width="1.6"/>
        <circle cx="21.75" cy="9.25" r="1.8" fill="#FFFFFF"/>
        <rect x="17" y="15" width="9.5" height="11.5" rx="3" fill="#00B8B8" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M19.5 23V19.5M22 23V17.8M24.2 23V20.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        <rect x="5.5" y="18.5" width="9.5" height="8" rx="3" fill="#3E5668" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M8 22.5H12.5" stroke="#00B8B8" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- ROUTE / MAP PLANNER (Swirling Pin + Road Ribbon + Leaf like Logo) -->
      <svg *ngSwitchCase="'route'" viewBox="0 0 32 32" fill="none">
        <!-- Swirling Turquoise & Slate Route Ribbon -->
        <path d="M6 24.5C6 19.5 11.5 19.5 16 16C20.5 12.5 26 12.5 26 7.5" stroke="#3E5668" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M6 24.5C6 19.5 11.5 19.5 16 16C20.5 12.5 26 12.5 26 7.5" stroke="#00B8B8" stroke-width="2.6" stroke-dasharray="3.5 3.5" stroke-linecap="round"/>
        <!-- Origin Emerald Pin -->
        <circle cx="7" cy="24" r="4.5" fill="#00A86B" stroke="#3E5668" stroke-width="1.8"/>
        <circle cx="7" cy="24" r="1.8" fill="#FFFFFF"/>
        <!-- Destination Gold + Turquoise Pin -->
        <path d="M25 14.5C25 14.5 29.5 10.2 29.5 6.8C29.5 4.3 27.5 2.3 25 2.3C22.5 2.3 20.5 4.3 20.5 6.8C20.5 10.2 25 14.5 25 14.5Z" fill="#FFD24C" stroke="#3E5668" stroke-width="1.7" stroke-linejoin="round"/>
        <circle cx="25" cy="6.8" r="1.8" fill="#3E5668"/>
        <!-- Decorative Emerald Leaf Accent -->
        <path d="M5.5 12.5C5.5 8.5 9.5 6 13.5 7.5C12.5 11.5 9.5 13.5 5.5 12.5Z" fill="#00A86B" stroke="#3E5668" stroke-width="1.5"/>
      </svg>

      <!-- BICYCLE (Logo-Palette Layered Cycle with Turquoise Swirl & Emerald Frame) -->
      <svg *ngSwitchCase="'bike'" viewBox="0 0 32 32" fill="none">
        <!-- Turquoise Swirl Backdrop Arc -->
        <path d="M4 21C5.5 11 15 6 25 10" stroke="#00B8B8" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
        <!-- Wheels in Slate-Petrol + Turquoise + White -->
        <circle cx="8" cy="21.5" r="5.2" fill="#FFFFFF" stroke="#3E5668" stroke-width="2.2"/>
        <circle cx="8" cy="21.5" r="2.8" fill="#00B8B8"/>
        <circle cx="24" cy="21.5" r="5.2" fill="#FFFFFF" stroke="#3E5668" stroke-width="2.2"/>
        <circle cx="24" cy="21.5" r="2.8" fill="#00B8B8"/>
        <!-- Emerald & Gold Frame -->
        <path d="M8 21.5L13 12.5H20.5L16 21.5H8Z" fill="#00A86B" fill-opacity="0.28" stroke="#00A86B" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M13 12.5L16 21.5M20.5 12.5L24 21.5" stroke="#3E5668" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Seat & Handlebar -->
        <path d="M10.5 12.5H14.5" stroke="#3E5668" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M19 9.2H22.5L20.5 12.5" stroke="#3E5668" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Front Leaf Basket -->
        <rect x="21.5" y="10.2" width="4.5" height="3.8" rx="1.2" fill="#FFD24C" stroke="#3E5668" stroke-width="1.5"/>
      </svg>

      <!-- WALKING / PEDESTRIAN -->
      <svg *ngSwitchCase="'walk'" viewBox="0 0 32 32" fill="none">
        <path d="M4 26.5C10 24 22 24 28 26.5" stroke="#00A86B" stroke-width="3" stroke-linecap="round"/>
        <circle cx="16.5" cy="6.2" r="3.2" fill="#FFD24C" stroke="#3E5668" stroke-width="1.8"/>
        <path d="M11.5 15.5L15 11.2L18.5 13.5L21.5 16" stroke="#00B8B8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.2 11.2L13.5 18.2L10.2 25.2" stroke="#3E5668" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.2 18L18.5 20.5L20.8 25.2" stroke="#00A86B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- ELECTRIC SCOOTER -->
      <svg *ngSwitchCase="'scooter'" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="23" r="4" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <circle cx="24" cy="23" r="4" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <path d="M8 23H20.5L23.5 8.5H19.5" stroke="#3E5668" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="10.5" y="20.2" width="9.5" height="2.8" rx="1.4" fill="#00A86B"/>
        <path d="M21.8 15L24 23" stroke="#00A86B" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M13.5 6.5L10.5 11.5H13.8L12.5 16L16.8 10.2H13.5L13.5 6.5Z" fill="#FFD24C" stroke="#3E5668" stroke-width="1.4" stroke-linejoin="round"/>
      </svg>

      <!-- PUBLIC TRANSIT / METRO / BUS -->
      <svg *ngSwitchCase="'bus'" viewBox="0 0 32 32" fill="none">
        <rect x="5.5" y="4.5" width="21" height="19.5" rx="4.5" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <path d="M5.5 16.5H26.5V20C26.5 22.2 24.7 24 22.5 24H9.5C7.3 24 5.5 22.2 5.5 20V16.5Z" fill="#3E5668"/>
        <rect x="8" y="7.5" width="16" height="6.8" rx="2" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.5"/>
        <path d="M16 7.5V14.3" stroke="#3E5668" stroke-width="1.5"/>
        <circle cx="10" cy="20.2" r="1.8" fill="#FFD24C"/>
        <circle cx="22" cy="20.2" r="1.8" fill="#FFD24C"/>
        <rect x="8.5" y="24" width="3.5" height="3.5" rx="1.2" fill="#3E5668"/>
        <rect x="20" y="24" width="3.5" height="3.5" rx="1.2" fill="#3E5668"/>
        <path d="M11 4.5H21" stroke="#00A86B" stroke-width="3" stroke-linecap="round"/>
      </svg>

      <!-- CARPOOL -->
      <svg *ngSwitchCase="'carpool'" viewBox="0 0 32 32" fill="none">
        <path d="M4.5 17.5L7.2 10.5C7.8 9.2 9.1 8.5 10.5 8.5H21.5C22.9 8.5 24.2 9.2 24.8 10.5L27.5 17.5V24.5H24.2V22H7.8V24.5H4.5V17.5Z" fill="#00B8B8" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M8.5 11H23.5L25 16H7L8.5 11Z" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="9.5" cy="19.2" r="1.8" fill="#FFD24C"/>
        <circle cx="22.5" cy="19.2" r="1.8" fill="#FFD24C"/>
        <circle cx="13" cy="13.5" r="1.6" fill="#00A86B"/>
        <circle cx="19" cy="13.5" r="1.6" fill="#00A86B"/>
      </svg>

      <!-- CAR SOLO -->
      <svg *ngSwitchCase="'car'" viewBox="0 0 32 32" fill="none">
        <path d="M4.5 17.5L7.2 10.5C7.8 9.2 9.1 8.5 10.5 8.5H21.5C22.9 8.5 24.2 9.2 24.8 10.5L27.5 17.5V24.5H24.2V22H7.8V24.5H4.5V17.5Z" fill="#FF7A59" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M8.5 11H23.5L25 16H7L8.5 11Z" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="9.5" cy="19.2" r="1.8" fill="#FFD24C"/>
        <circle cx="22.5" cy="19.2" r="1.8" fill="#FFD24C"/>
      </svg>

      <!-- MEDAL / BADGES (Layered Ribbon Rosette in Logo Colors) -->
      <svg *ngSwitchCase="'medal'" viewBox="0 0 32 32" fill="none">
        <path d="M9.5 3.5H16L13.5 12.5H7.5L9.5 3.5Z" fill="#00B8B8" stroke="#3E5668" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M22.5 3.5H16L18.5 12.5H24.5L22.5 3.5Z" fill="#00A86B" stroke="#3E5668" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="16" cy="19" r="8.2" fill="#FFD24C" stroke="#3E5668" stroke-width="2"/>
        <circle cx="16" cy="19" r="5.2" fill="#00A86B" stroke="#FFFFFF" stroke-width="1.5"/>
        <path d="M16 15.8L17 18H19.2L17.5 19.4L18.2 21.6L16 20.2L13.8 21.6L14.5 19.4L12.8 18H15L16 15.8Z" fill="#FFFFFF"/>
      </svg>

      <!-- TROPHY / LEADERBOARD -->
      <svg *ngSwitchCase="'trophy'" viewBox="0 0 32 32" fill="none">
        <path d="M9 5H23V12.5C23 16.4 19.9 19.5 16 19.5C12.1 19.5 9 16.4 9 12.5V5Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9 7.5H5V10.5C5 13 7 15 9.5 15" stroke="#00B8B8" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M23 7.5H27V10.5C27 13 25 15 22.5 15" stroke="#00A86B" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M16 19.5V25M10.5 25.5H21.5" stroke="#3E5668" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="16" cy="11.5" r="3" fill="#00A86B" stroke="#FFFFFF" stroke-width="1.4"/>
      </svg>

      <!-- TICKET / REWARDS -->
      <svg *ngSwitchCase="'ticket'" viewBox="0 0 32 32" fill="none">
        <path d="M4 9.5C4 8.1 5.1 7 6.5 7H25.5C26.9 7 28 8.1 28 9.5V12.8C26.2 13.2 25 14.4 25 16C25 17.6 26.2 18.8 28 19.2V22.5C28 23.9 26.9 25 25.5 25H6.5C5.1 25 4 23.9 4 22.5V19.2C5.8 18.8 7 17.6 7 16C7 14.4 5.8 13.2 4 12.8V9.5Z" fill="#00B8B8" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M13 7H25.5C26.9 7 28 8.1 28 9.5V12.8C26.2 13.2 25 14.4 25 16C25 17.6 26.2 18.8 28 19.2V22.5C28 23.9 26.9 25 25.5 25H13V7Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M13 9.5V22.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="2.5 2.5"/>
        <circle cx="20.5" cy="16" r="3.2" fill="#00A86B" stroke="#FFFFFF" stroke-width="1.4"/>
      </svg>

      <!-- COFFEE / PARTNER CAFE -->
      <svg *ngSwitchCase="'coffee'" viewBox="0 0 32 32" fill="none">
        <path d="M23 12.5H25.5C27.4 12.5 29 14.1 29 16C29 17.9 27.4 19.5 25.5 19.5H23" stroke="#00B8B8" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M6.5 11H23V18C23 22.6 19.3 26.2 14.8 26.2C10.2 26.2 6.5 22.6 6.5 18V11Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <rect x="6.5" y="14.5" width="16.5" height="5.5" fill="#00A86B" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M11 5.5C11 7 12.5 7.5 12.5 9M17 5.5C17 7 18.5 7.5 18.5 9" stroke="#00B8B8" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- TREE / URBAN FOREST (Multi-Crown Emerald & Turquoise Tree) -->
      <svg *ngSwitchCase="'tree'" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="13.5" r="6.5" fill="#00B8B8" stroke="#3E5668" stroke-width="1.8"/>
        <circle cx="20" cy="14" r="6" fill="#10B981" stroke="#3E5668" stroke-width="1.8"/>
        <circle cx="16" cy="9.5" r="6.5" fill="#00A86B" stroke="#3E5668" stroke-width="1.8"/>
        <path d="M13.5 9C15 7.5 17.2 7.5 18.8 9" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M16 15.5V27M11.5 27H20.5" stroke="#3E5668" stroke-width="2.4" stroke-linecap="round"/>
      </svg>

      <!-- FLAME / STREAK / CALORIES -->
      <svg *ngSwitchCase="'flame'" viewBox="0 0 32 32" fill="none">
        <path d="M16.8 4C16.8 4 24.5 9.8 24.5 17.5C24.5 22.2 20.7 26 16 26C11.3 26 7.5 22.2 7.5 17.5C7.5 14 9.5 10.8 12.2 9C12.2 11.5 14 12.8 15.5 12.8C15.2 9 16.8 4 16.8 4Z" fill="#FF6B4A" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M16 14.5C16 14.5 19.8 17.5 19.8 20.8C19.8 22.9 18.1 24.5 16 24.5C13.9 24.5 12.2 22.9 12.2 20.8C12.2 18.5 14.2 16.2 16 14.5Z" fill="#FFD24C"/>
      </svg>

      <!-- BOLT / ENERGY / POINTS -->
      <svg *ngSwitchCase="'bolt'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#00B8B8" fill-opacity="0.22" stroke="#00B8B8" stroke-width="1.6"/>
        <path d="M17.5 4.5L7.5 17.5H16L14.5 27.5L24.5 14.5H16L17.5 4.5Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
      </svg>

      <!-- SPARK / AI / GEMINI -->
      <svg *ngSwitchCase="'spark'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" fill="#00A86B" fill-opacity="0.2"/>
        <path d="M16 4L19.2 12.8L28 16L19.2 19.2L16 28L12.8 19.2L4 16L12.8 12.8L16 4Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="16" cy="16" r="2.5" fill="#00B8B8"/>
      </svg>

      <!-- SHIELD / ADMIN / SECURITY -->
      <svg *ngSwitchCase="'shield'" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L25.5 8V15.2C25.5 21.2 21.5 25.8 16 27.8C10.5 25.8 6.5 21.2 6.5 15.2V8L16 4Z" fill="#00B8B8" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M16 6.8L22.8 9.6V15C22.8 19.5 19.9 23 16 24.6V6.8Z" fill="#00A86B"/>
        <path d="M12 16L14.8 18.8L20.5 13.2" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- USER / PROFILE -->
      <svg *ngSwitchCase="'user'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12.5" fill="#E6FAF5" stroke="#3E5668" stroke-width="1.8"/>
        <circle cx="16" cy="11.5" r="4.5" fill="#FFD24C" stroke="#3E5668" stroke-width="1.8"/>
        <path d="M8.5 25C8.5 20.8 11.8 18 16 18C20.2 18 23.5 20.8 23.5 25" fill="#00A86B" stroke="#3E5668" stroke-width="1.8" stroke-linecap="round"/>
      </svg>

      <!-- GLOBE / LANGUAGE -->
      <svg *ngSwitchCase="'globe'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.5" fill="#00B8B8" fill-opacity="0.28" stroke="#3E5668" stroke-width="2"/>
        <ellipse cx="16" cy="16" rx="5.2" ry="11.5" fill="#00A86B" fill-opacity="0.3" stroke="#3E5668" stroke-width="1.8"/>
        <path d="M5 16H27" stroke="#3E5668" stroke-width="1.8"/>
      </svg>

      <!-- SUN / LIGHT MODE -->
      <svg *ngSwitchCase="'sun'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" fill="#FFD24C" stroke="#3E5668" stroke-width="2"/>
        <path d="M16 4V7M16 25V28M4 16H7M25 16H28M7.5 7.5L9.8 9.8M22.2 22.2L24.5 24.5M24.5 7.5L22.2 9.8M9.8 22.2L7.5 24.5" stroke="#00A86B" stroke-width="2.2" stroke-linecap="round"/>
      </svg>

      <!-- MOON / DARK MODE -->
      <svg *ngSwitchCase="'moon'" viewBox="0 0 32 32" fill="none">
        <path d="M25.5 19.2C23.8 20.1 21.9 20.6 19.8 20.6C13.6 20.6 8.6 15.6 8.6 9.4C8.6 7.8 9 6.2 9.7 4.8C5.9 6.5 3.4 10.2 3.4 14.7C3.4 20.9 8.4 25.9 14.6 25.9C19.6 25.9 23.8 23.1 25.5 19.2Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="22" cy="9" r="2" fill="#00B8B8"/>
      </svg>

      <!-- PLUS / ADD -->
      <svg *ngSwitchCase="'plus'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.5" fill="#00A86B" stroke="#3E5668" stroke-width="2"/>
        <path d="M16 10V22M10 16H22" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      </svg>

      <!-- EDIT / PENCIL -->
      <svg *ngSwitchCase="'edit'" viewBox="0 0 32 32" fill="none">
        <path d="M20.5 5.5L26.5 11.5L11.5 26.5H5.5V20.5L20.5 5.5Z" fill="#FFD24C" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M17.5 8.5L23.5 14.5" stroke="#00A86B" stroke-width="2"/>
      </svg>

      <!-- TRASH / DELETE -->
      <svg *ngSwitchCase="'trash'" viewBox="0 0 32 32" fill="none">
        <path d="M6 9.5H26M12.5 5.5H19.5M8.5 9.5L9.6 25C9.7 26.4 10.8 27.5 12.2 27.5H19.8C21.2 27.5 22.3 26.4 22.4 25L23.5 9.5" fill="#FFE4DE" stroke="#3E5668" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- CHECK / VERIFIED -->
      <svg *ngSwitchCase="'check'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.5" fill="#00A86B" stroke="#3E5668" stroke-width="2"/>
        <path d="M11 16.2L14.2 19.5L21.2 12.5" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- LOCK -->
      <svg *ngSwitchCase="'lock'" viewBox="0 0 32 32" fill="none">
        <rect x="7" y="14" width="18" height="13" rx="3.2" fill="#FFD24C" stroke="#3E5668" stroke-width="2"/>
        <path d="M11 14V10C11 7.2 13.2 5 16 5C18.8 5 21 7.2 21 10V14" stroke="#3E5668" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="16" cy="20.5" r="2" fill="#3E5668"/>
      </svg>

      <!-- PIN / LOCATION (Direct Logo Pin Tribute) -->
      <svg *ngSwitchCase="'pin'" viewBox="0 0 32 32" fill="none">
        <path d="M16 28C16 28 24.5 20.5 24.5 13C24.5 8.3 20.7 4.5 16 4.5C11.3 4.5 7.5 8.3 7.5 13C7.5 20.5 16 28 16 28Z" fill="#00B8B8" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M7.5 13C7.5 19.5 14 26 16 28C15.5 22 12 18.5 7.5 13Z" fill="#00A86B"/>
        <circle cx="16" cy="13" r="3.6" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.6"/>
      </svg>

      <!-- FLAG / DESTINATION -->
      <svg *ngSwitchCase="'flag'" viewBox="0 0 32 32" fill="none">
        <path d="M8 6H24.5L21 12.5L24.5 19H8V6Z" fill="#00A86B" stroke="#3E5668" stroke-width="2" stroke-linejoin="round"/>
        <path d="M8 6H17L15 12.5L17 19H8V6Z" fill="#00B8B8"/>
        <path d="M8 5V27" stroke="#3E5668" stroke-width="2.4" stroke-linecap="round"/>
      </svg>

      <!-- CLOCK / TIME -->
      <svg *ngSwitchCase="'clock'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.5" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <circle cx="16" cy="16" r="8.5" fill="#FFFFFF"/>
        <path d="M16 10.5V16L20 18.5" stroke="#00A86B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- TARGET / CHALLENGE -->
      <svg *ngSwitchCase="'target'" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11.5" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <circle cx="16" cy="16" r="7" fill="#FFFFFF" stroke="#3E5668" stroke-width="1.8"/>
        <circle cx="16" cy="16" r="3" fill="#00A86B"/>
      </svg>

      <!-- SLIDERS / SETTINGS -->
      <svg *ngSwitchCase="'sliders'" viewBox="0 0 32 32" fill="none">
        <path d="M5 10H27M5 22H27" stroke="#3E5668" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="11.5" cy="10" r="3.6" fill="#00B8B8" stroke="#3E5668" stroke-width="2"/>
        <circle cx="20.5" cy="22" r="3.6" fill="#00A86B" stroke="#3E5668" stroke-width="2"/>
      </svg>

      <!-- ARROW RIGHT -->
      <svg *ngSwitchCase="'arrow-right'" viewBox="0 0 32 32" fill="none">
        <path d="M6.5 16H25.5M18 8.5L25.5 16L18 23.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- MENU -->
      <svg *ngSwitchCase="'menu'" viewBox="0 0 32 32" fill="none">
        <path d="M5.5 9.5H26.5M5.5 16H26.5M5.5 22.5H26.5" stroke="#3E5668" stroke-width="2.6" stroke-linecap="round"/>
      </svg>

      <!-- CLOSE -->
      <svg *ngSwitchCase="'close'" viewBox="0 0 32 32" fill="none">
        <path d="M8 8L24 24M24 8L8 24" stroke="#3E5668" stroke-width="2.6" stroke-linecap="round"/>
      </svg>

      <!-- DEFAULT FALLBACK (EcoCommute Brand Emblem) -->
      <svg *ngSwitchDefault viewBox="0 0 32 32" fill="none">
        <path d="M26.5 6.5C26.5 15.5 21.5 23.2 12.5 25.5C9.2 26.2 6.5 25.5 4.8 24C6.5 14.5 13.5 6.5 26.5 6.5Z" fill="#00B8B8" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M24.5 4.5C14.5 4.8 7.2 11.2 5.5 20.5C5.1 22.8 5.5 25.2 6.5 26.8C15.8 25.2 23.5 18.2 24.5 4.5Z" fill="#00A86B" stroke="#3E5668" stroke-width="1.6"/>
        <path d="M6.2 25.8C10.5 20.5 15.2 15.5 21.2 10.2" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
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
        filter: drop-shadow(0 1px 1px rgba(44, 66, 81, 0.14));
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
  @Input() size = 20;

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
      TRANSIT_PRO: 'bus',
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
