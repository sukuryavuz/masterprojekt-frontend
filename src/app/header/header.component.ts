import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { User } from '../shared/user';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProductService } from '../service/product/product.service';
import { AppRoutingModule } from '../app-routing.module';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [AppRoutingModule, CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user?: User;
  availableProducts: any[] = [];

  constructor(
    private loginService: LoginService,
    public router: Router,
    private productService: ProductService
  ) {}

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

  addProduct() {

  }

  getMyBoughtProducts() {

  }

  getAvailableProducts() {

  }

  logout() {
    console.log("sie werden abgemeldet");
    this.loginService.logout();
  }
}
