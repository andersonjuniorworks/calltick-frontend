import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormClientRoutingModule } from './form-client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClientComponent } from './form-client.component';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  imports: [
    CommonModule,
    FormClientRoutingModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerModule
  ],
  declarations: [FormClientComponent]
})
export class FormClientModule { }
