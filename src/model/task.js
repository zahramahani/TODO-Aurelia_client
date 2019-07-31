
export class Task {
    title
    done=null
    image

    constructor(title) {
      this.title = title;
    }
    setImage(image){
        this.image=image;
    }
    setDone(done){
        this.done=done;
    }
  }