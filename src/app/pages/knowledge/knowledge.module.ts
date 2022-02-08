import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeComponent } from './knowledge.component';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KnowledgeRoutingModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzButtonModule,
    NzDividerModule
  ],
  declarations: [KnowledgeComponent]
})
export class KnowledgeModule { }
