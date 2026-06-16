import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const clonedRequest = token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
    return next.handle(clonedRequest).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) { localStorage.clear(); this.router.navigate(['/login']); }
      return throwError(() => error);
    }));
  }
}
