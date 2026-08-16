import { useState } from 'react'
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials, roleLabel } from '../utils/helpers'
import { toast } from 'react-toastify'

export default function Navbar({ onToggleSidebar, showSidebarToggle = false }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    toast.info('You have been logged out.')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 glass mx-3 mt-3 rounded-2xl px-4 py-3 sm:mx-6 sm:mt-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <button
              className="rounded-xl p-2 text-ink-700 hover:bg-white/60 lg:hidden"
              onClick={onToggleSidebar}
              aria-label="Toggle menu"
            >
              <FiMenu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-br from-orchid-500 to-indigoDeep p-2 text-white shadow-glow">
              <HiSparkles size={18} />
            </div>
            <span className="font-display text-lg font-bold text-ink-800">Post Organizer</span>
          </div>
        </div>

        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/60 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orchid-600 text-sm font-bold text-white">
                {getInitials(currentUser.name)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-ink-800 leading-none">{currentUser.name}</p>
                <p className="text-xs text-ink-700/60 leading-none mt-1">{roleLabel(currentUser.role)}</p>
              </div>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 glass rounded-2xl p-2 shadow-glass"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="px-3 py-2 sm:hidden">
                  <p className="text-sm font-semibold text-ink-800">{currentUser.name}</p>
                  <p className="text-xs text-ink-700/60">{roleLabel(currentUser.role)}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50/70 transition-colors"
                >
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
