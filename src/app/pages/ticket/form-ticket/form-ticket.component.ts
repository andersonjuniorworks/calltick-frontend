import { StorageService } from './../../../services/storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TicketService } from './../../../services/ticket.service';
import { Ticket } from './../../../models/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { SectorService } from './../../../services/sector.service';
import { Sector } from './../../../models/sector.model';
import { Client } from './../../../models/client.model';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css'],
})
export class FormTicketComponent implements OnInit {
  ticketForm: FormGroup;

  ticket: Ticket;

  clients: Client[];
  sectors: Sector[];
  users: User[];

  size: number;

  pageTitle: string;

  constructor(
    private clientService: ClientService,
    private sectorService: SectorService,
    private userService: UserService,
    private ticketService: TicketService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.ticket = this.route.snapshot.data['ticket'];
    this.onCreateForm();
    this.onListClient();
    this.onListSector();
    this.onListUser();
  }

  onCreateForm() {
    if (!this.ticket.id) {
      this.pageTitle = 'Adicionar Chamado';
      this.ticketForm = this.formBuilder.group({
        id: [this.ticket.id],
        client: [this.ticket.client, [Validators.required]],
        typeService: [this.ticket.typeService],
        sector: [this.ticket.sector, [Validators.required]],
        user: [this.ticket.user, [Validators.required]],
        subject: [this.ticket.subject, [Validators.required]],
        description: [this.ticket.description, [Validators.required]],
        openBy: [this.ticket.openBy],
        status: [this.ticket.status],
        openingDate: [this.ticket.openingDate]
      });
    } else {
      this.pageTitle = 'Editar Chamado';
      this.ticketForm = this.formBuilder.group({
        id: [this.ticket.id],
        client: [this.ticket.client.id, [Validators.required]],
        typeService: [this.ticket.typeService],
        sector: [this.ticket.sector.id, [Validators.required]],
        user: [this.ticket.user.id, [Validators.required]],
        subject: [this.ticket.subject, [Validators.required]],
        description: [this.ticket.description, [Validators.required]],
        openBy: [this.ticket.openBy],
        status: [this.ticket.status],
        openingDate: [this.ticket.openingDate]
      });
    }


  }

  onListClient() {
    this.clientService.findCount().subscribe((count) => {
      this.size = count;
      this.clientService.findAll('0', `${this.size}`).subscribe((response) => {
        this.clients = response.body;
      });
    });
  }

  onListSector() {
    this.sectorService.findAll().subscribe((response) => {
      this.sectors = response.body;
    });
  }

  onListUser() {
    this.userService.findCount().subscribe((count) => {
      this.userService.findAll('0', `${count}`).subscribe((response) => {
        this.users = response.body;
      });
    });
  }

  onSubmit() {

    this.clientService
      .findById(this.ticketForm.get('client').value)
      .subscribe((clientRes) => {
        this.ticketForm.patchValue({
          client: clientRes,
        });
        this.sectorService
          .findById(this.ticketForm.get('sector').value)
          .subscribe((sectorRes) => {
            this.ticketForm.patchValue({
              sector: sectorRes,
            });
            this.userService
            .findById(this.ticketForm.get('user').value)
            .subscribe((userRes) => {
              this.ticketForm.patchValue({
                user: userRes,
              });
              if (this.ticketForm.valid) {
                this.ticketForm.patchValue({
                  openBy: this.storageService.getLocalUser().fullname,
                });

                this.ticketService.save(this.ticketForm.value).subscribe(
                  (success) => {
                    if (this.ticket.id) {
                      this.onBackToLocation();
                      this.notification.create(
                        'success',
                        'SUCESSO!',
                        `Chamado atualizado com sucesso!!!`
                      );
                    } else {
                      this.onCreateForm();
                      this.ticketService.notification().subscribe();
                    }
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
              }
            });
          });
      });

  }

  onBackToLocation() {
    this.location.back();
  }

  onPlaySound() {
    let src = '../../../../assets/song/bell.wav';
    let audio = new Audio(src);
    audio.play();
  }
}
