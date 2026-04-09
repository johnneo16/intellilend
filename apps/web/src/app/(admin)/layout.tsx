import { Sidebar } from '@/components/layout/Sidebar'
import { ThemeProvider } from '@/lib/theme-context'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
