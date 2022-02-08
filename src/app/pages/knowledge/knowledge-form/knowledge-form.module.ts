import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeFormComponent } from './knowledge-form.component';
import { KnowledgeFormRoutingModule } from './knowledge-form-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    CommonModule,
    KnowledgeFormRoutingModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzNotificationModule,
    AngularEditorModule
  ],
  declarations: [KnowledgeFormComponent]
})
export class KnowledgeFormModule { }
