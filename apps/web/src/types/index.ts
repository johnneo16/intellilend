export type LoanStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'AI_PROCESSING'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED'
  | 'ACTIVE'
  | 'CLOSED'
  | 'DEFAULTED'
  | 'NPA'

export type LoanType = 'PERSONAL' | 'HOME' | 'AUTO' | 'BUSINESS' | 'EDUCATION' | 'GOLD'

export interface Applicant {
  id: string
  name: string
  email: string
  phone: string
  panNumber: string
  aadhaarNumber?: string
  dateOfBirth: string
  employmentType: 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS'
  monthlyIncome: number
  creditScore: number
}

export interface LoanApplication {
  id: string
  applicationNumber: string
  applicant: Applicant
  loanType: LoanType
  requestedAmount: number
  tenure: number
  purpose: string
  status: LoanStatus
  foir: number
  ltv?: number
  aiScore?: number
  aiRiskLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  createdAt: string
  updatedAt: string
}

export interface KPICard {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: string
  color: string
  sparkline?: number[]
}

export interface ChartDataPoint {
  month: string
  disbursements: number
  collections: number
  npa: number
  applications: number
}

export interface AgentDecision {
  agentName: string
  agentType: 'DOCUMENT_INTELLIGENCE' | 'CREDIT_DECISION' | 'COLLECTIONS'
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  confidence: number
  reasoning: string
  flags: string[]
  tokensUsed?: number
  processingMs?: number
}
