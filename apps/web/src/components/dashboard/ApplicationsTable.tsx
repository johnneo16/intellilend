'use client'
import React from 'react'
import Link from 'next/link'
import { Brain, Eye, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import type { LoanApplication } from '@/types'

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'warning' | 'success' | 'destructive' | 'secondary' | 'blue' }> = {
  DRAFT:         { label: 'Draft',        variant: 'secondary' },
  SUBMITTED:     { label: 'Submitted',    variant: 'default' },
  UNDER_REVIEW:  { label: 'Under Review', variant: 'warning' },
  AI_PROCESSING: { label: 'AI Processing',variant: 'blue' },
  APPROVED:      { label: 'Approved',     variant: 'success' },
  REJECTED:      { label: 'Rejected',     variant: 'destructive' },
  DISBURSED:     { label: 'Disbursed',    variant: 'success' },
  ACTIVE:        { label: 'Active',       variant: 'success' },
  CLOSED:        { label: 'Closed',       variant: 'secondary' },
  DEFAULTED:     { label: 'Defaulted',    variant: 'destructive' },
  NPA:           { label: 'NPA',          variant: 'destructive' },
}

const RISK_COLOR: Record<string, string> = {
  LOW: 'text-emerald-600', MEDIUM: 'text-amber-600', HIGH: 'text-red-500',
}

interface Props { applications: LoanApplication[] }

export function ApplicationsTable({ applications }: Props) {
  return (
    <div className="rounded-xl overflow-hidden bg-white"
         style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b"
           style={{ borderColor: 'rgba(0,0,0,0.06)', background: '#f8faff' }}>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Recent Applications</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Live pipeline · last 48 hours</p>
        </div>
        <Link href="/applications" className="text-xs text-indigo-500 hover:text-indigo-600 font-semibold transition-colors">
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#f8faff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {['Application', 'Applicant', 'Type', 'Amount', 'FOIR', 'AI Score', 'Status', ''].map(col => (
                <th key={col} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const status = STATUS_CONFIG[app.status] || { label: app.status, variant: 'secondary' as const }
              return (
                <tr key={app.id}
                    className="border-b hover:bg-indigo-50/40 transition-colors group"
                    style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <td className="px-5 py-3.5">
                    <Link href={`/applications/${app.id}`} className="font-mono text-xs font-semibold text-indigo-500 hover:text-indigo-700 hover:underline transition-colors">
                      {app.applicationNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                           style={{ background: `hsl(${app.applicant.name.charCodeAt(0) * 15 % 360},55%,48%)` }}>
                        {app.applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-700">{app.applicant.name}</div>
                        <div className="text-[10px] text-slate-400">{app.applicant.creditScore} CIBIL</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-medium">{app.loanType}</td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-800">{formatCurrency(app.requestedAmount)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold ${app.foir > 50 ? 'text-red-500' : app.foir > 40 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {app.foir.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {app.aiScore !== undefined ? (
                      <div className="flex items-center gap-1.5">
                        <Brain className="w-3 h-3 text-indigo-400" />
                        <span className={`text-xs font-bold ${RISK_COLOR[app.aiRiskLevel || 'MEDIUM']}`}>{app.aiScore}</span>
                      </div>
                    ) : <span className="text-xs text-slate-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/applications/${app.id}`}
                            className="p-1.5 rounded-lg hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
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
