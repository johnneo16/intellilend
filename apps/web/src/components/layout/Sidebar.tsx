'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
      { href: '/',             icon: LayoutDashboard, label: 'Dashboard',    badge: null },
      { href: '/applications', icon: FileText,        label: 'Applications', badge: '12' },
      { href: '/underwriting', icon: Brain,           label: 'Underwriting', badge: '5'  },
      { href: '/loans',        icon: CreditCard,      label: 'Active Loans', badge: null },
      { href: '/collections',  icon: AlertTriangle,   label: 'Collections',  badge: '3'  },
    ],
  },
  {
    section: 'Insights',
    items: [
      { href: '/analytics', icon: BarChart3, label: 'Analytics',   badge: null },
      { href: '/customers', icon: Users,     label: 'Customers',   badge: null },
      { href: '/risk',      icon: Shield,    label: 'Risk Engine', badge: null },
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
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen shrink-0"
      style={{
        background: 'linear-gradient(180deg, #1a1f38 0%, #111827 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />

      {/* Logo */}
      <div
        className={cn(
          'relative z-10 flex items-center gap-3 px-4 py-[18px] shrink-0',
          collapsed && 'justify-center px-0',
        )}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 0 20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <Zap className="w-4 h-4 text-white" />
        </motion.div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              <div className="leading-none">
                <span className="text-[15px] font-black text-white tracking-tight">Intelli</span>
                <span className="text-[15px] font-light text-white/60 tracking-tight">Lend</span>
              </div>
              <div className="text-[10px] font-medium mt-1" style={{ color: 'rgba(165,180,252,0.5)' }}>
                AI Lending Platform
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex-1 py-4 overflow-y-auto scrollbar-none">
        {NAV_ITEMS.map((group) => (
          <div key={group.section} className="mb-5">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 mb-2 text-[9px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: 'rgba(255,255,255,0.18)' }}
                >
                  {group.section}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-0.5 px-2">
              {group.items.map(({ href, icon: Icon, label, badge }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    title={collapsed ? label : undefined}
                    className={cn(
                      'relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 group',
                      collapsed && 'justify-center px-0',
                    )}
                    style={active ? {
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.12) 100%)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    } : {}}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ background: 'linear-gradient(180deg, #a5b4fc, #818cf8)' }}
                      />
                    )}
                    {!active && (
                      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ background: 'rgba(255,255,255,0.05)' }} />
                    )}

                    <Icon
                      className="w-4 h-4 shrink-0 transition-colors relative z-10"
                      style={{ color: active ? '#a5b4fc' : 'rgba(255,255,255,0.38)' }}
                    />

                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-1 items-center gap-1.5 relative z-10"
                        >
                          <span className="flex-1 leading-none transition-colors"
                            style={{ color: active ? '#e0e7ff' : 'rgba(255,255,255,0.52)' }}>
                            {label}
                          </span>
                          {badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tabular-nums"
                              style={{
                                background: active ? 'rgba(165,180,252,0.18)' : 'rgba(255,255,255,0.07)',
                                color: active ? '#a5b4fc' : 'rgba(255,255,255,0.35)',
                                border: '1px solid rgba(165,180,252,0.15)',
                              }}>
                              {badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 p-3 shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-colors hover:bg-white/[0.05]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 12px rgba(99,102,241,0.4)',
                }}>
                RM
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Rahul Mehta
                </div>
                <div className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Risk Manager
                </div>
              </div>
              <Settings className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse toggle */}
      <motion.button
        onClick={() => setCollapsed(!collapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full flex items-center justify-center z-20"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-slate-500" />
          : <ChevronLeft className="w-3 h-3 text-slate-500" />
        }
      </motion.button>
    </motion.aside>
  )
}
