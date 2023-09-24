import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class TodosGuard {
  constructor(private store: Store<fromStore.TodosState>) {}
  canActivate(): Observable<boolean> {
    return this.checkTodoStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
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
