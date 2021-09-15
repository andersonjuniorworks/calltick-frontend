import { Ticket } from './../../models/ticket.model';
import { TicketService } from './../../services/ticket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  initLoading = false; // bug
  loadingMore = true;

  page: number = 0;
  size: number = 10;

  tickets: Ticket[];

  constructor(
    private ticketService: TicketService,
    private msg: NzMessageService) { }

  ngOnInit() {
    this.onList();
  }

  onList() {
    this.ticketService.findAll(`${this.page}`,`${this.size}`).subscribe((response) => {
      this.tickets = response.body
      console.log(this.tickets)
    })
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }

}
