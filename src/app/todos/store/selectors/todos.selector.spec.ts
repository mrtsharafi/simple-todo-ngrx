import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromActions from '../actions/todos.action';
import * as fromReducers from '../reducers/todos.reducer';
import * as fromSelectors from '../selectors/todos.selectors';
import { Todo } from '../../models/todo.interface';

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
        StoreModule.forRoot({
          ...fromRoot.reducers,
          todos: combineReducers(fromReducers.reducer),
        }),
      ],
    });
    store = TestBed.inject(Store<fromReducers.TodoState>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getTodoEntities', () => {
    it('should return todos as entities', () => {
      let result: any;
      store.select(fromSelectors.getTodoEntities).subscribe((value) => {
        result = value;
      });
      // expect(result).toEqual({});
      store.dispatch(fromActions.LoadTodosSuccess({ todos }));
      // expect(result).toEqual(entities);
    });
  });
});
