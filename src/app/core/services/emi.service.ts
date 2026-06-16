import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmiRequest, EmiResponse } from '../models/loan.model';

@Injectable({ providedIn: 'root' })
export class EmiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/emi`;
  constructor(private http: HttpClient) {}
  calculateEmi(request: EmiRequest): Observable<EmiResponse> { return this.http.post<EmiResponse>(`${this.baseUrl}/calculate`, request); }
}
