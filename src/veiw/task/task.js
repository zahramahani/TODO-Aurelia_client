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
  
  this.httpClient.fetch(`task/${this.task.taskId}`, {
    method: 'POST',
    body:json(this.task)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // this.todo.tasks = data.map(element => Object.assign(new Task(), element)); 
  });
}





  constructor (httpClient) {
    this.httpClient=httpClient;
  
  }
}
