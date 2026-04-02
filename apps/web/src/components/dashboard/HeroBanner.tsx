'use client'
import React from 'react'
import { RingGauge } from '@/components/ui/ring-gauge'
import { TrendingUp, IndianRupee, Activity, Shield } from 'lucide-react'

const TICKER_ITEMS = [
  { label: 'CIBIL Avg',    value: '734',      change: '+12',  up: true  },
  { label: 'NPA Rate',     value: '1.7%',     change: '-0.4%', up: true  },
  { label: 'Approval Rate',value: '55.6%',    change: '+3.2%', up: true  },
  { label: 'Avg FOIR',     value: '37.8%',    change: '-1.1%', up: true  },
  { label: 'Avg Ticket',   value: '₹24.8L',   change: '+8.3%', up: true  },
  { label: 'AI Accuracy',  value: '94.2%',    change: '+0.7%', up: true  },
  { label: 'Overdue (30d)',value: '₹72.8K',   change: '+5K',   up: false },
  { label: 'TAT (avg)',    value: '4.2 hrs',  change: '-0.8h', up: true  },
]

const GAUGES = [
  { label: 'Portfolio Health', value: 87, color: '#10b981', sublabel: '/100' },
  { label: 'Collection Rate',  value: 97.8, color: '#6366f1', sublabel: '%' },
  { label: 'AI Confidence',    value: 94, color: '#f59e0b', sublabel: '%' },
]

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl mb-0" style={{
      background: 'linear-gradient(135deg, #0f1729 0%, #0c1320 50%, #0f1729 100%)',
      border: '1px solid rgba(99,102,241,0.15)',
      boxShadow: '0 0 40px rgba(99,102,241,0.08) inset',
    }}>
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Gradient orb */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 right-10 w-60 h-60 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />

      <div className="relative z-10 p-5 flex items-center justify-between gap-6">
        {/* Left: title + date */}
        <div className="shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400/70">
              March 2024
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-[10px] text-slate-500">Mumbai HQ</span>
          </div>
          <h2 className="text-xl font-black text-white leading-tight">
            Portfolio Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ₹7.1 Cr disbursed · 241 active applications · 5 agents running
          </p>
        </div>

        {/* Centre: ring gauges */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {GAUGES.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-2">
              <RingGauge
                value={g.value}
                color={g.color}
                size={72}
                strokeWidth={6}
                label={g.sublabel}
                showValue={true}
              />
              <span className="text-[10px] text-slate-400 font-medium text-center leading-tight">
                {g.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right: quick stats */}
        <div className="hidden md:grid grid-cols-2 gap-3 shrink-0">
          {[
            { icon: IndianRupee, label: 'AUM',         value: '₹142 Cr', color: '#6366f1' },
            { icon: Activity,    label: 'Active Loans', value: '1,284',   color: '#10b981' },
            { icon: TrendingUp,  label: 'MoM Growth',  value: '+24.6%',  color: '#f59e0b' },
            { icon: Shield,      label: 'Risk Score',  value: '87/100',  color: '#3b82f6' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label}
              className="px-4 py-2.5 rounded-lg text-center"
              style={{ background: `${color}0f`, border: `1px solid ${color}20` }}
            >
              <div className="font-bold text-white text-sm">{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-center gap-1">
                <Icon className="w-3 h-3" style={{ color }} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker bar */}
      <div className="border-t border-white/[0.06] px-5 py-2 flex items-center gap-6 overflow-x-auto scrollbar-thin"
           style={{ background: 'rgba(0,0,0,0.2)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 shrink-0">
          Live
        </span>
        <div className="flex items-center gap-6 min-w-0">
          {TICKER_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500">{item.label}</span>
              <span className="text-[11px] font-semibold text-slate-200">{item.value}</span>
              <span className={`text-[10px] font-medium ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
