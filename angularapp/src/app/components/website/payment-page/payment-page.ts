import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
          import { ActivatedRoute } from '@angular/router';
          import { BookingService } from '../../../service/booking-service';
          import { UserService } from '../../../service/user-service';
          import { HotelService } from '../../../service/hotel-service';
          import { PaymentService } from '../../../service/payment-service';
          import { BookingModel } from '../../../model/booking/booking-model';
          import { UserModel } from '../../../model/user/user-model';
          import { HotelModel } from '../../../model/hotel/hotel-model';
          import { Payment } from '../../../model/payment/payment-model';
          import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {Navbar} from '../navbar/navbar';
import {Footer} from '../footer/footer';

          declare var Razorpay: any;

          @Component({
            selector: 'app-payment-page',
            templateUrl: './payment-page.html',
            styleUrls: ['./payment-page.css'],
            standalone: true,
            imports: [CommonModule, Navbar, Footer]
          })
          export class PaymentPage implements OnInit {
            userId: number | null = null;
            user: UserModel | null = null;
            fullName: string = '';
            email: string = '';
            mobile: string = '';

            hotelId: number | null = null;
            hotel: HotelModel | null = null;
            hotelName: string = '';
            hotelAddress: string = '';
            pricePerNight: number = 0;
            hotelImage: string = '';
            hotelRating: number = 0;
            nights: number | null = null;

            roomId: string | null = null;
            booking: BookingModel | null = null;
            checkInDate: string = '2024-06-10';
            checkOutDate: string = '2024-06-12';
            noOfPersons: number = 1;
            totalPrice: number = 0;

            isLoading: boolean = false;
            successMessage: string = '';

            constructor(
              private route: ActivatedRoute,
              private userService: UserService,
              private hotelService: HotelService,
              private bookingService: BookingService,
              private paymentService: PaymentService,
              private cdr: ChangeDetectorRef
            ) {}

            ngOnInit(): void {
              this.isLoading = true;
              this.route.paramMap.subscribe(params => {
                this.roomId = params.get('roomId');
                this.hotelId = params.get('hotelId') ? Number(params.get('hotelId')) : null;
                this.nights = Number(this.route.snapshot.paramMap.get('nights'));
                let userStr: string | null = null;
                if (typeof window !== 'undefined' && window.localStorage) {
                  userStr = localStorage.getItem('user');
                }
                if (userStr) {
                  this.user = JSON.parse(userStr);
                  this.fullName = this.user?.name ?? '';
                  this.email = this.user?.email ?? '';
                  this.mobile = this.user?.phoneNumber ?? '';
                  this.userId = typeof this.user?.userId === 'number'
                    ? this.user.userId
                    : Number(this.user?.userId) || null;
                }

                const userObs = this.userId ? this.userService.getUserById(this.userId) : null;
                const hotelObs = this.hotelId ? this.hotelService.getHotelById(this.hotelId) : null;

                if (userObs && hotelObs) {
                  forkJoin({
                    user: userObs,
                    hotel: hotelObs
                  }).subscribe({
                    next: ({ user, hotel }) => {
                      this.user = user;
                      this.fullName = user.name;
                      this.email = user.email;
                      this.mobile = user.phoneNumber;

                      this.hotel = hotel;
                      this.hotelName = hotel.name;
                      this.hotelAddress = hotel.address;
                      this.pricePerNight = hotel.pricePerNight ?? 0;
                      this.hotelImage = hotel.imageUrl ?? '';
                      this.hotelRating = hotel.rating ?? 0;

                      this.totalPrice = this.pricePerNight * (this.nights ?? 1);



                      this.isLoading = false;
                      this.cdr.detectChanges();
                    },
                    error: () => {
                      this.isLoading = false;
                      this.cdr.detectChanges();
                    }
                  });
                } else {
                  this.isLoading = false;
                  this.cdr.detectChanges();
                }
              });
            }



            payAtHotel(): void {
              if (this.user && this.roomId) {
                this.isLoading = true;
                const booking: BookingModel = {
                  user: this.user,
                  room: { roomId: this.roomId } as any,
                  checkInDate: this.checkInDate,
                  checkOutDate: this.checkOutDate,
                  noOfPersons: this.noOfPersons,
                  status: 'CONFIRMED'
                };

                this.bookingService.createBooking(booking).subscribe({
                  next: (createdBooking) => {
                    this.booking = createdBooking;
                    const payment: Payment = {
                      amount: this.totalPrice,
                      status: 'SUCCESS',
                      user: this.user!,
                      booking: createdBooking,
                      paymentMethod: 'Cash'
                    };
                    this.paymentService.createPayment(payment).subscribe({
                      next: () => {
                        this.isLoading = false;
                        this.successMessage = 'Booking successful! Payment recorded.';
                        this.cdr.detectChanges();
                      },
                      error: () => {
                        this.isLoading = false;
                        this.successMessage = 'Booking successful, but payment record failed.';
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

            payNow(): void {
              if (this.user && this.roomId) {
                this.isLoading = true;
                const booking: BookingModel = {
                  user: this.user,
                  room: { roomId: this.roomId } as any,
                  checkInDate: this.checkInDate,
                  checkOutDate: this.checkOutDate,
                  noOfPersons: this.noOfPersons,
                  status: 'PENDING'
                };

                this.bookingService.createBooking(booking).subscribe({
                  next: (createdBooking: BookingModel) => {
                    this.booking = createdBooking;
                    const options = {
                      key: 'rzp_test_0HKjRZLQpwbTL6', // Replace with your Razorpay key
                      amount: this.totalPrice * 100, // Razorpay expects amount in paise
                      currency: 'INR',
                      name: this.hotelName,
                      description: 'Hotel Booking Payment',
                      handler: (response: any) => {
                        this.createPaymentWithTransaction(response.razorpay_payment_id, createdBooking);
                      },
                      prefill: {
                        name: this.fullName,
                        email: this.email,
                        contact: this.mobile
                      },
                      theme: { color: '#3399cc' }
                    };
                    const rzp = new Razorpay(options);
                    rzp.open();
                    this.isLoading = false;
                  },
                  error: () => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                  }
                });
              }
            }

            createPaymentWithTransaction(transactionId: string, booking: BookingModel): void {
              this.isLoading = true;
              // Update booking status to CONFIRMED
              const updatedBooking: BookingModel = { ...booking, status: 'CONFIRMED' };
              this.bookingService.createBooking(updatedBooking).subscribe({
                next: (confirmedBooking) => {
                  // Create payment with transactionId
                  const payment: Payment = {
                    amount: this.totalPrice,
                    status: 'SUCCESS',
                    user: this.user!,
                    booking: confirmedBooking,
                    paymentMethod: 'RAZORPAY',
                    transactionId: transactionId
                  };
                  this.paymentService.createPayment(payment).subscribe({
                    next: () => {
                      this.isLoading = false;
                      this.successMessage = 'Booking and payment successful!';
                      this.cdr.detectChanges();
                    },
                    error: () => {
                      this.isLoading = false;
                      this.successMessage = 'Booking confirmed, but payment record failed.';
                      this.cdr.detectChanges();
                    }
                  });
                },
                error: () => {
                  this.isLoading = false;
                  this.successMessage = 'Payment received, but booking update failed.';
                  this.cdr.detectChanges();
                }
              });
            }
          }
