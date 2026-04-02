import React from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { AlertTriangle, Phone, Mail, Clock } from 'lucide-react'

const COLLECTIONS = [
  { id: 'C001', borrower: 'Deepak Nair',   loan: 'L003', overdueDays: 5,  amount: 31500, bucket: 'BUCKET_1', action: 'Soft Reminder' },
  { id: 'C002', borrower: 'Ravi Kumar',    loan: 'L012', overdueDays: 18, amount: 22400, bucket: 'BUCKET_2', action: 'Call Required' },
  { id: 'C003', borrower: 'Fatima Sheikh', loan: 'L019', overdueDays: 45, amount: 18900, bucket: 'BUCKET_3', action: 'Legal Notice' },
]

const BUCKET_COLORS: Record<string, string> = {
  BUCKET_1: 'warning', BUCKET_2: 'destructive', BUCKET_3: 'destructive'
}

export default function CollectionsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin">
      <Header title="Collections" subtitle="3 overdue accounts · ₹72,800 at risk" />
      <div className="flex-1 p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Bucket 1 (1-30 days)',  count: 1, amount: 31500,  color: '#f59e0b' },
            { label: 'Bucket 2 (31-60 days)', count: 1, amount: 22400,  color: '#ef4444' },
            { label: 'Bucket 3 (60+ days)',   count: 1, amount: 18900,  color: '#7f1d1d' },
          ].map(b => (
            <div key={b.label} className="glass-card rounded-xl p-4">
              <div className="text-lg font-bold text-white">{b.count}</div>
              <div className="text-xs text-slate-400">{b.label}</div>
              <div className="text-sm font-semibold mt-1" style={{ color: b.color }}>{formatCurrency(b.amount)}</div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800/60">
            <h2 className="text-sm font-semibold text-slate-100">Overdue Accounts</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/40">
                {['Borrower', 'Loan', 'Overdue Days', 'EMI Due', 'Bucket', 'Recommended Action', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COLLECTIONS.map(col => (
                <tr key={col.id} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-200">{col.borrower}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-brand-400">{col.loan}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold text-red-400">{col.overdueDays}d</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-200">{formatCurrency(col.amount)}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={(BUCKET_COLORS[col.bucket] || 'secondary') as any}>{col.bucket.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-300">{col.action}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Phone className="w-3.5 h-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Mail className="w-3.5 h-3.5" /></Button>
                    </div>
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
