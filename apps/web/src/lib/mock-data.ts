import type { LoanApplication, ChartDataPoint } from '@/types'

/* ── Chart data ─────────────────────────────────────────────────────── */
export const CHART_DATA: ChartDataPoint[] = [
  { month: 'Oct', disbursements: 4200000, collections: 3800000, npa: 2.1, applications: 142 },
  { month: 'Nov', disbursements: 5100000, collections: 4200000, npa: 2.3, applications: 165 },
  { month: 'Dec', disbursements: 4800000, collections: 4600000, npa: 2.0, applications: 158 },
  { month: 'Jan', disbursements: 6200000, collections: 5100000, npa: 1.9, applications: 203 },
  { month: 'Feb', disbursements: 5700000, collections: 5400000, npa: 2.2, applications: 189 },
  { month: 'Mar', disbursements: 7100000, collections: 5800000, npa: 1.7, applications: 241 },
]

/* ── Application ID generator ───────────────────────────────────────── */
const TYPE_CODE: Record<string, string> = {
  HOME: 'HOM', PERSONAL: 'PRS', BUSINESS: 'BIZ',
  AUTO: 'AUT', EDUCATION: 'EDU', GOLD: 'GLD',
}
export function makeAppId(loanType: string, seq: number) {
  const code = TYPE_CODE[loanType] ?? 'GEN'
  return `APP-${code}-${String(seq).padStart(6, '0')}`
}

