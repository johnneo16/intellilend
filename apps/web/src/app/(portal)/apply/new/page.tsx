'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { RingGauge } from '@/components/ui/ring-gauge'
import { cn } from '@/lib/utils'
import {
  Zap, User, Briefcase, IndianRupee, FileText, Brain,
  CheckCircle2, ChevronRight, ChevronLeft, Upload, AlertCircle,
  TrendingUp, ArrowLeft,
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Personal',   icon: User,        desc: 'KYC & identity' },
  { id: 2, label: 'Employment', icon: Briefcase,   desc: 'Income & job' },
  { id: 3, label: 'Loan',       icon: IndianRupee, desc: 'Amount & tenure' },
  { id: 4, label: 'Documents',  icon: FileText,    desc: 'Upload KYC docs' },
  { id: 5, label: 'AI Review',  icon: Brain,       desc: 'Auto-decision' },
]

function PortalNav() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4" style={{
      background: 'rgba(248,250,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(99,102,241,0.1)',
    }}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link href="/apply" className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <Link href="/apply" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 10px rgba(99,102,241,0.35)' }}>
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[15px] leading-none">
            <span className="font-black text-slate-900">Intelli</span>
            <span className="font-light text-slate-500">Lend</span>
          </span>
        </Link>
        <div className="text-xs text-slate-400 font-medium">
          Step <span className="text-slate-700 font-bold" id="step-indicator">–</span> / 5
        </div>
      </div>
    </header>
  )
}

function StepBar({ current }: { current: number }) {
  return (
    <div className="px-6 py-5 border-b shrink-0" style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#f8faff' }}>
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const done   = current > step.id
          const active = current === step.id
          const Icon   = step.icon
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={active ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={
                    done   ? { background: '#ecfdf5', border: '1px solid #a7f3d0' }
                  : active ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', boxShadow: '0 2px 10px rgba(99,102,241,0.18)' }
                  :           { background: '#f8faff', border: '1px solid #e2e8f0' }
                  }
                >
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <Icon className="w-4 h-4" style={{ color: active ? '#6366f1' : '#94a3b8' }} />
                  }
                </motion.div>
                <div className={cn('text-[10px] font-semibold', done ? 'text-emerald-600' : active ? 'text-indigo-600' : 'text-slate-400')}>
                  {step.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="flex-1 h-0.5 mx-2 mb-5 rounded-full"
                  animate={{ background: done ? '#a7f3d0' : '#e2e8f0' }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

const baseInput = "w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none transition-all bg-white border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"

function Field({ label, placeholder, type = 'text', span2 = false }: { label: string; placeholder: string; type?: string; span2?: boolean }) {
  return (
    <div className={span2 ? 'col-span-2' : ''}>
      <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
      <input type={type} placeholder={placeholder} className={baseInput} />
    </div>
  )
}

function PersonalInfoStep() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Personal Information</h2>
        <p className="text-sm text-slate-400 mt-1">Required for KYC and identity verification</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name"    placeholder="Priya" />
        <Field label="Last Name"     placeholder="Sharma" />
        <Field label="Date of Birth" placeholder="DD / MM / YYYY" />
        <Field label="Mobile"        placeholder="+91 98765 43210" type="tel" />
        <Field label="Email Address" placeholder="priya@example.com" type="email" />
        <Field label="PAN Number"    placeholder="ABCPS1234D" />
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Permanent Address</label>
          <textarea rows={2} placeholder="123, Andheri West, Mumbai – 400053"
            className="resize-none w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none bg-white border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
        </div>
      </div>
    </div>
  )
}

function EmploymentStep() {
  const [empType, setEmpType] = useState<'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS'>('SALARIED')
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Employment & Income</h2>
        <p className="text-sm text-slate-400 mt-1">Used to assess your loan repayment capacity</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS'] as const).map((t) => (
          <button key={t} onClick={() => setEmpType(t)}
            className="py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={empType === t
              ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5', boxShadow: '0 2px 6px rgba(99,102,241,0.15)' }
              : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }
            }>{t.replace('_', ' ')}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Employer / Company"   placeholder="Infosys Ltd." />
        <Field label="Designation"          placeholder="Senior Engineer" />
        <Field label="Monthly Gross Income" placeholder="₹ 85,000" />
        <Field label="Monthly Take-Home"    placeholder="₹ 68,000" />
        <Field label="Years Employed"       placeholder="5 years" />
        <Field label="City of Work"         placeholder="Mumbai" />
      </div>
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Your FOIR Score</span>
          </div>
          <span className="text-sm font-black text-emerald-600">38.2%</span>
        </div>
        <Progress value={38.2} indicatorColor="#10b981" className="h-2" />
        <p className="text-[10px] text-slate-500 mt-1.5">
          Fixed Obligations-to-Income Ratio · Maximum allowed: 55% · <span className="text-emerald-600 font-bold">You qualify ✓</span>
        </p>
      </div>
    </div>
  )
}

