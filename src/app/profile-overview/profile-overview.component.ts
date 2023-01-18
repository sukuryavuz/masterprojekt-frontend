import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

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
    fb:FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
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
    })
  }

  updateUser(
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    password2: string,
  ): boolean {
    if(password !== password2) {
      this.snackBar.open('Die Passwörter stimmen nicht überein. Bitte prüfen Sie ihre Eingabe', 'X');
      return false;
    } else if(firstname.length === 0 || lastname.length === 0 || username.length === 0 || password.length === 0 || password2.length === 0) {
      this.snackBar.open('Sie müssen alle Pflichtfelder eingeben, um Ihre Profildaten abspeichern zu können', 'X');
      return false;
    }
    this.userService.updateUser(
      this.user.username,
      firstname,
      lastname,
      username,
      password
    ).subscribe(() => {
      this.loginService.logout();
      this.snackBar.open('Ihre Profildaten wurden erfolgreich aktualisiert. Bitte melden Sie sich erneut an.', 'X');
    })
    return true;
  }

  removeAccount(): void {
    if(confirm("Sind Sie sich sicher, dass Sie ihr Account endgültig löschen möchten?")) {
      this.userService
      .removeAccount(this.user.username)
      .subscribe(() => {
        this.snackBar.open(`Ihr Account wurde erfolgreich gelöscht.`, 'X');
        this.router.navigate(['/'])
      })
    }

  }

}
