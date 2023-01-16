import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    public router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getMyProducts();
  }

  getMyProducts() {
    this.productService.getMyProducts(this.user.username)
    .subscribe((response) => {
      this.myProducts = response;
      this.convertByteArrayToImage();
      console.log(this.myProducts);
    })
  }

  convertByteArrayToImage() {
    for(let i=0; i<this.myProducts.length; i++) {
      let objectURL = 'data:image/png;base64,' + this.myProducts[i].file;
      this.myProducts[i].file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }
}
