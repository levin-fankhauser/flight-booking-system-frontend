import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airplane } from '../data/airplane';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  readonly backendUrl = 'airplane';

  constructor(private http: HttpClient) {}

  public getAllAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(
      environment.backendBaseUrl + this.backendUrl
    );
  }

  public getAirplane(id: number): Observable<Airplane> {
    return this.http.get<Airplane>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`
    );
  }

  public updateAirplane(airplane: Airplane): Observable<Airplane> {
    return this.http.put<Airplane>(
      environment.backendBaseUrl + this.backendUrl + `/${airplane.id}`,
      airplane
    );
  }

  public saveAirplane(airplane: Airplane): Observable<Airplane> {
    return this.http.post<Airplane>(
      environment.backendBaseUrl + this.backendUrl,
      airplane
    );
  }

  public deleteAirplane(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(
      environment.backendBaseUrl + this.backendUrl + `/${id}`,
      { observe: 'response' }
    );
  }
}
