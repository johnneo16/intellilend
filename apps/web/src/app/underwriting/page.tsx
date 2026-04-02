'use client'
import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RingGauge } from '@/components/ui/ring-gauge'
import { cn, formatCurrency } from '@/lib/utils'
import {
  Brain, ChevronDown, ChevronUp, TrendingUp, Shield,
  FileText, Activity, ThumbsUp, ThumbsDown, AlertCircle,
  CheckCircle2, Zap, Clock, User,
} from 'lucide-react'

const QUEUE = [
  { id: '1', app: 'ILL-2024-001247', name: 'Priya Sharma',   amount: 4500000, type: 'HOME',      score: 78, risk: 'LOW',    status: 'COMPLETED', foir: 38.2, cibil: 758 },
  { id: '2', app: 'ILL-2024-001246', name: 'Rahul Verma',    amount: 2500000, type: 'BUSINESS',  score: 65, risk: 'MEDIUM', status: 'PROCESSING', foir: 44.1, cibil: 692 },
  { id: '3', app: 'ILL-2024-001245', name: 'Anjali Patel',   amount: 800000,  type: 'PERSONAL',  score: 88, risk: 'LOW',    status: 'APPROVED',   foir: 31.5, cibil: 801 },
  { id: '4', app: 'ILL-2024-001244', name: 'Vikram Singh',   amount: 1800000, type: 'AUTO',      score: 54, risk: 'HIGH',   status: 'FLAGGED',    foir: 52.3, cibil: 634 },
  { id: '5', app: 'ILL-2024-001243', name: 'Meera Krishnan', amount: 1200000, type: 'EDUCATION', score: 91, risk: 'LOW',    status: 'APPROVED',   foir: 29.8, cibil: 775 },
]

const AGENT_PIPELINE = [
  {
    id: 'doc', name: 'Document Intelligence Agent',
    icon: FileText, color: '#6366f1',
    status: 'COMPLETED', confidence: 94,
    summary: 'All 4 KYC documents verified. Income ₹85,000/mo confirmed from ITR and Form 16. PAN–Aadhaar link active. Address matched.',
    flags: [],
    tokens: 1240, ms: 1200,
    details: ['PAN ABCPS1234D — Valid', 'Aadhaar verified', 'Income ₹85K/mo — ITR AY 2023-24', 'Employment: Infosys Ltd. (5 yrs)'],
  },
  {
    id: 'credit', name: 'Credit Decision Agent',
    icon: TrendingUp, color: '#f59e0b',
    status: 'COMPLETED', confidence: 87,
    summary: 'CIBIL 758 — Excellent band. 7-year clean repayment history. 3 active credit cards with 42% utilization (borderline).',
    flags: ['Credit utilization 42% — borderline high (threshold: 40%)'],
    tokens: 2100, ms: 2800,
    details: ['CIBIL Score: 758 (Excellent)', 'Active accounts: 4', 'Total credit limit: ₹8.5L', 'Repayment history: 100%'],
  },
  {
    id: 'risk', name: 'Risk Assessment Agent',
    icon: Shield, color: '#8b5cf6',
    status: 'COMPLETED', confidence: 82,
    summary: 'Low-risk borrower profile. LTV 72% within 75% threshold. Stable salaried income at multinational. Single borrower, no co-applicant.',
    flags: [],
    tokens: 980, ms: 1900,
    details: ['LTV: 72% (Threshold: 75%)', 'FOIR: 38.2% (Threshold: 55%)', 'Property: Registered, clear title', 'Risk band: GREEN'],
  },
  {
    id: 'collections', name: 'Collections Prediction Agent',
    icon: Activity, color: '#10b981',
    status: 'COMPLETED', confidence: 91,
    summary: 'Predicted on-time repayment probability 96.2%. Similar borrower cohort has 2.1% NPA rate — below portfolio average.',
    flags: [],
    tokens: 760, ms: 1100,
    details: ['On-time probability: 96.2%', 'Cohort NPA: 2.1%', 'Predicted EMI stress: Low', 'Collections score: A+'],
  },
]

