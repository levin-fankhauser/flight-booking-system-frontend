import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../data/booking';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingAdminService {
  readonly backendUrl = 'admin/booking';

  constructor(private http: HttpClient) {}

  public getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      environment.backendBaseUrl + this.backendUrl
    );
  }

  public getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`
    );
  }

  public updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(
      environment.backendBaseUrl + this.backendUrl + `/${booking.id}`,
      booking
    );
  }

  public saveBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(
      environment.backendBaseUrl + this.backendUrl,
      booking
    );
  }

  public deleteBooking(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`,
      { observe: 'response' }
    );
  }
}
