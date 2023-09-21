import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.interface';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { TodoItemComponent } from '../../components';

@Component({
  selector: 'todo-detail',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo$!: Observable<Todo>;

  constructor(private store: Store<fromStore.TodosState>) {}
  ngOnInit(): void {
    this.todo$ = this.store.select(fromStore.getSelectedTodo);
  }
  onEdit(todo: Todo) {
    this.store.dispatch(fromStore.editTodo({ todo }));
  }
  onDelete(id: number) {
    this.store.dispatch(fromStore.deleteTodo({ id }));
  }
}
