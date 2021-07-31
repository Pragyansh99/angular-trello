import { Component } from '@angular/core';
import { UsersService } from './providers/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-trello';
  constructor (private user: UsersService){
    user.refreshUserList();
  }
}
