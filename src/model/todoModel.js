
export class TodoModel {
    name;
    tasks = [];
    done = null;
    boardId;
    todoId;
    constructor(name) {
      this.name = name;
    }
    
    addTask(task){
        this.tasks.push(task);
    }
    setDone(done){
        this.done = done;
    }
  }