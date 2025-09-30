import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import {ActivatedRoute, Router, NavigationEnd, RouterLink} from '@angular/router';
    import { HotelService } from '../../../service/hotel-service';
    import { forkJoin } from 'rxjs';
    import { filter } from 'rxjs/operators';
import {Footer} from '../footer/footer';

    @Component({
      selector: 'app-hotel-details',
      standalone: true,
      imports: [CommonModule, RouterLink, Footer],
      templateUrl: './hotel-details.html',
      styleUrls: ['./hotel-details.css']
    })
    export class HotelDetailsComponent implements OnInit {
      hotel: any = null;
      roomId: string | null = null;
      nights: string | null= null;

      isLoading = false;

      constructor(
        private route: ActivatedRoute,
        private hotelService: HotelService,
        private router: Router,
        private cdr: ChangeDetectorRef
      ) {}

      ngOnInit() {
        this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
            this.loadHotelDetails();
          });

        this.loadHotelDetails();
      }

      loadHotelDetails() {
        const hotelId = this.route.snapshot.paramMap.get('id');
        this.roomId = this.route.snapshot.paramMap.get('roomId');
        this.nights = this.route.snapshot.paramMap.get('nights');
        // alert(this.roomId);
        if (!hotelId) {
          this.hotel = null;
          this.cdr.detectChanges();
          return;
        }
        if (!this.roomId) {
          this.roomId = null;
          this.cdr.detectChanges();
          return;
        }
        this.isLoading = true;
        this.hotel = null;
        forkJoin({
          hotel: this.hotelService.getHotelById(Number(hotelId))
        }).subscribe({
          next: ({ hotel }) => {
            this.hotel = {
              ...hotel,
              images: hotel.imageUrl ? [hotel.imageUrl] : [],
            };
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    }
