'use client'
import React from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Zap, ArrowRight, Shield, Clock, CheckCircle2, Star,
  Home, Briefcase, GraduationCap, Car, ChevronRight,
  Sparkles, TrendingUp, Lock, Phone,
} from 'lucide-react'

/* ── Animated blob background ─────────────────────────────────────────── */
const BLOBS = [
  { w: 700, h: 700, color: 'rgba(99,102,241,0.22)',  blur: 120, top: '-15%', left: '-10%',   dur: 22, delay: 0,  x: [0,120,-60,40,0],  y: [0,-80,60,-30,0],  s: [1,1.15,0.9,1.05,1] },
  { w: 550, h: 550, color: 'rgba(139,92,246,0.2)',   blur: 100, top: '10%',  right: '-8%',   dur: 28, delay: 4,  x: [0,-90,50,-20,0],  y: [0,100,-50,30,0],  s: [1,0.85,1.25,0.95,1] },
  { w: 480, h: 480, color: 'rgba(236,72,153,0.18)',  blur: 110, bottom: '5%',left: '25%',    dur: 20, delay: 8,  x: [0,70,-100,40,0],  y: [0,-60,80,-20,0],  s: [1,1.1,0.92,1.08,1] },
  { w: 400, h: 400, color: 'rgba(6,182,212,0.15)',   blur: 90,  bottom:'30%',right:'15%',    dur: 25, delay: 2,  x: [0,-50,80,-30,0],  y: [0,70,-40,60,0],   s: [1,1.2,0.88,1.12,1] },
  { w: 320, h: 320, color: 'rgba(245,158,11,0.12)',  blur: 80,  top: '40%',  left: '40%',    dur: 18, delay: 12, x: [0,60,-40,80,0],   y: [0,-90,50,-60,0],  s: [1,0.9,1.15,0.95,1] },
]

function GooeyBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.w,
            height: b.h,
            background: `radial-gradient(circle at 40% 40%, ${b.color}, transparent 70%)`,
            filter: `blur(${b.blur}px)`,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
      {/* Noise grain overlay for depth */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />
    </div>
  )
}

/* ── Floating orb ring pulse ──────────────────────────────────────────── */
function PulseRing({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border"
      style={{ borderColor: 'rgba(99,102,241,0.3)' }}
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay }}
    />
  )
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const LOAN_PRODUCTS = [
  { icon: Home,         label: 'Home Loan',      rate: 'From 8.5% p.a.',  amount: 'Up to ₹5 Cr',  tenure: 'Up to 30 years', color: '#6366f1', glow: 'rgba(99,102,241,0.25)'  },
  { icon: Briefcase,    label: 'Personal Loan',  rate: 'From 10.5% p.a.', amount: 'Up to ₹40 L',  tenure: 'Up to 5 years',  color: '#0ea5e9', glow: 'rgba(14,165,233,0.25)'  },
  { icon: GraduationCap,label: 'Education Loan', rate: 'From 9.0% p.a.',  amount: 'Up to ₹75 L',  tenure: 'Up to 15 years', color: '#10b981', glow: 'rgba(16,185,129,0.25)'  },
  { icon: Car,          label: 'Auto Loan',      rate: 'From 7.9% p.a.',  amount: 'Up to ₹1.5 Cr',tenure: 'Up to 7 years',  color: '#f59e0b', glow: 'rgba(245,158,11,0.25)'  },
]

const STEPS = [
  { step: '01', title: 'Apply Online',   desc: 'Fill a simple 5-step form — takes under 10 minutes.', icon: Sparkles },
  { step: '02', title: 'AI Reviews',     desc: '4 AI agents analyse your profile in under 7 seconds.', icon: Zap },
  { step: '03', title: 'Get Funded',     desc: 'Approval in 4 hours. Disbursement within 24 hours.', icon: TrendingUp },
]

