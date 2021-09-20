import { TicketService } from './../../services/ticket.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientCount: number = 0;
  ticketCount: number = 0;
  ticketFinishCount: number = 0;
  ticketOpenedCount: number = 0;

  constructor(
    private clientService: ClientService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.onTicketCount();
    this.onTicketOpenedCount();
    this.onTicketFinishCount();
    this.onClientCount();
  }

  onClientCount() {
    this.clientService.findCount().subscribe((response) => {
      this.clientCount = response;
    })
  }

  onTicketCount() {
    this.ticketService.findCount().subscribe((response) => {
      this.ticketCount = response;
    })
  }

  onTicketFinishCount() {
    this.ticketService.findAllParam(`3`,`0`,`0`,`10000`).subscribe((response) => {
      this.ticketFinishCount = response.body.length;
    })
  }

  onTicketOpenedCount() {
    this.ticketService.findAllParam(`1`,`0`,`0`,`10000`).subscribe((response) => {
      this.ticketOpenedCount = response.body.length;
    })
  }

}
