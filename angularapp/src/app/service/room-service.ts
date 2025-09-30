import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { RoomModel } from '../model/room/room-model';

    @Injectable({
      providedIn: 'root'
    })
    export class RoomService {
      private apiUrl = '/api/rooms';

      constructor(private http: HttpClient) {}

      getAllRooms(): Observable<RoomModel[]> {
        return this.http.get<RoomModel[]>(this.apiUrl);
      }

      getRoomById(id: number): Observable<RoomModel> {
        return this.http.get<RoomModel>(`${this.apiUrl}/${id}`);
      }

      createRoom(room: RoomModel): Observable<RoomModel> {
        return this.http.post<RoomModel>(this.apiUrl, room);
      }

      deleteRoom(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
    }
