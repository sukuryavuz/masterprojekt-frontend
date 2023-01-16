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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [AppRoutingModule, CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MenubarModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  items: MenuItem[];
  user?: User;
  availableProducts: any[] = [];

  constructor(
    private loginService: LoginService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this.loginService.getIsLoggedIn().subscribe((value => {
        this.isLoggedIn = value;
        console.log("is User logged in?: " + value);
      }))
      this.loginService.getUser().subscribe((value => {
        this.user = value;
      }))
      this.items = [
        {label: 'Produkte hinzufügen', icon: 'pi pi-file-edit', routerLink: ['/add-product']},
        {label: 'Gekauften Produkte', icon: 'pi pi-shopping-cart', routerLink: ['/my-bought-products']},
        {label: 'Verfügbare Produkte', icon: 'pi pi-cart-plus', routerLink: ['/available-products']},
        {label: 'Meine Produkte', icon: 'pi pi-list', routerLink: ['/my-products']},
        {label: 'Profilübersicht', icon: 'pi pi-user', routerLink: ['/profile-overview']},
        {label: 'Abmelden', icon: 'pi pi-sign-out', command: () => this.logout()},
      ]
  }


  logout() {
    console.log("sie werden abgemeldet");
    this.loginService.logout();
    this.snackBar.open('Sie wurden abgemeldet.', 'X');
  }
}
