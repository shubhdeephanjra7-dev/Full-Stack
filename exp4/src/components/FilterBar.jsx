import React, { useCallback } from 'react'

const platforms = ['All', 'Instagram', 'LinkedIn', 'Facebook', 'Twitter/X']
const statuses = ['All', 'Draft', 'Scheduled', 'Published']

const FilterBar = React.memo(function FilterBar({ platformFilter, statusFilter, onPlatformChange, onStatusChange }) {

  const handlePlatformChange = useCallback((e) => {
    onPlatformChange(e.target.value)
  }, [onPlatformChange])

  const handleStatusChange = useCallback((e) => {
    onStatusChange(e.target.value)
  }, [onStatusChange])

  return (
    <div className="filter-bar" data-testid="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Platform:</label>
        <select
          className="form-select"
          value={platformFilter}
          onChange={handlePlatformChange}
          aria-label="Filter by platform"
          data-testid="platform-filter"
        >
          {platforms.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Status:</label>
        <select
          className="form-select"
          value={statusFilter}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          data-testid="status-filter"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )
})

export default FilterBar
