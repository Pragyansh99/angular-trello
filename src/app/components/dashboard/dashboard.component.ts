import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from 'src/app/popups/add-task/add-task.component';
import { AddUserComponent } from 'src/app/popups/add-user/add-user.component';
import { UsersService } from 'src/app/providers/users.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  users: any = []
  usersSubscription: Subscription

  constructor(private dialog: MatDialog, public userService: UsersService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.userList.subscribe((users) => {
      this.users = users;
      // this.users.sort(function(a:any, b:any){return a.user - b.user})
    })
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '450px',
      data: { name: 'Anderson' }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddTask(user: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '450px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  deleteTask(username: string, task: string) {
    Swal.fire({
      title: `Are you sure you want to remove task "${task}" ?`,
      text: 'This action is permanent.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeTaskofUser(username, task)
        Swal.fire(
          'Task Deleted!',
          '',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  removeUser(username: string) {
    Swal.fire({
      title: `Are you sure you want to remove user "${username}" ?`,
      text: 'This user and all allocated task will be removed completely.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeUser(username);
        Swal.fire(
          'User Deleted!',
          '',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  drop(event: any, userRef: any, currListIndex: any) {

    let movedTag = event.previousContainer.element.nativeElement;
    let pTag = movedTag.getElementsByTagName('p');
    let prevListIndex = pTag[0].id.split("user")[1];
    this.userService.shiftTaskFromUser(prevListIndex, currListIndex, event.previousContainer.data[event.previousIndex], event.currentIndex)

    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(userRef.tasks, event.previousIndex, event.currentIndex);
    }

  }
}
