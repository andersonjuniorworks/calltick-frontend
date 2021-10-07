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

  ticketByUser(): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/ticketByUser`, {
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.get('x-total-count')
        )
      );
  }

  ticketBySector(): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any[]>(`${this.API}/ticketBySector`, {
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.get('x-total-count')
        )
      );
  }

}
