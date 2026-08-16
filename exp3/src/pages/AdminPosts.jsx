import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FiGrid, FiHome, FiPlusCircle } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import Button from '../components/Button'
import UploadForm from '../components/UploadForm'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'
import { CATEGORIES } from '../data/dummyData'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/create', label: 'Create Post', icon: FiPlusCircle },
  { to: '/admin/posts', label: 'Manage Posts', icon: FiGrid }
]

export default function AdminPosts() {
  const { currentUser } = useAuth()
  const { posts, updatePost, deletePost } = usePosts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [editingPost, setEditingPost] = useState(null)
  const [deletingPost, setDeletingPost] = useState(null)

  const myPosts = useMemo(() => posts.filter((p) => p.createdBy === currentUser.id), [posts, currentUser.id])

  const filtered = myPosts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || p.category === category
    return matchesSearch && matchesCategory
  })

  function handleEditSubmit(values) {
    updatePost(editingPost.id, values)
    toast.success('Post updated successfully.')
    setEditingPost(null)
  }

  function confirmDelete() {
    deletePost(deletingPost.id)
    toast.success('Post deleted.')
    setDeletingPost(null)
  }

  return (
    <DashboardLayout links={LINKS}>
      <GlassCard className="p-6">
        <h1 className="font-display text-2xl font-bold text-ink-800">Manage My Posts</h1>
        <p className="mt-1 text-sm text-ink-700/60">Edit or delete posts you've created. Collaborator uploads stay visible but are managed by them.</p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="mt-4">
          <CategoryFilter categories={CATEGORIES} active={category} onChange={setCategory} />
        </div>
      </GlassCard>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState title="No posts match your filters" subtitle="Try a different search term or category." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  canManage
                  onEdit={setEditingPost}
                  onDelete={setDeletingPost}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)} title="Edit Post">
        {editingPost && (
          <UploadForm
            submitLabel="Save Changes"
            showStatusToggle
            initialValues={editingPost}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingPost(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        title="Delete this post?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeletingPost(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        This will permanently remove "{deletingPost?.title}" from your workspace.
      </Modal>
    </DashboardLayout>
  )
}
