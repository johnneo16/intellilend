import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`
  if (num >= 100000)   return `₹${(num / 100000).toFixed(1)}L`
  if (num >= 1000)     return `₹${(num / 1000).toFixed(1)}K`
  return String(num)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export const LIFECYCLE_STAGES = [
  { id: 'prospect',    label: 'Application',   color: '#6366f1', glow: 'glow-indigo' },
  { id: 'underwrite',  label: 'Underwriting',  color: '#f59e0b', glow: 'glow-amber' },
  { id: 'approved',    label: 'Approved',      color: '#10b981', glow: 'glow-emerald' },
  { id: 'active',      label: 'Active Loan',   color: '#3b82f6', glow: 'glow-blue' },
  { id: 'collections', label: 'Collections',   color: '#ef4444', glow: 'glow-red' },
] as const

export type LifecycleStage = typeof LIFECYCLE_STAGES[number]['id']
