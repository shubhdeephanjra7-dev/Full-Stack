import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import postsReducer from '../store/postsSlice';

export function createTestStore(preloadedItems) {
  return configureStore({
    reducer: { posts: postsReducer },
    preloadedState: preloadedItems ? { posts: { items: preloadedItems } } : undefined,
  });
}

export function renderWithStore(ui, { store = createTestStore() } = {}) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}
