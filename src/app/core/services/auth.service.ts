import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}
  register(request: RegisterRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(tap(r => this.saveSession(r))); }
  login(request: LoginRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(tap(r => this.saveSession(r))); }
  saveSession(response: AuthResponse): void { localStorage.setItem('token', response.token); localStorage.setItem('userId', String(response.userId)); localStorage.setItem('fullName', response.fullName); localStorage.setItem('email', response.email); localStorage.setItem('role', response.role); }
  getToken(): string | null { return localStorage.getItem('token'); }
  getUserId(): number { return Number(localStorage.getItem('userId')); }
  getFullName(): string { return localStorage.getItem('fullName') || ''; }
  getRole(): string { return localStorage.getItem('role') || ''; }
  isLoggedIn(): boolean { return !!this.getToken(); }
  logout(): void { localStorage.clear(); this.router.navigate(['/login']); }
  redirectByRole(): void { const role = this.getRole(); if (role === 'CUSTOMER') this.router.navigate(['/customer/dashboard']); else if (role === 'OFFICER') this.router.navigate(['/officer/dashboard']); else if (role === 'MANAGER') this.router.navigate(['/manager/dashboard']); else this.router.navigate(['/login']); }
}
