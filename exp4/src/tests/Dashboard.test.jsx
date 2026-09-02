import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import Dashboard from '../pages/Dashboard'
import { setupStore } from '../redux/store'

function renderWithProviders(ui, preloadedState = {}) {
  const store = setupStore(preloadedState)
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('Dashboard', () => {
  it('renders the dashboard title and subtitle', () => {
    renderWithProviders(<Dashboard onNavigateToCalendar={() => {}} />)
    expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument()
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
  })

  it('displays 4 stat cards with correct initial values from sample posts', () => {
    renderWithProviders(<Dashboard onNavigateToCalendar={() => {}} />)
    const statValues = screen.getAllByTestId('stat-value')
    expect(statValues.length).toBe(4)
    const labels = ['Total Posts', 'Scheduled', 'Published', 'Drafts']
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('calculates statistics dynamically from Redux state', () => {
    const customPosts = [
      { id: 1, title: 'A', platform: 'Instagram', date: '2026-09-05', time: '10:00', status: 'Scheduled' },
      { id: 2, title: 'B', platform: 'LinkedIn', date: '2026-09-06', time: '11:00', status: 'Scheduled' },
      { id: 3, title: 'C', platform: 'Facebook', date: '2026-09-01', time: '09:00', status: 'Published' },
      { id: 4, title: 'D', platform: 'Twitter/X', date: '2026-09-07', time: '12:00', status: 'Draft' },
      { id: 5, title: 'E', platform: 'Instagram', date: '2026-09-08', time: '13:00', status: 'Draft' },
      { id: 6, title: 'F', platform: 'LinkedIn', date: '2026-09-02', time: '08:00', status: 'Published' }
    ]
    renderWithProviders(
      <Dashboard onNavigateToCalendar={() => {}} />,
      { posts: { posts: customPosts, selectedPost: null, filters: { platform: 'All', status: 'All' }, toast: null } }
    )
    const statValues = screen.getAllByTestId('stat-value').map((el) => Number(el.textContent))
    const [total, scheduled, published, draft] = statValues
    expect(total).toBe(6)
    expect(scheduled).toBe(2)
    expect(published).toBe(2)
    expect(draft).toBe(2)
  })

  it('shows upcoming posts list when there are scheduled posts', () => {
    const futurePosts = [
      { id: 1, title: 'Upcoming Event', platform: 'Instagram', date: '2099-09-05', time: '10:00', status: 'Scheduled', description: '' }
    ]
    renderWithProviders(
      <Dashboard onNavigateToCalendar={() => {}} />,
      { posts: { posts: futurePosts, selectedPost: null, filters: { platform: 'All', status: 'All' }, toast: null } }
    )
    expect(screen.getByTestId('upcoming-posts-list')).toBeInTheDocument()
    expect(screen.getByText('Upcoming Event')).toBeInTheDocument()
  })

  it('renders dashboard in the test DOM when app starts', () => {
    renderWithProviders(<Dashboard onNavigateToCalendar={() => {}} />)
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Upcoming Posts/i)).toBeInTheDocument()
    expect(screen.getByText(/Recently Published/i)).toBeInTheDocument()
  })
})
