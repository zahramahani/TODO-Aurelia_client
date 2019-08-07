
export class Task {
    text;
    done;
    userId;
    todoId;
    taskId;

    constructor(text) {
      this.text = text;
    }
    // setImage(image){
    //     this.image=image;
    // }
    setDone(done){
        this.done=done;
    }
  }