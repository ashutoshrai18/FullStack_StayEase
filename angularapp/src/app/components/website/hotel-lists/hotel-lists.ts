import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
        import { CommonModule } from '@angular/common';
        import { FormsModule } from '@angular/forms';
        import { Navbar } from '../navbar/navbar';

        @Component({
          selector: 'app-hotel-lists',
          templateUrl: './hotel-lists.html',
          styleUrls: ['./hotel-lists.css'],
          imports: [CommonModule, FormsModule, Navbar,RouterLink]
        })
        export class HotelListsComponent {
          hotels = [
            {
              id: 1,
              name: 'Hotel Sunshine',
              location: 'Mumbai',
              price: 3500,
              image: 'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              rooms: 2
            },
            {
              id: 2,
              name: 'Hotel Sunshine',
              location: 'Mumbai',
              price: 3500,
              image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              rooms: 2
            },
            {
              id: 3,
              name: 'Sea View Resort',
              location: 'Goa',
              price: 4200,
              image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              rooms: 3
            },
            {
              id: 4,
              name: 'Mountain Retreat',
              location: 'Manali',
              price: 2800,
              image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              rooms: 1
            }
            // Add more hotels as needed
          ];
        }
