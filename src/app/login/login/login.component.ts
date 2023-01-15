import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BannerService } from 'src/app/banner/banner.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/register/register.component';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, RegisterComponent]
})
export class LoginComponent {
  firstname: string;
  lastname: string;
  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private bannerService: BannerService,
    private dialog: MatDialog
  ) {
    this.loginService.logout();
  }

  // login(username:string, password:string) {
  //   this.loginService
  //   .login(username, password)
  //   .subscribe(data => {
  //     const user = new User(data.username, data.id);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('token', data.token);
  //     this.loginService.setUser(user);
  //     this.loginService.setIsLoggedIn(true);
  //     this.router.navigate(['/home']);
  //   })
  // }

  login(username:string, password:string) {
    this.loginService
      .login(username, password)
      // .pipe(
      //   handleError(401, 'Unauthorized', () =>
      //     this.bannerService.open({
      //       title: `Dieser Benutzer wurde nicht gefunden.`,
      //       text: 'Bitte überprüfen Sie Ihre Login Daten',
      //       icon: 'change_circle'
      //     }))
      // )
      .subscribe(data => {
        this.snackBar.open(`Sie sind nun eingelogged`, 'X');
        const user = new User(data.username, data.id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
        this.loginService.setUser(user);
        this.loginService.setIsLoggedIn(true);
        this.router.navigate(['/home']);
      })
  }

  register(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result;
    });
  }
}
