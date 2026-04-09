'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search, Smartphone, Copy, CheckCircle2, ArrowLeft, Shield, Zap, QrCode,
} from 'lucide-react'

type State = 'LOOKUP' | 'PAYMENT' | 'CONFIRMATION'

const MOCK_LOAN = {
  id: 'ILL-2024-001247',
  borrower: 'Priya Sharma',
  loanType: 'Home Loan',
  outstandingAmount: 4312500,
  emiAmount: 39450,
  dueDate: '2026-04-05',
  overdueDays: 0,
  upiId: 'intellilend@paytm',
}

function formatINR(amount: number) {
  return '₹' + amount.toLocaleString('en-IN')
}

function isValidLoanId(input: string) {
  const val = input.trim().toUpperCase()
  return val.startsWith('ILL-') || val.startsWith('L0')
}

const UPI_APPS = [
  {
    name: 'PhonePe',
    emoji: '🟣',
    color: '#5f259f',
    borderColor: '#5f259f',
    bgColor: '#f9f5ff',
    link: (loan: typeof MOCK_LOAN) =>
      `phonepe://pay?pa=${loan.upiId}&pn=IntelliLend&am=${loan.emiAmount}&cu=INR&tn=EMI-${loan.id}`,
  },
  {
    name: 'Google Pay',
    emoji: '🔵',
    color: '#1a73e8',
    borderColor: '#1a73e8',
    bgColor: '#f0f7ff',
    link: (loan: typeof MOCK_LOAN) =>
      `tez://upi/pay?pa=${loan.upiId}&pn=IntelliLend&am=${loan.emiAmount}&cu=INR&tn=EMI`,
  },
  {
    name: 'Paytm',
    emoji: '🔴',
    color: '#00baf2',
    borderColor: '#e53935',
    bgColor: '#fff5f5',
    link: (loan: typeof MOCK_LOAN) =>
      `paytmmp://pay?pa=${loan.upiId}&pn=IntelliLend&am=${loan.emiAmount}`,
  },
  {
    name: 'BHIM UPI',
    emoji: '🟠',
    color: '#f57c00',
    borderColor: '#f57c00',
    bgColor: '#fff8f0',
    link: (loan: typeof MOCK_LOAN) =>
      `upi://pay?pa=${loan.upiId}&pn=IntelliLend&am=${loan.emiAmount}&cu=INR`,
  },
]

