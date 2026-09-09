import { useState } from 'react';
import Button from '../UI/Button';
import { PLATFORMS, STATUSES } from '../../data/samplePosts';

const emptyForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  platform: PLATFORMS[0],
  status: 'Scheduled',
};

// Handles both "create" (no initialPost) and "edit" (initialPost provided).
export default function PostModal({ open, initialPost, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(() => (initialPost ? { ...initialPost } : emptyForm));
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const isEditing = Boolean(initialPost);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.date) next.date = 'Date is required.';
    if (!form.time) next.time = 'Time is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave(isEditing ? { id: initialPost.id, changes: form } : form);
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <form
        className="modal post-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        aria-labelledby="post-modal-title"
      >
        <h3 id="post-modal-title">{isEditing ? 'Edit Post' : 'New Post'}</h3>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />

        <div className="post-modal__row">
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="time"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
            />
            {errors.time && <span className="field-error">{errors.time}</span>}
          </div>
        </div>

        <div className="post-modal__row">
          <div>
            <label htmlFor="platform">Platform</label>
            <select
              id="platform"
              value={form.platform}
              onChange={(e) => update('platform', e.target.value)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal__actions">
          {isEditing && (
            <Button
              type="button"
              variant="danger"
              className="modal__actions-left"
              onClick={() => onDelete(initialPost.id)}
            >
              Delete
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
