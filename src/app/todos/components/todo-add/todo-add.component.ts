import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'todo-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  formAddTodo = new FormGroup({
    title: new FormControl(''),
  });

  onAdd() {
    this.store.dispatch(
      fromStore.AddTodo({
        todo: {
          id: 0,
          title: this.formAddTodo.controls.title.value!,
          done: false,
          important: false,
        },
      })
    );
    this.formAddTodo.controls.title.reset();
  }
}
