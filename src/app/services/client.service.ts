import { Client } from './../models/client.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API = `${environment.baseUrl}/clients`;

  constructor(private http: HttpClient) {}

  findAll(page: string, size: string): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}?`, {
        params: { page: page, size: size },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.get('x-total-count')
        )
      );
  }

  findById(id) {
    return this.http.get<Client>(`${this.API}/${id}`).pipe(take(1));
  }

  findCount() {
    return this.http.get<number>(`${this.API}/count`).pipe(take(1));
  }

  findByDocument(document: string): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}/filter?`, {
        params: { document: document },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-total-count')
        )
      );
  }

  findByFullname(fullname: string): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}/filter?`, {
        params: { fullname: fullname },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-total-count')
        )
      );
  }

  findByNickname(nickname: string): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}/filter?`, {
        params: { nickname: nickname },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-total-count')
        )
      );
  }

  findByCity(city: string): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}/filter?`, {
        params: { city: city },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-total-count')
        )
      );
  }

  private insert(client) {
    return this.http.post(this.API, client).pipe(take(1));
  }

  private update(client) {
    return this.http.put(`${this.API}/${client.id}`, client).pipe(take(1));
  }

  save(client) {
    if (client.id) {
      return this.update(client);
    } else {
      return this.insert(client);
    }
  }

  delete(id) {
    return this.http.delete(`${this.API}/${id}`, id).pipe(take(1));
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-total-count': 'application/json',
    }),
  };
}
