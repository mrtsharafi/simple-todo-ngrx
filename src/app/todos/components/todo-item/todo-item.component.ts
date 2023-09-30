import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Todo } from '../../models/todo.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  _todo!: Todo;
  edited: boolean = false;

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
  modalRef?: BsModalRef;
  constructor(
    private renderer: Renderer2,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {}
  onEdit() {
    this.update.emit({ ...this._todo });
  }

  activeEditMode() {
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }
  updateText() {
    if (this.form.controls.title.valid && this.editing) {
      if (this.form.controls.title.value! !== this._todo.title) {
        this.edited = true;
      }
      this._todo = { ...this._todo, title: this.form.controls.title.value! };
      this.editing = false;
    }
  }
  openModal(template: TemplateRef<any>, e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.modalRef?.hide();
    this.delete.emit(this._todo.id);
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
