import { Contract } from './../models/contract.model';
import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportClientService {
  private readonly API = `${environment.baseUrl}/clientReport/`;

  constructor(private http: HttpClient) {}

  public reportAll() {

    var mediaType = 'application/pdf';
    let today = new Date();
    let formatDate = (today.getDate() +'.'+ ((today.getMonth() + 1)) +'.'+ today.getFullYear());

    return this.http.get(`${this.API}`, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'clientes-'+formatDate+'.pdf');
      },
      (e) => {
        throwError(e);
      }
    );

  }

  public reportByCity(city: string) {

    var mediaType = 'application/pdf';
    let today = new Date();
    let formatDate = (today.getDate() +'.'+ ((today.getMonth() + 1)) +'.'+ today.getFullYear());

    return this.http.get(`${this.API}city?value=${city}`, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'clientes-'+city+'-'+formatDate+'.pdf');
      },
      (e) => {
        throwError(e);
      }
    );
  }

  public reportByContract(contract: Contract) {

    var mediaType = 'application/pdf';
    let today = new Date();
    let formatDate = (today.getDate() +'.'+ ((today.getMonth() + 1)) +'.'+ today.getFullYear());

    return this.http.get(`${this.API}contract?value=${contract.id}`, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'clientes-'+contract.description+'-'+formatDate+'.pdf');
      },
      (e) => {
        throwError(e);
      }
    );
  }


  public reportByCityAndContract(city: string, contract: Contract) {

    var mediaType = 'application/pdf';
    let today = new Date();
    let formatDate = (today.getDate() +'.'+ ((today.getMonth() + 1)) +'.'+ today.getFullYear());

    return this.http.get(`${this.API}filter?city=${city}&contract=${contract.id}`, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'clientes-'+city+'-'+contract.description+'-'+formatDate+'.pdf');
      },
      (e) => {
        throwError(e);
      }
    );
  }

}
