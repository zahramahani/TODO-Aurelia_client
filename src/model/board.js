
export class Board {
    name;
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
    addTodos(todo){
        this.todos.push(todo);
    }
    setDone(done){
        this.done=done;
    }
  }