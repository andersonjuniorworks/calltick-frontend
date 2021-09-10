import { CardDashboardComponent } from './../../components/card-dashboard/card-dashboard.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { IconDefinition } from '@ant-design/icons-angular';

import {
  TeamOutline,
  FileTextOutline,
  FileDoneOutline,
  FileExclamationOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  TeamOutline,
  FileDoneOutline,
  FileExclamationOutline,
  FileTextOutline
];

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzStatisticModule,
    NzGridModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [HomeComponent, CardDashboardComponent]
})
export class HomeModule { }
