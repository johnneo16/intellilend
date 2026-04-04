'use client'
import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Phone, Mail, MessageCircle, X, Send } from 'lucide-react'

const COLLECTIONS = [
  { id: 'C001', borrower: 'Deepak Nair',   loan: 'L003', overdueDays: 5,  amount: 31500, bucket: 'BUCKET_1', action: 'Soft Reminder', email: 'deepak.nair@email.com',   phone: '+91 98765 43210' },
  { id: 'C002', borrower: 'Ravi Kumar',    loan: 'L012', overdueDays: 18, amount: 22400, bucket: 'BUCKET_2', action: 'Call Required', email: 'ravi.kumar@email.com',     phone: '+91 87654 32109' },
  { id: 'C003', borrower: 'Fatima Sheikh', loan: 'L019', overdueDays: 45, amount: 18900, bucket: 'BUCKET_3', action: 'Legal Notice',  email: 'fatima.sheikh@email.com',  phone: '+91 76543 21098' },
]

type ModalType = 'call' | 'mail' | 'whatsapp' | null

export default function CollectionsPage() {
  const [modal, setModal] = useState<{ type: ModalType; borrower: typeof COLLECTIONS[number] } | null>(null)
  const [mailBody, setMailBody] = useState('')
  const [sent, setSent] = useState(false)

  function openModal(type: ModalType, borrower: typeof COLLECTIONS[number]) {
    setModal({ type, borrower })
    setSent(false)
    setMailBody(
      type === 'mail'
        ? `Dear ${borrower.borrower},\n\nThis is a reminder that your EMI payment of ${formatCurrency(borrower.amount)} on loan ${borrower.loan} is overdue by ${borrower.overdueDays} day(s).\n\nKindly make the payment at the earliest to avoid penalties.\n\nRegards,\nIntelliLend Collections Team`
        : ''
    )
  }

  function handleSend() {
    setSent(true)
    setTimeout(() => setModal(null), 1500)
  }

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Collections" subtitle="3 overdue accounts · ₹72,800 at risk" />
      <div className="flex-1 p-5 space-y-4">

        {/* Bucket summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Bucket 1 (1-30 days)',  count: 1, amount: 31500, color: '#f59e0b', border: '#fde68a' },
            { label: 'Bucket 2 (31-60 days)', count: 1, amount: 22400, color: '#ef4444', border: '#fecaca' },
            { label: 'Bucket 3 (60+ days)',   count: 1, amount: 18900, color: '#dc2626', border: '#fecdd3' },
          ].map(b => (
            <div key={b.label} className="rounded-xl p-4 bg-white" style={{ border: `1px solid ${b.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div className="text-2xl font-black text-slate-900">{b.count}</div>
              <div className="text-xs text-slate-500 mt-0.5">{b.label}</div>
              <div className="text-sm font-bold mt-1.5" style={{ color: b.color }}>{formatCurrency(b.amount)}</div>
            </div>
          ))}
        </div>

        {/* Overdue accounts table */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(0,0,0,0.06)', background: '#f8faff' }}>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Overdue Accounts</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Use Phone · Mail · WhatsApp to contact borrowers</p>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f8faff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {['Borrower', 'Loan', 'Overdue', 'EMI Due', 'Bucket', 'Recommended Action', 'Contact'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COLLECTIONS.map(col => (
                <tr key={col.id} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <td className="px-5 py-3.5">
                    <div className="text-xs font-semibold text-slate-700">{col.borrower}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{col.email}</div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-indigo-500">{col.loan}</td>
                  <td className="px-5 py-3.5"><span className="text-xs font-bold text-red-500">{col.overdueDays}d</span></td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-800">{formatCurrency(col.amount)}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={col.bucket === 'BUCKET_1' ? 'warning' : 'destructive'}>{col.bucket.replace('_',' ')}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{col.action}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      {/* Call */}
                      <button
                        onClick={() => openModal('call', col)}
                        title="Call borrower"
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all border hover:scale-[1.04]"
                        style={{ color: '#6366f1', background: '#eef2ff', borderColor: '#c7d2fe' }}
                      >
                        <Phone className="w-3 h-3" /> Call
                      </button>
                      {/* Mail */}
                      <button
                        onClick={() => openModal('mail', col)}
                        title="Send email"
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all border hover:scale-[1.04]"
                        style={{ color: '#0ea5e9', background: '#f0f9ff', borderColor: '#bae6fd' }}
                      >
                        <Mail className="w-3 h-3" /> Mail
                      </button>
                      {/* WhatsApp */}
                      <button
                        onClick={() => openModal('whatsapp', col)}
                        title="WhatsApp message"
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all border hover:scale-[1.04]"
                        style={{ color: '#16a34a', background: '#f0fdf4', borderColor: '#bbf7d0' }}
                      >
                        <MessageCircle className="w-3 h-3" /> WhatsApp
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              <div className="flex items-center gap-2">
                {modal.type === 'call' && <Phone className="w-4 h-4 text-indigo-500" />}
                {modal.type === 'mail' && <Mail className="w-4 h-4 text-sky-500" />}
                {modal.type === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-600" />}
                <h3 className="text-sm font-bold text-slate-800">
                  {modal.type === 'call' ? 'Call Borrower' : modal.type === 'mail' ? 'Send Email' : 'WhatsApp Message'}
                </h3>
              </div>
              <button onClick={() => setModal(null)} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Borrower info */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f8faff', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                     style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  {modal.borrower.borrower.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{modal.borrower.borrower}</div>
                  <div className="text-[11px] text-slate-400">{modal.borrower.phone} · {modal.borrower.email}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs font-bold text-red-500">{formatCurrency(modal.borrower.amount)}</div>
                  <div className="text-[10px] text-slate-400">{modal.borrower.overdueDays}d overdue</div>
                </div>
              </div>

              {/* Call modal */}
              {modal.type === 'call' && (
                <div className="text-center space-y-3">
                  <div className="text-xs text-slate-500">Initiating outbound call to</div>
                  <div className="text-2xl font-black text-slate-900">{modal.borrower.phone}</div>
                  <p className="text-xs text-slate-400">Call will be recorded and logged for compliance</p>
                  {sent ? (
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Call initiated
                    </div>
                  ) : (
                    <button
                      onClick={handleSend}
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                      <Phone className="w-4 h-4 inline mr-2" /> Call Now
                    </button>
                  )}
                </div>
              )}

              {/* Mail modal */}
              {modal.type === 'mail' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To</label>
                    <div className="mt-1 text-sm text-slate-700 font-medium">{modal.borrower.email}</div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                    <div className="mt-1 text-sm text-slate-700">EMI Payment Reminder — Loan {modal.borrower.loan}</div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea
                      className="mt-1 w-full text-xs text-slate-700 resize-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-300"
                      style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#f8faff', minHeight: 120 }}
                      value={mailBody}
                      onChange={e => setMailBody(e.target.value)}
                    />
                  </div>
                  {sent ? (
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Email sent!
                    </div>
                  ) : (
                    <button
                      onClick={handleSend}
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
                    >
                      <Send className="w-4 h-4" /> Send Email
                    </button>
                  )}
                </div>
              )}

              {/* WhatsApp modal */}
              {modal.type === 'whatsapp' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Message Preview</label>
                    <div
                      className="mt-2 rounded-xl p-3 text-xs text-slate-700 leading-relaxed"
                      style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                    >
                      Hi {modal.borrower.borrower.split(' ')[0]}! 👋 Your EMI of *{formatCurrency(modal.borrower.amount)}* on loan *{modal.borrower.loan}* is overdue by *{modal.borrower.overdueDays} days*. Please pay via UPI to avoid penalties. Reply STOP to opt out.
                    </div>
                  </div>
                  {sent ? (
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> WhatsApp sent!
                    </div>
                  ) : (
                    <button
                      onClick={handleSend}
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}
                    >
                      <MessageCircle className="w-4 h-4" /> Send WhatsApp
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
