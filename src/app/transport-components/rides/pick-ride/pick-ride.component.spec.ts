import { TestBed } from '@angular/core/testing';
import { PickRideComponent } from './pick-ride.component';
import { RideService } from '../services/ride.service';
import { Ride } from '../model/ride.model';

describe('PickRideComponent', () => {
  let component: PickRideComponent;
  let mockRideService: Partial<RideService>;

  beforeEach(() => {
    mockRideService = {
      getTimeMatchingRides: jasmine
        .createSpy('getTimeMatchingRides')
        .and.returnValue([
            { id: 1, name: 'Ride 1' },
            { id: 2, name: 'Ride 2' },
          ] as unknown as Ride[]),
      bookRide: jasmine
        .createSpy('bookRide')
        .and.returnValue('Ride booked successfully!'),
    };

    TestBed.configureTestingModule({
      declarations: [PickRideComponent],
      providers: [{ provide: RideService, useValue: mockRideService }],
    });

    const fixture = TestBed.createComponent(PickRideComponent);
    component = fixture.componentInstance;
  });

  it('should initialize rides from RideService', () => {
    expect(component.rides).toEqual([
      { id: 1, name: 'Ride 1' },
      { id: 2, name: 'Ride 2' },
    ]as unknown as Ride[]);
    expect(mockRideService.getTimeMatchingRides).toHaveBeenCalled();
  });

  it('should set message if employeeId or selectedRideId is missing', () => {
    component.employeeId = '';
    component.selectedRideId = undefined;
    component.onBookRide();
    expect(component.message).toBe(
      'Please select a ride and enter Employee ID.'
    );
  });

  it('should call bookRide on RideService and set message', () => {
    component.employeeId = '123';
    component.selectedRideId = 1;
    component.onBookRide();
    expect(mockRideService.bookRide).toHaveBeenCalledWith(1, '123');
    expect(component.message).toBe('Ride booked successfully!');
  });
});
