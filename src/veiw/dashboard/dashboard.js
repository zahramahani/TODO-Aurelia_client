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
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
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
    let mydata = {
      "ownerId": 0,
      "done": this.selected_board.done,
      "name": this.selected_board.name
    }
    this.httpClient.fetch('board/' + id, {
      method: 'PUT',
      body: json(mydata)

    });
    // delete from middle table
    this.httpClient.fetch('board/' + id, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
        console.log('changed')
        // this.boards=null;
        this.getBoards();

      });
  }
}
