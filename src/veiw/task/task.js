import './task.scss'
import {bindable} from 'aurelia-framework';
import { HttpClient,json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class Task {
 
  // @bindable done=null;
  // @bindable img;
 @bindable fetchTasks
 @bindable task;
//  taskkId=null;
   taskk;
 @bindable changeColor
attached(){
  this.changeColor(this.task.todoId);
}
 updateTask(){
  let data={todoId:this.task.todoId,
    userId:this.task.userId,
    done:this.task.done,
    text:this.task.text}
    console.log('one')
  console.log(this.task.taskId)

  this.httpClient.fetch(`task/${this.task.taskId}`, {
    method: 'PUT',
    body:json(data)
    
  }) .then (response => response.json())
  .then(data => {
    console.log('changed')
    this.changeColor(this.task.todoId);
    });
}
dontRemove(){
  document.getElementById("myModal").style.display = "none";
}
remove(id) {
    // document.getElementById("myModal").style.display = "none";
    // // console.log(this.task.taskId)
    // // this.deleteTask();
    // console.log('three')
    // // console.log(this.myTaskId)
    // console.log(this.taskk);
    
      // console.log('in to do')
      // console.log(id)

      if (confirm('Are you sure you want to delete this task?')){
      // if(id){
      this.httpClient.fetch('task/'+id, {
        method: 'DELETE'
      }) .then (response => response.json())
      .then(data => {
        // console.log('changed')
        // this.todo.tasks=null;
        this.fetchTasks();
  
        });
    
      }
}
selectRemove(){
  console.log('two')
  // console.log(this.task.taskId);
  this.taskk=this.task.taskId;
  console.log(this.taskk);
  
  document.getElementById("myModal").style.display = "block";
}
  constructor (httpClient) {
    this.httpClient=httpClient;
    
  
  }
}
