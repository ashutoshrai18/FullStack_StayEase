// src/app/components/website/hotel-lists/hotel-lists.ts
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {HotelService} from '../../../service/hotel-service';
import {Navbar} from '../navbar/navbar';
import {forkJoin} from 'rxjs';
import {HotelWithRoomIds} from '../../../service/HotelWithRoomIds';

@Component({
  standalone: true,
  selector: 'app-hotel-lists',
  templateUrl: './hotel-lists.html',
  styleUrls: ['./hotel-lists.css'],
  imports: [CommonModule, Navbar, RouterLink]
})
export class HotelListsComponent implements OnInit {
  hotels: HotelWithRoomIds[] = [];
  userId: string = 'current-user-id';
  searchParams: any = {};
  isLoading: boolean = false;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      if (this.hasValidSearchParams()) {
        this.loadSearchedHotels();
      } else {
        this.loadAllHotels();
      }
    });
  }



  hasValidSearchParams(): boolean {
    const {address, roomType, numPersons} = this.searchParams;
    return (
      typeof address === 'string' && address.trim() !== '' &&
      typeof roomType === 'string' && roomType.trim() !== '' &&
      !isNaN(+numPersons) && +numPersons > 0
    );
  }

  loadSearchedHotels(): void {
    this.isLoading = true;
    const {address, roomType, numPersons, checkIn, checkOut} = this.searchParams;
    forkJoin({
      hotels: this.hotelService.advancedSearchHotels(
        address.trim(),
        roomType.trim(),
        +numPersons,
        checkIn ? checkIn.trim() : '',
        checkOut ? checkOut.trim() : ''
      )
    }).subscribe({
      next: ({hotels}) => {
        console.log('Searched hotels:', hotels);
        this.hotels = hotels; // Use hotel and availableRoomIds directly
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hotels = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadAllHotels(): void {
    this.isLoading = true;
    forkJoin({
      hotels: this.hotelService.getAllHotels()
    }).subscribe({
      next: ({hotels}) => {
        this.hotels = hotels.map(hotel => ({
          hotel,
          availableRoomIds: []
        }));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hotels = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
