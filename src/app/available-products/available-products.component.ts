import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from '../home/home/home.component';

@Component({
  standalone:true,
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule, HomeComponent]
})
export class AvailableProductsComponent {
}
