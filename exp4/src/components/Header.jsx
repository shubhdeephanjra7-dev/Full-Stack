import React from 'react'

const Header = React.memo(function Header({ onToggleSidebar, onAddClick }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          ☰
        </button>
        <div>
          <h1 className="header-title">PastelPlan</h1>
          <p className="header-subtitle">Social Media Content Scheduler</p>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-primary btn-add" onClick={onAddClick}>
          <span className="add-icon">+</span> Add Post
        </button>
      </div>
    </header>
  )
})

export default Header
