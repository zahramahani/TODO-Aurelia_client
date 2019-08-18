import {bindable} from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'
import { inject } from 'aurelia-framework';

// validation_part

// import { inject } from 'aurelia-framework';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
//http
import { HttpClient, json } from 'aurelia-fetch-client';
import { log } from "util";

// @inject(HttpClient)
// validation_part
@inject(ValidationControllerFactory,HttpClient)
export class BoardItem {
  add;
 @bindable board;
 @bindable members=[];
 firstName='';
 lastName='';
 userName='';
 userId;
 
  constructor (controllerFactory,httpClient) {
    this.httpClient=httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.add=true;
 
    
  }
  attached(){
    this.getOwnerName(this.board.ownerId)
    this.fetchMember()
  }
  
  addMember(){
    if(this.add){
    // this.tempMember= new User(this.userName);
    // this.board.addMember(this.tempMember);
    // this.userName=null;
    // this.firstName= null;
    // this.lastName= null;

    this.httpClient.fetch('getuserIdByUserName?userName=' + this.userName)
    .then(response => response.json())
    .then(data => {
      console.log("helloId")
      console.log(data);
     this.userId = data;
      this.temp = {
      boardId: this.board.boardId,
      userId: this.userId
    }
    this.httpClient.fetch(`addMemberToBoard`, {
      method: 'POST',
      body: JSON.stringify(this.temp)
    }).then(response => response.json())
    .then(data => {
     this.fetchMember();
    });
    });
    
    

    this.add=false;
    this.userName=null;
  }
  else{
    this.add=true;
  }

  }

  fetchMember(){
    this.httpClient.fetch('getMember?boardId=' + this.board.boardId)
    .then(response => response.json())
    .then(data => {
      console.log('here');
      console.log(data);
    //  this.userId = data;
    this.board.members = data.map(element => Object.assign(new User(), element));
    });
    
  }

  editBoardItem(){

  }
  submit(){
    if(this.add){


    this.controller.validate().then(result=>{
      if (result.valid) {
          console.log('valid');
          this.addMember();
          console.log(result);
        // this.title = 'add new task';
      } else {
        console.log(result);
        // this.add=true;
      }
    })
  }else{
    this.add=true;
  }
    // .catch((e)=>{
    //   console.log(e.stack);
    // });
  }
  getOwnerName(id){
    console.log(" in get owner name")
      this.httpClient.fetch('userName?userId='+id)
        .then (response => response.json())
        .then(data => {
          console.log(data)
          this.board.owner=data;
          this.temMember= new User(this.board.owner);
          this.board.addMember(this.temMember)
          });
        }


}
ValidationRules
  .ensure(a => a.userName).required()
  .on(BoardItem);
