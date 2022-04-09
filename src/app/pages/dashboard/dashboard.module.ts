import { AuthGuardService } from './../../services/auth_guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from '../../shared/nz-zorro.module';
import { FormsModule } from '@angular/forms';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconCustomModule } from '../../shared/nz-icon.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    NzIconCustomModule
  ],
  declarations: [DashboardComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }, {provide: AuthGuardService}]
})
export class DashboardModule {

}
