import React from 'react'

const Sidebar = React.memo(function Sidebar({ activePage, onPageChange, isOpen, onClose }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">🎨</span>
          <div>
            <h2 className="sidebar-title">PastelPlan</h2>
            <p className="sidebar-subtitle">Content Scheduler</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                onPageChange(item.id)
                if (isOpen) onClose()
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>© 2026 PastelPlan</p>
          <p className="text-muted small">University Project</p>
        </div>
      </aside>
    </>
  )
})

export default Sidebar
