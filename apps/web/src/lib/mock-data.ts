import type { LoanApplication, ChartDataPoint } from '@/types'

export const CHART_DATA: ChartDataPoint[] = [
  { month: 'Oct', disbursements: 4200000, collections: 3800000, npa: 2.1, applications: 142 },
  { month: 'Nov', disbursements: 5100000, collections: 4200000, npa: 2.3, applications: 165 },
  { month: 'Dec', disbursements: 4800000, collections: 4600000, npa: 2.0, applications: 158 },
  { month: 'Jan', disbursements: 6200000, collections: 5100000, npa: 1.9, applications: 203 },
  { month: 'Feb', disbursements: 5700000, collections: 5400000, npa: 2.2, applications: 189 },
  { month: 'Mar', disbursements: 7100000, collections: 5800000, npa: 1.7, applications: 241 },
]

export const RECENT_APPLICATIONS: LoanApplication[] = [
  {
    id: '1', applicationNumber: 'ILL-2024-001247',
    applicant: { id: 'a1', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91-98765-43210', panNumber: 'ABCPS1234D', dateOfBirth: '1988-03-15', employmentType: 'SALARIED', monthlyIncome: 85000, creditScore: 758 },
    loanType: 'HOME', requestedAmount: 4500000, tenure: 240, purpose: 'Home purchase in Andheri West',
    status: 'AI_PROCESSING', foir: 38.2, aiScore: 78, aiRiskLevel: 'LOW',
    createdAt: '2024-03-20T10:30:00Z', updatedAt: '2024-03-20T11:15:00Z',
  },
  {
    id: '2', applicationNumber: 'ILL-2024-001246',
    applicant: { id: 'a2', name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91-87654-32109', panNumber: 'ABCRV5678E', dateOfBirth: '1985-07-22', employmentType: 'SELF_EMPLOYED', monthlyIncome: 120000, creditScore: 692 },
    loanType: 'BUSINESS', requestedAmount: 2500000, tenure: 60, purpose: 'Working capital expansion',
    status: 'UNDER_REVIEW', foir: 44.1, aiScore: 65, aiRiskLevel: 'MEDIUM',
    createdAt: '2024-03-20T09:15:00Z', updatedAt: '2024-03-20T10:45:00Z',
  },
  {
    id: '3', applicationNumber: 'ILL-2024-001245',
    applicant: { id: 'a3', name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91-76543-21098', panNumber: 'ABCAP9012F', dateOfBirth: '1992-11-08', employmentType: 'SALARIED', monthlyIncome: 65000, creditScore: 801 },
    loanType: 'PERSONAL', requestedAmount: 800000, tenure: 36, purpose: 'Wedding expenses',
    status: 'APPROVED', foir: 31.5, aiScore: 88, aiRiskLevel: 'LOW',
    createdAt: '2024-03-19T15:20:00Z', updatedAt: '2024-03-20T08:30:00Z',
  },
  {
    id: '4', applicationNumber: 'ILL-2024-001244',
    applicant: { id: 'a4', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91-65432-10987', panNumber: 'ABCVS3456G', dateOfBirth: '1979-05-14', employmentType: 'BUSINESS', monthlyIncome: 200000, creditScore: 634 },
    loanType: 'AUTO', requestedAmount: 1800000, tenure: 84, purpose: 'Commercial vehicle purchase',
    status: 'SUBMITTED', foir: 52.3, aiScore: 54, aiRiskLevel: 'HIGH',
    createdAt: '2024-03-19T12:10:00Z', updatedAt: '2024-03-19T12:10:00Z',
  },
  {
    id: '5', applicationNumber: 'ILL-2024-001243',
    applicant: { id: 'a5', name: 'Meera Krishnan', email: 'meera@example.com', phone: '+91-54321-09876', panNumber: 'ABCMK7890H', dateOfBirth: '1990-09-30', employmentType: 'SALARIED', monthlyIncome: 95000, creditScore: 775 },
    loanType: 'EDUCATION', requestedAmount: 1200000, tenure: 120, purpose: 'MBA program at IIM',
    status: 'DISBURSED', foir: 29.8, aiScore: 91, aiRiskLevel: 'LOW',
    createdAt: '2024-03-18T14:00:00Z', updatedAt: '2024-03-20T09:00:00Z',
  },
]

export const PORTFOLIO_MIX = [
  { name: 'Home Loans',     value: 42, color: '#6366f1' },
  { name: 'Personal Loans', value: 28, color: '#f59e0b' },
  { name: 'Business Loans', value: 18, color: '#10b981' },
  { name: 'Auto Loans',     value: 8,  color: '#3b82f6' },
  { name: 'Education',      value: 4,  color: '#ec4899' },
]

export const FUNNEL_DATA = [
  { stage: 'Applications', count: 241, pct: 100, color: '#6366f1' },
  { stage: 'Docs Complete', count: 198, pct: 82,  color: '#818cf8' },
  { stage: 'AI Reviewed',  count: 172, pct: 71,  color: '#f59e0b' },
  { stage: 'Approved',     count: 134, pct: 56,  color: '#10b981' },
  { stage: 'Disbursed',    count: 118, pct: 49,  color: '#3b82f6' },
]
