import { Client } from './../models/client.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, take, tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API = `${environment.baseUrl}/clients`;

  constructor(private http: HttpClient) {}

  findAll(
    page: string,
    size: string
  ): Observable<HttpResponse<Client[]>> {
    return this.http
      .get<Client[]>(`${this.API}?`, {
        params: { "page": page, "size": size },
        observe: "response",
      })
      .pipe(
        tap((response) => response.headers.getAll("x-limit, x-offset, x-totalCount")
        )
      );
  }

  findById(id) {
    return this.http.get<Client>(`${this.API}/${id}`).pipe(take(1));
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
    }),
  };
}
