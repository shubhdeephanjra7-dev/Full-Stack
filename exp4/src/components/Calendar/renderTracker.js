import { createContext, useContext, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Render tracking mechanism
//
// Goal: count *actual* CalendarDay render commits (mount + update), without
// the measurement itself triggering further renders of the components being
// measured (see requirement: "counter should not break optimization").
//
// How it works:
//   - `reportRender(id)` is a STABLE function reference (identity never
//     changes) that a CalendarDay calls, via useEffect, once per commit.
//   - It is provided through React Context so CalendarDay components don't
//     need it passed as a prop (which could otherwise defeat memoization).
//   - The function itself only mutates a ref and schedules a state update on
//     a *different* component (the RenderCounterBadge), never on the day
//     components themselves. So Day -> report -> Badge re-renders, but Day
//     itself never re-renders because of its own report call.
// ---------------------------------------------------------------------------

export const RenderReportContext = createContext(() => {});
export const RenderResetContext = createContext(() => {});

// Hook used inside CalendarDay components. Fires once per actual render
// commit of the calling component (mount and every update that reaches
// commit) via useEffect, which runs after the DOM has been committed —
// i.e. it reflects real renders, not just function invocations that bail
// out via React.memo.
export function useReportRender(dayId) {
  const report = useContext(RenderReportContext);
  useEffect(() => {
    report(dayId);
  });
}

export function useResetRenderCount() {
  return useContext(RenderResetContext);
}
