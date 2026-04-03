import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { KPICard } from '@/components/dashboard/KPICard'
import { ApplicationsTable } from '@/components/dashboard/ApplicationsTable'
import { HeroBanner } from '@/components/dashboard/HeroBanner'
import { DisbursementChart } from '@/components/dashboard/Charts'
import { CHART_DATA, ALL_APPLICATIONS, ACTIVITY_FEED } from '@/lib/mock-data'
import {
  IndianRupee, FileText, Brain, TrendingDown,
  Clock, CheckCircle2, Zap, BarChart2,
} from 'lucide-react'

/* ── KPI data ─────────────────────────────────────────────────── */
const KPI_DATA = [
  {
    title: 'Total Disbursed (Mar)', value: '₹7.1 Cr',  change: 24.6,  changeLabel: 'vs ₹5.7Cr last month',
    icon: <IndianRupee className="w-5 h-5" />, accentColor: '#6366f1',
    sparkline: [42, 51, 48, 62, 57, 71], delay: 0,
  },
  {
    title: 'Active Applications',   value: '241',       change: 27.5,  changeLabel: 'vs 189 last month',
    icon: <FileText    className="w-5 h-5" />, accentColor: '#f59e0b',
    sparkline: [142, 165, 158, 203, 189, 241], delay: 75,
  },
  {
    title: 'AI Decisions Today',    value: '38',        change: 8.6,   changeLabel: '4 flagged for manual review',
    icon: <Brain       className="w-5 h-5" />, accentColor: '#8b5cf6',
    sparkline: [28, 35, 31, 42, 35, 38], delay: 150,
  },
  {
    title: 'NPA Rate',              value: '1.7%',      change: -18.1, changeLabel: 'Down from 2.1% in October',
    icon: <TrendingDown className="w-5 h-5" />, accentColor: '#10b981',
    sparkline: [21, 23, 20, 19, 22, 17], delay: 225,
  },
]

/* ── AI Performance metrics ───────────────────────────────────── */
const AI_METRICS = [
  { label: 'Avg Decision Time', value: '4.2 hrs',  icon: Clock,         color: '#6366f1' },
  { label: 'Approval Rate',     value: '55.6%',    icon: CheckCircle2,  color: '#10b981' },
  { label: 'Avg AI Score',      value: '76 / 100', icon: Brain,         color: '#8b5cf6' },
  { label: 'Token Cost / App',  value: '₹2.4',     icon: Zap,           color: '#f59e0b' },
]

const AI_AGENT_BARS = [
  { name: 'Document Intelligence', pct: 94, color: '#6366f1' },
  { name: 'Credit',                pct: 87, color: '#f59e0b' },
  { name: 'Risk',                  pct: 81, color: '#8b5cf6' },
  { name: 'Collections',           pct: 79, color: '#10b981' },
]

/* ── Activity feed type config ────────────────────────────────── */
const FEED_TYPE: Record<string, { border: string; icon: string }> = {
  approval:    { border: '#10b981', icon: '✓' },
  ai:          { border: '#6366f1', icon: '◈' },
  disbursement:{ border: '#3b82f6', icon: '↑' },
  alert:       { border: '#ef4444', icon: '!' },
  application: { border: '#f59e0b', icon: '+' },
  rejection:   { border: '#ef4444', icon: '✕' },
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Dashboard" subtitle="Mumbai HQ · March 2024" />

      <div className="flex-1 p-5 space-y-5">

        {/* ── Section 1: KPI cards ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi) => <KPICard key={kpi.title} {...kpi} />)}
        </div>

        {/* ── Section 2: Hero banner ────────────────────────────── */}
        <HeroBanner />

        {/* ── Section 3: Disbursement chart + AI Performance ───── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Disbursement chart — 2 cols */}
          <div className="xl:col-span-2">
            <DisbursementChart data={CHART_DATA} />
          </div>

          {/* AI Performance card — 1 col */}
          <div
            className="rounded-2xl p-5 bg-white flex flex-col gap-4"
            style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)' }}
          >
            {/* Card header */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', boxShadow: '0 0 12px rgba(99,102,241,0.25)' }}
              >
                <BarChart2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800 leading-tight">AI Performance</div>
                <div className="text-[10px] text-slate-400">This month · all agents</div>
              </div>
            </div>

            {/* 2×2 metric grid */}
            <div className="grid grid-cols-2 gap-3">
              {AI_METRICS.map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 flex flex-col gap-1.5"
                  style={{ background: `${color}08`, border: `1px solid ${color}18` }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <div className="text-base font-black text-slate-900 leading-tight">{value}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Agent success rate bars */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agent Success Rate</div>
              {AI_AGENT_BARS.map(({ name, pct, color }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-slate-600 font-medium">{name}</span>
                    <span className="text-[11px] font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 4: Applications table + Activity feed ─────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Applications table — 1 col */}
          <div className="xl:col-span-1">
            <ApplicationsTable applications={ALL_APPLICATIONS.slice(0, 4)} />
          </div>

          {/* Activity feed — 2 cols */}
          <div
            className="xl:col-span-2 rounded-2xl bg-white flex flex-col"
            style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)' }}
          >
            {/* Feed header */}
            <div
              className="flex items-center gap-2.5 px-5 py-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#f8faff', borderRadius: '1rem 1rem 0 0' }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Live Activity</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">Real-time pipeline events</p>
              </div>
              <Link
                href="/notifications"
                className="ml-auto text-xs text-indigo-500 hover:text-indigo-600 font-semibold transition-colors"
              >
                View all →
              </Link>
            </div>

            {/* Feed items */}
            <div className="flex-1 divide-y" style={{ divideColor: 'rgba(0,0,0,0.04)' }}>
              {ACTIVITY_FEED.slice(0, 6).map((item) => {
                const cfg = FEED_TYPE[item.type] ?? { border: '#94a3b8', icon: '·' }
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
                    style={{ borderLeft: `3px solid ${cfg.border}` }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 mt-0.5"
                      style={{ background: cfg.border, boxShadow: `0 0 8px ${cfg.border}55` }}
                    >
                      {cfg.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-700 leading-snug truncate">
                        {item.text}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.sub}</div>
                    </div>

                    {/* Time */}
                    <div className="text-[10px] text-slate-400 shrink-0 pt-0.5 whitespace-nowrap">
                      {item.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
