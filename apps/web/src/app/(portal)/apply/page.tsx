'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap, ArrowRight, Shield, Clock, CheckCircle2, Star,
  Home, Briefcase, GraduationCap, Car, ChevronRight,
  Sparkles, TrendingUp, Lock, Phone,
} from 'lucide-react'

const LOAN_PRODUCTS = [
  {
    icon: Home,
    label: 'Home Loan',
    rate: 'From 8.5% p.a.',
    amount: 'Up to ₹5 Cr',
    tenure: 'Up to 30 years',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    icon: Briefcase,
    label: 'Personal Loan',
    rate: 'From 10.5% p.a.',
    amount: 'Up to ₹40 L',
    tenure: 'Up to 5 years',
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(6,182,212,0.05) 100%)',
    border: 'rgba(14,165,233,0.2)',
  },
  {
    icon: GraduationCap,
    label: 'Education Loan',
    rate: 'From 9.0% p.a.',
    amount: 'Up to ₹75 L',
    tenure: 'Up to 15 years',
    color: '#10b981',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.05) 100%)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: Car,
    label: 'Auto Loan',
    rate: 'From 7.9% p.a.',
    amount: 'Up to ₹1.5 Cr',
    tenure: 'Up to 7 years',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.05) 100%)',
    border: 'rgba(245,158,11,0.2)',
  },
]

const STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Fill a simple 5-step form — takes under 10 minutes.', icon: Sparkles },
  { step: '02', title: 'AI Reviews', desc: 'Our AI analyses your profile instantly with 4 specialised agents.', icon: Zap },
  { step: '03', title: 'Get Funds', desc: 'Approval in 4 hours. Money in your account within 24 hours.', icon: TrendingUp },
]

const TRUST = [
  { value: '₹142 Cr', label: 'Disbursed this month' },
  { value: '1,284', label: 'Active loan accounts' },
  { value: '98.3%', label: 'Customer satisfaction' },
  { value: '<4 hrs', label: 'Avg approval time' },
]

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function ApplyLandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 60%, #f0f4ff 100%)' }}>

      {/* ── Nav ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{
        background: 'rgba(248,250,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
      }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/apply" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] leading-none">
              <span className="font-black text-slate-900">Intelli</span>
              <span className="font-light text-slate-500">Lend</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/apply/status"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-slate-600 font-medium hover:text-indigo-600 transition-colors px-3 py-1.5">
              Check Status
            </Link>
            <Link href="/apply/new"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              }}>
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24">
        {/* Background blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(99,102,241,0.08)' }} />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(139,92,246,0.07)' }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#6366f1',
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI-Powered lending platform · Decisions in &lt;4 hours
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5"
          >
            Your dream,<br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              funded in 24 hrs
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Apply online in 10 minutes. Our AI reviews your profile instantly
            with 94% accuracy — no paperwork, no branch visits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/apply/new"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}>
              Start Application <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/apply/status"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all">
              Check Application Status
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {[
              { icon: Shield, text: 'Bank-grade security' },
              { icon: Lock,   text: '256-bit SSL encrypted' },
              { icon: Clock,  text: 'Approval in 4 hours' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400">
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-px"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2), rgba(99,102,241,0.1))' }}
          >
            <div className="rounded-2xl bg-white/90 px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ backdropFilter: 'blur(10px)' }}>
              {TRUST.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-slate-900">{value}</div>
                  <div className="text-xs text-slate-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Loan Products ───────────────────────────── */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Our Products</div>
            <h2 className="text-3xl font-black text-slate-900">Choose your loan type</h2>
            <p className="text-slate-500 mt-2">Competitive rates, flexible tenures, instant decisions</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {LOAN_PRODUCTS.map((product) => {
              const Icon = product.icon
              return (
                <motion.div key={product.label} variants={fade}>
                  <Link href="/apply/new"
                    className="group block p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: product.bg,
                      borderColor: product.border,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: product.color + '18', border: `1px solid ${product.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: product.color }} />
                    </div>
                    <div className="font-bold text-slate-900 mb-1">{product.label}</div>
                    <div className="text-xs font-semibold mb-3" style={{ color: product.color }}>{product.rate}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-slate-400" /> {product.amount}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-slate-400" /> {product.tenure}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold mt-4 transition-colors group-hover:gap-2"
                      style={{ color: product.color }}>
                      Apply Now <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────── */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">How it works</div>
            <h2 className="text-3xl font-black text-slate-900">Simple. Fast. Transparent.</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {STEPS.map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div key={step} variants={fade}
                className="relative text-center p-8 rounded-2xl bg-white border border-slate-100"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 z-10"
                    style={{ background: 'linear-gradient(90deg, #c7d2fe, transparent)' }} />
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.08) 100%)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}>
                  <Icon className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="text-[10px] font-black tracking-widest text-indigo-400 mb-2">STEP {step}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features grid ───────────────────────────── */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1f38 0%, #2d3561 50%, #1a1f38 100%)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            }}
          >
            <div className="p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#a5b4fc' }}>
                  Why IntelliLend
                </div>
                <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                  AI that works as hard as you do
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  Four specialized AI agents review your application simultaneously — document verification, credit scoring, risk profiling, and default prediction — all in under 7 seconds.
                </p>
                <Link href="/apply/new"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
                  }}
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Zap,          label: 'AI Underwriting',   desc: '4 agents in parallel'      },
                  { icon: Shield,       label: 'Secure & Compliant', desc: 'RBI & NBFC compliant'      },
                  { icon: Clock,        label: 'Fast Disbursal',     desc: 'Under 24 hours'            },
                  { icon: Star,         label: '98% Satisfaction',   desc: '12,000+ happy borrowers'   },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: 'rgba(99,102,241,0.3)' }}>
                      <Icon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div className="text-sm font-bold text-white mb-0.5">{label}</div>
                    <div className="text-xs text-white/40">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA footer ──────────────────────────────── */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-3xl font-black text-slate-900 mb-3">Ready to apply?</h2>
          <p className="text-slate-500 mb-7">Takes 10 minutes. No documents needed upfront. Zero processing fee to apply.</p>
          <Link href="/apply/new"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
            }}>
            Start Your Application <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="px-6 py-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">
              <span className="font-black text-slate-900">Intelli</span>
              <span className="font-light text-slate-500">Lend</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/apply/status" className="hover:text-slate-600 transition-colors">Check Status</Link>
            <span>RBI NBFC Reg. No. N-14.03218</span>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> 1800-123-4567
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
