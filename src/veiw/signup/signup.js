import './signup.scss'
export class Signup {
    loginFlag = true;
    signupFlag = false;

    login(){
        this.loginFlag = true;
        this.signupFlag = false;
        console.log("hi");
        
    }
    signup(){
        this.loginFlag = false;
        this.signupFlag = true;
    }
}
