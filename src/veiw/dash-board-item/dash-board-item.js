import './dash-board-item.scss'
import { bindable } from "aurelia-framework"
import { Todo } from '../../model/todo'
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
@inject(HttpClient)
export class DashBoardItem {
  NumberOfTodos;
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
    this.updateBoard()

  }
  getNumberOfTodos(id) {
    // console.log(id)
    this.httpClient.fetch('todoNumber?boardId=' + id)
      .then(response => response.json())
      .then(data => {
        this.NumberOfTodos = JSON.parse(data);
      });
  }
  getNumberOfTasks(id) {
    this.httpClient.fetch('todo?boardId='+id)
      .then(response => response.json())
      .then(data => {
        // console.log(data + "dddd");
        // this.todos = data.map(element => Object.assign(new Todo(), element));
        for (let todo of data) {
          console.log("zahra")
          this.httpClient.fetch('taskNumber?todoId='+todo.todoId)
            .then(response => response.json())
            .then(data => {
              console.log(data + "4");
              this.board.taskCount+= Number(data);
            });
        }
      });

  }
  updateBoard() {
    if (this.board.taskCount == 0) {
      this.board.done = true;
    }
  }
}
