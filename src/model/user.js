
export class User {
    firstName;
    lastName;
    image;
    

    constructor(firstName,lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    setImage(image){
        this.image=image;
    }
    
  }