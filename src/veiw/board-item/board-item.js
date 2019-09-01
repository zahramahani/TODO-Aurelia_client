import { bindable } from "aurelia-framework"
import { User } from '../../model/user';
import { BoardModel } from '../../model/boardModel';
import './board-item.scss'
import { inject } from 'aurelia-framework';

// validation_part

// import { inject } from 'aurelia-framework';
import { validationMessages } from 'aurelia-validation';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from './../../bootstrap-form-renderer';
//http
import { HttpClient, json } from 'aurelia-fetch-client';

// @inject(HttpClient)
// validation_part
@inject(ValidationControllerFactory, HttpClient)
export class BoardItem {
  add;
  @bindable board;
  @bindable members = [];
  firstName = '';
  lastName = '';
  userName = '';
  userId;
  repeated = false;
  enterUsername = false;

  constructor(controllerFactory, httpClient) {
    this.httpClient = httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.add = true;


  }
  attached() {
    this.fetchMember(this.board.boardId)
    this.getOwnerName(this.board.ownerId)
  }
  addMember() {
      this.httpClient.fetch('getuserIdByUserName?userName=' + this.userName)
        .then(response => response.json())
        .then(userIdData => {
          if(userIdData.type==="errorGetUserId.mismatch with userName"){
            toastr.error("username doesnt exist please enter username of a member")
          }else{
          this.userId=userIdData;
          this.temp = {
            boardId: this.board.boardId,
            userId: this.userId
          }
          this.httpClient.fetch(`addMemberToBoard`, {
            method: 'POST',
            body: JSON.stringify(this.temp)
          }).then(response => response.json())
            .then(data => {
              // console.log(data)
              // if(data.name="error"){
              //   toastr.error("member was added before")
              // }else{
              this.fetchMember(this.board.boardId);
              // }
            });
          }
        });
      this.userName = null;
  }
  fetchMember(id) {
    this.httpClient.fetch('getMember?boardId=' + id)
      .then(response => response.json())
      .then(data => {
        this.board.members = data.map(element => Object.assign(new User(), element));
      });
  }

  editBoardItem() {

  }
  submit() {
    if (this.add) {
      this.controller.validate().then(result => {
        if (result.valid) {
          this.addMember();
        } else {
        }
      })
    } else {
      this.add = true;
    }
  }
  getOwnerName(id) {
    console.log(" in get owner name")
    this.httpClient.fetch('userName?userId=' + id)
      .then(response => response.json())
      .then(data => {
        this.board.owner = data;
      });
  }
}
ValidationRules
  .ensure(a => a.userName).required()
  .on(BoardItem);
