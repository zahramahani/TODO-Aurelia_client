import './dash-board-item.scss'
import {bindable} from "aurelia-framework"
export class DashBoardItem {
  @bindable deleteBoard;
  @bindable board;
  noTask=true;
  delete=false;
  constructor() {
  }
   getTodosNumber(){
  var counter=0;
  counter=this.board.todos.length;
  return counter;
  }
   getTasksNumber(){
    var todo;
    this.counter=0;
    for (todo of this.board.todos) {
     this.counter+=todo.tasks.length;
      
    }
    if(this.counter>0){
      this.noTask=false;
     
    }else{
      this.board.done=true;
      this.delete=true;
    }
    return this.counter;
  }
  //   // if(this.delete){
  //   //   this.board.delete=true;
  //   //   //delete this board :)
  //   return this.board;
  //   // }
  // }
}
