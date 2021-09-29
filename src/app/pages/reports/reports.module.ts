import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ReportsRoutingModule } from './reports-routing.module';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NzMenuModule,
    NzTabsModule,
    NzButtonModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
