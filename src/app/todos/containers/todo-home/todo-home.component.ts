import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';

import { Todo } from '../../models/todo.interface';
import * as fromStore from '../../store';
import { TodoListComponent, TodoAddComponent } from '../../components';

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
  selectedId!: number;
  modalRef?: BsModalRef;

  constructor(private store: Store, private modalService: BsModalService) {}
  showCompleted: boolean = false;

  toggelShow() {
    this.showCompleted = !this.showCompleted;
    localStorage.setItem('showCompleted', JSON.stringify(this.showCompleted));
  }
  ngOnInit() {
    if (localStorage.getItem('showCompleted')) {
      this.showCompleted = JSON.parse(
        localStorage.getItem('showCompleted')!
      ) as boolean;
    } else {
      localStorage.setItem('showCompleted', JSON.stringify(this.showCompleted));
    }
    this.incompletedTodos$ = this.store.select(fromStore.getIncompletedTodos);
    this.completedTodos$ = this.store.select(fromStore.getCompletedTodos);
    this.store
      .select(fromStore.getTodoEntities)
      .subscribe((val) => console.log(val));
    this.countOfCompletedTodos$ = this.store.select(
      fromStore.getCountOfCompletedTodos
    );
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.selectedId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirmDelete(id: number) {
    this.store.dispatch(fromStore.deleteTodo({ id }));
    this.store.dispatch(fromStore.LoadTodos());
    this.modalRef?.hide();
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

  decline(): void {
    this.modalRef?.hide();
  }
}
