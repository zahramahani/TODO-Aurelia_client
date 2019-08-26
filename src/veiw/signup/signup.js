import './signup.scss'
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
@inject(ValidationControllerFactory,HttpClient)
export class Signup {
    firstName
    lastName
    userName
    password
    loginPassword
    loginUserName
    loginFlag = true;
    signupFlag = false;

    constructor (controllerFactory,httpClient) {
        this.httpClient=httpClient;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
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
        let data = {
            firstName:this.firstName,
            lastName:this.lastName,
            userName:this.userName,
            password:this.password
          }
          
          this.httpClient.fetch(`signup`, {
            method: 'POST',
            body: JSON.stringify(data)
          }).then(response => response.json())
            .then(data => {
            console.log("regdone");
            });
        }
        signUpSubmit() {
          this.controller.validate().then(result => {
            if (result.valid) {
              console.log('valid');
              this.registerUser();
              console.log(result);
              this.firstName = "";
              this.lastName = "";
              this.userName = "";
              this.password = "";

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
            this.httpClient.fetch(`login`, {
                method: 'POST',
                body: JSON.stringify(data)
              }).then(response => response.json())
                .then(data => {
                  console.log(data);
                });
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
  .ensure(a => a.loginUserName).required()
  .ensure(a => a.loginPassword).required()
  .ensure(a => a.firstName).required()
  .ensure(a => a.lastName).required()
  .ensure(a => a.userName).required()
  .ensure(a => a.password).minLength(8).required().matches('/^[\].*/');
  // .matches((?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*)
  .on(Signup);

  