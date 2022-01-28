import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from './../../pipes/pipes.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { CardDashboardComponent } from './../../components/card-dashboard/card-dashboard.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HomeComponent } from './home.component';

import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';

import localePt from '@angular/common/locales/pt';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
registerLocaleData(localePt);

import {
  TeamOutline,
  FileTextOutline,
  FileDoneOutline,
  FileExclamationOutline,
  SyncOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  TeamOutline,
  FileDoneOutline,
  FileExclamationOutline,
  FileTextOutline,
  SyncOutline
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NzStatisticModule,
    NzGridModule,
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
    NzEmptyModule,
    NzCardModule,
    PipesModule,
    NzIconModule.forChild(icons),
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  declarations: [HomeComponent, CardDashboardComponent]
})
export class HomeModule { }
