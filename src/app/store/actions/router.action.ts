import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export const Go = createAction(
  GO,
  props<{
    payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    };
  }>()
);

export const Back = createAction(BACK);
export const Forward = createAction(FORWARD);
