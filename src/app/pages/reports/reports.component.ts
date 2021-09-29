import { ReportClientService } from './../../services/report_client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contract } from './../../models/contract.model';
import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reportForm: FormGroup;
  contracts: Contract[];

  isLoading = false;

  constructor(
    private contractService: ContractService,
    private reportClientService: ReportClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.onCreateForm();
    this.onListContracts();
  }

  onCreateForm() {
    this.reportForm = this.formBuilder.group({
      selectCity: [null, [Validators.required]],
      selectContract: [null, [Validators.required]],
    });
  }

  onListContracts() {
    this.contractService.findAll().subscribe((response) => {
      this.contracts = response.body;
    });
  }

  onGenerateReportClient() {
    if (
      this.reportForm.get('selectCity').value == 'Todos' &&
      this.reportForm.get('selectContract').value == 'Todos'
    ) {
      this.isLoading = true;
      setTimeout(() => {
        this.reportClientService.reportAll();
        this.isLoading = false;
      }, 3000);
    } else if (
      this.reportForm.get('selectCity').value != 'Todos' &&
      this.reportForm.get('selectContract').value == 'Todos'
    ) {
      this.onGenerateReportClientByCity();
    } else if (
      this.reportForm.get('selectCity').value == 'Todos' &&
      this.reportForm.get('selectContract').value != 'Todos'
    ) {
      this.onGenerateReportClientByContract();
    } else {
      this.onGenerateReportClientByCityAndContract();
    }
  }

  onGenerateReportClientByCity() {
    this.isLoading = true;
    setTimeout(() => {
      this.reportClientService.reportByCity(
        this.reportForm.get('selectCity').value
      );
      this.isLoading = false;
    }, 3000);
  }

  onGenerateReportClientByContract() {
    this.isLoading = true;
    setTimeout(() => {
      this.reportClientService.reportByContract(
        this.reportForm.get('selectContract').value
      );
      this.isLoading = false;
    }, 3000);
  }

  onGenerateReportClientByCityAndContract() {
    this.isLoading = true;
    setTimeout(() => {
      this.reportClientService.reportByCityAndContract(
        this.reportForm.get('selectCity').value,
        this.reportForm.get('selectContract').value
      );
      this.isLoading = false;
    }, 3000);
  }
}
