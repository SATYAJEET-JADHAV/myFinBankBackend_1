import { Component, OnInit } from '@angular/core';
import { finalize, timeout } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LoanService } from '../../../core/services/loan.service';
import { WorkflowService } from '../../../core/services/workflow.service';
import { LoanApplicationResponse } from '../../../core/models/loan.model';
import { StatusHistory } from '../../../core/models/workflow.model';

@Component({
  standalone:false,
  selector: 'app-loan-status',
  templateUrl: './loan-status.html',
  styleUrl: './loan-status.scss'
})
export class LoanStatus implements OnInit {
  loans: LoanApplicationResponse[] = [];
  selectedLoan: LoanApplicationResponse | null = null;
  history: StatusHistory[] = [];

  isLoading = false;
  historyLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private loanService: LoanService,
    private workflowService: WorkflowService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.errorMessage = '';
    this.isLoading = true;

    const customerId = this.authService.getUserId();

    this.loanService.getLoansByCustomerId(customerId)
      .pipe(
        timeout(8000),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.loans = data;
        },
        error: () => {
          this.errorMessage = 'Unable to load loans right now.';
        }
      });
  }

  viewHistory(loan: LoanApplicationResponse): void {
    this.selectedLoan = loan;
    this.history = [];
    this.historyLoading = true;

    this.workflowService.getLoanHistory(loan.loanId)
      .pipe(
        timeout(8000),
        finalize(() => {
          this.historyLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.history = data;
        },
        error: () => {
          this.history = [];
        }
      });
  }
}