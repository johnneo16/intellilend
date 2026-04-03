'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Search, ArrowRight, CheckCircle2, Clock, AlertCircle,
  FileText, Brain, CreditCard, ChevronRight, Phone, Mail,
} from 'lucide-react'

const MOCK_STATUS = {
  id: 'ILL-2024-001247',
  name: 'Priya Sharma',
  loanType: 'Home Loan',
  amount: '₹45,00,000',
  submittedAt: '12 Mar 2024, 10:30 AM',
  status: 'AI Processing',
  stage: 2,
  steps: [
    { label: 'Application Submitted',    done: true,  time: '10:30 AM' },
    { label: 'Documents Verified',        done: true,  time: '10:32 AM' },
    { label: 'AI Credit Review',          done: false, time: 'In Progress' },
    { label: 'Underwriter Decision',      done: false, time: 'Pending'     },
    { label: 'Disbursement',             done: false, time: 'Pending'     },
  ],
}

export default function StatusPage() {
  const [appId, setAppId]     = useState('')
  const [mobile, setMobile]   = useState('')
  const [result, setResult]   = useState<typeof MOCK_STATUS | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSearch = () => {
    if (!appId.trim() || !mobile.trim()) {
      setError('Please enter both Application ID and mobile number.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (appId.toUpperCase().includes('247') || mobile.endsWith('0000')) {
        setResult(MOCK_STATUS)
      } else {
        setError('No application found. Please check your Application ID and mobile number.')
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 60%, #f0f4ff 100%)' }}>

      {/* Nav */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{
        background: 'rgba(248,250,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
      }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/apply" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] leading-none">
              <span className="font-black" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Intelli</span>
              <span className="font-light text-slate-500">Lend</span>
            </span>
          </Link>
          <Link href="/apply/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
            New Application <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Application Tracker</div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Check your application status</h1>
            <p className="text-slate-500">Enter your Application ID and registered mobile number</p>
          </div>

          {/* Search card */}
          <div className="bg-white rounded-2xl p-6 mb-6" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Application ID</label>
                <input
                  value={appId}
                  onChange={e => setAppId(e.target.value)}
                  placeholder="e.g. ILL-2024-001247"
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Mobile Number</label>
                <input
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                    <Search className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <><Search className="w-4 h-4" /> Track Application</>
                )}
              </button>
            </div>
          </div>

          {/* Demo hint */}
          <p className="text-center text-xs text-slate-400 mb-8">
            Demo: use ID <span className="font-mono text-indigo-500">ILL-2024-001247</span> with any mobile ending in <span className="font-mono text-indigo-500">0000</span>
          </p>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-500">{result.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                        {result.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">{result.name}</div>
                    <div className="text-sm text-slate-500">{result.loanType} · {result.amount}</div>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <div>Submitted</div>
                    <div className="font-semibold text-slate-600">{result.submittedAt}</div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Progress</div>
                <div className="space-y-4">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500' : i === result.stage ? 'bg-amber-500' : 'bg-slate-100'}`}>
                          {step.done
                            ? <CheckCircle2 className="w-4 h-4 text-white" />
                            : i === result.stage
                            ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <Clock className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                          }
                        </div>
                        {i < result.steps.length - 1 && (
                          <div className={`w-0.5 h-6 mt-1 ${step.done ? 'bg-emerald-200' : 'bg-slate-100'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className={`text-sm font-semibold ${step.done ? 'text-slate-700' : i === result.stage ? 'text-amber-700' : 'text-slate-400'}`}>
                          {step.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${step.done ? 'text-emerald-500' : i === result.stage ? 'text-amber-500' : 'text-slate-300'}`}>
                          {step.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">Questions about your application?</p>
                <div className="flex gap-2">
                  <a href="tel:18001234567" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 transition-colors">
                    <Phone className="w-3.5 h-3.5" /> Call Us
                  </a>
                  <a href="mailto:support@intellilend.in" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
