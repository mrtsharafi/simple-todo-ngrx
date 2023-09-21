import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Todos',
    pathMatch: 'full',
    loadChildren: () =>
      import('./todos/todos.module').then((mod) => mod.TodosModule),
  },
  {
    path: 'Todos/:todoId',
    loadComponent: () =>
      import('../app/todos/containers/todo-detail/todo-detail.component').then(
        (m) => m.TodoDetailComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Todos',
  },
];
