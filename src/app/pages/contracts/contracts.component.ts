import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContractService } from './../../services/contract.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contract } from './../../models/contract.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contract: Contract;
  contracts: Contract[];

  loading = true;
  visibleDescription = false;

  listOfDisplayData: Contract[];

  searchValue = '';

  isVisible = false;
  isOkLoading = false;

  contractForm: FormGroup;

  titleModal: string;

  constructor(
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.onCreateForm();
    this.onList();
  }

  onCreateForm() {
    this.contractForm = this.formBuilder.group({
      id: [null],
      description: [null, [Validators.required]],
      price: [null]
    });
  }

  onList(): void {
    this.contractService.findAll().subscribe((response) => {
      this.contracts = response.body;
      this.listOfDisplayData = this.contracts;
      this.loading = false;
    });
    console.log(this.contracts);
  }

  onSubmit() {
    let msgSuccess = 'Contrato cadastrado com sucesso!!!';

    if (this.contractForm.value.id) {
      msgSuccess = 'Contrato atualizado com sucesso!!!';
    }

    this.contractService.save(this.contractForm.value).subscribe(
      (success) => {
        this.notification.create('success', 'SUCESSO!', `${msgSuccess}`);
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

  onDelete(value) {
    let contract: Contract = value;
    this.contractService.delete(contract.id).subscribe(
      (success) => {
        this.notification.create(
          'success',
          'SUCESSO!',
          `Contrato excluido com sucesso`
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

  onAdd() {
    this.titleModal = 'Cadastrar Contrato';
    this.showModal(null);
  }

  onEdit(id) {
    this.contractService.findById(id).subscribe((response) => {
      this.contract = response;
      this.showModal(this.contract);
    });
    this.titleModal = 'Editar Contrato';
  }

  showDeleteConfirm(value): void {
    this.modal.confirm({
      nzTitle: 'Deseja realmente excluir este contrato?',
      nzContent: `<b style="color: red;">${value.description}</b>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(value),
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  reset(): void {
    this.searchValue = '';
    this.onList();
  }

  showModal(value): void {
    if(!value) {
      this.onCreateForm();
    } else {
      this.contractForm.patchValue({
        id: value.id,
        description: value.description,
        price: value.price
      });
    }
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
    console.log('TESTE');
  }
}
