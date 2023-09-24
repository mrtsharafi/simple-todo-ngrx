import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Todos',
    loadChildren: () =>
      import('./todos/todos.module').then((mod) => mod.TodosModule),
  },
  {
    path: '**',
    redirectTo: 'Todos',
  },
];
