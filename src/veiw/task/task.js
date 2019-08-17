import './task.scss'
import {bindable} from 'aurelia-framework';
import { HttpClient,json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class Task {
 
  // @bindable done=null;
  // @bindable img;
 @bindable task;
 @bindable changeColor

 updateTask(){
  let data={todoId:this.task.todoId,
    userId:this.task.userId,
    done:this.task.done,
    text:this.task.text}
  console.log(this.task.done)

  this.httpClient.fetch(`task/${this.task.taskId}`, {
    method: 'PUT',
    body:json(data)
    
  }) .then (response => response.json())
  .then(data => {
    this.changeColor(this.task.todoId);
    });
}

  constructor (httpClient) {
    this.httpClient=httpClient;
  
  }
}
