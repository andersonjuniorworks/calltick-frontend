
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeyComponent } from './key.component';

const routes: Routes = [
  {
    path: '',
    component: KeyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeyRoutingModule {}
