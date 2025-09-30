// src/app/components/website/cart/cart.ts
  import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
  import {FormsModule} from '@angular/forms';
  import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
  import {forkJoin} from 'rxjs';
  import {UserService} from '../../../service/user-service';
  import {HotelService} from '../../../service/hotel-service';
  import {UserModel} from '../../../model/user/user-model';
  import {HotelModel} from '../../../model/hotel/hotel-model';

  @Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.html',
    styleUrls: ['./cart.css'],
    imports: [FormsModule, RouterLink,RouterModule]
  })
  export class Cart implements OnInit {
    // User fields
    fullName: string = '';
    email: string = '';
    mobile: string = '';
    userId: number | null = null;

    // Hotel fields
    hotelId: number | null = null;
    hotelName: string = '';
    hotelAddress: string = '';
    pricePerNight: number = 0;
    hotelImage: string = '';
    hotelRating: number = 0;

    // Booking fields
    roomId: string | null = null;
    nights: number = 1;
    totalPrice: number = 0;
    checkInDate: string = '';
    checkOutDate: string = '';

    isLoading: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private hotelService: HotelService,
      private cdr: ChangeDetectorRef,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.roomId = params.get('roomId');
        this.hotelId = params.get('hotelId') ? Number(params.get('hotelId')) : null;

        if (typeof window !== 'undefined' && window.localStorage) {
          this.userId = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null;
        } else {
          this.userId = null;
        }
        // this.userId = params.get('userId') ? Number(params.get('userId')) : null;
        // this.checkInDate = params.get('checkInDate') || '';
        // this.checkOutDate = params.get('checkOutDate') || '';
        console.log('roomId:', this.roomId, 'hotelId:', this.hotelId); // Add this line
        this.isLoading = true;

        const userObs = this.userId
          ? this.userService.getUserById(this.userId)
          : (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('user'))
            ? Promise.resolve(JSON.parse(localStorage.getItem('user')!))
            : Promise.resolve(null);

        const hotelObs = this.hotelId
          ? this.hotelService.getHotelById(this.hotelId)
          : Promise.resolve(null);

        forkJoin({
          user: userObs,
          hotel: hotelObs
        }).subscribe({
          next: ({user, hotel}) => {
            if (user) {
              this.fullName = user.name;
              this.email = user.email;
              this.mobile = user.phoneNumber;
              this.userId = user.userId ?? null;
            }
            if (hotel) {
              this.hotelName = hotel.name;
              this.hotelAddress = hotel.address;
              this.pricePerNight = hotel.pricePerNight ?? 0;
              this.hotelImage = hotel.imageUrl ?? '';
              this.hotelRating = hotel.rating ?? 0;
              this.nights = this.calculateNights(this.checkInDate, this.checkOutDate);
              this.totalPrice = this.pricePerNight * this.nights;
            }
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      });
    }

    calculateNights(checkIn: string, checkOut: string): number {
      if (!checkIn || !checkOut) return 1;
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);
      return Math.max(1, Math.round(diff));
    }

 // In cart.ts
 goToPayment() {
   if (this.roomId && this.hotelId) {
     this.router.navigate(['/payment', this.roomId, this.hotelId]);
   }
 }
  }
