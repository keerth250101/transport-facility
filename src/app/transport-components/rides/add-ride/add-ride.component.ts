import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrl: './add-ride.component.scss',
})
export class AddRideComponent {
  rideForm = this.fb.group({
    employeeId: ['', Validators.required],
    vehicleType: ['Bike', Validators.required],
    vehicleNo: ['', Validators.required],
    vacantSeats: [1, [Validators.required, Validators.min(1)]],
    time: ['', Validators.required],
    pickupPoint: ['', Validators.required],
    destination: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private rideService: RideService) {}

  onSubmit() {
    if (this.rideForm.valid) {
      this.rideService.addRide(this.rideForm.value as any);
      alert('Ride added successfully!');
      this.rideForm.reset({ vehicleType: 'Bike' });
    }
  }
}
