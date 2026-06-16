import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { CustomerDashboard } from './features/customer/customer-dashboard/customer-dashboard';
import { ApplyLoan } from './features/customer/apply-loan/apply-loan';
import { EmiCalculator } from './features/customer/emi-calculator/emi-calculator';
import { LoanStatus } from './features/customer/loan-status/loan-status';
import { OfficerDashboard } from './features/officer/officer-dashboard/officer-dashboard';
import { ManagerDashboard } from './features/manager/manager-dashboard/manager-dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'customer/dashboard', component: CustomerDashboard, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CUSTOMER'] } },
  { path: 'customer/apply-loan', component: ApplyLoan, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CUSTOMER'] } },
  { path: 'customer/emi-calculator', component: EmiCalculator, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CUSTOMER'] } },
  { path: 'customer/loan-status', component: LoanStatus, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CUSTOMER'] } },
  { path: 'officer/dashboard', component: OfficerDashboard, canActivate: [AuthGuard, RoleGuard], data: { roles: ['OFFICER'] } },
  { path: 'manager/dashboard', component: ManagerDashboard, canActivate: [AuthGuard, RoleGuard], data: { roles: ['MANAGER'] } },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
