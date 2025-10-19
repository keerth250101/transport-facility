import { Component, OnInit } from '@angular/core';
import { Ride } from '../model/ride.model';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss'],
})
export class RideListComponent implements OnInit {
  vehicleType = '';
  time = '';
  rides: Ride[] = [];

  constructor(private rideService: RideService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    let filteredRides = this.rideService.filterRides(
      this.vehicleType,
      this.time
    );

    // If no specific time is selected, show rides ±60 minutes from current time
    if (!this.time) {
      const timeMatching = this.rideService.getTimeMatchingRides();
      // Merge with filteredRides if vehicleType is selected
      if (this.vehicleType) {
        filteredRides = timeMatching.filter(
          (r) => r.vehicleType === this.vehicleType
        );
      } else {
        filteredRides = timeMatching;
      }
    }

    this.rides = filteredRides;
  }

  onClearRides() {
    const confirmClear = confirm('Are you sure you want to clear all rides?');
    if (confirmClear) {
      this.rideService.clearAllRides();
      this.refresh();
    }
  }
}
