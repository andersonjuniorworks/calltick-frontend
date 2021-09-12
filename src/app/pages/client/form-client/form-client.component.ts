import { ClientService } from './../../../services/client.service';
import { Client } from './../../../models/client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
})
export class FormClientComponent implements OnInit {
  formClient: FormGroup;

  client: Client;

  options: any[] = [
    { id: '1', text: 'Pessoa Física' },
    { id: '2', text: 'Pessoa Jurídica' },
  ];

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.client = this.route.snapshot.data['client'];
    this.onCreateForm();
  }

  onCreateForm() {
    this.formClient = this.formBuilder.group({
      id: [this.client.id],
      type: [this.client.type],
      cpfOrCnpj: [this.client.cpfOrCnpj, [Validators.required]],
      fullname: [this.client.fullname, [Validators.required]],
      nickname: [this.client.nickname],
      zipcode: [this.client.zipcode],
      address: [this.client.address],
      homeNumber: [this.client.homeNumber],
      neighborhood: [null],
      complement: [this.client.complement],
      city: [this.client.city],
      state: [this.client.state],
      phoneNumberOne: [this.client.phoneNumberOne],
      phoneNumberTwo: [this.client.phoneNumberTwo],
      email: [this.client.email],
    });
  }

  onChangeClientType(event) {
    this.formClient.patchValue({
      type: event.value,
    });
  }

  onBackToLocation() {
    this.location.back();
  }

  onSubmit() {
    if (this.formClient.valid) {
      let msgSuccess = 'Cliente cadastrador com sucesso!';
      if (this.formClient.value.id) {
        msgSuccess = 'Cliente atualizado com sucesso!';
      }
      this.clientService.save(this.formClient.value).subscribe(
        (success) => {
          console.log(msgSuccess);
        },
        (error) => {
          let err = error;
          console.log(err);
        }
      );
    }
  }
}
