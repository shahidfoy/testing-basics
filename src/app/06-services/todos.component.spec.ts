import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { of } from 'rxjs';
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
            getTodos: () => of(todos)
          } 
        },
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TodoService);
    fixture.detectChanges();
  });

  it('should set todos property with the items returned from the server', () => {
    spyOn(service, 'getTodos').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.todos).toEqual(todos);
  });
});