/* ── Full applications data ─────────────────────────────────────────── */
export const ALL_APPLICATIONS: LoanApplication[] = [
  {
    id: '1', applicationNumber: 'APP-HOM-001247',
    applicant: { id: 'a1', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91-98765-43210', panNumber: 'ABCPS1234D', dateOfBirth: '1988-03-15', employmentType: 'SALARIED', monthlyIncome: 85000, creditScore: 758 },
    loanType: 'HOME', requestedAmount: 4500000, tenure: 240, purpose: 'Home purchase in Andheri West, Mumbai',
    status: 'AI_PROCESSING', foir: 38.2, aiScore: 78, aiRiskLevel: 'LOW',
    createdAt: '2024-03-20T10:30:00Z', updatedAt: '2024-03-20T11:15:00Z',
  },
  {
    id: '2', applicationNumber: 'APP-BIZ-001246',
    applicant: { id: 'a2', name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91-87654-32109', panNumber: 'ABCRV5678E', dateOfBirth: '1985-07-22', employmentType: 'SELF_EMPLOYED', monthlyIncome: 120000, creditScore: 692 },
    loanType: 'BUSINESS', requestedAmount: 2500000, tenure: 60, purpose: 'Working capital expansion for export business',
    status: 'UNDER_REVIEW', foir: 44.1, aiScore: 65, aiRiskLevel: 'MEDIUM',
    createdAt: '2024-03-20T09:15:00Z', updatedAt: '2024-03-20T10:45:00Z',
  },
  {
    id: '3', applicationNumber: 'APP-PRS-001245',
    applicant: { id: 'a3', name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91-76543-21098', panNumber: 'ABCAP9012F', dateOfBirth: '1992-11-08', employmentType: 'SALARIED', monthlyIncome: 65000, creditScore: 801 },
    loanType: 'PERSONAL', requestedAmount: 800000, tenure: 36, purpose: 'Wedding and related expenses',
    status: 'APPROVED', foir: 31.5, aiScore: 88, aiRiskLevel: 'LOW',
    createdAt: '2024-03-19T15:20:00Z', updatedAt: '2024-03-20T08:30:00Z',
  },
  {
    id: '4', applicationNumber: 'APP-AUT-001244',
    applicant: { id: 'a4', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91-65432-10987', panNumber: 'ABCVS3456G', dateOfBirth: '1979-05-14', employmentType: 'BUSINESS', monthlyIncome: 200000, creditScore: 634 },
    loanType: 'AUTO', requestedAmount: 1800000, tenure: 84, purpose: 'Commercial vehicle purchase (Tata Ace)',
    status: 'SUBMITTED', foir: 52.3, aiScore: 54, aiRiskLevel: 'HIGH',
    createdAt: '2024-03-19T12:10:00Z', updatedAt: '2024-03-19T12:10:00Z',
  },
  {
    id: '5', applicationNumber: 'APP-EDU-001243',
    applicant: { id: 'a5', name: 'Meera Krishnan', email: 'meera@example.com', phone: '+91-54321-09876', panNumber: 'ABCMK7890H', dateOfBirth: '1990-09-30', employmentType: 'SALARIED', monthlyIncome: 95000, creditScore: 775 },
    loanType: 'EDUCATION', requestedAmount: 1200000, tenure: 120, purpose: 'MBA program at IIM Bangalore',
    status: 'DISBURSED', foir: 29.8, aiScore: 91, aiRiskLevel: 'LOW',
    createdAt: '2024-03-18T14:00:00Z', updatedAt: '2024-03-20T09:00:00Z',
  },
  {
    id: '6', applicationNumber: 'APP-HOM-001242',
    applicant: { id: 'a6', name: 'Sunita Rao', email: 'sunita@example.com', phone: '+91-93456-78901', panNumber: 'ABCSR2345I', dateOfBirth: '1983-06-12', employmentType: 'SALARIED', monthlyIncome: 110000, creditScore: 812 },
    loanType: 'HOME', requestedAmount: 6500000, tenure: 300, purpose: 'New flat in Koramangala, Bangalore',
    status: 'APPROVED', foir: 35.1, aiScore: 92, aiRiskLevel: 'LOW',
    createdAt: '2024-03-18T11:00:00Z', updatedAt: '2024-03-19T16:00:00Z',
  },
  {
    id: '7', applicationNumber: 'APP-GLD-001241',
    applicant: { id: 'a7', name: 'Ramesh Nair', email: 'ramesh@example.com', phone: '+91-82345-67890', panNumber: 'ABCRN4567J', dateOfBirth: '1971-02-28', employmentType: 'SELF_EMPLOYED', monthlyIncome: 75000, creditScore: 711 },
    loanType: 'GOLD', requestedAmount: 350000, tenure: 24, purpose: 'Business emergency liquidity',
    status: 'DISBURSED', foir: 28.4, aiScore: 82, aiRiskLevel: 'LOW',
    createdAt: '2024-03-17T09:30:00Z', updatedAt: '2024-03-18T14:00:00Z',
  },
  {
    id: '8', applicationNumber: 'APP-PRS-001240',
    applicant: { id: 'a8', name: 'Fatima Sheikh', email: 'fatima@example.com', phone: '+91-71234-56789', panNumber: 'ABCFS6789K', dateOfBirth: '1995-08-19', employmentType: 'SALARIED', monthlyIncome: 55000, creditScore: 648 },
    loanType: 'PERSONAL', requestedAmount: 500000, tenure: 48, purpose: 'Home renovation',
    status: 'REJECTED', foir: 62.1, aiScore: 41, aiRiskLevel: 'HIGH',
    createdAt: '2024-03-16T14:20:00Z', updatedAt: '2024-03-17T10:00:00Z',
  },
  {
    id: '9', applicationNumber: 'APP-BIZ-001239',
    applicant: { id: 'a9', name: 'Kiran Desai', email: 'kiran@example.com', phone: '+91-60123-45678', panNumber: 'ABCKD8901L', dateOfBirth: '1982-04-05', employmentType: 'BUSINESS', monthlyIncome: 180000, creditScore: 745 },
    loanType: 'BUSINESS', requestedAmount: 5000000, tenure: 84, purpose: 'Manufacturing plant expansion',
    status: 'UNDER_REVIEW', foir: 41.2, aiScore: 74, aiRiskLevel: 'MEDIUM',
    createdAt: '2024-03-15T10:00:00Z', updatedAt: '2024-03-19T09:00:00Z',
  },
  {
    id: '10', applicationNumber: 'APP-EDU-001238',
    applicant: { id: 'a10', name: 'Arjun Mehta', email: 'arjun@example.com', phone: '+91-59012-34567', panNumber: 'ABCAM0123M', dateOfBirth: '1999-01-20', employmentType: 'SALARIED', monthlyIncome: 45000, creditScore: 699 },
    loanType: 'EDUCATION', requestedAmount: 2000000, tenure: 120, purpose: 'MS in Computer Science at US university',
    status: 'AI_PROCESSING', foir: 33.3, aiScore: 71, aiRiskLevel: 'MEDIUM',
    createdAt: '2024-03-20T08:00:00Z', updatedAt: '2024-03-20T08:45:00Z',
  },
  {
    id: '11', applicationNumber: 'APP-AUT-001237',
    applicant: { id: 'a11', name: 'Deepak Nair', email: 'deepak@example.com', phone: '+91-48901-23456', panNumber: 'ABCDN1234N', dateOfBirth: '1987-12-10', employmentType: 'SALARIED', monthlyIncome: 90000, creditScore: 733 },
    loanType: 'AUTO', requestedAmount: 950000, tenure: 60, purpose: 'Maruti Suzuki Brezza — family car',
    status: 'DISBURSED', foir: 37.8, aiScore: 84, aiRiskLevel: 'LOW',
    createdAt: '2024-03-14T13:00:00Z', updatedAt: '2024-03-16T11:00:00Z',
  },
  {
    id: '12', applicationNumber: 'APP-HOM-001236',
    applicant: { id: 'a12', name: 'Neha Gupta', email: 'neha@example.com', phone: '+91-37890-12345', panNumber: 'ABCNG2345O', dateOfBirth: '1991-07-25', employmentType: 'SALARIED', monthlyIncome: 130000, creditScore: 821 },
    loanType: 'HOME', requestedAmount: 8500000, tenure: 360, purpose: 'Villa in Whitefield, Bangalore',
    status: 'UNDER_REVIEW', foir: 43.5, aiScore: 86, aiRiskLevel: 'LOW',
    createdAt: '2024-03-20T07:00:00Z', updatedAt: '2024-03-20T12:00:00Z',
  },
]

/* Backwards-compat alias */
export const RECENT_APPLICATIONS = ALL_APPLICATIONS.slice(0, 5)

/* ── Application detail AI agent outputs ───────────────────────────── */
export const APPLICATION_AGENTS: Record<string, {
  agents: Array<{ name: string; status: string; confidence: number | null; tokens: number | null; ms: number | null; color: string; summary: string; flags: string[] }>
  timeline: Array<{ time: string; event: string; actor: string; type: string }>
}> = {
  '1': {
    agents: [
      { name: 'Document Intelligence', status: 'COMPLETED', confidence: 94, tokens: 1240, ms: 1200, color: '#6366f1', summary: 'All 4 KYC docs verified. Income ₹85K/mo confirmed from ITR & Form 16. PAN–Aadhaar linked. Address matched.', flags: [] },
      { name: 'Credit Decision',       status: 'COMPLETED', confidence: 87, tokens: 980, ms: 2800, color: '#f59e0b', summary: 'CIBIL 758. No defaults in 36 months. 3 active EMIs totalling ₹32,500. Inquiry count: 2 in 90 days.', flags: ['2 recent hard inquiries'] },
      { name: 'Risk Assessment',       status: 'PROCESSING', confidence: null, tokens: null, ms: null, color: '#8b5cf6', summary: 'Running FOIR stress-test and LTV calculation...', flags: [] },
      { name: 'Collections Forecast',  status: 'WAITING',   confidence: null, tokens: null, ms: null, color: '#10b981', summary: 'Awaiting risk assessment output to model default probability.', flags: [] },
    ],
    timeline: [
      { time: '10:30 AM', event: 'Application submitted via portal', actor: 'Priya Sharma', type: 'submit' },
      { time: '10:32 AM', event: 'Documents uploaded and queued for AI scan', actor: 'System', type: 'auto' },
      { time: '10:33 AM', event: 'Document Intelligence Agent completed', actor: 'AI', type: 'ai' },
      { time: '10:34 AM', event: 'Credit Decision Agent completed', actor: 'AI', type: 'ai' },
      { time: '10:35 AM', event: 'Risk Assessment in progress', actor: 'AI', type: 'ai' },
    ],
  },
  '2': {
    agents: [
      { name: 'Document Intelligence', status: 'COMPLETED', confidence: 81, tokens: 1100, ms: 1400, color: '#6366f1', summary: 'Business registration verified. ITR shows ₹1.44Cr annual revenue. GST returns consistent.', flags: ['Self-employed income variability noted'] },
      { name: 'Credit Decision',       status: 'COMPLETED', confidence: 69, tokens: 900, ms: 2200, color: '#f59e0b', summary: 'CIBIL 692. One 30-day delay in 2022. CC utilisation 68% (elevated). Working capital loan outstanding.', flags: ['CC utilisation > 60%', 'Late payment 2022'] },
      { name: 'Risk Assessment',       status: 'COMPLETED', confidence: 65, tokens: 760, ms: 1800, color: '#8b5cf6', summary: 'FOIR 44.1% — borderline. Business vintage 7 years — positive. Industry (exports) — moderate risk.', flags: ['FOIR approaching 50% threshold'] },
      { name: 'Collections Forecast',  status: 'COMPLETED', confidence: 62, tokens: 620, ms: 1100, color: '#10b981', summary: 'Default probability: 11.2% over 24 months. Recommend conditional approval with personal guarantee.', flags: ['Personal guarantee recommended'] },
    ],
    timeline: [
      { time: '09:15 AM', event: 'Application submitted via portal', actor: 'Rahul Verma', type: 'submit' },
      { time: '09:17 AM', event: 'AI pipeline completed (all 4 agents)', actor: 'AI', type: 'ai' },
      { time: '10:45 AM', event: 'Assigned to underwriter queue', actor: 'System', type: 'auto' },
      { time: '11:00 AM', event: 'Under manual review', actor: 'Arindam Chowdhury', type: 'human' },
    ],
  },
  '3': {
    agents: [
      { name: 'Document Intelligence', status: 'COMPLETED', confidence: 97, tokens: 980,  ms: 900,  color: '#6366f1', summary: 'All docs perfect. Income ₹65K confirmed. Aadhaar-PAN linked. 5-year employment at TCS.', flags: [] },
      { name: 'Credit Decision',       status: 'COMPLETED', confidence: 92, tokens: 840,  ms: 1800, color: '#f59e0b', summary: 'CIBIL 801. No defaults. Only 1 existing EMI of ₹8,200. Clean repayment track record.', flags: [] },
      { name: 'Risk Assessment',       status: 'COMPLETED', confidence: 88, tokens: 700,  ms: 1500, color: '#8b5cf6', summary: 'FOIR 31.5% — well within limits. Stable salaried income. Low-risk profile.', flags: [] },
      { name: 'Collections Forecast',  status: 'COMPLETED', confidence: 91, tokens: 580,  ms: 900,  color: '#10b981', summary: 'Default probability: 2.8% over 36 months. Recommend approval at standard rate.', flags: [] },
    ],
    timeline: [
      { time: '03:20 PM', event: 'Application submitted', actor: 'Anjali Patel', type: 'submit' },
      { time: '03:22 PM', event: 'AI pipeline completed', actor: 'AI', type: 'ai' },
      { time: '08:30 AM', event: 'Approved by underwriter', actor: 'Arindam Chowdhury', type: 'human' },
    ],
  },
}

/* ── Customers ──────────────────────────────────────────────────────── */
export const CUSTOMERS = [
  { id: 'c1', name: 'Priya Sharma',   email: 'priya@example.com',  phone: '+91-98765-43210', creditScore: 758, totalLoans: 1, activeLoans: 1, totalBorrowed: 4500000, outstanding: 4200000, status: 'ACTIVE',   joined: '2024-03-20', riskTag: 'LOW' },
  { id: 'c2', name: 'Rahul Verma',    email: 'rahul@example.com',  phone: '+91-87654-32109', creditScore: 692, totalLoans: 1, activeLoans: 1, totalBorrowed: 2500000, outstanding: 2350000, status: 'ACTIVE',   joined: '2024-03-20', riskTag: 'MEDIUM' },
  { id: 'c3', name: 'Anjali Patel',   email: 'anjali@example.com', phone: '+91-76543-21098', creditScore: 801, totalLoans: 2, activeLoans: 1, totalBorrowed: 1500000, outstanding: 650000,  status: 'ACTIVE',   joined: '2023-08-15', riskTag: 'LOW' },
  { id: 'c4', name: 'Vikram Singh',   email: 'vikram@example.com', phone: '+91-65432-10987', creditScore: 634, totalLoans: 1, activeLoans: 0, totalBorrowed: 1800000, outstanding: 0,       status: 'PROSPECT', joined: '2024-03-19', riskTag: 'HIGH' },
  { id: 'c5', name: 'Meera Krishnan', email: 'meera@example.com',  phone: '+91-54321-09876', creditScore: 775, totalLoans: 2, activeLoans: 2, totalBorrowed: 2600000, outstanding: 1750000, status: 'ACTIVE',   joined: '2023-06-10', riskTag: 'LOW' },
  { id: 'c6', name: 'Sunita Rao',     email: 'sunita@example.com', phone: '+91-93456-78901', creditScore: 812, totalLoans: 1, activeLoans: 1, totalBorrowed: 6500000, outstanding: 6100000, status: 'ACTIVE',   joined: '2024-03-18', riskTag: 'LOW' },
  { id: 'c7', name: 'Ramesh Nair',    email: 'ramesh@example.com', phone: '+91-82345-67890', creditScore: 711, totalLoans: 3, activeLoans: 1, totalBorrowed: 950000,  outstanding: 180000,  status: 'ACTIVE',   joined: '2022-11-20', riskTag: 'LOW' },
  { id: 'c8', name: 'Fatima Sheikh',  email: 'fatima@example.com', phone: '+91-71234-56789', creditScore: 648, totalLoans: 1, activeLoans: 0, totalBorrowed: 500000,  outstanding: 0,       status: 'INACTIVE', joined: '2024-03-16', riskTag: 'HIGH' },
  { id: 'c9', name: 'Kiran Desai',    email: 'kiran@example.com',  phone: '+91-60123-45678', creditScore: 745, totalLoans: 2, activeLoans: 1, totalBorrowed: 7500000, outstanding: 4800000, status: 'ACTIVE',   joined: '2023-02-28', riskTag: 'MEDIUM' },
  { id: 'c10', name: 'Arjun Mehta',   email: 'arjun@example.com',  phone: '+91-59012-34567', creditScore: 699, totalLoans: 1, activeLoans: 0, totalBorrowed: 2000000, outstanding: 0,       status: 'PROSPECT', joined: '2024-03-20', riskTag: 'MEDIUM' },
  { id: 'c11', name: 'Deepak Nair',   email: 'deepak@example.com', phone: '+91-48901-23456', creditScore: 733, totalLoans: 2, activeLoans: 1, totalBorrowed: 1850000, outstanding: 320000,  status: 'OVERDUE',  joined: '2023-05-01', riskTag: 'MEDIUM' },
  { id: 'c12', name: 'Neha Gupta',    email: 'neha@example.com',   phone: '+91-37890-12345', creditScore: 821, totalLoans: 1, activeLoans: 0, totalBorrowed: 8500000, outstanding: 0,       status: 'PROSPECT', joined: '2024-03-20', riskTag: 'LOW' },
]

/* ── Active loans ───────────────────────────────────────────────────── */
export const ACTIVE_LOANS = [
  { id: 'L001', appId: 'APP-EDU-001243', borrower: 'Meera Krishnan', type: 'EDUCATION', sanctioned: 1200000, outstanding: 1050000, emi: 14200, nextDue: '2024-04-05', daysOverdue: 0, status: 'CURRENT' },
  { id: 'L002', appId: 'APP-PRS-001245', borrower: 'Anjali Patel',   type: 'PERSONAL',  sanctioned: 800000,  outstanding: 650000,  emi: 23800, nextDue: '2024-04-08', daysOverdue: 0, status: 'CURRENT' },
  { id: 'L003', appId: 'APP-HOM-001237', borrower: 'Deepak Nair',    type: 'HOME',      sanctioned: 3500000, outstanding: 3200000, emi: 31500, nextDue: '2024-03-28', daysOverdue: 5, status: 'OVERDUE' },
  { id: 'L004', appId: 'APP-AUT-001237', borrower: 'Sunita Rao',     type: 'AUTO',      sanctioned: 950000,  outstanding: 720000,  emi: 18400, nextDue: '2024-04-10', daysOverdue: 0, status: 'CURRENT' },
  { id: 'L005', appId: 'APP-GLD-001241', borrower: 'Ramesh Nair',    type: 'GOLD',      sanctioned: 350000,  outstanding: 180000,  emi: 15200, nextDue: '2024-04-01', daysOverdue: 0, status: 'CURRENT' },
  { id: 'L006', appId: 'APP-BIZ-001246', borrower: 'Rahul Verma',    type: 'BUSINESS',  sanctioned: 2500000, outstanding: 2350000, emi: 48300, nextDue: '2024-03-31', daysOverdue: 0, status: 'CURRENT' },
]

/* ── Portfolio mix ──────────────────────────────────────────────────── */
export const PORTFOLIO_MIX = [
  { name: 'Home Loans',     value: 42, color: '#6366f1' },
  { name: 'Personal Loans', value: 28, color: '#f59e0b' },
  { name: 'Business Loans', value: 18, color: '#10b981' },
  { name: 'Auto Loans',     value: 8,  color: '#3b82f6' },
  { name: 'Education',      value: 4,  color: '#ec4899' },
]

/* ── Funnel ─────────────────────────────────────────────────────────── */
export const FUNNEL_DATA = [
  { stage: 'Applications', count: 241, pct: 100, color: '#6366f1' },
  { stage: 'Docs Complete', count: 198, pct: 82,  color: '#818cf8' },
  { stage: 'AI Reviewed',  count: 172, pct: 71,  color: '#f59e0b' },
  { stage: 'Approved',     count: 134, pct: 56,  color: '#10b981' },
  { stage: 'Disbursed',    count: 118, pct: 49,  color: '#3b82f6' },
]

/* ── Activity feed ──────────────────────────────────────────────────── */
export const ACTIVITY_FEED = [
  { id: 1, type: 'approval',    text: 'APP-PRS-001245 approved — Anjali Patel',         sub: 'AI Score 88 · FOIR 31.5%',    time: '2 min ago',  color: '#10b981' },
  { id: 2, type: 'ai',          text: 'AI pipeline completed — APP-HOM-001247',          sub: '4 agents · 5,080 tokens · 7s', time: '5 min ago',  color: '#6366f1' },
  { id: 3, type: 'disbursement',text: 'Disbursement ₹12L — APP-EDU-001243',              sub: 'Meera Krishnan · HDFC Bank',   time: '18 min ago', color: '#3b82f6' },
  { id: 4, type: 'alert',       text: 'Overdue alert — L003 Deepak Nair',               sub: '5 days past due · ₹31,500',    time: '1 hr ago',   color: '#ef4444' },
  { id: 5, type: 'application', text: 'New application — APP-HOM-001236 Neha Gupta',    sub: 'Home Loan ₹85L',               time: '2 hrs ago',  color: '#f59e0b' },
  { id: 6, type: 'rejection',   text: 'APP-PRS-001240 rejected — Fatima Sheikh',        sub: 'FOIR 62.1% — exceeds limit',   time: '4 hrs ago',  color: '#ef4444' },
  { id: 7, type: 'application', text: 'New application — APP-BIZ-001239 Kiran Desai',   sub: 'Business Loan ₹50L',           time: '5 hrs ago',  color: '#f59e0b' },
]

/* ── Risk rules ─────────────────────────────────────────────────────── */
export const RISK_RULES = [
  { id: 'r1', name: 'FOIR Cap',               value: '55%',     status: 'ACTIVE',   category: 'Income', desc: 'Reject if Fixed Obligations-to-Income Ratio exceeds 55%', triggeredToday: 3 },
  { id: 'r2', name: 'Minimum CIBIL Score',    value: '650',     status: 'ACTIVE',   category: 'Credit', desc: 'Flag for manual review if CIBIL score is below 650', triggeredToday: 1 },
  { id: 'r3', name: 'Max LTV — Home Loan',    value: '80%',     status: 'ACTIVE',   category: 'Collateral', desc: 'Home loans: loan-to-value ratio must not exceed 80%', triggeredToday: 0 },
  { id: 'r4', name: 'NTC Flag',               value: 'New-to-Credit', status: 'ACTIVE', category: 'Credit', desc: 'Flag applicants with no credit history for additional scrutiny', triggeredToday: 2 },
  { id: 'r5', name: 'Hard Inquiry Cap',       value: '3 in 90d', status: 'ACTIVE',  category: 'Credit', desc: 'Flag if more than 3 hard credit inquiries in the last 90 days', triggeredToday: 1 },
  { id: 'r6', name: 'Business Vintage',       value: '3 years', status: 'ACTIVE',   category: 'Business', desc: 'Business loans require minimum 3 years of business operation', triggeredToday: 0 },
  { id: 'r7', name: 'NPA Blacklist Check',    value: 'Zero tolerance', status: 'ACTIVE', category: 'Compliance', desc: 'Auto-reject if applicant appears in RBI NPA or CERSAI database', triggeredToday: 0 },
  { id: 'r8', name: 'Max Loan Tenure — Gold', value: '24 months', status: 'ACTIVE', category: 'Product', desc: 'Gold loans: maximum tenure capped at 24 months', triggeredToday: 0 },
]

/* ── Alerts ─────────────────────────────────────────────────────────── */
export const ALERTS = [
  { id: 'al1', type: 'OVERDUE',     title: 'EMI Overdue — L003',             body: 'Deepak Nair (L003) is 5 days past due on ₹31,500 EMI. Soft reminder sent.', time: '1 hr ago',   priority: 'HIGH',   read: false },
  { id: 'al2', type: 'AI_FLAG',     title: 'AI flagged APP-AUT-001244',      body: 'Vikram Singh application AI score 54 — below threshold. Manual review required.', time: '2 hrs ago', priority: 'HIGH', read: false },
  { id: 'al3', type: 'RISK',        title: 'FOIR breach — APP-PRS-001240',   body: 'Fatima Sheikh FOIR 62.1% exceeds 55% cap. Application auto-rejected.', time: '4 hrs ago', priority: 'MEDIUM', read: true },
  { id: 'al4', type: 'SYSTEM',      title: 'AI model accuracy update',       body: 'Collections prediction model updated to v2.3.1. Accuracy improved to 91.4%.', time: '6 hrs ago', priority: 'LOW', read: true },
  { id: 'al5', type: 'DISBURSEMENT',title: 'Disbursement confirmed — L004',  body: '₹9.5L disbursed to Sunita Rao HDFC account. Reference: TXN2024031801.', time: '8 hrs ago', priority: 'LOW', read: true },
  { id: 'al6', type: 'COMPLIANCE',  title: 'RBI audit report due in 7 days', body: 'Quarterly RBI compliance submission deadline: 27 March 2024. 3 reports pending.', time: '1 day ago', priority: 'HIGH', read: false },
]
