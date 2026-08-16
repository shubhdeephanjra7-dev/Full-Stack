import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiGrid, FiHome, FiPlusCircle } from 'react-icons/fi'
import DashboardLayout from '../components/DashboardLayout'
import GlassCard from '../components/GlassCard'
import UploadForm from '../components/UploadForm'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostContext'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/create', label: 'Create Post', icon: FiPlusCircle },
  { to: '/admin/posts', label: 'Manage Posts', icon: FiGrid }
]

export default function AdminCreatePost() {
  const { currentUser } = useAuth()
  const { createPost } = usePosts()
  const navigate = useNavigate()

  function handleSubmit(values) {
    createPost({
      ...values,
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      adminId: currentUser.id
    })
    toast.success('Post published successfully!')
    navigate('/admin/posts')
  }

  return (
    <DashboardLayout links={LINKS}>
      <GlassCard className="mx-auto max-w-2xl p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-ink-800">Create a New Post</h1>
        <p className="mt-1 text-sm text-ink-700/60">This post will be visible to your collaborators and to every User.</p>

        <div className="mt-6">
          <UploadForm
            submitLabel="Publish Post"
            showStatusToggle
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin')}
          />
        </div>
      </GlassCard>
    </DashboardLayout>
  )
}
