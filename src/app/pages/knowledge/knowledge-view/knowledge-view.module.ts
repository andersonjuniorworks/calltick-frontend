import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeViewComponent } from './knowledge-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { KnowledgeViewRoutingModule } from './knowledge-view-routing.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    KnowledgeViewRoutingModule,
    NzCardModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzButtonModule
  ],
  declarations: [KnowledgeViewComponent]
})
export class KnowledgeViewModule { }
