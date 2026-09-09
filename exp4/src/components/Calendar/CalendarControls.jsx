import Button from '../UI/Button';

export default function CalendarControls({
  monthLabel,
  view,
  onViewChange,
  mode,
  onModeChange,
  onPrev,
  onNext,
  onToday,
  onNewPost,
  onResetCounter,
}) {
  return (
    <div className="calendar-controls">
      <div className="calendar-controls__nav">
        <Button variant="ghost" onClick={onPrev} aria-label="Previous period">
          ‹
        </Button>
        <span className="calendar-controls__label">{monthLabel}</span>
        <Button variant="ghost" onClick={onNext} aria-label="Next period">
          ›
        </Button>
        <Button variant="ghost" onClick={onToday}>
          Today
        </Button>
      </div>

      <div className="calendar-controls__group" role="group" aria-label="Calendar view">
        {['week', 'month'].map((v) => (
          <button
            key={v}
            className={`toggle-pill ${view === v ? 'toggle-pill--active' : ''}`}
            onClick={() => onViewChange(v)}
          >
            {v === 'week' ? 'Week' : 'Month'}
          </button>
        ))}
      </div>

      <div className="calendar-controls__group" role="group" aria-label="Rendering strategy">
        <span className="calendar-controls__mini-label">Rendering:</span>
        {['optimized', 'nonOptimized'].map((m) => (
          <button
            key={m}
            className={`toggle-pill ${mode === m ? 'toggle-pill--active' : ''}`}
            onClick={() => onModeChange(m)}
          >
            {m === 'optimized' ? 'Optimized' : 'Non-Optimized'}
          </button>
        ))}
        <Button variant="ghost" onClick={onResetCounter} title="Reset render counter">
          Reset
        </Button>
      </div>

      <Button variant="primary" onClick={onNewPost}>
        + New Post
      </Button>
    </div>
  );
}
