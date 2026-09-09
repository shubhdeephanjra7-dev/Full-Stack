import { memo } from 'react';

const PLATFORM_ICON = {
  Instagram: '📸',
  Facebook: '📘',
  LinkedIn: '💼',
  'Twitter/X': '🐦',
};

const STATUS_CLASS = {
  Scheduled: 'event-card--scheduled',
  Draft: 'event-card--draft',
  Done: 'event-card--done',
  Posted: 'event-card--posted',
};

function CalendarEvent({ post, onSelect }) {
  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', post.id);
    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <button
      type="button"
      className={`event-card ${STATUS_CLASS[post.status] || ''}`}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect(post.id)}
      data-testid={`event-${post.id}`}
      aria-label={`${post.title}, ${post.time}, ${post.platform}, ${post.status}`}
    >
      <span className="event-card__time">{post.time}</span>
      <span className="event-card__title">
        {PLATFORM_ICON[post.platform] || '✨'} {post.title}
      </span>
      <span className="event-card__status">{post.status}</span>
    </button>
  );
}

// Memoized: an event card only needs to re-render if its own post data or
// selection handler changes.
export default memo(CalendarEvent);
