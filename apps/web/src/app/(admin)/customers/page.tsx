'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { CUSTOMERS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Users, IndianRupee, TrendingDown, AlertTriangle } from 'lucide-react'

type FilterType = 'ALL' | 'ACTIVE' | 'OVERDUE' | 'PROSPECT'

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Overdue', value: 'OVERDUE' },
  { label: 'Prospect', value: 'PROSPECT' },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function avatarColor(name: string) {
  const palette = ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

function CreditBadge({ score }: { score: number }) {
  if (score >= 750) return <Badge variant="success">{score}</Badge>
  if (score >= 700) return <Badge variant="warning">{score}</Badge>
  return <Badge variant="destructive">{score}</Badge>
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, 'success' | 'destructive' | 'secondary' | 'blue'> = {
    ACTIVE: 'success',
    OVERDUE: 'destructive',
    INACTIVE: 'secondary',
    PROSPECT: 'blue',
  }
  return <Badge variant={map[status] ?? 'secondary'}>{status}</Badge>
}

function RiskBadge({ tag }: { tag: string }) {
  const map: Record<string, 'success' | 'warning' | 'destructive'> = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'destructive',
  }
  return <Badge variant={map[tag] ?? 'secondary'}>{tag}</Badge>
}

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

export default function CustomersPage() {
  const [filter, setFilter] = useState<FilterType>('ALL')

  const filtered = filter === 'ALL' ? CUSTOMERS : CUSTOMERS.filter((c) => c.status === filter)

  const totalOutstanding = CUSTOMERS.reduce((s, c) => s + c.outstanding, 0)
  const avgCreditScore = Math.round(CUSTOMERS.reduce((s, c) => s + c.creditScore, 0) / CUSTOMERS.length)
  const overdueCount = CUSTOMERS.filter((c) => c.status === 'OVERDUE').length

  const summaryCards = [
    { label: 'Total Customers', value: String(CUSTOMERS.length), icon: Users, color: '#6366f1' },
    { label: 'Total Outstanding', value: `₹${(totalOutstanding / 10000000).toFixed(1)}Cr`, icon: IndianRupee, color: '#10b981' },
    { label: 'Avg Credit Score', value: String(avgCreditScore), icon: TrendingDown, color: '#f59e0b' },
    { label: 'Overdue Accounts', value: String(overdueCount), icon: AlertTriangle, color: '#ef4444' },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Customers" subtitle="12 borrowers · ₹19.4Cr portfolio" />

      <div className="flex-1 p-5 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {summaryCards.map((card, i) => (
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
        </div>

        {/* Filters + table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.35 }}
          className="rounded-xl overflow-hidden"
          style={cardStyle}
        >
          {/* Filter chips */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  filter === f.value
                    ? { background: '#6366f1', color: '#fff', boxShadow: '0 2px 6px rgba(99,102,241,0.3)' }
                    : { background: '#f4f6fb', color: '#64748b', border: '1px solid rgba(0,0,0,0.07)' }
                }
              >
                {f.label}
                {f.value !== 'ALL' && (
                  <span className="ml-1.5 opacity-70">
                    {CUSTOMERS.filter((c) => c.status === f.value).length}
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-400">{filtered.length} customers</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Customer', 'Email', 'Phone', 'Credit Score', 'Loans', 'Outstanding', 'Status', 'Risk'].map(
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
                {filtered.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 + idx * 0.04, duration: 0.28 }}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Avatar + Name */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                          style={{ background: avatarColor(customer.name) }}
                        >
                          {getInitials(customer.name)}
                        </div>
                        <span className="font-medium text-slate-800 text-xs">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">{customer.email}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">{customer.phone}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <CreditBadge score={customer.creditScore} />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 font-medium whitespace-nowrap">
                      {customer.totalLoans}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 font-semibold whitespace-nowrap">
                      {customer.outstanding > 0 ? formatCurrency(customer.outstanding) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <RiskBadge tag={customer.riskTag} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-400">No customers match this filter.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
