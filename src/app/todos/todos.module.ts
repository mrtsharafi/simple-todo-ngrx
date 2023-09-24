import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, mapToCanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromGuards from './guards';
import * as fromServices from './services';
import { reducer } from './store/reducers/todos.reducer';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: mapToCanActivate([fromGuards.TodosGuard]),
    component: fromContainers.TodoHomeComponent,
  },
  {
    path: ':todoId',
    canActivate: mapToCanActivate([fromGuards.TodoExistGuard]),
    component: fromContainers.TodoDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ...fromContainers.containers,
    ...fromComponents.components,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('todos', reducer),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  exports: [
    ...fromContainers.containers,
    ...fromComponents.components,
    RouterModule,
  ],
})
export class TodosModule {}
