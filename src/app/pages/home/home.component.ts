import { Sector } from './../../models/sector.model';
import { SectorService } from './../../services/sector.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './../../services/user.service';
import { StorageService } from './../../services/storage.service';
import { User } from './../../models/user.model';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Ticket } from './../../models/ticket.model';
import { TicketService } from './../../services/ticket.service';
import { ClientService } from './../../services/client.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  public type: any;
  public data: any;
  public options: any;

  @ViewChild('chartTicketByUser', { static: true })
  chartTicketByUser: ElementRef;

  @ViewChild('chartTicketBySector', { static: true })
  chartTicketBySector: ElementRef;

  clientCount: number = 0;
  ticketCount: number = 0;
  ticketFinishCount: number = 0;
  ticketOpenedCount: number = 0;

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

  users: User[];
  sectors: Sector[];

  technicalReporter = new FormControl();

  countTickets: number = 0;

  finishForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private ticketService: TicketService,
    private userService: UserService,
    private storage: StorageService,
    private sectorService: SectorService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.onCreateFinishForm();
    this.onVerifyUser();
    this.onTicketCount();
    this.onTicketOpenedCount();
    this.onTicketFinishCount();
    this.onClientCount();
    this.onTicketCountByUser();
  }

  ngAfterViewInit() {
    this.chartTicketUser();
    this.chartTicketSector();
  }

  chartTicketUser() {
    var billingChart = new Chart(this.chartTicketByUser.nativeElement, {
      type: 'bar',
      labels: ['Anderson Júnior', 'Neto Araújo', 'Lucas Pereira'],
      data: {
        labels: ['Anderson Júnior', 'Neto Araújo', 'Lucas Pereira'],
        datasets: [
          {
            label: 'Nº de Chamados',
            data: [14, 17, 8],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  chartTicketSector() {
    let labels: any[] = [];
    let ticketBySector: any[] = [];

    this.sectorService.findAll().subscribe((response) => {
      this.sectors = response.body;

      for (let i = 0; i < this.sectors.length; i++) {
        labels.push([this.sectors[i].description]);
        this.ticketService
          .findAllBySector(`${this.sectors[i].id}`, `3`, `0`, `10000`)
          .subscribe((responseSector) => {
            ticketBySector.push([responseSector.body.length]);
          });
      }
    });

    console.log(labels)
    console.log(ticketBySector)

    var chartTicketBySector = new Chart(
      this.chartTicketBySector.nativeElement,
      {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [...ticketBySector],
              fill: false,
              backgroundColor: [
                '#ffb74d',
                '#c8e6c9',
                '#81d4fa',
                '#7b1fa2',
              ],
            },
          ],
          labels: [...labels],
        },
        options: {
          display: false,
          responsive: true,
          maintainAspectRatio: false,
        },
      }
    );

  }

  onCreateFinishForm() {
    this.finishForm = this.formBuilder.group({
      technicalReporter: [null, [Validators.required]],
    });
  }

  onClientCount() {
    this.clientService.findCount().subscribe((response) => {
      this.clientCount = response;
    });
  }

  onTicketCount() {
    this.ticketService.findCount().subscribe((response) => {
      this.ticketCount = response;
    });
  }

  onTicketFinishCount() {
    this.ticketService
      .findAllParam(`3`, `0`, `0`, `10000`)
      .subscribe((response) => {
        this.ticketFinishCount = response.body.length;
      });
  }

  onTicketOpenedCount() {
    this.ticketService
      .findAllParam(`1`, `0`, `0`, `10000`)
      .subscribe((response) => {
        this.ticketOpenedCount = response.body.length;
      });
  }

  onTicketCountByUser() {
    this.ticketService
      .countByUser(`${this.userProfile}`, `1`)
      .subscribe((response) => {
        this.total = response.body;
        this.ticketService
          .findAllByUser(
            `${this.userProfile}`,
            `1`,
            `0`,
            `${this.page - 1}`,
            `${this.size}`
          )
          .subscribe((response2) => {
            this.tickets = response2.body;
            this.totalPages = this.total / this.size;
            this.totalPages = Math.ceil(this.totalPages) * 10;
            this.totalPages = this.totalPages / 2;
          });
      });
  }

  onVerifyUser() {
    this.userProfile = this.storage.getLocalUser().id;
  }

  paginate(event) {
    this.page = event;
    this.onTicketCountByUser();
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
        this.onTicketCountByUser();
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
    this.router.navigate(['ticket/edit', id], { relativeTo: this.route });
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
        this.onTicketCountByUser();
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
