import { TodosGuard } from './todos.guard';
import { TodoExistGuard } from './todo-exist.guard';

export const guards: any[] = [TodosGuard];

export * from './todos.guard';
export * from './todo-exist.guard';
