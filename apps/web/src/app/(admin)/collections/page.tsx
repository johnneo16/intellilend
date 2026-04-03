import React from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Phone, Mail } from 'lucide-react'

const COLLECTIONS = [
  { id: 'C001', borrower: 'Deepak Nair',   loan: 'L003', overdueDays: 5,  amount: 31500, bucket: 'BUCKET_1', action: 'Soft Reminder' },
  { id: 'C002', borrower: 'Ravi Kumar',    loan: 'L012', overdueDays: 18, amount: 22400, bucket: 'BUCKET_2', action: 'Call Required' },
  { id: 'C003', borrower: 'Fatima Sheikh', loan: 'L019', overdueDays: 45, amount: 18900, bucket: 'BUCKET_3', action: 'Legal Notice' },
]

export default function CollectionsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Collections" subtitle="3 overdue accounts · ₹72,800 at risk" />
      <div className="flex-1 p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Bucket 1 (1-30 days)',  count: 1, amount: 31500, color: '#f59e0b', bg: '#fefce8', border: '#fde68a' },
            { label: 'Bucket 2 (31-60 days)', count: 1, amount: 22400, color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
            { label: 'Bucket 3 (60+ days)',   count: 1, amount: 18900, color: '#dc2626', bg: '#fff1f2', border: '#fecdd3' },
          ].map(b => (
            <div key={b.label} className="rounded-xl p-4 bg-white" style={{ border: `1px solid ${b.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div className="text-2xl font-black text-slate-900">{b.count}</div>
              <div className="text-xs text-slate-500 mt-0.5">{b.label}</div>
              <div className="text-sm font-bold mt-1.5" style={{ color: b.color }}>{formatCurrency(b.amount)}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)', background: '#f8faff' }}>
            <h2 className="text-sm font-bold text-slate-800">Overdue Accounts</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f8faff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['Borrower', 'Loan', 'Overdue Days', 'EMI Due', 'Bucket', 'Recommended Action', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COLLECTIONS.map(col => (
                <tr key={col.id} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">{col.borrower}</td>
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-indigo-500">{col.loan}</td>
                  <td className="px-5 py-3.5"><span className="text-xs font-bold text-red-500">{col.overdueDays}d</span></td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-800">{formatCurrency(col.amount)}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={col.bucket === 'BUCKET_1' ? 'warning' : 'destructive'}>{col.bucket.replace('_',' ')}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{col.action}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors border border-transparent hover:border-indigo-100"><Phone className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors border border-transparent hover:border-indigo-100"><Mail className="w-3.5 h-3.5" /></button>
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
