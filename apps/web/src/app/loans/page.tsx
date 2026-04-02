import React from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { CreditCard } from 'lucide-react'

const ACTIVE_LOANS = [
  { id: 'L001', borrower: 'Meera Krishnan', type: 'EDUCATION', amount: 1200000, outstanding: 1050000, emi: 14200, nextDue: '2024-04-05', status: 'CURRENT' },
  { id: 'L002', borrower: 'Anjali Patel',   type: 'PERSONAL',  amount: 800000,  outstanding: 650000,  emi: 23800, nextDue: '2024-04-10', status: 'CURRENT' },
  { id: 'L003', borrower: 'Deepak Nair',    type: 'HOME',      amount: 3500000, outstanding: 3200000, emi: 31500, nextDue: '2024-04-03', status: 'OVERDUE' },
  { id: 'L004', borrower: 'Sunita Rao',     type: 'AUTO',      amount: 950000,  outstanding: 720000,  emi: 18400, nextDue: '2024-04-08', status: 'CURRENT' },
]

export default function LoansPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin">
      <Header title="Active Loans" subtitle={`${ACTIVE_LOANS.length} active · ₹5.62Cr outstanding`} />
      <div className="flex-1 p-6">
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800/60">
            <h2 className="text-sm font-semibold text-slate-100">Loan Portfolio</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/40">
                {['Loan ID', 'Borrower', 'Type', 'Sanctioned', 'Outstanding', 'EMI', 'Next Due', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVE_LOANS.map(loan => (
                <tr key={loan.id} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-brand-400">{loan.id}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-200">{loan.borrower}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{loan.type}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-200">{formatCurrency(loan.amount)}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-300">{formatCurrency(loan.outstanding)}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-300">{formatCurrency(loan.emi)}/mo</td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{loan.nextDue}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={loan.status === 'CURRENT' ? 'success' : 'destructive'}>
                      {loan.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
