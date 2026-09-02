import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import React from 'react'
import CalendarPage from '../pages/CalendarPage'
import App from '../App'
import { setupStore } from '../redux/store'
import { addPost, deletePost, updatePost, reschedulePost, setPlatformFilter, setStatusFilter } from '../redux/postsSlice'

function renderWithProviders(ui, preloadedState) {
  const store = setupStore(preloadedState)
  return { store, ...render(<Provider store={store}>{ui}</Provider>) }
}

describe('Calendar and Integration Tests', () => {
  it('renders Calendar page with filter bar and FullCalendar container', async () => {
    renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    expect(screen.getByTestId('calendar-page')).toBeInTheDocument()
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByTestId('calendar-view')).toBeInTheDocument()
    })
  })

  it('can create a new post via Redux dispatch and store updates', () => {
    const { store } = renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    const initialCount = store.getState().posts.posts.length
    store.dispatch(addPost({
      title: 'Integration Test Post',
      platform: 'Instagram',
      date: '2026-09-15',
      time: '09:00',
      status: 'Scheduled',
      description: 'Test'
    }))
    const state = store.getState().posts
    expect(state.posts.length).toBe(initialCount + 1)
    expect(state.posts[state.posts.length - 1].title).toBe('Integration Test Post')
    expect(state.toast.message).toContain('created')
  })

  it('can update an existing post via Redux dispatch', () => {
    const { store } = renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    const target = store.getState().posts.posts[0]
    store.dispatch(updatePost({ id: target.id, title: 'Updated Title' }))
    const updated = store.getState().posts.posts.find(p => p.id === target.id)
    expect(updated.title).toBe('Updated Title')
    expect(updated.platform).toBe(target.platform)
  })

  it('can delete a post via Redux dispatch', () => {
    const { store } = renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    const target = store.getState().posts.posts[0]
    const initialCount = store.getState().posts.posts.length
    store.dispatch(deletePost(target.id))
    expect(store.getState().posts.posts.length).toBe(initialCount - 1)
    expect(store.getState().posts.posts.find(p => p.id === target.id)).toBeUndefined()
  })

  it('can reschedule a post (drag-drop simulation) using reschedulePost action', () => {
    const { store } = renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    const target = store.getState().posts.posts[0]
    store.dispatch(reschedulePost({ id: target.id, date: '2026-12-25', time: '12:00' }))
    const updated = store.getState().posts.posts.find(p => p.id === target.id)
    expect(updated.date).toBe('2026-12-25')
    expect(updated.time).toBe('12:00')
    expect(store.getState().posts.toast.message).toContain('rescheduled')
  })

  it('filter actions update Redux filter state correctly', () => {
    const { store } = renderWithProviders(<CalendarPage isAddOpen={null} onCloseAdd={() => {}} onRequestEdit={() => {}} />)
    store.dispatch(setPlatformFilter('LinkedIn'))
    expect(store.getState().posts.filters.platform).toBe('LinkedIn')
    store.dispatch(setStatusFilter('Published'))
    expect(store.getState().posts.filters.status).toBe('Published')
  })

  it('Add Post button opens create modal when Header + App rendered', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)
    const addButton = screen.getByRole('button', { name: /\+ Add Post/i })
    expect(addButton).toBeInTheDocument()
    await act(async () => {
      await user.click(addButton)
    })
    await waitFor(() => {
      expect(screen.getByTestId('post-modal')).toBeInTheDocument()
      expect(screen.getByTestId('modal-title').textContent).toMatch(/Create New Post/i)
    })
  })

  it('renders initial sample posts (15) and dashboard stats correctly', async () => {
    const { store } = renderWithProviders(<App />)
    const posts = store.getState().posts.posts
    expect(posts.length).toBeGreaterThanOrEqual(10)
    const byStatus = {
      Scheduled: posts.filter(p => p.status === 'Scheduled').length,
      Published: posts.filter(p => p.status === 'Published').length,
      Draft: posts.filter(p => p.status === 'Draft').length
    }
    expect(byStatus.Scheduled + byStatus.Published + byStatus.Draft).toBe(posts.length)
    expect(byStatus.Scheduled).toBeGreaterThan(0)
    expect(byStatus.Published).toBeGreaterThan(0)
    expect(byStatus.Draft).toBeGreaterThan(0)
  })
})
