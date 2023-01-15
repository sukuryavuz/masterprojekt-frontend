import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableProductsComponent } from './available-products/available-products.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { MyBoughtProductsComponent } from './my-bought-products/my-bought-products.component';

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'available-products',
    component: AvailableProductsComponent
  },
  {
    path: 'my-bought-products',
    component: MyBoughtProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
