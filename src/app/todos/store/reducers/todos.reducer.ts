import { createReducer, on } from '@ngrx/store';

import * as fromTodos from '../actions/todos.action';
import { Todo } from '../../models/todo.interface';

export interface TodoState {
  entities: { [id: number]: Todo };
  loaded: boolean;
  loading: boolean;
}

export const initialState: TodoState = {
  entities: {},
  loaded: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromTodos.LoadTodos, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(fromTodos.LoadTodosSuccess, (state, action) => {
    const todos = action.todos;
    const entities = todos.reduce(
      (entities: { [id: number]: Todo }, todo) => {
        return {
          ...entities,
          [todo.id]: todo,
        };
      },
      {
        ...state.entities,
      }
    );

    return {
      ...state,
      loaded: true,
      loading: false,
      entities,
    };
  }),
  on(fromTodos.LoadTodosFail, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(fromTodos.editTodoSuccess, fromTodos.AddTodoSuccess, (state, action) => {
    const todo = action.todo;
    const entities = { ...state.entities, [todo.id]: todo };

    return {
      ...state,
      entities,
    };
  }),
  on(fromTodos.deleteTodoSuccess, (state, action) => {
    const todo = action.todo;
    const { [todo.id]: deleted, ...entities } = state.entities;
    console.log(action);
    console.log({ ...state, entities });

    return { ...state, entities };
  })
);
