import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IntelliLend — AI Lending Platform',
  description: 'End-to-end AI-powered lending lifecycle management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
