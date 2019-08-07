import './todo.scss'
import {bindable} from "aurelia-framework"
import { Task } from '../../model/task';

// validation_part
// import {inject} from 'aurelia-dependency-injection';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
// validation_part
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';


@inject(ValidationControllerFactory,HttpClient)
export class Todo {
  @bindable todo
  // @bindable title;
  // @bindable done=null;
  // @bindable tasks = [];
  title = '';
  // validation part
  controller = null;
  // validation part
  attached(){
      this.httpClient.fetch('task?todoId='+this.todo.todoId)
          .then(response => response.json())
          .then(data => {
            console.log('tasks'+data);
            this.todo.tasks = data.map(element => Object.assign(new Task(), element)); 
          });
  }


  constructor (controllerFactory,httpClient) {
    // validationMessages.customMessage1 = '\${$displayName} should be more than 3 characteres';
    this.httpClient=httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    console.log(this.controller);
    // this.title= title;
  }
  addTask(){
    this.tempTask= new Task(this.title);
    this.todo.addTask(this.tempTask);
    // this..tasks.push(this.tempTask);
  }
  setDone(done){
    this.todo.done = done;
}
submit(){
  this.controller.validate().then(result=>{
    if (result.valid) {
      console.log('valid');
      this.addTask();
      // this.title = 'add new task';
      console.log(result);
    } else {
      console.log(result);
    }
  })
  // .catch((e)=>{
  //   console.log(e.stack);
  // });
}
}

ValidationRules
  .ensure(a => a.title).required()
  .on(Todo);