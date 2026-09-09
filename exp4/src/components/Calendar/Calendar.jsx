import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movePost, selectAllPosts } from '../../store/postsSlice';
import CalendarDayOptimized from './CalendarDayOptimized';
import CalendarDayNonOptimized from './CalendarDayNonOptimized';

// Renders the grid of calendar days for the current view (week/month),
// using either the optimized or non-optimized CalendarDay implementation
// depending on `mode`. This is the piece described in the architecture
// diagrams: Calendar -> N x CalendarDay.
export default function Calendar({ days, mode, onSelectPost }) {
  const dispatch = useDispatch();

  // Stable across renders (dispatch never changes identity) so it never
  // defeats memoization on the optimized days.
  const handleDropPost = useCallback(
    (postId, date) => {
      dispatch(movePost({ id: postId, date }));
    },
    [dispatch],
  );

  if (mode === 'optimized') {
    return (
      <div className="calendar-grid" data-testid="calendar-grid" data-mode="optimized">
        {days.map((day) => (
          <CalendarDayOptimized
            key={day.date}
            date={day.date}
            label={day.label}
            isToday={day.isToday}
            onSelectPost={onSelectPost}
            onDropPost={handleDropPost}
          />
        ))}
      </div>
    );
  }

  return (
    <NonOptimizedGrid days={days} onSelectPost={onSelectPost} onDropPost={handleDropPost} />
  );
}

// Split out only so the whole-array store subscription (which is the
// intentional inefficiency of "non-optimized" mode) is scoped to this
// branch and does not affect the optimized code path at all.
function NonOptimizedGrid({ days, onSelectPost, onDropPost }) {
  // Subscribing to the entire posts array means ANY post change (anywhere,
  // any field) causes this component, and therefore every non-memoized
  // CalendarDayNonOptimized child, to re-render.
  const posts = useSelector(selectAllPosts);

  return (
    <div className="calendar-grid" data-testid="calendar-grid" data-mode="nonOptimized">
      {days.map((day) => (
        <CalendarDayNonOptimized
          key={day.date}
          date={day.date}
          label={day.label}
          isToday={day.isToday}
          posts={posts}
          onSelectPost={onSelectPost}
          onDropPost={onDropPost}
        />
      ))}
    </div>
  );
}
