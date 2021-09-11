import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
  cpfOrCnpj: string;
  fullname: string;
  nickname: string;
  contact: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private modal: NzModalService) { }

  ngOnInit() {
  }

  size: NzButtonSize = 'large';

  searchValue = '';
  searchValueFullname = '';
  visibleDoc = false;
  visibleName = false;

  listOfData: DataItem[] = [
    {
      cpfOrCnpj: '071.156.213-06',
      fullname: 'Antonio Anderson Vieira do Nascimento Júnior',
      nickname: 'Anderson Júnior',
      contact: '(88) 9 9435-4507'
    },
    {
      cpfOrCnpj: '071.156.213-06',
      fullname: 'Antonio Anderson Vieira do Nascimento Júnior',
      nickname: 'Anderson Júnior',
      contact: '(88) 9 9435-4507'
    },
    {
      cpfOrCnpj: '071.156.213-06',
      fullname: 'Antonio Anderson Vieira do Nascimento Júnior',
      nickname: 'Anderson Júnior',
      contact: '(88) 9 9435-4507'
    },
    {
      cpfOrCnpj: '071.156.213-06',
      fullname: 'Antonio Anderson Vieira do Nascimento Júnior',
      nickname: 'Anderson Júnior',
      contact: '(88) 9 9435-4507'
    },
  ];

  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.searchValueFullname = '';
    this.onList();
  }

  onList():void {
    this.listOfDisplayData = this.listOfData;
  }

  searchByDoc(): void {
    this.visibleDoc = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.cpfOrCnpj.indexOf(this.searchValue) !== -1);
  }

  searchByName(): void {
    this.visibleName = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.fullname.indexOf(this.searchValueFullname) !== -1);
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => console.log('OK')
    });
  }

  showDeleteConfirm(value): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este cliente?',
      nzContent: `<b style="color: red;">${value}</b>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
