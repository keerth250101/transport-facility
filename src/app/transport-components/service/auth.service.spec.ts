import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with correct credentials', () => {
    const result = service.login('admin', 'admin');
    expect(result).toBeTrue();
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rides']);
  });

  it('should not login with incorrect credentials', () => {
    const result = service.login('user', 'wrong');
    expect(result).toBeFalse();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should logout and clear login data', () => {
    localStorage.setItem('isLoggedIn', 'true');
    service.logout();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true when user is authenticated', () => {
    localStorage.setItem('isLoggedIn', 'true');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false when user is not authenticated', () => {
    localStorage.removeItem('isLoggedIn');
    expect(service.isAuthenticated()).toBeFalse();
  });
});
