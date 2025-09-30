// src/app/service/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user/user-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/login`, { email, password });
  }

  getUserNameByEmail(email: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/by-email/${email}`);
  }

  getUserByName(name: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/by-name/${name}`);
  }

  getAllUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/all`);
  }

  getUsersBasedOnPage(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
