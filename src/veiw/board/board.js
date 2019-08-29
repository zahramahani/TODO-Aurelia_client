import './board.scss'
import { BoardModel } from '../../model/boardModel'
import { Todo } from './../../model/todo'
import { Task } from './../../model/task'
import { timeout } from 'q';
// validation_part
import {inject} from 'aurelia-dependency-injection';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(ValidationControllerFactory ,HttpClient)
// validation_part

export class Board {
  boards = [];
  boardName='';
  firstName='';
  lastName='';

  constructor (controllerFactory ,httpClient) {
    this.httpClient=httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    // this.board =new BoardModel('board one','zahraAmirmahani')
    // this.todo1 = new Todo('todo1')
    // this.todo2 = new Todo('todo2')
    // this.todo3 = new Todo('todo3')
    // this.task1 = new Task('task1')
    // this.task2 = new Task('task2')
    // this.task3 = new Task('task3')
    // this.todo1.addTask(this.task1)
    // this.todo2.addTask(this.task2)
    // this.todo3.addTask(this.task3)
    // // this.todos.push(this.todo1)
    // // this.todos.push(this.todo2)
    // // this.todos.push(this.todo3)
    // this.board.addTodo(this.todo1)
    // this.board.addTodo(this.todo2)
    // this.board.addTodo(this.todo3)
    // this.boards.push(this.board)

    
  }
  addBoard(){
    this.tempBoard=new BoardModel(this.boardName,"I will come from token")
    this.boards.push(this.tempBoard);
    document.getElementById("myForm").style.display = "none";
    document.getElementById("button").style.display = "flex";

    let data = {name:this.tempBoard.name,done:false,ownerId:0 }

    

      this.httpClient.fetch(`board`, {
      method: 'POST',
      body: JSON.stringify(data)
      })
      .then (response => response.json())
      .then(data => {
        this.getBoards();
        });
   
  }
   openForm() {
     console.log("open")
    document.getElementById("myForm").style.display = "flex";
    document.getElementById("button").style.display = "none";
  }
  
  submit(){
    this.controller.validate().then(result=>{
      if (result.valid) {
        console.log('valid');
        this.addBoard();
        // this.title = 'add new task';
        console.log(result);
      } else {
        console.log(result);
      }
    })
    
  }
  attached() {
    //this.loadPage();
    this.getBoards();
    
  }
  getBoards() {
    
    this.httpClient.fetch('board')
      .then (response => response.json())
      .then(data => {
        console.log(data);
        console.log('kharrrrrrr');
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        
        });
        
        
  }
}

ValidationRules
  .ensure(a => a.boardName).required()
  .on(Board);
