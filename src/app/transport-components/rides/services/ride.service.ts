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

  getAllRides() {
    return this.rides;
  }

  addRide(ride: Omit<Ride, 'id' | 'bookedEmployees'>) {
    const newRide: Ride = {
      ...ride,
      id: Date.now(),
      bookedEmployees: []
    };
    this.rides.push(newRide);
    this.saveToStorage();
  }

  bookRide(rideId: number | string, employeeId: string): string {
    const id = Number(rideId);
    const ride = this.rides.find(r => r.id === id);
    console.log(ride,rideId)
    if (!ride) return 'Ride not found';
    if (ride.employeeId === employeeId) return 'You cannot book your own ride';
    if (ride.bookedEmployees.includes(employeeId)) return 'You already booked this ride';
    if (ride.vacantSeats === 0) return 'No seats available';

    ride.bookedEmployees.push(employeeId);
    ride.vacantSeats--;
    this.saveToStorage();
    return 'Ride booked successfully';
  }

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

  clearAllRides() {
    this.rides = [];
    localStorage.removeItem('rides');
  }
}
