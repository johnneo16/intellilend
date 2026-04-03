import React from 'react'
import { Header } from '@/components/layout/Header'
import { ApplicationsTable } from '@/components/dashboard/ApplicationsTable'
import { RECENT_APPLICATIONS } from '@/lib/mock-data'
import { Filter, Download } from 'lucide-react'

const FILTERS = ['All', 'AI Processing', 'Under Review', 'Approved', 'Rejected', 'Disbursed']

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Applications" subtitle="241 active · 38 AI processed today" />
      <div className="flex-1 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button key={f}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  f === 'All'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-indigo-200 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-indigo-200 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
        <ApplicationsTable applications={RECENT_APPLICATIONS} />
      </div>
    </div>
  )
}
