'use client'
import React from 'react'
import { Brain, CheckCircle2, AlertTriangle, FileText, IndianRupee, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const ACTIVITIES = [
  { id: 1, icon: Brain,         color: '#818cf8', label: 'AI approved',       sub: 'Priya Sharma · ILL-001247',  time: '2m ago',  type: 'approve' },
  { id: 2, icon: FileText,      color: '#f59e0b', label: 'New application',   sub: 'Kunal Mehta · ₹32L Home',    time: '8m ago',  type: 'new' },
  { id: 3, icon: IndianRupee,   color: '#10b981', label: 'Disbursed',         sub: 'Meera Krishnan · ₹12L',      time: '15m ago', type: 'disburse' },
  { id: 4, icon: AlertTriangle, color: '#ef4444', label: 'High-risk flagged', sub: 'Vikram Singh · FOIR 52%',    time: '22m ago', type: 'flag' },
  { id: 5, icon: CheckCircle2,  color: '#10b981', label: 'EMI collected',     sub: 'Anjali Patel · ₹23,800',     time: '34m ago', type: 'collect' },
  { id: 6, icon: Brain,         color: '#818cf8', label: 'AI processing',     sub: 'Rahul Verma · Business Loan', time: '41m ago', type: 'process' },
  { id: 7, icon: Clock,         color: '#64748b', label: 'Doc re-requested',  sub: 'Sunita Rao · Form 16 needed', time: '1h ago',  type: 'pending' },
]

export function ActivityFeed() {
  return (
    <div className="card-gradient-border rounded-xl flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)' }}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Live Activity</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Real-time pipeline events</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
          Live
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {ACTIVITIES.map((a, i) => {
          const Icon = a.icon
          return (
            <div
              key={a.id}
              className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition-colors group cursor-default animate-slide-right"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center shrink-0 mt-0.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${a.color}18`, border: `1px solid ${a.color}30` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                </div>
                {i < ACTIVITIES.length - 1 && (
                  <div className="w-px h-4 mt-1 bg-white/[0.05]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-xs font-medium text-slate-200 leading-tight">{a.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">{a.sub}</div>
              </div>

              {/* Time */}
              <span className="text-[10px] text-slate-600 shrink-0 mt-0.5 group-hover:text-slate-400 transition-colors">
                {a.time}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.05] shrink-0">
        <button className="text-[11px] text-brand-400 hover:text-brand-300 font-medium transition-colors w-full text-center">
          View all events →
        </button>
      </div>
    </div>
  )
}
