import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../data/flight';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  readonly backendUrl = 'flight';

  constructor(private http: HttpClient) {}

  public getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      environment.backendBaseUrl + this.backendUrl
    );
  }

  public getFlight(id: number): Observable<Flight> {
    return this.http.get<Flight>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`
    );
  }

  public updateFlight(flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(
      environment.backendBaseUrl + this.backendUrl + `/${flight.id}`,
      flight
    );
  }

  public saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(
      environment.backendBaseUrl + this.backendUrl,
      flight
    );
  }

  public deleteFlight(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`,
      { observe: 'response' }
    );
  }
}
