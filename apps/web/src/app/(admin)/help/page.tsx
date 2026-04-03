'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import {
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  PlayCircle,
  MessageCircle,
  Mail,
  Phone,
  Clock,
} from 'lucide-react'

const cardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

/* ── FAQ data ─────────────────────────────────────────────────────────── */
const FAQ_SECTIONS = [
  {
    id: 'app-processing',
    title: 'Application Processing',
    icon: BookOpen,
    color: '#6366f1',
    items: [
      {
        q: 'How long does the AI underwriting pipeline take?',
        a: 'The AI pipeline typically completes within 5–10 minutes. It runs 4 agents in parallel: Document Intelligence, Credit Decision, Risk Assessment, and Collections Forecast. Each agent produces a confidence score and flags for manual review.',
      },
      {
        q: 'What documents are required for a home loan application?',
        a: 'Standard requirements: Aadhaar card, PAN card, last 3 months salary slips (or 2 years ITR for self-employed), bank statements for 6 months, Form 16, and property documents. The Document Intelligence agent auto-verifies these upon upload.',
      },
      {
        q: 'Can an underwriter override an AI decision?',
        a: 'Yes. Underwriters can override any AI recommendation from the application detail screen. All overrides are logged with a mandatory reason field, and are included in the monthly audit trail exported to RBI compliance reports.',
      },
    ],
  },
  {
    id: 'ai-underwriting',
    title: 'AI Underwriting',
    icon: Code2,
    color: '#8b5cf6',
    items: [
      {
        q: 'What is the AI score and how is it calculated?',
        a: 'The AI score (0–100) is a composite risk metric produced by the Credit Decision and Risk Assessment agents. It considers CIBIL score, FOIR, income stability, loan-to-value ratio, industry risk, and repayment history. Scores ≥ 90 can be auto-approved; scores < 60 are flagged for mandatory review.',
      },
      {
        q: 'How does the Collections Forecast agent work?',
        a: 'The Collections Forecast agent models default probability over the full loan tenure using Monte Carlo simulation on historical repayment cohorts. It outputs a probability of default (%) and recommended recovery strategy if the application is approved.',
      },
      {
        q: 'What is the current AI model version and accuracy?',
        a: 'The platform currently runs model v2.3.1, updated on 20 March 2024. The credit decision model has an accuracy of 91.4% on out-of-sample validation. Model updates are logged under Settings → AI Configuration.',
      },
    ],
  },
  {
    id: 'collections',
    title: 'Collections & NPA',
    icon: Phone,
    color: '#ef4444',
    items: [
      {
        q: 'When is an account classified as NPA?',
        a: 'Per RBI guidelines, an account is classified as a Non-Performing Asset (NPA) when the borrower has not paid interest or principal for 90 consecutive days. IntelliLend triggers an alert at 30 days overdue, escalates at 60 days, and auto-flags NPA at 90 days.',
      },
      {
        q: 'How do I generate a Collections report?',
        a: 'Navigate to Collections → Reports. You can export daily, weekly, or monthly overdue reports in PDF or Excel. Bulk SMS/email nudges can be scheduled from the same screen using borrower contact data.',
      },
    ],
  },
]

/* ── Quick links ─────────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: 'Documentation',    icon: BookOpen,      color: '#6366f1', href: '#' },
  { label: 'API Reference',    icon: Code2,         color: '#8b5cf6', href: '#' },
  { label: 'Video Tutorials',  icon: PlayCircle,    color: '#10b981', href: '#' },
  { label: 'Contact Support',  icon: MessageCircle, color: '#f59e0b', href: '#' },
]

/* ── FAQ item ─────────────────────────────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-start gap-3 py-3.5 text-left hover:text-indigo-600 transition-colors group"
        onClick={onToggle}
      >
        <span className="flex-1 text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-relaxed">
          {q}
        </span>
        {isOpen
          ? <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        }
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-slate-500 leading-relaxed pb-4 pr-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  function toggleFaq(id: string) {
    setOpenFaq((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col h-full overflow-auto scrollbar-thin" style={{ background: '#f4f6fb' }}>
      <Header title="Help & Support" subtitle="Documentation · FAQs · Contact" />

      <div className="flex-1 p-5 space-y-5 max-w-3xl mx-auto w-full">

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={cardStyle}
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search documentation, FAQs, or guides…"
            className="flex-1 text-sm text-slate-600 bg-transparent outline-none placeholder:text-slate-400"
            readOnly
          />
          <span className="hidden sm:inline text-[11px] text-slate-300 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </motion.div>

        {/* FAQ sections */}
        {FAQ_SECTIONS.map((section, si) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + si * 0.08, duration: 0.35 }}
            className="rounded-xl overflow-hidden"
            style={cardStyle}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${section.color}12`, border: `1px solid ${section.color}22` }}
              >
                <section.icon className="w-4 h-4" style={{ color: section.color }} />
              </div>
              <h2 className="text-sm font-bold text-slate-900">{section.title}</h2>
              <span className="ml-auto text-[11px] text-slate-400">{section.items.length} questions</span>
            </div>

            {/* Questions */}
            <div className="px-5">
              {section.items.map((item, qi) => {
                const faqId = `${section.id}-${qi}`
                return (
                  <FaqItem
                    key={faqId}
                    q={item.q}
                    a={item.a}
                    isOpen={openFaq === faqId}
                    onToggle={() => toggleFaq(faqId)}
                  />
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.35 }}
          className="rounded-xl overflow-hidden"
          style={cardStyle}
        >
          <div className="px-5 py-3.5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Quick Links</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex flex-col items-center gap-2.5 py-4 rounded-xl text-center transition-all hover:scale-[1.03] group"
                style={{
                  background: `${link.color}08`,
                  border: `1px solid ${link.color}18`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${link.color}14`, border: `1px solid ${link.color}25` }}
                >
                  <link.icon className="w-5 h-5" style={{ color: link.color }} />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Support contact card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="rounded-xl overflow-hidden"
          style={cardStyle}
        >
          <div className="px-5 py-3.5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Contact Support</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Our team is here to help</p>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: '#6366f112', border: '1px solid #6366f122' }}>
                <Mail className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Email</div>
                <a href="mailto:support@intellilend.in"
                   className="text-xs font-medium text-indigo-600 hover:underline mt-0.5 block">
                  support@intellilend.in
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: '#10b98112', border: '1px solid #10b98122' }}>
                <Phone className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Phone</div>
                <a href="tel:18001234567"
                   className="text-xs font-medium text-emerald-600 hover:underline mt-0.5 block">
                  1800-123-4567
                </a>
                <div className="text-[10px] text-slate-400">Toll-free</div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: '#f59e0b12', border: '1px solid #f59e0b22' }}>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Hours</div>
                <div className="text-xs font-medium text-slate-700 mt-0.5">Mon – Sat</div>
                <div className="text-xs text-slate-500">9:00 AM – 6:00 PM IST</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
