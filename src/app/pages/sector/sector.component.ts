import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SectorService } from './../../services/sector.service';
import { Sector } from './../../models/sector.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
})
export class SectorComponent implements OnInit {
  sector: Sector;
  sectors: Sector[];

  loading = true;
  visibleDescription = false;

  listOfDisplayData: Sector[];

  searchValue = '';

  isVisible = false;
  isOkLoading = false;

  sectorForm: FormGroup;

  constructor(
    private sectorService: SectorService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.onList();
    this.onCreateForm();
  }

  onCreateForm() {
    this.sectorForm = this.formBuilder.group({
      id: null,
      description: null,
    });
  }

  onList(): void {
    this.sectorService.findAll().subscribe((response) => {
      this.sectors = response.body;
      this.listOfDisplayData = this.sectors;
      this.loading = false;
    });
    console.log(this.sectors);
  }

  onSubmit() {

    let msgSuccess = 'Setor cadastrado com sucesso!!!';

    if (this.sectorForm.value.id) {
      msgSuccess = 'Setor atualizado com sucesso!!!';
    }

    this.sectorService.save(this.sectorForm.value).subscribe(
      (success) => {
        this.notification.create('success', 'SUCESSO!', `${msgSuccess}`);
        this.onCreateForm();
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
    this.onList();
  }

  onDelete(value) {
    let sector: Sector = value;
    this.sectorService.delete(sector.id).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Setor excluido com sucesso`
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

  showDeleteConfirm(value): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este setor?',
      nzContent: `<b style="color: red;">${value.description}</b>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(value) ,
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  searchByDescription(): void {
    this.visibleDescription = false;
    this.sectorService
      .findByDescription(this.searchValue)
      .subscribe((response) => {
        this.sectors = response.body;
      });
  }

  reset(): void {
    this.searchValue = '';
    this.onList();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.onSubmit();
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
