import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRideComponent } from './add-ride/add-ride.component';
import { PickRideComponent } from './pick-ride/pick-ride.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { RidesRoutingModule } from './ride-routing.module';

@NgModule({
  declarations: [
    AddRideComponent,
    PickRideComponent,
    RideListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RidesRoutingModule
  ]
})
export class RidesModule {}
