import {bindable} from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'

// validation_part
import {inject} from 'aurelia-dependency-injection';
// import { inject } from 'aurelia-framework';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
//http
import { HttpClient, json } from 'aurelia-fetch-client';

// @inject(HttpClient)
// validation_part
@inject(ValidationControllerFactory, HttpClient)
export class BoardItem {
  add;
 @bindable board;
 @bindable name;
 @bindable owner;
 @bindable members=[];
 firstName='';
 lastName='';
 
  constructor (controllerFactory,httpClient,name,owner) {
    this.httpClient=httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.name=name;
    this.owner=owner;
    this.add=true;
 
    
  }
  
  
  addMember(){
    if(this.add){
    this.tempMember= new User(this.firstName,this.lastName);
    this.board.addMember(this.tempMember);
    this.firstName= null;
    this.lastName= null;
    this.add=false;
  }
  else{
    this.add=true;
  }

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


}
ValidationRules
  .ensure(a => a.firstName).required()
  .ensure(a => a.lastName).required()
  .on(BoardItem);
