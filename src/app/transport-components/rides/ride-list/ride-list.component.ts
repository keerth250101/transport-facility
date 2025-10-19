import { Component } from '@angular/core';
import { Ride } from '../model/ride.model';
import { RideService } from '../services/ride.service';

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
