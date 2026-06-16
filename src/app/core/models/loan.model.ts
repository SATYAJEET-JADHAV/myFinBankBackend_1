export interface LoanApplicationRequest { customerId: number; vehicleType: string; vehiclePrice: number; loanAmount: number; interestRate: number; tenureMonths: number; }
export interface LoanApplicationResponse { loanId: number; customerId: number; vehicleType: string; vehiclePrice: number; loanAmount: number; interestRate: number; tenureMonths: number; emiAmount: number; status: string; createdAt: string; updatedAt: string; }
export interface EmiRequest { loanAmount: number; interestRate: number; tenureMonths: number; }
export interface EmiResponse { loanAmount: number; interestRate: number; tenureMonths: number; emiAmount: number; totalPayable: number; totalInterest: number; }
