// src/app/service/hotel-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelModel } from '../model/hotel/hotel-model';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiUrl = '/api/hotels';

  getAllHotels(): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(this.apiUrl);
  }

  createHotel(hotel: HotelModel): Observable<HotelModel> {
    return this.http.post<HotelModel>(this.apiUrl, hotel);
  }

  updateHotel(hotelId: number, hotel: HotelModel): Observable<HotelModel> {
    return this.http.put<HotelModel>(`${this.apiUrl}/${hotelId}`, hotel);
  }

  deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${hotelId}`);
  }

  constructor(private http: HttpClient) {}
}
