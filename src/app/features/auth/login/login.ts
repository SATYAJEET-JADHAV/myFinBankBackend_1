import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({standalone: false, selector: 'app-login', templateUrl: './login.html', styleUrl: './login.scss' })
export class Login {
  loginForm: FormGroup; isLoading = false; errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService) { this.loginForm = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required]] }); }
  login(): void { this.errorMessage = ''; if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; } this.isLoading = true; this.authService.login(this.loginForm.value).subscribe({ next: () => { this.isLoading = false; this.authService.redirectByRole(); }, error: (e) => { this.isLoading = false; this.errorMessage = e?.error?.message || 'Invalid email or password. Please try again.'; } }); }
  fillCustomer(): void { this.loginForm.patchValue({ email: 'customer@myfinbank.com', password: 'customer123' }); }
  fillOfficer(): void { this.loginForm.patchValue({ email: 'officer@myfinbank.com', password: 'officer123' }); }
  fillManager(): void { this.loginForm.patchValue({ email: 'manager@myfinbank.com', password: 'manager123' }); }
  get email() { return this.loginForm.get('email'); } get password() { return this.loginForm.get('password'); }
}
