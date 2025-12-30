import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component')
        .then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
  path: 'user-dashboard',
  loadComponent: () =>
    import('./user-dashboard/user-dashboard.component')
      .then(m => m.UserDashboardComponent)
  },
  {
  path: 'admin-users',
  loadComponent: () =>
    import('./admin-users/admin-users.component')
      .then(m => m.AdminUsersComponent),
  canActivate: [AuthGuard]
  }


];
