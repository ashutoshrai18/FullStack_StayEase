// src/app/service/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = '/api/payments';

  constructor(private http: HttpClient) {}

  createPayment(id: number, details: string): Observable<void> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('details', details);
    return this.http.post<void>(this.apiUrl, null, { params });
  }

  getPayment(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}`);
  }
}