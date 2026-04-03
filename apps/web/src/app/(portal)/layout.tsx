export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {children}
    </div>
  )
}
