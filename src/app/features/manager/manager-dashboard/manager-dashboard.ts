import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { WorkflowService } from '../../../core/services/workflow.service';
import { WorkflowTask } from '../../../core/models/workflow.model';

@Component({standalone: false, selector: 'app-manager-dashboard', templateUrl: './manager-dashboard.html', styleUrl: './manager-dashboard.scss' })
export class ManagerDashboard implements OnInit {
  tasks: WorkflowTask[] = []; isLoading = false; message = ''; errorMessage = '';
  constructor(private authService: AuthService, private workflowService: WorkflowService) {}
  ngOnInit(): void { this.loadTasks(); }
  loadTasks(): void { this.isLoading = true; this.workflowService.getTasksByRole('MANAGER').subscribe({ next: d => { this.tasks = d; this.isLoading = false; }, error: () => { this.errorMessage = 'Unable to load manager tasks.'; this.isLoading = false; } }); }
  approve(task: WorkflowTask): void { this.perform(task, 'APPROVED'); }
  reject(task: WorkflowTask): void { this.perform(task, 'REJECTED'); }
  hold(task: WorkflowTask): void { this.perform(task, 'ON_HOLD'); }
  private perform(task: WorkflowTask, status: string): void { this.message = ''; this.errorMessage = ''; const request = { changedBy: this.authService.getUserId(), newStatus: status, remarks: `Manager marked loan as ${status}` }; const call = status === 'APPROVED' ? this.workflowService.approveLoan(task.loanId, request) : status === 'REJECTED' ? this.workflowService.rejectLoan(task.loanId, request) : this.workflowService.holdLoan(task.loanId, request); call.subscribe({ next: () => { this.message = `Loan #${task.loanId} updated to ${status}.`; this.loadTasks(); }, error: e => this.errorMessage = e?.error?.message || 'Action failed.' }); }
}
