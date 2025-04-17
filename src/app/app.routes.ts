import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MainComponent } from './components/layout/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
