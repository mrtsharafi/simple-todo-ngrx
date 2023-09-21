import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromTodos from './todos.reducer';

export interface TodosState {
  todos: fromTodos.TodoState;
}
//export interface TodosState extends EntityState<fromTodos.TodoState> {}

// export const reducers: ActionReducerMap<TodosState> = {
//   todos: fromTodos.reducer,
// };

export const getTodoState = createFeatureSelector<fromTodos.TodoState>('todos');
