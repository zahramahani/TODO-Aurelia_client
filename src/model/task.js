
export class Task{
  userId;
  done;
  text;
  taskId;
  todoId;
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