import { WebSocketService } from './../../services/websocket.service';
import { Status } from './../../models/status.model';
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
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { ClientService } from 'src/app/services/client.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CommentService } from '../../services/comment.service';
import { NzSafeNullPipe } from 'ng-zorro-antd/pipes';
import { Ticket } from '../../models/ticket.model';

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

  status: Status[] = [
    { id: 1, description: 'Aberto' },
    { id: 2, description: 'Finalizado' },
    { id: 3, description: 'Cancelado' },
  ];

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
  userId: number;

  clients: Client[];

  sectors: Sector[];

  visible: boolean = false;

  filterForm: FormGroup;

  periodControl = new FormControl();
  userControl = new FormControl();
  clientControl = new FormControl();
  sectorControl = new FormControl();

  totalCount: string[];

  public eventEmit = new EventEmitter<boolean>();

  usersOnline: any[];

  stompClient = this.webSocketService.connect();

  comments: any[];

  commentForm: FormGroup;
  finishForm: FormGroup;

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
    private formBuilder: FormBuilder,
    private webSocketService: WebSocketService,
    private commentService: CommentService
  ) {
    this.stompClient.connect({}, (frame) => {
      this.stompClient.disconnect;
      this.stompClient.subscribe('/topic/tickets', (response) => {
        this.onList();
      });
    });
  }

  ngOnInit() {
    this.onCreateCommentForm();
    this.onCreateFinishForm();
    this.onCreateFilterForm();
    this.onVerifyProfile();
    this.onList();
    this.onListUser();
    this.onListClient();
    this.onListSector();
    this.onListUsersOnline();
  }

  onOpenAddTicket() {
    this.router.navigate(['add'], {
      relativeTo: this.route,
      state: { userOn: this.usersOnline },
    });
  }

  onListUsersOnline() {
    this.userService.usersConnected().subscribe((response) => {
      this.usersOnline = Object.values(response);
    });
  }

  onCreateFinishForm() {
    this.finishForm = this.formBuilder.group({
      technicalReporter: [''],
    });
  }

  onCreateFilterForm() {
    this.filterForm = this.formBuilder.group({
      statusFilter: [null, Validators.required],
      userFilter: null,
      clientFilter: null,
      sectorFilter: null,
    });
  }

  onCreateCommentForm() {
    this.commentForm = this.formBuilder.group({
      id: null,
      content: [null, Validators.required],
      called: null,
      user: null,
      createdAt: new Date(),
    });
  }

  onList() {
    this.ticketService
      .findAll(`${this.page - 1}`, `${this.size}`)
      .subscribe((response) => {
        this.tickets = response.body;

        this.eventEmit.emit(true);

        this.ticketService.findCount().subscribe((count) => {
          this.total = count;
          this.totalPages = this.total / this.size;
          this.totalPages = Math.ceil(this.totalPages) * 10;
          this.totalPages = this.totalPages / 2;
        });
      });
  }

  onListByFilter() {
    let user = this.filterForm.get('userFilter').value;
    let client = this.filterForm.get('clientFilter').value;
    let sector = this.filterForm.get('sectorFilter').value;
    let status = this.filterForm.get('statusFilter').value;

    let date: any[] = this.periodControl.value;

    let startDate = null;
    let endDate = null;

    if (date != null) {
      startDate = date[0];
      endDate = date[1];
      startDate = moment(startDate).format('yyyy-MM-DD');
      endDate = moment(endDate).format('yyyy-MM-DD');
    }

    this.ticketService
      .findByFilter(
        `${status}`,
        `${client}`,
        `${user}`,
        `${sector}`,
        `${startDate}`,
        `${endDate}`
      )
      .subscribe((response) => {
        this.tickets = response.body;
      });
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

    this.ticketService.getTickets().subscribe(() => {});

    this.ticketService.finish(this.ticket).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Chamado finalizado com sucesso!!!`
        );
        this.ticketService.getTickets().subscribe(() => {});
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
    this.router.navigate(['edit', id], {
      relativeTo: this.route,
      state: { userOn: this.usersOnline },
    });
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
    this.onListCommentsByTicket(ticket.id);

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

  open(): void {
    this.drawerVisible = true;
  }

  close(): void {
    this.drawerVisible = false;
  }

  clearFilterFields(): void {
    this.filterForm.patchValue({
      statusFilter: null,
      userFilter: null,
      clientFilter: null,
      sectorFilter: null,
    });
    this.onList();
  }

  addComment() {
    this.commentForm.patchValue({
      id: null,
      called: this.ticket,
      user: this.storage.getLocalUser(),
      createdAt: new Date(),
    });
    this.commentService.insert(this.commentForm.value).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Comentário adicionado com sucesso!`
        );
        this.onListCommentsByTicket(this.ticket.id);
        this.onCreateCommentForm();
      },
      (err) => {
        this.notification.create(
          'error',
          'ERRO!',
          `Erro ao adicionar comentário!`
        );
      }
    );
  }

  onListCommentsByTicket(ticket) {
    this.commentService.findByTicket(ticket).subscribe((response) => {
      this.comments = response;
    });
  }

}
