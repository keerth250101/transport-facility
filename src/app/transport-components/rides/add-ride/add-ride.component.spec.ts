import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddRideComponent } from './add-ride.component';
import { RideService } from '../services/ride.service';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;
  let rideServiceSpy: jasmine.SpyObj<RideService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RideService', ['addRide']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddRideComponent],
      providers: [
        FormBuilder,
        { provide: RideService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    rideServiceSpy = TestBed.inject(RideService) as jasmine.SpyObj<RideService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.rideForm).toBeDefined();
    expect(component.rideForm.get('vehicleType')?.value).toBe('Bike');
    expect(component.rideForm.get('vacantSeats')?.value).toBe(1);
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.rideForm.reset();
    expect(component.rideForm.valid).toBeFalse();
  });

  it('should require vacantSeats to be at least 1', () => {
    const vacantSeats = component.rideForm.get('vacantSeats');
    vacantSeats?.setValue(0);
    expect(vacantSeats?.hasError('min')).toBeTrue();
  });

  it('should call rideService.addRide and reset form on valid submission', () => {
    spyOn(window, 'alert');

    component.rideForm.patchValue({
      employeeId: 'E001',
      vehicleType: 'Car',
      vehicleNo: 'KA01AB1234',
      vacantSeats: 2,
      time: '09:00',
      pickupPoint: 'Point A',
      destination: 'Point B',
    });
    component.rideForm.updateValueAndValidity();

    expect(component.rideForm.valid).toBeTrue(); // ✅ ensure form is valid

    component.onSubmit();

    expect(rideServiceSpy.addRide).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      employeeId: 'E001',
      vehicleType: 'Car',
      vehicleNo: 'KA01AB1234',
      vacantSeats: 2,
      time: '09:00',
      pickupPoint: 'Point A',
      destination: 'Point B',
    }));

    expect(window.alert).toHaveBeenCalledWith('Ride added successfully!');
    expect(component.rideForm.get('vehicleType')?.value).toBe('Bike'); // ✅ reset check
  });

  it('should not call addRide or alert if form is invalid', () => {
    spyOn(window, 'alert');
    component.rideForm.reset();
    component.onSubmit();
    expect(rideServiceSpy.addRide).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
