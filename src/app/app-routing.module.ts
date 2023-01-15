import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { LoginComponent } from './login/login/login.component';
import { MyBoughtProductsComponent } from './my-bought-products/my-bought-products.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'available-products',
    component: AvailableProductsComponent
  },
  {
    path: 'my-bought-products',
    component: MyBoughtProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'my-products',
    component: MyProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
