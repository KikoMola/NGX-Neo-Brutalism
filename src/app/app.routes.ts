import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'components',
    loadChildren: () => import('./components/pieces/pieces.routes').then(m => m.PIECES_ROUTES)
  },
  {
    path: '**',
    redirectTo: '',
  },
];
