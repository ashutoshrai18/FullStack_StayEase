import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {HotelService} from '../../../service/hotel-service';
import {HotelModel} from '../../../model/hotel/hotel-model';
import {Navbar} from '../navbar/navbar';
import {forkJoin} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-hotel-lists',
  templateUrl: './hotel-lists.html',
  styleUrls: ['./hotel-lists.css'],
  imports: [CommonModule, Navbar, RouterLink]
})
export class HotelListsComponent implements OnInit {
  hotels: HotelModel[] = [];
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
    console.log('Checking params:', address, roomType, numPersons); // Debug
    return (
      typeof address === 'string' && address.trim() !== '' &&
      typeof roomType === 'string' && roomType.trim() !== '' &&
      !isNaN(+numPersons) && +numPersons > 0
    );
  }

  loadSearchedHotels(): void {
    this.isLoading = true;
    const {address, roomType, numPersons} = this.searchParams;
    forkJoin({
      hotels: this.hotelService.advancedSearchHotels(
        address.trim(),
        roomType.trim(),
        +numPersons
      )
    }).subscribe({
      next: ({hotels}) => {
        this.hotels = hotels;
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
        this.hotels = hotels;
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
