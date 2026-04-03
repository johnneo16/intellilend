'use client'
import React from 'react'
import Link from 'next/link'
import { Search, Bell, Plus, ChevronDown } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-5 py-3.5 shrink-0 sticky top-0 z-20"
      style={{
        background: 'rgba(244,246,251,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
      }}
    >
      <div>
        <h1 className="text-base font-bold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs text-slate-400 hover:text-slate-600 w-44"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span>Search… ⌘K</span>
        </div>

        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-slate-100"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"
                style={{ boxShadow: '0 0 4px rgba(239,68,68,0.6)' }} />
        </button>

        <button
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 transition-all hover:bg-slate-100"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 4px rgba(16,185,129,0.6)' }} />
          Mumbai HQ
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {action && (
          <Link
            href={action.href}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            {action.label}
          </Link>
        )}
      </div>
    </header>
  )
}
