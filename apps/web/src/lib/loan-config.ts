/* ── Loan product configuration ─────────────────────────────────────────
   Single source of truth for rates, fees, limits used by:
   - Borrower application form   (/apply/new)
   - Admin settings              (/settings)
   - Application detail page     (/applications/[id])
   ────────────────────────────────────────────────────────────────────── */

export type LoanType = 'HOME' | 'PERSONAL' | 'BUSINESS' | 'AUTO' | 'EDUCATION' | 'GOLD'

export interface LoanProduct {
  label:      string
  emoji:      string
  rate:       number   // annual interest rate %
  fee:        number   // processing fee %
  minAmt:     number   // ₹
  maxAmt:     number   // ₹
  maxTenure:  number   // months
  autoApproveScore: number  // AI score threshold for auto-approve
}

export const DEFAULT_LOAN_CONFIG: Record<LoanType, LoanProduct> = {
  HOME:      { label: 'Home Loan',      emoji: '🏠', rate: 8.50,  fee: 0.50, minAmt: 500000,   maxAmt: 50000000, maxTenure: 300, autoApproveScore: 85 },
  PERSONAL:  { label: 'Personal Loan',  emoji: '💳', rate: 12.50, fee: 2.00, minAmt: 50000,    maxAmt: 2500000,  maxTenure: 84,  autoApproveScore: 80 },
  BUSINESS:  { label: 'Business Loan',  emoji: '🏢', rate: 14.00, fee: 1.50, minAmt: 100000,   maxAmt: 10000000, maxTenure: 120, autoApproveScore: 78 },
  AUTO:      { label: 'Auto Loan',      emoji: '🚗', rate: 10.50, fee: 1.00, minAmt: 100000,   maxAmt: 3000000,  maxTenure: 84,  autoApproveScore: 82 },
  EDUCATION: { label: 'Education Loan', emoji: '🎓', rate: 9.00,  fee: 0.50, minAmt: 50000,    maxAmt: 2000000,  maxTenure: 120, autoApproveScore: 75 },
  GOLD:      { label: 'Gold Loan',      emoji: '🏅', rate: 7.50,  fee: 0.25, minAmt: 10000,    maxAmt: 2000000,  maxTenure: 36,  autoApproveScore: 90 },
}

export const LOAN_TYPES = Object.keys(DEFAULT_LOAN_CONFIG) as LoanType[]

export const TYPE_CODE: Record<LoanType, string> = {
  HOME: 'HOM', PERSONAL: 'PRS', BUSINESS: 'BIZ', AUTO: 'AUT', EDUCATION: 'EDU', GOLD: 'GLD',
}

export function calcEMI(principal: number, annualRate: number, tenureMonths: number) {
  if (!principal || !tenureMonths || !annualRate) return 0
  const r = annualRate / (12 * 100)
  const n = tenureMonths
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function fmtINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}
