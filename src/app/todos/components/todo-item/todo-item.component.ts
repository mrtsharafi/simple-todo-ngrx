import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  _todo!: Todo;

  @Input()
  set todo(todo: Todo) {
    this._todo = todo;
    this.form.controls.title.setValue(this._todo.title);
  }
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();

  form = new FormGroup({
    title: new FormControl(''),
  });

  editing: boolean = false;
  @ViewChild('textInput', { static: true }) textInput!: ElementRef;
  @ViewChild('titleLable', { static: true }) titleLable!: ElementRef;

  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {}
  onEdit() {
    this.update.emit({ ...this._todo });
  }
  onDelete() {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      console.log('delete:::' + this._todo.id);

      this.delete.emit(this._todo.id);
    }
  }
  activeEditMode() {
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }
  updateText() {
    if (this.form.controls.title.valid && this.editing) {
      this._todo = { ...this._todo, title: this.form.controls.title.value! };
      this.editing = false;
    }
  }
}
