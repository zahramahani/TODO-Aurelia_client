import './dash-board-item.scss'
import { bindable } from "aurelia-framework"
import { Todo } from '../../model/todo'
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class DashBoardItem {
  NumberOfTodos;
  flag=false;
  taskCount;
  @bindable deleteBoard;
  @bindable board;
  todos = []
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  attached() {
    this.getNumberOfTodos(this.board.boardId)
<<<<<<< HEAD
    this.getNumberOfTasks(this.board.boardId)
    this.getAllNumberOfTasks(this.board.boardId)
 

=======
    this.getOwnerName(this.board.ownerId)
>>>>>>> sarah_client
  }
  getNumberOfTodos(id) {
    this.httpClient.fetch('todoNumber?boardId=' + id)
      .then(response => response.json())
      .then(data => {
        this.NumberOfTodos = JSON.parse(data);
      });
  }
  getNumberOfTasks(id) {
    this.httpClient.fetch('taskNumber?boardId='+id)
      .then(response => response.json())
      .then(data => {
              if (Number(data) === 0) {
                this.board.done = true;
                this.flag=true;
              }
        });

  }
  getAllNumberOfTasks(id) {
    this.httpClient.fetch('allTaskNumber?boardId='+id)
      .then(response => response.json())
      .then(data => {
              console.log(data + "4");
              this.board.taskCount= Number(data)
        });
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
