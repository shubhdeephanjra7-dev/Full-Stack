import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar';
import { renderWithStore, createTestStore } from './testUtils';
import { WEEK_DAYS, weekPosts, TUESDAY, THURSDAY } from './fixtures';

// jsdom does not implement DataTransfer, so we provide a minimal stand-in
// that supports the get/setData calls our drag handlers actually use.
function makeDataTransfer() {
  const store = {};
  return {
    setData: (type, value) => {
      store[type] = value;
    },
    getData: (type) => store[type] ?? '',
    effectAllowed: null,
    dropEffect: null,
  };
}

describe('Drag and drop scheduling', () => {
  it('moves a post from one day to another and updates its date in the store', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );

    const eventCard = screen.getByTestId('event-w1'); // starts on TUESDAY
    const targetDay = screen.getByTestId(`day-${THURSDAY}`);

    const dataTransfer = makeDataTransfer();
    fireEvent.dragStart(eventCard, { dataTransfer });
    fireEvent.dragOver(targetDay, { dataTransfer });
    fireEvent.drop(targetDay, { dataTransfer });

    const moved = store.getState().posts.items.find((p) => p.id === 'w1');
    expect(moved.date).toBe(THURSDAY);
    expect(moved.date).not.toBe(TUESDAY);
  });

  it('renders the moved event under its new day in the DOM', () => {
    const store = createTestStore(weekPosts);
    const { rerender } = renderWithStore(
      <Calendar days={WEEK_DAYS} mode="optimized" onSelectPost={() => {}} />,
      { store },
    );

    const dataTransfer = makeDataTransfer();
    fireEvent.dragStart(screen.getByTestId('event-w1'), { dataTransfer });
    fireEvent.drop(screen.getByTestId(`day-${THURSDAY}`), { dataTransfer });

    const thursdayCell = screen.getByTestId(`day-${THURSDAY}`);
    expect(thursdayCell).toContainElement(screen.getByTestId('event-w1'));
  });
});
