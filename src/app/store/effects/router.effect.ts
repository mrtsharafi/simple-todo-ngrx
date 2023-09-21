import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.Go),
        map((action) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      );
    },
    { dispatch: false }
  );

  navigateBack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouterActions.Back),
      tap(() => this.location.back())
    );
  });
  navigateForward$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouterActions.Forward),
      tap(() => this.location.forward())
    );
  });
}
