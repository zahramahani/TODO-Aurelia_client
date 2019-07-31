export class DashBoardItem {
  @bindable boardName;
  @bindable boardOwner;
  @bindable done=null;
  @bindable img = [];
  constructor() {
    this.message = 'Hello world';
  }
}
