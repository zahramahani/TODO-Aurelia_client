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
  attached() {
    this.httpClient.fetch('board')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        console.log(this.boards)

        this.board = this.boards[0];
        this.getBoardsTodos(this.board.boardId);
        console.log(this.board);
      });

  }

  addTodo(board) {
    console.log('hal yaram bia' + board.boardId)
    let data = {
      boardId: board.boardId,
      complete: true,
      title: this.name
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


    // this.board =new BoardModel('board one','zahraAmirmahani')
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    console.log(this.controller);
    // this.todo1 = new Todo('todo1')
    // this.todo2 = new Todo('todo2')
    // this.todo3 = new Todo('todo3')
    // this.task1 = new Task('task1')
    // this.task2 = new Task('task2')
    // this.task3 = new Task('task3')
    // this.todo1.addTask(this.task1)
    // this.todo2.addTask(this.task2)
    // this.todo3.addTask(this.task3)
    // this.todos.push(this.todo1)
    // this.todos.push(this.todo2)
    // this.todos.push(this.todo3)
    // this.board.addTodo(this.todo1)
    // this.board.addTodo(this.todo2)
    // this.board.addTodo(this.todo3)
    // this.boards.push(this.board)

    // this.board1 =new BoardModel('board Two','zahraAmirmahani')
    // this.board1.addTodo(this.todo1)
    // this.board1.addTodo(this.todo2)
    // this.boards.push(this.board1)


  }

  // addTodo () {
  //   this.flag = false;
  //   console.log(this.name);
  //   this.tempTodo = new Todo(this.name)

  //   // this.todos.push(this.tempTodo)
  //   this.board.addTodo(this.tempTodo)
  //   this.name = '';
  //   //test 
  //   // document.getElementById("myForm").style.display = "none";
  //   // test

  // }

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
  // test
  // y(){
  //   console.log(this.model)
  // }

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