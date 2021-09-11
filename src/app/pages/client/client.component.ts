import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
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
  sizePage: number = 5;

  listOfDisplayData: Client[];

  size: NzButtonSize = 'large';

  searchValue = '';
  searchValueFullname = '';
  visibleDoc = false;
  visibleName = false;

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

  reset(): void {
    this.searchValue = '';
    this.searchValueFullname = '';
    this.onList();
  }

  onList():void {
    this.clientService.findAll(`${this.page}`, `${this.sizePage}`).subscribe(response => {
      this.clients = response.body;
      this.listOfDisplayData = this.clients;
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

  searchByDoc(): void {
    this.visibleDoc = false;
    this.listOfDisplayData = this.clients.filter((item: Client) => item.cpfOrCnpj.indexOf(this.searchValue) !== -1);
  }

  searchByName(): void {
    this.visibleName = false;
    this.listOfDisplayData = this.clients.filter((item: Client) => item.fullname.indexOf(this.searchValueFullname) !== -1);
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

  teste() {
    alert('Deu certo!!!');
  }

}