function LoanDetailsStep() {
  const [loanType, setLoanType] = useState('HOME')
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Loan Details</h2>
        <p className="text-sm text-slate-400 mt-1">Tell us what you need — we'll find the best offer</p>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Loan Type</label>
        <div className="grid grid-cols-3 gap-2">
          {['HOME', 'PERSONAL', 'BUSINESS', 'AUTO', 'EDUCATION', 'GOLD'].map((t) => (
            <button key={t} onClick={() => setLoanType(t)}
              className="py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={loanType === t
                ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5' }
                : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }
              }>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Requested Amount (₹)" placeholder="45,00,000" />
        <Field label="Tenure (months)"       placeholder="240" type="number" />
        <Field label="Purpose" placeholder="Home purchase in Andheri West" span2 />
      </div>
      <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Estimated Monthly EMI</div>
            <div className="text-3xl font-black text-slate-900">₹38,450</div>
          </div>
          <div className="text-right space-y-1.5">
            {[{ l: 'Interest Rate', v: '8.5% p.a.' }, { l: 'Processing Fee', v: '₹22,500' }, { l: 'Total Cost', v: '₹92.3L' }].map(({ l, v }) => (
              <div key={l} className="flex items-center justify-end gap-4 text-xs">
                <span className="text-slate-400">{l}</span>
                <span className="text-slate-700 font-bold w-16 text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentsStep() {
  const DOCS = [
    { label: 'PAN Card',             required: true,  status: 'uploaded' },
    { label: 'Aadhaar Card',         required: true,  status: 'uploaded' },
    { label: 'Last 3 Salary Slips',  required: true,  status: 'pending'  },
    { label: 'Bank Statement (6mo)', required: true,  status: 'pending'  },
    { label: 'Form 16',              required: false, status: 'pending'  },
    { label: 'Property Documents',   required: false, status: 'pending'  },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Document Upload</h2>
        <p className="text-sm text-slate-400 mt-1">Our AI auto-reads and verifies all documents</p>
      </div>
      <div className="space-y-2">
        {DOCS.map(({ label, required, status }) => (
          <motion.div key={label}
            whileHover={{ scale: 1.005 }}
            className="flex items-center justify-between p-4 rounded-xl transition-colors"
            style={status === 'uploaded'
              ? { background: '#f0fdf4', border: '1px solid #a7f3d0' }
              : { background: '#f8faff', border: '1px solid #e2e8f0' }
            }>
            <div className="flex items-center gap-3">
              {status === 'uploaded'
                ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                : <FileText className="w-4 h-4 shrink-0 text-slate-300" />
              }
              <div>
                <div className="text-sm font-semibold text-slate-700">{label}</div>
                {required && <span className="text-[10px] text-slate-400">Required</span>}
              </div>
            </div>
            {status === 'uploaded'
              ? <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">✓ Uploaded</span>
              : (
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              )
            }
          </motion.div>
        ))}
      </div>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Our AI Document Agent auto-extracts income, address, and identity data. Processing takes ~60–90 seconds per document. Your data is encrypted end-to-end.
        </p>
      </div>
    </div>
  )
}

function AIReviewStep() {
  const AGENTS = [
    { name: 'Document Intelligence', status: 'completed',  confidence: 94, time: '1.2s', color: '#6366f1' },
    { name: 'Credit Decision',       status: 'completed',  confidence: 87, time: '2.8s', color: '#f59e0b' },
    { name: 'Risk Assessment',       status: 'processing', confidence: null, time: null, color: '#8b5cf6' },
    { name: 'Collections Forecast',  status: 'waiting',    confidence: null, time: null, color: '#10b981' },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">AI is reviewing your application</h2>
        <p className="text-sm text-slate-400 mt-1">4 AI agents working in parallel · Estimated time: 7 seconds</p>
      </div>
      <div className="space-y-2.5">
        {AGENTS.map(({ name, status, confidence, time, color }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-white"
            style={{ border: `1px solid ${status === 'completed' ? color + '30' : '#e2e8f0'}`, boxShadow: status === 'completed' ? `0 2px 8px ${color}10` : 'none' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={status === 'processing' ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: color, boxShadow: status === 'processing' ? `0 0 8px ${color}` : 'none' }}
                />
                <span className="text-sm font-bold text-slate-700">{name}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={status === 'completed'  ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #a7f3d0' }
                     : status === 'processing' ? { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }
                     :                           { background: '#f8faff', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
                {status === 'processing' ? 'Analysing…' : status === 'completed' ? '✓ Complete' : 'Queued'}
              </span>
            </div>
            {status === 'completed' && confidence !== null && (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400">Confidence score</span>
                  <span className="text-[10px] font-bold" style={{ color }}>{confidence}% · {time}</span>
                </div>
                <Progress value={confidence} indicatorColor={color} className="h-1.5" />
              </>
            )}
            {status === 'processing' && (
              <motion.div
                className="h-1.5 rounded-full overflow-hidden bg-slate-100"
              >
                <motion.div
                  className="h-full w-1/3 rounded-full"
                  animate={{ x: ['0%', '250%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{ background: color }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="p-5 rounded-2xl flex items-center gap-5 bg-indigo-50 border border-indigo-200">
        <RingGauge value={82} size={72} strokeWidth={7} color="#6366f1" label="/100" showValue trackColor="rgba(99,102,241,0.1)" />
        <div>
          <div className="text-xs text-slate-500 mb-1">Preliminary Decision</div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl font-black text-slate-900">APPROVE</span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">HIGH CONFIDENCE</span>
          </div>
          <p className="text-xs text-slate-500">FOIR within limits · Excellent credit profile · Low default risk</p>
        </div>
      </div>
    </div>
  )
}

const STEP_COMPONENTS = [PersonalInfoStep, EmploymentStep, LoanDetailsStep, DocumentsStep, AIReviewStep]

export default function BorrowerApplicationPage() {
  const [step, setStep] = useState(1)
  const StepComponent = STEP_COMPONENTS[step - 1]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)' }}>
      <PortalNav />

      <div className="flex-1 flex flex-col p-5 max-w-2xl mx-auto w-full">
        <motion.div
          className="rounded-2xl overflow-hidden w-full bg-white mt-4"
          style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StepBar current={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between px-6 py-4 shrink-0 border-t bg-slate-50/80"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 bg-white border border-slate-200">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div key={s.id} className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ background: s.id === step ? '#6366f1' : s.id < step ? '#a7f3d0' : '#e2e8f0' }} />
              ))}
            </div>

            {step < STEPS.length
              ? (
                <button
                  onClick={() => setStep(Math.min(STEPS.length, step + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                  <CheckCircle2 className="w-4 h-4" /> Submit Application
                </button>
              )
            }
          </div>
        </motion.div>
      </div>
    </div>
  )
}
