import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ReportsRoutingModule } from './reports-routing.module';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

import {
  PrinterFill,
  PrinterOutline
} from '@ant-design/icons-angular/icons';

import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  PrinterFill
];

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzTabsModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
