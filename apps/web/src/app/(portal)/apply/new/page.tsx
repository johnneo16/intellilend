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
  TrendingUp, ArrowLeft, Phone,
} from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────────── */
type Step1Data = {
  firstName: string; lastName: string; dob: string
  mobile: string; email: string; pan: string; address: string
}
type Step2Data = { empType: 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS'; employer: string; designation: string; income: string; takeHome: string }
type Step3Data = { loanType: string; amount: string; tenure: string; purpose: string }

type FormData = Step1Data & Step2Data & Step3Data

const INITIAL: FormData = {
  firstName: '', lastName: '', dob: '', mobile: '', email: '', pan: '', address: '',
  empType: 'SALARIED', employer: '', designation: '', income: '', takeHome: '',
  loanType: 'HOME', amount: '', tenure: '', purpose: '',
}

/* ── Steps config ──────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Personal',   icon: User,        desc: 'KYC & identity' },
  { id: 2, label: 'Employment', icon: Briefcase,   desc: 'Income & job' },
  { id: 3, label: 'Loan',       icon: IndianRupee, desc: 'Amount & tenure' },
  { id: 4, label: 'Documents',  icon: FileText,    desc: 'Upload KYC docs' },
  { id: 5, label: 'AI Review',  icon: Brain,       desc: 'Auto-decision' },
]

/* ── Portal nav ────────────────────────────────────────────────────── */
function PortalNav({ step }: { step: number }) {
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
                <div className={cn('text-[10px] font-semibold', done ? 'text-emerald-600' : active ? 'text-indigo-600' : 'text-slate-400')}>
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
  value, onChange, error, required = false,
}: {
  label: string; placeholder: string; type?: string; span2?: boolean
  value?: string; onChange?: (v: string) => void; error?: string; required?: boolean
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
      {error && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  )
}

/* ── Step 1: Personal Info ─────────────────────────────────────────── */
function PersonalInfoStep({
  data, onChange, errors,
}: { data: Step1Data; onChange: (k: keyof Step1Data, v: string) => void; errors: Partial<Record<keyof Step1Data, string>> }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Personal Information</h2>
        <p className="text-sm text-slate-400 mt-1">Fields marked <span className="text-red-400 font-bold">*</span> are required for KYC verification</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name"    placeholder="Priya"            required value={data.firstName} onChange={v => onChange('firstName', v)} error={errors.firstName} />
        <Field label="Last Name"     placeholder="Sharma"           required value={data.lastName}  onChange={v => onChange('lastName',  v)} error={errors.lastName} />
        <Field label="Date of Birth" placeholder="DD/MM/YYYY"       required value={data.dob}       onChange={v => onChange('dob',       v)} error={errors.dob} />
        <Field label="Mobile Number" placeholder="+91 98765 43210"  required type="tel"  value={data.mobile}    onChange={v => onChange('mobile',    v)} error={errors.mobile} />
        <Field label="Email Address" placeholder="priya@email.com"  required type="email" value={data.email}   onChange={v => onChange('email',     v)} error={errors.email} />
        <Field label="PAN Number"    placeholder="ABCPS1234D"        required value={data.pan}       onChange={v => onChange('pan', v.toUpperCase())} error={errors.pan} />
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Permanent Address</label>
          <textarea rows={2} placeholder="123, Andheri West, Mumbai – 400053"
            value={data.address} onChange={e => onChange('address', e.target.value)}
            className="resize-none w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-300 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all bg-white" />
        </div>
      </div>
    </div>
  )
}

