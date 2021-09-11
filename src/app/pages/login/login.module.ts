import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { NzGridModule } from 'ng-zorro-antd/grid';

import { IconDefinition } from '@ant-design/icons-angular';

import {
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  MailOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  EyeOutline,
  EyeInvisibleOutline,
  MailOutline,
  LockOutline
];

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [LoginComponent],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }, { provide: NZ_ICONS, useValue: icons }],
})
export class LoginModule { }
