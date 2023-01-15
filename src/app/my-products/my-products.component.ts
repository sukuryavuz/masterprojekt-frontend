import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../service/product/product.service';

@Component({
  standalone: true,
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
  imports: [MatButtonModule, MatCardModule, CommonModule]
})
export class MyProductsComponent {
  user: User;
  myProducts: any[] = [];

  constructor(
    private productService: ProductService,
    public router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getMyProducts();
  }

  getMyProducts() {
    this.productService.getMyProducts(this.user.username)
    .subscribe((response) => {
      console.log(response);
      this.myProducts = response;
      console.log(this.myProducts);
    })
  }
}
