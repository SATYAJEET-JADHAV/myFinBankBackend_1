import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({ standalone: false,selector: 'app-register', templateUrl: './register.html', styleUrl: './register.scss' })
export class Register {
  registerForm: FormGroup; isLoading = false; errorMessage = '';
  roles = [{ label: 'Customer', value: 'CUSTOMER' }, { label: 'Loan Officer', value: 'OFFICER' }, { label: 'Manager', value: 'MANAGER' }];
  constructor(private fb: FormBuilder, private authService: AuthService) { this.registerForm = this.fb.group({ fullName: ['', [Validators.required, Validators.minLength(3)]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]], role: ['CUSTOMER', [Validators.required]] }); }
  register(): void { this.errorMessage = ''; if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; } this.isLoading = true; this.authService.register(this.registerForm.value).subscribe({ next: () => { this.isLoading = false; this.authService.redirectByRole(); }, error: (e) => { this.isLoading = false; this.errorMessage = e?.error?.message || 'Registration failed. Please try again.'; } }); }
  get fullName() { return this.registerForm.get('fullName'); } get email() { return this.registerForm.get('email'); } get password() { return this.registerForm.get('password'); }
}
