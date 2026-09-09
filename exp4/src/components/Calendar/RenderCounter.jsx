import { useCallback, useRef, useState } from 'react';
import { RenderReportContext, RenderResetContext } from './renderTracker';

// The ONE visible render counter box, plus the provider that wires up the
// (non re-render-inducing) measurement plumbing.
//
// Note the "children as a prop" composition: RenderCounterProvider holds its
// own state (the displayed count), but `children` (the rest of the app,
// including the Calendar) is passed in from the parent and is never
// recreated by this component. Because the element reference is unchanged
// across this provider's own re-renders, React does not re-render that
// subtree just because RenderCounterProvider re-rendered — so updating the
// visible counter never cascades into re-rendering the calendar itself.
export function RenderCounterProvider({ children }) {
  const countRef = useRef(0);
  const [display, setDisplay] = useState(0);

  const report = useCallback(() => {
    countRef.current += 1;
    setDisplay(countRef.current);
  }, []);

  const reset = useCallback(() => {
    countRef.current = 0;
    setDisplay(0);
  }, []);

  return (
    <RenderResetContext.Provider value={reset}>
      <RenderReportContext.Provider value={report}>
        <RenderCounterBadge count={display} />
        {children}
      </RenderReportContext.Provider>
    </RenderResetContext.Provider>
  );
}

function RenderCounterBadge({ count }) {
  return (
    <div className="render-counter" role="status" aria-live="polite">
      <span className="render-counter__icon" aria-hidden="true">
        🔄
      </span>
      <span>
        Renders: <strong>{count}</strong>
      </span>
    </div>
  );
}
