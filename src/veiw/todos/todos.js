import './todos.scss'
import { Todo } from './../../model/todo'
import { Task } from './../../model/task'
export class Todos {
  newTodo = 'todoTitle';
  todos = [];
  constructor () {
    
    this.todo1 = new Todo('todo1')
    this.todo2 = new Todo('todo2')
    this.todo3 = new Todo('todo3')
    this.task1 = new Task('task1')
    this.task2 = new Task('task2')
    this.task3 = new Task('task3')
    this.todo1.addTask(this.task1)
    this.todo2.addTask(this.task2)
    this.todo3.addTask(this.task3)
    this.todos.push(this.todo1)
    this.todos.push(this.todo2)
    this.todos.push(this.todo3)
  
  }

  addTodo () {
    this.tempTodo = new Todo(this.newTodo )
    this.todos.push(this.tempTodo)
  }
}
