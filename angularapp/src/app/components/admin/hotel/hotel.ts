import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
            import { CommonModule } from '@angular/common';
            import { FormsModule } from '@angular/forms';
            import { HotelService } from '../../../service/hotel-service';
            import { HotelModel } from '../../../model/hotel/hotel-model';
            import { filter } from 'rxjs/operators';
            import { NavigationEnd, Router } from '@angular/router';

            declare var bootstrap: any;

            @Component({
              standalone: true,
              selector: 'app-hotel',
              templateUrl: './hotel.html',
              styleUrls: ['./hotel.css'],
              imports: [CommonModule, FormsModule]
            })
            export class Hotel implements OnInit {
              hotels: HotelModel[] = [];
              newHotel: HotelModel = {
                name: '',
                address: '',
                description: '',
                rating: 0,
                pricePerNight: 0,
                roomType: '',
                contactInfo: '',
                imageUrl: '',
                rooms: [],
                reviews: []
              };
              editingIndex: number | null = null;
              isLoading: boolean = false;
              selectedHotel: HotelModel | null = null;
              editHotelData: HotelModel | null = null;

              // Store modal instances
              showMoreModal: any;
              editHotelModal: any;
              addHotelModal: any;

              constructor(
                private hotelService: HotelService,
                private router: Router,
                private cdr: ChangeDetectorRef
              ) {}

              ngOnInit(): void {
                this.router.events
                  .pipe(filter(event => event instanceof NavigationEnd))
                  .subscribe(() => {
                    if (this.router.url === '/dashboard/hotels') {
                      this.loadHotels();
                    }
                  });
                this.loadHotels();

                // Initialize modal instances after view is loaded
                setTimeout(() => {
                  this.showMoreModal = new bootstrap.Modal(document.getElementById('showMoreModal'));
                  this.editHotelModal = new bootstrap.Modal(document.getElementById('editHotelModal'));
                  this.addHotelModal = new bootstrap.Modal(document.getElementById('addHotelModal'));
                }, 0);
              }

              loadHotels(): void {
                this.isLoading = true;
                this.hotelService.getAllHotels().subscribe(hotels => {
                  this.hotels = hotels;
                  this.isLoading = false;
                  this.cdr.detectChanges();
                });
              }

              addHotel(): void {
                if (this.editingIndex !== null) {
                  const hotelId = this.hotels[this.editingIndex].hotelId!;
                  this.hotelService.updateHotel(hotelId, this.newHotel).subscribe(updated => {
                    this.hotels[this.editingIndex!] = updated;
                    this.editingIndex = null;
                    this.newHotel = {
                      name: '',
                      address: '',
                      description: '',
                      rating: 0,
                      pricePerNight: 0,
                      roomType: '',
                      contactInfo: '',
                      imageUrl: '',
                      rooms: [],
                      reviews: []
                    };
                    this.closeModal('addHotelModal');
                  });
                } else {
                  this.hotelService.createHotel(this.newHotel).subscribe(created => {
                    this.hotels.push(created);
                    this.newHotel = {
                      name: '',
                      address: '',
                      description: '',
                      rating: 0,
                      pricePerNight: 0,
                      roomType: '',
                      contactInfo: '',
                      imageUrl: '',
                      rooms: [],
                      reviews: []
                    };
                    this.closeModal('addHotelModal');
                  });
                }
              }

              editHotel(index: number): void {
                this.editHotelData = { ...this.hotels[index] };
                this.editingIndex = index;
                if (this.editHotelModal) {
                  this.editHotelModal.show();
                }
              }

              updateHotel(): void {
                if (this.editingIndex !== null && this.editHotelData) {
                  const hotelId = this.hotels[this.editingIndex].hotelId!;
                  this.hotelService.updateHotel(hotelId, this.editHotelData).subscribe(updated => {
                    this.hotels[this.editingIndex!] = updated;
                    this.editHotelData = null;
                    this.editingIndex = null;
                    this.closeModal('editHotelModal');
                  });
                }
              }

              deleteHotel(index: number): void {
                const hotelId = this.hotels[index].hotelId!;
                this.hotelService.deleteHotel(hotelId).subscribe(() => {
                  this.loadHotels();
                });
              }

              showMore(index: number): void {
                this.selectedHotel = this.hotels[index];
                if (this.showMoreModal) {
                  this.showMoreModal.show();
                }
              }

              closeModal(modalId: string): void {
                if (modalId === 'showMoreModal' && this.showMoreModal) {
                  this.showMoreModal.hide();
                } else if (modalId === 'editHotelModal' && this.editHotelModal) {
                  this.editHotelModal.hide();
                } else if (modalId === 'addHotelModal' && this.addHotelModal) {
                  this.addHotelModal.hide();
                } else {
                  const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
                  if (modal) modal.hide();
                }
              }
            }
