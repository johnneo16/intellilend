'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import {
  Building2, Brain, Bell, Users, ChevronDown, ChevronUp, Pencil,
  IndianRupee, Check, RotateCcw, Save, AlertCircle,
} from 'lucide-react'
import { DEFAULT_LOAN_CONFIG, LOAN_TYPES, fmtINR, calcEMI, type LoanType, type LoanProduct } from '@/lib/loan-config'

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

/* ── Toggle ──────────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button role="switch" aria-checked={checked} onClick={onChange}
      className="relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
      style={{ background: checked ? '#6366f1' : '#e2e8f0' }}>
      <span className="inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5"
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }} />
    </button>
  )
}

/* ── Checkbox ────────────────────────────────────────────────────────── */
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange}
        className="w-4 h-4 rounded accent-indigo-500 cursor-pointer" />
      <span className="text-xs text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  )
}

/* ── Section wrapper ─────────────────────────────────────────────────── */
function Section({ id, title, icon: Icon, color, open, onToggle, children, delay, badge }: {
  id: string; title: string; icon: React.ElementType; color: string
  open: boolean; onToggle: () => void; children: React.ReactNode; delay: number; badge?: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }} className="rounded-xl overflow-hidden" style={cardStyle}>
      <button className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
        onClick={onToggle}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-sm font-bold text-slate-900 flex-1">{title}</span>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 mr-1">
            {badge}
          </span>
        )}
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">{children}</div>
      )}
    </motion.div>
  )
}

/* ── Static field row ────────────────────────────────────────────────── */
function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <input readOnly defaultValue={value}
        className="px-3 py-2 rounded-lg text-xs text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition" />
    </div>
  )
}

/* ── Editable number field ───────────────────────────────────────────── */
function NumField({ label, value, onChange, suffix, min, max, step = 0.01 }: {
  label: string; value: number; onChange: (v: number) => void
  suffix?: string; min?: number; max?: number; step?: number
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-3 pr-8 py-2 rounded-lg text-xs text-slate-800 font-semibold border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
        {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{suffix}</span>}
      </div>
    </div>
  )
}

/* ── Loan product card ───────────────────────────────────────────────── */
function LoanProductCard({
  loanType, product, onChange,
}: {
  loanType: LoanType
  product: LoanProduct
  onChange: (field: keyof LoanProduct, value: number) => void
}) {
  const sampleEMI = calcEMI(product.minAmt * 5, product.rate, Math.min(120, product.maxTenure))

  return (
    <div className="rounded-xl p-4 space-y-4" style={{ background: '#f8faff', border: '1px solid #e0e7ff' }}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{product.emoji}</span>
        <div>
          <div className="text-sm font-black text-slate-800">{product.label}</div>
          <div className="text-[10px] text-slate-400">Sample EMI (5× min amt, 10yr): <span className="font-bold text-indigo-600">{fmtINR(sampleEMI)}/mo</span></div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-lg font-black text-indigo-600">{product.rate}%</div>
          <div className="text-[10px] text-slate-400">p.a.</div>
        </div>
      </div>

      {/* Rate & fees row */}
      <div className="grid grid-cols-3 gap-3">
        <NumField label="Interest Rate" value={product.rate} suffix="% p.a."
          min={1} max={36} step={0.05}
          onChange={v => onChange('rate', v)} />
        <NumField label="Processing Fee" value={product.fee} suffix="% of loan"
          min={0} max={5} step={0.05}
          onChange={v => onChange('fee', v)} />
        <NumField label="Auto-Approve ≥" value={product.autoApproveScore} suffix="/ 100"
          min={50} max={100} step={1}
          onChange={v => onChange('autoApproveScore', v)} />
      </div>

      {/* Amount & tenure row */}
      <div className="grid grid-cols-3 gap-3">
        <NumField label="Min Amount (₹)" value={product.minAmt} suffix="₹"
          min={1000} step={10000}
          onChange={v => onChange('minAmt', v)} />
        <NumField label="Max Amount (₹)" value={product.maxAmt} suffix="₹"
          min={product.minAmt} step={100000}
          onChange={v => onChange('maxAmt', v)} />
        <NumField label="Max Tenure (mo)" value={product.maxTenure} suffix="mo"
          min={12} max={360} step={12}
          onChange={v => onChange('maxTenure', v)} />
      </div>

      {/* Range display */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-indigo-100">
        <span>Range: <span className="text-slate-600 font-semibold">{fmtINR(product.minAmt)} – {fmtINR(product.maxAmt)}</span></span>
        <span>Max tenure: <span className="text-slate-600 font-semibold">{product.maxTenure} mo ({(product.maxTenure / 12).toFixed(1)} yrs)</span></span>
      </div>
    </div>
  )
}

/* ── Role badge ──────────────────────────────────────────────────────── */
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    super_admin: '#6366f1', risk_manager: '#f59e0b',
    underwriter: '#10b981', collections: '#ef4444', analyst: '#3b82f6',
  }
  const color = map[role] ?? '#64748b'
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}>
      {role.replace('_', ' ')}
    </span>
  )
}

