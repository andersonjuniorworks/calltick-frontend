import { Sector } from './../../models/sector.model';
import { Client } from './../../models/client.model';
import { SectorService } from './../../services/sector.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { Ticket } from './../../models/ticket.model';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  drawerVisible = false;

  initLoading = false; // bug
  loadingMore = true;

  page: number = 1;
  size: number = 5;
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

  finishForm: FormGroup;

  users: User[];
  userId: number;

  clients: Client[];

  sectors: Sector[];

  visible: boolean = false;

  periodControl = new FormControl();
  userControl = new FormControl();
  clientControl = new FormControl();
  sectorControl = new FormControl();

  //technicalReporter = new FormControl();

  constructor(
    private ticketService: TicketService,
    private msg: NzMessageService,
    private storage: StorageService,
    private userService: UserService,
    private clientService: ClientService,
    private sectorService: SectorService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.onCreateFinishForm();
    this.onVerifyProfile();
    this.onList();
    this.onListUser();
    this.onListClient();
    this.onListSector();
  }

  onCreateFinishForm() {
    this.finishForm = this.formBuilder.group({
      technicalReporter: [null, [Validators.required]],
    });
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

  onListByPeriod() {
    let date: any[];
    date = this.periodControl.value;
    let startDate = date[0];
    let endDate = date[1];
    console.log(
      `${startDate.toLocaleDateString()} 00:00`,
      `${endDate.toLocaleDateString()} 00:00`
    );
    this.ticketService
      .findByPeriod(
        `${startDate.toLocaleDateString()} 00:00`,
        `${endDate.toLocaleDateString()} 00:00`,
        '0',
        '50'
      )
      .subscribe((response) => {
        this.tickets = response.body;
      });
  }

  onListByUser() {

    let user: User;
    user = this.userControl.value;

    if(user) {
      this.ticketService
      .findAllByUser(`${user.id}`, `1`, `0`, `0`, `10000`)
      .subscribe((response) => {
        this.tickets = response.body;
      });
    }

  }

  onListByClient() {
    let client: Client;
    client = this.clientControl.value;

    if(client) {
      this.ticketService
      .findAllByClient(`${client.id}`, `1`, `0`, `0`, `10000`)
      .subscribe((response) => {
        this.tickets = response.body;
      });
    }

  }

  onListBySector() {
    let sector: Sector;
    sector = this.sectorControl.value;

    if(sector) {
      this.ticketService
      .findAllBySector(`${sector.id}`, `1`, `0`, `10000`)
      .subscribe((response) => {
        this.tickets = response.body;
      });
    }

  }

  onVerifyProfile() {
    this.userProfile = this.storage.getLocalUser().profile;
    this.userId = this.storage.getLocalUser().id;
  }

  onFinishTicket(ticket) {
    this.ticket = ticket;
    this.ticket.technicalReport =
      this.finishForm.get('technicalReporter').value;
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

  onListClient() {
    this.clientService.findCount().subscribe((count) => {
      this.clientService.findAll('0', `${count}`).subscribe((response) => {
        this.clients = response.body;
      });
    });
  }

  onListSector() {
    this.sectorService.findAll().subscribe((response) => {
      this.sectors = response.body;
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

  onFilter() {
    if (this.userControl.value != null && this.clientControl.value == null && this.sectorControl.value == null) {
      this.onListByUser();
    } else if(this.userControl.value == null && this.clientControl.value != null && this.sectorControl.value == null) {
      this.onListByClient();
    } else if(this.sectorControl.value != null && this.clientControl.value == null && this.userControl.value == null) {
      this.onListBySector();
    } else {
      this.onList();
    }
  }

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  open(): void {
    this.drawerVisible = true;
  }

  close(): void {
    this.drawerVisible = false;
  }
}
