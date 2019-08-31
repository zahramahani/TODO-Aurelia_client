
export class BoardModel {

    taskCount
    name 
    boardId
    ownerId;
    done;
    delete=null
    owner;
    members=[];
    todos=[];
    addUser=true;
    constructor(name) {
      this.name = name;
    //   this.owner = owner;
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
