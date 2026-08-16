import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

export default function Sidebar({ links, isOpen, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex sticky top-24 h-fit w-60 flex-col gap-1 glass mx-6 rounded-2xl p-4">
        <SidebarLinks links={links} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
            <motion.aside
              className="relative glass ml-0 h-full w-64 p-4"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            >
              <div className="mb-4 flex justify-end">
                <button onClick={onClose} className="rounded-full p-2 hover:bg-white/60">
                  <FiX size={18} />
                </button>
              </div>
              <SidebarLinks links={links} onNavigate={onClose} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarLinks({ links, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-gradient-to-r from-indigoDeep to-orchid-600 text-white shadow-glow'
                : 'text-ink-700/80 hover:bg-white/60'
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
