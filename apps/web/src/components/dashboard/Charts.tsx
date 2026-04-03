'use client'
import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from 'recharts'
import type { ChartDataPoint } from '@/types'
import { PORTFOLIO_MIX, FUNNEL_DATA } from '@/lib/mock-data'

const CARD = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: 10,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    }}>
      <div className="text-xs font-bold text-slate-700 mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[11px] mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-slate-500 capitalize">{p.name || p.dataKey}:</span>
          <span className="text-slate-800 font-bold">
            {typeof p.value === 'number' && p.value > 1000
              ? `₹${(p.value / 100000).toFixed(1)}L`
              : `${p.value}${p.dataKey === 'npa' ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DisbursementChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="rounded-xl p-5" style={CARD}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Disbursements vs Collections</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">6-month trend · ₹ in Lakhs</p>
        </div>
        <div className="flex items-center gap-5 text-[11px]">
          {[{ color: '#6366f1', label: 'Disbursed' }, { color: '#10b981', label: 'Collected' }].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-500">
              <span className="w-3 h-0.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            {[{ id: 'grad-d', color: '#6366f1' }, { id: 'grad-c', color: '#10b981' }].map(({ id, color }) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={color} stopOpacity={0.15} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/100000}L`} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.05)', strokeWidth: 1 }} />
          <Area type="monotone" dataKey="disbursements" name="Disbursed" stroke="#6366f1" strokeWidth={2} fill="url(#grad-d)" />
          <Area type="monotone" dataKey="collections"   name="Collected" stroke="#10b981" strokeWidth={2} fill="url(#grad-c)"  />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ApplicationsFunnelChart() {
  return (
    <div className="rounded-xl p-5" style={CARD}>
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Conversion Funnel</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">March 2024 · applications → disbursals</p>
      </div>
      <div className="space-y-3">
        {FUNNEL_DATA.map((item, i) => (
          <div key={item.stage}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-slate-600">{item.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-800">{item.count}</span>
                <span className="text-[10px] font-semibold w-8 text-right" style={{ color: item.color }}>{item.pct}%</span>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.pct}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                  transition: `width 1s cubic-bezier(.4,0,.2,1) ${i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PortfolioMixChart() {
  return (
    <div className="rounded-xl p-5" style={CARD}>
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Portfolio Mix</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">By loan type · ₹142Cr AUM</p>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={110} height={110}>
          <PieChart>
            <Pie data={PORTFOLIO_MIX} cx="50%" cy="50%" innerRadius={32} outerRadius={50} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {PORTFOLIO_MIX.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {PORTFOLIO_MIX.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-[11px] text-slate-500">{item.name}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-700">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NPATrendChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="rounded-xl p-5" style={CARD}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">NPA Trend</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">% of total portfolio</p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          ↓ 0.4% MoM
        </span>
      </div>
      <ResponsiveContainer width="100%" height={90}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -32, bottom: 0 }} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 4]} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Bar dataKey="npa" name="NPA Rate" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.npa > 2.2 ? '#ef4444' : entry.npa > 2.0 ? '#f59e0b' : '#10b981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
