import React from 'react'
import { Header } from '@/components/layout/Header'
import { ApplicationsTable } from '@/components/dashboard/ApplicationsTable'
import { Badge } from '@/components/ui/badge'
import { RECENT_APPLICATIONS } from '@/lib/mock-data'
import { Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FILTERS = ['All', 'AI Processing', 'Under Review', 'Approved', 'Rejected', 'Disbursed']

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin">
      <Header
        title="Applications"
        subtitle="241 active · 38 AI processed today"
        action={{ label: 'New Application', href: '/applications/new' }}
      />
      <div className="flex-1 p-6 space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  f === 'All'
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-3.5 h-3.5" /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
          </div>
        </div>
        <ApplicationsTable applications={RECENT_APPLICATIONS} />
      </div>
    </div>
  )
}
