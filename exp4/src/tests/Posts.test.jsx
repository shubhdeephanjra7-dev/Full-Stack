import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import PostModal from '../components/Posts/PostModal';
import PostList from '../components/Posts/PostList';
import { renderWithStore, createTestStore } from './testUtils';
import { addPost, updatePost, deletePost } from '../store/postsSlice';
import { weekPosts } from './fixtures';

describe('Create post', () => {
  it('calls onSave with the entered fields when the form is valid', () => {
    const onSave = vi.fn();
    renderWithStore(
      <PostModal open initialPost={null} onSave={onSave} onDelete={() => {}} onClose={() => {}} />,
    );

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Launch Post' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-03-10' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '11:00' } });
    fireEvent.click(screen.getByText('Save'));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'New Launch Post', date: '2026-03-10', time: '11:00' }),
    );
  });

  it('blocks submission and shows an error when the title is empty', () => {
    const onSave = vi.fn();
    renderWithStore(
      <PostModal open initialPost={null} onSave={onSave} onDelete={() => {}} onClose={() => {}} />,
    );
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-03-10' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '11:00' } });
    fireEvent.click(screen.getByText('Save'));

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
  });

  it('a newly added post appears in the post list', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(<PostList onEdit={() => {}} onDelete={() => {}} />, { store });

    act(() => {
      store.dispatch(
        addPost({ title: 'Brand New Post', date: '2026-05-01', time: '08:00', platform: 'Instagram', status: 'Scheduled' }),
      );
    });

    expect(screen.getByText('Brand New Post')).toBeInTheDocument();
  });
});

describe('Edit post', () => {
  it('pre-fills the form with the existing post and saves changes with the same id', () => {
    const onSave = vi.fn();
    const existing = weekPosts[0];
    renderWithStore(
      <PostModal open initialPost={existing} onSave={onSave} onDelete={() => {}} onClose={() => {}} />,
    );

    expect(screen.getByLabelText('Title')).toHaveValue(existing.title);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.click(screen.getByText('Save'));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ id: existing.id, changes: expect.objectContaining({ title: 'Updated Title' }) }),
    );
  });

  it('updated post content is reflected in the post list', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(<PostList onEdit={() => {}} onDelete={() => {}} />, { store });

    act(() => {
      store.dispatch(updatePost({ id: weekPosts[0].id, changes: { title: 'Retitled Post' } }));
    });

    expect(screen.getByText('Retitled Post')).toBeInTheDocument();
    expect(screen.queryByText(weekPosts[0].title)).not.toBeInTheDocument();
  });
});

describe('Delete post', () => {
  it('removes the post from the list once deleted', () => {
    const store = createTestStore(weekPosts);
    renderWithStore(<PostList onEdit={() => {}} onDelete={() => {}} />, { store });

    expect(screen.getByText(weekPosts[0].title)).toBeInTheDocument();

    act(() => {
      store.dispatch(deletePost(weekPosts[0].id));
    });

    expect(screen.queryByText(weekPosts[0].title)).not.toBeInTheDocument();
  });
});
