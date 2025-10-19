import { Component } from '@angular/core';
import { RideService } from '../service/ride.service';
import { Ride } from '../model/ride.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss',
})
export class RideListComponent {
  vehicleType = '';
  time = '';
  rides: Ride[] = [];

  constructor(private rideService: RideService) {
    this.refresh();
  }

  refresh() {
    this.rides = this.rideService.filterRides(this.vehicleType, this.time);
  }
}
