import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task = ''
  errorMessage = ''
  user: any = null

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService) {
    this.user = data.user as any
  }

  ngOnInit(): void {
  }

  addTask() {
    this.userService.addTaskToUser(this.user.user, this.task);
    this.dialogRef.close();
  }

}
