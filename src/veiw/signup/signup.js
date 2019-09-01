import './signup.scss'
import { inject, NewInstance } from 'aurelia-framework';
import{ Aurelia } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import {validationMessages} from 'aurelia-validation';
import {ValidationController,ValidationRules, validateTrigger } from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
import {Router} from 'aurelia-router';
import AuthService from './../../auth-service'
import { isNull } from 'util';
@inject(NewInstance.of(ValidationController),HttpClient,Router,AuthService,Aurelia)
export class Signup {
    firstName
    lastName
    userName
    password
    loginPassword
    loginUserName
    repeated=false;
    loginFlag = true;
    signupFlag = false;

    constructor (controller,httpClient,router,AuthService,Aurelia) {
      // this.controller = controllerFactory.createForCurrentScope();
      this.controller=controller;
      this.controller.validateTrigger = validateTrigger.changeOrBlur;
      this.httpClient=httpClient;
        // this.controller.addRenderer(new BootstrapFormRenderer());
        this.router=router
        this.AuthService = AuthService
        this.aurelia =  Aurelia
      }

      attached(){
        this.httpClient.configure(x =>{
          x
          .withBaseUrl('http://localhost:3004/api/')
          // .withBaseUrl('http://partiya.todo.partdp.ir/api/') 
          .withDefaults(
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
              }
            }).withInterceptor({
              responseError(error) {
                
                console.log('interseptoe66666666666666666')
                console.log(error)
                 if(error.status === 400){
                   toastr.error('some thing wronge try again')
                 }else if(error.status === 401){
                   toastr.error('you are unauthoriz please log in')
                 }else if(error.status === 404){
                   toastr.error('your request is not available')
                 }
                  }
            })
          // x.withInterceptor({
          //   request(message) {
          //     return message;
          //   },
          //   responseError(error) {
          //   throw error;
          //   }
          //   }); 
        })
      }

    login(){
        this.loginFlag = true;
        this.signupFlag = false;
        console.log("hi");
        
    }
    signup(){
        this.loginFlag = false;
        this.signupFlag = true;
    }

    registerUser(){
      this.httpClient.fetch(`getUserRepeated?userName=${this.userName}`) // change concatation to es6 ${}
      .then(response => response.json())
      .then(data => {
        if (Number(data) === 0) {
          let signupData = {
            firstName:this.firstName,
            lastName:this.lastName,
            userName:this.userName,
            password:this.password
          }
          this.AuthService.signup(this.firstName ,this.lastName ,this.userName ,this.password)
          // this.httpClient.fetch(`signup`, {
          //   method: 'POST',
          //   body: JSON.stringify(signupData)
          // }).then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.type === 'userSignupError'){
                toastr.error('username is used befor enter new username')
              }
            // console.log("regdone");
            // this.router.navigateToRoute('dashboard'); 
            this.loginFlag = true;
            this.signupFlag = false;
            this.firstName = "";
            this.lastName = "";
            this.userName = "";
            this.password = "";

            });
        }else{
          this.repeated=true;
          toastr.error('user name is inuse try new one')
        }

      });
      
       
        }
        signUpSubmit() {
          this.controller.validate().then(result => {
            if (result.valid) {
              console.log('valid');
              this.registerUser();
              console.log(result);

            } else {
              console.log(result);
              this.firstName = "";
              this.lastName = "";
              this.userName = "";
              this.password = "";
            }
          })
        }
        loginUser(){
            let data = {
                userName:this.loginUserName,
                password:this.loginPassword
            }
            this.AuthService.login(this.loginUserName ,this.loginPassword)
            // this.httpClient.fetch(`login`, {
            //     method: 'POST',
            //     body: JSON.stringify(data)
            //   }).then(response => response.json())
                .then(data => {
                  // debugger
                if(data.status ==='OK'){
                  const root = PLATFORM.moduleName('app')
                  this.aurelia.setRoot(root)
                  localStorage.setItem('token', data.token)
                }
                if (data.type === 'errorLogin'){
                  toastr.error('password in not valid')
                }
                if(data.type === 'userameErrorLogin'){
                  toastr.error('username is not valid')
                }
              
                  // console.log("im here");
                  // toastr.error('enter valid username')}
              }
             )
        }

        loginSubmit() {
          this.controller.validate().then(result => {
            if (result.valid) {
              console.log('valid');
              this.loginUser();
              console.log(result);
            } else {
              console.log('invalid');
              console.log(result);
            }
          })
        }
    }
  ValidationRules
  .ensure(a => a.loginUserName)
    .required().withMessage('\${$displayName} cannot be blank.')
  .ensure(a => a.loginPassword)
    .required().withMessage('\${$displayName} cannot be blank.')
  .ensure(a => a.firstName)
    .required().withMessage('\${$displayName} cannot be blank.')
  .ensure(a => a.lastName)
    .required().withMessage('\${$displayName} cannot be blank.')
  .ensure(a => a.userName)
    .required().withMessage('\${$displayName} cannot be blank.')
  .ensure(a => a.password)
    .required().withMessage('\${$displayName} cannot be blank.')
    .minLength(8)
    .then()
    .matches(/^.(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/).withMessage('\${$displayName} use at least one uppercase,one lowercase,one digit and one speical charecter')

  // .ensure(a => a.password).minLength(8).required().matches('/^[\].*/');
  // .matches((?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*)
  .on(Signup);

  