import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Todo } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(
    private httpClient: HttpClient
  ) //@Inject('API_URL') private apiUrl: string,
  {}

  baseApiUrl: string = 'http://localhost:3000/todos';

  addTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}`, todo);
  }

  editTodo(todo: Todo): Observable<any> {
    return this.httpClient.put(`${this.baseApiUrl}/${todo.id}`, todo);
  }

  getTodos() {
    return this.httpClient.get(`${this.baseApiUrl}`);
  }
  getDoneTodos() {
    return this.httpClient.get<Todo[]>(`${this.baseApiUrl}`).pipe<Todo[]>(
      map((todos) => {
        return todos.filter((t) => t.done === true);
      })
    );
  }
  getUndoneTodos() {
    return this.httpClient.get<Todo[]>(`${this.baseApiUrl}`).pipe<Todo[]>(
      map((todos) => {
        return todos.filter((t) => t.done === false);
      })
    );
  }
  getImportantTodos() {
    return this.httpClient.get<Todo[]>(`${this.baseApiUrl}`).pipe<Todo[]>(
      map((todos) => {
        return todos.filter((t) => t.important === true);
      })
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    console.log('service::::' + id);

    return this.httpClient
      .delete<Todo>(`${this.baseApiUrl}/${id}`)
      .pipe(map((response: any) => response.todo));
  }
}
