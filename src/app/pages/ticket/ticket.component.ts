import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Ticket } from './../../models/ticket.model';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
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

  ticket: Ticket;
  tickets: Ticket[];

  isVisible = false;
  isOkLoading = false;

  isVisibleShowTicket = false;
  isVisibleTransferModal = false;

  docTitle: string;
  fullnameTitle: string;
  nicknameTitle: string;

  responsible: string;
  newResponsible = new FormControl();

  users: User[];

  technicalReporter = new FormControl();

  constructor(
    private ticketService: TicketService,
    private msg: NzMessageService,
    private storage: StorageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.onList();
    this.onVerifyProfile();
    this.onListUser();
  }

  onList() {
    this.ticketService
      .findAll(`${this.page - 1}`, `${this.size}`)
      .subscribe((response) => {
        this.tickets = response.body;
        this.ticketService.findCount().subscribe((count) => {
          this.total = count;
          this.totalPages = this.total / this.size;
          this.totalPages = Math.ceil(this.totalPages) * 10;
          this.totalPages = this.totalPages / 2;
        });
      });
  }

  onVerifyProfile() {
    this.userProfile = this.storage.getLocalUser().profile;
  }

  onFinishTicket(ticket) {
    this.ticket = ticket;
    this.ticket.technicalReport = this.technicalReporter.value;
    this.ticket.closeBy = this.storage.getLocalUser().fullname.toString();
    this.ticketService.finish(this.ticket).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Chamado finalizado com sucesso!!!`
        );
        this.onList();
      },
      (error) => {
        let err = error;
        this.notification.create(
          'error',
          `ERRO ${err.error.status}`,
          `${err.error.message}`
        );
      }
    );
    this.handleCancel();
  }

  onEdit(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  paginate(event) {
    this.page = event;
    this.onList();
  }

  showModal(ticket): void {
    if (ticket.client.type == 1) {
      this.docTitle = 'CPF';
      this.fullnameTitle = 'Nome Completo';
      this.nicknameTitle = 'Apelido';
    } else {
      this.docTitle = 'CNPJ';
      this.fullnameTitle = 'Razão Social';
      this.nicknameTitle = 'Nome Fantasia';
    }
    this.ticket = ticket;
    this.isVisible = true;
  }

  showModalViewTicket(ticket): void {
    if (ticket.client.type == 1) {
      this.docTitle = 'CPF';
      this.fullnameTitle = 'Nome Completo';
      this.nicknameTitle = 'Apelido';
    } else {
      this.docTitle = 'CNPJ';
      this.fullnameTitle = 'Razão Social';
      this.nicknameTitle = 'Nome Fantasia';
    }
    this.ticket = ticket;
    this.isVisibleShowTicket = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCancelViewTicket() {
    this.isVisibleShowTicket = false;
  }

  showModalTransfer(data) {
    this.ticket = data;
    this.responsible = data.user.fullname;
    this.isVisibleTransferModal = true;
  }

  onListUser() {
    this.userService.findCount().subscribe((count) => {
      this.userService.findAll('0', `${count}`).subscribe((response) => {
        this.users = response.body;
      });
    });
  }

  onConfirmTransfer() {
    this.ticket.user = this.newResponsible.value;
    this.ticketService.transfer(this.ticket).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Chamado transferido com sucesso!!!`
        );
        this.onList();
      },
      (error) => {
        let err = error;
        this.notification.create(
          'error',
          `ERRO ${err.error.status}`,
          `${err.error.message}`
        );
      }
    );
    this.isVisibleTransferModal = false;
  }

  onCloseTransferModal() {
    this.isVisibleTransferModal = false;
  }

}
