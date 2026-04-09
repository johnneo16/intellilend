'use client'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { DisbursementChart } from '@/components/dashboard/Charts'
import { PortfolioDonut } from '@/components/dashboard/PortfolioDonut'
import { ALL_APPLICATIONS, ACTIVITY_FEED, CHART_DATA, PORTFOLIO_MIX } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { TrendingDown, TrendingUp, CheckCircle2, Zap, BarChart2 } from 'lucide-react'

function Sparkline(props: { data: number[]; color: string; width?: number; height?: number }) {
  const w = props.width ?? 60
  const h = props.height ?? 28
  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  const range = max - min || 1
  const step = w / (props.data.length - 1)
  const pts = props.data.map((v, i) => (i * step) + ',' + (h - ((v - min) / range) * (h - 4) - 2))
  const area = ['0,' + h, ...pts, w + ',' + h].join(' ')
  const [lx, ly] = pts[pts.length - 1].split(',')
  return (
    <svg width={w} height={h} viewBox={'0 0 ' + w + ' ' + h} fill="none">
      <polygon points={area} fill={props.color} fillOpacity={0.15} />
      <polyline points={pts.join(' ')} stroke={props.color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={2} fill={props.color} />
    </svg>
  )
}

function StatusBadge(props: { status: string }) {
  const MAP: Record<string, { bg: string; text: string; label: string }> = {
    APPROVED:      { bg: '#dcfce7', text: '#16a34a', label: 'Approved' },
    DISBURSED:     { bg: '#dbeafe', text: '#1d4ed8', label: 'Disbursed' },
    UNDER_REVIEW:  { bg: '#fef9c3', text: '#ca8a04', label: 'Review' },
    AI_PROCESSING: { bg: '#ede9fe', text: '#7c3aed', label: 'AI' },
    SUBMITTED:     { bg: '#f1f5f9', text: '#475569', label: 'Submitted' },
    REJECTED:      { bg: '#fee2e2', text: '#dc2626', label: 'Rejected' },
  }
  const cfg = MAP[props.status] ?? { bg: '#f1f5f9', text: '#64748b', label: props.status }
  return (
    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: cfg.bg, color: cfg.text }}>
      {cfg.label}
    </span>
  )
}

function Avatar(props: { name: string; color: string }) {
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ background: props.color }}>
      {props.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
    </div>
  )
}

const KPI_DATA = [
  { label: 'Total Disbursed',    value: '\u20b97.1 Cr', change: 24.6, positive: true, subtext: 'vs \u20b95.7Cr last month', accentColor: '#6366f1', sparkData: [42, 51, 48, 62, 57, 71] },
  { label: 'Active Applications', value: '241',          change: 27.5, positive: true, subtext: 'vs 189 last month',        accentColor: '#f59e0b', sparkData: [142, 165, 158, 203, 189, 241] },
  { label: 'AI Decisions Today',  value: '38',            change: 8.6,  positive: true, subtext: '4 flagged for review',     accentColor: '#8b5cf6', sparkData: [28, 35, 31, 42, 35, 38] },
  { label: 'NPA Rate',            value: '1.7%',          change: 18.1, positive: true, subtext: 'Down from 2.1% in Oct',   accentColor: '#10b981', sparkData: [21, 23, 20, 19, 22, 17] },
]

const AI_AGENTS = [
  { name: 'Document Intel', pct: 94, color: '#6366f1' },
  { name: 'Credit',         pct: 87, color: '#f59e0b' },
  { name: 'Risk',           pct: 81, color: '#8b5cf6' },
  { name: 'Collections',    pct: 79, color: '#10b981' },
]

const PORTFOLIO_STATS = [
  { label: 'AUM',           value: '\u20b9142 Cr', color: '#6366f1' },
  { label: 'Avg CIBIL',     value: '734',           color: '#8b5cf6' },
  { label: 'Approval Rate', value: '55.6%',          color: '#10b981' },
  { label: 'Avg Ticket',    value: '\u20b924.8L',   color: '#f59e0b' },
]

const FEED_CONFIG: Record<string, { border: string; icon: string }> = {
  approval:     { border: '#10b981', icon: 'v' },
  ai:           { border: '#6366f1', icon: '*' },
  disbursement: { border: '#3b82f6', icon: '^' },
  alert:        { border: '#ef4444', icon: '!' },
  application:  { border: '#f59e0b', icon: '+' },
  rejection:    { border: '#ef4444', icon: 'x' },
}

const AVATAR_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#8b5cf6', '#3b82f6']

const CARD: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
  borderRadius: '0.875rem',
}

