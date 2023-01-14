import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from 'src/app/service/login.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BannerService } from 'src/app/banner/banner.service';
import { handleError } from 'src/app/shared/errors';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {}

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
      .pipe(
        handleError(401, 'Unauthorized', () =>
          this.bannerService.open({
            title: `Dieser Benutzer wurde nicht gefunden.`,
            text: 'Bitte überprüfen Sie Ihre Login Daten',
            icon: 'change_circle'
          }))
      )
      .subscribe(data => {
        this.snackBar.open(`Sie wurden eingelogged`);
        const user = new User(data.username, data.id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
        this.loginService.setUser(user);
        this.loginService.setIsLoggedIn(true);
        this.router.navigate(['/home']);
      })
  }

  readonly #refresh = (): Promise<boolean> =>
    this.router.navigateByUrl(this.router.url);
}
