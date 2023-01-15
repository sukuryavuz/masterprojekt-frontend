import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { User } from '../shared/user';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [AppRoutingModule, CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user?: User;
  availableProducts: any[] = [];

  constructor(
    private loginService: LoginService,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.loginService.getIsLoggedIn().subscribe((value => {
        this.isLoggedIn = value;
        console.log(value);
      }))
      this.loginService.getUser().subscribe((value => {
        this.user = value;
        console.log(value);
      }))
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);

  }

  getMyBoughtProducts() {

  }

  getAvailableProducts() {

  }

  logout() {
    console.log("sie werden abgemeldet");
    this.loginService.logout();
  }
}
