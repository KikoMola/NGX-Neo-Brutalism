import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PiecesComponent } from './components/pieces/pieces/pieces.component';
import { LayoutComponent } from './components/layout/layout.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'components',
    component: PiecesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
