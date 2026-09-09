import { useReportRender } from './renderTracker';
import CalendarDayBase from './CalendarDayBase';

// NON-OPTIMIZED variant, kept for comparison/demonstration purposes.
//
// Deliberately omits the optimizations used by CalendarDayOptimized:
//   - No React.memo wrapper, so it re-renders whenever its parent renders.
//   - It receives the ENTIRE posts array as a prop (recomputed with a new
//     array reference on every parent render by CalendarNonOptimized) and
//     filters it locally, rather than subscribing to a scoped, stably
//     compared slice of the store.
//
// The result: any post change anywhere causes the parent Calendar to
// re-render, which — with no memoization and non-stable props — cascades
// into every displayed day re-rendering, even days whose own posts did not
// change. Functionally identical output to the optimized version; only the
// rendering efficiency differs.
export default function CalendarDayNonOptimized({
  date,
  label,
  isToday,
  posts,
  onSelectPost,
  onDropPost,
}) {
  const dayPosts = posts.filter((p) => p.date === date);

  useReportRender(date);

  return (
    <CalendarDayBase
      date={date}
      label={label}
      isToday={isToday}
      posts={dayPosts}
      onSelectPost={onSelectPost}
      onDropPost={onDropPost}
    />
  );
}
