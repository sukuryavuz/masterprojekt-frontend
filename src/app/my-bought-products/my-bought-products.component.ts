import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { UserService } from '../service/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    public router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getMyBoughtProducts();
  }

  getMyBoughtProducts() {
    this.userService.getMyBoughtProducts(this.user.username)
    .subscribe((response) => {
      this.myBoughtProducts = response;
      this.convertByteArrayToImage();
      console.log(this.myBoughtProducts);
      this.checkIfUserUploadedImage();
    })
  }

  convertByteArrayToImage() {
    for(let i=0; i<this.myBoughtProducts.length; i++) {
      let objectURL = 'data:image/png;base64,' + this.myBoughtProducts[i].file;
      this.myBoughtProducts[i].file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }

  checkIfUserUploadedImage(): any {
    this.myBoughtProducts.forEach((product) => {
      if(product.file.changingThisBreaksApplicationSecurity === "data:image/png;base64,null") {
        product.file = "../../assets/noimage.jpg";
      }
    })
  }
}
