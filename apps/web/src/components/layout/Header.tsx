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
        background: 'rgba(8,11,20,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {/* Title */}
      <div>
        <h1 className="text-base font-bold text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{subtitle}</p>}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Search pill */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs text-slate-500 hover:text-slate-300 w-44"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span>Search… ⌘K</span>
        </div>

        {/* Bell */}
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <Bell className="w-4 h-4 text-slate-400" />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444' }}
          />
        </button>

        {/* Branch */}
        <button
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-300 transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #10b981' }} />
          Mumbai HQ
          <ChevronDown className="w-3 h-3 text-slate-600" />
        </button>

        {/* CTA */}
        {action && (
          <Link
            href={action.href}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 0 16px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.3)',
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
