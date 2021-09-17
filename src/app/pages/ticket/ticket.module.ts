import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TicketRoutingModule } from './ticket-routing.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [];

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    NzListModule,
    NzTagModule,
    NzDatePickerModule,
    NzButtonModule,
    NzToolTipModule,
    NzPaginationModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [TicketComponent]
})
export class TicketModule { }
