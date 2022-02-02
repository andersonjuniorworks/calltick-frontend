import { StorageService } from './storage.service';
import { tap, take } from 'rxjs/operators';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.baseUrl}/users`;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  findAll(page: string, size: string): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(`${this.API}?`, {
        params: { page: page, size: size },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount')
        )
      );
  }

  findById(id) {
    return this.http.get<User>(`${this.API}/${id}`).pipe(take(1), tap(console.log));
  }

  findCount() {
    return this.http.get<number>(`${this.API}/count`).pipe(take(1));
  }

  findByFullname(value: string): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(`${this.API}/fullname?`, {
        params: { value: value },
        observe: 'response',
      })
      .pipe(
        tap((response) =>
          response.headers.getAll('x-limit, x-offset, x-totalCount')
        )
      );
  }

  findByEmail(email) {
    return this.http.get<User>(`${this.API}/email?value=${email}`).pipe(take(1));
  }

  login(user: User) {
    return this.http.get<User>(`${this.API}/login?email=${user.email}&password=${user.password}`).pipe(take(1));
  }

  public connected(user: string) {
    return this.http.get(`http://187.19.165.178:5050/connected`, {
      params: {user: user}
    }).pipe(take(1));
  }

  public disconnected(user: string) {
    return this.http.get(`http://187.19.165.178:5050/disconnect`, {
      params: {user: user}
    }).pipe(take(1));
  }

  public usersConnected() {
    return this.http.get(`http://187.19.165.178:5050/usersConnected`).pipe(take(1));
  }

  public getUsersConnected() {
    return this.http.get(`http://187.19.165.178:5050/getUsers`).pipe(take(1));
  }

  private insert(user) {
    return this.http.post(this.API, user).pipe(take(1));
  }

  private update(user) {
    return this.http.put(`${this.API}/${user.id}`, user).pipe(take(1));
  }

  save(user) {
    if (user.id) {
      return this.update(user);
    } else {
      return this.insert(user);
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
