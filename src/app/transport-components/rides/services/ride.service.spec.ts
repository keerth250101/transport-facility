import { TestBed } from '@angular/core/testing';
import { RideService } from './ride.service';
import { Ride } from '../model/ride.model';

describe('RideService', () => {
  let service: RideService;
  let mockStorage: { [key: string]: string } = {};

  const mockLocalStorage = {
    getItem: (key: string): string | null => mockStorage[key] || null,
    setItem: (key: string, value: string): void => {
      mockStorage[key] = value;
    },
    removeItem: (key: string): void => {
      delete mockStorage[key];
    },
    clear: (): void => {
      mockStorage = {};
    },
  };

  beforeEach(() => {
    mockStorage = {};
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({});
    service = TestBed.inject(RideService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should load empty rides when no data in localStorage', () => {
    expect(service.getAllRides().length).toBe(0);
  });

  it('should add a ride and persist to localStorage', () => {
    const ride = {
      employeeId: 'E001',
      vehicleType: 'Car' as 'Car' | 'Bike',
      vehicleNo: 'KA01AB1234',
      vacantSeats: 2,
      time: '09:00',
      pickupPoint: 'A',
      destination: 'B',
    };

    service.addRide(ride);
    const rides = service.getAllRides();
    expect(rides.length).toBe(1);
    expect(rides[0].employeeId).toBe('E001');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  describe('bookRide()', () => {
    let ride: Ride;

    beforeEach(() => {
      service.clearAllRides();
      service.addRide({
        employeeId: 'E001',
        vehicleType: 'Car',
        vehicleNo: 'KA01',
        vacantSeats: 2,
        time: '10:00',
        pickupPoint: 'A',
        destination: 'B',
      });
      ride = service.getAllRides()[0];
    });

    it('should return "Ride not found" if rideId invalid', () => {
      expect(service.bookRide(999, 'E002')).toBe('Ride not found');
    });

    it('should prevent employee from booking their own ride', () => {
      expect(service.bookRide(ride.id, 'E001')).toBe('You cannot book your own ride');
    });

    it('should allow booking if valid', () => {
      const result = service.bookRide(ride.id, 'E002');
      expect(result).toBe('Ride booked successfully');
      expect(service.getAllRides()[0].vacantSeats).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should prevent duplicate booking', () => {
      service.bookRide(ride.id, 'E002');
      const result = service.bookRide(ride.id, 'E002');
      expect(result).toBe('You already booked this ride');
    });

    it('should prevent booking when no seats available', () => {
      ride.vacantSeats = 0;
      const result = service.bookRide(ride.id, 'E003');
      expect(result).toBe('No seats available');
    });
  });

  describe('filterRides()', () => {
    beforeEach(() => {
      service.clearAllRides();
      service.addRide({
        employeeId: 'E1',
        vehicleType: 'Car',
        vehicleNo: 'AB1',
        vacantSeats: 1,
        time: '09:00',
        pickupPoint: 'A',
        destination: 'B',
      });
      service.addRide({
        employeeId: 'E2',
        vehicleType: 'Bike',
        vehicleNo: 'AB2',
        vacantSeats: 1,
        time: '10:00',
        pickupPoint: 'C',
        destination: 'D',
      });
    });

    it('should filter by vehicleType', () => {
      const result = service.filterRides('Bike');
      expect(result.length).toBe(1);
      expect(result[0].vehicleType).toBe('Bike');
    });

    it('should filter by time within 60 mins', () => {
      const result = service.filterRides(undefined, '09:30');
      expect(result.length).toBe(2); // both 09:00 and 10:00 are within 60 min range
    });

    it('should return all rides if no filters', () => {
      const result = service.filterRides();
      expect(result.length).toBe(2);
    });
  });

  describe('getTimeMatchingRides()', () => {
    it('should return rides within ±60 minutes from now', () => {
      service.clearAllRides();
      const now = new Date();
      const validTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      const farTime = `${(now.getHours() + 3) % 24}:00`;

      service.addRide({
        employeeId: 'E1',
        vehicleType: 'Car',
        vehicleNo: 'AB1',
        vacantSeats: 1,
        time: validTime,
        pickupPoint: 'A',
        destination: 'B',
      });

      service.addRide({
        employeeId: 'E2',
        vehicleType: 'Bike',
        vehicleNo: 'AB2',
        vacantSeats: 1,
        time: farTime,
        pickupPoint: 'C',
        destination: 'D',
      });

      const matches = service.getTimeMatchingRides();
      expect(matches.length).toBe(1);
      expect(matches[0].employeeId).toBe('E1');
    });
  });

  it('should clear all rides', () => {
    service.addRide({
      employeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'AB1',
      vacantSeats: 1,
      time: '09:00',
      pickupPoint: 'A',
      destination: 'B',
    });
    service.clearAllRides();
    expect(service.getAllRides().length).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith('rides');
  });
});
