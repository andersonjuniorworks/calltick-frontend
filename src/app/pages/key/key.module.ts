import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { KeyComponent } from './key.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { KeyRoutingModule } from './key-routing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import localePt from '@angular/common/locales/pt';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PipesModule } from '../../pipes/pipes.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { WhatsAppOutline } from '@ant-design/icons-angular/icons';
registerLocaleData(localePt);

const icons: IconDefinition[] = [
  WhatsAppOutline
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    KeyRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzDatePickerModule,
    NzResultModule,
    NzModalModule,
    PipesModule,
    NgxMaskModule.forRoot(maskConfig),
    NzIconModule.forChild(icons),
  ],
  declarations: [KeyComponent],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR }
  ]
})
export class KeyModule { }
