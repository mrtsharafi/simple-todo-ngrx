import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHomeComponent } from './todo-home.component';

describe('TodoHomeComponent', () => {
  let component: TodoHomeComponent;
  let fixture: ComponentFixture<TodoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoHomeComponent]
    });
    fixture = TestBed.createComponent(TodoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
