import { createReducer, on } from '@ngrx/store';

import * as fromTodos from '../actions/todos.action';
import { Todo } from '../../models/todo.interface';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface TodoState extends EntityState<Todo> {
  loaded: boolean;
  loading: boolean;
}
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodoState = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,
  on(fromTodos.LoadTodos, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),

  on(fromTodos.LoadTodosSuccess, (state, { todos }) => {
    return adapter.setAll(todos, { ...state, loaded: true, loading: false });
  }),

  on(fromTodos.LoadTodosFail, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(fromTodos.editTodoSuccess, fromTodos.AddTodoSuccess, (state, { todo }) => {
    return adapter.upsertOne(todo, { ...state, loaded: true, loading: false });
  }),

  on(fromTodos.deleteTodoSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loaded: true, loading: false });
  })
);
