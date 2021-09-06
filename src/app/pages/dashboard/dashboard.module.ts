import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../shared/nz-zorro.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  UserOutline,
  HomeOutline,
  TeamOutline,
  SolutionOutline,
  FileTextOutline,
  BarsOutline,
  DollarCircleOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UserOutline,
  HomeOutline,
  TeamOutline,
  SolutionOutline,
  FileTextOutline,
  BarsOutline,
  DollarCircleOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
