'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Bell, Plus, ChevronDown, X } from 'lucide-react'
import { ALL_APPLICATIONS } from '@/lib/mock-data'

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  DRAFT:         { bg: 'bg-slate-100',   text: 'text-slate-500',  label: 'Draft' },
  SUBMITTED:     { bg: 'bg-blue-50',     text: 'text-blue-600',   label: 'Submitted' },
  UNDER_REVIEW:  { bg: 'bg-amber-50',    text: 'text-amber-600',  label: 'Under Review' },
  AI_PROCESSING: { bg: 'bg-indigo-50',   text: 'text-indigo-600', label: 'AI Processing' },
  APPROVED:      { bg: 'bg-emerald-50',  text: 'text-emerald-600',label: 'Approved' },
  REJECTED:      { bg: 'bg-red-50',      text: 'text-red-500',    label: 'Rejected' },
  DISBURSED:     { bg: 'bg-emerald-50',  text: 'text-emerald-600',label: 'Disbursed' },
}

interface HeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
}

export function Header({ title, subtitle, action }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim().length > 0
    ? ALL_APPLICATIONS.filter(app =>
        app.applicant.name.toLowerCase().includes(query.toLowerCase()) ||
        app.applicationNumber.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
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
          <button
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs text-slate-400 hover:text-slate-600 w-44"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span>Search… ⌘K</span>
          </button>

          <Link
            href="/notifications"
            className="relative p-2 rounded-lg transition-colors hover:bg-slate-100 inline-flex items-center justify-center"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"
                  style={{ boxShadow: '0 0 4px rgba(239,68,68,0.6)' }} />
          </Link>

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

      {/* Search overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-lg mx-auto mt-20 rounded-2xl p-4 shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search applications, customers…"
                className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Results */}
            {query.trim().length > 0 && (
              <div className="mt-2">
                {results.length > 0 ? (
                  <ul className="space-y-0.5">
                    {results.map((app) => {
                      const st = STATUS_STYLES[app.status] ?? { bg: 'bg-slate-100', text: 'text-slate-500', label: app.status }
                      return (
                        <li key={app.id}>
                          <Link
                            href={`/applications/${app.id}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors group"
                          >
                            <span className="font-mono text-xs font-semibold text-indigo-500 shrink-0 w-36">
                              {app.applicationNumber}
                            </span>
                            <span className="flex-1 text-sm font-medium text-slate-700 truncate">
                              {app.applicant.name}
                            </span>
                            <span className="text-xs text-slate-400 shrink-0">{app.loanType}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${st.bg} ${st.text}`}>
                              {st.label}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 text-center py-6">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            )}

            {query.trim().length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">
                Start typing to search applications or customers
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
