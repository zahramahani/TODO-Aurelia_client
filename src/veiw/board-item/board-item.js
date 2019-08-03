import {bindable} from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'
export class BoardItem {
  add;
 @bindable board;
 @bindable name;
 @bindable owner;
 @bindable members=[];
 firstName='';
 lastName='';
  constructor (name,owner) {
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
}
