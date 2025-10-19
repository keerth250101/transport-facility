import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public router: Router) {}

  // To hide header on login page
  showHeader(): boolean {
    return !this.router.url.includes('login');
  }
}
