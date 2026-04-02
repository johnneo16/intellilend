'use client'
import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import type { LoanApplication } from '@/types'
import { Brain, Eye, MoreHorizontal } from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'warning' | 'success' | 'destructive' | 'secondary' | 'blue' }> = {
  DRAFT:          { label: 'Draft',          variant: 'secondary' },
  SUBMITTED:      { label: 'Submitted',      variant: 'default' },
  UNDER_REVIEW:   { label: 'Under Review',   variant: 'warning' },
  AI_PROCESSING:  { label: 'AI Processing',  variant: 'blue' },
  APPROVED:       { label: 'Approved',       variant: 'success' },
  REJECTED:       { label: 'Rejected',       variant: 'destructive' },
  DISBURSED:      { label: 'Disbursed',      variant: 'success' },
  ACTIVE:         { label: 'Active',         variant: 'success' },
  CLOSED:         { label: 'Closed',         variant: 'secondary' },
  DEFAULTED:      { label: 'Defaulted',      variant: 'destructive' },
  NPA:            { label: 'NPA',            variant: 'destructive' },
}

const RISK_COLOR: Record<string, string> = {
  LOW:    'text-emerald-400',
  MEDIUM: 'text-amber-400',
  HIGH:   'text-red-400',
}

interface Props { applications: LoanApplication[] }

export function ApplicationsTable({ applications }: Props) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">Recent Applications</h2>
          <p className="text-xs text-slate-400 mt-0.5">Live pipeline — last 48 hours</p>
        </div>
        <Link href="/applications" className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors">
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800/40">
              {['Application', 'Applicant', 'Type', 'Amount', 'FOIR', 'AI Score', 'Status', ''].map(col => (
                <th key={col} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => {
              const status = STATUS_CONFIG[app.status] || { label: app.status, variant: 'secondary' as const }
              return (
                <tr
                  key={app.id}
                  className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-brand-400">{app.applicationNumber}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                           style={{ background: `hsl(${(app.applicant.name.charCodeAt(0) * 15) % 360}, 60%, 45%)` }}>
                        {app.applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-200">{app.applicant.name}</div>
                        <div className="text-[10px] text-slate-500">{app.applicant.creditScore} CIBIL</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-300">{app.loanType}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-200">
                    {formatCurrency(app.requestedAmount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold ${app.foir > 50 ? 'text-red-400' : app.foir > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {app.foir.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {app.aiScore !== undefined ? (
                      <div className="flex items-center gap-1.5">
                        <Brain className="w-3 h-3 text-brand-400" />
                        <span className={`text-xs font-semibold ${RISK_COLOR[app.aiRiskLevel || 'MEDIUM']}`}>
                          {app.aiScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/applications/${app.id}`}
                            className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
