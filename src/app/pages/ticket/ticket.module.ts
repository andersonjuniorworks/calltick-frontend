import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { PipesModule } from './../../pipes/pipes.module';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalModule } from 'ng-zorro-antd/modal';
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
import { FilterFill, FilterOutline, SyncOutline } from '@ant-design/icons-angular/icons';

import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

const icons: IconDefinition[] = [
  SyncOutline,
  FilterOutline,
  FilterFill
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TicketRoutingModule,
    NzListModule,
    NzTagModule,
    NzDatePickerModule,
    NzButtonModule,
    NzToolTipModule,
    NzPaginationModule,
    NzModalModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzPopoverModule,
    NzDrawerModule,
    NzCommentModule,
    NzCollapseModule,
    NzAvatarModule,
    PipesModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [TicketComponent]
})
export class TicketModule { }
