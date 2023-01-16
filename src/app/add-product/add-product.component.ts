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
import { FileHandle } from '../shared/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../shared/product';

@Component({
  standalone: true,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule, MatDividerModule, FileUploadModule]
})
export class AddProductComponent {
  user: User;
  file?: any;

  product: Product = {
    productName: "",
    productDescription: "",
    price: "",
    productImages: []
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || ' {}');
  }

  addProduct(
    productName: any,
    productDescription: any,
    price: any
  ): void {

    const productFormData = this.prepareFormData(this.product);

    this.userService.addProduct(
      this.user.username,
      productFormData)
    .subscribe(() => {
      this.snackBar.open('Das Produkt wurde erfolgreich hinzugefügt und steht anderen Benutzern ab sofort zur Verfügung', 'X');
      this.router.navigate(['/my-products']);
    })
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onChange(event:any) {
    if(event.target.files) {
      this.file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: this.file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(this.file)
        )
      }

      this.product.productImages?.push(fileHandle);
    }
  }

//   getBase64(file: File) {
//     return new Promise((resolve, reject) => {
//         if (!file) {
//             reject('file object is null');
//     }

//         var reader = new FileReader();

//         reader.onloadend = function () {
//             resolve({ res: reader.result, name: file.name });
//         };
//         reader.readAsDataURL(file);
//     });
// }
//   convertDataURIToBinary(dataURI:any) {
//     var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
//     var base64 = dataURI.substring(base64Index);
//     var raw = window.atob(base64);
//     var rawLength = raw.length;
//     var array = new Uint8Array(new ArrayBuffer(rawLength));

//     for(let i = 0; i < rawLength; i++) {
//       array[i] = raw.charCodeAt(i);
//     }
//     return array;
//   }

}
