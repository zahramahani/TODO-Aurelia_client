
export class BoardModel {
    name='';
    done=null;
    owner;
    members=[];
    todos=[];

    constructor(name,owner) {
      this.name = name;
      this.owner = owner;
    }
    addMember(member){
        this.members.push(member);
    }
    addTodo(todo){
        this.todos.push(todo);
    }
    setDone(done){
        this.done=done;
    }
  }