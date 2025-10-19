import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthService } from '../../service/auth.service';
import { RideService } from '../services/ride.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let mockRouter: Partial<Router>;
  let mockAuthService: Partial<AuthService>;
  let mockRideService: Partial<RideService>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockAuthService = {
      logout: jasmine.createSpy('logout'),
    };

    mockRideService = {};

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: RideService, useValue: mockRideService },
      ],
    });

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to add ride', () => {
    component.navigateToAddRide();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rides/add']);
  });

  it('should navigate to pick ride', () => {
    component.navigateToPickRide();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rides/pick']);
  });

  it('should navigate to ride list', () => {
    component.navigateToRideList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rides/list']);
  });

  it('should call logout on AuthService', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
