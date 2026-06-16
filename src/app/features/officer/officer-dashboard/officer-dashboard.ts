import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { WorkflowService } from '../../../core/services/workflow.service';
import { WorkflowTask } from '../../../core/models/workflow.model';

@Component({standalone: false, selector: 'app-officer-dashboard', templateUrl: './officer-dashboard.html', styleUrl: './officer-dashboard.scss' })
export class OfficerDashboard implements OnInit {
  tasks: WorkflowTask[] = []; isLoading = false; message = ''; errorMessage = '';
  constructor(private authService: AuthService, private workflowService: WorkflowService) {}
  ngOnInit(): void { this.loadTasks(); }
  loadTasks(): void { this.isLoading = true; this.workflowService.getTasksByRole('OFFICER').subscribe({ next: d => { this.tasks = d; this.isLoading = false; }, error: () => { this.errorMessage = 'Unable to load officer tasks.'; this.isLoading = false; } }); }
  review(task: WorkflowTask): void { this.message = ''; this.errorMessage = ''; this.workflowService.reviewLoan(task.loanId, { changedBy: this.authService.getUserId(), newStatus: 'UNDER_REVIEW', remarks: 'Documents verified by officer' }).subscribe({ next: () => { this.message = `Loan #${task.loanId} forwarded to manager.`; this.loadTasks(); }, error: e => this.errorMessage = e?.error?.message || 'Review failed.' }); }
}
