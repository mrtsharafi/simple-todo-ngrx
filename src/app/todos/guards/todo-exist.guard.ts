import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.interface';

@Injectable()
export class TodoExistGuard {
  constructor(private store: Store<fromStore.TodosState>) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkTodoStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params['todoId'], 10);
        return this.hasTodo(id);
      }),
      catchError(() => of(false))
    );
  }
  hasTodo(id: number): Observable<boolean> {
    console.log(id);

    return this.store.select(fromStore.getTodoEntities).pipe(
      map((entities: { [key: number]: Todo | undefined }) => {
        console.log(entities);
        debugger;
        if (entities[id]) return true;
        return false;
      }),
      take(1)
    );
  }

  private checkTodoStore(): Observable<boolean> {
    return this.store.select(fromStore.getTodosLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(fromStore.LoadTodos());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
