import { createAction, props } from '@ngrx/store';

import { Todo } from '../../models/todo.interface';

// load todos
export const LOAD_TODOS = '[Todos/API] Load Todos';
export const LOAD_TODOS_FAIL = '[Todos/Page] Load Todos Fail';
export const LOAD_TODOS_SUCCESS = '[Todos/Page] Load Todos Success';

export const LoadTodos = createAction(LOAD_TODOS);
export const LoadTodosFail = createAction(
  LOAD_TODOS_FAIL,
  props<{ message: any }>()
);
export const LoadTodosSuccess = createAction(
  LOAD_TODOS_SUCCESS,
  props<{ todos: Todo[] }>()
);

//add todo
export const ADD_TODO = '[Todos/API] Add Todo';
export const ADD_TODO_FAIL = '[Todos/Page] Add Todo Fail';
export const ADD_TODO_SUCCESS = '[Todos/Page] Add Todo Success';

export const AddTodo = createAction(ADD_TODO, props<{ todo: Todo }>());
export const AddTodoFail = createAction(
  ADD_TODO_FAIL,
  props<{ message: any }>()
);
export const AddTodoSuccess = createAction(
  ADD_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

// edit todo
export const EDIT_TODO = '[Todos/API] Edit Todo';
export const EDIT_TODO_FAIL = '[Todos/Page] Edit Todo Fail';
export const EDIT_TODO_SUCCESS = '[Todos/Page] Edit Todo Success';

export const editTodo = createAction(EDIT_TODO, props<{ todo: Todo }>());
export const editTodoSuccess = createAction(
  EDIT_TODO_SUCCESS,
  props<{ todo: Todo }>()
);
export const editTodoFail = createAction(
  EDIT_TODO_FAIL,
  props<{ message: any }>()
);

// delete todo
export const DELETE_TODO = '[Todo/API] Delete Todo';
export const DELETE_TODO_SUCCESS = '[Todo/Page] Delete Todo Success';
export const DELETE_TODO_FAIL = '[Todo/Page] Delete Todo Fail';

export const deleteTodo = createAction(DELETE_TODO, props<{ id: number }>());
export const deleteTodoSuccess = createAction(
  DELETE_TODO_SUCCESS,
  props<{ id: number }>()
);
export const deleteTodoFail = createAction(
  DELETE_TODO_FAIL,
  props<{ message: any }>()
);
