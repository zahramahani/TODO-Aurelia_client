import './dash-board-item.scss'
import { bindable } from "aurelia-framework"
import { TodoModel } from '../../model/todoModel'
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
@inject(HttpClient, Router)
export class DashBoardItem {
  NumberOfTodos;
  flag=false;
  taskCount;
  @bindable deleteBoard;
  @bindable board;
  todos = []
  constructor(httpClient,router) {
    this.httpClient = httpClient;
    this.router = router;
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
             
        });
  }
  getAllNumberOfTasks(id) {
    this.httpClient.fetch('allTaskNumber?boardId='+id)
      .then(response => response.json())
      .then(data => {
        if (Number(data) === 0) {
          this.board.done = true;
          this.flag=true;
        }
              console.log(data + "d");
              this.board.taskCount= Number(data)
        });
  }
  getOwnerName(id){

    console.log(" in get owner name")
      this.httpClient.fetch('userName?userId='+id)
        .then (response => response.json())
        .then(data => {
          console.log(data)
          this.board.owner=data;

          });
    }
    directTodos(boardId){
      this.router.navigateToRoute('todos', {boardId: boardId});
      }
      dontRemove(){
        document.getElementById("myModal").style.display = "none";
      }
      remove(id) {
        // console.log("remove id");
        //   console.log(romoveid);
          if(confirm('Are you sure you want to delete this board?')){
          document.getElementById("myModal").style.display = "none";
          this.deleteBoard(id);
          }
          
      }
      selectRemove(){
        document.getElementById("myModal").style.display = "block";
      }
  }
