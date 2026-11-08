import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoutesPlannerComponent } from './components/routes-planner/routes-planner.component';
import { TripsComponent } from './components/trips/trips.component';
import { GamificationComponent } from './components/gamification/gamification.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { TermsComponent } from './components/terms/terms.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: { titleKey: 'nav.dashboard' } },
  { path: 'routes', component: RoutesPlannerComponent, data: { titleKey: 'nav.routes' } },
  { path: 'trips', component: TripsComponent, canActivate: [authGuard], data: { titleKey: 'nav.trips' } },
  { path: 'gamification', component: GamificationComponent, canActivate: [authGuard], data: { titleKey: 'nav.gamification' } },
  { path: 'leaderboard', component: LeaderboardComponent, data: { titleKey: 'nav.leaderboard' } },
  { path: 'rewards', component: RewardsComponent, canActivate: [authGuard], data: { titleKey: 'nav.rewards' } },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { titleKey: 'nav.admin' } },
  { path: 'login', component: AuthComponent, data: { titleKey: 'nav.login' } },
  { path: 'terms', component: TermsComponent, data: { titleKey: 'terms.title' } },
  { path: '**', redirectTo: 'dashboard' }
];
