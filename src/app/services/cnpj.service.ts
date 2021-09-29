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
    return this.http.get(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`).pipe(take(1));
  }

}
