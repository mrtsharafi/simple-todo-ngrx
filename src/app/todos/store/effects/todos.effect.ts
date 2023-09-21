import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from '../../services';
import * as todoActions from '../actions/todos.action';
import { Todo } from '../../models/todo.interface';
import * as fromRoot from '../../../store/index';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.LoadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => ({ type: todoActions.LOAD_TODOS_SUCCESS, todos })),
          catchError((error) =>
            of({ type: todoActions.LOAD_TODOS_FAIL, error })
          )
        )
      )
    )
  );
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.AddTodo),
      map((action) => action.todo),
      switchMap((todo: Todo) => {
        return this.todoService.addTodo(todo).pipe(
          map((todo: Todo) => ({ type: todoActions.ADD_TODO_SUCCESS, todo })),
          catchError((error) => of({ type: todoActions.ADD_TODO_FAIL, error }))
        );
      })
    )
  );
  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTodo),
      map((action) => action.todo),
      switchMap((todo: Todo) => {
        return this.todoService.editTodo(todo).pipe(
          map((todo: Todo) => ({ type: todoActions.EDIT_TODO_SUCCESS, todo })),
          catchError((error) => of({ type: todoActions.EDIT_TODO_FAIL, error }))
        );
      })
    )
  );
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTodo),
      map((action) => action.todo),
      switchMap((todo: Todo) => {
        return this.todoService.deleteTodo(todo.id).pipe(
          tap(console.log),
          map((todo) => ({ type: todoActions.DELETE_TODO_SUCCESS, todo })),
          catchError((error) =>
            of({ type: todoActions.DELETE_TODO_FAIL, error })
          )
        );
      })
    )
  );
  todoSuccessOperations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editTodoSuccess, todoActions.deleteTodoSuccess),
      map(() => fromRoot.Go({ payload: { path: ['/Todos'] } }))
    )
  );
}
