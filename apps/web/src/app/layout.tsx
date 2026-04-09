import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IntelliLend — AI Lending Platform',
  description: 'End-to-end AI-powered lending lifecycle management',
}

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('il-theme');
    var p = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if ((t || p) === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
