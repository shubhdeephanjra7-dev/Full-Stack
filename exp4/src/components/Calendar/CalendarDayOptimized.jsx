import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectPostsByDate } from '../../store/postsSlice';
import { useReportRender } from './renderTracker';
import CalendarDayBase from './CalendarDayBase';

// OPTIMIZED variant.
//
// Two things make this day independently renderable:
//
// 1. It reads ONLY its own date's posts directly from the store via its own
//    useSelector call, using `shallowEqual` as the comparison function. The
//    slice reducer (postsSlice) only creates new object references for
//    posts that actually changed, so a day whose own posts are unaffected
//    by an update gets back an array containing the SAME post object
//    references as before. `shallowEqual` sees that as "no change" and
//    react-redux skips the re-render for this component entirely — it
//    never has to run its render function to find out nothing changed.
//
// 2. It never receives the whole `posts` array (or any other
//    render-triggering data) as a prop from its parent, so a parent
//    re-render can't force this child down the render path either. The
//    only props are the date/label (primitives) and stable callbacks.
function CalendarDayOptimized({ date, label, isToday, onSelectPost, onDropPost }) {
  const posts = useSelector((state) => selectPostsByDate(state, date), shallowEqual);

  useReportRender(date);

  return (
    <CalendarDayBase
      date={date}
      label={label}
      isToday={isToday}
      posts={posts}
      onSelectPost={onSelectPost}
      onDropPost={onDropPost}
    />
  );
}

// React.memo as a second line of defense: if a parent ever does pass a new
// (but equivalent) prop, this stops an unnecessary render from that path
// too. Combined with useSelector+shallowEqual above, unaffected days do not
// re-render when a post on a different day changes.
export default memo(CalendarDayOptimized);
