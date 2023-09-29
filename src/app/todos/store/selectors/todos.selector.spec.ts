import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromActions from '../actions/todos.action';
import * as fromReducers from '../reducers/todos.reducer';
import * as fromSelectors from './todos.selectors';
import { Todo } from '../../models/todo.interface';
import { take, tap } from 'rxjs';

import * as fromFeature from '../reducers/index';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

describe('Todos Selectors', () => {
  let store: Store<fromReducers.TodoState>;
  let todos: Array<Todo> = [
    { id: 1, title: 'Todo #1', done: false, important: false },
    { id: 2, title: 'Todo #2', done: false, important: false },
  ];
  const entities = {
    1: todos[0],
    2: todos[1],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreRouterConnectingModule.forRoot({
          serializer: fromRoot.CustomSerializer,
        }),

        StoreModule.forRoot({
          ...fromRoot.reducers,
          todos: combineReducers(fromReducers.reducer),
        }),
      ],
    });
    store = TestBed.inject(Store<fromReducers.TodoState>);

    spyOn(store, 'dispatch').and.callThrough();
  });
  it('should return todos as entities', () => {
    expect(
      fromSelectors.getTodoEntities.projector(fromReducers.initialState)
    ).toEqual({});
    store.subscribe((x) => {
      debugger;
      console.log(x);
    });
    store.dispatch(fromActions.LoadTodosSuccess({ todos }));
  });
});
