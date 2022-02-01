import { ChartService } from './../../services/chart.service';
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
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('chartTicketByUser', { static: true })
  chartTicketByUser: ElementRef;

  @ViewChild('chartTicketBySector', { static: true })
  chartTicketBySector: ElementRef;

  @ViewChild('chartTicketByStatus', { static: true })
  chartTicketByStatus: ElementRef;

  @ViewChild('chartClientByContract', { static: true })
  chartClientByContract: ElementRef;

  clientCount: number = 0;
  ticketCount: number = 0;
  ticketFinishCount: number = 0;
  ticketOpenedCount: number = 0;

  page: number = 1;
  size: number = 5;
  total: number;
  totalPages: number = 0;

  userProfile: number;

  ticket: Ticket;
  tickets: Ticket[];

  isVisible = false;
  isOkLoading = false;

  users: User[];
  sectors: Sector[];

  countTickets: number = 0;

  labels: any[] = [];
  dataByUser: any[] = [];
  dataBySector: any[] = [];
  dataByContract: any[] = [];
  dataByStatus: any[] = [];

  periodControl: any[];
  rangeProduct: any[];
  rangeTicketSector: any[];
  rangeTicketStatus: any[];

  constructor(
    private clientService: ClientService,
    private ticketService: TicketService,
    private userService: UserService,
    private storage: StorageService,
    private sectorService: SectorService,
    private chartService: ChartService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.onTicketCount();
    this.onTicketOpenedCount();
    this.onTicketFinishCount();
    this.onClientCount();
    //this.onTicketCountByUser();

  }

  ngAfterViewInit() {
    this.chartTicketUser();
    this.chartTicketSector();
    this.chartClientContract();
    this.chartTicketStatus();
  }

  chartTicketUser() {

    let startDate = null;
    let endDate = null;

    if (this.rangeProduct != null) {
      startDate = moment(this.rangeProduct[0]).format('yyyy-MM-DD');
      endDate = moment(this.rangeProduct[1]).format('yyyy-MM-DD');
    } else {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
    }

    this.chartService
      .ticketByUser(`${startDate}`, `${endDate}`)
      .subscribe((response) => {
        this.dataByUser = response.body;

        var billingChart = new Chart(this.chartTicketByUser.nativeElement, {
          type: 'bar',
          data: {
            labels: Object.keys(this.dataByUser),
            datasets: [
              {
                label: [],
                data: Object.values(this.dataByUser),
                backgroundColor: [
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            display: true,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            title: {
              display: true,
              text: 'Chamados por usuário',
            },
            legend: {
              display: false,
            },
            subtitle: {
              display: true,
              text: 'Chamados referente ao mês de Outubro',
            },
          },
        });
      });

    console.log('Data Inicial: ', startDate);
    console.log('Data Final: ', endDate);
    console.log('Dados: ', Object.values(this.dataByUser));
  }

  chartTicketSector() {

    let startDate = null;
    let endDate = null;

    if (this.rangeTicketSector != null) {
      startDate = moment(this.rangeTicketSector[0]).format('yyyy-MM-DD');
      endDate = moment(this.rangeTicketSector[1]).format('yyyy-MM-DD');
    } else {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
    }

    this.chartService.ticketBySector(`${startDate}`, `${endDate}`).subscribe((response) => {
      this.dataBySector = response.body;
      var chartTicketBySector = new Chart(
        this.chartTicketBySector.nativeElement,
        {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.dataBySector),
            datasets: [
              {
                data: Object.values(this.dataBySector),
                fill: false,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(201, 203, 207, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                ],
              },
            ],
          },
          options: {
            display: true,
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Chamados por setor',
            },
            legend: {
              display: true,
            },
          },
        }
      );
    });
  }

  chartTicketStatus() {

    let startDate = null;
    let endDate = null;

    if (this.rangeTicketStatus != null) {
      startDate = moment(this.rangeTicketStatus[0]).format('yyyy-MM-DD');
      endDate = moment(this.rangeTicketStatus[1]).format('yyyy-MM-DD');
    } else {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
    }

    this.chartService.ticketByStatus(`${startDate}`, `${endDate}`).subscribe((response) => {
      this.dataByStatus = response.body;
      var chartTicketByStatus = new Chart(
        this.chartTicketByStatus.nativeElement,
        {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.dataByStatus),
            datasets: [
              {
                data: Object.values(this.dataByStatus),
                fill: false,
                backgroundColor: ['#80CBC4', '#FFD54F', '#E53935'],
              },
            ],
          },
          options: {
            display: true,
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Chamados por Status',
            },
            legend: {
              display: true,
            },
          },
        }
      );
    });
  }

  chartClientContract() {
    this.chartService.clientByContract().subscribe((response) => {
      this.dataByContract = response.body;
      var chartClientByContract = new Chart(
        this.chartClientByContract.nativeElement,
        {
          type: 'bar',
          data: {
            labels: Object.keys(this.dataByContract),
            datasets: [
              {
                data: Object.values(this.dataByContract),
                fill: true,
                backgroundColor: [
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
              },
            ],
          },
          options: {
            display: true,
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Clientes por Contrato',
            },
            legend: {
              display: false,
            },
          },
        }
      );
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
    this.ticketService.countByStatus(`2`).subscribe((response) => {
      this.ticketFinishCount = response.body;
    });
  }

  onTicketOpenedCount() {
    this.ticketService.countByStatus(`1`).subscribe((response) => {
      this.ticketOpenedCount = response.body;
    });
  }

/*   onTicketCountByUser() {
    this.ticketService
      .countByUser(`2022-01-01`, `2022-01-31`)
      .subscribe((response) => {
        this.total = response.body;
      });
  }
 */
  onChangeDateChartUser(result): void {
    if (result) {
      this.rangeProduct = result;
      this.chartTicketUser();
    }
  }

  onChangeDateChartSector(result): void {
    if (result) {
      this.rangeTicketSector = result;
      this.chartTicketSector();
    }
  }

  onChangeDateChartStatus(result): void {
    if (result) {
      this.rangeTicketStatus = result;
      this.chartTicketStatus();
    }
  }

}
