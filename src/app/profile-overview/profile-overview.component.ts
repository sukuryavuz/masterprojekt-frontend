import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css'],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, FormsModule]
})
export class ProfileOverviewComponent implements OnInit {
  user: User;
  myProfile: any;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.user.username)
    .subscribe((response) => {
      this.myProfile = response;
      console.log(this.myProfile);
    })
  }

  save(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ): void {
    this.userService.updateUser(
      this.user.username,
      firstname,
      lastname,
      username,
      password
    ).subscribe(() => {
      this.snackBar.open('Ihre Profildaten wurden erfolgreich aktualisiert', 'X');
    })

  }

}
