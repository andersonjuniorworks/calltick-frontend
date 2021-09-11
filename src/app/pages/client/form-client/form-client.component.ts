import { ClientService } from './../../../services/client.service';
import { Client } from './../../../models/client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

  formClient: FormGroup;

  client: Client;

  options: any[] = [
    {id: '1', text: 'Pessoa Física'},
    {id: '2', text: 'Pessoa Jurídica'}
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private clientService: ClientService,
  ) {  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data["client"];
    this.onCreateForm();
  }

  onCreateForm() {
    this.formClient = this.formBuilder.group({
      id: [this.client.id],
      type: [this.client.type],
      fullname: [this.client.fullname],
      nickname: [this.client.nickname]
    })

  }

  onChangeClientType(event) {
    this.formClient.patchValue({
      type: event.value
    });
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

        },
        (error) => {

        }
      );

    }
  }


}
