import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';

import { Navbar } from './shared/navbar/navbar';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { CustomerDashboard } from './features/customer/customer-dashboard/customer-dashboard';
import { ApplyLoan } from './features/customer/apply-loan/apply-loan';
import { EmiCalculator } from './features/customer/emi-calculator/emi-calculator';
import { LoanStatus } from './features/customer/loan-status/loan-status';
import { OfficerDashboard } from './features/officer/officer-dashboard/officer-dashboard';
import { ManagerDashboard } from './features/manager/manager-dashboard/manager-dashboard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    App,
    Navbar,
    Login,
    Register,
    CustomerDashboard,
    ApplyLoan,
    EmiCalculator,
    LoanStatus,
    OfficerDashboard,
    ManagerDashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {}
