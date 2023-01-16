import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductService } from '../service/product/product.service';
import { Router } from '@angular/router';
import {PickListModule} from 'primeng/picklist';
import {ButtonModule} from 'primeng/button';
import { User } from '../shared/user';

@Component({
  standalone:true,
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule, PickListModule, ButtonModule]
})
export class AvailableProductsComponent {
  user: User;

  constructor(
    private productService: ProductService,
    public router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || ' {}');
  }

  sourceProducts: any[];

  targetProducts: any[];

  ngOnInit() {
      this.getAvailableProducts();
      this.targetProducts = [];
  }

    getAvailableProducts() {
    this.productService
      .getAvailableProducts(this.user.username)
      .subscribe(products => this.sourceProducts = products);
  }

  logger() {
    console.log(this.sourceProducts);
    console.log(this.targetProducts);


  }
}
