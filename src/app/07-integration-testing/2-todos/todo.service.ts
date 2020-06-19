import { Injectable } from '@angular/core'; 
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService { 
  constructor(private http: HttpClient) { 
  }

  add(todo): Observable<any> {
    return this.http.post('...', todo); //.map(r => r.json());
  }

  getTodos(): Observable<any> { 
    return this.http.get('...'); //.map(r => r.json());
  }

  getTodosPromise(): Observable<any> {
    return this.http.get('...'); //.map(r => r.json()).toPromise();
  }

  delete(id): Observable<any> {
    return this.http.delete('...'); //.map(r => r.json());
  }
}