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

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.client = this.route.snapshot.data["client"];

    if(this.client.id == null) {
      this.titleForm = 'Cadastro de Cliente';
    } else {
      this.titleForm = 'Edição de Cliente';
    }

    this.onCreateForm();
  }

  onCreateForm() {
    this.formClient = this.formBuilder.group({
      id: this.client.id,
      type: [this.client.type, [Validators.required]],
      cpfOrCnpj: this.client.cpfOrCnpj,
      fullname: this.client.fullname,
      nickname: this.client.nickname,
      zipcode: this.client.zipcode,
      address: this.client.address,
      homeNumber: this.client.homeNumber,
      complement: this.client.complement,
      neighborhood: null,
      state: this.client.state,
      city: this.client.city,
      phoneNumberOne: this.client.phoneNumberOne,
      phoneNumberTwo: this.client.phoneNumberTwo,
      email: this.client.email
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

}
