import './dashboard.scss'
import { BoardModel } from '../../model/boardModel'
import { TodoModel } from '../../model/todoModel'
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
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        console.log('boards');
        console.log(this.boards);
      });
  }
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.boards = []
  }

  setBoards(boards) {
    this.boards = boards
  }
  deleteBoard(id) {
    console.log('love you much');
    console.log(this.boards);

    this.selected_board = this.boards.find((item) => item.boardId === id);
    console.log(this.selected_board);

    this.httpClient.fetch('owner/' + id, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
        this.httpClient.fetch('board/' + id, {
          method: 'DELETE'
        }).then(response => response.json())
          .then(data => {
            console.log('changed')
            // this.boards=null;
            this.getBoards();
    
          });

      });
  }
}
