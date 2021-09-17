import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Ticket } from './../../models/ticket.model';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  initLoading = false; // bug
  loadingMore = true;

  page: number = 1;
  size: number = 6;
  total: number;
  totalPages: number = 0;

  paginationDisable = false;

  userProfile: number;

  tickets: Ticket[];

  constructor(
    private ticketService: TicketService,
    private msg: NzMessageService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onList();
    this.onVerifyProfile();
  }

  onList() {
    this.ticketService.findAll(`${this.page-1}`,`${this.size}`).subscribe((response) => {
      this.tickets = response.body
      this.ticketService.findCount().subscribe((count) => {
        this.total = count;
        this.totalPages = this.size / count;
        this.totalPages = Math.ceil(this.totalPages)*10;
      })
    })
  }

  onVerifyProfile() {
    this.userProfile = this.storage.getLocalUser().profile;
  }

  onEdit(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  paginate(event) {
    this.page = event;
    this.onList();
  }

}
