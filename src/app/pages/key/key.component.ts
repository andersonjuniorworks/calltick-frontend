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
  singleKeyForm: FormGroup;

  client: Client;
  clients: Client[];

  sizeClient: number;

  key: string;

  isVisible = false;

  keyModal = false;

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

    this.singleKeyForm = this.formBuilder.group({
      cnpj: [null],
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

  onGenerateSingleKey() {
    let cnpj = this.singleKeyForm.get('cnpj').value;
    let date = new Date();
    date = this.singleKeyForm.get('year').value;
    this.singleKeyForm.patchValue({
      year: date.getFullYear()
    });
    this.isVisible = true;
    this.keyService.findKey(`${cnpj}`, `00/${this.singleKeyForm.get('month').value+'/'+this.singleKeyForm.get('year').value}`).subscribe((response)=>{
      this.key = response['key'];
      this.keyModal = true;
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

    let value = this.key.replace(/(\w{5})(\w{5})(\w{5})(\w{5})/, "$1-$2-$3-$4");

    window.open(
      `https://web.whatsapp.com/send?phone=55${this.client.phoneNumberOne}&text=Caro cliente, sua chave de liberação é: *${value}*`,
      "_blank"
    );
  }

}
