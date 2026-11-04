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
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'routes', component: RoutesPlannerComponent },
  { path: 'trips', component: TripsComponent, canActivate: [authGuard] },
  { path: 'gamification', component: GamificationComponent, canActivate: [authGuard] },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'rewards', component: RewardsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'login', component: AuthComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
