// src/app/service/hotel-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelModel } from '../model/hotel/hotel-model';
import {HotelWithRoomIds} from './HotelWithRoomIds';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiUrl = '/api/hotels';
  constructor(private http: HttpClient) {}

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

  searchHotels(query: string): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(`${this.apiUrl}/search`, {
      params: {q: query}
    });
  }

  // advancedSearchHotels(address: string, roomType: string, numPersons: number): Observable<HotelModel[]> {
  //   return this.http.get<HotelModel[]>(`${this.apiUrl}/search/advanced`, {
  //     params: {
  //       address,
  //       roomType,
  //       numPersons: numPersons.toString()
  //     }
  //   });
  // }

  // advancedSearchHotels(
  //   address: string,
  //   roomType: string,
  //   numPersons: number,
  //   checkInDate: string,
  //   checkOutDate: string
  // ): Observable<HotelModel[]> {
  //   return this.http.get<HotelModel[]>(`${this.apiUrl}/search/advanced`, {
  //     params: {
  //       address,
  //       roomType,
  //       numPersons: numPersons.toString(),
  //       checkInDate,
  //       checkOutDate
  //     }
  //   });
  // }

  advancedSearchHotels(
    address: string,
    roomType: string,
    numPersons: number,
    checkInDate: string,
    checkOutDate: string
  ): Observable<HotelWithRoomIds[]> {
    return this.http.get<HotelWithRoomIds[]>(`${this.apiUrl}/search/advanced`, {
      params: {
        address,
        roomType,
        numPersons: numPersons.toString(),
        checkInDate,
        checkOutDate
      }
    });
  }

  getHotelById(hotelId: number): Observable<HotelModel> {
    return this.http.get<HotelModel>(`${this.apiUrl}/${hotelId}`);
  }
}
