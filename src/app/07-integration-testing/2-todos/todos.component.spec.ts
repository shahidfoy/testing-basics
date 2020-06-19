import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { of, empty, throwError } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let service: TodoService;
  let todos = [1,2,3];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [
        { 
          provide: TodoService, 
          useValue: {
            getTodos: () => of(todos),
            add: () => empty(),
            delete: () => empty(),
          } 
        },
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TodoService);
  });

  it('should load todos from the server', () => {
    spyOn(service, 'getTodos').and.returnValue(of(todos));
    fixture.detectChanges();
    
    expect(component.todos.length).toBe(3);
  });
});