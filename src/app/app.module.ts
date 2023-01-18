import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { MyBoughtProductsComponent } from './my-bought-products/my-bought-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { PickListModule } from 'primeng/picklist';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {MatDividerModule} from '@angular/material/divider';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import { EditProductComponent } from './edit-product/edit-product.component';
import {MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginComponent,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    RegisterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HeaderComponent,
    AvailableProductsComponent,
    MyBoughtProductsComponent,
    AddProductComponent,
    MyProductsComponent,
    ProfileOverviewComponent,
    PickListModule,
    ButtonModule,
    MenubarModule,
    MatDividerModule,
    CardModule,
    FileUploadModule,
    EditProductComponent,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
