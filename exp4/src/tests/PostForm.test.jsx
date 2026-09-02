import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostForm from '../components/PostForm'
import { Provider } from 'react-redux'
import { setupStore } from '../redux/store'
import React from 'react'

function renderWithStore(ui, store = setupStore()) {
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('PostForm', () => {
  it('renders all required form fields', () => {
    renderWithStore(<PostForm onSubmit={() => {}} onCancel={() => {}} />)
    expect(screen.getByTestId('input-title')).toBeInTheDocument()
    expect(screen.getByTestId('input-description')).toBeInTheDocument()
    expect(screen.getByTestId('input-platform')).toBeInTheDocument()
    expect(screen.getByTestId('input-status')).toBeInTheDocument()
    expect(screen.getByTestId('input-date')).toBeInTheDocument()
    expect(screen.getByTestId('input-time')).toBeInTheDocument()
  })

  it('shows required validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    renderWithStore(<PostForm onSubmit={() => {}} onCancel={() => {}} />)

    await user.click(screen.getByTestId('btn-submit'))

    await waitFor(() => {
      expect(screen.getByTestId('error-title')).toHaveTextContent('Title is required')
    })
    expect(screen.getByTestId('error-platform')).toHaveTextContent('Platform is required')
    expect(screen.getByTestId('error-date')).toHaveTextContent('Date is required')
    expect(screen.getByTestId('error-time')).toHaveTextContent('Time is required')
  })

  it('does not call onSubmit when form has validation errors', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    renderWithStore(<PostForm onSubmit={onSubmit} onCancel={() => {}} />)

    await user.click(screen.getByTestId('btn-submit'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when valid', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    renderWithStore(<PostForm onSubmit={onSubmit} onCancel={() => {}} />)

    await user.type(screen.getByTestId('input-title'), 'My Post')
    await user.selectOptions(screen.getByTestId('input-platform'), 'Instagram')
    fireEvent.change(screen.getByTestId('input-date'), { target: { value: '2026-09-10' } })
    fireEvent.change(screen.getByTestId('input-time'), { target: { value: '10:30' } })

    await user.click(screen.getByTestId('btn-submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'My Post',
          platform: 'Instagram',
          date: '2026-09-10',
          time: '10:30',
          status: 'Draft'
        })
      )
    })
  })

  it('calls onCancel when Cancel button is clicked', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()
    renderWithStore(<PostForm onSubmit={() => {}} onCancel={onCancel} />)

    await user.click(screen.getByTestId('btn-cancel'))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('pre-fills form with initialData when editing', () => {
    const initialData = {
      title: 'Existing Post',
      description: 'Old desc',
      platform: 'Twitter/X',
      date: '2026-08-20',
      time: '15:00',
      status: 'Scheduled'
    }
    renderWithStore(<PostForm initialData={initialData} onSubmit={() => {}} onCancel={() => {}} />)
    expect(screen.getByTestId('input-title')).toHaveValue('Existing Post')
    expect(screen.getByTestId('input-description')).toHaveValue('Old desc')
    expect(screen.getByTestId('input-platform')).toHaveValue('Twitter/X')
    expect(screen.getByTestId('input-date')).toHaveValue('2026-08-20')
    expect(screen.getByTestId('input-time')).toHaveValue('15:00')
    expect(screen.getByTestId('input-status')).toHaveValue('Scheduled')
  })
})
