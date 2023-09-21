import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { Todo } from '../../models/todo.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input('todos') todos$!: Observable<Todo[]>;

  ngOnInit(): void {}
}
