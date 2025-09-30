// src/app/service/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingModel } from '../model/booking/booking-model';
import {UserModel} from '../model/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.apiUrl);
  }

  getUserByBookingId(bookingId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${bookingId}/user`);
  }
  getBookingById(id: number): Observable<BookingModel> {
    return this.http.get<BookingModel>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: BookingModel): Observable<BookingModel> {
    return this.http.post<BookingModel>(this.apiUrl, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
