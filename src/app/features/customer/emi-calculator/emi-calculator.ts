import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmiService } from '../../../core/services/emi.service';
import { EmiResponse } from '../../../core/models/loan.model';

@Component({standalone: false, selector: 'app-emi-calculator', templateUrl: './emi-calculator.html', styleUrl: './emi-calculator.scss' })
export class EmiCalculator {
  emiForm: FormGroup; result: EmiResponse | null = null; isLoading = false; errorMessage = '';
  constructor(private fb: FormBuilder, private emiService: EmiService) { this.emiForm = this.fb.group({ loanAmount: [600000, [Validators.required, Validators.min(1)]], interestRate: [9.5, [Validators.required, Validators.min(.1)]], tenureMonths: [60, [Validators.required, Validators.min(1)]] }); }
  calculate(): void { this.errorMessage = ''; this.result = null; if (this.emiForm.invalid) { this.emiForm.markAllAsTouched(); return; } this.isLoading = true; this.emiService.calculateEmi(this.emiForm.value).subscribe({ next: r => { this.result = r; this.isLoading = false; }, error: e => { this.errorMessage = e?.error?.message || 'Unable to calculate EMI.'; this.isLoading = false; } }); }
}
