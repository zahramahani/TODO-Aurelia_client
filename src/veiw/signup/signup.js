import './signup.scss'
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import {validationMessages} from 'aurelia-validation';
import {ValidationControllerFactory,ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './../../bootstrap-form-renderer';
import {Router} from 'aurelia-router';
@inject(ValidationControllerFactory,HttpClient,Router)
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

    constructor (controllerFactory,httpClient,router) {
        this.httpClient=httpClient;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.router=router
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
      this.httpClient.fetch('getUserRepeated?userName=' +this.userName)
      .then(response => response.json())
      .then(data => {
        if (Number(data) === 0) {
          let signupData = {
            firstName:this.firstName,
            lastName:this.lastName,
            userName:this.userName,
            password:this.password
          }
          
          this.httpClient.fetch(`signup`, {
            method: 'POST',
            body: JSON.stringify(signupData)
          }).then(response => response.json())
            .then(data => {
            console.log("regdone");
            // this.router.navigateToRoute('dashboard'); 
            this.loginFlag = true;
            this.signupFlag = false;

            });
        }else{
          this.repeated=true;
        }

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
                  this.router.navigateToRoute('dashboard');
                  console.log(data);
                });
        }
    
    }

  