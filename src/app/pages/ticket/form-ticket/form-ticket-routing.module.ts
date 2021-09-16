import { TicketResolverGuard } from './../../../guards/ticket-resolver.guard';
import { FormTicketComponent } from './form-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FormTicketComponent,
    resolve: {
      ticket: TicketResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTicketRoutingModule {}
