import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-details.html',
  styleUrls: ['./hotel-details.css']
})
export class HotelDetailsComponent {
  hotel = {
    name: 'Sample Hotel',
    location: 'Sample Location',
    image: 'assets/sample-hotel.jpg',
    rooms: 10,
    price: 2000
  };

  safeMapUrl = 'https://maps.google.com/...'; // Replace with actual map URL
}
