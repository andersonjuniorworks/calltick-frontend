import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private readonly API = `${environment.baseUrl}/key`;

  constructor(private http: HttpClient) {}

  findKey(cnpj: string, monthAndYear: string) {
    return this.http.get<string>(`${this.API}?cnpj=${cnpj}&monthAndYear=${monthAndYear}`).pipe(take(1));
  }

}
