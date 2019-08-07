import './dash-board-item.scss'
import {bindable} from "aurelia-framework"
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class DashBoardItem {
  NumberOfTodos;
  @bindable deleteBoard;
  @bindable board;
  noTask=true;
  delete=false;
  constructor(httpClient) {
    this.httpClient=httpClient;
  }
  getNumberOfTodos(id){
    // console.log(id)
    this.httpClient.fetch('todoNumber?boardId='+id)
      .then (response => response.json())
      .then(data => {
        this.NumberOfTodos=data;
        console.log("board-item"+data);
        console.log(this.NumberOfTodos)
        // this.boards = data.map(element => Object.assign(new BoardModel(), element));
        });
  }
  getNumberOfTasks(id){
    this.httpClient.fetch('taskNumber?todoId='+id)
      .then (response => response.json())
      .then(data => {
        console.log(data);
        // this.boards = data.map(element => Object.assign(new BoardModel(), element));
        });
  }
   attached(){
     console.log("attached")
    this.NumberOfTodos=this.getNumberOfTodos(this.board.boardId)
    console.log(this.NumberOfTodos)
  }
   getTodosNumber(){
  var counter=0;
  counter=this.board.todos.length;
  return counter;
  }
   getTasksNumber(){
    var todo;
    this.counter=0;
    for (todo of this.board.todos) {
     this.counter+=todo.tasks.length;
      
    }
    if(this.counter>0){
      this.noTask=false;
     
    }else{
      this.board.done=true;
      this.delete=true;
    }
    return this.counter;
  }
  //   // if(this.delete){
  //   //   this.board.delete=true;
  //   //   //delete this board :)
  //   return this.board;
  //   // }
  // }
}
