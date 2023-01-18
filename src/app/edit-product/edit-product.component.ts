import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';

@Component({
  standalone: true,
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, FormsModule, MatButtonModule, MatCardModule]
})
export class EditProductComponent {
  user: User;

  readonly model = {
    productName: this.data.productName,
    productDescription: this.data.productDescription,
    price: this.data.price,
  }

  productId: any = this.data.productId;
  file: any =  this.data.file

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProductComponent>,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || ' {}');
  }

  cancel = (): void => this.dialogRef.close();

  save(form: NgForm): void {
    if(form.invalid) {
      this.snackBar.open('Die Pflichtfelder müssen ausgefüllt sein.', 'X');
      return;
    }
    this.userService
      .updateProduct(this.user.username, this.productId, this.model)
      .subscribe(() => {
        this.snackBar.open('Das Produkt wurde aktualisiert', 'X');
        this.dialogRef.close(true);
        window.location.reload();
      })

   }

}
