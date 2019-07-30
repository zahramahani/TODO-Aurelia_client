import './dashboard.scss'
import { Board } from '../../model/board'
// import { Todo } from '../../model/todo'
import { User } from '../../model/user'

export class Dashboard {
  constructor () {
    this.boards = []
    this.user = new User('z', 'a')
    this.user.setImage('pic.png')
    this.board = new Board('board One', 'zahra')
    this.board.addMember(this.user)
    this.boards.push(this.board)
  // this.boards.push(new Board("board One","zahra").addMember(new User("z","a").setImage("pic.png")))
  // this.boards.push(new Board("board Two","sara").addMember(new user("z","a")));
  // this.boards.push(new Board("board Three","sadegh").addMember(new user("z","a")));
  }

  setBoards (boards) {
    this.boards = boards
  }
}