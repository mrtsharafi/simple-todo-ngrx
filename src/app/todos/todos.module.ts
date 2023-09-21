import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { effects } from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers/todos.reducer';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.from.TodoHomeComponent,
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
  providers: [...fromServices.services],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class TodosModule {}
