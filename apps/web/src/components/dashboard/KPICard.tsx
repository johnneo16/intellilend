'use client'
import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const W = 80, H = 32, pad = 2
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2)
    const y = H - pad - ((v - min) / range) * (H - pad * 2)
    return `${x},${y}`
  })
  const pathD = `M ${pts.join(' L ')}`
  const areaD = `M ${pts[0]} L ${pts.join(' L ')} L ${W - pad},${H} L ${pad},${H} Z`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={pts[pts.length - 1].split(',')[0]}
        cy={pts[pts.length - 1].split(',')[1]}
        r="2.5" fill={color}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  )
}

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  accentColor: string
  sparkline?: number[]
  delay?: number
}

export function KPICard({ title, value, change, changeLabel, icon, accentColor, sparkline, delay = 0 }: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div
      className="card-gradient-border glass-card-hover rounded-xl p-5 relative overflow-hidden animate-fade-up bg-white"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle color wash */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06] blur-2xl pointer-events-none"
        style={{ background: accentColor }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div className={cn(
          'chip gap-1',
          isPositive
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            : 'bg-red-50 text-red-500 border border-red-200'
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>

      <div className="mb-1">
        <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</div>
        <div className="text-xs font-medium text-slate-500 mt-1.5">{title}</div>
      </div>
      <div className="text-[10px] text-slate-400 mb-3">{changeLabel}</div>

      {sparkline && (
        <div className="flex justify-end opacity-90">
          <Sparkline data={sparkline} color={accentColor} />
        </div>
      )}
    </div>
  )
}
