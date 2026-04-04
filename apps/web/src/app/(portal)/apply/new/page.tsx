'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Zap, User, Briefcase, IndianRupee, FileText, Brain,
  CheckCircle2, ChevronRight, ChevronLeft, Upload, AlertCircle,
  ArrowLeft, Phone, Paperclip, X, RefreshCw, Shield,
} from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────────── */
type EmpType = 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS'
type LoanType = 'HOME' | 'PERSONAL' | 'BUSINESS' | 'AUTO' | 'EDUCATION' | 'GOLD'

type FormData = {
  firstName: string; lastName: string; dob: string
  mobile: string; email: string; pan: string; address: string; aadhaar: string
  empType: EmpType; employer: string; designation: string
  monthsEmployed: string; income: string; takeHome: string; existingEMI: string
  loanType: LoanType; amount: string; tenure: string; purpose: string
}

const INITIAL: FormData = {
  firstName: '', lastName: '', dob: '', mobile: '', email: '', pan: '', address: '', aadhaar: '',
  empType: 'SALARIED', employer: '', designation: '', monthsEmployed: '', income: '', takeHome: '', existingEMI: '0',
  loanType: 'HOME', amount: '', tenure: '240', purpose: '',
}

/* ── Loan config ───────────────────────────────────────────────────── */
const LOAN_CONFIG: Record<LoanType, { rate: number; fee: number; label: string; emoji: string; minAmt: number; maxAmt: number; maxTenure: number }> = {
  HOME:      { rate: 8.50,  fee: 0.50, label: 'Home Loan',       emoji: '🏠', minAmt: 500000,   maxAmt: 50000000, maxTenure: 300 },
  PERSONAL:  { rate: 12.50, fee: 2.00, label: 'Personal Loan',   emoji: '💳', minAmt: 50000,    maxAmt: 2500000,  maxTenure: 84  },
  BUSINESS:  { rate: 14.00, fee: 1.50, label: 'Business Loan',   emoji: '🏢', minAmt: 100000,   maxAmt: 10000000, maxTenure: 120 },
  AUTO:      { rate: 10.50, fee: 1.00, label: 'Auto Loan',       emoji: '🚗', minAmt: 100000,   maxAmt: 3000000,  maxTenure: 84  },
  EDUCATION: { rate: 9.00,  fee: 0.50, label: 'Education Loan',  emoji: '🎓', minAmt: 50000,    maxAmt: 2000000,  maxTenure: 120 },
  GOLD:      { rate: 7.50,  fee: 0.25, label: 'Gold Loan',       emoji: '🏅', minAmt: 10000,    maxAmt: 2000000,  maxTenure: 36  },
}

const TYPE_CODE: Record<LoanType, string> = {
  HOME: 'HOM', PERSONAL: 'PRS', BUSINESS: 'BIZ', AUTO: 'AUT', EDUCATION: 'EDU', GOLD: 'GLD',
}

