import { tap, take } from 'rxjs/operators';
import { Sector } from './../models/sector.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  private readonly API = `${environment.baseUrl}/sectors`;

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<HttpResponse<Sector[]>> {
    return this.http
      .get<Sector[]>(`${this.API}`, {
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount')
        )
      );
  }

  findById(id) {
    return this.http.get<Sector>(`${this.API}/${id}`).pipe(take(1));
  }

  findByDescription(value: string): Observable<HttpResponse<Sector[]>> {
    return this.http
      .get<Sector[]>(`${this.API}/description?`, {
        params: { value: value },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount')
        )
      );
  }


  private insert(sector) {
    return this.http.post(this.API, sector).pipe(take(1));
  }

  private update(sector) {
    return this.http.put(`${this.API}/${sector.id}`, sector).pipe(take(1));
  }

  save(sector) {
    if (sector.id) {
      return this.update(sector);
    } else {
      return this.insert(sector);
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
