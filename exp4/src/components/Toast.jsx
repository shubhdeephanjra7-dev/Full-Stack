import React, { useEffect } from 'react'

const Toast = React.memo(function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const bgColor = toast.type === 'danger' ? '#FFB5A7' : '#BDE0FE'
  const borderColor = toast.type === 'danger' ? '#E59E90' : '#98C8EB'

  return (
    <div
      className="toast"
      style={{ backgroundColor: bgColor, borderColor }}
      role="alert"
      data-testid="toast"
    >
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  )
})

export default Toast
