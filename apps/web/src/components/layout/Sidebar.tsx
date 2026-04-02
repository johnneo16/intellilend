'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FileText, Brain, CreditCard, AlertTriangle,
  BarChart3, Settings, ChevronLeft, ChevronRight,
  Users, Shield, Bell, HelpCircle, Zap,
} from 'lucide-react'

const NAV_ITEMS = [
  {
    section: 'Core',
    items: [
      { href: '/',             icon: LayoutDashboard, label: 'Dashboard',    badge: null    },
      { href: '/applications', icon: FileText,        label: 'Applications', badge: '12'    },
      { href: '/underwriting', icon: Brain,           label: 'Underwriting', badge: '5'     },
      { href: '/loans',        icon: CreditCard,      label: 'Active Loans', badge: null    },
      { href: '/collections',  icon: AlertTriangle,   label: 'Collections',  badge: '3'     },
    ],
  },
  {
    section: 'Insights',
    items: [
      { href: '/analytics',  icon: BarChart3, label: 'Analytics',   badge: null },
      { href: '/customers',  icon: Users,     label: 'Customers',   badge: null },
      { href: '/risk',       icon: Shield,    label: 'Risk Engine', badge: null },
    ],
  },
  {
    section: 'System',
    items: [
      { href: '/notifications', icon: Bell,       label: 'Alerts',   badge: '2'  },
      { href: '/settings',      icon: Settings,   label: 'Settings', badge: null },
      { href: '/help',          icon: HelpCircle, label: 'Help',     badge: null },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out',
        collapsed ? 'w-[60px]' : 'w-[220px]',
      )}
      style={{
        background: 'linear-gradient(180deg, #090d18 0%, #070b14 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Subtle left glow */}
      <div
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)' }}
      />

      {/* Logo */}
      <div className={cn(
        'relative z-10 flex items-center gap-3 border-b px-4 py-[18px] shrink-0',
        collapsed && 'justify-center px-0',
      )}
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 0 16px rgba(99,102,241,0.5)',
          }}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold text-white tracking-tight leading-tight">IntelliLend</div>
            <div className="text-[10px] font-medium leading-tight" style={{ color: 'rgba(99,102,241,0.7)' }}>
              AI Lending Platform
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex-1 py-4 overflow-y-auto scrollbar-thin">
        {NAV_ITEMS.map((group) => (
          <div key={group.section} className="mb-5">
            {!collapsed && (
              <div className="px-4 mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                   style={{ color: 'rgba(255,255,255,0.2)' }}>
                {group.section}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map(({ href, icon: Icon, label, badge }) => {
                const active = href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href)

                return (
                  <Link
                    key={href}
                    href={href}
                    title={collapsed ? label : undefined}
                    className={cn(
                      'relative flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150',
                      collapsed && 'justify-center px-0 mx-2',
                      active
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]',
                    )}
                    style={active ? {
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 100%)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      boxShadow: '0 0 12px rgba(99,102,241,0.1) inset',
                    } : {}}
                  >
                    {/* Active left bar */}
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ background: 'linear-gradient(180deg, #818cf8, #6366f1)' }}
                      />
                    )}

                    <Icon
                      className="w-4 h-4 shrink-0 transition-colors"
                      style={{ color: active ? '#818cf8' : undefined }}
                    />

                    {!collapsed && (
                      <>
                        <span className="flex-1 leading-none">{label}</span>
                        {badge && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(99,102,241,0.2)',
                              color: '#a5b4fc',
                              border: '1px solid rgba(99,102,241,0.25)',
                            }}
                          >
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile */}
      {!collapsed && (
        <div
          className="relative z-10 p-3 border-t shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors hover:bg-white/[0.04]">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            >
              RM
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate leading-tight">Rahul Mehta</div>
              <div className="text-[10px] text-slate-500 leading-tight">Risk Manager</div>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-600 hover:text-slate-400 transition-colors" />
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full flex items-center justify-center z-20 transition-all hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #1e2540, #161d2e)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-slate-400" />
          : <ChevronLeft  className="w-3 h-3 text-slate-400" />
        }
      </button>
    </aside>
  )
}