/* ── Step 2: Employment ────────────────────────────────────────────── */
function EmploymentStep({ data, onChange }: { data: Step2Data; onChange: (k: keyof Step2Data, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Employment & Income</h2>
        <p className="text-sm text-slate-400 mt-1">Used to assess your loan repayment capacity</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS'] as const).map((t) => (
          <button key={t} type="button" onClick={() => onChange('empType', t)}
            className="py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={data.empType === t
              ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5', boxShadow: '0 2px 6px rgba(99,102,241,0.15)' }
              : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Employer / Company"   placeholder="Infosys Ltd."       value={data.employer}    onChange={v => onChange('employer',    v)} />
        <Field label="Designation"          placeholder="Senior Engineer"     value={data.designation} onChange={v => onChange('designation', v)} />
        <Field label="Monthly Gross Income" placeholder="₹ 85,000"           value={data.income}      onChange={v => onChange('income',      v)} required />
        <Field label="Monthly Take-Home"    placeholder="₹ 68,000"           value={data.takeHome}    onChange={v => onChange('takeHome',    v)} />
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

/* ── Step 3: Loan Details ──────────────────────────────────────────── */
function LoanDetailsStep({ data, onChange }: { data: Step3Data; onChange: (k: keyof Step3Data, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Loan Details</h2>
        <p className="text-sm text-slate-400 mt-1">Tell us what you need — we'll find the best offer</p>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Loan Type <span className="text-red-400">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {['HOME', 'PERSONAL', 'BUSINESS', 'AUTO', 'EDUCATION', 'GOLD'].map((t) => (
            <button key={t} type="button" onClick={() => onChange('loanType', t)}
              className="py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={data.loanType === t
                ? { background: 'linear-gradient(135deg, #eef2ff, #ede9fe)', border: '1px solid #c7d2fe', color: '#4f46e5' }
                : { background: '#f8faff', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Requested Amount (₹)" placeholder="45,00,000" required value={data.amount}  onChange={v => onChange('amount',  v)} />
        <Field label="Tenure (months)"       placeholder="240"       required type="number" value={data.tenure} onChange={v => onChange('tenure', v)} />
        <Field label="Purpose" placeholder="Home purchase in Andheri West" span2 value={data.purpose} onChange={v => onChange('purpose', v)} />
      </div>
      {data.amount && (
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
      )}
    </div>
  )
}

/* ── Step 4: Documents ─────────────────────────────────────────────── */
const DOCS = [
  { label: 'PAN Card',             required: true,  status: 'uploaded' },
  { label: 'Aadhaar Card',         required: true,  status: 'uploaded' },
  { label: 'Last 3 Salary Slips',  required: true,  status: 'pending'  },
  { label: 'Bank Statement (6mo)', required: true,  status: 'pending'  },
  { label: 'Form 16',              required: false, status: 'pending'  },
  { label: 'Property Documents',   required: false, status: 'pending'  },
]

function DocumentsStep() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900">Document Upload</h2>
        <p className="text-sm text-slate-400 mt-1">Required documents must be uploaded to proceed</p>
      </div>
      <div className="space-y-2">
        {DOCS.map(({ label, required, status }) => (
          <motion.div key={label} whileHover={{ scale: 1.005 }}
            className="flex items-center justify-between p-4 rounded-xl transition-colors"
            style={status === 'uploaded'
              ? { background: '#f0fdf4', border: '1px solid #a7f3d0' }
              : { background: '#f8faff', border: '1px solid #e2e8f0' }}>
            <div className="flex items-center gap-3">
              {status === 'uploaded'
                ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                : <FileText className="w-4 h-4 shrink-0 text-slate-300" />}
              <div>
                <div className="text-sm font-semibold text-slate-700">{label}</div>
                <span className="text-[10px] text-slate-400">{required ? 'Required' : 'Optional'}</span>
              </div>
            </div>
            {status === 'uploaded'
              ? <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">✓ Uploaded</span>
              : <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                  <Upload className="w-3 h-3" /> Upload
                </button>}
          </motion.div>
        ))}
      </div>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Our AI Document Agent auto-reads and verifies all documents. Processing takes ~60 seconds per file. Your data is encrypted end-to-end.
        </p>
      </div>
    </div>
  )
}

/* ── Step 5: AI Review ─────────────────────────────────────────────── */
function AIReviewStep({ mobile }: { mobile: string }) {
  const displayMobile = mobile.trim() || '+91 XXXXX XXXXX'
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

      {/* OTP notice — uses mobile from form */}
      <div className="flex items-center gap-3 p-4 rounded-xl border"
        style={{ background: 'rgba(99,102,241,0.04)', borderColor: 'rgba(99,102,241,0.2)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(99,102,241,0.1)' }}>
          <Phone className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-700">Verification OTP will be sent to</div>
          <div className="text-sm font-black text-indigo-600 mt-0.5">{displayMobile}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {AGENTS.map(({ name, status, confidence, time, color }, i) => (
          <motion.div key={name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-white"
            style={{ border: `1px solid ${status === 'completed' ? color + '30' : '#e2e8f0'}` }}>
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
              <motion.div className="h-1.5 rounded-full overflow-hidden bg-slate-100">
                <motion.div className="h-full w-1/3 rounded-full"
                  animate={{ x: ['0%', '250%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{ background: color }} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl flex items-center gap-5 bg-indigo-50 border border-indigo-200">
        <RingGauge value={82} size={72} strokeWidth={7} color="#6366f1" label="/100" showValue trackColor="rgba(99,102,241,0.1)" />
        <div>
          <div className="text-xs text-slate-500 mb-1">Preliminary AI Decision</div>
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
          <h2 className="text-2xl font-black text-slate-900 mb-1">You're all set!</h2>
          <p className="text-slate-500 text-sm mb-6">Your application is now in the AI review queue.</p>
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
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex flex-col gap-2">
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
function validateStep1(d: Step1Data): Partial<Record<keyof Step1Data, string>> {
  const e: Partial<Record<keyof Step1Data, string>> = {}
  if (!d.firstName.trim()) e.firstName = 'First name is required'
  if (!d.lastName.trim())  e.lastName  = 'Last name is required'
  if (!d.dob.trim())       e.dob       = 'Date of birth is required'
  if (!d.mobile.trim())    e.mobile    = 'Mobile number is required'
  else if (!/^\+?[\d\s\-]{10,14}$/.test(d.mobile)) e.mobile = 'Enter a valid mobile number'
  if (!d.email.trim())     e.email     = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Enter a valid email'
  if (!d.pan.trim())       e.pan       = 'PAN number is required'
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan)) e.pan = 'Invalid PAN (e.g. ABCDE1234F)'
  return e
}

function validateStep3(d: Step3Data): Partial<Record<keyof Step3Data, string>> {
  const e: Partial<Record<keyof Step3Data, string>> = {}
  if (!d.amount.trim()) e.amount = 'Loan amount is required'
  if (!d.tenure.trim()) e.tenure = 'Tenure is required'
  return e
}

/* ── Main page ─────────────────────────────────────────────────────── */
export default function BorrowerApplicationPage() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState<FormData>(INITIAL)
  const [errors, setErrors]   = useState<Partial<Record<string, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const appId = 'ILL-2024-' + Math.floor(100000 + Math.random() * 900000)

  function updateField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  function tryAdvance() {
    if (step === 1) {
      const errs = validateStep1(form)
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
    }
    if (step === 3) {
      const errs = validateStep3(form)
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
    }
    setErrors({})
    setStep(s => Math.min(5, s + 1))
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen mobile={form.mobile} appId={appId} />
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
              {step === 1 && <PersonalInfoStep data={form} onChange={(k, v) => updateField(k, v)} errors={errors as Partial<Record<keyof Step1Data, string>>} />}
              {step === 2 && <EmploymentStep data={form} onChange={(k, v) => updateField(k, v)} />}
              {step === 3 && <LoanDetailsStep data={form} onChange={(k, v) => updateField(k, v)} />}
              {step === 4 && <DocumentsStep />}
              {step === 5 && <AIReviewStep mobile={form.mobile} />}
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
