'use client'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { PORTFOLIO_MIX } from '@/lib/mock-data'

export function PortfolioDonut() {
  return (
    <ResponsiveContainer width={80} height={80}>
      <PieChart>
        <Pie
          data={PORTFOLIO_MIX}
          cx="50%"
          cy="50%"
          innerRadius={24}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
        >
          {PORTFOLIO_MIX.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
