'use client'
import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Progress } from '@/components/ui/progress'
import { RingGauge } from '@/components/ui/ring-gauge'
import { cn } from '@/lib/utils'
import {
  User, Briefcase, IndianRupee, FileText, Brain,
  CheckCircle2, ChevronRight, ChevronLeft, Upload,
  AlertCircle, TrendingUp,
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Personal',    icon: User,         desc: 'KYC & identity' },
  { id: 2, label: 'Employment',  icon: Briefcase,    desc: 'Income & job' },
  { id: 3, label: 'Loan',        icon: IndianRupee,  desc: 'Amount & tenure' },
  { id: 4, label: 'Documents',   icon: FileText,     desc: 'Upload KYC docs' },
  { id: 5, label: 'AI Review',   icon: Brain,        desc: 'Auto-decision' },
]

function StepBar({ current }: { current: number }) {
  return (
    <div className="px-6 py-5 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const done   = current > step.id
          const active = current === step.id
          const Icon   = step.icon
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={
                    done   ? { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }
                  : active ? { background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.1))', border: '1px solid rgba(99,102,241,0.4)', boxShadow: '0 0 16px rgba(99,102,241,0.2)' }
                  :           { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {done
                    ? <CheckCircle2 className="w-4 h-4" style={{ color: '#10b981' }} />
                    : <Icon className="w-4 h-4" style={{ color: active ? '#818cf8' : '#475569' }} />
                  }
                </div>
                <div className={cn('text-[10px] font-semibold', done ? 'text-emerald-400' : active ? 'text-slate-200' : 'text-slate-600')}>
                  {step.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-4 rounded-full transition-all duration-500"
                  style={{ background: done ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)' }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

const inputClass = "w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
}
const inputFocusStyle = "focus:ring-1 focus:ring-brand-500/40"

function InputField({ label, placeholder, type = 'text', span2 = false }: { label: string; placeholder: string; type?: string; span2?: boolean }) {
  return (
    <div className={span2 ? 'col-span-2' : ''}>
      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(inputClass, inputFocusStyle)}
        style={inputStyle}
      />
    </div>
  )
}

function PersonalInfoStep() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Personal Information</h2>
        <p className="text-xs text-slate-500 mt-0.5">Required for KYC and identity verification</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="First Name"    placeholder="Priya" />
        <InputField label="Last Name"     placeholder="Sharma" />
        <InputField label="Date of Birth" placeholder="DD / MM / YYYY" />
        <InputField label="Mobile"        placeholder="+91 98765 43210" type="tel" />
        <InputField label="Email Address" placeholder="priya@example.com" type="email" />
        <InputField label="PAN Number"    placeholder="ABCPS1234D" />
        <div className="col-span-2">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Permanent Address</label>
          <textarea
            rows={2}
            placeholder="123, Andheri West, Mumbai – 400053"
            className={cn("resize-none", inputClass, inputFocusStyle)}
            style={inputStyle}
          />
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
        <h2 className="text-base font-bold text-white">Employment & Income</h2>
        <p className="text-xs text-slate-500 mt-0.5">Used for FOIR and repayment capacity assessment</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(['SALARIED', 'SELF_EMPLOYED', 'BUSINESS'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setEmpType(t)}
            className="py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={empType === t
              ? { background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569' }
            }
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Employer / Company"   placeholder="Infosys Ltd." />
        <InputField label="Designation"          placeholder="Senior Engineer" />
        <InputField label="Monthly Gross Income" placeholder="₹ 85,000" />
        <InputField label="Monthly Take-Home"    placeholder="₹ 68,000" />
        <InputField label="Years Employed"       placeholder="5 years" />
        <InputField label="City of Work"         placeholder="Mumbai" />
      </div>

      {/* FOIR meter */}
      <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-200">Estimated FOIR</span>
          </div>
          <span className="text-sm font-black text-emerald-400">38.2%</span>
        </div>
        <Progress value={38.2} indicatorColor="#10b981" className="h-2" />
        <p className="text-[10px] text-slate-500 mt-1.5">
          Fixed Obligations-to-Income Ratio · Maximum allowed: 55% · <span className="text-emerald-400 font-semibold">Eligible ✓</span>
        </p>
      </div>
    </div>
  )
}

function LoanDetailsStep() {
  const [loanType, setLoanType] = useState('HOME')
  const LOAN_TYPES = ['HOME', 'PERSONAL', 'BUSINESS', 'AUTO', 'EDUCATION', 'GOLD']
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Loan Details</h2>
        <p className="text-xs text-slate-500 mt-0.5">Specify the loan amount, type, and tenure</p>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">Loan Type</label>
        <div className="grid grid-cols-3 gap-2">
          {LOAN_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setLoanType(t)}
              className="py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={loanType === t
                ? { background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569' }
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Requested Amount (₹)" placeholder="45,00,000" />
        <InputField label="Tenure (months)"       placeholder="240" type="number" />
        <InputField label="Purpose" placeholder="Home purchase in Andheri West" span2 />
      </div>

      {/* EMI card */}
      <div className="p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 mb-0.5">Estimated Monthly EMI</div>
            <div className="text-2xl font-black text-white">₹38,450</div>
          </div>
          <div className="text-right space-y-1">
            {[
              { l: 'Interest Rate', v: '8.5% p.a.' },
              { l: 'Processing Fee', v: '₹22,500' },
              { l: 'Total Cost',    v: '₹92.3L' },
            ].map(({ l, v }) => (
              <div key={l} className="flex items-center justify-end gap-3 text-[10px]">
                <span className="text-slate-500">{l}</span>
                <span className="text-slate-300 font-semibold w-16 text-right">{v}</span>
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
    { label: 'Last 3 Salary Slips',  required: true,  status: 'pending' },
    { label: 'Bank Statement (6mo)', required: true,  status: 'pending' },
    { label: 'Form 16',              required: false, status: 'pending' },
    { label: 'Property Documents',   required: false, status: 'pending' },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Document Upload</h2>
        <p className="text-xs text-slate-500 mt-0.5">Our AI agent auto-extracts and verifies all data</p>
      </div>
      <div className="space-y-2">
        {DOCS.map(({ label, required, status }) => (
          <div
            key={label}
            className="flex items-center justify-between p-3.5 rounded-xl transition-colors"
            style={status === 'uploaded'
              ? { background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }
              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            <div className="flex items-center gap-3">
              {status === 'uploaded'
                ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#10b981' }} />
                : <FileText className="w-4 h-4 shrink-0 text-slate-500" />
              }
              <div>
                <div className="text-xs font-medium text-slate-200">{label}</div>
                {required && <span className="text-[10px] text-slate-600">Required</span>}
              </div>
            </div>
            {status === 'uploaded'
              ? (
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                  ✓ Uploaded
                </span>
              )
              : (
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Upload className="w-3 h-3" /> Upload
                </button>
              )
            }
          </div>
        ))}
      </div>
      <div
        className="flex items-start gap-3 p-3.5 rounded-xl"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-300/80 leading-relaxed">
          The Document Intelligence Agent will auto-extract income, address, and identity data.
          Processing takes ~60–90 seconds per document.
        </p>
      </div>
    </div>
  )
}

function AIReviewStep() {
  const AGENTS = [
    { name: 'Document Intelligence', status: 'completed',  confidence: 94, time: '1.2s', color: '#6366f1' },
    { name: 'Credit Decision',       status: 'completed',  confidence: 87, time: '2.8s', color: '#f59e0b' },
    { name: 'Risk Assessment',       status: 'processing', confidence: null, time: null,  color: '#8b5cf6' },
    { name: 'Collections Forecast',  status: 'waiting',    confidence: null, time: null,  color: '#10b981' },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">AI Underwriting Review</h2>
        <p className="text-xs text-slate-500 mt-0.5">Multi-agent pipeline · 2 of 4 agents complete</p>
      </div>
      <div className="space-y-2.5">
        {AGENTS.map(({ name, status, confidence, time, color }) => (
          <div
            key={name}
            className="p-4 rounded-xl"
            style={{
              background: status === 'completed' ? `${color}08` : 'rgba(255,255,255,0.025)',
              border: `1px solid ${status === 'completed' ? color + '25' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: color,
                    boxShadow: status === 'processing' ? `0 0 8px ${color}` : 'none',
                  }}
                />
                <span className="text-xs font-semibold text-slate-200">{name}</span>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={
                  status === 'completed'  ? { background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
                : status === 'processing' ? { background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }
                :                           { background: 'rgba(255,255,255,0.05)', color: '#475569', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {status === 'processing' ? 'Processing…' : status === 'completed' ? '✓ Done' : 'Waiting'}
              </span>
            </div>
            {status === 'completed' && confidence !== null && (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Confidence</span>
                  <span className="text-[10px] font-bold" style={{ color }}>{confidence}% · {time}</span>
                </div>
                <Progress value={confidence} indicatorColor={color} className="h-1.5" />
              </>
            )}
            {status === 'processing' && (
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-full w-1/3 rounded-full shimmer-bg" style={{ background: color }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preliminary score */}
      <div
        className="p-5 rounded-xl flex items-center gap-5"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <RingGauge value={82} size={72} strokeWidth={7} color="#6366f1" label="/100" showValue />
        <div>
          <div className="text-[11px] text-slate-400 mb-0.5">Preliminary AI Decision</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-black text-white">APPROVE</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              HIGH CONFIDENCE
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            FOIR within limits · Excellent credit score · Low risk profile
          </p>
        </div>
      </div>
    </div>
  )
}

const STEP_COMPONENTS = [PersonalInfoStep, EmploymentStep, LoanDetailsStep, DocumentsStep, AIReviewStep]

export default function NewApplicationPage() {
  const [step, setStep] = useState(1)
  const StepComponent = STEP_COMPONENTS[step - 1]

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#080b14' }}>
      <Header title="New Loan Application" subtitle="Complete all 5 steps" />

      <div className="flex-1 flex flex-col p-5">
        <div
          className="rounded-2xl overflow-hidden max-w-2xl w-full mx-auto flex-1 flex flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <StepBar current={step} />

          <div className="flex-1 p-6 overflow-auto scrollbar-thin">
            <StepComponent />
          </div>

          <div
            className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.15)' }}
          >
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-[11px] text-slate-600">Step {step} / {STEPS.length}</div>

            {step < STEPS.length
              ? (
                <button
                  onClick={() => setStep(Math.min(STEPS.length, step + 1))}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                  }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              )
              : (
                <button
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Submit Application
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
