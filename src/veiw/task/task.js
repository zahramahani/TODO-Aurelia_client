import './task.scss'
import {bindable} from 'aurelia-framework';
export class Task {
  @bindable title;
  @bindable done=null;
  @bindable img;

  constructor (title) {
    this.title = title
  
  }
}
