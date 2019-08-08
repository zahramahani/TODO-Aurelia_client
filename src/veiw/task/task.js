import './task.scss'
import {bindable} from 'aurelia-framework';
import { HttpClient,json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class Task {
 
  // @bindable done=null;
  // @bindable img;
 @bindable task;
 

 updateTask(){
  console.log(this.task.done)
  let data={
    todoId:this.task.todoId,
    userId:this.task.userId,
    done:this.task.done,
    text:this.task.text,
  }
  
  this.httpClient.fetch(`task/${this.task.taskId}`, {
    method: 'POST',
    body:json(this.data)
  });
}





  constructor (httpClient) {
    this.httpClient=httpClient;
  
  }
}
