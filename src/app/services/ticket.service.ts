import { User } from './../models/user.model';
import { tap, take } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { Ticket } from './../models/ticket.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private readonly API = `${environment.baseUrl}/calls`;

  constructor(
    private http: HttpClient
  ) {}

  findAll(page: string, size: string): Observable<HttpResponse<Ticket[]>> {
    return this.http.get<Ticket[]>(`${this.API}/ordained?`, {
        params: { page: page, size: size },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount'),
        ),
      );
  }

  findAllParam(status: string, active: string, page: string, size: string): Observable<HttpResponse<Ticket[]>> {
    return this.http.get<Ticket[]>(`${this.API}/all?`, {
        params: { status: status, active: active, page: page, size: size },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount'),
        ),
      );
  }

  findAllByUser(user: string, status: string, active: string, page: string, size: string): Observable<HttpResponse<Ticket[]>> {
    return this.http.get<Ticket[]>(`${this.API}/user?`, {
        params: { user: user, status: status, active: active, page: page, size: size },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount'),
        ),
      );
  }

  findById(id) {
    return this.http.get<Ticket>(`${this.API}/${id}`).pipe(take(1));
  }

  findCount() {
    return this.http.get<number>(`${this.API}/count`).pipe(take(1));
  }

  countByUser(user: string, status: string) {
    return this.http.get<number>(`${this.API}/countByUser?`, {
      params: { user: user, status: status },
      observe: 'response',
    })
  }

  private insert(ticket) {
    return this.http.post(`${this.API}/insert`, ticket).pipe(take(1));
  }

  private update(ticket) {
    return this.http.put(`${this.API}/update/${ticket.id}`, ticket).pipe(take(1));
  }

  public notification() {
    return this.http.get(`http://187.19.165.178:5050/notify`).pipe(take(1));
  }

  public finish(ticket) {
    return this.http.put(`${this.API}/finish/${ticket.id}`, ticket).pipe(take(1));
  }

  public transfer(ticket) {
    return this.http.put(`${this.API}/transfer/${ticket.id}`, ticket).pipe(take(1));
  }

  save(ticket) {
    if (ticket.id) {
      return this.update(ticket);
    } else {
      return this.insert(ticket);
    }
  }

}
