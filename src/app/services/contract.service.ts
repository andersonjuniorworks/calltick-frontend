import { tap, take } from 'rxjs/operators';
import { Contract } from './../models/contract.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly API = `${environment.baseUrl}/contracts`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<Contract[]>> {
    return this.http
      .get<Contract[]>(`${this.API}?`, {
        observe: 'response',
      })
      .pipe(tap((response) => response.headers.get('x-total-count')));
  }

  findById(id) {
    return this.http.get<Contract>(`${this.API}/${id}`).pipe(take(1));
  }

  private insert(contract) {
    return this.http.post(this.API, contract).pipe(take(1));
  }

  private update(contract) {
    return this.http.put(`${this.API}/${contract.id}`, contract).pipe(take(1));
  }

  save(contract) {
    if (contract.id) {
      return this.update(contract);
    } else {
      return this.insert(contract);
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
