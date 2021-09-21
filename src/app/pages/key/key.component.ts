import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

import { getISOWeek } from 'date-fns';
import { KeyService } from '../../services/key.service';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  isEnglish = false;

  keyForm: FormGroup;

  client: Client;
  clients: Client[];

  sizeClient: number;

  key: string;

  isVisible = false;

  teste: string;

  months = [
    {text: 'JANEIRO', value: '01'},
    {text: 'FEVEREIRO', value: '02'},
    {text: 'MARÇO', value: '03'},
    {text: 'ABRIL', value: '04'},
    {text: 'MAIO', value: '05'},
    {text: 'JUNHO', value: '06'},
    {text: 'JULHO', value: '07'},
    {text: 'AGOSTO', value: '08'},
    {text: 'SETEMBRO', value: '09'},
    {text: 'OUTUBRO', value: '10'},
    {text: 'NOVEMBRO', value: '11'},
    {text: 'DEZEMBRO', value: '12'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private keyService: KeyService,
    private location: Location
  ) { }

  ngOnInit() {
    this.onCreateForm();
    this.onListClient();
  }

  onCreateForm() {
    this.keyForm = this.formBuilder.group({
      document: [null],
      month: [null],
      year: [null]
    });
  }

  onListClient() {
    this.clientService.findCount().subscribe((count) => {
      this.sizeClient = count;
      this.clientService.findAll('0', `${this.sizeClient}`).subscribe((response) => {
        this.clients = response.body;
      });
    });
  }

  onGenerateKey() {
    this.client = this.keyForm.get('document').value;
    let date = new Date();
    date = this.keyForm.get('year').value;
    this.keyForm.patchValue({
      year: date.getFullYear()
    });
    this.isVisible = true;
    this.keyService.findKey(`${this.client.document}`, `00/${this.keyForm.get('month').value+'/'+this.keyForm.get('year').value}`).subscribe((response)=>{
      this.key = response['key'];
      this.onCreateForm();
    })
  }

  onBackToLocation() {
    this.location.back();
  }

  onHandleCancel() {
    this.isVisible = false;
  }

  onSendToWhatsApp() {
    window.open(
      `https://api.whatsapp.com/send?phone=55${this.client.phoneNumberOne}&text=Caro cliente, sua chave de liberação é: *${this.key}*`,
      "_blank"
    );
  }

}
