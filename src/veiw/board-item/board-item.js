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
    if (this.add) {
      this.httpClient.fetch('getuserIdByUserName?userName=' + this.userName)
        .then(response => response.json())
        .then(userIdData => {

          console.log("khar")
          console.log(userIdData);
          console.log("khar")
          this.httpClient.fetch('getBoardHasUser?userId='+userIdData)
            .then(response => response.json())
            .then(data => {
              if (Number(data) === 0) {
                this.repeated = false;
                console.log("helloId")
                console.log(data);
                this.userId = userIdData;
                this.temp = {
                  boardId: this.board.boardId,
                  userId: this.userId
                }
                this.httpClient.fetch(`addMemberToBoard`, {
                  method: 'POST',
                  body: JSON.stringify(this.temp)
                }).then(response => response.json())
                  .then(data => {
                    this.fetchMember(this.board.boardId);
                  });
              } else {
                console.log("repeatedd")
                this.repeated = true;

              }
            });

        }).catch((err) => {
          this.enterUsername = true;
          console.log('yes')
          console.log(err)
        });
      // this.add = false;
      this.userName = null;
    }
    else {
      // this.add = true;
    }
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
