import React, { useState, useEffect, useCallback } from 'react'

const platforms = ['Instagram', 'LinkedIn', 'Facebook', 'Twitter/X']
const statuses = ['Draft', 'Scheduled', 'Published']

function PostForm({ initialData, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    date: '',
    time: '',
    status: 'Draft'
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        platform: initialData.platform || '',
        date: initialData.date || '',
        time: initialData.time || '',
        status: initialData.status || 'Draft'
      })
    }
  }, [initialData])

  const validate = useCallback((data) => {
    const newErrors = {}
    if (!data.title.trim()) newErrors.title = 'Title is required.'
    if (!data.platform) newErrors.platform = 'Platform is required.'
    if (!data.date) newErrors.date = 'Date is required.'
    if (!data.time) newErrors.time = 'Time is required.'
    return newErrors
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(formData))
  }, [formData, validate])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const allTouched = { title: true, platform: true, date: true, time: true }
    const validationErrors = validate(formData)
    setTouched(allTouched)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData)
    }
  }, [formData, validate, onSubmit])

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate data-testid="post-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Post Title <span className="required">*</span></label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${touched.title && errors.title ? 'has-error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter post title"
          data-testid="input-title"
        />
        {touched.title && errors.title && (
          <p className="form-error" data-testid="error-title">{errors.title}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-input form-textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter post description"
          rows="3"
          data-testid="input-description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="platform" className="form-label">Platform <span className="required">*</span></label>
          <select
            id="platform"
            name="platform"
            className={`form-select ${touched.platform && errors.platform ? 'has-error' : ''}`}
            value={formData.platform}
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid="input-platform"
          >
            <option value="">Select platform</option>
            {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {touched.platform && errors.platform && (
            <p className="form-error" data-testid="error-platform">{errors.platform}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
            data-testid="input-status"
          >
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">Date <span className="required">*</span></label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-input ${touched.date && errors.date ? 'has-error' : ''}`}
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid="input-date"
          />
          {touched.date && errors.date && (
            <p className="form-error" data-testid="error-date">{errors.date}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">Time <span className="required">*</span></label>
          <input
            type="time"
            id="time"
            name="time"
            className={`form-input ${touched.time && errors.time ? 'has-error' : ''}`}
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid="input-time"
          />
          {touched.time && errors.time && (
            <p className="form-error" data-testid="error-time">{errors.time}</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} data-testid="btn-cancel">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" data-testid="btn-submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default React.memo(PostForm)
