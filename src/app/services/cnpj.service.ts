import { take } from 'rxjs/operators';
import { Client } from './../models/client.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

constructor(
  private http: HttpClient
) { }

  findByCnpj(cnpj: string) {
    return this.http.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`).pipe(take(1));
  }

}
