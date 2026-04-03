'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { ALERTS } from '@/lib/mock-data'
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Info,
  Bell,
  BellOff,
} from 'lucide-react'

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

type AlertItem = (typeof ALERTS)[number]

function alertIcon(type: string) {
  switch (type) {
    case 'OVERDUE':
    case 'RISK':
      return AlertTriangle
    case 'AI_FLAG':
      return Brain
    case 'DISBURSEMENT':
      return CheckCircle2
    default:
      return Info
  }
}

function alertIconColor(type: string): string {
  const map: Record<string, string> = {
    OVERDUE:     '#ef4444',
    AI_FLAG:     '#6366f1',
    RISK:        '#f59e0b',
    DISBURSEMENT:'#10b981',
    SYSTEM:      '#3b82f6',
    COMPLIANCE:  '#f97316',
  }
  return map[type] ?? '#64748b'
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'HIGH')   return <Badge variant="destructive">HIGH</Badge>
  if (priority === 'MEDIUM') return <Badge variant="warning">MEDIUM</Badge>
  return <Badge variant="secondary">LOW</Badge>
}

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS.map((a) => ({ ...a })))

  const unreadCount  = alerts.filter((a) => !a.read).length
  const highCount    = alerts.filter((a) => a.priority === 'HIGH').length
  const systemCount  = alerts.filter((a) => a.type === 'SYSTEM').length

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  function markRead(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Alerts" subtitle="4 unread · 2 require action" />

      <div className="flex-1 p-5 space-y-5">
        {/* Summary + action row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Chips */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={cardStyle}>
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"
                  style={{ boxShadow: '0 0 5px rgba(59,130,246,0.5)' }} />
            <span className="text-xs font-semibold text-slate-700">{unreadCount} Unread</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={cardStyle}>
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"
                  style={{ boxShadow: '0 0 5px rgba(239,68,68,0.5)' }} />
            <span className="text-xs font-semibold text-slate-700">{highCount} High Priority</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={cardStyle}>
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">{systemCount} System Alert</span>
          </div>

          <div className="ml-auto">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200"
              style={cardStyle}
            >
              <BellOff className="w-3.5 h-3.5" />
              Mark all read
            </button>
          </div>
        </motion.div>

        {/* Alert cards */}
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {alerts.map((alert, idx) => {
              const Icon = alertIcon(alert.type)
              const iconColor = alertIconColor(alert.type)

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.3 }}
                  className="rounded-xl px-5 py-4 flex items-start gap-4 cursor-pointer group transition-all hover:shadow-md"
                  style={{
                    ...cardStyle,
                    borderLeft: `3px solid ${iconColor}`,
                    opacity: alert.read ? 0.78 : 1,
                  }}
                  onClick={() => markRead(alert.id)}
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${iconColor}12`, border: `1px solid ${iconColor}22` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: iconColor }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900">{alert.title}</span>
                      {!alert.read && (
                        <span
                          className="w-2 h-2 rounded-full bg-blue-500 shrink-0"
                          style={{ boxShadow: '0 0 5px rgba(59,130,246,0.5)' }}
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alert.body}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-slate-400">{alert.time}</span>
                      <span className="text-[10px] text-slate-300">·</span>
                      <PriorityBadge priority={alert.priority} />
                    </div>
                  </div>

                  {/* Bell icon right */}
                  <div className="shrink-0 mt-0.5">
                    {alert.read
                      ? <BellOff className="w-4 h-4 text-slate-300" />
                      : <Bell className="w-4 h-4 text-blue-400" />
                    }
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
