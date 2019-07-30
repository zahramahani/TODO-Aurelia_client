import './todo.scss'
import {bindable} from "aurelia-framework"
import { Task } from '../../model/task';


export class Todo {
  @bindable title;
  @bindable done=null;
  @bindable tasks = [];
  newTask = 'task';
  constructor (title) {
    this.title= title;
  }
  AddTask(){
    this.tempTask= new Task(this.newTask);
    this.tasks.push(this.tempTask);
  }
  setDone(done){
    this.done = done;
}
}
