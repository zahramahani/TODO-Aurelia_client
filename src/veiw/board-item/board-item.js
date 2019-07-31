import {bindable} from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'
export class BoardItem {
 @bindable board;
 @bindable name;
 @bindable owner;
 @bindable members=[];
 firstName='';
 lastName='';
  constructor (name,owner) {
    this.name=name;
    this.owner=owner;
    
  }
  addMember(){
    this.tempMember= new User(firstName,lastName);
    // this.members.push(this.tempMember);
    this.board.addMember(this.tempMember);
  }
  editBoardItem(){

  }
}
