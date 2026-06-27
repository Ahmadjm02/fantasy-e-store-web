import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./features/login/login').then(m => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/layout/layout').then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'store', pathMatch: 'full' },
      {
        path: 'store',
        loadComponent: () => import('./features/store/store').then(m => m.Store),
      },
      {
        path: 'store/:id',
        loadComponent: () => import('./features/details/details').then(m => m.Details),
      },
      {
        path: 'receipt/:orderId',
        loadComponent: () => import('./features/receipt/receipt').then(m => m.Receipt),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
