import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoanApplicationRequest, LoanApplicationResponse } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly baseUrl = `${environment.apiBaseUrl}/loans`;

  constructor(private http: HttpClient) {}

  applyLoan(request: LoanApplicationRequest): Observable<LoanApplicationResponse> {
    return this.http
      .post<LoanApplicationResponse>(`${this.baseUrl}/apply`, request)
      .pipe(timeout(8000));
  }

  getLoanById(loanId: number): Observable<LoanApplicationResponse> {
    return this.http
      .get<LoanApplicationResponse>(`${this.baseUrl}/${loanId}`)
      .pipe(timeout(8000));
  }

  getLoansByCustomerId(customerId: number): Observable<LoanApplicationResponse[]> {
    return this.http
      .get<LoanApplicationResponse[]>(`${this.baseUrl}/customer/${customerId}`)
      .pipe(timeout(8000));
  }

  getAllLoans(): Observable<LoanApplicationResponse[]> {
    return this.http
      .get<LoanApplicationResponse[]>(`${this.baseUrl}/all`)
      .pipe(timeout(8000));
  }

  getLoansByStatus(status: string): Observable<LoanApplicationResponse[]> {
    return this.http
      .get<LoanApplicationResponse[]>(`${this.baseUrl}/status/${status}`)
      .pipe(timeout(8000));
  }
}