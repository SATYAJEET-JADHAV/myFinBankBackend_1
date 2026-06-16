import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StatusHistory, StatusUpdateRequest, WorkflowTask } from '../models/workflow.model';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly baseUrl = `${environment.apiBaseUrl}/workflow`;
  constructor(private http: HttpClient) {}
  getAllTasks(): Observable<WorkflowTask[]> { return this.http.get<WorkflowTask[]>(`${this.baseUrl}/tasks`); }
  getTasksByRole(role: string): Observable<WorkflowTask[]> { return this.http.get<WorkflowTask[]>(`${this.baseUrl}/tasks/role/${role}`); }
  reviewLoan(loanId: number, request: StatusUpdateRequest): Observable<WorkflowTask> { return this.http.put<WorkflowTask>(`${this.baseUrl}/review/${loanId}`, request); }
  approveLoan(loanId: number, request: StatusUpdateRequest): Observable<WorkflowTask> { return this.http.put<WorkflowTask>(`${this.baseUrl}/approve/${loanId}`, request); }
  rejectLoan(loanId: number, request: StatusUpdateRequest): Observable<WorkflowTask> { return this.http.put<WorkflowTask>(`${this.baseUrl}/reject/${loanId}`, request); }
  holdLoan(loanId: number, request: StatusUpdateRequest): Observable<WorkflowTask> { return this.http.put<WorkflowTask>(`${this.baseUrl}/hold/${loanId}`, request); }
  getLoanHistory(loanId: number): Observable<StatusHistory[]> { return this.http.get<StatusHistory[]>(`${this.baseUrl}/history/${loanId}`); }
}