const TEAM = [
  { name: 'Arindam Chowdhury', email: 'arindam@intellilend.in', role: 'super_admin' },
  { name: 'Priya Sharma',      email: 'priya.s@intellilend.in', role: 'risk_manager' },
  { name: 'Anjali Patel',      email: 'anjali@intellilend.in',  role: 'underwriter' },
  { name: 'Deepak Nair',       email: 'deepak@intellilend.in',  role: 'collections' },
  { name: 'Ananya Roy',        email: 'ananya@intellilend.in',  role: 'analyst' },
]

const AVATAR_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6']
function getInitials(name: string) { return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }

/* ── Main page ───────────────────────────────────────────────────────── */
export default function SettingsPage() {
  const [openSection, setOpenSection] = useState<string>('rates')
  function toggle(id: string) { setOpenSection(p => p === id ? '' : id) }

  /* AI toggles */
  const [aiToggles, setAiToggles] = useState({ autoApprove: true, mfa: true, borrowerOtp: true, npaReport: true })

  /* Notification checkboxes */
  const [notifEmail, setNotifEmail] = useState({ newApp: true, approval: true, rejection: true, disbursement: true, emiOverdue: true })
  const [notifSms, setNotifSms]     = useState({ newApp: false, approval: true, rejection: false, disbursement: true, emiOverdue: true })

  const notifRows = [
    { key: 'newApp' as const,      label: 'New Application' },
    { key: 'approval' as const,    label: 'Approval' },
    { key: 'rejection' as const,   label: 'Rejection' },
    { key: 'disbursement' as const,label: 'Disbursement' },
    { key: 'emiOverdue' as const,  label: 'EMI Overdue' },
  ]

  /* Loan product config — editable */
  const [loanConfig, setLoanConfig] = useState<Record<LoanType, LoanProduct>>(() =>
    JSON.parse(JSON.stringify(DEFAULT_LOAN_CONFIG))
  )
  const [savedConfig, setSavedConfig] = useState<Record<LoanType, LoanProduct>>(() =>
    JSON.parse(JSON.stringify(DEFAULT_LOAN_CONFIG))
  )
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  const isDirty = JSON.stringify(loanConfig) !== JSON.stringify(savedConfig)

  function updateProduct(loanType: LoanType, field: keyof LoanProduct, value: number) {
    setLoanConfig(prev => ({
      ...prev,
      [loanType]: { ...prev[loanType], [field]: value },
    }))
    setSaveState('idle')
  }

  function handleSave() {
    setSaveState('saving')
    setTimeout(() => {
      setSavedConfig(JSON.parse(JSON.stringify(loanConfig)))
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    }, 800)
  }

  function handleReset() {
    setLoanConfig(JSON.parse(JSON.stringify(DEFAULT_LOAN_CONFIG)))
    setSaveState('idle')
  }

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Settings" subtitle="System configuration · Mumbai HQ" />

      <div className="flex-1 p-5 space-y-4 max-w-3xl mx-auto w-full">

        {/* ── 0. Loan Products & Interest Rates (NEW — open by default) ── */}
        <Section
          id="rates" title="Loan Products & Interest Rates"
          icon={IndianRupee} color="#6366f1"
          open={openSection === 'rates'} onToggle={() => toggle('rates')}
          delay={0} badge={isDirty ? 'Unsaved changes' : undefined}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500">Edit rates, fees, and limits for each loan product. Changes apply to new applications immediately after saving.</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 hover:border-slate-300 transition-all"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || saveState === 'saving'}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-40"
                  style={saveState === 'saved'
                    ? { background: '#10b981' }
                    : { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: isDirty ? '0 2px 8px rgba(99,102,241,0.3)' : 'none' }}
                >
                  {saveState === 'saving' ? (
                    <><span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Saving…</>
                  ) : saveState === 'saved' ? (
                    <><Check className="w-3 h-3" /> Saved!</>
                  ) : (
                    <><Save className="w-3 h-3" /> Save Changes</>
                  )}
                </button>
              </div>
            </div>

            {/* Unsaved warning */}
            <AnimatePresence>
              {isDirty && saveState === 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700">You have unsaved changes. Borrower application rates won&apos;t update until you save.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* One card per loan type */}
            {LOAN_TYPES.map(lt => (
              <LoanProductCard
                key={lt}
                loanType={lt}
                product={loanConfig[lt]}
                onChange={(field, value) => updateProduct(lt, field, value)}
              />
            ))}
          </div>
        </Section>

        {/* ── 1. Branch Settings ──────────────────────────────────────── */}
        <Section
          id="branch" title="Branch Settings"
          icon={Building2} color="#0ea5e9"
          open={openSection === 'branch'} onToggle={() => toggle('branch')}
          delay={0.06}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow label="Branch Name"         value="Mumbai HQ" />
            <FieldRow label="Phone"               value="+91-22-4567-8900" />
            <FieldRow label="NBFC Licence Number" value="N-14.03218" />
            <FieldRow label="GST Number"          value="27AABCI1234A1Z5" />
            <div className="sm:col-span-2">
              <FieldRow label="Address" value="12th Floor, One BKC, Bandra Kurla Complex, Mumbai 400051" />
            </div>
          </div>
        </Section>

        {/* ── 2. AI Configuration ─────────────────────────────────────── */}
        <Section
          id="ai" title="AI Configuration"
          icon={Brain} color="#8b5cf6"
          open={openSection === 'ai'} onToggle={() => toggle('ai')}
          delay={0.12}
        >
          <div className="space-y-5">
            <div className="space-y-3">
              {[
                { key: 'autoApprove' as const, label: 'Auto-approve if AI score meets per-product threshold' },
                { key: 'mfa'         as const, label: 'Require MFA for all staff logins' },
                { key: 'borrowerOtp' as const, label: 'Send borrower OTP on application submit' },
                { key: 'npaReport'   as const, label: 'Daily NPA report via email' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-700 font-medium">{label}</span>
                  <Toggle checked={aiToggles[key]} onChange={() => setAiToggles(p => ({ ...p, [key]: !p[key] }))} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <FieldRow label="AI Model Version"         value="v2.3.1" />
              <FieldRow label="Max Tokens / Application" value="5000" />
            </div>
          </div>
        </Section>

        {/* ── 3. Notifications ────────────────────────────────────────── */}
        <Section
          id="notif" title="Notifications"
          icon={Bell} color="#f59e0b"
          open={openSection === 'notif'} onToggle={() => toggle('notif')}
          delay={0.18}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Event</th>
                  <th className="text-center py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-20">Email</th>
                  <th className="text-center py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-20">SMS</th>
                </tr>
              </thead>
              <tbody>
                {notifRows.map(({ key, label }) => (
                  <tr key={key} className="border-b border-slate-50">
                    <td className="py-2.5 text-xs text-slate-700 font-medium">{label}</td>
                    <td className="py-2.5 text-center">
                      <Checkbox label="" checked={notifEmail[key]} onChange={() => setNotifEmail(p => ({ ...p, [key]: !p[key] }))} />
                    </td>
                    <td className="py-2.5 text-center">
                      <Checkbox label="" checked={notifSms[key]} onChange={() => setNotifSms(p => ({ ...p, [key]: !p[key] }))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── 4. Team ─────────────────────────────────────────────────── */}
        <Section
          id="team" title="Team"
          icon={Users} color="#10b981"
          open={openSection === 'team'} onToggle={() => toggle('team')}
          delay={0.24}
        >
          <div className="space-y-2.5">
            {TEAM.map((member, i) => (
              <div key={member.email}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {getInitials(member.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 truncate">{member.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{member.email}</div>
                </div>
                <RoleBadge role={member.role} />
                <button className="ml-2 flex items-center gap-1 text-[11px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors px-2 py-1 rounded-md hover:bg-indigo-50">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
