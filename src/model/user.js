
export class User {
    firstName;
    lastName;
    image;
    userName;
    password;
    

    constructor(userName) {
      this.userName = userName;
 
    }
    setImage(image){
        this.image=image;
    }
    
  }