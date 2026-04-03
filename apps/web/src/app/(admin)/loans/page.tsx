import React from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

const ACTIVE_LOANS = [
  { id: 'L001', borrower: 'Meera Krishnan', type: 'EDUCATION', amount: 1200000, outstanding: 1050000, emi: 14200, nextDue: '2024-04-05', status: 'CURRENT' },
  { id: 'L002', borrower: 'Anjali Patel',   type: 'PERSONAL',  amount: 800000,  outstanding: 650000,  emi: 23800, nextDue: '2024-04-10', status: 'CURRENT' },
  { id: 'L003', borrower: 'Deepak Nair',    type: 'HOME',      amount: 3500000, outstanding: 3200000, emi: 31500, nextDue: '2024-04-03', status: 'OVERDUE' },
  { id: 'L004', borrower: 'Sunita Rao',     type: 'AUTO',      amount: 950000,  outstanding: 720000,  emi: 18400, nextDue: '2024-04-08', status: 'CURRENT' },
]

export default function LoansPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Active Loans" subtitle={`${ACTIVE_LOANS.length} active · ₹5.62Cr outstanding`} />
      <div className="flex-1 p-5">
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)', background: '#f8faff' }}>
            <h2 className="text-sm font-bold text-slate-800">Loan Portfolio</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">4 active loans · ₹5.62Cr outstanding balance</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f8faff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['Loan ID', 'Borrower', 'Type', 'Sanctioned', 'Outstanding', 'EMI', 'Next Due', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVE_LOANS.map(loan => (
                <tr key={loan.id} className="border-b hover:bg-indigo-50/30 transition-colors" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-indigo-500">{loan.id}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">{loan.borrower}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{loan.type}</td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-800">{formatCurrency(loan.amount)}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{formatCurrency(loan.outstanding)}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{formatCurrency(loan.emi)}/mo</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{loan.nextDue}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={loan.status === 'CURRENT' ? 'success' : 'destructive'}>{loan.status}</Badge>
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
