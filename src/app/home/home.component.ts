import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  editUserDisplay = 'input-hide';

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  editUser() {
    const { currentUser, editedFirstName, editedLastName } = this

    const body = {
      id: currentUser.id,
      firstName: editedFirstName || currentUser.firstName,
      lastName: editedLastName || currentUser.lastName
    }

    const response = this.userService.edit(body)
      .pipe(map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          return user;
      }))
      .subscribe(() => this.loadAllUsers());
  }

  toggleEditDisplay() {
    this.editUserDisplay = this.editUserDisplay === 'input-hide'
      ? 'input-show'
      : 'input-hide'
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }

}
