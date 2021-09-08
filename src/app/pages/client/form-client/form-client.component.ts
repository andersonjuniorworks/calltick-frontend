import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

  clientType = new FormControl();

  formClient: FormGroup;

  labelDoc = 'CPF';
  labelFullname = 'Nome Completo';
  labelNickname = 'Apelido';

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.onCreateForm();
  }

  onCreateForm() {
    this.formClient = this.formBuilder.group({
      id: null,
      type: [null, [Validators.required]],
      cpfOrCnpj: null,
      fullname: null,
      nickname: null,
      zipcode: null,
      address: null,
      homeNumber: null,
      complement: null,
      state: null,
      city: null,
      phoneNumberOne: null,
      phoneNumberTwo: null,
      email: null,
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

}
