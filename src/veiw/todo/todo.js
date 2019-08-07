import './todo.scss'
import { bindable } from "aurelia-framework"
import { Task } from '../../model/task';

// validation_part
// import {inject} from 'aurelia-dependency-injection';
import { validationMessages } from 'aurelia-validation';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from './../../bootstrap-form-renderer';
// validation_part
//http_part
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
//http_part

@inject(ValidationControllerFactory, HttpClient)
export class Todo {
  @bindable todo
  text = '';
  // validation part
  controller = null;
  
  //http_part
  //we use fetchTask() twice so we put it in function
  fetchTasks() {
    this.httpClient.fetch('task?todoId=' + this.todo.todoId)
      .then(response => response.json())
      .then(data => {
        console.log('tasks' + data);
        this.todo.tasks = data.map(element => Object.assign(new Task(), element));
      });
  }

  //change color of todo when all taska mark as done
  changeColor() { };

  //update todo as complete
  updateTodo() {
    done = true;
    for (task of this.todo.tasks) {
      if (!task.done) {
        done = false;
        break;
      }
    }
    if (done) {
      complete = true;
      changeColor();
      let data = {
        boardId: this.todo.boardId,
        complete: true,
        title: this.todo.title
      }

      this.httpClient.fetch(`todo/${this.todo.todoId}`, {
        method: 'POST',
        body: json(data)
      })
      this.name = '';
      this.httpClient.fetch('todo?boardId=' + this.board.boardId)
        .then(response => response.json())
        .then(data => {
          console.log('todos' + data);
          this.board.todos = data.map(element => Object.assign(new Todo(), element));
        });
    }
  }
  attached() {
    fetchTasks();
  }


  constructor(controllerFactory, httpClient) {
    // http_part
    this.httpClient = httpClient;
    //validation_part
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    console.log(this.controller);
  }

  // http_part post task
  addTask() {
    let data = {
      todoId: this.todo.todoId,
      userId: 1,
      done: false,
      text: this.text
    }

    this.httpClient.fetch(`task`, {
      method: 'POST',
      body: json(data)
    })
    fetchTasks();
  }
  setDone(done) {
    this.todo.done = done;
  }

  //validation_part
  submit() {
    this.controller.validate().then(result => {
      if (result.valid) {
        console.log('valid');
        this.addTask();

        console.log(result);
      } else {
        console.log(result);
      }
    })
  }
}

ValidationRules
  .ensure(a => a.text).required()
  .on(Todo);