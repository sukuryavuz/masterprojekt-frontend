import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductService } from '../service/product/product.service';
import { Router } from '@angular/router';
import {PickListModule} from 'primeng/picklist';
import {ButtonModule} from 'primeng/button';
import { User } from '../shared/user';
import { UserService } from '../service/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone:true,
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule, PickListModule, ButtonModule]
})
export class AvailableProductsComponent {
  user: User;
  sourceProducts: any[];
  targetProducts: any[];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || ' {}');
  }

  ngOnInit() {
      this.getAvailableProducts();
      this.targetProducts = [];
  }

  getAvailableProducts() {
    this.productService
      .getAvailableProducts(this.user.username)
      .subscribe(products => this.sourceProducts = products);
  }

  buyProducts() {
    this.sourceProducts.forEach((product) => {
      this.userService
        .buyProduct(this.user.username, product.productId)
        .subscribe(() => {
          this.snackBar.open('Die ausgewählen Produkte wurden von Ihnen gekauft. Sie finden diese nun unter "meine gekauften Produkte"', 'X');
        })
    })
  }
}
