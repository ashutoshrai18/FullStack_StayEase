// src/app/components/website/search-box/search-box.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.html',
  styleUrls: ['./search-box.css'],
  imports: [CommonModule, FormsModule]

})
export class SearchBox {
  address = '';
  roomType = '';
  checkIn = '';
  checkOut = '';
  rooms = 1;

  constructor(private router: Router) {}

  onSearch() {
    // You can pass search params if needed
    this.router.navigate(['/hotel-lists']);
  }
}