export default function PayPage() {
  const [state, setState] = useState<State>('LOOKUP')
  const [loanInput, setLoanInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loan, setLoan] = useState<typeof MOCK_LOAN | null>(null)
  const [copied, setCopied] = useState(false)
  const [txnRef] = useState(() => `TXN${Date.now().toString().slice(-8)}`)
  const [paidAt] = useState(() => new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))

  const handleLookup = () => {
    if (!loanInput.trim()) {
      setError('Please enter your Loan ID or Application Number.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (isValidLoanId(loanInput)) {
        setLoan(MOCK_LOAN)
        setState('PAYMENT')
      } else {
        setError('Loan not found. Please check your Loan ID or Application Number and try again.')
      }
    }, 1000)
  }

  const handleCopyUPI = () => {
    if (loan) {
      navigator.clipboard.writeText(loan.upiId).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)' }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(248,250,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99,102,241,0.1)',
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/apply" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] leading-none">
              <span
                className="font-black"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Intelli
              </span>
              <span className="font-light text-slate-500">Lend</span>
            </span>
          </Link>
          <Link
            href="/apply"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:border-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-14">

        {/* ─── STATE 1: LOOKUP ─── */}
        {state === 'LOOKUP' && (
          <div>
            {/* Hero */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  color: '#6366f1',
                  border: '1px solid rgba(99,102,241,0.15)',
                }}
              >
                <Smartphone className="w-3.5 h-3.5" /> UPI Payment
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Pay Your EMI</h1>
              <p className="text-slate-500 text-sm">Secure UPI payment powered by IntelliLend</p>
            </div>

            {/* Lookup card */}
            <div
              className="bg-white rounded-2xl p-6 shadow-xl"
              style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(99,102,241,0.08)' }}
            >
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Loan ID / Application Number
              </label>
              <input
                value={loanInput}
                onChange={e => { setLoanInput(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLookup()}
                placeholder="ILL-2024-001247"
                className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono mb-4"
              />

              {error && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                  <span className="mt-0.5 shrink-0">⚠️</span> {error}
                </div>
              )}

              <button
                onClick={handleLookup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                }}
              >
                {loading ? (
                  <span className="animate-spin inline-block">
                    <Search className="w-4 h-4" />
                  </span>
                ) : (
                  <><Search className="w-4 h-4" /> Find My Loan</>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                Demo: try <span className="font-mono text-indigo-500">ILL-2024-001247</span>
              </p>
            </div>
          </div>
        )}

        {/* ─── STATE 2: PAYMENT ─── */}
        {state === 'PAYMENT' && loan && (
          <div className="space-y-5">
            {/* Loan summary card */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div
                className="px-6 py-5"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">Borrower</div>
                    <div className="text-white text-lg font-bold">{loan.borrower}</div>
                    <div className="text-indigo-200 text-xs font-mono mt-0.5">{loan.id} · {loan.loanType}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">Due Date</div>
                    <div className="text-white text-sm font-bold">{loan.dueDate}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-indigo-400/30">
                  <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-0.5">EMI Amount</div>
                  <div className="text-white text-4xl font-black">{formatINR(loan.emiAmount)}</div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">Outstanding Balance</div>
                <div className="text-sm font-bold text-slate-700">{formatINR(loan.outstandingAmount)}</div>
              </div>
            </div>

            {/* Overdue warning */}
            {loan.overdueDays > 0 && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                ⚠️ Your EMI is <strong>{loan.overdueDays} days overdue.</strong> Late fees may apply.
              </div>
            )}

            {/* UPI App buttons */}
            <div
              className="bg-white rounded-2xl p-5"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Pay with UPI App</div>
              <div className="space-y-3">
                {UPI_APPS.map(app => (
                  <a
                    key={app.name}
                    href={app.link(loan)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: app.bgColor,
                      borderLeft: `4px solid ${app.borderColor}`,
                      border: `1px solid ${app.borderColor}22`,
                      borderLeftWidth: '4px',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{app.emoji}</span>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{app.name}</div>
                        <div className="text-xs text-slate-400">Tap to open app</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: app.borderColor }}>
                      Open App →
                    </span>
                  </a>
                ))}

                {/* Any UPI App — copy UPI ID */}
                <div
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl"
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #64748b',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">⬜</span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Any UPI App</div>
                      <div className="text-xs font-mono text-slate-500">{loan.upiId}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyUPI}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: copied ? '#ecfdf5' : 'white',
                      color: copied ? '#059669' : '#6366f1',
                      border: copied ? '1px solid #a7f3d0' : '1px solid #c7d2fe',
                    }}
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy ID'}
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div
              className="bg-white rounded-2xl p-5 text-center"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Or Scan QR Code</div>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-44 h-44 rounded-2xl flex flex-col items-center justify-center gap-2"
                  style={{
                    border: '2px dashed #c7d2fe',
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #fafbff 100%)',
                  }}
                >
                  <QrCode className="w-16 h-16 text-indigo-300" />
                  <span className="text-xs text-indigo-400 font-semibold">{formatINR(loan.emiAmount)}</span>
                </div>
                <p className="text-xs text-slate-400">Scan with any UPI app to pay instantly</p>
              </div>
            </div>

            {/* Confirm payment button */}
            <button
              onClick={() => setState('CONFIRMATION')}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
              }}
            >
              <CheckCircle2 className="w-4 h-4" /> I&apos;ve completed the payment
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit encrypted · RBI compliant · Instant confirmation</span>
            </div>
          </div>
        )}

        {/* ─── STATE 3: CONFIRMATION ─── */}
        {state === 'CONFIRMATION' && loan && (
          <div className="text-center">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-8">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center animate-[scale-in_0.4s_ease-out]"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
                  animation: 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <style>{`
              @keyframes scaleIn {
                from { transform: scale(0); opacity: 0; }
                to   { transform: scale(1); opacity: 1; }
              }
            `}</style>

            <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Payment Successful</div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Recorded!</h1>
            <p className="text-slate-500 text-sm mb-10">Your EMI payment has been captured. We&apos;ll confirm once the UPI transfer settles.</p>

            {/* Details card */}
            <div
              className="bg-white rounded-2xl p-6 text-left mb-6"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Amount Paid</span>
                  <span
                    className="text-2xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {formatINR(loan.emiAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Transaction Ref</span>
                  <span className="text-sm font-mono font-bold text-slate-700">{txnRef}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Loan ID</span>
                  <span className="text-sm font-mono font-semibold text-slate-600">{loan.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Borrower</span>
                  <span className="text-sm font-semibold text-slate-700">{loan.borrower}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Timestamp</span>
                  <span className="text-sm text-slate-600">{paidAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">UPI ID</span>
                  <span className="text-sm font-mono text-slate-600">{loan.upiId}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                }}
              >
                <Zap className="w-4 h-4" /> Download Receipt
              </button>
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:border-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
