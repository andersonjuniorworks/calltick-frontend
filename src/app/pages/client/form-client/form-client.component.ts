import { Contract } from './../../../models/contract.model';
import { ContractService } from './../../../services/contract.service';
import { SectorService } from './../../../services/sector.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from './../../../services/client.service';
import { Client } from './../../../models/client.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

  clientType = new FormControl();

  formClient: FormGroup;

  client: Client;

  titleForm: string;

  labelDoc = 'CPF';
  labelFullname = 'Nome Completo';
  labelNickname = 'Apelido';

  contracts: Contract[];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private notification: NzNotificationService,
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.client = this.route.snapshot.data["client"];

    if(this.client.id == null) {
      this.titleForm = 'Cadastro de Cliente';
    } else {
      this.titleForm = 'Edição de Cliente';
    }

    this.onCreateForm();
    this.onReadContracts();
    this.onPopulateContract();
  }

  onCreateForm() {
    this.formClient = this.formBuilder.group({
      id: this.client.id,
      type: [this.client.type],
      document: [this.client.document, [Validators.required, Validators.minLength(11), Validators.maxLength(18)]],
      stateRegistration: [this.client.stateRegistration],
      fullname: [this.client.fullname, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      nickname: this.client.nickname,
      zipcode: this.client.zipcode,
      address: this.client.address,
      homeNumber: this.client.homeNumber,
      complement: this.client.complement,
      neighborhood: this.client.neighborhood,
      state: [this.client.state, [Validators.required]],
      city: [this.client.city, [Validators.required]],
      phoneNumberOne: [this.client.phoneNumberOne, [Validators.required]],
      phoneNumberTwo: this.client.phoneNumberTwo,
      email: [this.client.email, [Validators.email]],
      contract: [null]
    })

    if(this.client.id != null) {
      this.formClient.get('type').disable();
      this.formClient.get('document').disable();
      this.formClient.patchValue({
        contract: this.client.contract.id
      })
    }

    if(this.client.type == 2) {
      this.labelDoc = 'CNPJ';
      this.labelFullname = 'Razão Social';
      this.labelNickname = 'Nome Fantasia';
    }

  }

  onPopulateContract() {
    this.contractService.findById(this.formClient.get('contract').value).subscribe((response) => {
      this.formClient.patchValue({
        contract: response.id
      })
    })
  }

  onChangeTypeClient() {
    if(this.formClient.get('type').value == '1') {
      this.labelDoc = 'CPF';
      this.labelFullname = 'Nome Completo';
      this.labelNickname = 'Apelido';
    } else {
      this.labelDoc = 'CNPJ';
      this.labelFullname = 'Razão Social';
      this.labelNickname = 'Nome Fantasia';
    }
  }

  onBackToLocation() {
    this.location.back();
  }

  onSubmit() {

    if (this.formClient.valid) {

      let msgSuccess = "Cliente cadastrado com sucesso!!!";

      if (this.formClient.value.id) {
        msgSuccess = "Cliente atualizado com sucesso!!!";
      }

      this.clientService.save(this.formClient.value).subscribe(
        (success) => {
          this.notification.create(
            'success',
            'SUCESSO!',
            `${msgSuccess}`
          );
          if(this.client.id) {
            this.onBackToLocation();
          } else {
            this.onCreateForm();
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

  }

  onReadContracts() {
    this.contractService.findAll().subscribe((response) => {
      this.contracts = response.body;
    })
  }

}
