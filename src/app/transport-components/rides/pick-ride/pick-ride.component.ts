import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';
import { Ride } from '../model/ride.model';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
})
export class PickRideComponent {
  employeeId = '';
  selectedRideId?: number;
  message = '';
  rides: Ride[] = [];

  constructor(public rideService: RideService) {
    this.rides = this.rideService.getTimeMatchingRides();
  }

  onBookRide() {
    if (!this.employeeId || !this.selectedRideId) {
      this.message = 'Please select a ride and enter Employee ID.';
      return;
    }
    this.message = this.rideService.bookRide(this.selectedRideId, this.employeeId);
  }

}
