export interface User {
  userId: number;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  bookings?: Booking[];
  reviews?: Review[];
  payments?: Payment[];
}

export interface Booking {
  // Define Booking properties here
}

export interface Review {
  // Define Review properties here
}

export interface Payment {
  // Define Payment properties here
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {

 }
