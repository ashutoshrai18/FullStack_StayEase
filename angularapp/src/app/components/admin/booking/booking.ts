import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { BookingService } from '../../../service/booking-service';
 import { BookingModel } from '../../../model/booking/booking-model';
 import { UserModel } from '../../../model/user/user-model';
 import { PaymentService } from '../../../service/payment-service';
 import { UserService } from '../../../service/user-service';
 import { HotelService } from '../../../service/hotel-service';
 import { filter } from 'rxjs/operators';
 import { NavigationEnd, Router } from '@angular/router';
 import { forkJoin } from 'rxjs';

 declare var bootstrap: any;

 @Component({
   standalone: true,
   selector: 'app-booking',
   templateUrl: './booking.html',
   styleUrls: ['./booking.css'],
   imports: [CommonModule, FormsModule]
 })
 export class Booking implements OnInit {
   bookings: any[] = [];
   payments: any[] = [];
   users: any[] = [];
   hotels: any[] = [];
   newBooking: any = {};
   editingIndex: number | null = null;
   isLoading: boolean = false;

   constructor(
     private bookingService: BookingService,
     private paymentService: PaymentService,
     private userService: UserService,
     private hotelService: HotelService,
     private router: Router,
     private cdr: ChangeDetectorRef
   ) {}

   ngOnInit(): void {
     this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe(() => {
         if (this.router.url === '/dashboard/bookings') {
           this.loadBookings();
         }
       });
     this.loadBookings();
   }

   loadBookings(): void {
     this.isLoading = true;
     forkJoin({
       bookings: this.bookingService.getAllBookings(),
       payments: this.paymentService.getAllPayment(),
       users: this.userService.getAllUser(),
       hotels: this.hotelService.getAllHotels()
     }).subscribe(({ bookings, payments, users, hotels }) => {
       if (!bookings.length) {
         this.bookings = [];
         this.payments = payments;
         this.users = users;
         this.hotels = hotels;
         this.isLoading = false;
         this.cdr.detectChanges();
         return;
       }
       const userRequests = bookings.map(b => this.bookingService.getUserByBookingId(b.bookingId));
       forkJoin(userRequests).subscribe((userDetails: UserModel[]) => {
         this.bookings = bookings.map((booking, i) => ({
           ...booking,
           name: userDetails[i]?.name,
           phone: userDetails[i]?.phoneNumber,
           roomType: booking.room?.type // Add roomType from RoomModel
         }));
         this.payments = payments;
         this.users = users;
         this.hotels = hotels;
         this.isLoading = false;
         this.cdr.detectChanges();
       });
     });
   }

   addBooking(): void {
     if (this.editingIndex !== null && this.editingIndex !== undefined) {
       const bookingId = this.bookings[this.editingIndex].id;
       this.bookingService.createBooking({ ...this.newBooking, id: bookingId }).subscribe(updated => {
         if (this.editingIndex !== null && this.editingIndex !== undefined) {
           this.bookings[this.editingIndex] = updated;
           this.editingIndex = null;
           this.newBooking = {};
           this.closeModal();
         }
       });
     } else {
       this.bookingService.createBooking(this.newBooking).subscribe(created => {
         this.bookings.push(created);
         this.newBooking = {};
         this.closeModal();
       });
     }
   }

   editBooking(index: number): void {
     this.newBooking = { ...this.bookings[index] };
     this.editingIndex = index;
     const modal = new bootstrap.Modal(document.getElementById('addBookingModal'));
     modal.show();
   }

   removeBooking(index: number): void {
     this.bookingService.deleteBooking(index).subscribe(() => {
       this.loadBookings();
     });
   }

   closeModal(): void {
     const modal = bootstrap.Modal.getInstance(document.getElementById('addBookingModal'));
     if (modal) modal.hide();
   }
 }
