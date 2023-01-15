import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product/product.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

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
        console.log(response);
      })
  }



}
