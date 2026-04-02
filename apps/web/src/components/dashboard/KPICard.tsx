'use client'
import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const areaD = `M ${pts[0]} L ${pts.join(' L ')} L ${80 - pad},${H} L ${pad},${H} Z`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* last point dot */}
      <circle
        cx={pts[pts.length - 1].split(',')[0]}
        cy={pts[pts.length - 1].split(',')[1]}
        r="2.5" fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  )
}

export function KPICard({ title, value, change, changeLabel, icon, accentColor, sparkline, delay = 0 }: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div
      className="card-gradient-border glass-card-hover rounded-xl p-5 relative overflow-hidden animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-[0.08] blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-5 right-5 h-px opacity-30"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}35`,
            boxShadow: `0 0 12px ${accentColor}20`,
          }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>

        {/* Change badge */}
        <div className={cn(
          'chip gap-1',
          isPositive
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
            : 'bg-red-500/15 text-red-400 border border-red-500/20'
        )}>
          {isPositive
            ? <TrendingUp className="w-3 h-3" />
            : <TrendingDown className="w-3 h-3" />
          }
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <div className="text-2xl font-black text-white tracking-tight leading-none">
          {value}
        </div>
        <div className="text-xs font-medium text-slate-400 mt-1.5">{title}</div>
      </div>

      <div className="text-[10px] text-slate-600 mb-3">{changeLabel}</div>

      {/* Sparkline */}
      {sparkline && (
        <div className="flex justify-end opacity-80">
          <Sparkline data={sparkline} color={accentColor} />
        </div>
      )}
    </div>
  )
}
