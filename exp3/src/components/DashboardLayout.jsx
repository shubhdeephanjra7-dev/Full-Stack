import { useState } from 'react'
import GradientBackground from './GradientBackground'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function DashboardLayout({ links, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <GradientBackground>
      <Navbar showSidebarToggle onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="mx-auto flex w-full max-w-7xl gap-0">
        <Sidebar links={links} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
      <Footer />
    </GradientBackground>
  )
}
