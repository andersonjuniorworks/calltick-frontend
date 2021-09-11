import { SelectCustomComponent } from './../../../components/select-custom/select-custom.component';
import { FieldCustomComponent } from './../../../components/field-custom/field-custom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormClientRoutingModule } from './form-client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClientComponent } from './form-client.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [FormClientComponent, FieldCustomComponent, SelectCustomComponent],
})
export class FormClientModule { }
