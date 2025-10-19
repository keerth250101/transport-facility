import { Component } from '@angular/core';
import { RideService } from '../service/ride.service';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrl: './pick-ride.component.scss'
})
export class PickRideComponent {
  employeeId = '';
  selectedRideId?: number;
  message = '';

  constructor(public rideService: RideService) {}

  onBookRide() {
    if (!this.employeeId || !this.selectedRideId) {
      this.message = 'Please select a ride and enter Employee ID.';
      return;
    }
    this.message = this.rideService.bookRide(this.selectedRideId, this.employeeId);
  }

}
