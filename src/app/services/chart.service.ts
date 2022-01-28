import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private readonly API = `${environment.baseUrl}/charts`;

  constructor(private http: HttpClient) {}

  ticketByUser(startDate, endDate): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/ticketByUser`, {
        params: { startDate: startDate, endDate: endDate },
        observe: 'response',
      })
  }

  ticketBySector(startDate, endDate): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/ticketBySector`, {
        params: {startDate: startDate, endDate: endDate},
        observe: 'response',
      })
  }

  ticketByStatus(startDate, endDate): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/ticketByStatus`, {
        params: {startDate: startDate, endDate: endDate},
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.get('x-total-count')
        )
      );
  }

  clientByContract(): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/clientByContract`, {
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.get('x-total-count')
        )
      );
  }

}
