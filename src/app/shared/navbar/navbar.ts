import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({ standalone: false,selector: 'app-navbar', templateUrl: './navbar.html', styleUrl: './navbar.scss' })
export class Navbar {
  isMenuOpen = false;
  constructor(public authService: AuthService) {}
  toggleMenu(): void { this.isMenuOpen = !this.isMenuOpen; }
  logout(): void { this.authService.logout(); }
  get role(): string { return this.authService.getRole(); }
  get fullName(): string { return this.authService.getFullName(); }
}
