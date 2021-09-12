
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormClientRoutingModule } from './form-client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClientComponent } from './form-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [FormClientComponent],
})
export class FormClientModule { }
