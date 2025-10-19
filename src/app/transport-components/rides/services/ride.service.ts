import { Injectable } from '@angular/core';
import { Ride } from '../model/ride.model';

@Injectable({ providedIn: 'root' })
export class RideService {
  private rides: Ride[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('rides');
    this.rides = saved ? JSON.parse(saved) : [];
  }

  private saveToStorage() {
    localStorage.setItem('rides', JSON.stringify(this.rides));
  }

  /** Get all rides (unfiltered) */
  getAllRides() {
    return this.rides;
  }

  /** Add new ride and persist to localStorage */
  addRide(ride: Omit<Ride, 'id' | 'bookedEmployees'>) {
    const newRide: Ride = {
      ...ride,
      id: Date.now(),
      bookedEmployees: []
    };
    this.rides.push(newRide);
    this.saveToStorage();
  }

  /**  Book a ride by employee */
  bookRide(rideId: number | string, employeeId: string): string {
    const id = Number(rideId);
    const ride = this.rides.find(r => r.id === id);
    console.log(ride, rideId);

    if (!ride) return 'Ride not found';
    if (ride.employeeId === employeeId) return 'You cannot book your own ride';
    if (ride.bookedEmployees.includes(employeeId)) return 'You already booked this ride';
    if (ride.vacantSeats === 0) return 'No seats available';

    ride.bookedEmployees.push(employeeId);
    ride.vacantSeats--;
    this.saveToStorage();
    return 'Ride booked successfully';
  }

  /** Filter rides by vehicle type or time (manual filter) */
  filterRides(vehicleType?: string, targetTime?: string) {
    let filtered = [...this.rides];
    if (vehicleType) filtered = filtered.filter(r => r.vehicleType === vehicleType);
    if (targetTime) {
      const target = new Date(`1970-01-01T${targetTime}:00`);
      filtered = filtered.filter(r => {
        const rideTime = new Date(`1970-01-01T${r.time}:00`);
        const diff = Math.abs(rideTime.getTime() - target.getTime()) / (1000 * 60);
        return diff <= 60;
      });
    }
    return filtered;
  }

  /** Rides within ±60 minutes from current time */
  getTimeMatchingRides(): Ride[] {
    const now = new Date();
    const oneHourMs = 60 * 60 * 1000; // 60 minutes buffer

    return this.rides.filter(ride => {
      if (!ride.time) return false;
      const [hours, minutes] = ride.time.split(':').map(Number);
      const rideTime = new Date();
      rideTime.setHours(hours, minutes, 0, 0);

      const diff = Math.abs(rideTime.getTime() - now.getTime());
      return diff <= oneHourMs;
    });
  }

  /** Clear all rides (for testing/demo) */
  clearAllRides() {
    this.rides = [];
    localStorage.removeItem('rides');
  }
}
