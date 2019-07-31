import './todo.scss'
import {bindable} from "aurelia-framework"
import { Task } from '../../model/task';


export class Todo {
  @bindable todo
  @bindable title;
  // @bindable done=null;
  // @bindable tasks = [];
  newTask = '';
  constructor (title) {
    this.title= title;
  }
  addTask(){
    this.tempTask= new Task(this.newTask);
    this.todo.addTask(this.tempTask);
    // this..tasks.push(this.tempTask);
  }
  setDone(done){
    this.todo.done = done;
}
}
