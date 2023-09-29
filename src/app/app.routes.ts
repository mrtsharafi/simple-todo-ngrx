import { Routes, mapToCanActivate } from '@angular/router';
import * as fromGuards from '../app/todos/guards';

export const routes: Routes = [
  {
    path: 'Todos',
    canActivate: mapToCanActivate([fromGuards.TodosGuard]),

    loadChildren: () =>
      import('./todos/todos.module').then((mod) => mod.TodosModule),
  },
  {
    path: '**',
    redirectTo: 'Todos',
  },
];
