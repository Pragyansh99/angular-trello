import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  username = ''
  userList = []
  errorMessage: string = '';

  constructor(private dialog: MatDialog, private users: UsersService) { }

  ngOnInit(): void {
    this.users.userList.subscribe((users: any) => {
      this.userList = users
    })
  }

  addUser() {
    if(this.userList.length) {
      const index = this.userList.findIndex((element: any) => element.user == this.username)
      if(index !== -1) {
        this.errorMessage = "*A user is already present with this name.";
        console.log("User Exsists")
        return ;
      } else {
        this.errorMessage = ''
      }
    }
    this.users.addNewUser(this.username)
    this.dialog.closeAll();
  }
}
