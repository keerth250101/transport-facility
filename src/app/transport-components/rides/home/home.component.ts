import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    public rideService: RideService,
    private authService: AuthService
  ) {}

  navigateToAddRide() {
    this.router.navigate(['/rides/add']);
  }

  navigateToPickRide() {
    this.router.navigate(['/rides/pick']);
  }

  navigateToRideList() {
    this.router.navigate(['/rides/list']);
  }

  logout() {
    this.authService.logout();
  }
}
