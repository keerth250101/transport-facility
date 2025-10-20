import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [FormBuilder, { provide: AuthService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    const form = component.loginForm;
    expect(form.get('username')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.valid).toBeFalse();
  });

  it('should have required validation on username and password', () => {
    const username = component.loginForm.get('username');
    const password = component.loginForm.get('password');

    username?.setValue('');
    password?.setValue('');
    expect(username?.hasError('required')).toBeTrue();
    expect(password?.hasError('required')).toBeTrue();
  });

  it('should set message to "Login successful!" when authService.login returns true', () => {
    authServiceSpy.login.and.returnValue(true);
    component.loginForm.setValue({ username: 'user', password: 'pass' });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user', 'pass');
    expect(component.message).toBe('Login successful!');
  });

  it('should set message to "Invalid username or password" when authService.login returns false', () => {
    authServiceSpy.login.and.returnValue(false);
    component.loginForm.setValue({ username: 'user', password: 'wrong' });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user', 'wrong');
    expect(component.message).toBe('Invalid username or password');
  });
});
