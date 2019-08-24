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
    
    }

  