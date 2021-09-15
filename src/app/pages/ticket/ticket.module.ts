import { TicketRoutingModule } from './ticket-routing.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    NzListModule,
    NzTagModule
  ],
  declarations: [TicketComponent]
})
export class TicketModule { }
