import React from 'react'
import { platformColors, statusBadgeColors } from './CalendarView'

const PostDetails = React.memo(function PostDetails({ post, onEdit, onDelete, onClose }) {
  if (!post) return null

  return (
    <div className="post-details-panel" data-testid="post-details-panel">
      <div className="details-header">
        <h3 className="details-title">{post.title}</h3>
        <button className="btn-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="details-body">
        <div className="detail-item">
          <span className="detail-label">Platform</span>
          <span className="badge" style={{ backgroundColor: platformColors[post.platform]?.bg || '#A8DADC' }}>
            {post.platform}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="badge" style={{ backgroundColor: statusBadgeColors[post.status] || '#E8E8E8' }}>
            {post.status}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Scheduled Date</span>
          <span>{post.date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Scheduled Time</span>
          <span>{post.time}</span>
        </div>
        <div className="detail-item detail-description">
          <span className="detail-label">Description</span>
          <p>{post.description || 'No description provided.'}</p>
        </div>
      </div>
      <div className="details-actions">
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
        <button className="btn btn-primary" onClick={onEdit}>Edit Post</button>
      </div>
    </div>
  )
})

export default PostDetails
