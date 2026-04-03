# IntelliLend — AI-Powered Lending Platform

> End-to-end loan lifecycle management with multi-agent AI underwriting, lifecycle-aware UI theming, and real-time analytics.

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://typescriptlang.org)
[![Turborepo](https://img.shields.io/badge/Turborepo-1.x-red?logo=turborepo)](https://turbo.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Database Schema](#database-schema)
- [API Contracts](#api-contracts)
- [AI Agent Pipeline](#ai-agent-pipeline)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Loan Application Flow](#loan-application-flow)
- [Module Breakdown](#module-breakdown)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Overview

IntelliLend is a full-stack fintech platform that automates the entire lending lifecycle — from loan application submission through AI-powered underwriting, disbursement, active loan management, and collections.

**Key differentiators:**
- **Multi-agent AI underwriting** — 4 specialist agents run in parallel (Document Intelligence, Credit Decision, Risk Assessment, Collections Prediction) with confidence scoring and circuit-breaker cost controls
- **Lifecycle-aware UI** — the interface changes colour theme and emphasis based on the loan's current stage (Application → Underwriting → Approved → Active → Collections)
- **Real-time analytics dashboard** — live pipeline metrics, NPA trend, portfolio mix, conversion funnel
- **FOIR-first decisioning** — Fixed Obligations-to-Income Ratio is the primary risk gate, aligned with RBI guidelines

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│   Next.js 13 (App Router) · React 18 · Tailwind CSS             │
│   Recharts · Radix UI primitives · Framer Motion                 │
└────────────────────────┬────────────────────────────────────────┘
                         │ REST / WebSocket
┌────────────────────────▼────────────────────────────────────────┐
│                        API LAYER                                  │
│   NestJS (apps/api) · Zod validation · JWT auth                  │
│   OpenAPI 3.1 spec · Rate limiting · Request tracing             │
└────────┬───────────────┬────────────────────┬───────────────────┘
         │               │                    │
┌────────▼──────┐ ┌──────▼──────┐  ┌─────────▼──────────────────┐
│  Supabase DB  │ │  AI Agents  │  │  Background Jobs (BullMQ)  │
│  PostgreSQL   │ │  (OpenAI /  │  │  EMI reminders · NPA flags  │
│  Row-Level    │ │   Claude)   │  │  Statement generation       │
│  Security     │ └──────┬──────┘  └────────────────────────────┘
│  Prisma ORM   │        │
└───────────────┘ ┌──────▼──────────────────────────────────────┐
                  │           AI AGENT PIPELINE                   │
                  │  1. Document Intelligence Agent               │
                  │     └─ OCR + extraction + KYC verification    │
                  │  2. Credit Decision Agent                     │
                  │     └─ CIBIL pull + FOIR calc + bureau check  │
                  │  3. Risk Assessment Agent                     │
                  │     └─ LTV, employment stability, fraud flags  │
                  │  4. Collections Prediction Agent              │
                  │     └─ Repayment probability, cohort analysis  │
                  └─────────────────────────────────────────────┘
```

### Data Flow — Loan Application

```
Applicant fills form
       │
       ▼
[1] Submit application → POST /api/applications
       │
       ▼
[2] Document upload → S3/Supabase Storage
       │
       ▼
[3] Document Intelligence Agent
    · Extracts: income, address, identity
    · Verifies: PAN–Aadhaar link, employer
    · Flags: mismatches, alterations
       │
       ▼
[4] Credit Decision Agent
    · Pulls CIBIL score via bureau API
    · Calculates FOIR from obligations
    · Checks blacklists / delinquency history
       │
       ▼
[5] Risk Assessment Agent
    · Evaluates LTV (for secured loans)
    · Employment stability scoring
    · Property/collateral validation
       │
       ▼
[6] Collections Prediction Agent
    · Cohort-based repayment probability
    · Early warning score
    · Recommended loan structuring
       │
       ▼
[7] Composite AI Score (0–100) + Recommendation
       │
       ▼
[8] Underwriter review (human-in-the-loop)
       │
    APPROVE / REQUEST INFO / REJECT
       │
       ▼
[9] Disbursal → Active Loan → EMI schedule
       │
       ▼
[10] Collections if overdue → Bucket classification
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 13 (App Router) | SSR + RSC for performance |
| Styling | Tailwind CSS + custom design system | Utility-first, lifecycle theming |
| Charts | Recharts | Composable, React-native |
| UI Primitives | Radix UI | Accessible, headless |
| Backend | NestJS | Modular, TypeScript-first |
| Database | Supabase PostgreSQL | Managed Postgres + RLS + realtime |
| ORM | Prisma | Type-safe queries, migrations |
| Validation | Zod | Runtime + compile-time safety |
| Auth | Supabase Auth + JWT | Built-in RLS integration |
| AI | Claude API / OpenAI | Multi-agent underwriting |
| Storage | Supabase Storage | Document uploads |
| Jobs | BullMQ + Redis | EMI reminders, NPA alerts |
| Monorepo | Turborepo + pnpm | Parallel builds, shared packages |
| Deploy | Vercel (web) + Render (api) | Zero-config, auto-preview |

---

## Repository Structure

```
intellilend/
├── apps/
│   ├── web/                        # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/                # App Router pages
│   │   │   │   ├── page.tsx        # Dashboard
│   │   │   │   ├── applications/   # Application list + new form
│   │   │   │   ├── underwriting/   # AI queue + decision
│   │   │   │   ├── loans/          # Active loans
│   │   │   │   ├── collections/    # Overdue accounts
│   │   │   │   └── analytics/      # Charts & reporting
│   │   │   ├── components/
│   │   │   │   ├── layout/         # Sidebar, Header
│   │   │   │   ├── dashboard/      # KPICard, Charts, ActivityFeed, HeroBanner
│   │   │   │   └── ui/             # Badge, Button, Card, Progress, RingGauge
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts        # cn(), formatCurrency(), lifecycle constants
│   │   │   │   └── mock-data.ts    # Seed data for UI
│   │   │   └── types/index.ts      # Shared TypeScript types
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── api/                        # NestJS backend (Phase 2)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── applications/
│       │   │   ├── underwriting/
│       │   │   ├── loans/
│       │   │   ├── collections/
│       │   │   └── analytics/
│       │   ├── agents/             # AI agent implementations
│       │   └── prisma/             # Schema + migrations
│       └── package.json
│
├── packages/
│   ├── ui/                         # Shared component library
│   ├── db/                         # Prisma client + schema
│   └── config/                     # Shared ESLint/TS config
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Database Schema

Complete Prisma schema for all 8 models:

```prisma
// packages/db/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── Enums ──────────────────────────────────────────

enum LoanStatus {
  DRAFT
  SUBMITTED
  UNDER_REVIEW
  AI_PROCESSING
  APPROVED
  REJECTED
  DISBURSED
  ACTIVE
  CLOSED
  DEFAULTED
  NPA
}

enum LoanType {
  PERSONAL
  HOME
  AUTO
  BUSINESS
  EDUCATION
  GOLD
}

enum EmploymentType {
  SALARIED
  SELF_EMPLOYED
  BUSINESS
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum AgentType {
  DOCUMENT_INTELLIGENCE
  CREDIT_DECISION
  RISK_ASSESSMENT
  COLLECTIONS_PREDICTION
}

enum CollectionsBucket {
  BUCKET_1  // 1-30 days overdue
  BUCKET_2  // 31-60 days
  BUCKET_3  // 61-90 days
  BUCKET_4  // 90+ days / NPA
}

// ── Models ─────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  role          String    @default("LOAN_OFFICER")
  branchId      String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  applications  LoanApplication[]
  decisions     UnderwritingDecision[]

  @@index([email])
}

model Applicant {
  id              String          @id @default(cuid())
  name            String
  email           String          @unique
  phone           String
  panNumber       String          @unique
  aadhaarNumber   String?
  dateOfBirth     DateTime
  employmentType  EmploymentType
  employerName    String?
  monthlyIncome   Decimal         @db.Decimal(12, 2)
  creditScore     Int?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  applications    LoanApplication[]

  @@index([panNumber])
  @@index([email])
}

model LoanApplication {
  id                String       @id @default(cuid())
  applicationNumber String       @unique  // ILL-YYYY-XXXXXX
  applicantId       String
  assignedToId      String?
  loanType          LoanType
  requestedAmount   Decimal      @db.Decimal(14, 2)
  approvedAmount    Decimal?     @db.Decimal(14, 2)
  tenure            Int          // months
  purpose           String?
  status            LoanStatus   @default(DRAFT)

  // Risk metrics
  foir              Decimal?     @db.Decimal(5, 2)   // %
  ltv               Decimal?     @db.Decimal(5, 2)   // %
  aiScore           Int?         // 0-100
  aiRiskLevel       RiskLevel?
  interestRate      Decimal?     @db.Decimal(5, 2)   // % p.a.

  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  submittedAt       DateTime?
  decidedAt         DateTime?

  applicant         Applicant    @relation(fields: [applicantId], references: [id])
  assignedTo        User?        @relation(fields: [assignedToId], references: [id])
  documents         Document[]
  aiDecisions       AIDecision[]
  uwDecision        UnderwritingDecision?
  loan              Loan?

  @@index([status])
  @@index([applicantId])
  @@index([applicationNumber])
  @@index([createdAt])
}

model Document {
  id              String    @id @default(cuid())
  applicationId   String
  documentType    String    // PAN, AADHAAR, SALARY_SLIP, BANK_STATEMENT, etc.
  fileName        String
  storagePath     String    // Supabase Storage path
  mimeType        String
  sizeBytes       Int
  isVerified      Boolean   @default(false)
  extractedData   Json?     // AI-extracted fields
  uploadedAt      DateTime  @default(now())

  application     LoanApplication @relation(fields: [applicationId], references: [id])

  @@index([applicationId])
}

model AIDecision {
  id              String    @id @default(cuid())
  applicationId   String
  agentType       AgentType
  status          String    @default("PENDING")  // PENDING|PROCESSING|COMPLETED|FAILED
  confidence      Decimal?  @db.Decimal(5, 2)
  score           Int?
  reasoning       String?   @db.Text
  flags           Json?     // Array of flag objects
  recommendation  String?   // APPROVE|REJECT|REVIEW
  tokensUsed      Int?
  processingMs    Int?
  modelVersion    String?
  createdAt       DateTime  @default(now())
  completedAt     DateTime?

  application     LoanApplication @relation(fields: [applicationId], references: [id])

  @@index([applicationId])
  @@index([agentType])
}

model UnderwritingDecision {
  id              String    @id @default(cuid())
  applicationId   String    @unique
  decidedById     String
  decision        String    // APPROVE|REJECT|REQUEST_INFO
  overrideReason  String?   @db.Text
  notes           String?   @db.Text
  decidedAt       DateTime  @default(now())

  application     LoanApplication @relation(fields: [applicationId], references: [id])
  decidedBy       User            @relation(fields: [decidedById], references: [id])
}

model Loan {
  id              String    @id @default(cuid())
  applicationId   String    @unique
  loanNumber      String    @unique   // LN-YYYY-XXXXXX
  principalAmount Decimal   @db.Decimal(14, 2)
  interestRate    Decimal   @db.Decimal(5, 2)
  tenure          Int
  emiAmount       Decimal   @db.Decimal(12, 2)
  disbursedAt     DateTime
  maturityDate    DateTime
  outstandingBalance Decimal @db.Decimal(14, 2)
  status          LoanStatus @default(ACTIVE)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  application     LoanApplication @relation(fields: [applicationId], references: [id])
  emiSchedule     EMISchedule[]
  collections     CollectionRecord[]

  @@index([loanNumber])
  @@index([status])
}

model EMISchedule {
  id            String    @id @default(cuid())
  loanId        String
  emiNumber     Int
  dueDate       DateTime
  principalDue  Decimal   @db.Decimal(12, 2)
  interestDue   Decimal   @db.Decimal(12, 2)
  totalDue      Decimal   @db.Decimal(12, 2)
  paidAmount    Decimal   @db.Decimal(12, 2) @default(0)
  paidAt        DateTime?
  status        String    @default("PENDING")  // PENDING|PAID|OVERDUE|PARTIAL

  loan          Loan      @relation(fields: [loanId], references: [id])

  @@unique([loanId, emiNumber])
  @@index([dueDate])
  @@index([status])
}

// EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
// where P = principal, r = monthly rate, n = tenure months

model CollectionRecord {
  id              String            @id @default(cuid())
  loanId          String
  bucket          CollectionsBucket
  overdueDays     Int
  overdueAmount   Decimal           @db.Decimal(12, 2)
  agentNote       String?           @db.Text
  action          String?           // CALL|SMS|EMAIL|LEGAL_NOTICE|FIELD_VISIT
  resolvedAt      DateTime?
  createdAt       DateTime          @default(now())

  loan            Loan              @relation(fields: [loanId], references: [id])

  @@index([loanId])
  @@index([bucket])
}
```

---

## API Contracts

### Authentication
```
POST   /api/auth/login          # Email + password → JWT
POST   /api/auth/refresh        # Refresh token
POST   /api/auth/logout
```

### Applications
```
GET    /api/applications                    # List with filters & pagination
POST   /api/applications                    # Create draft
GET    /api/applications/:id                # Single application detail
PATCH  /api/applications/:id                # Update draft fields
POST   /api/applications/:id/submit         # Submit for review
POST   /api/applications/:id/documents      # Upload document
DELETE /api/applications/:id/documents/:docId
```

### Underwriting
```
GET    /api/underwriting/queue              # Applications pending decision
GET    /api/underwriting/:appId/ai-report   # Full AI agent report
POST   /api/underwriting/:appId/decide      # POST { decision, reason, notes }
POST   /api/underwriting/:appId/trigger-ai  # Manually re-run AI pipeline
```

### Loans
```
GET    /api/loans                           # All active loans
GET    /api/loans/:id                       # Loan detail + EMI schedule
GET    /api/loans/:id/statement             # PDF statement
POST   /api/loans/:id/record-payment        # Manual payment entry
```

### Collections
```
GET    /api/collections                     # Overdue accounts by bucket
GET    /api/collections/:loanId             # Collection history
POST   /api/collections/:loanId/action      # Log action (call, notice, etc.)
POST   /api/collections/:loanId/resolve     # Mark resolved
```

### Analytics
```
GET    /api/analytics/dashboard             # KPI snapshot
GET    /api/analytics/disbursements?from=&to=  # Time-series data
GET    /api/analytics/npa-trend             # NPA by month
GET    /api/analytics/funnel                # Conversion funnel
GET    /api/analytics/portfolio-mix         # Loan type distribution
```

---

## AI Agent Pipeline

Each agent is an isolated async worker consuming an application context:

```typescript
// apps/api/src/agents/base-agent.ts
interface AgentContext {
  applicationId: string
  applicant: Applicant
  documents: ExtractedDocument[]
  previousDecisions?: AIDecision[]
}

interface AgentResult {
  confidence: number      // 0-100
  score: number           // 0-100
  recommendation: 'APPROVE' | 'REJECT' | 'REVIEW'
  reasoning: string
  flags: AgentFlag[]
  tokensUsed: number
  processingMs: number
}
```

### Cost governance (circuit breaker)
- Per-application token budget: **6,000 tokens** max across all 4 agents
- Per-day spend cap configurable via `AI_DAILY_BUDGET_USD` env var
- If budget exceeded → queue for next processing window, alert on Slack
- Each agent call wrapped in try/catch with exponential backoff (3 retries)

---

## Getting Started

### Prerequisites
- Node.js ≥ 16 (18+ recommended)
- pnpm ≥ 8
- Supabase account (free tier works)
- OpenAI or Anthropic API key (for AI agents)

### 1. Clone & install

```bash
git clone https://github.com/johnneo16/intellilend.git
cd intellilend
pnpm install
```

### 2. Environment setup

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Fill in values — see [Environment Variables](#environment-variables) below.

### 3. Database setup

```bash
# Create Supabase project at supabase.com, then:
cd packages/db
pnpm prisma migrate dev --name init
pnpm prisma db seed       # loads demo data
```

### 4. Run development servers

```bash
# From repo root — starts all apps in parallel via Turborepo
pnpm dev

# Or individually:
pnpm --filter @intellilend/web dev    # http://localhost:3000
pnpm --filter @intellilend/api dev    # http://localhost:4000
```

### 5. Open the app

| URL | Service |
|-----|---------|
| http://localhost:3000 | Web UI (Next.js) |
| http://localhost:4000 | API (NestJS) |
| http://localhost:4000/api/docs | Swagger UI |
| http://localhost:54323 | Supabase Studio (local) |

---

## Environment Variables

### `apps/web/.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### `apps/api/.env`
```env
# Database
DATABASE_URL=postgresql://postgres:[password]@db.xxxx.supabase.co:5432/postgres

# Auth
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI
ANTHROPIC_API_KEY=sk-ant-...       # for Claude agents
OPENAI_API_KEY=sk-...              # optional fallback
AI_DAILY_BUDGET_USD=10             # circuit breaker

# Storage
SUPABASE_STORAGE_BUCKET=documents

# Redis (for BullMQ jobs)
REDIS_URL=redis://localhost:6379
```

---

## Loan Application Flow

This is the **end-to-end journey** a borrower and loan officer experience:

### Step 1 — Applicant submits form (`/applications/new`)
1. Borrower fills 5-step form: Personal Info → Employment → Loan Details → Documents → Submit
2. System creates `LoanApplication` record in `DRAFT` status
3. Documents uploaded to Supabase Storage, references stored in `Document` table

### Step 2 — AI Pipeline triggers automatically
4. Application moves to `AI_PROCESSING`
5. **Document Intelligence Agent** runs OCR on all uploads:
   - Extracts: name, DOB, PAN, income figure, employer, address
   - Cross-checks extracted data against form input
   - Returns `confidence` score and any `flags`
6. **Credit Decision Agent** (parallel):
   - Pulls CIBIL score via bureau API
   - Calculates FOIR = (total monthly obligations ÷ gross income) × 100
   - Checks for defaults, write-offs, DPD history
7. **Risk Assessment Agent**:
   - For secured loans: validates LTV, property title, collateral
   - Employment stability score based on tenure and employer type
   - Fraud pattern detection
8. **Collections Prediction Agent**:
   - Cohort-based repayment probability modelling
   - Early warning score (EWS) for NPA likelihood
9. Composite **AI Score (0–100)** generated with weighted average
10. All results stored in `AIDecision` table per agent

### Step 3 — Underwriter reviews (`/underwriting`)
11. Application appears in underwriting queue
12. Loan officer sees the full AI report: agent-by-agent breakdown, flags, confidence levels
13. Officer can **Approve**, **Reject**, or **Request More Info**
14. Decision logged to `UnderwritingDecision` with reason

### Step 4 — Disbursal
15. Approved application triggers disbursal workflow
16. `Loan` record created with full EMI schedule (`EMISchedule` rows)
17. EMI = P × r × (1+r)^n / ((1+r)^n − 1)
18. Borrower notified via email/SMS

### Step 5 — Active Loan (`/loans`)
19. Loan visible in portfolio with outstanding balance, next EMI date
20. Automated EMI reminders sent 3 days before due date (BullMQ job)
21. Payments recorded against `EMISchedule`

### Step 6 — Collections if overdue (`/collections`)
22. BullMQ job runs nightly, flags any overdue EMIs
23. Loans bucketed by DPD (Days Past Due):
    - Bucket 1: 1–30 days → automated soft reminder
    - Bucket 2: 31–60 days → agent call required
    - Bucket 3: 61–90 days → legal notice
    - Bucket 4: 90+ days → NPA classification
24. Collections actions logged, resolution tracked

---

## Module Breakdown

| Module | Route | Key Features |
|--------|-------|-------------|
| **Dashboard** | `/` | KPI cards, disbursement chart, NPA trend, activity feed, portfolio mix, conversion funnel |
| **Applications** | `/applications` | List with status filters, search, export; link to detail |
| **New Application** | `/applications/new` | 5-step form with FOIR meter, EMI preview, doc upload, AI review status |
| **Underwriting** | `/underwriting` | Split queue + detail view; agent pipeline cards with expand/collapse; ring gauge AI score; approve/reject/info buttons |
| **Active Loans** | `/loans` | Portfolio table with outstanding balance, next EMI, overdue flags |
| **Collections** | `/collections` | Bucket overview cards; overdue table with call/email quick actions |
| **Analytics** | `/analytics` | Full-page charts: disbursements, funnel, portfolio mix, NPA trend |

---

## Deployment

### Frontend — Vercel
```bash
# Connect repo to Vercel, set env vars in dashboard
vercel --prod
```

### Backend — Render
```yaml
# render.yaml
services:
  - type: web
    name: intellilend-api
    env: node
    buildCommand: pnpm --filter @intellilend/api build
    startCommand: pnpm --filter @intellilend/api start:prod
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: intellilend-db
          property: connectionString
```

### Database — Supabase
1. Create project at supabase.com
2. Run migrations: `pnpm prisma migrate deploy`
3. Enable Row-Level Security on all tables
4. Set up Storage bucket `documents` (private)

### CI/CD — GitHub Actions
```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm type-check
```

---

## Roadmap

### Phase 0 — Scaffold ✅
- [x] Turborepo monorepo
- [x] Next.js web app
- [x] Design system (light theme, glassmorphism cards, ring gauges)

### Phase 1 — Core Infrastructure
- [ ] NestJS API with all module scaffolds
- [ ] Prisma schema + migrations
- [ ] Supabase auth + RLS policies
- [ ] OpenAPI spec

### Phase 2 — Application Module
- [ ] Full application CRUD
- [ ] Document upload to Supabase Storage
- [ ] PDF parsing pipeline

### Phase 3 — AI Underwriting
- [ ] Document Intelligence Agent
- [ ] Credit Decision Agent (CIBIL integration)
- [ ] Risk Assessment Agent
- [ ] Collections Prediction Agent
- [ ] Cost governance + circuit breaker

### Phase 4 — Loan Management
- [ ] Disbursal workflow
- [ ] EMI schedule generation
- [ ] Payment recording

### Phase 5 — Collections & Analytics
- [ ] BullMQ job for overdue detection
- [ ] Collections bucket logic
- [ ] Real-time analytics via Supabase realtime

### Phase 6 — Production
- [ ] Vercel + Render deployment
- [ ] Monitoring (Sentry + Datadog)
- [ ] Load testing
- [ ] Security audit

---

## Contributing

This is a co-owned project. Branch strategy:
- `main` — production-ready
- `feat/*` — feature branches
- `fix/*` — bug fixes

Commit convention: `feat(module): description` | `fix(module): description` | `chore(infra): description`

---

*Built with ❤️ by [@johnneo16](https://github.com/johnneo16) · Powered by Claude Sonnet 4.6*
