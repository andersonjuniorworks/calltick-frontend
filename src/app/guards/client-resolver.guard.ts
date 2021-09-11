import { Client } from './../models/client.model';
import { ClientService } from './../services/client.service';
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

  client: Client;

  constructor(private clientService: ClientService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {

    if (route.params && route.params["id"]) {
      return this.clientService.findById(route.params["id"]);
    }

    return of({
      ...this.client
    });

  }
}
