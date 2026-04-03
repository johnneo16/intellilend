'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageSquare, XCircle, ArrowLeft, FileText, CreditCard, Banknote, Building2 } from 'lucide-react'
import { ALL_APPLICATIONS, APPLICATION_AGENTS } from '@/lib/mock-data'
import { formatCurrency, cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RingGauge } from '@/components/ui/ring-gauge'

/* ── Constants ──────────────────────────────────────────────────────── */

const CARD_STYLE = {
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

const STATUS_BADGE: Record<string, 'success' | 'blue' | 'destructive' | 'default' | 'warning'> = {
  APPROVED:      'success',
  DISBURSED:     'blue',
  REJECTED:      'destructive',
  AI_PROCESSING: 'default',
  UNDER_REVIEW:  'warning',
  SUBMITTED:     'default',
}

const STATUS_LABEL: Record<string, string> = {
  APPROVED:      'Approved',
  DISBURSED:     'Disbursed',
  REJECTED:      'Rejected',
  AI_PROCESSING: 'AI Processing',
  UNDER_REVIEW:  'Under Review',
  SUBMITTED:     'Submitted',
  DRAFT:         'Draft',
}

const AGENT_STATUS_BADGE: Record<string, 'success' | 'blue' | 'secondary'> = {
  COMPLETED:  'success',
  PROCESSING: 'blue',
  WAITING:    'secondary',
}

const TIMELINE_DOT: Record<string, string> = {
  submit: '#6366f1',
  ai:     '#8b5cf6',
  human:  '#10b981',
  auto:   '#94a3b8',
}

const DOCS = [
  { label: 'PAN Card',       icon: CreditCard,  uploaded: true },
  { label: 'Aadhaar',        icon: FileText,    uploaded: true },
  { label: 'Salary Slips',   icon: Banknote,    uploaded: true },
  { label: 'Bank Statement', icon: Building2,   uploaded: false },
]

/* ── Helpers ────────────────────────────────────────────────────────── */

function scoreColor(score: number) {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

function cibilColor(score: number) {
  if (score >= 750) return 'text-emerald-600'
  if (score >= 700) return 'text-amber-600'
  return 'text-red-500'
}

function foirColor(foir: number) {
  if (foir <= 40) return '#10b981'
  if (foir <= 50) return '#f59e0b'
  return '#ef4444'
}

function avatarBg(name: string) {
  return `hsl(${name.charCodeAt(0) * 15 % 360},55%,48%)`
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('')
}

/* ── Sub-components ─────────────────────────────────────────────────── */

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const app = ALL_APPLICATIONS.find(a => a.id === params.id)
  const agentData = APPLICATION_AGENTS[params.id]

  /* Not found */
  if (!app) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4" style={{ background: '#f4f6fb' }}>
        <p className="text-slate-500 text-sm">Application not found.</p>
        <Link
          href="/applications"
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Applications
        </Link>
      </div>
    )
  }

  const statusVariant = STATUS_BADGE[app.status] ?? 'default'
  const statusLabel   = STATUS_LABEL[app.status] ?? app.status
  const aiScore       = app.aiScore ?? 0
  const gaugeColor    = scoreColor(aiScore)

  /* Token/time totals from agents */
  const agents = agentData?.agents ?? []
  const totalTokens = agents.reduce((s, a) => s + (a.tokens ?? 0), 0)
  const totalMs     = agents.reduce((s, a) => s + (a.ms ?? 0), 0)
  const totalSec    = (totalMs / 1000).toFixed(1)

  /* EMI estimate: simple interest-free approximation for display */
  const emiEstimate = Math.round(app.requestedAmount / app.tenure)

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header
        title={`Application — ${app.applicationNumber}`}
        subtitle={`${app.applicant.name} · ${app.loanType} Loan`}
      />

      <div className="flex-1 p-5">
        <div className="grid grid-cols-3 gap-4">

          {/* ── LEFT PANEL ────────────────────────────────────────── */}
          <div className="col-span-2 space-y-4">

            {/* 1. Applicant card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              {/* Header row */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
                  style={{ background: `linear-gradient(135deg, ${avatarBg(app.applicant.name)}, hsl(${app.applicant.name.charCodeAt(0) * 15 % 360},45%,38%))` }}
                >
                  {initials(app.applicant.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">{app.applicant.name}</h2>
                  <p className="font-mono text-xs font-semibold text-indigo-500 mt-0.5">{app.applicationNumber}</p>
                  <div className="mt-1.5">
                    <Badge variant="default">{app.loanType} Loan</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn('text-2xl font-black', cibilColor(app.applicant.creditScore))}>
                    {app.applicant.creditScore}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">CIBIL Score</div>
                </div>
              </div>

              {/* 6-field grid */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <InfoField label="Email"           value={app.applicant.email} />
                <InfoField label="Phone"           value={app.applicant.phone} />
                <InfoField label="PAN"             value={app.applicant.panNumber} />
                <InfoField label="Date of Birth"   value={app.applicant.dateOfBirth} />
                <InfoField label="Employment Type" value={app.applicant.employmentType.replace('_', ' ')} />
                <InfoField label="Monthly Income"  value={formatCurrency(app.applicant.monthlyIncome)} />
              </div>
            </motion.div>

            {/* 2. Loan Details card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Loan Details</h3>
              <div className="flex items-start gap-6 mb-5">
                <div>
                  <div className="text-2xl font-black text-slate-900">{formatCurrency(app.requestedAmount)}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Amount Requested</div>
                </div>
                <div className="pt-1">
                  <div className="text-sm font-bold text-slate-700">{app.tenure} months</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Tenure</div>
                </div>
                <div className="pt-1 flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-700 truncate">{app.purpose}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Purpose</div>
                </div>
              </div>

              {/* FOIR bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FOIR</span>
                  <span className="text-xs font-bold" style={{ color: foirColor(app.foir) }}>{app.foir.toFixed(1)}%</span>
                </div>
                <Progress
                  value={app.foir}
                  indicatorColor={foirColor(app.foir)}
                  className="h-1.5"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  {app.foir <= 40 ? 'Well within limit (cap: 55%)' : app.foir <= 50 ? 'Approaching limit (cap: 55%)' : 'Elevated — near cap (55%)'}
                </p>
              </div>

              {/* EMI estimate */}
              <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. EMI</span>
                <span className="text-sm font-black text-slate-800">{formatCurrency(emiEstimate)}/mo</span>
                <span className="text-[10px] text-slate-400">over {app.tenure} months</span>
              </div>
            </motion.div>

            {/* 3. AI Agent Pipeline card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agent Pipeline</h3>
                {agentData && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">{totalTokens.toLocaleString()} tokens</span>
                    <span className="text-[10px] text-slate-400">{totalSec}s total</span>
                  </div>
                )}
              </div>

              {!agentData ? (
                <div className="flex items-center justify-center py-8 text-slate-400 text-xs">
                  AI pipeline pending
                </div>
              ) : (
                <div className="space-y-4">
                  {agents.map((agent, i) => (
                    <div key={i} className="pb-4 border-b last:border-b-0 last:pb-0" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: agent.color }} />
                          <span className="text-xs font-bold text-slate-700">{agent.name}</span>
                        </div>
                        <Badge variant={AGENT_STATUS_BADGE[agent.status] ?? 'secondary'}>
                          {agent.status}
                        </Badge>
                      </div>

                      {agent.status === 'COMPLETED' && agent.confidence !== null && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-slate-400">Confidence</span>
                            <span className="text-[10px] font-bold text-slate-600">{agent.confidence}%</span>
                          </div>
                          <Progress value={agent.confidence} indicatorColor={agent.color} className="h-1" />
                        </div>
                      )}

                      <p className="text-xs text-slate-500 leading-relaxed mb-2">{agent.summary}</p>

                      {agent.flags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {agent.flags.map((flag, fi) => (
                            <span
                              key={fi}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* 4. Timeline card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Timeline</h3>

              {!agentData?.timeline ? (
                <div className="flex items-center justify-center py-6 text-slate-400 text-xs">No timeline data</div>
              ) : (
                <div className="relative">
                  {/* Vertical line */}
                  <div
                    className="absolute left-[7px] top-2 bottom-2 w-px"
                    style={{ background: 'rgba(0,0,0,0.08)' }}
                  />
                  <div className="space-y-4">
                    {agentData.timeline.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 pl-5 relative">
                        <div
                          className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                          style={{
                            background: TIMELINE_DOT[item.type] ?? '#94a3b8',
                            boxShadow: `0 0 6px ${TIMELINE_DOT[item.type] ?? '#94a3b8'}60`,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-700">{item.event}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                            <span className="text-[10px] text-slate-400">·</span>
                            <span className="text-[10px] text-slate-400">{item.actor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT PANEL ───────────────────────────────────────── */}
          <div className="space-y-4">

            {/* 1. Decision card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Decision</h3>

              {/* AI Score ring */}
              <div className="flex flex-col items-center mb-5">
                <div
                  className="flex items-center justify-center rounded-full p-3 mb-2"
                  style={{ background: `${gaugeColor}12` }}
                >
                  <RingGauge
                    value={aiScore}
                    size={100}
                    strokeWidth={8}
                    color={gaugeColor}
                    trackColor="rgba(0,0,0,0.06)"
                    showValue
                    label="AI Score"
                  />
                </div>
                <div
                  className="text-center text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: gaugeColor }}
                >
                  {app.aiRiskLevel ?? 'N/A'} RISK
                </div>
              </div>

              {/* Status badge */}
              <div className="flex justify-center mb-5">
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 2px 8px rgba(16,185,129,0.35)',
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-amber-600 border border-amber-200 bg-amber-50 transition-all hover:bg-amber-100 active:scale-[0.98]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Request More Info
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-red-500 border border-red-200 bg-red-50 transition-all hover:bg-red-100 active:scale-[0.98]"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject
                </button>
              </div>
            </motion.div>

            {/* 2. Quick Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'AI Score',     value: app.aiScore !== undefined ? String(app.aiScore) : '—', color: gaugeColor },
                  { label: 'FOIR',         value: `${app.foir.toFixed(1)}%`,                             color: foirColor(app.foir) },
                  { label: 'Loan Amount',  value: formatCurrency(app.requestedAmount),                    color: '#6366f1' },
                  { label: 'Tenure',       value: `${app.tenure} mo`,                                    color: '#8b5cf6' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-lg p-3"
                    style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
                  >
                    <div className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Documents card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="bg-white rounded-xl p-5"
              style={CARD_STYLE}
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Documents</h3>
              <div className="space-y-2">
                {DOCS.map(doc => {
                  const Icon = doc.icon
                  return (
                    <div
                      key={doc.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                      style={{ background: doc.uploaded ? '#f0fdf4' : '#fafafa', border: `1px solid ${doc.uploaded ? '#bbf7d0' : 'rgba(0,0,0,0.07)'}` }}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: doc.uploaded ? '#d1fae5' : '#f1f5f9' }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: doc.uploaded ? '#059669' : '#94a3b8' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 flex-1">{doc.label}</span>
                      <span
                        className={cn(
                          'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                          doc.uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                        )}
                      >
                        {doc.uploaded ? 'Uploaded' : 'Pending'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
