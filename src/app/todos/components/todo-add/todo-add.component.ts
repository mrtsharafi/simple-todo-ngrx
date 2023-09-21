import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'todo-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  @Output() add = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  formAddTodo = new FormGroup({
    title: new FormControl(''),
  });

  onAdd() {
    this.add.emit(this.formAddTodo.controls.title.value!);
    this.formAddTodo.controls.title.reset();
  }
}
