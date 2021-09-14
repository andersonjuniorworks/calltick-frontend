import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  page: number = 0;
  size: number = 5;

  loading = true;

  listOfDisplayData: Client[];

  searchValue = '';
  searchValueDocument = '';
  searchValueFullname = '';
  searchValueNickname = '';
  searchValueCity = '';

  visibleDoc = false;
  visibleName = false;
  visibleNickname = false;
  visibleCity = false;

  isVisible = false;
  isOkLoading = false;

  filterCity = [
    { text: 'Crateús', value: 'Crateús' },
    { text: 'Fortaleza', value: 'Fortaleza' }
  ];

  constructor(
    private modal: NzModalService,
    private clientService: ClientService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.onList();
  }

  onList():void {
    this.clientService.findAll(`${this.page}`, `${this.size}`).subscribe(response => {
      this.clients = response.body;
      this.listOfDisplayData = this.clients;
      this.loading = false;
    })
  }

  onEdit(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onDelete(value) {
    let client: Client = value;
    this.clientService.delete(client.id).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Cliente excluido com sucesso`
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
  }

  reset(): void {
    this.searchValue = '';
    this.searchValueFullname = '';
    this.searchValueNickname = '';
    this.searchValueCity = '';
    this.onList();
  }

  searchByDoc(): void {
    this.visibleDoc = false;
    this.clientService.findByDocument(this.searchValueDocument).subscribe((response) => {
      this.clients = response.body;
    })
  }

  searchByName(): void {
    this.visibleName = false;
    this.clientService.findByName(this.searchValueFullname).subscribe((response) => {
      this.clients = response.body;
    })
  }

  searchByNickname(): void {
    this.visibleNickname = false;
    this.clientService.findByNickname(this.searchValueNickname).subscribe((response) => {
      this.clients = response.body;
    })
  }

  searchByCity(): void {
    this.visibleCity = false;
    this.clientService.findByCity(this.searchValueCity).subscribe((response) => {
      this.clients = response.body;
    })
  }

  showDeleteConfirm(value): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este cliente?',
      nzContent: `<b style="color: red;">${value.fullname}</b>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(value) ,
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showModal(): void {
    this.isVisible = true;
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

}
