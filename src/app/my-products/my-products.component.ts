import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import {MatMenuModule} from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../service/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../shared/product';

@Component({
  standalone: true,
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
  imports: [MatButtonModule, MatCardModule, CommonModule, MatMenuModule, MatIconModule]
})
export class MyProductsComponent {
  user: User;
  myProducts: any[] = [];

  constructor(
    private productService: ProductService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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

  editProduct(product:Product) {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        productName: product.productName,
        productDescription: product.productDescription,
        price: product.price,
        productId: product.productId,
        file: product.file
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  removeProduct(productId: any) {
    if(confirm("Sind sie sich sicher, dass die das Produkt endgültig löschen möchten?")) {
      this.userService
      .removeProduct(this.user.username, productId)
      .subscribe(() => {
        this.snackBar.open('Das Produkt wurde erfolgreich gelöscht');
        window.location.reload();
      })
    }
  }
}
