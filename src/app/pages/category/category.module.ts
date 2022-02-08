import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { SearchOutline } from '@ant-design/icons-angular/icons';
import { CategoryRoutingModule } from './category-routing.module';

const icons: IconDefinition[] = [
  SearchOutline,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzEmptyModule,
    NzSelectModule,
    NzIconModule.forChild(icons),
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
