import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Todo } from '../../models/todo.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() submitted = new EventEmitter<Todo>();
  form!: FormGroup;

  constructor(private store: Store<fromStore.TodosState>) {}
  ngOnInit(): void {}
  onEdit() {
    const title = 'Edited title';
    this.store.dispatch(fromStore.editTodo({ todo: { ...this.todo, title } }));
  }
  onDelete() {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      this.store.dispatch(fromStore.deleteTodo({ todo: this.todo }));
    }
  }
}
