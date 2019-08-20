import './dashboard.scss'
import { BoardModel } from '../../model/boardModel'
import { Todo } from '../../model/todo'
import { User } from '../../model/user'
import { Task } from './../../model/task'
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';


@inject(HttpClient)
export class Dashboard {
  boards = [];
  attached() {
    this.getBoards();
  }
  getBoards() {
  
    this.httpClient.fetch('board')
      .then (response => response.json())
      .then(data => {
        console.log(data);
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        });
      }
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.boards = []
  }

  setBoards (boards) {
    this.boards = boards
  }
  deleteBoard(id){
      this.httpClient.fetch('board/'+id, {
        method: 'DELETE'
      }) .then (response => response.json())
      .then(data => {
        console.log('changed')
        this.boards=null;
        this.getBoards();
  
        });
    }
}
