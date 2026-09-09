import CalendarEvent from './CalendarEvent';

// Pure presentational day cell. Both the optimized and non-optimized
// CalendarDay wrappers render through this so the actual markup only lives
// in one place. This component itself performs the day's render work
// (mapping events), which is exactly the work we want to avoid repeating
// for unchanged days in optimized mode.
export default function CalendarDayBase({
  date,
  label,
  isToday,
  posts,
  onSelectPost,
  onDropPost,
}) {
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e) {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain');
    if (postId) onDropPost(postId, date);
  }

  return (
    <div
      className={`calendar-day ${isToday ? 'calendar-day--today' : ''}`}
      data-testid={`day-${date}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="calendar-day__header">
        <span className="calendar-day__weekday">{label.weekday}</span>
        <span className="calendar-day__number">{label.dayNumber}</span>
      </div>
      <div className="calendar-day__events">
        {posts.length === 0 ? (
          <span className="calendar-day__empty">—</span>
        ) : (
          posts.map((post) => (
            <CalendarEvent key={post.id} post={post} onSelect={onSelectPost} />
          ))
        )}
      </div>
    </div>
  );
}
