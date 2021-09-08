import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ClientRoutingModule } from './client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';

import { IconDefinition } from '@ant-design/icons-angular';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import {
  DeleteOutline,
  EditOutline,
  FileSearchOutline,
  PlusOutline,
  SearchOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  SearchOutline,
  EditOutline,
  DeleteOutline,
  FileSearchOutline,
  PlusOutline
];

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzEmptyModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
