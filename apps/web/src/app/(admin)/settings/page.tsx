'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Brain,
  Bell,
  Users,
  ChevronDown,
  ChevronUp,
  Pencil,
} from 'lucide-react'

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

/* ── Toggle ──────────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
      style={{ background: checked ? '#6366f1' : '#e2e8f0' }}
    >
      <span
        className="inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5"
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

/* ── Checkbox ────────────────────────────────────────────────────────── */
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
      />
      <span className="text-xs text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  )
}

/* ── Section wrapper ─────────────────────────────────────────────────── */
function Section({
  id,
  title,
  icon: Icon,
  color,
  open,
  onToggle,
  children,
  delay,
}: {
  id: string
  title: string
  icon: React.ElementType
  color: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="rounded-xl overflow-hidden"
      style={cardStyle}
    >
      <button
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
        onClick={onToggle}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}12`, border: `1px solid ${color}22` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-sm font-bold text-slate-900 flex-1">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          {children}
        </div>
      )}
    </motion.div>
  )
}

/* ── Input field ─────────────────────────────────────────────────────── */
function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <input
        readOnly
        defaultValue={value}
        className="px-3 py-2 rounded-lg text-xs text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
      />
    </div>
  )
}

/* ── Role badge ──────────────────────────────────────────────────────── */
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    super_admin:   '#6366f1',
    risk_manager:  '#f59e0b',
    underwriter:   '#10b981',
    collections:   '#ef4444',
    analyst:       '#3b82f6',
  }
  const color = map[role] ?? '#64748b'
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}
    >
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

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

const AVATAR_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6']

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState<string>('branch')

  function toggle(id: string) {
    setOpenSection((prev) => (prev === id ? '' : id))
  }

  /* AI toggles */
  const [aiToggles, setAiToggles] = useState({
    autoApprove: true,
    mfa: true,
    borrowerOtp: true,
    npaReport: true,
  })

  /* Notification checkboxes */
  const [notifEmail, setNotifEmail] = useState({
    newApp: true,
    approval: true,
    rejection: true,
    disbursement: true,
    emiOverdue: true,
  })
  const [notifSms, setNotifSms] = useState({
    newApp: false,
    approval: true,
    rejection: false,
    disbursement: true,
    emiOverdue: true,
  })

  const notifRows = [
    { key: 'newApp' as const,      label: 'New Application' },
    { key: 'approval' as const,    label: 'Approval' },
    { key: 'rejection' as const,   label: 'Rejection' },
    { key: 'disbursement' as const,label: 'Disbursement' },
    { key: 'emiOverdue' as const,  label: 'EMI Overdue' },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Settings" subtitle="System configuration · Mumbai HQ" />

      <div className="flex-1 p-5 space-y-4 max-w-3xl mx-auto w-full">

        {/* 1. Branch Settings */}
        <Section
          id="branch" title="Branch Settings"
          icon={Building2} color="#6366f1"
          open={openSection === 'branch'} onToggle={() => toggle('branch')}
          delay={0}
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

        {/* 2. AI Configuration */}
        <Section
          id="ai" title="AI Configuration"
          icon={Brain} color="#8b5cf6"
          open={openSection === 'ai'} onToggle={() => toggle('ai')}
          delay={0.06}
        >
          <div className="space-y-5">
            {/* Toggles */}
            <div className="space-y-3">
              {[
                { key: 'autoApprove' as const, label: 'Auto-approve if AI score ≥ 90' },
                { key: 'mfa' as const,          label: 'Require MFA for all staff' },
                { key: 'borrowerOtp' as const,  label: 'Send borrower OTP on submit' },
                { key: 'npaReport' as const,    label: 'Daily NPA report email' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-700 font-medium">{label}</span>
                  <Toggle
                    checked={aiToggles[key]}
                    onChange={() => setAiToggles((p) => ({ ...p, [key]: !p[key] }))}
                  />
                </div>
              ))}
            </div>
            {/* Static fields */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <FieldRow label="AI Model Version"          value="v2.3.1" />
              <FieldRow label="Max Tokens / Application"  value="5000" />
            </div>
          </div>
        </Section>

        {/* 3. Notifications */}
        <Section
          id="notif" title="Notifications"
          icon={Bell} color="#f59e0b"
          open={openSection === 'notif'} onToggle={() => toggle('notif')}
          delay={0.12}
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
                      <Checkbox
                        label=""
                        checked={notifEmail[key]}
                        onChange={() => setNotifEmail((p) => ({ ...p, [key]: !p[key] }))}
                      />
                    </td>
                    <td className="py-2.5 text-center">
                      <Checkbox
                        label=""
                        checked={notifSms[key]}
                        onChange={() => setNotifSms((p) => ({ ...p, [key]: !p[key] }))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 4. Team */}
        <Section
          id="team" title="Team"
          icon={Users} color="#10b981"
          open={openSection === 'team'} onToggle={() => toggle('team')}
          delay={0.18}
        >
          <div className="space-y-2.5">
            {TEAM.map((member, i) => (
              <div
                key={member.email}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {getInitials(member.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 truncate">{member.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{member.email}</div>
                </div>
                <RoleBadge role={member.role} />
                <button className="ml-2 flex items-center gap-1 text-[11px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors px-2 py-1 rounded-md hover:bg-indigo-50">
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