/* ── Document requirements by loan type ────────────────────────────── */
type DocDef = { id: string; label: string; required: boolean; hint: string; accept: string }
const DOC_SETS: Record<LoanType, DocDef[]> = {
  HOME: [
    { id: 'pan',      label: 'PAN Card',                    required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'aadhaar',  label: 'Aadhaar Card (Front & Back)', required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'salary',   label: 'Last 3 Salary Slips',         required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf,image/*'  },
    { id: 'bank',     label: 'Bank Statement (6 months)',    required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf'          },
    { id: 'form16',   label: 'Form 16 / ITR (2 years)',     required: false, hint: 'PDF · Max 10MB',         accept: '.pdf'          },
    { id: 'property', label: 'Property Documents',           required: false, hint: 'PDF · Max 20MB',         accept: '.pdf,image/*'  },
  ],
  PERSONAL: [
    { id: 'pan',      label: 'PAN Card',                    required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'aadhaar',  label: 'Aadhaar Card (Front & Back)', required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'salary',   label: 'Last 3 Salary Slips',         required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf,image/*'  },
    { id: 'bank',     label: 'Bank Statement (3 months)',    required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf'          },
  ],
  BUSINESS: [
    { id: 'pan',      label: 'Business PAN',                required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'gst',      label: 'GST Registration',             required: true,  hint: 'PDF · Max 5MB',          accept: '.pdf,image/*'  },
    { id: 'bank',     label: 'Bank Statement (12 months)',   required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf'          },
    { id: 'itr',      label: 'ITR — Last 2 years',           required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf'          },
    { id: 'balance',  label: 'Balance Sheet',                required: false, hint: 'PDF · Max 10MB',         accept: '.pdf'          },
  ],
  AUTO: [
    { id: 'pan',      label: 'PAN Card',                    required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'aadhaar',  label: 'Aadhaar Card',                 required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'salary',   label: 'Last 3 Salary Slips',         required: true,  hint: 'PDF · Max 10MB',         accept: '.pdf,image/*'  },
    { id: 'rc',       label: 'Vehicle Proforma Invoice',     required: true,  hint: 'PDF · Max 5MB',          accept: '.pdf,image/*'  },
  ],
  EDUCATION: [
    { id: 'pan',      label: 'PAN Card (Student/Parent)',    required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'aadhaar',  label: 'Aadhaar Card',                 required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'admission',label: 'Admission Letter',             required: true,  hint: 'PDF · Max 5MB',          accept: '.pdf,image/*'  },
    { id: 'marksheet',label: 'Last Exam Marksheet',          required: true,  hint: 'PDF · Max 5MB',          accept: '.pdf,image/*'  },
    { id: 'income',   label: 'Parent Income Proof',          required: false, hint: 'PDF · Max 10MB',         accept: '.pdf'          },
  ],
  GOLD: [
    { id: 'pan',      label: 'PAN Card',                    required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'aadhaar',  label: 'Aadhaar Card',                 required: true,  hint: 'JPEG/PNG/PDF · Max 5MB', accept: 'image/*,.pdf' },
    { id: 'goldproof',label: 'Gold Ownership Proof',         required: false, hint: 'JPEG/PNG · Max 5MB',     accept: 'image/*'       },
  ],
}

/* ── EMI Calculator ────────────────────────────────────────────────── */
function calcEMI(principal: number, annualRate: number, tenureMonths: number) {
  if (!principal || !tenureMonths || !annualRate) return 0
  const r = annualRate / (12 * 100)
  const n = tenureMonths
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function fmtINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

function parseLakh(s: string) {
  const n = parseFloat(s.replace(/,/g, ''))
  return isNaN(n) ? 0 : n
}

/* ── Steps config ──────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Personal',    icon: User,        desc: 'KYC & identity' },
  { id: 2, label: 'Employment',  icon: Briefcase,   desc: 'Income & job' },
  { id: 3, label: 'Loan',        icon: IndianRupee, desc: 'Amount & terms' },
  { id: 4, label: 'Documents',   icon: FileText,    desc: 'Upload KYC docs' },
  { id: 5, label: 'AI Review',   icon: Brain,       desc: 'Auto-decision' },
]

/* ── Portal nav ────────────────────────────────────────────────────── */
function PortalNav({ step }: { step: number }) {
  return (
    <header className="sticky top-0 z-50 px-6 py-4" style={{
      background: 'rgba(248,250,255,0.92)',
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
            <span className="font-black" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Intelli</span>
            <span className="font-light text-slate-500">Lend</span>
          </span>
        </Link>
        <div className="text-xs text-slate-400 font-medium">
          Step <span className="text-slate-700 font-bold">{step}</span> / 5
        </div>
      </div>
    </header>
  )
}

/* ── Step progress bar ─────────────────────────────────────────────── */
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
                  style={done   ? { background: '#ecfdf5', border: '1px solid #a7f3d0' }
                       : active ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', boxShadow: '0 2px 10px rgba(99,102,241,0.18)' }
                       :           { background: '#f8faff', border: '1px solid #e2e8f0' }}
                >
                  {done ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        : <Icon className="w-4 h-4" style={{ color: active ? '#6366f1' : '#94a3b8' }} />}
                </motion.div>
                <div className={cn('text-[10px] font-semibold hidden sm:block', done ? 'text-emerald-600' : active ? 'text-indigo-600' : 'text-slate-400')}>
                  {step.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <motion.div className="flex-1 h-0.5 mx-2 mb-5 rounded-full"
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

/* ── Field component ───────────────────────────────────────────────── */
const baseInput = "w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border focus:outline-none transition-all bg-white"

function Field({
  label, placeholder, type = 'text', span2 = false,
  value, onChange, error, required = false, hint,
}: {
  label: string; placeholder: string; type?: string; span2?: boolean
  value?: string; onChange?: (v: string) => void; error?: string; required?: boolean; hint?: string
}) {
  return (
    <div className={span2 ? 'col-span-2' : ''}>
      <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400 text-xs normal-case font-bold">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={cn(baseInput, error ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100')}
      />
      {hint && !error && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
      {error && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  )
}

/* ── Step 1: Personal Info ─────────────────────────────────────────── */
function PersonalInfoStep({
  data, onChange, errors,
}: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Personal Information</h2>
        <p className="text-sm text-slate-400 mt-1">Fields marked <span className="text-red-400 font-bold">*</span> are required for KYC verification</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name"     placeholder="Priya"             required value={data.firstName} onChange={v => onChange('firstName', v)} error={errors.firstName} />
        <Field label="Last Name"      placeholder="Sharma"            required value={data.lastName}  onChange={v => onChange('lastName',  v)} error={errors.lastName} />
        <Field label="Date of Birth"  placeholder="DD/MM/YYYY"        required value={data.dob}       onChange={v => onChange('dob', v)}      error={errors.dob}
               hint="Must be 18+ years old" />
        <Field label="Mobile Number"  placeholder="+91 98765 43210"   required type="tel"   value={data.mobile}  onChange={v => onChange('mobile', v)}  error={errors.mobile}
               hint="OTP will be sent to this number" />
        <Field label="Email Address"  placeholder="priya@email.com"   required type="email" value={data.email}   onChange={v => onChange('email', v)}   error={errors.email} />
        <Field label="PAN Number"     placeholder="ABCPS1234D"         required value={data.pan}      onChange={v => onChange('pan', v.toUpperCase())} error={errors.pan}
               hint="10-character alphanumeric" />
        <Field label="Aadhaar Number" placeholder="XXXX XXXX XXXX"    required value={data.aadhaar}   onChange={v => onChange('aadhaar', v)} error={errors.aadhaar}
               hint="12-digit Aadhaar number" />
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
            Permanent Address <span className="text-red-400">*</span>
          </label>
          <textarea rows={2} placeholder="123, Andheri West, Mumbai – 400053"
            value={data.address} onChange={e => onChange('address', e.target.value)}
            className={cn('resize-none w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all bg-white',
              errors.address ? 'border-red-300' : 'border-slate-200')} />
          {errors.address && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-700 leading-relaxed">
          Your data is encrypted end-to-end using AES-256. We never share your personal details with third parties without consent.
        </p>
      </div>
    </div>
  )
}

/* ── Step 2: Employment ────────────────────────────────────────────── */
function EmploymentStep({ data, onChange, loanAmount, loanTenure, loanType, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string) => void
  loanAmount: string; loanTenure: string; loanType: LoanType
  errors: Partial<Record<keyof FormData, string>>
}) {
  const income     = parseLakh(data.income)
  const takeHome   = parseLakh(data.takeHome)
  const existing   = parseLakh(data.existingEMI)
  const cfg        = LOAN_CONFIG[loanType]
  const emi        = calcEMI(parseLakh(loanAmount), cfg.rate, parseInt(loanTenure) || 240)
  const base       = takeHome > 0 ? takeHome : income
  const foir       = base > 0 ? Math.round(((existing + emi) / base) * 100 * 10) / 10 : null
  const foirOk     = foir !== null && foir <= 55

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Employment & Income</h2>
        <p className="text-sm text-slate-400 mt-1">Used to assess your loan repayment capacity</p>
      </div>

      {/* Employment type */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Employment Type <span className="text-red-400">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS'] as EmpType[]).map((t) => (
            <button key={t} type="button" onClick={() => onChange('empType', t)}
              className="py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={data.empType === t
                ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5', boxShadow: '0 2px 6px rgba(99,102,241,0.15)' }
                : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label={data.empType === 'BUSINESS' ? 'Business Name' : 'Employer / Company'}
               placeholder={data.empType === 'BUSINESS' ? 'ABC Enterprises' : 'Infosys Ltd.'}
               value={data.employer}    onChange={v => onChange('employer', v)} />
        <Field label="Designation"      placeholder="Senior Engineer"
               value={data.designation} onChange={v => onChange('designation', v)} />
        <Field label="Months Employed"  placeholder="36"  type="number" hint="Total months at current employer"
               value={data.monthsEmployed} onChange={v => onChange('monthsEmployed', v)} error={errors.monthsEmployed} />
        <Field label="Monthly Gross Income (₹)" placeholder="85000" type="number" required hint="Before deductions"
               value={data.income}   onChange={v => onChange('income', v)} error={errors.income} />
        <Field label="Monthly Take-Home (₹)"    placeholder="68000" type="number" hint="After all deductions"
               value={data.takeHome} onChange={v => onChange('takeHome', v)} />
        <Field label="Existing Monthly EMI (₹)" placeholder="0"     type="number" hint="All current loan EMIs combined"
               value={data.existingEMI} onChange={v => onChange('existingEMI', v)} />
      </div>

      {/* FOIR live calculator */}
      {foir !== null && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border"
          style={foirOk
            ? { background: '#f0fdf4', borderColor: '#bbf7d0' }
            : { background: '#fef2f2', borderColor: '#fecaca' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold text-slate-700">Estimated FOIR (Fixed Obligation-to-Income)</div>
            <span className={`text-sm font-black ${foirOk ? 'text-emerald-600' : 'text-red-500'}`}>{foir}%</span>
          </div>
          <Progress value={Math.min(foir, 100)} indicatorColor={foirOk ? '#10b981' : '#ef4444'} className="h-2" />
          <div className="flex items-center justify-between mt-1.5 text-[10px]">
            <span className="text-slate-400">Existing EMI + New EMI ÷ Take-home · Limit: 55%</span>
            <span className={`font-bold ${foirOk ? 'text-emerald-600' : 'text-red-500'}`}>
              {foirOk ? '✓ You qualify' : '✗ Too high — reduce loan amount or tenure'}
            </span>
          </div>
          {emi > 0 && (
            <div className="mt-2 text-[11px] text-slate-500">
              New EMI: <span className="font-bold text-slate-700">{fmtINR(emi)}/mo</span>
              {existing > 0 && <> + Existing: <span className="font-bold text-slate-700">{fmtINR(existing)}/mo</span></>}
              {' '}= Total: <span className="font-bold text-slate-700">{fmtINR(existing + emi)}/mo</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

/* ── Step 3: Loan Details ──────────────────────────────────────────── */
function LoanDetailsStep({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string) => void
  errors: Partial<Record<keyof FormData, string>>
}) {
  const cfg      = LOAN_CONFIG[data.loanType]
  const principal = parseLakh(data.amount)
  const tenure    = parseInt(data.tenure) || 0
  const emi       = calcEMI(principal, cfg.rate, tenure)
  const procFee   = principal * (cfg.fee / 100)
  const totalCost = emi * tenure

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Loan Details</h2>
        <p className="text-sm text-slate-400 mt-1">Tell us what you need — we'll find the best offer</p>
      </div>

      {/* Loan type grid */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Loan Type <span className="text-red-400">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(LOAN_CONFIG) as LoanType[]).map((t) => (
            <button key={t} type="button" onClick={() => onChange('loanType', t)}
              className="py-3 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1"
              style={data.loanType === t
                ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5', boxShadow: '0 2px 8px rgba(99,102,241,0.15)' }
                : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
              <span className="text-base">{LOAN_CONFIG[t].emoji}</span>
              <span>{LOAN_CONFIG[t].label.replace(' Loan', '')}</span>
              <span className="text-[9px] opacity-70">{LOAN_CONFIG[t].rate}% p.a.</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Requested Amount (₹)" placeholder={`Min ${fmtINR(cfg.minAmt)}`} type="number" required
               value={data.amount} onChange={v => onChange('amount', v)} error={errors.amount}
               hint={`Range: ${fmtINR(cfg.minAmt)} – ${fmtINR(cfg.maxAmt)}`} />
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
            Tenure (Months) <span className="text-red-400">*</span>
          </label>
          <select
            value={data.tenure}
            onChange={e => onChange('tenure', e.target.value)}
            className={cn(baseInput, errors.tenure ? 'border-red-300' : 'border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100')}
          >
            <option value="">Select tenure</option>
            {[12,24,36,48,60,84,120,180,240,300].filter(m => m <= cfg.maxTenure).map(m => (
              <option key={m} value={m}>{m} months ({Math.round(m/12 * 10)/10} yrs)</option>
            ))}
          </select>
          {errors.tenure && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tenure}</p>}
        </div>
        <Field label="Purpose" placeholder={`e.g. ${data.loanType === 'HOME' ? 'Purchase flat in Andheri West' : data.loanType === 'AUTO' ? 'Buy Maruti Swift' : 'Business expansion'}`}
               span2 value={data.purpose} onChange={v => onChange('purpose', v)} />
      </div>

      {/* Live EMI breakdown */}
      {emi > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #c7d2fe' }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <div className="text-xs font-bold text-white/80">Monthly EMI</div>
            <div className="text-2xl font-black text-white">{fmtINR(emi)}</div>
          </div>
          <div className="px-5 py-4 bg-white grid grid-cols-3 gap-4 text-center">
            {[
              { l: 'Interest Rate',   v: `${cfg.rate}% p.a.` },
              { l: 'Processing Fee',  v: fmtINR(procFee)     },
              { l: 'Total Repayment', v: fmtINR(totalCost)   },
            ].map(({ l, v }) => (
              <div key={l}>
                <div className="text-sm font-black text-slate-800">{v}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <div className="px-5 py-2.5 text-[10px] text-slate-400" style={{ background: '#f8faff', borderTop: '1px solid #e0e7ff' }}>
            Interest payable: {fmtINR(totalCost - principal)} · Rate as of April 2026 · Subject to credit assessment
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── Step 4: Documents ─────────────────────────────────────────────── */
type UploadedFiles = Record<string, File | null>

function DocumentsStep({ loanType, uploads, onUpload }: {
  loanType: LoanType; uploads: UploadedFiles; onUpload: (id: string, file: File | null) => void
}) {
  const docs = DOC_SETS[loanType]
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Document Upload</h2>
        <p className="text-sm text-slate-400 mt-1">Upload all required documents — our AI verifies them instantly</p>
      </div>

      <div className="space-y-2">
        {docs.map(({ id, label, required, hint, accept }) => {
          const file = uploads[id] ?? null
          const isUploaded = file !== null
          return (
            <motion.div key={id} layout
              className="flex items-center justify-between p-4 rounded-xl transition-colors"
              style={isUploaded
                ? { background: '#f0fdf4', border: '1px solid #a7f3d0' }
                : { background: '#f8faff', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {isUploaded
                  ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  : <Paperclip className="w-4 h-4 shrink-0 text-slate-300" />}
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-700">{label}</div>
                  {isUploaded
                    ? <div className="text-[10px] text-emerald-600 truncate mt-0.5">✓ {file!.name} ({(file!.size / 1024).toFixed(0)} KB)</div>
                    : <div className="text-[10px] text-slate-400">{required ? '⚠ Required' : 'Optional'} · {hint}</div>}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                {isUploaded && (
                  <button onClick={() => onUpload(id, null)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  ref={el => { fileRefs.current[id] = el }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(id, f); e.target.value = '' }}
                />
                <button
                  onClick={() => fileRefs.current[id]?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.03]"
                  style={isUploaded
                    ? { background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' }
                    : { background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe' }}>
                  <Upload className="w-3 h-3" />
                  {isUploaded ? 'Replace' : 'Upload'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress */}
      {(() => {
        const required = docs.filter(d => d.required)
        const uploaded = required.filter(d => uploads[d.id])
        const pct = required.length > 0 ? Math.round((uploaded.length / required.length) * 100) : 100
        return (
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600">Required documents</span>
              <span className="text-xs font-black text-indigo-600">{uploaded.length} / {required.length} uploaded</span>
            </div>
            <Progress value={pct} indicatorColor="#6366f1" className="h-2" />
          </div>
        )
      })()}

      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Our AI Document Agent auto-reads, extracts, and verifies all documents in ~60 seconds per file.
          Supported formats: PDF, JPEG, PNG (max 20MB per file). Data is encrypted at rest.
        </p>
      </div>
    </div>
  )
}

/* ── Agent state type ──────────────────────────────────────────────── */
type AgentStatus = 'waiting' | 'processing' | 'completed' | 'failed'
type Agent = { name: string; desc: string; confidence: number | null; time: string | null; status: AgentStatus; color: string }

/* ── Step 5: AI Review ─────────────────────────────────────────────── */
function AIReviewStep({ mobile, loanType, income, amount, tenure }: {
  mobile: string; loanType: LoanType; income: string; amount: string; tenure: string
}) {
  const principal = parseLakh(amount)
  const cfg       = LOAN_CONFIG[loanType]
  const emi       = calcEMI(principal, cfg.rate, parseInt(tenure) || 240)
  const incomeN   = parseLakh(income)
  const foirCalc  = incomeN > 0 ? Math.round((emi / incomeN) * 100 * 10) / 10 : 38
  const aiScore   = Math.min(95, Math.max(55, 88 - (foirCalc > 45 ? (foirCalc - 45) * 2 : 0)))

  const AGENT_DEFS: Omit<Agent, 'status' | 'confidence' | 'time'>[] = [
    { name: 'Document Intelligence', desc: 'OCR + fraud detection on all uploaded files', color: '#6366f1' },
    { name: 'Credit Decision',       desc: 'CIBIL pull + credit scoring + bureau analysis', color: '#f59e0b' },
    { name: 'Risk Assessment',       desc: 'Default probability + portfolio risk scoring', color: '#8b5cf6' },
    { name: 'Collections Forecast',  desc: 'Repayment likelihood + NPA risk modelling', color: '#10b981' },
  ]

  const [agents, setAgents] = useState<Agent[]>(
    AGENT_DEFS.map(a => ({ ...a, status: 'waiting', confidence: null, time: null }))
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    const delays = [800, 2200, 4000, 5800]
    const durations = [1400, 1800, 1600, 1400]
    const confidences = [96, 89, Math.round(aiScore), 91]

    const timers: ReturnType<typeof setTimeout>[] = []

    AGENT_DEFS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setAgents(prev => prev.map((a, j) => j === i ? { ...a, status: 'processing' } : a))
      }, delays[i]))

      timers.push(setTimeout(() => {
        const elapsed = ((durations[i] + Math.random() * 400) / 1000).toFixed(1)
        setAgents(prev => prev.map((a, j) =>
          j === i ? { ...a, status: 'completed', confidence: confidences[i], time: `${elapsed}s` } : a
        ))
        if (i === AGENT_DEFS.length - 1) setDone(true)
      }, delays[i] + durations[i]))
    })

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayMobile = mobile.trim() || '+91 XXXXX XXXXX'
  const decision = aiScore >= 75 ? 'APPROVE' : aiScore >= 60 ? 'REVIEW' : 'REJECT'
  const decisionColor = decision === 'APPROVE' ? '#10b981' : decision === 'REVIEW' ? '#f59e0b' : '#ef4444'
  const decisionLabel = decision === 'APPROVE' ? 'HIGH CONFIDENCE' : decision === 'REVIEW' ? 'MANUAL REVIEW' : 'HIGH RISK'

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">AI is reviewing your application</h2>
        <p className="text-sm text-slate-400 mt-1">4 agents processing in parallel · Estimated time: 8 seconds</p>
      </div>

      {/* OTP notice */}
      <div className="flex items-center gap-3 p-4 rounded-xl border"
        style={{ background: 'rgba(99,102,241,0.04)', borderColor: 'rgba(99,102,241,0.2)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(99,102,241,0.1)' }}>
          <Phone className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-700">Verification OTP will be sent to</div>
          <div className="text-sm font-black text-indigo-600 mt-0.5">{displayMobile}</div>
        </div>
      </div>

      {/* Agent cards */}
      <div className="space-y-2.5">
        {agents.map(({ name, desc, status, confidence, time, color }, i) => (
          <motion.div key={name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl bg-white"
            style={{ border: `1px solid ${status === 'completed' ? color + '30' : '#e2e8f0'}` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={status === 'processing' ? { opacity: [1, 0.3, 1], scale: [1, 1.3, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: status === 'waiting' ? '#e2e8f0' : color, boxShadow: status === 'processing' ? `0 0 8px ${color}` : 'none' }}
                />
                <div>
                  <div className="text-sm font-bold text-slate-700">{name}</div>
                  <div className="text-[10px] text-slate-400">{desc}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                style={status === 'completed'  ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #a7f3d0' }
                     : status === 'processing' ? { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }
                     : status === 'failed'     ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }
                     :                           { background: '#f8faff', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
                {status === 'processing' ? '⋯ Analysing' : status === 'completed' ? `✓ ${time}` : status === 'failed' ? '✗ Error' : 'Queued'}
              </span>
            </div>
            {status === 'completed' && confidence !== null && (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400">Confidence</span>
                  <span className="text-[10px] font-bold" style={{ color }}>{confidence}%</span>
                </div>
                <Progress value={confidence} indicatorColor={color} className="h-1.5" />
              </>
            )}
            {status === 'processing' && (
              <motion.div className="h-1.5 rounded-full overflow-hidden bg-slate-100">
                <motion.div className="h-full w-1/3 rounded-full"
                  animate={{ x: ['0%', '250%'] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                  style={{ background: color }} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Result card — shows after all agents complete */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl flex items-center gap-5"
            style={{ background: `${decisionColor}08`, border: `1px solid ${decisionColor}30` }}>
            {/* Score ring */}
            <div className="relative shrink-0">
              <svg width={76} height={76} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={38} cy={38} r={30} fill="none" stroke={`${decisionColor}20`} strokeWidth={7} />
                <motion.circle
                  cx={38} cy={38} r={30} fill="none"
                  stroke={decisionColor} strokeWidth={7} strokeLinecap="round"
                  strokeDasharray={`${(aiScore / 100) * 2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                  initial={{ strokeDashoffset: 200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ filter: `drop-shadow(0 0 6px ${decisionColor}60)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black" style={{ color: '#1e293b' }}>{Math.round(aiScore)}</span>
                <span className="text-[9px] text-slate-400">/ 100</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Preliminary AI Decision</div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xl font-black text-slate-900">{decision}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${decisionColor}15`, color: decisionColor, border: `1px solid ${decisionColor}30` }}>
                  {decisionLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {decision === 'APPROVE'
                  ? `FOIR ${foirCalc}% within limits · Good income profile · Low default risk`
                  : decision === 'REVIEW'
                  ? 'Borderline FOIR — a credit officer will review within 24 hours'
                  : 'FOIR exceeds limit — consider reducing amount or tenure'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!done && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <RefreshCw className="w-3.5 h-3.5" />
          </motion.div>
          Processing… do not close this page
        </div>
      )}
    </div>
  )
}

/* ── Success screen ────────────────────────────────────────────────── */
function SuccessScreen({ mobile, appId }: { mobile: string; appId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #eef0ff 0%, #f8f9ff 50%, #f5f0ff 100%)' }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center"
        style={{ boxShadow: '0 16px 48px rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.1)' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">Application Submitted</div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">You&apos;re all set!</h2>
          <p className="text-slate-500 text-sm mb-6">Your application is now in the AI review queue. We&apos;ll notify you via SMS and email.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl mb-5 text-left space-y-3"
          style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.12)' }}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Application ID</span>
            <span className="font-black text-indigo-600 font-mono">{appId}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">OTP sent to</span>
            <span className="font-bold text-slate-800">{mobile}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Expected decision</span>
            <span className="font-bold text-emerald-600">Within 4 hours</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Next step</span>
            <span className="font-bold text-slate-700">Document verification</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col gap-2">
          <Link href="/apply/status"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
            Track Application Status
          </Link>
          <Link href="/apply"
            className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Validation ────────────────────────────────────────────────────── */
function validateStep1(d: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {}
  if (!d.firstName.trim())  e.firstName = 'First name is required'
  if (!d.lastName.trim())   e.lastName  = 'Last name is required'
  if (!d.dob.trim())        e.dob       = 'Date of birth is required'
  if (!d.mobile.trim())     e.mobile    = 'Mobile number is required'
  else if (!/^\+?[\d\s\-]{10,14}$/.test(d.mobile.trim())) e.mobile = 'Enter a valid mobile number'
  if (!d.email.trim())      e.email     = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Enter a valid email'
  if (!d.pan.trim())        e.pan       = 'PAN is required'
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan)) e.pan = 'Invalid PAN (e.g. ABCDE1234F)'
  if (!d.aadhaar.trim())    e.aadhaar   = 'Aadhaar is required'
  else if (!/^\d{12}$/.test(d.aadhaar.replace(/\s/g, ''))) e.aadhaar = 'Enter 12-digit Aadhaar number'
  if (!d.address.trim())    e.address   = 'Address is required'
  return e
}

function validateStep2(d: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {}
  if (!d.income.trim() || parseLakh(d.income) <= 0) e.income = 'Monthly income is required'
  return e
}

function validateStep3(d: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {}
  const amt = parseLakh(d.amount)
  const cfg = LOAN_CONFIG[d.loanType]
  if (!d.amount.trim() || amt <= 0) {
    e.amount = 'Loan amount is required'
  } else if (amt < cfg.minAmt) {
    e.amount = `Minimum amount is ${fmtINR(cfg.minAmt)}`
  } else if (amt > cfg.maxAmt) {
    e.amount = `Maximum amount is ${fmtINR(cfg.maxAmt)}`
  }
  if (!d.tenure) e.tenure = 'Please select a tenure'
  return e
}

function validateStep4(loanType: LoanType, uploads: UploadedFiles): string | null {
  const missing = DOC_SETS[loanType].filter(d => d.required && !uploads[d.id])
  if (missing.length > 0) return `Please upload: ${missing.map(d => d.label).join(', ')}`
  return null
}

/* ── Main page ─────────────────────────────────────────────────────── */
export default function BorrowerApplicationPage() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState<FormData>(INITIAL)
  const [errors, setErrors]   = useState<Partial<Record<string, string>>>({})
  const [docError, setDocError] = useState<string | null>(null)
  const [uploads, setUploads] = useState<UploadedFiles>({})
  const [submitted, setSubmitted] = useState(false)
  const [appId] = useState(() => {
    const code = TYPE_CODE[INITIAL.loanType]
    return `APP-${code}-${String(100000 + Math.floor(Math.random() * 900000)).slice(0, 6)}`
  })

  // Recalculate appId based on selected loan type when we get to step 5
  const finalAppId = `APP-${TYPE_CODE[form.loanType]}-${appId.split('-')[2]}`

  function updateField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  const handleUpload = useCallback((id: string, file: File | null) => {
    setUploads(prev => ({ ...prev, [id]: file }))
    setDocError(null)
  }, [])

  function tryAdvance() {
    let errs: Partial<Record<string, string>> = {}
    if (step === 1) errs = validateStep1(form)
    if (step === 2) errs = validateStep2(form)
    if (step === 3) errs = validateStep3(form)
    if (step === 4) {
      const docErr = validateStep4(form.loanType, uploads)
      if (docErr) { setDocError(docErr); return }
      setDocError(null)
    }
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStep(s => Math.min(5, s + 1))
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen mobile={form.mobile} appId={finalAppId} />
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)' }}>
      <PortalNav step={step} />

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
              {step === 1 && <PersonalInfoStep data={form} onChange={updateField} errors={errors} />}
              {step === 2 && (
                <EmploymentStep
                  data={form} onChange={updateField} errors={errors}
                  loanAmount={form.amount} loanTenure={form.tenure} loanType={form.loanType}
                />
              )}
              {step === 3 && <LoanDetailsStep data={form} onChange={updateField} errors={errors} />}
              {step === 4 && (
                <>
                  <DocumentsStep loanType={form.loanType} uploads={uploads} onUpload={handleUpload} />
                  {docError && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-600">{docError}</p>
                    </motion.div>
                  )}
                </>
              )}
              {step === 5 && (
                <AIReviewStep
                  mobile={form.mobile} loanType={form.loanType}
                  income={form.income} amount={form.amount} tenure={form.tenure}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between px-6 py-4 shrink-0 border-t bg-slate-50/80"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 bg-white border border-slate-200 transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div key={s.id} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: s.id === step ? '#6366f1' : s.id < step ? '#a7f3d0' : '#e2e8f0' }} />
              ))}
            </div>

            {step < STEPS.length
              ? <button onClick={tryAdvance}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              : <button onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                  <CheckCircle2 className="w-4 h-4" /> Submit Application
                </button>
            }
          </div>
        </motion.div>
      </div>
    </div>
  )
}
