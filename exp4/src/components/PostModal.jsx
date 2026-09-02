import React, { useCallback } from 'react'
import PostForm from './PostForm'

function PostModal({ isOpen, mode, initialData, onClose, onSave, onDelete }) {
  const handleSave = useCallback((formData) => {
    onSave(formData)
  }, [onSave])

  const handleDelete = useCallback(() => {
    if (initialData && initialData.id) {
      onDelete(initialData.id)
    }
  }, [initialData, onDelete])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-testid="post-modal"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title" data-testid="modal-title">
            {mode === 'create' ? 'Create New Post' : 'Edit Post'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close" data-testid="btn-close-modal">
            ×
          </button>
        </div>
        <div className="modal-body">
          {mode === 'details' && initialData ? (
            <div className="post-details" data-testid="post-details">
              <div className="details-row">
                <span className="details-label">Title:</span>
                <span className="details-value">{initialData.title}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Platform:</span>
                <span className={`badge badge-platform badge-${initialData.platform.toLowerCase().replace(/[^a-z]/g, '')}`}>
                  {initialData.platform}
                </span>
              </div>
              <div className="details-row">
                <span className="details-label">Date:</span>
                <span className="details-value">{initialData.date}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Time:</span>
                <span className="details-value">{initialData.time}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Status:</span>
                <span className={`badge badge-status badge-${initialData.status.toLowerCase()}`}>
                  {initialData.status}
                </span>
              </div>
              <div className="details-row details-description">
                <span className="details-label">Description:</span>
                <p className="details-value description-text">
                  {initialData.description || 'No description provided.'}
                </p>
              </div>
            </div>
          ) : (
            <PostForm
              initialData={initialData}
              onSubmit={handleSave}
              onCancel={onClose}
              submitLabel={mode === 'create' ? 'Save Post' : 'Save Changes'}
            />
          )}
        </div>
        {mode === 'details' && (
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={handleDelete} data-testid="btn-delete">
              Delete
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={() => onSave('edit')} data-testid="btn-edit-mode">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostModal
