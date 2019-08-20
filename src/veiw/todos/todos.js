import './todos.scss'
import { BoardModel } from '../../model/boardModel'
import { Todo } from './../../model/todo'
import { Task } from './../../model/task'
// validation_part
// import {inject} from 'aurelia-dependency-injection';
import { validationMessages } from 'aurelia-validation';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from './../../bootstrap-form-renderer';
// validation_part
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';




@inject(ValidationControllerFactory, HttpClient)

export class Todos {
  newTodo = '';//testchange 'todoTitle' to ''
  board;
  boards = []
  todos = [];
  name = '';
  currentBoardId;
  activate(a,b,c){
    console.log("board id passed");
    
    console.log(a.boardId);
    this.currentBoardId=+a.boardId;
  }
  attached() {
    this.httpClient.fetch('board')
      .then(response => response.json())
      .then(data => {
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        if (this.currentBoardId){
       
          this.selectedBoard = this.boards.find((item) => item.boardId === this.currentBoardId);
          console.log(this.selectedBoard)
          this.selectBoard(this.selectedBoard);
          
        }else{
          this.board = this.boards[0];
          this.getBoardsTodos(this.board.boardId);

        }
        
      });

  }

  addTodo(board) {
    console.log('hal yaram bia' + board.boardId)
    let data = {
      boardId:board.boardId,
      complete: true,
      title: this.name,
      // addFlag : false
    }

    this.httpClient.fetch(`todo`, {
      method: 'POST',
      body: json(data)
    }).then(response => response.json())
      .then(data => {
        this.name = '';
        this.httpClient.fetch('todo?boardId=' + this.board.boardId)
          .then(response => response.json())
          .then(data => {
            console.log('todos' + data);
            this.board.todos = data.map(element => Object.assign(new Todo(), element));
          });
      });

  }

  getBoardsTodos(id) {
    this.httpClient.fetch('todo?boardId=' + id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.board.todos = data.map(element => Object.assign(new Todo(), element));
      });
  }


  constructor(controllerFactory, httpClient) {
    this.httpClient = httpClient;
    this.flag = false;
    // this.addFlag = true;


    // this.board =new BoardModel('board one','zahraAmirmahani')
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  deleteTodo(id){
    
    this.httpClient.fetch('todo/'+id, {
      method: 'DELETE'
    }) .then (response => response.json())
    .then(data => {
      console.log('changed')
      this.board.todos=null;
      this.getBoardsTodos(this.board.boardId)

      });
  }
 
  addBoard() {
    this.tempBoard = new BoardModel(this.boardName, this.firstName + " " + this.lastName)
    this.boards.push(this.tempBoard);
  }
  selectBoard(board) {
    this.board = this.selectedBoard;
    this.getBoardsTodos(this.board.boardId);
  }
  // test
  openForm() {
    this.flag = true;
  }
  submit() {
    this.controller.validate().then(result => {
      if (result.valid) {
        this.flag=false;
        console.log(this.board)
        console.log('lksn' + this.board.boardId);
        this.addTodo(this.board);
        // this.title = 'add new task';
        console.log(result);
      } else {
        console.log(result);
      }
    })
    // .catch((e)=>{
    //   console.log(e.stack);
    // });
  }
}

ValidationRules
  .ensure(a => a.name).required()
  .on(Todos);