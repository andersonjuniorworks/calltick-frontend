import { ReportClientService } from './../../services/report_client.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contract } from './../../models/contract.model';
import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportForm: FormGroup;
  contracts: Contract[];

  constructor(
    private contractService: ContractService,
    private reportClientService: ReportClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.onCreateForm();
    this.onListContracts();
  }

  onCreateForm() {
    this.reportForm = this.formBuilder.group({
      selectCity: null,
      selectContract: null
    });
  }

  onListContracts() {
    this.contractService.findAll().subscribe((response) => {
      this.contracts = response.body
    })
  }

  onGenerateReportClient() {
    if(this.reportForm.get('selectCity').value == 'Todos' && this.reportForm.get('selectContract').value == 'Todos') {
      this.reportClientService.reportAll();
    } else if(this.reportForm.get('selectCity').value != 'Todos' && this.reportForm.get('selectContract').value == 'Todos') {
      this.onGenerateReportClientByCity();
    } else if(this.reportForm.get('selectCity').value == 'Todos' && this.reportForm.get('selectContract').value != 'Todos') {
      this.onGenerateReportClientByContract();
    } else {
      this.onGenerateReportClientByCityAndContract();
    }
  }

  onGenerateReportClientByCity() {
    this.reportClientService.reportByCity(this.reportForm.get('selectCity').value);
  }

  onGenerateReportClientByContract() {
    this.reportClientService.reportByContract(this.reportForm.get('selectContract').value);
  }

  onGenerateReportClientByCityAndContract() {
    this.reportClientService.reportByCityAndContract(this.reportForm.get('selectCity').value, this.reportForm.get('selectContract').value);
  }

}
