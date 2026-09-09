import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost, deletePost } from '../store/postsSlice';
import Calendar from '../components/Calendar/Calendar';
import CalendarControls from '../components/Calendar/CalendarControls';
import { RenderCounterProvider } from '../components/Calendar/RenderCounter';
import { useResetRenderCount } from '../components/Calendar/renderTracker';
import { getWeekDays, getMonthDays, monthLabel } from '../components/Calendar/dateUtils';
import PostList from '../components/Posts/PostList';
import PostModal from '../components/Posts/PostModal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import Header from '../components/Layout/Header';

const todayISO = new Date().toISOString().slice(0, 10);

export default function CalendarPage() {
  const dispatch = useDispatch();

  const [baseDate, setBaseDate] = useState(() => new Date());
  const [view, setView] = useState('week'); // 'week' (7 days) | 'month' (~30 days)
  const [mode, setMode] = useState('optimized'); // 'optimized' | 'nonOptimized'

  const [modalState, setModalState] = useState({ open: false, postId: null });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const days = useMemo(() => {
    const raw = view === 'week' ? getWeekDays(baseDate) : getMonthDays(baseDate);
    return raw.map((d) => ({ ...d, isToday: d.date === todayISO }));
  }, [view, baseDate]);

  function shiftPeriod(delta) {
    setBaseDate((d) => {
      const next = new Date(d);
      if (view === 'week') next.setDate(next.getDate() + delta * 7);
      else next.setMonth(next.getMonth() + delta);
      return next;
    });
  }

  function openCreateModal() {
    setModalState({ open: true, postId: null });
  }

  function openEditModal(postId) {
    setModalState({ open: true, postId });
  }

  function closeModal() {
    setModalState({ open: false, postId: null });
  }

  function handleSave(payload) {
    if (payload.id) {
      dispatch(updatePost(payload));
    } else {
      dispatch(addPost(payload));
    }
    closeModal();
  }

  function handleDeleteRequest(postId) {
    setConfirmDeleteId(postId);
  }

  function confirmDelete() {
    dispatch(deletePost(confirmDeleteId));
    setConfirmDeleteId(null);
    closeModal();
  }

  return (
    <RenderCounterProvider>
      <PageBody
        days={days}
        view={view}
        mode={mode}
        monthLabel={monthLabel(baseDate)}
        onViewChange={setView}
        onModeChange={setMode}
        onPrev={() => shiftPeriod(-1)}
        onNext={() => shiftPeriod(1)}
        onToday={() => setBaseDate(new Date())}
        onNewPost={openCreateModal}
        onEditPost={openEditModal}
        onDeletePost={handleDeleteRequest}
        modalState={modalState}
        onCloseModal={closeModal}
        onSave={handleSave}
        confirmDeleteId={confirmDeleteId}
        onCancelDelete={() => setConfirmDeleteId(null)}
        onConfirmDelete={confirmDelete}
      />
    </RenderCounterProvider>
  );
}

function PageBody({
  days,
  view,
  mode,
  monthLabel: label,
  onViewChange,
  onModeChange,
  onPrev,
  onNext,
  onToday,
  onNewPost,
  onEditPost,
  onDeletePost,
  modalState,
  onCloseModal,
  onSave,
  confirmDeleteId,
  onCancelDelete,
  onConfirmDelete,
}) {
  const resetRenderCount = useResetRenderCount();
  const editingPost = usePostById(modalState.postId);
  const previousMode = useRef(mode);

  useEffect(() => {
    if (previousMode.current !== mode) {
      resetRenderCount();
      previousMode.current = mode;
    }
  }, [mode, resetRenderCount]);

  return (
    <div className="app-shell">
      <Header />

      <main className="calendar-page">
        <CalendarControls
          monthLabel={label}
          view={view}
          onViewChange={onViewChange}
          mode={mode}
          onModeChange={onModeChange}
          onPrev={() => {
            resetRenderCount();
            onPrev();
          }}
          onNext={() => {
            resetRenderCount();
            onNext();
          }}
          onToday={() => {
            resetRenderCount();
            onToday();
          }}
          onNewPost={onNewPost}
          onResetCounter={resetRenderCount}
        />

        <Calendar days={days} mode={mode} onSelectPost={onEditPost} />

        <PostList onEdit={onEditPost} onDelete={onDeletePost} />
      </main>

      {modalState.open && (
        <PostModal
          open={modalState.open}
          initialPost={editingPost}
          onSave={onSave}
          onDelete={onDeletePost}
          onClose={onCloseModal}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmDeleteId)}
        title="Delete this post?"
        message="This action cannot be undone."
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </div>
  );
}

// Small helper hook: looks up the post currently being edited (if any) from
// the store, kept local to this page since only the modal needs it.
function usePostById(id) {
  return useSelector((state) => (id ? state.posts.items.find((p) => p.id === id) : null));
}
