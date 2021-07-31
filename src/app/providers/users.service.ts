import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  user: string;
  tasks: [];
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  _user_list = new BehaviorSubject([]);
  userList = this._user_list.asObservable();

  storeUserList(list: any) {
    localStorage.setItem('user_list', JSON.stringify(list))
    this.refreshUserList()
  }

  refreshUserList() {
    let user_list = []
    try {
      const userList = localStorage.getItem('user_list') as any;
      user_list = JSON.parse(userList)
    } catch (e) {
      user_list = []
    }
    this._user_list.next(user_list)
  }

  // User Specific Actions

  addNewUser(username: string) {
    const user: User = {
      user: username,
      tasks: []
    }
    let list = this._user_list.getValue() as any;
    list.push(user)
    this.storeUserList(list)
  }

  removeUser(username: string) {
    let list = this._user_list.getValue() as any;
    let index = list.findIndex((element: any) => element.user == username)
    list.splice(index, 1)
    this.storeUserList(list)
  }

  addTaskToUser(username: string, task: any) {
    let list = this._user_list.getValue() as any;
    let index = list.findIndex((element: any) => element.user == username)
    list[index].tasks.push(task);
    this.storeUserList(list)
  }

  removeTaskofUser(username: string, task: string) {
    let list = this._user_list.getValue() as any;
    let index = list.findIndex((element: any) => element.user == username)
    let taskIndex = list[index].tasks.findIndex((ele: any) => ele == task)
    list[index].tasks.splice(taskIndex, 1)
    this.storeUserList(list)
  }

  shiftTaskFromUser(prevUserIndex: number, currUserIndex: number, task: string, newTaskIndex: string) {

    let list = this._user_list.getValue() as any;

    // remove task from old user
    const prevTaskIndex = list[prevUserIndex].tasks.findIndex((ele: string) => ele == task)
    list[prevUserIndex].tasks.splice(prevTaskIndex, 1)

    // Add to new user at a perticular index
    list[currUserIndex].tasks.splice(newTaskIndex, 0, task);
    this.storeUserList(list)
  }

}
