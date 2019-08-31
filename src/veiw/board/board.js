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
  }
  addBoard(){
    this.tempBoard=new BoardModel(this.boardName)
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
        console.log(result);
      } else {
        console.log(result);
      }
    })
    
  }
  attached() {
    this.getBoards();
    
  }
  getBoards() {
    
    this.httpClient.fetch('board')
      .then (response => response.json())
      .then(data => {
        this.boards = data.map(element => Object.assign(new BoardModel(), element));
        
        });
        
        
  }
}

ValidationRules
  .ensure(a => a.boardName).required()
  .on(Board);
