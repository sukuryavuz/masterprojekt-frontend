import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductService } from '../service/product/product.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class AvailableProductsComponent {
  availableProducts: any[] = [];

  constructor(
    private productService: ProductService,
    public router: Router
  ) {
    this.getAvailableProducts();
  }

  getAvailableProducts() {
    this.productService
      .getAvailableProducts()
      .subscribe((response) => {
        this.availableProducts = response;
        console.log(this.availableProducts);
      })
  }
}
