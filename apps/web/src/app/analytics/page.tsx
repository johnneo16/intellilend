import React from 'react'
import { Header } from '@/components/layout/Header'
import { DisbursementChart, NPATrendChart, PortfolioMixChart, ApplicationsFunnelChart } from '@/components/dashboard/Charts'
import { CHART_DATA } from '@/lib/mock-data'

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Analytics" subtitle="Portfolio performance · March 2024" />
      <div className="flex-1 p-5 space-y-4">
        <DisbursementChart data={CHART_DATA} />
        <div className="grid grid-cols-2 gap-4">
          <ApplicationsFunnelChart />
          <PortfolioMixChart />
        </div>
        <NPATrendChart data={CHART_DATA} />
      </div>
    </div>
  )
}
