
export class Todo {
    title
    tasks = []
    done = null

    constructor(title) {
      this.title = title;
    }
    
    addTask(task){
        tasks.push(task);
    }
    setDone(done){
        this.done = done;
    }
  }