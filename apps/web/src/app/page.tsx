import React from 'react'
import { Header } from '@/components/layout/Header'
import { KPICard } from '@/components/dashboard/KPICard'
import { ApplicationsTable } from '@/components/dashboard/ApplicationsTable'
import { HeroBanner } from '@/components/dashboard/HeroBanner'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { DisbursementChart, ApplicationsFunnelChart, PortfolioMixChart, NPATrendChart } from '@/components/dashboard/Charts'
import { CHART_DATA, RECENT_APPLICATIONS } from '@/lib/mock-data'
import { IndianRupee, FileText, Brain, AlertTriangle, Clock, CheckCircle2, TrendingUp, Activity } from 'lucide-react'

const KPI_DATA = [
  { title: 'Total Disbursed (Mar)', value: '₹7.1 Cr',   change: 24.6,  changeLabel: 'vs ₹5.7Cr last month',       icon: <IndianRupee className="w-5 h-5" />, accentColor: '#6366f1', sparkline: [42, 51, 48, 62, 57, 71], delay: 0 },
  { title: 'Active Applications',   value: '241',        change: 27.5,  changeLabel: 'vs 189 last month',           icon: <FileText    className="w-5 h-5" />, accentColor: '#f59e0b', sparkline: [142,165,158,203,189,241], delay: 75 },
  { title: 'AI Decisions Today',    value: '38',         change: 8.6,   changeLabel: '4 flagged for manual review', icon: <Brain       className="w-5 h-5" />, accentColor: '#8b5cf6', sparkline: [28, 35, 31, 42, 35, 38], delay: 150 },
  { title: 'NPA Rate',              value: '1.7%',       change: -18.1, changeLabel: 'Down from 2.1% in October',  icon: <AlertTriangle className="w-5 h-5" />, accentColor: '#10b981', sparkline: [21,23,20,19,22,17], delay: 225 },
]

const PIPELINE_STATS = [
  { label: 'Avg. Decision Time', value: '4.2 hrs', icon: Clock,        color: '#6366f1' },
  { label: 'Approval Rate',      value: '55.6%',   icon: CheckCircle2, color: '#10b981' },
  { label: 'Avg Loan Size',      value: '₹24.8L',  icon: TrendingUp,   color: '#f59e0b' },
  { label: 'Collection Rate',    value: '97.8%',   icon: Activity,     color: '#3b82f6' },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Dashboard" subtitle="Mumbai HQ · March 2024" action={{ label: 'New Application', href: '/applications/new' }} />

      <div className="flex-1 p-5 space-y-5">
        <HeroBanner />

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi) => <KPICard key={kpi.title} {...kpi} />)}
        </div>

        {/* Pipeline stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {PIPELINE_STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card-hover rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white"
                 style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <div className="text-base font-black text-slate-900 leading-tight">{value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts + activity */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <div className="xl:col-span-3 space-y-4">
            <DisbursementChart data={CHART_DATA} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ApplicationsFunnelChart />
              <PortfolioMixChart />
            </div>
          </div>
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        <NPATrendChart data={CHART_DATA} />
        <ApplicationsTable applications={RECENT_APPLICATIONS} />
      </div>
    </div>
  )
}
