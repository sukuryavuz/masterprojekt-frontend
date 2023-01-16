import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user/user.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {FileUploadModule} from 'primeng/fileupload';

@Component({
  standalone: true,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule, MatDividerModule, FileUploadModule]
})
export class AddProductComponent {
  user: User;
  file?: File;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || ' {}');
  }

  addProduct(
    productName: any,
    productDescription: any,
    price: any
  ): void {
    this.userService.addProduct(
      this.user.username,
      productName,
      productDescription,
      price)
    .subscribe(() => {
      this.snackBar.open('Das Produkt wurde erfolgreich hinzugefügt und steht anderen Benutzern ab sofort zur Verfügung', 'X');
      this.router.navigate(['/my-products']);
    })
  }

  onChange(event:any) {
    this.file = event.target.files[0];
    console.log(this.file);

  }
}
