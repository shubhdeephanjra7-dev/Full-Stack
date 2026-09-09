import { describe, it, expect, vi } from 'vitest';
import { act } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar';
import { RenderReportContext } from '../components/Calendar/renderTracker';
import { createTestStore } from './testUtils';
import { WEEK_DAYS, weekPosts, TUESDAY, THURSDAY, makeMonthDays } from './fixtures';
import { movePost } from '../store/postsSlice';

// These tests use the SAME instrumentation the production app uses
// (`useReportRender`, called once per real render commit inside each
// CalendarDay component) — they observe actual React rendering behavior
// rather than asserting a hardcoded number.
function renderCalendar(mode, store, days = WEEK_DAYS) {
  const reportSpy = vi.fn();
  const utils = render(
    <Provider store={store}>
      <RenderReportContext.Provider value={reportSpy}>
        <Calendar days={days} mode={mode} onSelectPost={() => {}} />
      </RenderReportContext.Provider>
    </Provider>,
  );
  return { ...utils, reportSpy };
}

describe('Optimized rendering', () => {
  it('re-renders only the source and destination day when a post moves (7-day calendar)', () => {
    const store = createTestStore(weekPosts);
    const { reportSpy } = renderCalendar('optimized', store);

    // 7 days mount -> 7 initial render reports. Clear before measuring the move.
    expect(reportSpy).toHaveBeenCalledTimes(7);
    reportSpy.mockClear();

    act(() => {
      store.dispatch(movePost({ id: 'w1', date: THURSDAY }));
    });

    // Only Tuesday (source) and Thursday (destination) should have re-rendered.
    expect(reportSpy).toHaveBeenCalledTimes(2);
    expect(reportSpy).toHaveBeenCalledWith(TUESDAY);
    expect(reportSpy).toHaveBeenCalledWith(THURSDAY);
  });
});

describe('Non-optimized rendering', () => {
  it('re-renders every displayed day when a post moves (7-day calendar)', () => {
    const store = createTestStore(weekPosts);
    const { reportSpy } = renderCalendar('nonOptimized', store);

    expect(reportSpy).toHaveBeenCalledTimes(7);
    reportSpy.mockClear();

    act(() => {
      store.dispatch(movePost({ id: 'w1', date: THURSDAY }));
    });

    // Every one of the 7 displayed days re-renders, not just the two that changed.
    expect(reportSpy).toHaveBeenCalledTimes(7);
  });
});

describe('30-day calendar comparison', () => {
  const monthDays = makeMonthDays('2026-02-01', 30);
  const monthTuesday = monthDays[1].date;
  const monthThursday = monthDays[3].date;
  const monthPosts = [
    { id: 'm1', title: 'Month Post', description: '', date: monthTuesday, time: '10:00', platform: 'Instagram', status: 'Scheduled' },
  ];

  it('optimized: moving a post still produces exactly 2 renders across 30 days', () => {
    const store = createTestStore(monthPosts);
    const { reportSpy } = renderCalendar('optimized', store, monthDays);

    expect(reportSpy).toHaveBeenCalledTimes(30);
    reportSpy.mockClear();

    act(() => {
      store.dispatch(movePost({ id: 'm1', date: monthThursday }));
    });

    expect(reportSpy).toHaveBeenCalledTimes(2);
  });

  it('non-optimized: moving a post produces 30 renders', () => {
    const store = createTestStore(monthPosts);
    const { reportSpy } = renderCalendar('nonOptimized', store, monthDays);

    expect(reportSpy).toHaveBeenCalledTimes(30);
    reportSpy.mockClear();

    act(() => {
      store.dispatch(movePost({ id: 'm1', date: monthThursday }));
    });

    expect(reportSpy).toHaveBeenCalledTimes(30);
  });
});
