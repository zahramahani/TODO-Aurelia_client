import './todo.scss'
import {bindable} from "aurelia-framework"
import { Task } from '../../model/task';

// validation_part
import {inject} from 'aurelia-dependency-injection';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
// validation_part

@inject(ValidationControllerFactory)
export class Todo {
  @bindable todo
  // @bindable title;
  // @bindable done=null;
  // @bindable tasks = [];
  title = '';
  // validation part
  controller = null;
  // validation part

  constructor (controllerFactory) {
    // validationMessages.customMessage1 = '\${$displayName} should be more than 3 characteres';
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