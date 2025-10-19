// header.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mockRouter: { url: string };

  beforeEach(() => {
    mockRouter = { url: '/login' }; // Mock implementation with writable url

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should return false if the URL includes "login"', () => {
    mockRouter.url = '/login';
    expect(component.showHeader()).toBeFalse();
  });

  it('should return true if the URL does not include "login"', () => {
    mockRouter.url = '/home';
    expect(component.showHeader()).toBeTrue();
  });
});