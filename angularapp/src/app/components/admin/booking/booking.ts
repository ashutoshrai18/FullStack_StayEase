import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // For Bootstrap modal API

@Component({
  selector: 'app-booking',
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class Booking {
  bookings: any[] = [];
  newBooking: any = {};
  editingIndex: number | null = null;

  addBooking(): void {
    if (this.editingIndex !== null) {
      this.bookings[this.editingIndex] = { ...this.newBooking };
      this.editingIndex = null;
    } else {
      this.bookings.push({ ...this.newBooking });
    }
    this.newBooking = {};
    this.closeModal();
  }

  editBooking(index: number): void {
    this.newBooking = { ...this.bookings[index] };
    this.editingIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addBookingModal'));
    modal.show();
  }

  removeBooking(index: number): void {
    this.bookings.splice(index, 1);
  }

  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addBookingModal'));
    if (modal) modal.hide();
  }
}
