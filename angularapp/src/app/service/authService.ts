import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post('http://localhost:8081/api/users', user);
  }

  // Example login (if you have a login endpoint)
  login(credentials: any) {
    return this.http.post('http://localhost:8081/api/login', credentials);
  }
}