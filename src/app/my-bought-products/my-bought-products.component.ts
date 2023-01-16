import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { UserService } from '../service/user/user.service';

@Component({
  standalone: true,
  selector: 'app-my-bought-products',
  templateUrl: './my-bought-products.component.html',
  styleUrls: ['./my-bought-products.component.css'],
  imports: [MatButtonModule, MatCardModule, CommonModule]
})
export class MyBoughtProductsComponent {
  user: User;
  myBoughtProducts: any[] = [];

  constructor(
    private userService: UserService,
    public router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getMyBoughtProducts();
  }

  getMyBoughtProducts() {
    this.userService.getMyBoughtProducts(this.user.username)
    .subscribe((response) => {
      this.myBoughtProducts = response;
      console.log(this.myBoughtProducts);

    })
  }
}
