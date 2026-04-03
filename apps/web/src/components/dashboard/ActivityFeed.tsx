'use client'
import React from 'react'
import { Brain, CheckCircle2, AlertTriangle, FileText, IndianRupee, Clock } from 'lucide-react'

const ACTIVITIES = [
  { id: 1, icon: Brain,         color: '#6366f1', label: 'AI approved',       sub: 'Priya Sharma · ILL-001247',   time: '2m ago'  },
  { id: 2, icon: FileText,      color: '#f59e0b', label: 'New application',   sub: 'Kunal Mehta · ₹32L Home',     time: '8m ago'  },
  { id: 3, icon: IndianRupee,   color: '#10b981', label: 'Disbursed',         sub: 'Meera Krishnan · ₹12L',       time: '15m ago' },
  { id: 4, icon: AlertTriangle, color: '#ef4444', label: 'High-risk flagged', sub: 'Vikram Singh · FOIR 52%',     time: '22m ago' },
  { id: 5, icon: CheckCircle2,  color: '#10b981', label: 'EMI collected',     sub: 'Anjali Patel · ₹23,800',      time: '34m ago' },
  { id: 6, icon: Brain,         color: '#6366f1', label: 'AI processing',     sub: 'Rahul Verma · Business Loan', time: '41m ago' },
  { id: 7, icon: Clock,         color: '#94a3b8', label: 'Doc re-requested',  sub: 'Sunita Rao · Form 16 needed', time: '1h ago'  },
]

export function ActivityFeed() {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col bg-white"
         style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)' }}>
      <div className="px-5 py-4 border-b flex items-center justify-between shrink-0"
           style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div>
          <h3 className="text-sm font-bold text-slate-800">Live Activity</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Real-time pipeline events</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse" />
          Live
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {ACTIVITIES.map((a, i) => {
          const Icon = a.icon
          return (
            <div
              key={a.id}
              className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-default animate-slide-right"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col items-center shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                     style={{ background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                </div>
                {i < ACTIVITIES.length - 1 && <div className="w-px h-4 mt-1 bg-slate-100" />}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-xs font-semibold text-slate-700 leading-tight">{a.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{a.sub}</div>
              </div>
              <span className="text-[10px] text-slate-300 shrink-0 mt-0.5 hover:text-slate-500 transition-colors">{a.time}</span>
            </div>
          )
        })}
      </div>

      <div className="px-4 py-3 border-t shrink-0" style={{ borderColor: 'rgba(0,0,0,0.05)', background: '#f8faff' }}>
        <button className="text-[11px] text-indigo-500 hover:text-indigo-600 font-semibold transition-colors w-full text-center">
          View all events →
        </button>
      </div>
    </div>
  )
}
