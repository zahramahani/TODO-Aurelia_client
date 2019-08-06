import {bindable} from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'

// validation_part
import {inject} from 'aurelia-dependency-injection';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
@inject(ValidationControllerFactory)
// validation_part
export class BoardItem {
  add;
 @bindable board;
 @bindable name;
 @bindable owner;
 @bindable members=[];
 firstName='';
 lastName='';
  constructor (controllerFactory,name,owner) {
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
    this.firstName='';
    this.lastName='';
    this.add=false;
  }else{
    this.add=true;
  }

  }

  editBoardItem(){

  }
  submit(){
    this.controller.validate().then(result=>{
      if (result.valid) {
        console.log('valid');
        this.addMember();
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
  .ensure(a => a.firstName).required()
  .ensure(a => a.lastName).required()
  .on(BoardItem);
