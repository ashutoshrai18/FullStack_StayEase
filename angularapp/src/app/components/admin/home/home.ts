import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../../service/booking-service';
import {PaymentService} from '../../../service/payment-service';
import {HotelService} from '../../../service/hotel-service';
import {UserService} from '../../../service/user-service';
import {CommonModule} from '@angular/common';
import {Router, NavigationEnd, RouterLink} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ChangeDetectorRef} from '@angular/core';
import {forkJoin} from 'rxjs';
import {NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxChartsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  isLoading = true;
  bookingsCount: number | null = null;
  paymentsTotal: number | null = null;
  usersCount: number | null = null;
  hotelsCount: number | null = null;
  recentUsers: any[] = [];
  bookingTrends: any[] = [];

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14']
  };

  constructor(
    private bookingData: BookingService,
    private paymentD: PaymentService,
    private hotelD: HotelService,
    private userD: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/dashboard/home') {
          this.loadDashboardData();
        }
      });
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    forkJoin([
      this.bookingData.getAllBookings(),
      this.paymentD.getAllPayment(),
      this.userD.getAllUser(),
      this.hotelD.getAllHotels()
    ]).subscribe(
      ([bookings, payments, users, hotels]: [any[], any[], any[], any[]]) => {
        this.bookingsCount = bookings.length;
        this.paymentsTotal = payments.reduce((sum: number, p: any) => sum + p.amount, 0);
        this.usersCount = users.length;
        this.hotelsCount = hotels.length;
        this.recentUsers = users.slice(-5).reverse();


        const monthlyCounts: { [key: string]: number } = {};
        bookings.forEach((b: any) => {
          const date = new Date(b.checkInDate);
          const month = date.toLocaleString('default', {month: 'short'});
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });
        this.bookingTrends = [
          {
            name: 'Bookings',
            series: Object.keys(monthlyCounts).map(month => ({
              name: month,
              value: monthlyCounts[month]
            }))
          }
        ];

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
