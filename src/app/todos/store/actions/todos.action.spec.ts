import * as fromTodos from './todos.action';
import { Todo } from '../../models/todo.interface';

describe('Todos Actions', () => {
  describe('LoadTodos Actions', () => {
    describe('LoadTodos', () => {
      it('should create an action', () => {
        const action = fromTodos.LoadTodos();
        expect(action).toEqual({
          type: fromTodos.LOAD_TODOS,
        });
      });
    });
    describe('LoadTodosFail', () => {
      it('should create an action', () => {
        const props = { message: 'Load Error' };
        const action = fromTodos.LoadTodosFail(props);
        expect(action).toEqual({
          type: fromTodos.LOAD_TODOS_FAIL,
          ...props,
        });
      });
    });
    describe('LoadTodosSuccess', () => {
      it('should create an action', () => {
        const props = {
          todos: [
            {
              id: 1,
              title: 'Read a book',
              done: false,
              important: true,
            },
            {
              id: 2,
              title: 'Go swimming',
              done: true,
              important: true,
            },
            {
              id: 3,
              title: 'Make a tee',
              done: false,
              important: false,
            },
          ],
        };
        const action = fromTodos.LoadTodosSuccess(props);
        expect(action).toEqual({
          type: fromTodos.LOAD_TODOS_SUCCESS,
          ...props,
        });
      });
    });
  });
});
