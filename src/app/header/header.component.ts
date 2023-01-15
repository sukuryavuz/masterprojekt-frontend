import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user?: User;

  constructor(private loginService: LoginService, public router: Router) {}

  ngOnInit(): void {
      this.loginService.getIsLoggedIn().subscribe((value => {
        this.isLoggedIn = value;
        console.log(value);
      }))
      this.loginService.getUser().subscribe((value => {
        this.user = value;
        console.log(value);
      }))
  }
}
