import { Routes } from '@angular/router';
import { PiecesComponent } from './pieces/pieces.component';

export const PIECES_ROUTES: Routes = [
  { 
    path: '', 
    component: PiecesComponent,
    children: [
      { path: 'button', loadComponent: () => import('./button/button.component').then(m => m.ButtonComponent) },
      { path: 'breadcrumb', loadComponent: () => import('./breadcrumb/breadcrumb.component').then(m => m.BreadcrumbComponent) },
      { path: 'badge', loadComponent: () => import('./badge/badge.component').then(m => m.BadgeComponent) },
      { path: 'avatar', loadComponent: () => import('./avatar/avatar.component').then(m => m.AvatarComponent) },
      { path: 'alert', loadComponent: () => import('./alert/alert.component').then(m => m.AlertComponent) },
      { path: 'accordion', loadComponent: () => import('./accordion/accordion.component').then(m => m.AccordionComponent) },
      { path: 'alert-dialog', loadComponent: () => import('./alert-dialog/alert-dialog.component').then(m => m.AlertDialogComponent) },
      { path: '', redirectTo: 'button', pathMatch: 'full' }
    ]
  }
];
