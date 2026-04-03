'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { RISK_RULES } from '@/lib/mock-data'
import { ShieldCheck, Zap, XCircle } from 'lucide-react'

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

const CATEGORY_VARIANT: Record<string, 'blue' | 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  Income:     'blue',
  Credit:     'default',
  Collateral: 'success',
  Business:   'warning',
  Compliance: 'destructive',
  Product:    'secondary',
}

function CategoryBadge({ category }: { category: string }) {
  const variant = CATEGORY_VARIANT[category] ?? 'secondary'
  // Product needs purple — override with inline styles since CVA doesn't have purple
  if (category === 'Product') {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe' }}>
        {category}
      </span>
    )
  }
  return <Badge variant={variant}>{category}</Badge>
}

/* Circular ring SVG for portfolio risk score */
function RiskRing({ score }: { score: number }) {
  const r = 32
  const circumference = 2 * Math.PI * r
  const filled = (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-black text-slate-900 leading-none">{score}</span>
        <span className="text-[9px] text-slate-400 mt-0.5">/ 100</span>
      </div>
    </div>
  )
}

const STAT_CARDS = [
  {
    label: 'Active Rules',
    value: '8',
    icon: ShieldCheck,
    color: '#6366f1',
    sub: 'All rules enabled',
  },
  {
    label: 'Rules Triggered Today',
    value: '7',
    icon: Zap,
    color: '#f59e0b',
    sub: 'Across 5 applications',
  },
  {
    label: 'Auto-rejected Today',
    value: '3',
    icon: XCircle,
    color: '#ef4444',
    sub: 'FOIR · NPA · Score',
  },
]

export default function RiskPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Risk Engine" subtitle="8 active rules · 7 triggers today" />

      <div className="flex-1 p-5 space-y-5">
        {/* Stat cards row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="rounded-xl px-4 py-3.5 flex items-center gap-3"
              style={cardStyle}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${card.color}12`, border: `1px solid ${card.color}22` }}
              >
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-base font-black text-slate-900 leading-tight">{card.value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{card.label}</div>
              </div>
            </motion.div>
          ))}

          {/* Portfolio risk score ring card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.21, duration: 0.35 }}
            className="rounded-xl px-4 py-3 flex items-center gap-4"
            style={cardStyle}
          >
            <RiskRing score={87} />
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">Portfolio Risk</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Score</div>
              <div className="mt-1.5">
                <Badge variant="success">Healthy</Badge>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rules table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.35 }}
          className="rounded-xl overflow-hidden"
          style={cardStyle}
        >
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Risk Rules</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Automated underwriting guardrails</p>
            </div>
            <Badge variant="success">{RISK_RULES.filter((r) => r.status === 'ACTIVE').length} Active</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Rule Name', 'Category', 'Threshold Value', 'Triggered Today', 'Status', 'Description'].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {RISK_RULES.map((rule, idx) => (
                  <motion.tr
                    key={rule.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 + idx * 0.05, duration: 0.28 }}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-semibold text-slate-800 whitespace-nowrap text-xs">
                      {rule.name}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <CategoryBadge category={rule.category} />
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-slate-600 whitespace-nowrap">
                      {rule.value}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {rule.triggeredToday > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          {rule.triggeredToday}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">0</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            background: rule.status === 'ACTIVE' ? '#10b981' : '#94a3b8',
                            boxShadow: rule.status === 'ACTIVE' ? '0 0 5px rgba(16,185,129,0.5)' : 'none',
                          }}
                        />
                        <span className={rule.status === 'ACTIVE' ? 'text-emerald-600' : 'text-slate-400'}>
                          {rule.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 max-w-xs">
                      {rule.desc}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
