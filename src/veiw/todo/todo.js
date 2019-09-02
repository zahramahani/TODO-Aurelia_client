import './todo.scss'
import { bindable } from "aurelia-framework"
import { Task } from '../../model/task';
import { TodoModel } from '../../model/todoModel';

// validation_part
// import {inject} from 'aurelia-dependency-injection';
import { validationMessages } from 'aurelia-validation';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from './../../bootstrap-form-renderer';
// validation_part
//http_part
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
//http_part

@inject(ValidationControllerFactory, HttpClient)
export class Todo {
  @bindable todo
  @bindable deleteTodo
  editFlag = false
  newTodoName='';
  isDone
  text = '';
  // validation part
  controller = null;
  delete;
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
  changeColor(id) {
    this.httpClient.fetch('doneTasks?todoId=' + id)
      .then(response => response.json())
      .then(data => {
        console.log('tasks' + data);
        if (Number(data) === 0) {
          this.isDone = true;
        } else { this.isDone = false; }

      });
  };
  
  attached() {
    this.fetchTasks();
  }
  dontRemove(){
    document.getElementById("mytodoModal").style.display = "none";
  }
  remove(removeTodoid) {
      document.getElementById("mytodoModal").style.display = "none";
      this.deleteTodo(removeTodoid);
      
  }
  selectRemove(id){
    if (confirm('Are you sure you want to delete this todo?')){
      this.deleteTodo(id);
    }
    // document.getElementById("mytodoModal").style.display = "block";
  }
  edit(){
    this.editFlag = true
  }

  editRequest(id){
    // this.editFlag = false
    let data={
      boardId:this.todo.boardId,
      complete:true,
      title:this.newTodoName}
      // console.log('one')
    // console.log(this.task.taskId)
    this.httpClient.fetch(`todo/${this.todo.todoId}`, {
      method: 'PUT',
      body:json(data)
    }) .then (response => response.json())
    .then(data => {
      // console.log('changed')
      this.httpClient.fetch(`todo/${this.todo.todoId}`)
      .then (response => response.json())
      .then(data => {
        console.log('kharrrrrrr')
        console.log(data)
        this.todo= data.map(element => Object.assign(new TodoModel(), element));
        console.log(this.todo)
       
        });
      });
      this.editFlag = false

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
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
     this.fetchTasks();
    });
    this.text=null;
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