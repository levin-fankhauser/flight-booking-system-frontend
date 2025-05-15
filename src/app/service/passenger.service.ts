import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Passenger } from '../data/passenger';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  readonly backendUrl = 'passenger';

  constructor(private http: HttpClient) {}

  public getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(
      environment.backendBaseUrl + this.backendUrl
    );
  }

  public getPassenger(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`
    );
  }

  public updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(
      environment.backendBaseUrl + this.backendUrl + `/${passenger.id}`,
      passenger
    );
  }

  public savePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(
      environment.backendBaseUrl + this.backendUrl,
      passenger
    );
  }

  public deletePassenger(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`,
      { observe: 'response' }
    );
  }
}
