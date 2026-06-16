import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, timeout } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LoanService } from '../../../core/services/loan.service';
import { LoanApplicationResponse } from '../../../core/models/loan.model';

@Component({
  standalone:false,
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.html',
  styleUrl: './apply-loan.scss'
})
export class ApplyLoan {
  loanForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  submittedLoan: LoanApplicationResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loanService: LoanService
  ) {
    this.loanForm = this.fb.group({
      vehicleType: ['CAR', [Validators.required]],
      vehiclePrice: [850000, [Validators.required, Validators.min(1)]],
      loanAmount: [600000, [Validators.required, Validators.min(1)]],
      interestRate: [9.5, [Validators.required, Validators.min(0.1)]],
      tenureMonths: [60, [Validators.required, Validators.min(1)]]
    });
  }

  applyLoan(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.submittedLoan = null;

    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    const request = {
      customerId: this.authService.getUserId(),
      ...this.loanForm.value
    };

    this.isLoading = true;

    this.loanService.applyLoan(request)
      .pipe(
        timeout(8000),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.submittedLoan = response;
          this.successMessage = `Loan application submitted successfully. Loan ID: ${response.loanId}`;

          this.loanForm.reset({
            vehicleType: 'CAR',
            vehiclePrice: 850000,
            loanAmount: 600000,
            interestRate: 9.5,
            tenureMonths: 60
          });
        },
        error: (error) => {
          if (error.name === 'TimeoutError') {
            this.successMessage = 'Loan submitted. It may take a few seconds to appear in tracking.';
            return;
          }

          this.errorMessage = error?.error?.message || 'Unable to apply loan.';
        }
      });
  }
}