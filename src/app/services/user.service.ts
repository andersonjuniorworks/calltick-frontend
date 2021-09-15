import { StorageService } from './storage.service';
import { tap, take } from 'rxjs/operators';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.http.get<User>(`${this.API}/${id}`).pipe(take(1));
  }

  login(user: User) {
    this.storage.setLocalUser(user);
    return this.http.get<User>(`${this.API}/login?email=${user.email}&password=${user.password}`).pipe(take(1));
  }

}
