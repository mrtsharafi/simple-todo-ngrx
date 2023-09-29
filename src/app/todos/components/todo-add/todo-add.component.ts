import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'todo-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  @Output() add = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  formAddTodo = this.fb.group({
    title: ['', [Validators.required]],
  });

  onAdd() {
    this.add.emit(this.formAddTodo.controls.title.value!);
    this.formAddTodo.controls.title.reset();
  }
}
