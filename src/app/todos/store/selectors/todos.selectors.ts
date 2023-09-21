import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers/index';
import { Todo } from '../../models/todo.interface';

// SELECTORS
export const getTodosLoading = createSelector(
  fromFeature.getTodoState,
  (state) => state.loading
);
export const getTodosLoaded = createSelector(
  fromFeature.getTodoState,
  (state) => state.loaded
);
export const getTodoEntities = createSelector(
  fromFeature.getTodoState,
  (state) => state.entities
);
export const getTodos = createSelector(getTodoEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
});

export const getCompletedTodos = createSelector(getTodos, (entities) =>
  entities.filter((x) => x.done === true)
);
export const getCountOfCompletedTodos = createSelector(
  getTodos,
  (entities) => entities.filter((x) => x.done === true).length
);
export const getIncompletedTodos = createSelector(getTodos, (entities) =>
  entities.filter((x) => x.done === false)
);
export const getCountOfIncompletedTodos = createSelector(
  getTodos,
  (entities) => entities.filter((x) => x.done === false).length
);
export const getSelectedTodo = createSelector(
  getTodoEntities,
  fromRoot.getRouterState,
  (entities, router): Todo => {
    return router.state && entities[router.state.params['todoId']];
  }
);
