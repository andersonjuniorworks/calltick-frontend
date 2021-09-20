import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SectorRoutingModule } from './sector-routing.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorComponent } from './sector.component';

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
    SectorRoutingModule,
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
  ],
  declarations: [SectorComponent]
})
export class SectorModule { }
