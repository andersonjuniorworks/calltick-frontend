

import { FormsModule } from '@angular/forms';

import { ClientRoutingModule } from './client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
