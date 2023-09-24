import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { Todo } from '../../models/todo.interface';
import * as fromStore from '../../store';
import { TodoListComponent, TodoAddComponent } from '../../components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-home',
  standalone: true,
  imports: [CommonModule, TodoAddComponent, TodoListComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.scss'],
})
export class TodoHomeComponent implements OnInit {
  incompletedTodos$!: Observable<(Todo | undefined)[]>;
  completedTodos$!: Observable<(Todo | undefined)[]>;
  countOfCompletedTodos$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    //this.store.dispatch(fromStore.LoadTodos());
    this.incompletedTodos$ = this.store.select(fromStore.getIncompletedTodos);
    this.completedTodos$ = this.store.select(fromStore.getCompletedTodos);
    this.countOfCompletedTodos$ = this.store.select(
      fromStore.getCountOfCompletedTodos
    );
  }

  onDelete(id: number) {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      this.store.dispatch(fromStore.deleteTodo({ id }));
      this.store.dispatch(fromStore.LoadTodos());
    }
  }
  onDone(todo: Todo) {
    this.store.dispatch(
      fromStore.editTodo({ todo: { ...todo, done: !todo.done } })
    );
    this.store.dispatch(fromStore.LoadTodos());
  }
  onImportant(todo: Todo) {
    this.store.dispatch(
      fromStore.editTodo({ todo: { ...todo, important: !todo.important } })
    );
    this.store.dispatch(fromStore.LoadTodos());
  }
  onAdd(title: string) {
    this.store.dispatch(
      fromStore.AddTodo({
        todo: {
          id: 0,
          title: title,
          done: false,
          important: false,
        },
      })
    );
  }
}
