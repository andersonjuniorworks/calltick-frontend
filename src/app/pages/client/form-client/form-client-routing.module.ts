import { FormClientComponent } from './form-client.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientResolverGuard } from '../../../guards/client-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: FormClientComponent,
    resolve: {
      client: ClientResolverGuard,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormClientRoutingModule {}