const TRUST = [
  { value: '₹142 Cr', label: 'Disbursed this month' },
  { value: '1,284',   label: 'Active loan accounts'  },
  { value: '98.3%',   label: 'Satisfaction rate'     },
  { value: '<4 hrs',  label: 'Avg approval time'     },
]

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function ApplyLandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #eef0ff 0%, #f8f9ff 45%, #f5f0ff 100%)' }}>

      <GooeyBackground />

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(238,240,255,0.6)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(99,102,241,0.12)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/apply" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ scale: 1.08, rotate: 5 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
              }}>
              <Zap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </motion.div>
            <span className="text-[18px] leading-none">
              <span className="font-black text-slate-900">Intelli</span>
              <span className="font-light text-slate-500">Lend</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/apply/status"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-xl hover:bg-white/50">
              Check Status
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/apply/new"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}>
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#6366f1',
                boxShadow: '0 2px 12px rgba(99,102,241,0.12)',
              }}
            >
              <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
              AI-Powered · Decisions in &lt;4 hours · Zero branch visits
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 max-w-3xl"
            >
              <span className="text-slate-900">Your dream, </span>
              <br />
              <span className="relative inline-block">
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 80%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>funded in 24 hrs</span>
                {/* Underline glow */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)' }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Apply online in 10 minutes. Our AI reviews your profile instantly
              with 94% accuracy — no paperwork, no branch visits.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-10"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/apply/new"
                  className="relative flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 8px 28px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}>
                  <motion.span
                    className="absolute inset-0 rounded-2xl"
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    style={{ background: 'radial-gradient(circle at 50% 50%, white, transparent)' }}
                  />
                  Start Application <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <Link href="/apply/status"
                className="flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  color: '#475569',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                Check Application Status
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {[
                { icon: Shield, text: 'Bank-grade security' },
                { icon: Lock,   text: '256-bit SSL encrypted' },
                { icon: Clock,  text: 'Approval in 4 hours' },
              ].map(({ icon: Icon, text }) => (
                <div key={text}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0,0,0,0.07)',
                    color: '#64748b',
                  }}>
                  <Icon className="w-3.5 h-3.5 text-indigo-400" /> {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-px"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(236,72,153,0.3), rgba(245,158,11,0.3))' }}
          >
            <div className="rounded-3xl px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(20px)',
              }}>
              {TRUST.map(({ value, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-slate-900 leading-none mb-1">{value}</div>
                  <div className="text-xs text-slate-400">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Loan Products ───────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>
              Our Products
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Choose your loan type</h2>
            <p className="text-slate-500">Competitive rates · Flexible tenures · Instant AI decisions</p>
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
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link href="/apply/new"
                      className="group block p-6 rounded-2xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${product.color}25`,
                        boxShadow: `0 4px 24px ${product.glow}`,
                      }}
                    >
                      {/* Card glow blob */}
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
                        style={{ background: product.color }} />

                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                          style={{
                            background: `linear-gradient(135deg, ${product.color}20, ${product.color}10)`,
                            border: `1px solid ${product.color}30`,
                            boxShadow: `0 4px 12px ${product.glow}`,
                          }}>
                          <Icon className="w-5 h-5" style={{ color: product.color }} />
                        </div>
                        <div className="font-bold text-slate-900 mb-1.5 text-base">{product.label}</div>
                        <div className="text-sm font-bold mb-4" style={{ color: product.color }}>{product.rate}</div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <CheckCircle2 className="w-3 h-3" style={{ color: product.color }} /> {product.amount}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <CheckCircle2 className="w-3 h-3" style={{ color: product.color }} /> {product.tenure}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold mt-5 transition-all group-hover:gap-2"
                          style={{ color: product.color }}>
                          Apply Now <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>
              How it works
            </div>
            <h2 className="text-4xl font-black text-slate-900">Simple. Fast. Transparent.</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {STEPS.map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div key={step} variants={fade}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative text-center p-10 rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99,102,241,0.1)',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.08)',
                  }}
                >
                  {/* Subtle corner glow */}
                  <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent)' }} />

                  {i < STEPS.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-12 -right-4 z-20"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-6 h-6 text-indigo-300" />
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    {/* Icon with pulse rings */}
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <PulseRing delay={i * 0.8} />
                      <PulseRing delay={i * 0.8 + 1.2} />
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
                          border: '1px solid rgba(99,102,241,0.2)',
                        }}>
                        <Icon className="w-7 h-7 text-indigo-500" />
                      </div>
                    </div>

                    <div className="text-[10px] font-black tracking-widest text-indigo-400 mb-2">STEP {step}</div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why IntelliLend — dark feature card ─────────────────────── */}
      <section className="relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}
          >
            {/* Dark card with its own blobs */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #1a1f38 0%, #2d3561 50%, #1a1f38 100%)' }} />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15"
              style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />

            <div className="relative z-10 p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: '#a5b4fc' }}>Why IntelliLend</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  AI that works as<br />hard as you do
                </h2>
                <p className="text-white/50 leading-relaxed mb-7 text-sm">
                  Four specialised AI agents review your application simultaneously — document verification, credit scoring, risk profiling, and default prediction — all in under 7 seconds.
                </p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/apply/new"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
                    }}>
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Zap,          label: 'AI Underwriting',   desc: '4 agents in parallel'    },
                  { icon: Shield,       label: 'RBI Compliant',     desc: 'NBFC grade security'     },
                  { icon: Clock,        label: 'Fast Disbursal',    desc: 'Under 24 hours'          },
                  { icon: Star,         label: '98% Satisfaction',  desc: '12,000+ borrowers'       },
                ].map(({ icon: Icon, label, desc }, i) => (
                  <motion.div key={label}
                    whileHover={{ scale: 1.04 }}
                    className="p-5 rounded-2xl cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: 'rgba(99,102,241,0.3)', border: '1px solid rgba(99,102,241,0.3)' }}>
                      <Icon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div className="text-sm font-bold text-white mb-0.5">{label}</div>
                    <div className="text-xs text-white/35">{desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-4xl font-black text-slate-900 mb-3">Ready to apply?</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Takes 10 minutes. No documents upfront. Zero processing fee to apply.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/apply/new"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
              }}>
              Start Your Application <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 py-8"
        style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
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
