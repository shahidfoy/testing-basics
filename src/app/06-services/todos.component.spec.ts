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
    fixture.detectChanges();
  });

  it('should set todos property with the items returned from the server', () => {
    spyOn(service, 'getTodos').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.todos).toEqual(todos);
  });

  it('should call the server to save the changes when a new todo is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return empty();
    });
    component.add();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };
    spyOn(service, 'add').and.returnValue(of(todo))
    component.add();
    fixture.detectChanges();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error message', () => {
    let error = 'error from the server'
    spyOn(service, 'add').and.returnValue(throwError(error));
    component.add();
    fixture.detectChanges();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete the todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});