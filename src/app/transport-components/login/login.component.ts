import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username!, password!)) {
      this.message = 'Login successful!';
    } else {
      this.message = 'Invalid username or password';
    }
  }
}
