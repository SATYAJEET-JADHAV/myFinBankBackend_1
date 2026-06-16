import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { LoanService } from '../../../core/services/loan.service';
import { LoanApplicationResponse } from '../../../core/models/loan.model';

@Component({ standalone: false,selector: 'app-customer-dashboard', templateUrl: './customer-dashboard.html', styleUrl: './customer-dashboard.scss' })
export class CustomerDashboard implements OnInit {
  fullName = ''; loans: LoanApplicationResponse[] = []; totalLoans = 0; pendingLoans = 0; approvedLoans = 0; rejectedLoans = 0; isLoading = false;
  constructor(private authService: AuthService, private loanService: LoanService) {}
  ngOnInit(): void { this.fullName = this.authService.getFullName(); this.loadLoans(); }
  loadLoans(): void { this.isLoading = true; const customerId = this.authService.getUserId(); this.loanService.getLoansByCustomerId(customerId).subscribe({ next: data => { this.loans = data; this.totalLoans = data.length; this.pendingLoans = data.filter(l => l.status === 'PENDING' || l.status === 'UNDER_REVIEW').length; this.approvedLoans = data.filter(l => l.status === 'APPROVED').length; this.rejectedLoans = data.filter(l => l.status === 'REJECTED').length; this.isLoading = false; }, error: () => this.isLoading = false }); }
}
