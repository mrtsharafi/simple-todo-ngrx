import * as fromReducers from './todos.reducer';
import * as fromActions from '../actions/todos.action';
import { Todo } from '../../models/todo.interface';

describe('Todos Reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducers;
      const action = { type: 'Unknown' };
      const state = fromReducers.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
  describe('LOAD_TODOS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducers;
      const action = fromActions.LoadTodos();
      const state = fromReducers.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });
  describe('LOAD_TODOS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const todos: Array<Todo> = [
        { id: 1, title: 'Todo #1', done: false, important: false },
        { id: 2, title: 'Todo #2', done: false, important: false },
      ];
      const entities = {
        1: todos[0],
        2: todos[1],
      };
      const { initialState } = fromReducers;
      const action = fromActions.LoadTodosSuccess({ todos });
      const state = fromReducers.reducer(initialState, action);

      expect(state).not.toBe(initialState);
      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.entities).toEqual(entities);
    });
  });
});