function AgentCard({ agent, expanded, onToggle }: {
  agent: typeof AGENT_PIPELINE[0]
  expanded: boolean
  onToggle: () => void
}) {
  const Icon = agent.icon

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: expanded
          ? `linear-gradient(135deg, ${agent.color}10 0%, rgba(255,255,255,0.025) 100%)`
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${expanded ? agent.color + '30' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: expanded ? `0 0 20px ${agent.color}10 inset` : 'none',
      }}
    >
      <button className="w-full flex items-center gap-4 p-4 text-left" onClick={onToggle}>
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}35` }}
        >
          <Icon className="w-4 h-4" style={{ color: agent.color }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-slate-200">{agent.name}</span>
            {agent.flags.length > 0 && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' }}
              >
                {agent.flags.length} FLAG
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span>{agent.tokens.toLocaleString()} tokens</span>
            <span>·</span>
            <span>{agent.ms}ms</span>
            <span>·</span>
            <span style={{ color: agent.color }}>{agent.confidence}% confidence</span>
          </div>
        </div>

        {/* Mini gauge + toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <RingGauge value={agent.confidence} size={36} strokeWidth={4} color={agent.color} showValue={false} />
          {expanded
            ? <ChevronUp className="w-4 h-4 text-slate-500" />
            : <ChevronDown className="w-4 h-4 text-slate-500" />
          }
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: `${agent.color}20` }}>
          <div className="pt-3">
            {/* Confidence bar */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-500">Confidence score</span>
              <span className="text-[10px] font-bold" style={{ color: agent.color }}>{agent.confidence}%</span>
            </div>
            <Progress value={agent.confidence} indicatorColor={agent.color} className="h-1.5 mb-3" />

            {/* Summary */}
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{agent.summary}</p>

            {/* Detail chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {agent.details.map((d) => (
                <span
                  key={d}
                  className="text-[10px] px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Flags */}
            {agent.flags.map((flag) => (
              <div
                key={flag}
                className="flex items-start gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-amber-300">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function UnderwritingPage() {
  const [selected, setSelected] = useState(QUEUE[0])
  const [expanded, setExpanded] = useState<string | null>('doc')

  const riskColor: Record<string, string> = {
    LOW: '#10b981', MEDIUM: '#f59e0b', HIGH: '#ef4444',
  }
  const statusVariant: Record<string, any> = {
    APPROVED: 'success', FLAGGED: 'destructive', PROCESSING: 'blue', COMPLETED: 'secondary',
  }

  const totalTokens = AGENT_PIPELINE.reduce((s, a) => s + a.tokens, 0)
  const totalMs     = AGENT_PIPELINE.reduce((s, a) => s + a.ms, 0)

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080b14' }}>
      <Header title="AI Underwriting" subtitle={`${QUEUE.length} in queue · 2 agents active`} />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Queue sidebar ── */}
        <div
          className="w-64 shrink-0 flex flex-col overflow-hidden"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}
        >
          <div className="px-3 py-3 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Queue ({QUEUE.length})</span>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1.5">
            {QUEUE.map((item) => {
              const isActive = selected.id === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="w-full text-left p-3 rounded-xl transition-all"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%)'
                      : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isActive ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-[10px] font-mono" style={{ color: '#818cf8' }}>{item.app.slice(-6)}</span>
                    <Badge variant={statusVariant[item.status]} className="text-[9px] px-1.5 py-0 h-4">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white shrink-0"
                      style={{ background: `hsl(${item.name.charCodeAt(0) * 15 % 360},55%,42%)` }}
                    >
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{formatCurrency(item.amount)}</span>
                    <div className="flex items-center gap-1">
                      <span
                        className="text-[11px] font-black"
                        style={{ color: riskColor[item.risk] }}
                      >
                        {item.score}
                      </span>
                      <span className="text-[9px] text-slate-600">/100</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Detail panel ── */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">

          {/* Application header card */}
          <div
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.06] blur-2xl pointer-events-none"
              style={{ background: `radial-gradient(circle, ${riskColor[selected.risk]}, transparent)` }}
            />

            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs" style={{ color: '#818cf8' }}>{selected.app}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${riskColor[selected.risk]}18`,
                      color: riskColor[selected.risk],
                      border: `1px solid ${riskColor[selected.risk]}35`,
                    }}
                  >
                    {selected.risk} RISK
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">{selected.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selected.type} Loan · {formatCurrency(selected.amount)} · {selected.cibil} CIBIL
                </p>
              </div>

              {/* AI Score ring */}
              <div className="shrink-0">
                <RingGauge
                  value={selected.score}
                  size={80}
                  strokeWidth={7}
                  color={riskColor[selected.risk]}
                  label="AI Score"
                  showValue={true}
                />
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'FOIR',        value: `${selected.foir}%`, ok: selected.foir < 50, raw: selected.foir / 55 * 100, color: selected.foir > 50 ? '#ef4444' : '#10b981' },
                { label: 'CIBIL Score', value: String(selected.cibil), ok: selected.cibil > 700, raw: (selected.cibil - 300) / 600 * 100, color: selected.cibil > 750 ? '#10b981' : selected.cibil > 650 ? '#f59e0b' : '#ef4444' },
                { label: 'LTV',         value: '72%', ok: true, raw: 72, color: '#10b981' },
                { label: 'Income',      value: '₹85K/mo', ok: true, raw: 75, color: '#6366f1' },
              ].map(({ label, value, raw, color }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="text-sm font-black text-white mb-1">{value}</div>
                  <Progress value={raw} indicatorColor={color} className="h-0.5 mb-1.5" />
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent pipeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" style={{ color: '#818cf8' }} />
                <span className="text-sm font-bold text-white">Agent Pipeline</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  4/4 Complete
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {totalTokens.toLocaleString()} tokens
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {(totalMs / 1000).toFixed(1)}s total
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {AGENT_PIPELINE.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  expanded={expanded === agent.id}
                  onToggle={() => setExpanded(expanded === agent.id ? null : agent.id)}
                />
              ))}
            </div>
          </div>

          {/* Decision panel */}
          <div
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(99,102,241,0.15)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-bold text-white">Underwriter Decision</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  AI recommends <span className="text-emerald-400 font-semibold">APPROVE</span> · Confirm or override below
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <User className="w-3.5 h-3.5" />
                Awaiting Rahul Mehta
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { label: 'Approve',          icon: ThumbsUp,   bg: 'linear-gradient(135deg, #059669, #10b981)', shadow: 'rgba(16,185,129,0.3)' },
                { label: 'Request Info',     icon: AlertCircle, bg: 'linear-gradient(135deg, #b45309, #f59e0b)', shadow: 'rgba(245,158,11,0.3)' },
                { label: 'Reject',           icon: ThumbsDown, bg: 'linear-gradient(135deg, #b91c1c, #ef4444)', shadow: 'rgba(239,68,68,0.3)' },
              ].map(({ label, icon: Icon, bg, shadow }) => (
                <button
                  key={label}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: bg, boxShadow: `0 4px 16px ${shadow}` }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
