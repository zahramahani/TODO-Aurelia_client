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
    this.getNumberOfTasks(this.board.boardId)
    this.getAllNumberOfTasks(this.board.boardId)
    this.getOwnerName(this.board.ownerId)

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
              console.log(data + "d");
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
    console.log(" in get owner name")
      this.httpClient.fetch('userName?userId='+id)
        .then (response => response.json())
        .then(data => {
          console.log(data)
          this.board.owner=data;
          });
    }
  }
