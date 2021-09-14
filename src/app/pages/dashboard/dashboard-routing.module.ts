import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full",
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomeModule)
      },
      {
        path: 'client',
        loadChildren: () => import('../../pages/client/client.module').then( m => m.ClientModule)
      },
      {
        path: 'client/add',
        loadChildren: () => import('../../pages/client/form-client/form-client.module').then( m => m.FormClientModule)
      },
      {
        path: 'client/edit/:id',
        loadChildren: () => import('../../pages/client/form-client/form-client.module').then( m => m.FormClientModule)
      },
      {
        path: 'sector',
        loadChildren: () => import('../../pages/sector/sector.module').then( m => m.SectorModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
