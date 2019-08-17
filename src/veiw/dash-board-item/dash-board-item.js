import './dash-board-item.scss'
import {bindable} from "aurelia-framework"
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class DashBoardItem {
  NumberOfTodos;
  @bindable deleteBoard;
  @bindable board;
  todos=[]
  noTask=true;
  delete=false;
  constructor(httpClient) {
    this.httpClient=httpClient;
  }
  attached(){
    this.getNumberOfTodos(this.board.boardId)
    this.getOwnerName(this.board.ownerId)
  }
  getNumberOfTodos(id){
    // console.log(id)
    this.httpClient.fetch('todoNumber?boardId='+id)
      .then (response => response.json())
      .then(data => {
       
        this.NumberOfTodos=JSON.parse(data);
        // console.log("board-item"+this.NumberOfTodos);
        // this.NumberOfTodos=data.map(element => In.assign(new BoardModel(), element));
        

        
        });
  }
  getNumberOfTasks(){
    this.httpClient.fetch('todo')
      .then (response => response.json())
      .then(data => {
        console.log(data);
        todos=data.map(element => In.assign(new Todo(), element));
        });
        for(todo of todos){
          this.httpClient.fetch('taskNumber?todoId='+todo.todoId)
      .then (response => response.json())
      .then(data => {
        console.log(data);
        this.taskCount+=data
        });
        }
  }
   attached(){
     console.log("attached")
    this.NumberOfTodos=this.getNumberOfTodos(this.board.boardId)
    // console.log(this.NumberOfTodos)
  }
  //  getTodosNumber(){
  // var counter=0;
  // counter=this.board.todos.length;
  // return counter;
  // }
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

  getOwnerName(id){
      this.httpClient.fetch('getUserName?userId='+id)
        .then (response => response.json())
        .then(data => {
  
          this.board.owner=JSON.parse(data);
          // console.log("board-item"+this.NumberOfTodos);
          // this.NumberOfTodos=data.map(element => In.assign(new BoardModel(), element));
          });
    }
  }
