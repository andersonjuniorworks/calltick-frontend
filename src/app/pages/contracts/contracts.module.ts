import { ContractsRoutingModule } from './contracts-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

registerLocaleData(localePt);

import {
  SearchOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  SearchOutline,
];

@NgModule({
  imports: [
    CommonModule,
    ContractsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzEmptyModule,
    NzFormModule,
    NzIconModule.forChild(icons),
    NgxMaskModule.forRoot(maskConfig),
    NgxCurrencyModule,
  ],
  declarations: [ContractsComponent],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class ContractsModule { }
