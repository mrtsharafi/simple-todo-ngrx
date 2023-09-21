import { Component, OnInit } from '@angular/core';
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
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.scss'],
})
export class TodoHomeComponent implements OnInit {
  incompletedTodos$!: Observable<Todo[]>;
  completedTodos$!: Observable<Todo[]>;
  countOfCompletedTodos$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(fromStore.LoadTodos());
    this.incompletedTodos$ = this.store.pipe(
      select(fromStore.getIncompletedTodos)
    );
    this.completedTodos$ = this.store.pipe(select(fromStore.getCompletedTodos));
    this.countOfCompletedTodos$ = this.store.pipe(
      select(fromStore.getCountOfCompletedTodos)
    );
  }
}
