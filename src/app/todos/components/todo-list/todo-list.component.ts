import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { Todo } from '../../models/todo.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('todos') todos$!: Observable<(Todo | undefined)[]>;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() done: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() important: EventEmitter<Todo> = new EventEmitter<Todo>();

  ngOnInit(): void {}

  onDelete(id: number) {
    this.delete.emit(id);
  }
  onDone(todo: Todo) {
    this.done.emit(todo);
  }
  onImportant(todo: Todo) {
    this.important.emit(todo);
  }
}
