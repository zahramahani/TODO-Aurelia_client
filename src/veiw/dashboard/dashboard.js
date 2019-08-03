import './dashboard.scss'
import { BoardModel } from '../../model/boardModel'
import { Todo } from '../../model/todo'
import { User } from '../../model/user'
import { Task } from './../../model/task'

export class Dashboard {
  constructor () {
    this.boards = []
 
    this.user = new User('z', 'a')
    this.user.setImage('pic.png')
    this.board = new BoardModel('board One', 'zahra')
    this.todo1 = new Todo('todo1')
    this.todo2 = new Todo('todo2')
    this.todo3 = new Todo('todo3')
    this.task1 = new Task('task1')
    this.task2 = new Task('task2')
    this.task3 = new Task('task3')
    this.todo1.addTask(this.task1)
    this.todo2.addTask(this.task2)
    this.todo3.addTask(this.task3)
    // this.todos.push(this.todo1)
    // this.todos.push(this.todo2)
    // this.todos.push(this.todo3)
    this.board.addTodo(this.todo1)
    this.board.addTodo(this.todo2)
    this.board.addTodo(this.todo3)
    this.board.addMember(this.user)
    this.boards.push(this.board)

    this.board1 = new BoardModel('board Two', 'zahra')
    this.board1.addMember(this.user)
    this.boards.push(this.board1)
  // this.boards.push(new Board("board One","zahra").addMember(new User("z","a").setImage("pic.png")))
  // this.boards.push(new Board("board Two","sara").addMember(new user("z","a")));
  // this.boards.push(new Board("board Three","sadegh").addMember(new user("z","a")));
  }

  setBoards (boards) {
    this.boards = boards
  }
  deleteBoard(board){
 
      this.boards.splice(board);
      //delete this board :)
  }
}
