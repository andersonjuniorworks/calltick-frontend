import { CardDashboardComponent } from './../../components/card-dashboard/card-dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent, CardDashboardComponent]
})
export class HomeModule { }
