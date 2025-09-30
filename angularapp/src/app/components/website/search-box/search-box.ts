import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  guest: number | null = null;
  errorMessage = '';

  constructor(private router: Router) {}

  onSearch() {
    if (!this.address || !this.roomType || !this.guest) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    this.errorMessage = '';
    this.router.navigate(['/hotel-lists'], {
      queryParams: {
        address: this.address,
        roomType: this.roomType,
        numPersons: this.guest
      }
    });
  }
}
