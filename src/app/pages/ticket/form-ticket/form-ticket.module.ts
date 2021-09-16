import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormTicketRoutingModule } from './form-ticket-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTicketComponent } from './form-ticket.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormTicketRoutingModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
  ],
  declarations: [FormTicketComponent]
})
export class FormTicketModule { }
