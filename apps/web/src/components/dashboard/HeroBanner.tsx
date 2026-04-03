'use client'
import React from 'react'
import { RingGauge } from '@/components/ui/ring-gauge'
import { TrendingUp, IndianRupee, Activity, Shield } from 'lucide-react'

const TICKER_ITEMS = [
  { label: 'CIBIL Avg',    value: '734',     change: '+12',   up: true  },
  { label: 'NPA Rate',     value: '1.7%',    change: '-0.4%', up: true  },
  { label: 'Approval Rate',value: '55.6%',   change: '+3.2%', up: true  },
  { label: 'Avg FOIR',     value: '37.8%',   change: '-1.1%', up: true  },
  { label: 'Avg Ticket',   value: '₹24.8L',  change: '+8.3%', up: true  },
  { label: 'AI Accuracy',  value: '94.2%',   change: '+0.7%', up: true  },
  { label: 'Overdue (30d)',value: '₹72.8K',  change: '+5K',   up: false },
  { label: 'TAT (avg)',    value: '4.2 hrs', change: '-0.8h', up: true  },
]

const GAUGES = [
  { label: 'Portfolio Health', value: 87,   color: '#10b981' },
  { label: 'Collection Rate',  value: 97.8, color: '#6366f1' },
  { label: 'AI Confidence',    value: 94,   color: '#f59e0b' },
]

export function HeroBanner() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #1e2540 0%, #2d3561 50%, #1e2540 100%)',
        boxShadow: '0 4px 24px rgba(30,37,64,0.2)',
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
      <div className="absolute -bottom-16 right-20 w-56 h-56 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />

      <div className="relative z-10 p-5 flex items-center justify-between gap-6">
        {/* Left */}
        <div className="shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300/70">March 2024</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] text-white/40">Mumbai HQ</span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">Portfolio Overview</h2>
          <p className="text-xs text-white/50 mt-1">₹7.1 Cr disbursed · 241 active applications · 5 agents running</p>
        </div>

        {/* Ring gauges */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {GAUGES.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-2">
              <RingGauge value={g.value} color={g.color} size={72} strokeWidth={6} showValue trackColor="rgba(255,255,255,0.08)" />
              <span className="text-[10px] text-white/50 font-medium text-center">{g.label}</span>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="hidden md:grid grid-cols-2 gap-2.5 shrink-0">
          {[
            { icon: IndianRupee, label: 'AUM',          value: '₹142 Cr', color: '#818cf8' },
            { icon: Activity,    label: 'Active Loans', value: '1,284',   color: '#34d399' },
            { icon: TrendingUp,  label: 'MoM Growth',   value: '+24.6%',  color: '#fbbf24' },
            { icon: Shield,      label: 'Risk Score',   value: '87/100',  color: '#60a5fa' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="px-3.5 py-2.5 rounded-xl text-center"
              style={{ background: `${color}12`, border: `1px solid ${color}25` }}
            >
              <div className="font-bold text-white text-sm">{value}</div>
              <div className="text-[10px] mt-0.5 flex items-center justify-center gap-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Icon className="w-3 h-3" style={{ color }} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div
        className="border-t px-5 py-2.5 flex items-center gap-6 overflow-x-auto scrollbar-thin"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>Live</span>
        {TICKER_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2 shrink-0">
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</span>
            <span className="text-[11px] font-semibold text-white/80">{item.value}</span>
            <span className={`text-[10px] font-semibold ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>{item.change}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