export default function DashboardPage() {
  const recentApps = ALL_APPLICATIONS.slice(0, 5)
  const feedItems  = ACTIVITY_FEED.slice(0, 5)

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: 'var(--bg-primary)' }}>
      <Header title="Dashboard" subtitle="Mumbai HQ - March 2024" />

      <div className="flex-1 p-5 space-y-4">

        {/* Row 1: 4 KPI tiles */}
        <div className="grid grid-cols-4 gap-4">
          {KPI_DATA.map((kpi) => (
            <div key={kpi.label} className="p-4 flex items-start gap-3" style={{ ...CARD, borderLeft: '3px solid ' + kpi.accentColor }}>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold leading-tight truncate" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
                <div className="text-2xl font-black leading-tight mt-0.5 tracking-tight" style={{ color: 'var(--text-primary)' }}>{kpi.value}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: kpi.positive ? '#dcfce7' : '#fee2e2', color: kpi.positive ? '#16a34a' : '#dc2626' }}>
                    {kpi.positive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {kpi.change}%
                  </span>
                  <span className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{kpi.subtext}</span>
                </div>
              </div>
              <div className="shrink-0 mt-1">
                <Sparkline data={kpi.sparkData} color={kpi.accentColor} width={60} height={28} />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Chart + Portfolio */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <DisbursementChart data={CHART_DATA} />
          </div>

          <div className="p-4 flex flex-col gap-3" style={CARD}>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Portfolio Snapshot</div>
            <div className="grid grid-cols-2 gap-2">
              {PORTFOLIO_STATS.map(({ label, value, color }) => (
                <div key={label} className="rounded-lg p-2.5" style={{ background: color + '18', border: '1px solid ' + color + '30' }}>
                  <div className="text-base font-black leading-tight" style={{ color: 'var(--text-primary)' }}>{value}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Loan Mix</div>
              <div className="flex items-center gap-3">
                <PortfolioDonut />
                <div className="flex-1 space-y-1">
                  {PORTFOLIO_MIX.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                        <span className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>
                          {item.name.replace(' Loans', '').replace('Education', 'Edu')}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Recent apps + AI performance + Activity feed */}
        <div className="grid grid-cols-3 gap-4">

          {/* Recent Applications */}
          <div className="p-4 flex flex-col gap-3" style={CARD}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Recent Applications</div>
              <Link href="/applications" className="text-[10px] text-indigo-500 hover:text-indigo-400 font-semibold transition-colors">View all</Link>
            </div>
            <div className="space-y-1">
              {recentApps.map((app, i) => (
                <Link key={app.id} href={'/applications/' + app.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg transition-colors group"
                  style={{ background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Avatar name={app.applicant.name} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold leading-tight truncate group-hover:text-indigo-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {app.applicant.name}
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {formatCurrency(app.requestedAmount)} - {app.loanType}
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </Link>
              ))}
            </div>
          </div>

          {/* AI Agent Performance */}
          <div className="p-4 flex flex-col gap-3" style={CARD}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <BarChart2 className="w-3 h-3 text-white" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>AI Agent Performance</div>
            </div>
            <div className="space-y-2.5">
              {AI_AGENTS.map(({ name, pct, color }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{name}</span>
                    <span className="text-[11px] font-black" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                    <div className="h-full rounded-full" style={{ width: pct + '%', background: color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-auto pt-1">
              <div className="flex-1 rounded-lg p-2.5 flex flex-col gap-0.5" style={{ background: '#6366f120', border: '1px solid #6366f130' }}>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" style={{ color: '#818cf8' }} />
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Avg Decision</span>
                </div>
                <div className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>4.2 hrs</div>
              </div>
              <div className="flex-1 rounded-lg p-2.5 flex flex-col gap-0.5" style={{ background: '#10b98120', border: '1px solid #10b98130' }}>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" style={{ color: '#34d399' }} />
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Token Cost</span>
                </div>
                <div className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{'\u20b9'}2.4</div>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="flex flex-col overflow-hidden" style={CARD}>
            <div className="flex items-center gap-2 px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', borderRadius: '0.875rem 0.875rem 0 0' }}>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Live Activity</div>
              <Link href="/notifications" className="ml-auto text-[10px] text-indigo-500 hover:text-indigo-400 font-semibold transition-colors">View all</Link>
            </div>
            <div className="flex-1">
              {feedItems.map((item) => {
                const cfg = FEED_CONFIG[item.type] ?? { border: '#94a3b8', icon: '.' }
                return (
                  <div key={item.id} className="flex items-start gap-2.5 px-4 py-2.5 transition-colors"
                    style={{ borderLeft: '3px solid ' + cfg.border, borderBottom: '1px solid var(--border-subtle)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5"
                      style={{ background: cfg.border }}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold leading-snug truncate" style={{ color: 'var(--text-primary)' }}>{item.text}</div>
                      <div className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{item.sub}</div>
                    </div>
                    <div className="text-[10px] shrink-0 pt-0.5 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{item.time}</div>
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
