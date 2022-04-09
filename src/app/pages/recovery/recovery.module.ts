import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryComponent } from './recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RecoveryRoutingModule } from './recovery-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
    RecoveryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzNotificationModule,
    NzSpinModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [RecoveryComponent]
})
export class RecoveryModule { }
