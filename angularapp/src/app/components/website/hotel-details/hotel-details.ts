import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-details.html',
  styleUrls: ['./hotel-details.css']
})
export class HotelDetailsComponent {
  hotelId: string | null = null;
  hotelName: string | null = null;
  hotel = {
    name: 'Sample Hotel',
    location: 'Sample Location',
    image: 'assets/sample-hotel.jpg',
    rooms: 10,
    price: 2000
  };
  safeMapUrl = 'https://maps.google.com/...'; // Replace with actual map URL

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
      this.hotelName = params.get('name');
      // You can fetch hotel details using hotelId here
    });
  }
}
