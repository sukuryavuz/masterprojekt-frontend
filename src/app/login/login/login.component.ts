import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from 'src/app/service/login.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(username:string, password:string) {
    console.log(username, password);
    this.loginService.login(username, password)
    .subscribe(data => {
      const user = new User(data.username, data.id);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);
      this.loginService.setUser(user);
      this.loginService.setIsLoggedIn(true);
      this.router.navigate(['/home']);
    })
  }

}
