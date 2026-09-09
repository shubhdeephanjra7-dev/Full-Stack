import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar';
import { renderWithStore, createTestStore } from './testUtils';
import { WEEK_DAYS, weekPosts, TUESDAY } from './fixtures';

describe('Calendar rendering', () => {
  it('renders one CalendarDay per supplied day', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );

    WEEK_DAYS.forEach((day) => {
      expect(screen.getByTestId(`day-${day.date}`)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId(/^day-/)).toHaveLength(7);
  });

  it('places each event under its own date, not any other day', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );

    const tuesdayCell = screen.getByTestId(`day-${TUESDAY}`);
    expect(within(tuesdayCell).getByTestId('event-w1')).toBeInTheDocument();

    const mondayCell = screen.getByTestId(`day-${WEEK_DAYS[0].date}`);
    expect(within(mondayCell).queryByTestId('event-w1')).not.toBeInTheDocument();
  });
});

describe('Post status visibility on the calendar', () => {
  it('shows scheduled posts', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );
    expect(screen.getByText(/Tuesday Announcement/)).toBeInTheDocument();
  });

  it('does not hide done/completed posts', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );
    // w2 has status "Done" and must remain visible/accessible on the calendar.
    expect(screen.getByText(/Wednesday Recap/)).toBeInTheDocument();
  });
});
