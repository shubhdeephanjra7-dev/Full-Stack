import React from 'react'

const StatCard = React.memo(function StatCard({ label, value, bgColor, icon }) {
  return (
    <div className="stat-card" style={{ backgroundColor: bgColor }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-value" data-testid="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  )
})

export default StatCard
