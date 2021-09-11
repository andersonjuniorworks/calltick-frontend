import { ClientService } from './../services/client.service';
import { Client } from './../models/client.model';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClientResolverGuard implements Resolve<Client> {

  constructor(private clientService: ClientService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {

    if (route.params && route.params["id"]) {
      return this.clientService.findById(route.params["id"]);
    }

    return of({
      id: null,
      type: null,
      cpfOrCnpj: null,
      fullname: null,
      nickname: null,
      zipcode: null,
      address: null,
      homeNumber: null,
      complement: null,
      city: null,
      state: null,
      phoneNumberOne: null,
      phoneNumberTwo: null,
      email: null,
      registrationDate: null,
    });

  }
}
