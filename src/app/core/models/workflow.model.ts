export interface WorkflowTask { taskId: number; loanId: number; customerId: number; assignedRole: string; currentStage: string; status: string; createdAt: string; updatedAt: string; }
export interface StatusUpdateRequest { changedBy: number; newStatus: string; remarks: string; }
export interface StatusHistory { historyId: number; loanId: number; previousStatus: string; newStatus: string; changedBy: number; changedAt: string; }
