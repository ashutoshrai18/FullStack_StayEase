import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BookingModel} from '../../../model/booking/booking-model';
import {BookingService} from '../../../service/booking-service';
import {RoomService} from '../../../service/room-service';
import {HotelService} from '../../../service/hotel-service';
import {CommonModule} from '@angular/common';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.html',
  styleUrls: ['./mybookings.css'],
  imports: [CommonModule]
})
export class Mybookings implements OnInit {
  bookings: BookingModel[] = [];
  userId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.userId = typeof user?.userId === 'number'
          ? user.userId
          : Number(user?.userId) || null;
      }
    }
    if (this.userId) {
      this.isLoading = true;
      this.bookingService.getBookingsByUserId(this.userId).subscribe({
        next: (data: BookingModel[]) => {
          if (!data || data.length === 0) {
            this.bookings = [];
            this.isLoading = false;
            this.cdr.detectChanges();
            return;
          }
          // Prepare forkJoin for room and hotel details
          const roomRequests = data.map(b => this.roomService.getRoomById(b.room.roomId));
          forkJoin(roomRequests).subscribe({
            next: (rooms) => {
              // Attach room and hotel details to each booking
              const hotelRequests = rooms.map(room =>
                room.hotel?.hotelId ? this.hotelService.getHotelById(room.hotel.hotelId) : null
              );
              forkJoin(hotelRequests.filter(r => r !== null)).subscribe({
                next: (hotels) => {
                  data.forEach((booking, i) => {
                    booking.room = rooms[i];
                    if (rooms[i].hotel?.hotelId) {
                      booking.room.hotel = hotels.shift() || rooms[i].hotel;
                    }
                  });
                  this.bookings = data;
                  this.isLoading = false;
                  this.cdr.detectChanges();
                },
                error: () => {
                  this.bookings = data;
                  this.isLoading = false;
                  this.cdr.detectChanges();
                }
              });
            },
            error: () => {
              this.bookings = data;
              this.isLoading = false;
              this.cdr.detectChanges();
            }
          });
        },
        error: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
