import { TicketService } from './../services/ticket.service';
import { Ticket } from './../models/ticket.model';
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TicketResolverGuard implements Resolve<Ticket> {

  ticket: Ticket;

  constructor(private ticketService: TicketService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket> {

    if (route.params && route.params["id"]) {
      return this.ticketService.findById(route.params["id"]);
    }

    return of({
      ...this.ticket
    });

  }
}
